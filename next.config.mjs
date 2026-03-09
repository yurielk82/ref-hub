import nextra from 'nextra'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://kpis-dsr-api.vercel.app http://localhost:* https://103.218.158.157" },
        ],
      },
    ]
  },
})
