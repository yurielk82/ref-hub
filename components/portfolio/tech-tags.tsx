import { cn } from '@/lib/utils'

const styles = {
  compact:
    'rounded-md bg-[var(--accent-muted)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)]',
  full:
    'rounded-lg bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300',
} as const

export function TechTags({
  items,
  variant,
}: {
  items: string[]
  variant: 'compact' | 'full'
}) {
  return (
    <div className={cn('flex flex-wrap', variant === 'compact' ? 'gap-1.5' : 'gap-2')}>
      {items.map((t) => (
        <span key={t} className={styles[variant]}>
          {t}
        </span>
      ))}
    </div>
  )
}
