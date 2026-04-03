export function PortfolioFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800/50">
      <div className="mx-auto max-w-5xl px-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
        © {new Date().getFullYear()} 권대환
      </div>
    </footer>
  )
}
