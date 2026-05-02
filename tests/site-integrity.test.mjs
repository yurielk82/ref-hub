import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
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

test('AX resume home route and data source are present', () => {
  const homePage = path.join(ROOT, 'app', '(portfolio)', 'page.tsx')
  const axPage = path.join(ROOT, 'app', '(portfolio)', 'ax', 'page.tsx')
  const axData = path.join(ROOT, 'data', 'ax.ts')
  const projectsPage = path.join(ROOT, 'app', '(portfolio)', 'projects', 'page.tsx')

  assert.ok(existsSync(homePage), 'missing AX resume home route: app/(portfolio)/page.tsx')
  assert.ok(existsSync(axPage), 'missing AX resume route: app/(portfolio)/ax/page.tsx')
  assert.ok(existsSync(axData), 'missing AX data source: data/ax.ts')
  assert.ok(existsSync(projectsPage), 'missing projects index route: app/(portfolio)/projects/page.tsx')
})

test('AX case studies reference existing portfolio projects', () => {
  const axData = readFileSync(path.join(ROOT, 'data', 'ax.ts'), 'utf8')
  const projectData = readFileSync(path.join(ROOT, 'data', 'projects.ts'), 'utf8')
  const axSlugs = [...axData.matchAll(/projectSlug:\s*'([^']+)'/g)].map(
    (match) => match[1]
  )
  const projectSlugs = new Set(
    [...projectData.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])
  )

  assert.ok(axSlugs.length > 0, 'AX case studies should not be empty')
  for (const slug of axSlugs) {
    assert.ok(projectSlugs.has(slug), `AX case references unknown project slug: ${slug}`)
  }
})

test('AX case studies are ordered by AX relevance and delivery proof', () => {
  const axData = readFileSync(path.join(ROOT, 'data', 'ax.ts'), 'utf8')
  const projectData = readFileSync(path.join(ROOT, 'data', 'projects.ts'), 'utf8')
  const axSlugs = [...axData.matchAll(/projectSlug:\s*'([^']+)'/g)].map(
    (match) => match[1]
  )
  const erpSpecBlock = projectData.match(/\{\n\s+slug:\s*'erp-spec'[\s\S]*?\n\s+\},/)?.[0] ?? ''
  const harnessBlock = projectData.match(/\{\n\s+slug:\s*'claude-dotfiles'[\s\S]*?\n\s+\},/)?.[0] ?? ''
  const expectedAxOrder = [
    'pharmkpi',
    'kpis-dsr-api',
    'csoweb',
    'erp-spec',
    'claude-dotfiles',
  ]

  assert.deepEqual(axSlugs, expectedAxOrder, 'AX case studies should lead with highest AX relevance')
  assert.match(axData, /인수사 IT팀/, 'ERP Spec AX case should name the acquirer IT-team context')
  assert.match(axData, /785개 테이블/, 'ERP Spec AX case should show ERP analysis scale')
  assert.match(erpSpecBlock, /인수사 IT팀|ERP 구조 분석/, 'ERP Spec project copy should reflect the AX positioning')
  assert.match(axData, /Claude\/Codex AX Delivery Harness/, 'AX page should frame the final case as a Claude/Codex harness')
  assert.match(harnessBlock, /Claude\/Codex|Codex/, 'Harness project copy should include Codex')
  assert.match(axData + harnessBlock, /코드는 싸지 않다/, 'Harness copy should carry the core cost-of-code message')
  assert.match(axData + harnessBlock, /mattpocock\/skills|작은 스킬/, 'Harness copy should reflect the skills philosophy reference')
  assert.match(axData + harnessBlock, /RAG 기억|wiki|그래프/, 'Harness copy should explain persistent RAG-style memory')
})

test('portfolio project summaries are AX-current and substantial', () => {
  const projectData = readFileSync(path.join(ROOT, 'data', 'projects.ts'), 'utf8')
  const projectBlocks = [...projectData.matchAll(/(\{\n\s+slug:\s*'([^']+)'[\s\S]*?\n\s+\},)/g)]

  assert.ok(projectBlocks.length > 0, 'portfolio projects should not be empty')

  for (const [, block, slug] of projectBlocks) {
    assert.match(block, /year:\s*'2026'/, `${slug} should display 2026 as portfolio year`)

    const featuresMatch = block.match(/features:\s*\[([\s\S]*?)\],/)
    assert.ok(featuresMatch, `${slug} should define feature bullets`)

    const features = [...featuresMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
    assert.ok(features.length >= 6, `${slug} should describe at least 6 major features`)
    for (const feature of features) {
      assert.ok(
        feature.length >= 24,
        `${slug} feature is too terse: ${feature}`
      )
      assert.doesNotMatch(
        feature,
        /엑셀|Excel|내보내기|Export|PDF|PNG|SVG|파일\s*생성|파일명|템플릿 다운로드/,
        `${slug} feature should emphasize web-native workflows, not file export: ${feature}`
      )
    }
  }
})

test('KPIS DSR portfolio screenshot is a real captured UI image', () => {
  const image = readFileSync(path.join(ROOT, 'public', 'images', 'portfolio', 'kpis-dsr-api', 'hero.png'))
  const pngSignature = image.subarray(0, 8).toString('hex')
  const width = image.readUInt32BE(16)
  const height = image.readUInt32BE(20)

  assert.equal(pngSignature, '89504e470d0a1a0a', 'KPIS screenshot should be a PNG image')
  assert.ok(width >= 1000, `KPIS screenshot width is too small: ${width}`)
  assert.ok(height >= 600, `KPIS screenshot height is too small: ${height}`)
  assert.ok(image.byteLength >= 50_000, 'KPIS screenshot should not be a blank placeholder image')
})

test('ERP Spec portfolio screenshot uses the barcode relationship graph image', () => {
  const image = readFileSync(path.join(ROOT, 'public', 'images', 'portfolio', 'erp-spec', 'barcode-graph.png'))
  const pngSignature = image.subarray(0, 8).toString('hex')
  const width = image.readUInt32BE(16)
  const height = image.readUInt32BE(20)
  const projectData = readFileSync(path.join(ROOT, 'data', 'projects.ts'), 'utf8')

  assert.match(projectData, /screenshot: '\/images\/portfolio\/erp-spec\/barcode-graph\.png'/)
  assert.equal(pngSignature, '89504e470d0a1a0a', 'ERP Spec screenshot should be a PNG image')
  assert.ok(width >= 1000, `ERP Spec screenshot width is too small: ${width}`)
  assert.ok(height >= 600, `ERP Spec screenshot height is too small: ${height}`)
  assert.ok(image.byteLength >= 50_000, 'ERP Spec screenshot should not be a blank placeholder image')
})

test('portfolio screenshots are rendered from the visual center', () => {
  const thumbnail = readFileSync(path.join(ROOT, 'components', 'portfolio', 'project-thumbnail.tsx'), 'utf8')

  assert.match(thumbnail, /object-cover object-center/, 'portfolio screenshots should be centered inside their frame')
})

test('About route is removed from the portfolio surface', () => {
  const aboutPage = path.join(ROOT, 'app', '(portfolio)', 'about', 'page.tsx')
  const nav = readFileSync(path.join(ROOT, 'components', 'portfolio', 'nav.tsx'), 'utf8')

  assert.ok(!existsSync(aboutPage), 'About page should be removed because AX home replaces it')
  assert.doesNotMatch(nav, /href=["{']\/about/, 'portfolio nav should not link to /about')
  assert.doesNotMatch(nav, />\s*About\s*</, 'portfolio nav should not render About')
})

test('standalone build script copies runtime static assets', () => {
  const packageJson = JSON.parse(
    readFileSync(path.join(ROOT, 'package.json'), 'utf8')
  )
  const buildScript = packageJson.scripts?.build ?? ''

  assert.match(buildScript, /next build/)
  assert.match(buildScript, /\.next\/static/)
  assert.match(buildScript, /\.next\/standalone\/\.next/)
  assert.match(buildScript, /public/)
  assert.match(buildScript, /\.next\/standalone/)
})
