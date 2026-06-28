import { withSentryConfig } from '@sentry/nextjs';
import nextra from 'nextra'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** embed 모드에서 허용할 iframe origin 목록 (환경변수 기반) */
const FRAME_ANCESTORS = [
  "'self'",
  process.env.EMBED_ORIGIN_KPIS || '',
  process.env.EMBED_ORIGIN_DEV || '',
  process.env.EMBED_ORIGIN_SERVER || '',
].filter(Boolean).join(' ')

const withNextra = nextra({
  codeHighlight: false,
})

const nextConfig = withNextra({
  output: 'standalone',
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
