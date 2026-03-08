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
})
