/**
 * submodule의 docs/manual/ → content/{project}/ 동기화
 * prebuild, predev에서 자동 실행
 */
import { cpSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PROJECTS = [
  { repo: 'csoweb', content: 'csoweb' },
  { repo: 'kpis-dsr-api', content: 'kpis-dsr-api' },
  { repo: 'studiogo', content: 'studiogo' },
]

let synced = 0
let failed = 0

for (const { repo, content } of PROJECTS) {
  const src = resolve(ROOT, 'repos', repo, 'docs', 'manual')
  const dest = resolve(ROOT, 'content', content)

  if (!existsSync(src)) {
    console.error(`[sync-docs] 오류: ${src} 없음`)
    failed++
    continue
  }

  try {
    if (existsSync(dest)) {
      rmSync(dest, { recursive: true })
    }
    cpSync(src, dest, { recursive: true })
    synced++
    console.log(`[sync-docs] ${repo}/docs/manual/ → content/${content}/`)
  } catch (err) {
    console.error(`[sync-docs] 실패: ${repo}`, err.message)
    failed++
  }
}

console.log(`[sync-docs] 완료: ${synced}개 동기화, ${failed}개 실패`)
if (failed > 0 && synced === 0 && !process.env.VERCEL) process.exit(1)
