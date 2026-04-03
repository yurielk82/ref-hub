import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'

/**
 * embed 모드: ?embed=true 시 네비/사이드바/푸터 숨김 (iframe 임베딩용)
 * 두 상수 모두 서버 측 하드코딩 — 사용자 입력 미포함, XSS 위험 없음
 */
const EMBED_DETECT_SCRIPT = `(function(){var e=new URLSearchParams(location.search).has('embed');if(e)sessionStorage.setItem('_embed','1');if(e||sessionStorage.getItem('_embed'))document.documentElement.dataset.embed='true'})()`

const EMBED_HIDE_STYLE = [
  'html[data-embed="true"] header.nextra-navbar,',
  'html[data-embed="true"] .nextra-sidebar,',
  'html[data-embed="true"] .nextra-breadcrumb,',
  'html[data-embed="true"] footer',
  '{ display:none !important }',
].join('\n')

const navbar = (
  <Navbar
    logo={<b>📚 Ref Hub</b>}
    projectLink="https://github.com/yurielk82"
  />
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © Codegear
  </Footer>
)

export default async function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Head faviconGlyph="📚" />
      {/* eslint-disable-next-line -- 하드코딩 상수, XSS 무관 */}
      <script dangerouslySetInnerHTML={{ __html: EMBED_DETECT_SCRIPT }} />
      {/* eslint-disable-next-line -- 하드코딩 상수, XSS 무관 */}
      <style dangerouslySetInnerHTML={{ __html: EMBED_HIDE_STYLE }} />
      <Layout
        navbar={navbar}
        pageMap={await getPageMap()}
        docsRepositoryBase="https://github.com/yurielk82/ref-hub/tree/main"
        footer={footer}
        search={<Search placeholder="문서 검색..." />}
        sidebar={{ defaultMenuCollapseLevel: 1 }}
        editLink="이 페이지 수정하기"
        feedback={{ content: '피드백 보내기' }}
        toc={{ title: '목차' }}
      >
        {children}
      </Layout>
    </>
  )
}
