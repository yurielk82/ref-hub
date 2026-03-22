import nextra from 'nextra'
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
  // Nextra 옵션
})

export default withNextra({
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
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
