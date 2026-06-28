'use client'

import { useRef, useState } from 'react'
import { ATTENDANCE_CARDS } from './sample-data'
import { T } from './tokens'
import { LockIcon, PencilIcon, ScaleIcon } from './icons'
import { CaseCard } from './case-card'
import { DraftForm } from './draft-form'
import { ReviewCard } from './review-card'

function Legend() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px]">
      <span className="flex items-center gap-1.5" style={{ color: T.teal }}>
        <LockIcon /> 측정 (시스템 자동·수정 불가)
      </span>
      <span className="flex items-center gap-1.5" style={{ color: T.ink }}>
        <PencilIcon /> 선언 (본인 작성)
      </span>
      <span className="flex items-center gap-1.5" style={{ color: T.violet }}>
        <ScaleIcon /> 자문 (법령 참고·자동판정 아님)
      </span>
    </div>
  )
}

export function LiveSample() {
  const [selectedId, setSelectedId] = useState(ATTENDANCE_CARDS[0].id)
  const panelRef = useRef<HTMLDivElement>(null)
  const selected = ATTENDANCE_CARDS.find((c) => c.id === selectedId) ?? ATTENDANCE_CARDS[0]

  const handleSelect = (id: string) => {
    setSelectedId(id)
    // 모바일: 패널이 목록 아래에 있어 선택 시 스크롤로 이동
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }),
      )
    }
  }

  return (
    <div
      className="rounded-xl p-4 md:p-5"
      style={{
        background: T.base,
        border: `1px solid ${T.hairline}`,
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
    >
      <Legend />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(280px,360px)_1fr]">
        <div aria-label="특이사항 카드 목록" className="flex flex-col gap-2.5">
          <span className="text-[12px] font-semibold" style={{ color: T.inkMuted }}>
            특이사항 {ATTENDANCE_CARDS.length}건
          </span>
          {ATTENDANCE_CARDS.map((c) => (
            <CaseCard
              key={c.id}
              card={c}
              active={c.id === selectedId}
              onSelect={() => handleSelect(c.id)}
            />
          ))}
        </div>

        <div
          ref={panelRef}
          className="scroll-mt-4 rounded-lg p-4 md:p-5"
          style={{ background: T.card, border: `1px solid ${T.hairline}` }}
        >
          <div
            className="mb-3 flex items-center justify-between gap-2 border-b pb-3"
            style={{ borderColor: T.hairline }}
          >
            <div>
              <span className="text-[15px] font-semibold" style={{ color: T.ink }}>
                {selected.kind === 'input' ? '기안서' : '관리자 검토'}
              </span>
              <span className="ml-2 text-[12.5px]" style={{ color: T.inkMuted }}>
                {selected.employee} · {selected.category}
              </span>
            </div>
            <span
              className="rounded px-2 py-0.5 text-[10.5px] font-medium"
              style={{
                background: selected.kind === 'input' ? T.tealTint : T.violetTint,
                color: selected.kind === 'input' ? T.teal : T.violet,
              }}
            >
              {selected.kind === 'input' ? '입력형' : '분석형'}
            </span>
          </div>

          {selected.kind === 'input' ? (
            <DraftForm card={selected} />
          ) : (
            <ReviewCard card={selected} />
          )}
        </div>
      </div>
    </div>
  )
}
