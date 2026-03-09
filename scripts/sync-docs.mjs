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
  { repo: 'ev-motor-reliability', content: 'ev-motor-reliability' },
]

for (const { repo, content } of PROJECTS) {
  const src = resolve(ROOT, 'repos', repo, 'docs', 'manual')
  const dest = resolve(ROOT, 'content', content)

  if (!existsSync(src)) {
    console.warn(`[sync-docs] 경고: ${src} 없음 — 건너뜀`)
    continue
  }

  // clean sync: 기존 파일 삭제 후 복사
  if (existsSync(dest)) {
    rmSync(dest, { recursive: true })
  }
  cpSync(src, dest, { recursive: true })
  console.log(`[sync-docs] ${repo}/docs/manual/ → content/${content}/`)
}

console.log('[sync-docs] 동기화 완료')
