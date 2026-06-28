import { LEGAL_DISCLAIMER, LEGAL_FOOTER, type LegalInsight } from './sample-data'
import { T } from './tokens'
import { LockIcon, ScaleIcon } from './icons'

/** 측정 트랙: mono + 자물쇠 + 수정 불가 */
export function MeasuredField({ label, value }: { label: string; value: string | null }) {
  const empty = value === null
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-[13px]" style={{ color: T.inkMuted }}>
        {label}
      </span>
      <span
        className="flex items-center gap-1.5 font-mono text-[13px] tabular-nums"
        style={{ color: empty ? T.inkMuted : T.ink }}
      >
        <LockIcon />
        {empty ? '기록 없음' : value}
      </span>
    </div>
  )
}

export function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10.5px]" style={{ color: T.inkMuted }}>
        {label}
      </div>
      <div className="font-mono text-[12px]" style={{ color: T.ink }}>
        {value}
      </div>
    </div>
  )
}

/** 법령 자문 트랙: violet 점선 + 디스클레이머 (항상 표시) */
export function LegalPanel({ legal }: { legal: LegalInsight }) {
  const refs = legal.precedent ? [...legal.statutes, legal.precedent] : [...legal.statutes]
  return (
    <section
      aria-label="법령 인사이트"
      className="rounded-lg p-4"
      style={{ border: `1.5px dashed ${T.violet}`, background: T.violetTint }}
    >
      <div className="mb-2">
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ background: T.violet, color: '#fff' }}
        >
          <ScaleIcon />
          법령 인사이트 · 참고용
        </span>
      </div>
      <p className="mb-2 flex flex-wrap gap-1.5">
        {refs.map((r) => (
          <span
            key={r}
            className="rounded px-1.5 py-0.5 font-mono text-[11px]"
            style={{ background: '#fff', color: T.violet, border: `1px solid ${T.violet}` }}
          >
            {r}
          </span>
        ))}
      </p>
      <p className="text-[13px] leading-relaxed" style={{ color: T.ink }}>
        {legal.note}
      </p>
      <p
        className="mt-3 border-t pt-2 text-[11.5px] leading-relaxed"
        style={{ color: T.inkMuted, borderColor: 'rgba(91,79,196,0.25)' }}
      >
        ⚠ {LEGAL_DISCLAIMER}
      </p>
      <p className="mt-1.5 text-[11px]" style={{ color: T.inkMuted }}>
        {LEGAL_FOOTER}
      </p>
    </section>
  )
}
