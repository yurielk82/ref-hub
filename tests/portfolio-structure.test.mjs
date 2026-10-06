import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { ROOT, readAxData, readProjectData } from './helpers.mjs'

test('AX resume home route and data source are present', () => {
  const homePage = path.join(ROOT, 'app', '(portfolio)', 'page.tsx')
  const axPage = path.join(ROOT, 'app', '(portfolio)', 'ax', 'page.tsx')
  const axData = path.join(ROOT, 'data', 'ax.ts')
  const projectsPage = path.join(ROOT, 'app', '(portfolio)', 'projects', 'page.tsx')

  assert.ok(existsSync(homePage), 'missing AX resume home route: app/(portfolio)/page.tsx')
  assert.ok(existsSync(axPage), 'missing AX resume route: app/(portfolio)/ax/page.tsx')
  assert.ok(existsSync(axData), 'missing AX data source: data/ax.ts')
  assert.ok(
    existsSync(projectsPage),
    'missing projects index route: app/(portfolio)/projects/page.tsx',
  )
})

test('AX registry composes every case module in render order', () => {
  // readAxData()는 파일을 직접 읽으므로, 런타임 등록부가 같은 모듈을 같은
  // 순서로 결합하는지 여기서 함께 못 박는다 (모듈 누락·순서 뒤바뀜 회귀 방지).
  const axIndex = readFileSync(path.join(ROOT, 'data', 'ax.ts'), 'utf8')

  assert.match(
    axIndex,
    /AX_CASE_STUDIES[^=]*=\s*\[\s*\.\.\.DELIVERY_CASE_STUDIES,\s*\.\.\.TOOLING_CASE_STUDIES\s*\]/,
    'data/ax.ts should compose delivery then tooling case registries',
  )
  for (const module of ['./ax-cases/delivery', './ax-cases/tooling']) {
    assert.ok(axIndex.includes(module), `data/ax.ts should import ${module}`)
  }
})

test('AX case studies reference existing portfolio projects', () => {
  const axData = readAxData()
  const projectData = readProjectData()
  const axSlugs = [...axData.matchAll(/projectSlug:\s*'([^']+)'/g)].map((match) => match[1])
  const projectSlugs = new Set(
    [...projectData.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]),
  )

  assert.ok(axSlugs.length > 0, 'AX case studies should not be empty')
  for (const slug of axSlugs) {
    assert.ok(projectSlugs.has(slug), `AX case references unknown project slug: ${slug}`)
  }
})

test('AX case studies are ordered by AX relevance and delivery proof', () => {
  const axData = readAxData()
  const projectData = readProjectData()
  const axSlugs = [...axData.matchAll(/projectSlug:\s*'([^']+)'/g)].map((match) => match[1])
  const erpSpecBlock = projectData.match(/\{\n\s+slug:\s*'erp-spec'[\s\S]*?\n\s+\},/)?.[0] ?? ''
  const harnessBlock =
    projectData.match(/\{\n\s+slug:\s*'claude-dotfiles'[\s\S]*?\n\s+\},/)?.[0] ?? ''
  // All portfolio projects are AX case studies; lead with the highest-relevance
  // ones (pharmkpi line, kpis/csoweb/erp-spec/claude-dotfiles) and keep the
  // delivery order set in data/ax.ts.
  const expectedAxOrder = [
    'pharmkpi',
    'sales-hq-sfe',
    'sales-strategy-portal',
    'pharmkpi-exec',
    'kpis-dsr-api',
    'csoweb',
    'erp-spec',
    'claude-dotfiles',
    'har-eval',
    'ev-motor-reliability',
    'srt',
    'team-pulse',
    'naver-place-collector',
    'apinfy-lab',
  ]

  assert.deepEqual(
    axSlugs,
    expectedAxOrder,
    'AX case studies should lead with highest AX relevance',
  )
  // erp-spec 저장소 PROJECT.md 기준: 목적은 MariaDB 이관 선행 작업, 사용자는 사내 IT·ERP 이관 담당.
  // "인수사 IT팀"은 근거가 없어 2026-10-07 문구에서 뺐다.
  assert.match(axData, /ERP 이관|MariaDB/, 'ERP Spec AX case should name the migration context')
  assert.match(axData, /785개 테이블/, 'ERP Spec AX case should show ERP analysis scale')
  assert.match(erpSpecBlock, /ERP 구조/, 'ERP Spec project copy should reflect the AX positioning')
  // Intent-based (not exact taglines): the harness case is framed as a
  // Claude/Codex agentic harness, carries cost/measurement discipline, and the
  // skills philosophy. Per workspace test rules (avoid snapshot string pins).
  assert.match(
    axData,
    /Agentic Harness|Claude Code·Codex/,
    'AX page should frame the final case as a Claude/Codex agentic harness',
  )
  assert.match(harnessBlock, /Claude\/Codex|Codex/, 'Harness project copy should include Codex')
  assert.match(
    axData + harnessBlock,
    /측정으로 만들 것과 안 만들|빌드 시간/,
    'Harness copy should carry the cost/measurement-discipline message',
  )
  assert.match(
    axData + harnessBlock,
    /온디맨드 스킬|스킬로 묶/,
    'Harness copy should reflect the skills philosophy',
  )
  assert.match(
    axData + harnessBlock,
    /RAG 기억|wiki|그래프/,
    'Harness copy should explain persistent RAG-style memory',
  )
})

test('portfolio project summaries are AX-current and substantial', () => {
  const projectData = readProjectData()
  const projectBlocks = [...projectData.matchAll(/(\{\n\s+slug:\s*'([^']+)'[\s\S]*?\n\s+\},)/g)]

  assert.ok(projectBlocks.length > 0, 'portfolio projects should not be empty')

  for (const [, block, slug] of projectBlocks) {
    assert.match(block, /year:\s*'2026'/, `${slug} should display 2026 as portfolio year`)

    const featuresMatch = block.match(/features:\s*\[([\s\S]*?)\],/)
    assert.ok(featuresMatch, `${slug} should define feature bullets`)

    const features = [...featuresMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
    assert.ok(features.length >= 6, `${slug} should describe at least 6 major features`)
    for (const feature of features) {
      assert.ok(feature.length >= 24, `${slug} feature is too terse: ${feature}`)
      assert.doesNotMatch(
        feature,
        /엑셀|Excel|내보내기|Export|PDF|PNG|SVG|파일\s*생성|파일명|템플릿 다운로드/,
        `${slug} feature should emphasize web-native workflows, not file export: ${feature}`,
      )
    }
  }
})

test('landing is its own page and lists every portfolio project', () => {
  const homePage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'page.tsx'), 'utf8')
  const projectData = readProjectData()
  const projectCount = [...projectData.matchAll(/slug:\s*'([^']+)'/g)].length

  // Regression guard: the landing used to be `export { default } from './ax/page'`,
  // which made / and /ax byte-identical and hid every non-featured project.
  assert.doesNotMatch(
    homePage,
    /export\s*\{[^}]*default[^}]*\}\s*from\s*'\.\/ax\/page'/,
    'landing must not re-export the AX page',
  )
  assert.match(homePage, /PROJECTS/, 'landing should read the full project registry')
  assert.match(homePage, /SortableGrid/, 'landing should render the full project grid')
  assert.ok(projectCount >= 13, `portfolio should keep at least 13 projects, found ${projectCount}`)
})

test('AX deep-dive route stays distinct from the landing', () => {
  const homePage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'page.tsx'), 'utf8')
  const axPage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'ax', 'page.tsx'), 'utf8')

  for (const section of ['AX_METHOD', 'AX_STACK', 'AX_GROUNDING', 'AX_PILLARS']) {
    assert.match(axPage, new RegExp(section), `/ax should keep the ${section} deep-dive section`)
    assert.doesNotMatch(
      homePage,
      new RegExp(section),
      `landing should summarize, not duplicate, the ${section} deep-dive section`,
    )
  }
  assert.match(homePage, /href="\/ax"/, 'landing should link through to the AX deep dive')
})

test('docs index covers every manual directory under content/', () => {
  const docsPage = path.join(ROOT, 'app', '(portfolio)', 'docs', 'page.tsx')
  const manuals = readFileSync(path.join(ROOT, 'data', 'manuals.ts'), 'utf8')
  const nav = readFileSync(path.join(ROOT, 'components', 'portfolio', 'nav.tsx'), 'utf8')
  const contentDirs = readdirSync(path.join(ROOT, 'content'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  assert.ok(existsSync(docsPage), 'missing docs index route: app/(portfolio)/docs/page.tsx')
  assert.match(nav, /href="\/docs"/, 'portfolio nav should link to the docs index')

  const registered = new Set(
    [...manuals.matchAll(/^\s{2}'?([a-z0-9-]+)'?:\s*\{$/gm)].map((match) => match[1]),
  )
  for (const dir of contentDirs) {
    assert.ok(registered.has(dir), `docs index is missing the content/${dir} manual`)
  }
  assert.equal(
    registered.size,
    contentDirs.length,
    'docs index should not register manuals that have no content/ directory',
  )
})

test('retired projects do not advertise dead live URLs', () => {
  const projectData = readProjectData()
  const axData = readAxData()
  const retired = [
    { slug: 'pharmkpi-exec', host: 'exec.dvsharp.com' },
    { slug: 'apinfy-lab', host: 'apin.dvsharp.com' },
    // 2026-09-29 운영 중지 — 상용 정산 플랫폼 도입으로 개발을 멈췄다.
    { slug: 'csoweb', host: 'cso.dvsharp.com' },
  ]

  for (const { slug, host } of retired) {
    const block = projectData.match(
      new RegExp(`\\{\\n\\s+slug:\\s*'${slug}'[\\s\\S]*?\\n\\s+\\},`),
    )?.[0]
    assert.ok(block, `missing project block for ${slug}`)
    assert.doesNotMatch(
      block,
      /^\s*liveUrl:/m,
      `${slug} is retired — it must not advertise a liveUrl (${host} no longer serves)`,
    )
  }
  assert.doesNotMatch(
    axData,
    /exec\.dvsharp\.com 라이브/,
    'AX case copy should not claim the archived exec deployment is live',
  )
})

test('사례마다 내 역할·기간·현재 상태를 밝히고 후원자 공로 문장은 쓰지 않는다', () => {
  const axData = readAxData()
  const caseCount = [...axData.matchAll(/projectSlug:\s*'/g)].length

  // 사례 서사는 본인이 무엇을 맡고 결정했는지가 중심이다. 예전 sponsorship 칸은 모든 회사 사례에
  // "대표이사가 밀어준 과제"를 반복해 정작 본인 몫을 가렸다(오너 지적 2026-10-06).
  for (const field of ['role', 'period', 'status']) {
    const count = [...axData.matchAll(new RegExp(`^\\s+${field}:`, 'gm'))].length
    assert.equal(count, caseCount, `every case study should state its ${field}`)
  }
  assert.doesNotMatch(axData, /sponsorship/, 'case studies should not carry a sponsor-credit field')
  assert.doesNotMatch(
    axData,
    /대표이사가 (밀어|직접 지시)|대표이사의 지원/,
    'case copy should credit the owner’s own decisions, not the CEO’s backing',
  )
})

test('랜딩은 회사 업무와 그 밖의 작업을 나눠 보여 준다', () => {
  const homePage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'page.tsx'), 'utf8')
  const projectData = readProjectData()
  const projectCount = [...projectData.matchAll(/^\s+slug:\s*'/gm)].length
  const scopeCount = [...projectData.matchAll(/^\s+scope:\s*'(company|other)'/gm)].length

  assert.equal(scopeCount, projectCount, 'every project should declare company or other scope')
  assert.match(homePage, /COMPANY_PROJECTS/, 'landing should render the company work grid')
  assert.match(homePage, /OTHER_PROJECTS/, 'landing should render the other work grid')
})
