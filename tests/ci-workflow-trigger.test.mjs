import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const workflowUrl = new URL('../.github/workflows/quality-gate.yml', import.meta.url)

test('should_run_CI_on_code_changes_without_an_unconditional_nightly_schedule', async () => {
  const workflow = await readFile(workflowUrl, 'utf8')
  const buildTest = workflow.slice(workflow.indexOf('\n  build-test:'))

  assert.match(workflow, /^\s*pull_request:\s*$/m)
  // PR 에서 통과한 검사를 병합 뒤 main push 로 다시 돌리지 않는다(워크스페이스 CI 예산).
  assert.doesNotMatch(workflow, /^\s*push:\s*$/m)
  assert.match(buildTest, /^\s*if: github\.event_name != 'schedule'\s*$/m)
})
