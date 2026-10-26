import assert from "node:assert/strict";
import test from "node:test";

import { runDeployAuthedHealth } from "../scripts/deploy-authed-health.mjs";
import {
  SMOKE_ROUTES,
  classifyRouteResult,
  documentStructureErrors,
} from "../scripts/production-smoke.mjs";

const SHA = "0123456789abcdef0123456789abcdef01234567";

function healthy(overrides = {}) {
  return {
    responseStatus: 200,
    mainVisible: true,
    title: "DVSharp Reference Hub",
    headingVisible: true,
    headingText: "프로젝트",
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
    badResponses: [],
    expectedSha: SHA,
    deploymentMarkers: ["0123456"],
    ...overrides,
  };
}

test("should_audit_the_home_projects_and_docs_routes", () => {
  assert.deepEqual(
    SMOKE_ROUTES.map((route) => route.path),
    ["/", "/projects", "/docs", "/pharmkpi", "/kpis-dsr-api"],
  );
  assert.equal(new Set(SMOKE_ROUTES.map((route) => route.slug)).size, 5);
});

test("should_pass_only_when_HTTP_main_title_console_page_and_network_checks_are_clean", () => {
  assert.deepEqual(classifyRouteResult(healthy()), { ok: true, failures: [] });

  const result = classifyRouteResult(
    healthy({
      responseStatus: 500,
      mainVisible: false,
      title: "",
      headingVisible: false,
      headingText: "",
      consoleErrors: ["hydration failed"],
      pageErrors: ["render failed"],
      failedRequests: ["https://ref.dvsharp.com/_next/app.js"],
      badResponses: ["500 https://ref.dvsharp.com/_next/chunk.js"],
    }),
  );
  assert.equal(result.ok, false);
  assert.deepEqual(result.failures, [
    "http-status:500",
    "main-not-visible",
    "empty-title",
    "heading-not-visible",
    "empty-heading",
    "console-errors:1",
    "page-errors:1",
    "failed-requests:1",
    "bad-responses:1",
  ]);
});

test("should_fail_closed_when_navigation_has_no_HTTP_response", () => {
  assert.deepEqual(classifyRouteResult(healthy({ responseStatus: null })), {
    ok: false,
    failures: ["navigation-no-response"],
  });
});

test("should_fail_when_rendered_assets_do_not_match_the_expected_deployment_SHA", () => {
  assert.deepEqual(
    classifyRouteResult(healthy({ deploymentMarkers: ["abcdef0"] })),
    {
      ok: false,
      failures: ["deployment-marker-mismatch"],
    },
  );
});

test("should_bind_the_locked_deploy_health_audit_to_the_exact_live_SHA", async () => {
  const calls = [];
  const result = await runDeployAuthedHealth({
    getSha: async () => SHA,
    smoke: async (options) => {
      calls.push(options);
      return { ok: true, reportPath: "/tmp/report.json" };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0].expectedSha, SHA);
  assert.match(calls[0].artifactDir, new RegExp(`${SHA}-deploy-gateway$`));
});

// public seam: HTML 서버 응답과 브라우저 오류가 배포 통과 여부를 결정한다.
test("문서 본문에 중첩된 head를 브라우저가 복구해도 실패로 판정한다", () => {
  const invalid =
    '<!doctype html><html><head><title>문서</title></head><body><head><meta name="theme-color" content="black"></head><main>본문</main></body></html>';
  assert.deepEqual(documentStructureErrors(invalid), ["head-inside-body"]);
  assert.deepEqual(
    documentStructureErrors(
      "<html><head></head><body><main>본문</main></body></html>",
    ),
    [],
  );
  assert.equal(
    classifyRouteResult(
      healthy({ documentStructureErrors: documentStructureErrors(invalid) }),
    ).ok,
    false,
  );
});
