export const TRIAL_START = '2026-09-08T00:00:00+09:00'
export const TRIAL_END = '2026-09-15T00:00:00+09:00'

const EXACT_SHA = /^[0-9a-f]{40}$/i
export const REQUIRED_WORKFLOWS = Object.freeze(['CI', 'Quality Gate'])

export function isTrialActive(now) {
  const instant = now instanceof Date ? now.getTime() : Number.NaN
  return instant >= Date.parse(TRIAL_START) && instant < Date.parse(TRIAL_END)
}

function latestExactPushRun(runs, sha, workflowName) {
  return runs
    .filter(
      (run) =>
        run.headSha === sha &&
        run.headBranch === 'main' &&
        run.event === 'push' &&
        run.workflowName === workflowName,
    )
    .sort((left, right) => Number(right.databaseId ?? 0) - Number(left.databaseId ?? 0))[0]
}

export function evaluateDeployment({ now, sha, lastAttemptedSha, attemptedShas = [], runs }) {
  if (!isTrialActive(now)) {
    return { action: 'skip', reason: 'outside-trial-window' }
  }
  if (!EXACT_SHA.test(sha)) {
    return { action: 'skip', reason: 'invalid-sha' }
  }
  if (lastAttemptedSha === sha || attemptedShas.includes(sha)) {
    return { action: 'skip', reason: 'already-attempted' }
  }

  const candidates = Array.isArray(runs) ? runs : []
  const requiredRuns = REQUIRED_WORKFLOWS.map((workflowName) =>
    latestExactPushRun(candidates, sha, workflowName),
  )
  if (requiredRuns.some((run) => !run)) {
    return { action: 'wait', reason: 'ci-run-not-found' }
  }
  if (requiredRuns.some((run) => run.status !== 'completed')) {
    return { action: 'wait', reason: 'ci-running' }
  }
  if (requiredRuns.some((run) => run.conclusion !== 'success')) {
    return { action: 'skip', reason: 'ci-failed' }
  }
  return { action: 'deploy', reason: 'ci-success', runs: requiredRuns }
}
