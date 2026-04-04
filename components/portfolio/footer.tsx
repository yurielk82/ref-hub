export function PortfolioFooter() {
  return (
    <footer className="border-t py-8" style={{ borderColor: 'var(--glass-border)' }}>
      <div className="mx-auto max-w-5xl px-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
        © {new Date().getFullYear()} yurielk82
      </div>
    </footer>
  )
}
