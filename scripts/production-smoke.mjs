#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { firefox } from 'playwright'

const CLIENT_SETTLE_MS = 750
const SCROLL_STEP_PX = 700
const SCROLL_SETTLE_MS = 75
const SCROLL_RESET_SETTLE_MS = 250
const DEPLOY_MARKER_LENGTH = 7

export const SMOKE_ROUTES = Object.freeze([
  { path: '/', slug: 'home' },
  { path: '/projects', slug: 'projects' },
  { path: '/docs', slug: 'docs' },
])

function navigationFailure(responseStatus) {
  if (responseStatus === null || responseStatus === undefined) {
    return 'navigation-no-response'
  }
  return responseStatus >= 400 ? `http-status:${responseStatus}` : null
}

function countFailure(items, label) {
  return items?.length ? `${label}:${items.length}` : null
}

function deploymentMarkerFailure({ expectedSha, deploymentMarkers }) {
  if (!expectedSha) return null
  return deploymentMarkers?.includes(expectedSha.slice(0, DEPLOY_MARKER_LENGTH))
    ? null
    : 'deployment-marker-mismatch'
}

export function classifyRouteResult(result) {
  const failures = [
    navigationFailure(result.responseStatus),
    result.mainVisible ? null : 'main-not-visible',
    result.title?.trim() ? null : 'empty-title',
    result.headingVisible ? null : 'heading-not-visible',
    result.headingText?.trim() ? null : 'empty-heading',
    countFailure(result.consoleErrors, 'console-errors'),
    countFailure(result.pageErrors, 'page-errors'),
    countFailure(result.failedRequests, 'failed-requests'),
    countFailure(result.badResponses, 'bad-responses'),
    deploymentMarkerFailure(result),
  ].filter(Boolean)
  return { ok: failures.length === 0, failures }
}

async function revealLazyContent(page) {
  await page.evaluate(
    async ({ step, settle }) => {
      const height = globalThis.document.documentElement.scrollHeight
      for (let offset = 0; offset < height; offset += step) {
        globalThis.scrollTo(0, offset)
        await new Promise((resolve) => globalThis.setTimeout(resolve, settle))
      }
      globalThis.scrollTo(0, height)
    },
    { step: SCROLL_STEP_PX, settle: SCROLL_SETTLE_MS },
  )
  await page.waitForTimeout(SCROLL_SETTLE_MS)
  await page.evaluate(() => globalThis.scrollTo(0, 0))
  await page.waitForTimeout(SCROLL_RESET_SETTLE_MS)
}

function defaultArtifactDirectory(now) {
  const timestamp = now.toISOString().replaceAll(':', '-').replaceAll('.', '-')
  return `/home/ubuntu/backups/ci-deploy/ref-hub-smoke/manual-${timestamp}`
}

async function inspectRoute({ browser, baseURL, route, artifactDir, expectedSha }) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  const badResponses = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    failedRequests.push(
      `${request.method()} ${request.url()}: ${request.failure()?.errorText ?? 'failed'}`,
    )
  })
  page.on('response', (response) => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`)
  })

  let responseStatus = null
  let mainVisible = false
  let title = ''
  let headingVisible = false
  let headingText = ''
  let deploymentMarkers = []
  const url = new URL(route.path, baseURL).toString()
  const screenshotPath = path.join(artifactDir, `${route.slug}.png`)

  try {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 })
      responseStatus = response?.status() ?? null
      await page.waitForTimeout(CLIENT_SETTLE_MS)
    } catch (error) {
      pageErrors.push(`navigation: ${error instanceof Error ? error.message : String(error)}`)
    }

    try {
      await page.locator('main').first().waitFor({ state: 'visible', timeout: 5_000 })
      mainVisible = true
    } catch {
      mainVisible = false
    }
    title = await page.title().catch(() => '')
    const heading = page.locator('h1').first()
    try {
      await heading.waitFor({ state: 'visible', timeout: 5_000 })
      headingVisible = true
      headingText = (await heading.textContent())?.trim() ?? ''
    } catch {
      headingVisible = false
    }
    const html = await page.content()
    deploymentMarkers = [...html.matchAll(/[?&]dpl=([0-9a-f]{7,40})/gi)].map((match) =>
      match[1].toLowerCase(),
    )
    await revealLazyContent(page)
    await page.screenshot({ path: screenshotPath, fullPage: true })
  } finally {
    await context.close()
  }

  const observed = {
    path: route.path,
    url,
    responseStatus,
    mainVisible,
    title,
    headingVisible,
    headingText,
    consoleErrors,
    pageErrors,
    failedRequests,
    badResponses,
    expectedSha,
    deploymentMarkers: [...new Set(deploymentMarkers)],
    screenshotPath,
  }
  return { ...observed, ...classifyRouteResult(observed) }
}

export async function runProductionSmoke({
  baseURL = 'https://ref.dvsharp.com',
  artifactDir,
  expectedSha,
  now = new Date(),
} = {}) {
  const parsedBaseURL = new URL(baseURL)
  if (!['http:', 'https:'].includes(parsedBaseURL.protocol)) {
    throw new Error(`unsupported smoke base URL protocol: ${parsedBaseURL.protocol}`)
  }
  if (expectedSha && !/^[0-9a-f]{40}$/i.test(expectedSha)) {
    throw new Error('SMOKE_EXPECTED_SHA must be an exact 40-hex commit SHA')
  }

  const resolvedArtifactDir = path.resolve(artifactDir ?? defaultArtifactDirectory(now))
  await mkdir(resolvedArtifactDir, { recursive: true })
  const browser = await firefox.launch({ headless: true })
  const startedAt = now.toISOString()
  const routes = []

  try {
    for (const route of SMOKE_ROUTES) {
      routes.push(
        await inspectRoute({
          browser,
          baseURL: parsedBaseURL,
          route,
          artifactDir: resolvedArtifactDir,
          expectedSha,
        }),
      )
    }
  } finally {
    await browser.close()
  }

  const report = {
    baseURL: parsedBaseURL.toString(),
    browser: 'firefox',
    expectedSha: expectedSha ?? null,
    startedAt,
    finishedAt: new Date().toISOString(),
    ok: routes.every((route) => route.ok),
    routes,
  }
  const reportPath = path.join(resolvedArtifactDir, 'report.json')
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  return { ...report, reportPath }
}

async function main() {
  const result = await runProductionSmoke({
    baseURL: process.env.SMOKE_BASE_URL || 'https://ref.dvsharp.com',
    artifactDir: process.env.SMOKE_ARTIFACT_DIR,
    expectedSha: process.env.SMOKE_EXPECTED_SHA,
  })
  console.log(JSON.stringify({ ok: result.ok, reportPath: result.reportPath }))
  if (!result.ok) process.exitCode = 1
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
