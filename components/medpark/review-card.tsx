'use client'

import { useEffect, useState } from 'react'
import { type AttendanceCard } from './sample-data'
import { T, RING } from './tokens'
import { LockIcon } from './icons'
import { Meta, LegalPanel } from './shared'

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
        className="rounded-lg p-4"
        style={{ background: T.tealTint, border: `1px solid ${T.teal}33` }}
      >
        <div className="mb-2 flex items-center gap-1.5">
          <LockIcon />
          <span className="text-[12px] font-semibold" style={{ color: T.teal }}>
            시스템 자동 측정 (수정 불가)
          </span>
        </div>
        <div
          className="grid grid-cols-2 gap-2 border-b pb-2"
          style={{ borderColor: `${T.teal}22` }}
        >
          <Meta label="사번" value={card.empNo} />
          <Meta label="성명" value={card.employee} />
        </div>
        <p className="mt-2 font-mono text-[13.5px] leading-relaxed" style={{ color: T.ink }}>
          {card.measure}
        </p>
        {card.trend ? (
          <p className="mt-1 text-[12px]" style={{ color: T.inkMuted }}>
            추세 · {card.trend}
          </p>
        ) : null}
      </section>

      <LegalPanel legal={card.legal} />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setDone((v) => !v)}
          className={`rounded-md px-4 py-2.5 text-[14px] font-semibold text-white transition-colors motion-reduce:transition-none ${RING}`}
          style={{ background: done ? T.inkMuted : T.teal }}
        >
          {done ? '✓ 검토 완료됨' : '검토 완료 표시'}
        </button>
        <button
          type="button"
          onClick={() => setRequested(true)}
          className={`rounded-md border px-4 py-2.5 text-[14px] font-semibold transition-colors motion-reduce:transition-none ${RING}`}
          style={{ borderColor: T.violet, color: T.violet, background: '#fff' }}
        >
          노무 검토 요청
        </button>
      </div>
      {requested ? (
        <p
          className="rounded-md px-3 py-2 text-[12.5px]"
          style={{ background: T.violetTint, color: T.violet, border: `1px solid ${T.violet}55` }}
          role="status"
        >
          ✓ 노무 검토 요청이 전달되었습니다 — 예시 동작
        </p>
      ) : null}
    </div>
  )
}
