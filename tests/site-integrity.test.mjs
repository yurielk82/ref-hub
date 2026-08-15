import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, readProjectData } from './helpers.mjs'

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
      `missing sync source directory: ${path.relative(ROOT, sourceDir)}`,
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

  const cspHeader = embedHeaders.headers.find((header) => header.key === 'Content-Security-Policy')
  assert.ok(cspHeader, 'Content-Security-Policy header must exist')
  assert.match(cspHeader.value, /frame-ancestors/)
  assert.match(cspHeader.value, /'self'/)
  assert.match(cspHeader.value, /https:\/\/example\.dev/)
})

test('KPIS DSR portfolio screenshot is a real captured UI image', () => {
  const image = readFileSync(
    path.join(ROOT, 'public', 'images', 'portfolio', 'kpis-dsr-api', 'hero.png'),
  )
  const pngSignature = image.subarray(0, 8).toString('hex')
  const width = image.readUInt32BE(16)
  const height = image.readUInt32BE(20)

  assert.equal(pngSignature, '89504e470d0a1a0a', 'KPIS screenshot should be a PNG image')
  assert.ok(width >= 1000, `KPIS screenshot width is too small: ${width}`)
  assert.ok(height >= 600, `KPIS screenshot height is too small: ${height}`)
  assert.ok(image.byteLength >= 50_000, 'KPIS screenshot should not be a blank placeholder image')
})

test('ERP Spec portfolio screenshot uses the barcode relationship graph image', () => {
  const image = readFileSync(
    path.join(ROOT, 'public', 'images', 'portfolio', 'erp-spec', 'barcode-graph.png'),
  )
  const pngSignature = image.subarray(0, 8).toString('hex')
  const width = image.readUInt32BE(16)
  const height = image.readUInt32BE(20)
  const projectData = readProjectData()

  assert.match(projectData, /screenshot: '\/images\/portfolio\/erp-spec\/barcode-graph\.png'/)
  assert.equal(pngSignature, '89504e470d0a1a0a', 'ERP Spec screenshot should be a PNG image')
  assert.ok(width >= 1000, `ERP Spec screenshot width is too small: ${width}`)
  assert.ok(height >= 600, `ERP Spec screenshot height is too small: ${height}`)
  assert.ok(
    image.byteLength >= 50_000,
    'ERP Spec screenshot should not be a blank placeholder image',
  )
})

test('portfolio uses the strongest screenshot for each project context', () => {
  const projectData = readProjectData()
  const pharmKpiLogin = readFileSync(
    path.join(ROOT, 'public', 'images', 'portfolio', 'pharmkpi', 'hero.png'),
  )
  const pharmKpiSignature = pharmKpiLogin.subarray(0, 8).toString('hex')

  assert.match(
    projectData,
    /screenshot: '\/images\/portfolio\/pharmkpi\/hero\.png'/,
    'PharmKPI should use the stronger login-screen screenshot',
  )
  assert.equal(
    pharmKpiSignature,
    '89504e470d0a1a0a',
    'PharmKPI login screenshot should be a PNG image',
  )
  assert.ok(
    pharmKpiLogin.byteLength >= 50_000,
    'PharmKPI login screenshot should not be a blank placeholder image',
  )

  const internalScreenshots = [
    {
      name: 'SRT',
      path: path.join(ROOT, 'public', 'images', 'portfolio', 'srt', 'internal-dashboard.png'),
      source: /screenshot: '\/images\/portfolio\/srt\/internal-dashboard\.png'/,
    },
  ]

  for (const shot of internalScreenshots) {
    const image = readFileSync(shot.path)
    const pngSignature = image.subarray(0, 8).toString('hex')
    const width = image.readUInt32BE(16)
    const height = image.readUInt32BE(20)

    assert.match(projectData, shot.source, `${shot.name} should point to the logged-in screenshot`)
    assert.equal(pngSignature, '89504e470d0a1a0a', `${shot.name} screenshot should be a PNG image`)
    assert.ok(width >= 1000, `${shot.name} screenshot width is too small: ${width}`)
    assert.ok(height >= 600, `${shot.name} screenshot height is too small: ${height}`)
    assert.ok(
      image.byteLength >= 50_000,
      `${shot.name} screenshot should not be a blank placeholder image`,
    )
  }
})

test('portfolio screenshots are rendered from the visual center', () => {
  const thumbnail = readFileSync(
    path.join(ROOT, 'components', 'portfolio', 'project-thumbnail.tsx'),
    'utf8',
  )
  const projectPage = readFileSync(
    path.join(ROOT, 'app', '(portfolio)', 'projects', '[slug]', 'page.tsx'),
    'utf8',
  )
  const axPage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'ax', 'page.tsx'), 'utf8')

  assert.match(
    thumbnail,
    /object-cover object-center/,
    'portfolio screenshots should be centered inside their frame',
  )
  assert.match(
    thumbnail,
    /aspect-video w-full/,
    'portfolio screenshot wrapper should fill flex/grid image frames',
  )
  assert.match(
    projectPage,
    /lg:items-center/,
    'project detail hero should vertically center the screenshot column',
  )
  assert.match(
    axPage,
    /items-center justify-center/,
    'AX case screenshots should be centered inside their grid cell',
  )
})

test('standalone build script copies runtime static assets', () => {
  const packageJson = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  const buildScript = packageJson.scripts?.build ?? ''

  assert.match(buildScript, /next build/)
  assert.match(buildScript, /\.next\/static/)
  assert.match(buildScript, /\.next\/standalone\/\.next/)
  assert.match(buildScript, /public/)
  assert.match(buildScript, /\.next\/standalone/)
})
