import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const workflowUrl = new URL('../.github/workflows/ci.yml', import.meta.url)

test('should_run_CI_on_code_changes_without_an_unconditional_nightly_schedule', async () => {
  const workflow = await readFile(workflowUrl, 'utf8')

  assert.match(workflow, /^\s*push:\s*$/m)
  assert.match(workflow, /^\s*pull_request:\s*$/m)
  assert.doesNotMatch(workflow, /^\s*schedule:\s*$/m)
})
