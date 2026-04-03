/**
 * 포트폴리오 스크린샷 캡처 스크립트
 * 라이브 사이트에서 Playwright로 스크린샷을 캡처합니다.
 *
 * 사용: node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = resolve(__dirname, '../public/images/portfolio')

const SITES = [
  {
    slug: 'pharmkpi',
    url: 'https://kpi.dvsharp.com',
    waitFor: 3000,
  },
  {
    slug: 'csoweb',
    url: 'https://cso.dvsharp.com',
    waitFor: 3000,
  },
  {
    slug: 'kpis-dsr-api',
    url: 'http://localhost:3002',
    waitFor: 3000,
  },
  {
    slug: 'erp-spec',
    url: 'https://erp-spec.dvsharp.com',
    waitFor: 2000,
  },
  {
    slug: 'ev-motor-reliability',
    url: 'https://ev-motor-reliability.vercel.app',
    waitFor: 3000,
  },
]

async function capture() {
  const browser = await chromium.launch({ headless: true })

  for (const site of SITES) {
    const dir = resolve(OUTPUT_DIR, site.slug)
    mkdirSync(dir, { recursive: true })

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
      colorScheme: 'dark',
    })
    const page = await context.newPage()

    try {
      console.log(`[capture] ${site.slug} → ${site.url}`)
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 15000 })
      await page.waitForTimeout(site.waitFor)
      await page.screenshot({
        path: resolve(dir, 'hero.png'),
        type: 'png',
      })
      console.log(`  ✓ ${site.slug}/hero.png`)
    } catch (err) {
      console.error(`  ✗ ${site.slug}: ${err.message}`)
    } finally {
      await context.close()
    }
  }

  await browser.close()
  console.log('[capture] 완료')
}

capture()
