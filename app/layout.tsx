import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { AX_HERO, SITE_URL } from '@/data/ax-content'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Ref Hub - ${AX_HERO.name} 포트폴리오`,
    template: '%s - Ref Hub',
  },
  description: `${AX_HERO.name} · ${AX_HERO.role} — 영업 데이터·정산·법정 보고 시스템 포트폴리오와 매뉴얼`,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Ref Hub',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
