import { withSentryConfig } from '@sentry/nextjs'
import nextra from 'nextra'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 배포 식별자 — 정적 자산 URL 에 `?dpl=<id>` 로 붙는다 (Next 배포 스큐 보호).
 *
 * 배포가 중간에 멈춰 새 HTML 이 아직 없는 청크를 참조하면 그 404 가 CDN 에
 * 캐시된다. 이 앱의 404 는 Nextra catch-all 을 거쳐 `s-maxage=31536000` 을 달고
 * 나가므로 한 번 캐시되면 1년을 간다 (2026-08-30 사고). 배포마다 캐시 키가
 * 달라지면 그 캐시된 404 를 아무도 다시 참조하지 않는다.
 *
 * 값은 환경변수 우선, 없으면 빌드 시점 git commit. 둘 다 없으면 미설정
 * (기존 동작 유지) — git 없는 환경에서 빌드가 깨지지 않게 한다.
 */
function resolveDeploymentId() {
  if (process.env.NEXT_DEPLOYMENT_ID) return process.env.NEXT_DEPLOYMENT_ID
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return undefined
  }
}

const DEPLOYMENT_ID = resolveDeploymentId()

/** embed 모드에서 허용할 iframe origin 목록 (환경변수 기반) */
const FRAME_ANCESTORS = [
  "'self'",
  process.env.EMBED_ORIGIN_KPIS || '',
  process.env.EMBED_ORIGIN_DEV || '',
  process.env.EMBED_ORIGIN_SERVER || '',
]
  .filter(Boolean)
  .join(' ')

/**
 * 기본 보안 헤더 — embed 규칙이 걸리지 않는 모든 응답에 적용된다.
 *
 * 이전에는 프레임 정책이 `?embed=true` 요청에만 붙었다. 그래서 쿼리를 붙이지
 * 않은 요청 — 공격자가 iframe 에 넣는 바로 그 요청 — 은 아무 제한도 받지
 * 않았다. allowlist 가 통제로 동작하려면 기본이 거부여야 한다.
 */
const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

/**
 * 문서(HTML) 응답의 CDN 캐시 상한.
 *
 * Next 기본값은 `s-maxage=31536000` 이고 404 도 같은 값을 달고 나간다. 배포가
 * 중간에 멈춰 404 가 한 번 캐시되면 1년을 간다 (2026-08-30 사고). deploymentId
 * 는 정적 자산만 보호하므로 문서 응답의 상한을 따로 낮춘다. `_next/` 아래
 * 빌드 해시 자산은 이 규칙에서 제외해 기존 immutable 캐시를 유지한다.
 */
const DOCUMENT_CACHE_CONTROL = {
  key: 'Cache-Control',
  value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
}

/** `_next/` 이하(빌드 해시 자산)를 제외한 모든 경로 — 문서 캐시 상한 대상. */
const DOCUMENT_PATHS = '/:path((?!_next/).*)'

const withNextra = nextra({
  codeHighlight: false,
})

const nextConfig = withNextra({
  output: 'standalone',
  ...(DEPLOYMENT_ID ? { deploymentId: DEPLOYMENT_ID } : {}),
  // 개발 서버 외부 미리보기(dev-preview 터널) HMR 허용 — dev 전용, 빌드 무영향
  allowedDevOrigins: ['dev-ref-hub.dvsharp.com'],
  // verify/CI builds use an isolated output dir so an in-place `next build` can't
  // clobber the live `.next/standalone` (2026-06-28 incident). Env set by
  // verify_workspace.py for the build step only; real deploys build into `.next`.
  distDir: process.env.WORKSPACE_VERIFY_BUILD === '1' ? '.next-verify' : '.next',
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  webpack(config) {
    config.cache = false
    return config
  },
  async headers() {
    // 뒤 규칙이 같은 key 를 덮는다 — 기본 거부를 먼저 깔고 embed 에서만 완화한다.
    return [
      { source: '/', headers: [...SECURITY_HEADERS, DOCUMENT_CACHE_CONTROL] },
      { source: '/:path*', headers: SECURITY_HEADERS },
      { source: DOCUMENT_PATHS, headers: [DOCUMENT_CACHE_CONTROL] },
      {
        // embed 모드 요청 시에만 allowlist 로 완화
        source: '/:path*',
        has: [{ type: 'query', key: 'embed', value: 'true' }],
        headers: [
          // X-Frame-Options 비활성화 (CSP frame-ancestors가 우선)
          { key: 'X-Frame-Options', value: '' },
          { key: 'Content-Security-Policy', value: `frame-ancestors ${FRAME_ANCESTORS}` },
        ],
      },
    ]
  },
})

export default withSentryConfig(nextConfig, {
  silent: true,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
})
