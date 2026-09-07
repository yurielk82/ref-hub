#!/usr/bin/env node

import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import { createProductionCommands, productionStateStore } from './ci-deploy-adapters.mjs'
import { evaluateDeployment, isTrialActive } from './ci-deploy-policy.mjs'

const DEPENDENCY_FILES = new Set(['package.json', 'package-lock.json', 'npm-shrinkwrap.json'])
const CONTROLLER_LOCK = '/tmp/ref-hub-ci-deploy-trial-controller.lock'
const CONTROLLER_BUSY_EXIT = 75
const STATUS = Object.freeze({
  deployed: 'deployed',
  deployFailed: 'deploy-failed',
  deploymentRaced: 'deployment-raced',
  unverifiedLiveSha: 'unverified-live-sha-requires-manual',
})

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error)
}

function stateForAttempt({ previous, sha, runs, now }) {
  return {
    ...previous,
    lastAttemptedSha: sha,
    attemptedShas: [...new Set([...(previous.attemptedShas ?? []), sha])],
    status: 'attempting',
    attemptedAt: now.toISOString(),
    ciRuns: runs.map((run) => ({
      workflowName: run.workflowName,
      databaseId: run.databaseId,
      url: run.url,
    })),
  }
}

async function finishAttempt(stateStore, state, status, now, details = {}) {
  const finished = {
    ...state,
    status,
    completedAt: now.toISOString(),
    details,
  }
  await stateStore.write(finished)
  return finished
}

async function capture(operation) {
  try {
    return { value: await operation() }
  } catch (error) {
    return { error: errorMessage(error) }
  }
}

async function preflightLiveCheckout({ commands, sha }) {
  const branch = await commands.currentBranch()
  if (branch !== 'main') {
    return { result: { status: 'wrong-live-branch', sha, branch } }
  }
  const localSha = await commands.localSha()
  const dirtyFiles = await commands.buildRelevantDirty()
  if (dirtyFiles.length > 0) {
    return { result: { status: 'dirty-live-checkout', sha, dirtyFiles } }
  }
  return { localSha }
}

async function adoptCurrentDeployment({ now, commands, stateStore, previous, sha, runs, dryRun }) {
  if (dryRun) return { status: 'would-adopt-current', sha }
  const deployedSmoke = await capture(() => commands.smoke(STATUS.deployed, sha))
  if (deployedSmoke.error) {
    return { status: STATUS.unverifiedLiveSha, sha, error: deployedSmoke.error }
  }
  const verifiedSha = await commands.localSha()
  if (verifiedSha !== sha) {
    return { status: STATUS.unverifiedLiveSha, sha, observedSha: verifiedSha }
  }
  const attempting = stateForAttempt({ previous, sha, runs, now })
  await stateStore.write(attempting)
  await finishAttempt(stateStore, attempting, STATUS.deployed, now, {
    adoptedCurrent: true,
    deployedSmoke: deployedSmoke.value,
  })
  return { status: 'already-deployed', sha, deployedSmoke: deployedSmoke.value }
}

async function assessUpgrade({ commands, sha, localSha, decision, dryRun }) {
  if (!(await commands.isAncestor(localSha, sha))) {
    return { result: { status: 'non-fast-forward', sha, localSha } }
  }
  const changedFiles = await commands.changedFiles(localSha, sha)
  const dependencyFiles = changedFiles.filter((file) => DEPENDENCY_FILES.has(file))
  if (dependencyFiles.length > 0) {
    return { result: { status: 'dependency-change-requires-manual', sha, dependencyFiles } }
  }
  if (dryRun) {
    return {
      result: {
        status: 'would-deploy',
        sha,
        ciRunIds: decision.runs.map((run) => run.databaseId),
      },
    }
  }
  return null
}

async function assessCandidate({ now, commands, stateStore, dryRun }) {
  const previous = await stateStore.read()
  await commands.fetchOrigin()
  const sha = await commands.remoteSha()
  const runs = await commands.listRuns(sha)
  const decision = evaluateDeployment({
    now,
    sha,
    lastAttemptedSha: previous.lastAttemptedSha ?? null,
    attemptedShas: previous.attemptedShas ?? [],
    runs,
  })

  if (decision.action !== 'deploy') {
    return { result: { status: decision.reason, sha } }
  }

  const preflight = await preflightLiveCheckout({ commands, sha })
  if (preflight.result) return preflight
  const { localSha } = preflight
  if (localSha === sha) {
    return {
      result: await adoptCurrentDeployment({
        now,
        commands,
        stateStore,
        previous,
        sha,
        runs: decision.runs,
        dryRun,
      }),
    }
  }
  const upgrade = await assessUpgrade({ commands, sha, localSha, decision, dryRun })
  if (upgrade) return upgrade
  return { previous, sha, runs: decision.runs }
}

async function failAttempt({ stateStore, attempting, status, now, sha, details = {} }) {
  await finishAttempt(stateStore, attempting, status, now, details)
  return { status, sha, ...details }
}

async function executeDeployment({ now, commands, stateStore, previous, sha, runs }) {
  const attempting = stateForAttempt({ previous, sha, runs, now })
  await stateStore.write(attempting)

  const deploy = await capture(() => commands.deploy(sha))
  if (deploy.error) {
    return failAttempt({
      stateStore,
      attempting,
      status: STATUS.deployFailed,
      now,
      sha,
      details: { error: deploy.error, rollbackOwner: 'workspace-deploy-gateway' },
    })
  }

  const observedSha = await commands.localSha()
  if (observedSha !== sha) {
    return failAttempt({
      stateStore,
      attempting,
      status: STATUS.deploymentRaced,
      now,
      sha,
      details: {
        observedSha,
        rollbackOwner: 'none-after-gateway-lock-release',
      },
    })
  }

  await finishAttempt(stateStore, attempting, STATUS.deployed, now, {
    deployGateway: deploy.value,
  })
  return { status: STATUS.deployed, sha, deployGateway: deploy.value }
}

export async function runTrial({ now = new Date(), commands, stateStore, dryRun = false }) {
  if (!isTrialActive(now)) return { status: 'outside-trial-window' }
  const candidate = await assessCandidate({ now, commands, stateStore, dryRun })
  if (candidate.result) return candidate.result
  return executeDeployment({ now, commands, stateStore, ...candidate })
}

export function controllerLockInvocation(args, scriptPath = fileURLToPath(import.meta.url)) {
  return {
    command: 'flock',
    args: [
      '-n',
      '-E',
      String(CONTROLLER_BUSY_EXIT),
      CONTROLLER_LOCK,
      process.execPath,
      scriptPath,
      ...args,
    ],
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (process.env.REF_HUB_TRIAL_CONTROLLER_LOCKED !== '1') {
    const invocation = controllerLockInvocation(args)
    const child = spawnSync(invocation.command, invocation.args, {
      env: { ...process.env, REF_HUB_TRIAL_CONTROLLER_LOCKED: '1' },
      stdio: 'inherit',
    })
    if (child.error) throw child.error
    if (child.status === CONTROLLER_BUSY_EXIT) {
      console.log(JSON.stringify({ status: 'controller-already-running' }))
      return
    }
    process.exitCode = child.status ?? 1
    return
  }
  if (args.some((arg) => arg !== '--dry-run')) {
    throw new Error('usage: node scripts/ci-deploy-trial.mjs [--dry-run]')
  }
  const result = await runTrial({
    now: new Date(),
    commands: createProductionCommands(),
    stateStore: productionStateStore(),
    dryRun: args.includes('--dry-run'),
  })
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), ...result }))
  const failed = result.status.endsWith('-failed')
  const blocked = [
    'non-fast-forward',
    'wrong-live-branch',
    'dirty-live-checkout',
    'dependency-change-requires-manual',
    STATUS.unverifiedLiveSha,
    'deployment-raced',
  ]
  if (failed || blocked.includes(result.status)) {
    process.exitCode = 1
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(JSON.stringify({ status: 'controller-error', error: errorMessage(error) }))
    process.exitCode = 1
  })
}
