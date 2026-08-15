import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { ROOT } from './helpers.mjs'

test('career history is rendered instead of a separate About route', () => {
  const aboutPage = path.join(ROOT, 'app', '(portfolio)', 'about', 'page.tsx')
  const nav = readFileSync(path.join(ROOT, 'components', 'portfolio', 'nav.tsx'), 'utf8')
  const careerSection = path.join(ROOT, 'components', 'portfolio', 'career-section.tsx')
  const homePage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'page.tsx'), 'utf8')

  assert.ok(!existsSync(aboutPage), 'About page stays removed — career lives on the landing')
  assert.doesNotMatch(nav, /href=["{']\/about/, 'portfolio nav should not link to /about')
  assert.ok(
    existsSync(careerSection),
    'missing career surface: components/portfolio/career-section.tsx',
  )

  // data/experience.ts was dead code while /about existed; it must now be rendered.
  const career = readFileSync(careerSection, 'utf8')
  assert.match(career, /EXPERIENCES/, 'career section should render EXPERIENCES')
  assert.match(career, /SKILL_CATEGORIES/, 'career section should render SKILL_CATEGORIES')
  assert.match(career, /from '@\/data\/experience'/, 'career section should import data/experience')
  assert.match(homePage, /CareerSection/, 'landing should mount the career section')
  assert.match(nav, /href="\/#career"/, 'portfolio nav should reach the career section')
})

test('resume identity is visible, not buried in the footer copyright', () => {
  const axContent = readFileSync(path.join(ROOT, 'data', 'ax-content.ts'), 'utf8')
  const hero = readFileSync(path.join(ROOT, 'components', 'portfolio', 'ax-sections.tsx'), 'utf8')
  const homePage = readFileSync(path.join(ROOT, 'app', '(portfolio)', 'page.tsx'), 'utf8')

  // The name used to appear only in the footer, so a recruiter opening the link
  // saw no owner in the tab title or above the fold.
  assert.match(axContent, /name:\s*'권대환'/, 'AX_HERO should carry the owner name')
  assert.match(axContent, /role:\s*'[^']+'/, 'AX_HERO should carry a job-title headline')
  assert.match(hero, /AX_HERO\.name/, 'hero should render the owner name')
  assert.match(hero, /AX_HERO\.role/, 'hero should render the job-title headline')
  assert.match(homePage, /AX_HERO\.name/, 'landing metadata should put the name in the title')
})

test('career separates employment from independent work and carries outcomes', () => {
  const experience = readFileSync(path.join(ROOT, 'data', 'experience.ts'), 'utf8')
  const section = readFileSync(
    path.join(ROOT, 'components', 'portfolio', 'career-section.tsx'),
    'utf8',
  )

  assert.match(experience, /kind:\s*'employment'/, 'at least one entry must be real employment')
  assert.match(experience, /kind:\s*'independent'/, 'personal work must be marked as independent')
  assert.match(section, /employment/, 'career section should group employment separately')

  // Every entry needs quantified outcomes — a resume without them reads as a task list.
  const entries = [...experience.matchAll(/highlights:\s*\[([\s\S]*?)\],\n\s+projects:/g)]
  assert.ok(entries.length >= 3, `every experience entry needs highlights, found ${entries.length}`)
  for (const [, block] of entries) {
    const bullets = [...block.matchAll(/'([^']+)'/g)].map((match) => match[1])
    assert.ok(bullets.length >= 1, 'each experience entry should list at least one outcome')
  }
})

test('skill list reflects the operations stack it claims to run', () => {
  const experience = readFileSync(path.join(ROOT, 'data', 'experience.ts'), 'utf8')
  const skills = experience.match(/SKILL_CATEGORIES[\s\S]*$/)?.[0] ?? ''

  // The hero claims 20+ self-hosted production services; the stack must show it.
  for (const tool of ['Nginx', 'systemd', 'Docker', 'Cloudflare']) {
    assert.ok(skills.includes(tool), `skills should list the operations tool ${tool}`)
  }
  // Previously listed but unsupported by any project on this site.
  for (const stale of ['Office 365', 'Netlify', 'Hono', 'React Native']) {
    assert.ok(!skills.includes(stale), `skills should drop unsupported entry ${stale}`)
  }
})

test('print stylesheet makes the resume printable', () => {
  const css = readFileSync(path.join(ROOT, 'app', 'globals.css'), 'utf8')
  const printBlock = css.match(/@media print \{[\s\S]*\}/)?.[0] ?? ''
  const button = path.join(ROOT, 'components', 'portfolio', 'print-button.tsx')

  assert.ok(printBlock, 'globals.css should define a print stylesheet')
  // motion's whileInView leaves off-screen blocks at opacity 0; printing them
  // straight produces blank pages for everything the reader never scrolled to.
  assert.match(
    printBlock,
    /opacity:\s*1\s*!important/,
    'print must defeat scroll-triggered fade-in',
  )
  assert.match(
    printBlock,
    /transform:\s*none\s*!important/,
    'print must defeat the translateY offset',
  )
  assert.match(printBlock, /\[data-print-hide\]/, 'print must hide print-only controls')
  assert.ok(existsSync(button), 'missing print entry point: components/portfolio/print-button.tsx')
})
