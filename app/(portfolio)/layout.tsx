import type { ReactNode } from 'react'
import { PortfolioNav } from '@/components/portfolio/nav'
import { PortfolioFooter } from '@/components/portfolio/footer'

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-white via-white to-zinc-50 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/30 dark:text-zinc-100">
      <PortfolioNav />
      <main className="pt-14">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  )
}
