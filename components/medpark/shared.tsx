import { LEGAL_DISCLAIMER, LEGAL_FOOTER, type LegalInsight } from './sample-data'
import { T } from './tokens'
import { LockIcon, ScaleIcon, PencilIcon } from './icons'

type Track = 'measure' | 'declare' | 'advice'

const TRACK = {
  measure: { color: T.teal, label: '측정 · 시스템 자동', Icon: LockIcon },
  declare: { color: T.ink, label: '선언 · 본인 작성', Icon: PencilIcon },
  advice: { color: T.violet, label: '자문 · 법령 참고', Icon: ScaleIcon },
} as const

/** 트랙 헤더 — 3트랙 시각 정체성의 라벨 */
export function TrackHeader({ track, note }: { track: Track; note?: string }) {
  const { color, label, Icon } = TRACK[track]
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12.5px] font-bold"
        style={{ color, background: `${color}14` }}
      >
        <Icon />
        {label}
      </span>
      {note ? (
        <span className="text-[12.5px] font-medium" style={{ color: T.inkMuted }}>
          {note}
        </span>
      ) : null}
    </div>
  )
}

/** 측정 트랙: mono + 자물쇠 + 수정 불가 */
export function MeasuredField({ label, value }: { label: string; value: string | null }) {
  const empty = value === null
  return (
    <div
      className="flex items-baseline justify-between gap-3 py-2"
      style={{ borderTop: `1px solid ${T.hairlineSoft}` }}
    >
      <span className="text-[14px]" style={{ color: T.inkMuted }}>
        {label}
      </span>
      <span
        className="flex items-center gap-1.5 font-mono text-[15px] tabular-nums"
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
      <div className="text-[11.5px] font-medium" style={{ color: T.inkMuted }}>
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[14px]" style={{ color: T.ink }}>
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
      className="rounded-xl p-5"
      style={{ border: `1.5px dashed ${T.violet}`, background: T.violetTint }}
    >
      <div className="mb-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-bold text-white"
          style={{ background: T.violet }}
        >
          <ScaleIcon />
          법령 인사이트 · 참고용
        </span>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {refs.map((r) => (
          <span
            key={r}
            className="rounded-md px-2 py-1 font-mono text-[12.5px]"
            style={{ background: T.card, color: T.violet, border: `1px solid ${T.violet}` }}
          >
            {r}
          </span>
        ))}
      </div>
      <p className="text-[15px] leading-[1.75]" style={{ color: T.inkSoft }}>
        {legal.note}
      </p>
      <p
        className="mt-4 border-t pt-3 text-[13px] leading-[1.7]"
        style={{ color: T.inkMuted, borderColor: 'rgba(91,79,196,0.25)' }}
      >
        ⚠ {LEGAL_DISCLAIMER}
      </p>
      <p className="mt-2 text-[12px]" style={{ color: T.inkMuted }}>
        {LEGAL_FOOTER}
      </p>
    </section>
  )
}
