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
    return [
      {
        // embed 모드 요청 시 iframe 임베딩 허용
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
