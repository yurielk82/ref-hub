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
    }
  }
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
