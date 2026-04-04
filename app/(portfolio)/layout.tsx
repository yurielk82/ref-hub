import type { ReactNode } from 'react'
import { PortfolioNav } from '@/components/portfolio/nav'
import { PortfolioFooter } from '@/components/portfolio/footer'

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-stone-50 via-white to-stone-100/50 text-stone-900 dark:from-stone-950 dark:via-stone-950 dark:to-stone-900/20 dark:text-stone-100">
      <PortfolioNav />
      <main className="pt-14">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  )
}
