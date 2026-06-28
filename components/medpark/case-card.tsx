import { type AttendanceCard } from './sample-data'
import { T, RING, SEVERITY } from './tokens'

export function CaseCard({
  card,
  active,
  onSelect,
}: {
  card: AttendanceCard
  active: boolean
  onSelect: () => void
}) {
  const sev = SEVERITY[card.severity]
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full rounded-lg p-3.5 text-left transition-shadow motion-reduce:transition-none ${RING}`}
      style={{
        background: T.card,
        border: active ? `1.5px solid ${T.teal}` : `1px solid ${T.hairline}`,
        boxShadow: active ? `0 2px 12px ${T.teal}22` : '0 1px 2px rgba(26,34,48,0.04)',
      }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <span className="text-[14px] font-semibold" style={{ color: T.ink }}>
            {card.employee}
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[10.5px] font-medium"
            style={{ background: T.base, color: T.inkMuted, border: `1px solid ${T.hairline}` }}
          >
            {card.category}
          </span>
        </span>
        <span className="flex items-center gap-1" title={`심각도: ${sev.label}`}>
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: sev.dot }}
            aria-hidden="true"
          />
          <span className="text-[10px]" style={{ color: T.inkMuted }}>
            {sev.label}
          </span>
        </span>
      </div>
      <p className="mb-2 font-mono text-[12px] leading-snug" style={{ color: T.ink }}>
        {card.measure}
      </p>
      <p className="mb-2 text-[11.5px] leading-snug" style={{ color: T.violet }}>
        ⚖ {card.insightLine}
      </p>
      <span
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] font-medium"
        style={{
          background: card.kind === 'input' ? T.tealTint : T.violetTint,
          color: card.kind === 'input' ? T.teal : T.violet,
        }}
      >
        {card.kind === 'input' ? '✎' : '◷'} {card.actionLabel}
        <span className="opacity-60">{card.kind === 'input' ? '· 입력형' : '· 분석형'}</span>
      </span>
    </button>
  )
}
