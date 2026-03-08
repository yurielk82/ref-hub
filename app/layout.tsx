import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    default: 'Codegear Dev Portal',
    template: '%s — Codegear Dev Portal',
  },
  description: '프로젝트 통합 레퍼런스 사이트',
}

const navbar = (
  <Navbar
    logo={<b>Codegear Dev Portal</b>}
    projectLink="https://github.com/yurielk82"
  />
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © Codegear
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="📚" />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/yurielk82/codegear-dev-portal/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          editLink="이 페이지 수정하기"
          feedback={{ content: '피드백 보내기' }}
          toc={{ title: '목차' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
