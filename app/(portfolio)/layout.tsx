import type { ReactNode } from 'react'
import { PortfolioNav } from '@/components/portfolio/nav'
import { PortfolioFooter } from '@/components/portfolio/footer'

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <PortfolioNav />
      <main className="pt-14">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  )
}
