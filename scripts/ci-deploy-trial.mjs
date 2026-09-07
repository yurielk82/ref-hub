#!/usr/bin/env node

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createProductionCommands, productionStateStore } from './ci-deploy-adapters.mjs'
import { evaluateDeployment, isTrialActive } from './ci-deploy-policy.mjs'

const DEPENDENCY_FILES = new Set(['package.json', 'package-lock.json', 'npm-shrinkwrap.json'])
const STATUS = Object.freeze({
  deployed: 'deployed',
  deployFailed: 'deploy-failed',
  rolledBack: 'rolled-back',
  rollbackFailed: 'rollback-failed',
  rollbackSmokeFailed: 'rollback-smoke-failed',
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

  const branch = await commands.currentBranch()
  if (branch !== 'main') {
    return { result: { status: 'wrong-live-branch', sha, branch } }
  }
  const localSha = await commands.localSha()
  const dirtyFiles = await commands.buildRelevantDirty()
  if (dirtyFiles.length > 0) {
    return { result: { status: 'dirty-live-checkout', sha, dirtyFiles } }
  }
  if (localSha === sha) {
    if (dryRun) return { result: { status: 'would-adopt-current', sha } }
    const deployedSmoke = await capture(() => commands.smoke(STATUS.deployed))
    if (deployedSmoke.error) {
      return {
        result: {
          status: 'unverified-live-sha-requires-manual',
          sha,
          error: deployedSmoke.error,
        },
      }
    }
    const attempting = stateForAttempt({ previous, sha, runs: decision.runs, now })
    await stateStore.write(attempting)
    await finishAttempt(stateStore, attempting, STATUS.deployed, now, {
      adoptedCurrent: true,
      deployedSmoke: deployedSmoke.value,
    })
    return {
      result: { status: 'already-deployed', sha, deployedSmoke: deployedSmoke.value },
    }
  }
  if (!(await commands.isAncestor(localSha, sha))) {
    return { result: { status: 'non-fast-forward', sha, localSha } }
  }
  const changedFiles = await commands.changedFiles(localSha, sha)
  const dependencyFiles = changedFiles.filter((file) => DEPENDENCY_FILES.has(file))
  if (dependencyFiles.length > 0) {
    return {
      result: { status: 'dependency-change-requires-manual', sha, dependencyFiles },
    }
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
  return { previous, sha, runs: decision.runs }
}

async function failAttempt({ stateStore, attempting, status, now, sha, details = {} }) {
  await finishAttempt(stateStore, attempting, status, now, details)
  return { status, sha, ...details }
}

async function handleDeployFailure({ commands, stateStore, attempting, now, sha, error }) {
  const liveSmoke = await capture(() => commands.smoke('deploy-failure'))
  if (liveSmoke.error) {
    return handleSmokeFailure({
      commands,
      stateStore,
      attempting,
      now,
      sha,
      error: `deploy failed: ${error}; post-failure smoke failed: ${liveSmoke.error}`,
    })
  }
  return failAttempt({
    stateStore,
    attempting,
    status: STATUS.deployFailed,
    now,
    sha,
    details: { error, liveSmoke: liveSmoke.value ?? { error: liveSmoke.error } },
  })
}

async function handleSmokeFailure({ commands, stateStore, attempting, now, sha, error }) {
  const rollback = await capture(() => commands.rollback())
  const rollbackSmoke = rollback.error ? null : await capture(() => commands.smoke('rollback'))
  const status = rollback.error
    ? STATUS.rollbackFailed
    : rollbackSmoke?.error
      ? STATUS.rollbackSmokeFailed
      : STATUS.rolledBack
  return failAttempt({
    stateStore,
    attempting,
    status,
    now,
    sha,
    details: {
      deployedSmokeError: error,
      rollbackError: rollback.error ?? null,
      rollbackSmoke:
        rollbackSmoke?.value ?? (rollbackSmoke?.error ? { error: rollbackSmoke.error } : null),
    },
  })
}

async function executeDeployment({ now, commands, stateStore, previous, sha, runs }) {
  const attempting = stateForAttempt({ previous, sha, runs, now })
  await stateStore.write(attempting)

  const deploy = await capture(() => commands.deploy(sha))
  if (deploy.error) {
    return handleDeployFailure({ commands, stateStore, attempting, now, sha, error: deploy.error })
  }

  const deployedSmoke = await capture(() => commands.smoke(STATUS.deployed))
  if (deployedSmoke.error) {
    return handleSmokeFailure({
      commands,
      stateStore,
      attempting,
      now,
      sha,
      error: deployedSmoke.error,
    })
  }

  await finishAttempt(stateStore, attempting, STATUS.deployed, now, {
    deployedSmoke: deployedSmoke.value,
  })
  return { status: STATUS.deployed, sha, deployedSmoke: deployedSmoke.value }
}

export async function runTrial({ now = new Date(), commands, stateStore, dryRun = false }) {
  if (!isTrialActive(now)) return { status: 'outside-trial-window' }
  const candidate = await assessCandidate({ now, commands, stateStore, dryRun })
  if (candidate.result) return candidate.result
  return executeDeployment({ now, commands, stateStore, ...candidate })
}

async function main() {
  const args = process.argv.slice(2)
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
    'unverified-live-sha-requires-manual',
    'rolled-back',
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
