# Ref Hub CI-Gated Deployment Trial Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Run a seven-day, fail-closed trial in which only a `main` SHA with successful GitHub `CI` and `Quality Gate` push runs can be deployed to `ref.dvsharp.com`.

**Architecture:** GitHub-hosted Actions perform deterministic build and test checks without production credentials. A time-bounded controller on the existing OCI host polls the exact `main` SHA and both required workflow results, rejects dirty/diverged/dependency-changing candidates, fast-forwards to that immutable SHA, invokes the registered workspace deploy command with the same committed content snapshot CI verified, and runs a Firefox browser smoke test. It records every attempted SHA so a failed deployment is not retried automatically.

**Tech Stack:** GitHub Actions, Node.js 24, GitHub CLI, Next.js 16, Playwright Firefox, workspace `bin/deploy.sh`, cron.

---

### Task 1: Make CI work without private submodule credentials

**Files:**
- Modify: `scripts/sync-docs.mjs`
- Modify: `tests/site-integrity.test.mjs`
- Modify: `.github/workflows/ci.yml`
- Test: `tests/sync-docs.test.mjs`

1. Write tests proving offline CI mode accepts tracked content snapshots and fails when a required snapshot is absent.
2. Run the focused test and confirm it fails because offline mode is not implemented.
3. Extract the sync operation into testable functions and add explicit `REF_HUB_OFFLINE_CONTENT=1` behavior.
4. Run the focused test and the existing test suite.
5. Add `push: main`, least-privilege permissions, pinned official action SHAs, and offline mode to the CI workflow.

### Task 2: Establish a green security and browser dependency baseline

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

1. Add Playwright as a pinned development dependency for the production browser audit.
2. Upgrade Next.js to the first locally verified secure major and apply compatible dependency updates that remove current high/critical audit findings.
3. Run `npm audit --audit-level=high`, tests, typecheck, and build.
4. Stop without merging if a high/critical finding remains.

### Task 3: Implement fail-closed deployment policy

**Files:**
- Create: `scripts/ci-deploy-policy.mjs`
- Test: `tests/ci-deploy-policy.test.mjs`

1. Write failing tests for the KST trial window, exact SHA matching, successful push-run requirement, already-attempted SHA suppression, and failed-run rejection.
2. Run the focused tests and confirm expected failures.
3. Implement the smallest pure policy functions.
4. Run the focused tests and full suite.

### Task 4: Implement the host-side controller

**Files:**
- Create: `scripts/ci-deploy-trial.mjs`
- Test: `tests/ci-deploy-trial.test.mjs`

1. Write failing tests using injected command and state adapters.
2. Cover fetch failure, non-fast-forward history, CI failure, deploy failure, browser failure, rollback, and success state recording.
3. Implement the controller using `gh run list`, `/home/ubuntu/GitHub/bin/deploy.sh ref-hub --expected-ref <SHA>` for exact-SHA fast-forward under the registered project lock, atomic attempt-history writes, and one-attempt-per-SHA behavior. Dependency manifest changes remain manual during the trial so package installation cannot race the registered deploy lock.
4. Run focused and full tests.

### Task 5: Implement production browser smoke verification

**Files:**
- Create: `scripts/production-smoke.mjs`
- Test: `tests/production-smoke.test.mjs`

1. Write failing tests for route definitions and console/page/network failure classification.
2. Implement Firefox checks for `/`, `/projects`, and `/docs`, including screenshots and a JSON report.
3. Run unit tests and a live smoke test against `https://ref.dvsharp.com`.

### Task 6: Verify, deliver, and activate the bounded trial

**Files:**
- Modify externally: owner crontab, one marked line only

1. Run tests, typecheck, lint, build, actionlint, and high-severity audit.
2. Run the controller in dry-run mode for expired, waiting, and eligible policy paths.
3. Commit only task files, push the feature branch, create the PR, and wait for its exact head checks.
4. Merge only after all required checks are green and re-confirm the head SHA.
5. Bootstrap this dependency-changing PR explicitly through the official deploy gateway with `--expected-ref <merged-SHA> --npm-ci`, so the exact-SHA fast-forward, one-time dependency install, build, and rollback protection share the existing project lock; then run the SHA-aware Firefox smoke test.
6. Install the marked cron entry and manually invoke the controller once; later dependency manifest changes remain manual-review-only.
7. Verify the deployed SHA marker, registered HTTP health, Firefox browser report, and both GitHub run statuses.
8. Keep the trial bounded to `2026-09-08T00:00:00+09:00` through `2026-09-15T00:00:00+09:00`; after the end instant the controller must perform no deploy.
