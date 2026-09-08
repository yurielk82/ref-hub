import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, readProjectData } from './helpers.mjs'

const SYNCED_PROJECTS = [
  { repo: 'csoweb', content: 'csoweb' },
  { repo: 'kpis-dsr-api', content: 'kpis-dsr-api' },
  { repo: 'ev-motor-reliability', content: 'ev-motor-reliability' },
]

test('sync inputs exist for every registered project', () => {
  const offline = process.env.REF_HUB_OFFLINE_CONTENT === '1'

  for (const project of SYNCED_PROJECTS) {
    if (offline) {
      const contentDir = path.join(ROOT, 'content', project.content)
      assert.ok(
        existsSync(path.join(contentDir, 'index.mdx')),
        `missing ${project.content}/index.mdx`,
      )
      assert.ok(
        existsSync(path.join(contentDir, '_meta.tsx')),
        `missing ${project.content}/_meta.tsx`,
      )
    } else {
      const sourceDir = path.join(ROOT, 'repos', project.repo, 'docs', 'manual')
      assert.ok(
        existsSync(sourceDir),
        `missing sync source directory: ${path.relative(ROOT, sourceDir)}`,
      )
    }
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

/** next.config.mjs 의 headers() 를 EMBED_ORIGIN_DEV 를 세운 상태로 읽는다. */
async function readHeaderRules() {
  process.env.EMBED_ORIGIN_DEV = 'https://example.dev'
  const configModule = await import(pathToFileURL(path.join(ROOT, 'next.config.mjs')).href)
  const headers = await configModule.default.headers()
  assert.ok(Array.isArray(headers), 'headers() should return an array')
  return headers
}

const valueOf = (rule, key) => rule.headers.find((header) => header.key === key)?.value

test('embed mode keeps CSP frame-ancestors protection', async () => {
  const headers = await readHeaderRules()

  // embed 규칙은 source 가 아니라 embed 쿼리 술어로 특정한다 — source 만으로는
  // 기본 보안 규칙과 구분되지 않는다.
  const embedRule = headers.find((entry) =>
    entry.has?.some((condition) => condition.type === 'query' && condition.key === 'embed'),
  )
  assert.ok(embedRule, 'embed header rule must exist')

  const csp = valueOf(embedRule, 'Content-Security-Policy')
  assert.ok(csp, 'Content-Security-Policy header must exist')
  assert.match(csp, /frame-ancestors/)
  assert.match(csp, /'self'/)
  assert.match(csp, /https:\/\/example\.dev/)
})

test('requests without the embed query are denied framing by default', async () => {
  const headers = await readHeaderRules()

  const defaultRules = headers.filter((entry) => !entry.has)
  assert.ok(defaultRules.length > 0, 'a rule must apply when no embed query is present')

  // 기본 경로(/ 와 그 하위) 양쪽에 프레임 거부가 걸려야 한다. 하나라도 비면
  // 공격자는 쿼리를 붙이지 않는 것만으로 통제를 우회한다.
  for (const source of ['/', '/:path*']) {
    const rule = defaultRules.find((entry) => entry.source === source)
    assert.ok(rule, `default rule for ${source} must exist`)
    assert.equal(valueOf(rule, 'Content-Security-Policy'), "frame-ancestors 'none'")
    assert.equal(valueOf(rule, 'X-Frame-Options'), 'DENY')
    assert.equal(valueOf(rule, 'X-Content-Type-Options'), 'nosniff')
  }
})

test('document responses cap the shared cache below the incident threshold', async () => {
  const headers = await readHeaderRules()

  const cacheRules = headers.filter((entry) => valueOf(entry, 'Cache-Control'))
  assert.ok(cacheRules.length > 0, 'a Cache-Control rule must exist for document responses')

  for (const rule of cacheRules) {
    const value = valueOf(rule, 'Cache-Control')
    const sMaxAge = Number(/s-maxage=(\d+)/.exec(value)?.[1])
    assert.ok(Number.isFinite(sMaxAge), `Cache-Control must set s-maxage: ${value}`)
    // 2026-08-30 사고: 404 가 s-maxage=31536000 으로 CDN 에 1년 박혔다.
    assert.ok(sMaxAge <= 300, `s-maxage must stay bounded, got ${sMaxAge} in ${rule.source}`)
    // 빌드 해시 자산은 상한 대상이 아니다 — immutable 장기 캐시를 유지해야 한다.
    assert.ok(
      !rule.source.startsWith('/_next/'),
      `build-hashed assets must keep their immutable cache, but ${rule.source} was capped`,
    )
  }
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

  assert.match(
    buildScript,
    /node --disable-wasm-trap-handler \.\/node_modules\/next\/dist\/bin\/next build --webpack/,
    'Next.js must use the Webpack builder supported by the ARM production host',
  )
  assert.match(buildScript, /\.next\/static/)
  assert.match(buildScript, /\.next\/standalone\/\.next/)
  assert.match(buildScript, /public/)
  assert.match(buildScript, /\.next\/standalone/)
  assert.doesNotMatch(
    buildScript,
    /NODE_OPTIONS="[^"]*disable-wasm-trap-handler/,
    'Next.js workers must not inherit disable-wasm-trap-handler through NODE_OPTIONS',
  )
})
