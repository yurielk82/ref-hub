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
  const isInput = card.kind === 'input'
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full rounded-xl p-4 text-left transition-all motion-reduce:transition-none ${RING}`}
      style={{
        background: T.card,
        border: active ? `1.5px solid ${T.teal}` : `1px solid ${T.hairline}`,
        boxShadow: active ? `0 6px 20px ${T.teal}1f` : '0 1px 2px rgba(21,32,46,0.04)',
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold" style={{ color: T.ink }}>
            {card.employee}
          </span>
          <span
            className="rounded-md px-2 py-0.5 text-[12px] font-semibold"
            style={{ background: T.hairlineSoft, color: T.inkMuted }}
          >
            {card.category}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold"
          style={{ background: sev.tint, color: sev.dot }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: sev.dot }}
            aria-hidden="true"
          />
          {sev.label}
        </span>
      </div>
      <p className="mb-2.5 font-mono text-[13.5px] leading-snug" style={{ color: T.inkSoft }}>
        {card.measure}
      </p>
      <p className="mb-3 text-[13px] leading-snug" style={{ color: T.violet }}>
        ⚖ {card.insightLine}
      </p>
      <span
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold"
        style={{
          background: isInput ? T.tealTint : T.violetTint,
          color: isInput ? T.tealDeep : T.violet,
        }}
      >
        {isInput ? '✎' : '◷'} {card.actionLabel}
        <span className="font-medium opacity-70">{isInput ? '· 입력형' : '· 분석형'}</span>
      </span>
    </button>
  )
}
