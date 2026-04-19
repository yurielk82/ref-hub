import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = path.resolve(import.meta.dirname, '..')

const SYNCED_PROJECTS = [
  { repo: 'csoweb', content: 'csoweb' },
  { repo: 'kpis-dsr-api', content: 'kpis-dsr-api' },
  { repo: 'studiogo', content: 'studiogo' },
]

test('synced source docs exist for every registered project', () => {
  for (const project of SYNCED_PROJECTS) {
    const sourceDir = path.join(ROOT, 'repos', project.repo, 'docs', 'manual')
    assert.ok(
      existsSync(sourceDir),
      `missing sync source directory: ${path.relative(ROOT, sourceDir)}`
    )
  }
})

test('content directories keep required entry files', () => {
  const contentRoot = path.join(ROOT, 'content')
  const contentDirs = readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  assert.ok(contentDirs.length > 0, 'content directory should not be empty')

  for (const dir of contentDirs) {
    const contentDir = path.join(contentRoot, dir)
    const indexFile = path.join(contentDir, 'index.mdx')
    const metaFile = path.join(contentDir, '_meta.tsx')
    assert.ok(existsSync(indexFile), `missing index.mdx in content/${dir}`)
    assert.ok(existsSync(metaFile), `missing _meta.tsx in content/${dir}`)
  }
})

test('embed mode keeps CSP frame-ancestors protection', async () => {
  process.env.EMBED_ORIGIN_DEV = 'https://example.dev'
  const configModule = await import(pathToFileURL(path.join(ROOT, 'next.config.mjs')).href)
  const nextConfig = configModule.default
  const headers = await nextConfig.headers()

  assert.ok(Array.isArray(headers), 'headers() should return an array')
  const embedHeaders = headers.find((entry) => entry.source === '/:path*')
  assert.ok(embedHeaders, 'embed header rule must exist')

  const cspHeader = embedHeaders.headers.find(
    (header) => header.key === 'Content-Security-Policy'
  )
  assert.ok(cspHeader, 'Content-Security-Policy header must exist')
  assert.match(cspHeader.value, /frame-ancestors/)
  assert.match(cspHeader.value, /'self'/)
  assert.match(cspHeader.value, /https:\/\/example\.dev/)
})
