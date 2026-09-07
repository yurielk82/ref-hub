import assert from 'node:assert/strict'
import test from 'node:test'

import { SMOKE_ROUTES, classifyRouteResult } from '../scripts/production-smoke.mjs'

const SHA = '0123456789abcdef0123456789abcdef01234567'

function healthy(overrides = {}) {
  return {
    responseStatus: 200,
    mainVisible: true,
    title: 'DVSharp Reference Hub',
    headingVisible: true,
    headingText: '프로젝트',
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
    badResponses: [],
    expectedSha: SHA,
    deploymentMarkers: ['0123456'],
    ...overrides,
  }
}

test('should_audit_the_home_projects_and_docs_routes', () => {
  assert.deepEqual(
    SMOKE_ROUTES.map((route) => route.path),
    ['/', '/projects', '/docs'],
  )
  assert.equal(new Set(SMOKE_ROUTES.map((route) => route.slug)).size, 3)
})

test('should_pass_only_when_HTTP_main_title_console_page_and_network_checks_are_clean', () => {
  assert.deepEqual(classifyRouteResult(healthy()), { ok: true, failures: [] })

  const result = classifyRouteResult(
    healthy({
      responseStatus: 500,
      mainVisible: false,
      title: '',
      headingVisible: false,
      headingText: '',
      consoleErrors: ['hydration failed'],
      pageErrors: ['render failed'],
      failedRequests: ['https://ref.dvsharp.com/_next/app.js'],
      badResponses: ['500 https://ref.dvsharp.com/_next/chunk.js'],
    }),
  )
  assert.equal(result.ok, false)
  assert.deepEqual(result.failures, [
    'http-status:500',
    'main-not-visible',
    'empty-title',
    'heading-not-visible',
    'empty-heading',
    'console-errors:1',
    'page-errors:1',
    'failed-requests:1',
    'bad-responses:1',
  ])
})

test('should_fail_closed_when_navigation_has_no_HTTP_response', () => {
  assert.deepEqual(classifyRouteResult(healthy({ responseStatus: null })), {
    ok: false,
    failures: ['navigation-no-response'],
  })
})

test('should_fail_when_rendered_assets_do_not_match_the_expected_deployment_SHA', () => {
  assert.deepEqual(classifyRouteResult(healthy({ deploymentMarkers: ['abcdef0'] })), {
    ok: false,
    failures: ['deployment-marker-mismatch'],
  })
})
