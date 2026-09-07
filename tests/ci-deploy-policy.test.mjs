import assert from 'node:assert/strict'
import test from 'node:test'

import {
  TRIAL_END,
  TRIAL_START,
  evaluateDeployment,
  isTrialActive,
} from '../scripts/ci-deploy-policy.mjs'

const SHA = '0123456789abcdef0123456789abcdef01234567'

function run(overrides = {}) {
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
    run(overrides.CI),
    run({ databaseId: 102, workflowName: 'Quality Gate', ...overrides.qualityGate }),
  ]
}

test('should_use_KST_inclusive_start_and_exclusive_end_when_checking_trial_window', () => {
  assert.equal(isTrialActive(new Date(TRIAL_START)), true)
  assert.equal(isTrialActive(new Date('2026-09-14T23:59:59.999+09:00')), true)
  assert.equal(isTrialActive(new Date(TRIAL_END)), false)
  assert.equal(isTrialActive(new Date('2026-09-07T23:59:59.999+09:00')), false)
})

test('should_deploy_when_exact_main_push_SHA_has_successful_completed_CI', () => {
  assert.deepEqual(
    evaluateDeployment({
      now: new Date('2026-09-08T12:00:00+09:00'),
      sha: SHA,
      lastAttemptedSha: null,
      attemptedShas: [],
      runs: requiredRuns(),
    }),
    { action: 'deploy', reason: 'ci-success', runs: requiredRuns() },
  )
})

test('should_fail_closed_when_SHA_is_not_exactly_40_hex_characters', () => {
  assert.deepEqual(
    evaluateDeployment({
      now: new Date('2026-09-08T12:00:00+09:00'),
      sha: '0123456',
      lastAttemptedSha: null,
      attemptedShas: [],
      runs: requiredRuns(),
    }),
    { action: 'skip', reason: 'invalid-sha' },
  )
})

test('should_skip_when_outside_trial_window_or_SHA_was_already_attempted', () => {
  assert.deepEqual(
    evaluateDeployment({
      now: new Date('2026-09-15T00:00:00+09:00'),
      sha: SHA,
      lastAttemptedSha: null,
      attemptedShas: [],
      runs: requiredRuns(),
    }),
    { action: 'skip', reason: 'outside-trial-window' },
  )
  assert.deepEqual(
    evaluateDeployment({
      now: new Date('2026-09-08T12:00:00+09:00'),
      sha: SHA,
      lastAttemptedSha: SHA,
      attemptedShas: [],
      runs: requiredRuns(),
    }),
    { action: 'skip', reason: 'already-attempted' },
  )
})

test('should_never_retry_any_SHA_recorded_in_attempt_history', () => {
  assert.deepEqual(
    evaluateDeployment({
      now: new Date('2026-09-08T12:00:00+09:00'),
      sha: SHA,
      lastAttemptedSha: 'abcdef0123456789abcdef0123456789abcdef01',
      attemptedShas: [SHA, 'abcdef0123456789abcdef0123456789abcdef01'],
      runs: requiredRuns(),
    }),
    { action: 'skip', reason: 'already-attempted' },
  )
})

test('should_wait_when_exact_push_run_is_missing_or_still_running', () => {
  const base = {
    now: new Date('2026-09-08T12:00:00+09:00'),
    sha: SHA,
    lastAttemptedSha: null,
    attemptedShas: [],
  }

  assert.deepEqual(evaluateDeployment({ ...base, runs: [] }), {
    action: 'wait',
    reason: 'ci-run-not-found',
  })
  assert.deepEqual(
    evaluateDeployment({
      ...base,
      runs: requiredRuns({ CI: { status: 'in_progress', conclusion: '' } }),
    }),
    { action: 'wait', reason: 'ci-running' },
  )
})

test('should_require_both_CI_and_Quality_Gate_for_the_exact_push_SHA', () => {
  assert.deepEqual(
    evaluateDeployment({
      now: new Date('2026-09-08T12:00:00+09:00'),
      sha: SHA,
      lastAttemptedSha: null,
      attemptedShas: [],
      runs: [run()],
    }),
    { action: 'wait', reason: 'ci-run-not-found' },
  )

  const decision = evaluateDeployment({
    now: new Date('2026-09-08T12:00:00+09:00'),
    sha: SHA,
    lastAttemptedSha: null,
    attemptedShas: [],
    runs: [
      run({ databaseId: 1, event: 'schedule' }),
      run({ databaseId: 2, headBranch: 'feature' }),
      run({ databaseId: 3, headSha: 'abcdef0123456789abcdef0123456789abcdef01' }),
      ...requiredRuns({ qualityGate: { conclusion: 'failure' } }),
    ],
  })

  assert.deepEqual(decision, {
    action: 'skip',
    reason: 'ci-failed',
  })
})
