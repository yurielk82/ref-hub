/**
 * submodule의 docs/manual/ → content/{project}/ 동기화
 * prebuild, predev에서 자동 실행
 */
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { syncDocs } from './sync-docs-lib.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PROJECTS = [
  { repo: 'csoweb', content: 'csoweb' },
  { repo: 'kpis-dsr-api', content: 'kpis-dsr-api' },
  { repo: 'ev-motor-reliability', content: 'ev-motor-reliability' },
]

try {
  const result = syncDocs({
    root: ROOT,
    projects: PROJECTS,
    offline: process.env.REF_HUB_OFFLINE_CONTENT === '1',
  })
  console.log(
    `[sync-docs] complete: ${result.synced} synced, ${result.snapshots} snapshots, ${result.failed} failed`,
  )
} catch (error) {
  console.error(`[sync-docs] fatal: ${error.message}`)
  process.exitCode = 1
}
