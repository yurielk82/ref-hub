'use client'

import { useEffect, useState } from 'react'
import { type AttendanceCard } from './sample-data'
import { T, RING } from './tokens'
import { Meta, LegalPanel, TrackHeader } from './shared'

export function ReviewCard({ card }: { card: AttendanceCard }) {
  const [done, setDone] = useState(false)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    setDone(false)
    setRequested(false)
  }, [card.id])

  return (
    <div className="space-y-4">
      <section
        className="rounded-xl p-5"
        style={{ background: T.tealTint, border: `1px solid ${T.teal}26` }}
      >
        <TrackHeader track="measure" note="수정 불가" />
        <div className="grid grid-cols-2 gap-3 pb-1">
          <Meta label="사번" value={card.empNo} />
          <Meta label="성명" value={card.employee} />
        </div>
        <p className="mt-3 font-mono text-[15px] leading-relaxed" style={{ color: T.ink }}>
          {card.measure}
        </p>
        {card.trend ? (
          <p className="mt-1.5 text-[13.5px]" style={{ color: T.inkMuted }}>
            추세 · {card.trend}
          </p>
        ) : null}
      </section>

      <LegalPanel legal={card.legal} />

      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setDone((v) => !v)}
          className={`rounded-xl px-5 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 motion-reduce:transform-none ${RING}`}
          style={{ background: done ? T.inkMuted : T.teal }}
        >
          {done ? '✓ 검토 완료됨' : '검토 완료 표시'}
        </button>
        <button
          type="button"
          onClick={() => setRequested(true)}
          className={`rounded-xl border px-5 py-3 text-[15px] font-semibold transition-colors ${RING}`}
          style={{ borderColor: T.violet, color: T.violet, background: T.card }}
        >
          노무 검토 요청
        </button>
      </div>
      {requested ? (
        <p
          className="rounded-lg px-4 py-2.5 text-[13.5px] font-medium"
          style={{ background: T.violetTint, color: T.violet, border: `1px solid ${T.violet}55` }}
          role="status"
        >
          ✓ 노무 검토 요청이 전달되었습니다 — 예시 동작
        </p>
      ) : null}
    </div>
  )
}
