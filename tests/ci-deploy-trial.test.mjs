import assert from 'node:assert/strict'
import test from 'node:test'

import { createProductionCommands } from '../scripts/ci-deploy-adapters.mjs'
import { controllerLockInvocation, runTrial } from '../scripts/ci-deploy-trial.mjs'

const SHA = '0123456789abcdef0123456789abcdef01234567'
const NOW = new Date('2026-09-08T12:00:00+09:00')

function successfulRun(overrides = {}) {
  return {
    databaseId: 101,
    headSha: SHA,
    headBranch: 'main',
    event: 'push',
    status: 'completed',
    conclusion: 'success',
    workflowName: 'CI',
    url: 'https://github.com/yurielk82/ref-hub/actions/runs/101',
    ...overrides,
  }
}

function requiredRuns(overrides = {}) {
  return [
    successfulRun(overrides.CI),
    successfulRun({ databaseId: 102, workflowName: 'Quality Gate', ...overrides.qualityGate }),
  ]
}

function harness({
  runs = requiredRuns(),
  ancestor = true,
  fail = null,
  smokeFails = [],
  dirtyFiles = [],
  changedFiles = ['app/page.tsx'],
  localSha = 'abcdef0123456789abcdef0123456789abcdef01',
  localShas = null,
} = {}) {
  const calls = []
  const writes = []
  const commands = {}
  let currentSha = localSha
  const simple = { fetchOrigin: undefined }

  for (const name of Object.keys(simple)) {
    commands[name] = async () => {
      calls.push(name)
      if (fail === name) throw new Error(`${name} failed`)
    }
  }
  commands.deploy = async () => {
    calls.push('deploy')
    if (fail === 'deploy') throw new Error('deploy failed')
    if (!localShas) currentSha = SHA
  }
  commands.remoteSha = async () => {
    calls.push('remoteSha')
    return SHA
  }
  commands.localSha = async () => {
    calls.push('localSha')
    return localShas?.shift() ?? currentSha
  }
  commands.currentBranch = async () => {
    calls.push('currentBranch')
    return 'main'
  }
  commands.listRuns = async (sha) => {
    calls.push(`listRuns:${sha}`)
    return runs
  }
  commands.isAncestor = async () => {
    calls.push('isAncestor')
    return ancestor
  }
  commands.buildRelevantDirty = async () => {
    calls.push('buildRelevantDirty')
    return dirtyFiles
  }
  commands.changedFiles = async () => {
    calls.push('changedFiles')
    return changedFiles
  }
  commands.smoke = async (phase, expectedSha) => {
    calls.push(`smoke:${phase}:${expectedSha}`)
    if (smokeFails.includes(phase)) throw new Error(`${phase} smoke failed`)
    return { reportPath: `/tmp/${phase}.json` }
  }

  const stateStore = {
    async read() {
      return {}
    },
    async write(state) {
      writes.push(structuredClone(state))
    },
  }

  return { calls, commands, stateStore, writes }
}

test('should_fail_before_mutation_when_fetch_fails_or_history_is_not_fast_forward', async () => {
  const fetchFailure = harness({ fail: 'fetchOrigin' })
  await assert.rejects(
    runTrial({ now: NOW, commands: fetchFailure.commands, stateStore: fetchFailure.stateStore }),
    /fetchOrigin failed/,
  )
  assert.deepEqual(fetchFailure.writes, [])

  const diverged = harness({ ancestor: false })
  const result = await runTrial({
    now: NOW,
    commands: diverged.commands,
    stateStore: diverged.stateStore,
  })
  assert.equal(result.status, 'non-fast-forward')
  assert.deepEqual(diverged.writes, [])
  assert.equal(diverged.calls.includes('deploy'), false)
})

test('should_not_deploy_when_CI_failed_or_has_not_completed', async () => {
  const failed = harness({ runs: requiredRuns({ qualityGate: { conclusion: 'failure' } }) })
  const failedResult = await runTrial({
    now: NOW,
    commands: failed.commands,
    stateStore: failed.stateStore,
  })
  assert.equal(failedResult.status, 'ci-failed')
  assert.equal(failed.calls.includes('deploy'), false)

  const pending = harness({
    runs: requiredRuns({ CI: { status: 'in_progress', conclusion: '' } }),
  })
  const pendingResult = await runTrial({
    now: NOW,
    commands: pending.commands,
    stateStore: pending.stateStore,
  })
  assert.equal(pendingResult.status, 'ci-running')
  assert.equal(pending.calls.includes('deploy'), false)
})

test('should_report_without_mutation_in_dry_run', async () => {
  const trial = harness()
  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
    dryRun: true,
  })

  assert.equal(result.status, 'would-deploy')
  assert.deepEqual(trial.writes, [])
  assert.equal(trial.calls.includes('deploy'), false)
})

test('should_record_success_after_the_locked_gateway_completes_its_production_smoke', async () => {
  const trial = harness()
  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
  })

  assert.equal(result.status, 'deployed')
  assert.deepEqual(trial.calls.slice(-2), ['deploy', 'localSha'])
  assert.equal(trial.writes[0].status, 'attempting')
  assert.equal(trial.writes.at(-1).status, 'deployed')
  assert.equal(trial.writes.at(-1).lastAttemptedSha, SHA)
  assert.deepEqual(trial.writes.at(-1).attemptedShas, [SHA])
})

test('should_adopt_an_already_deployed_exact_SHA_only_after_SHA_aware_smoke', async () => {
  const trial = harness({ localSha: SHA })
  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
  })

  assert.equal(result.status, 'already-deployed')
  assert.equal(trial.calls.includes(`smoke:deployed:${SHA}`), true)
  assert.equal(trial.calls.includes('deploy'), false)
  assert.equal(trial.writes.at(-1).status, 'deployed')
  assert.equal(trial.writes.at(-1).details.adoptedCurrent, true)
  assert.deepEqual(trial.writes.at(-1).attemptedShas, [SHA])
})

test('should_fail_closed_when_current_SHA_cannot_be_verified_as_deployed', async () => {
  const trial = harness({ localSha: SHA, smokeFails: ['deployed'] })
  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
  })

  assert.equal(result.status, 'unverified-live-sha-requires-manual')
  assert.equal(trial.calls.includes('deploy'), false)
  assert.deepEqual(trial.writes, [])
})

test('should_record_gateway_failure_without_an_out_of_lock_smoke_or_rollback', async () => {
  const trial = harness({ fail: 'deploy' })
  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
  })

  assert.equal(result.status, 'deploy-failed')
  assert.equal(
    trial.calls.some((call) => call.startsWith('smoke:')),
    false,
  )
  assert.equal(trial.calls.includes('rollback'), false)
  assert.equal(trial.writes.at(-1).lastAttemptedSha, SHA)
  assert.equal(trial.writes.at(-1).status, 'deploy-failed')
})

test('should_not_record_success_when_live_SHA_changes_after_the_locked_gateway_returns', async () => {
  const racedSha = 'fedcba9876543210fedcba9876543210fedcba98'
  const trial = harness({
    localShas: ['abcdef0123456789abcdef0123456789abcdef01', racedSha],
  })
  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
  })

  assert.equal(result.status, 'deployment-raced')
  assert.equal(result.observedSha, racedSha)
  assert.equal(trial.calls.includes('rollback'), false)
  assert.equal(trial.writes.at(-1).status, 'deployment-raced')
})

test('should_never_retry_the_same_attempted_SHA', async () => {
  const trial = harness()
  trial.stateStore.read = async () => ({ lastAttemptedSha: SHA, status: 'rolled-back' })

  const result = await runTrial({
    now: NOW,
    commands: trial.commands,
    stateStore: trial.stateStore,
  })

  assert.equal(result.status, 'already-attempted')
  assert.equal(trial.calls.includes('deploy'), false)
  assert.deepEqual(trial.writes, [])
})

test('should_fail_closed_for_dirty_build_inputs_or_dependency_changes', async () => {
  const dirty = harness({ dirtyFiles: ['app/page.tsx'] })
  const dirtyResult = await runTrial({
    now: NOW,
    commands: dirty.commands,
    stateStore: dirty.stateStore,
  })
  assert.equal(dirtyResult.status, 'dirty-live-checkout')
  assert.equal(dirty.calls.includes('deploy'), false)

  const dependency = harness({ changedFiles: ['package-lock.json'] })
  const dependencyResult = await runTrial({
    now: NOW,
    commands: dependency.commands,
    stateStore: dependency.stateStore,
  })
  assert.equal(dependencyResult.status, 'dependency-change-requires-manual')
  assert.equal(dependency.calls.includes('deploy'), false)
})

test('should_deploy_the_same_offline_content_snapshot_that_CI_verified', async () => {
  const calls = []
  const commands = createProductionCommands(async (command, args, options = {}) => {
    calls.push({ command, args, options })
    return command === 'git' && args.includes('rev-parse') ? SHA : ''
  })

  await commands.deploy(SHA)

  assert.equal(calls[0].options.env.REF_HUB_OFFLINE_CONTENT, '1')
  assert.deepEqual(calls[0].args, ['ref-hub', '--no-merge', '--expected-ref', SHA])

  await commands.smoke('deployed', SHA)
  assert.equal(calls[1].options.env.SMOKE_EXPECTED_SHA, SHA)
})

test('should_reenter_the_controller_through_a_nonblocking_single_process_flock', () => {
  const invocation = controllerLockInvocation(['--dry-run'], '/tmp/controller.mjs')

  assert.equal(invocation.command, 'flock')
  assert.deepEqual(invocation.args.slice(0, 4), [
    '-n',
    '-E',
    '75',
    '/tmp/ref-hub-ci-deploy-trial-controller.lock',
  ])
  assert.deepEqual(invocation.args.slice(-3), [
    process.execPath,
    '/tmp/controller.mjs',
    '--dry-run',
  ])
})
