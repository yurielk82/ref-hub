import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = path.resolve(import.meta.dirname, '..')
const LIBRARY_PATH = path.join(ROOT, 'scripts', 'sync-docs-lib.mjs')

async function loadSyncLibrary() {
  assert.ok(existsSync(LIBRARY_PATH), 'sync-docs library must exist')
  return import(pathToFileURL(LIBRARY_PATH).href)
}

function createSnapshot(root, name) {
  const contentDir = path.join(root, 'content', name)
  mkdirSync(contentDir, { recursive: true })
  writeFileSync(path.join(contentDir, 'index.mdx'), `# ${name}\n`)
  writeFileSync(path.join(contentDir, '_meta.tsx'), 'export default {}\n')
}

test('should_validate_tracked_snapshots_when_offline_ci_has_no_submodules', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'ref-hub-sync-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  createSnapshot(root, 'csoweb')

  const { syncDocs } = await loadSyncLibrary()
  const result = syncDocs({
    root,
    offline: true,
    projects: [{ repo: 'csoweb', content: 'csoweb' }],
    logger: { info() {}, error() {} },
  })

  assert.deepEqual(result, { synced: 0, snapshots: 1, failed: 0 })
})

test('should_fail_closed_when_offline_ci_snapshot_is_missing', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'ref-hub-sync-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))

  const { syncDocs } = await loadSyncLibrary()

  assert.throws(
    () =>
      syncDocs({
        root,
        offline: true,
        projects: [{ repo: 'csoweb', content: 'csoweb' }],
        logger: { info() {}, error() {} },
      }),
    /tracked snapshot is incomplete: content\/csoweb/,
  )
})
