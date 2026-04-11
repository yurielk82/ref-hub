export function NewBadge({ label = 'NEW' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      {label}
    </span>
  )
}
