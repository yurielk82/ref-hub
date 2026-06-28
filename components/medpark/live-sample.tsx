'use client'

import { useRef, useState } from 'react'
import { ATTENDANCE_CARDS } from './sample-data'
import { T } from './tokens'
import { LockIcon, PencilIcon, ScaleIcon } from './icons'
import { CaseCard } from './case-card'
import { DraftForm } from './draft-form'
import { ReviewCard } from './review-card'

function Legend() {
  const items = [
    { Icon: LockIcon, color: T.teal, text: '측정 (시스템 자동·수정 불가)' },
    { Icon: PencilIcon, color: T.ink, text: '선언 (본인 작성)' },
    { Icon: ScaleIcon, color: T.violet, text: '자문 (법령 참고·자동판정 아님)' },
  ]
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
      {items.map(({ Icon, color, text }) => (
        <span
          key={text}
          className="flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color }}
        >
          <Icon />
          {text}
        </span>
      ))}
    </div>
  )
}

function PanelHeader({
  kind,
  employee,
  category,
}: {
  kind: string
  employee: string
  category: string
}) {
  const isInput = kind === 'input'
  return (
    <div
      className="mb-4 flex items-center justify-between gap-2 border-b pb-4"
      style={{ borderColor: T.hairline }}
    >
      <div>
        <span className="text-[17px] font-bold" style={{ color: T.ink }}>
          {isInput ? '기안서' : '관리자 검토'}
        </span>
        <span className="ml-2 text-[14px]" style={{ color: T.inkMuted }}>
          {employee} · {category}
        </span>
      </div>
      <span
        className="rounded-md px-2.5 py-1 text-[12px] font-bold"
        style={{
          background: isInput ? T.tealTint : T.violetTint,
          color: isInput ? T.tealDeep : T.violet,
        }}
      >
        {isInput ? '입력형' : '분석형'}
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
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: T.page,
        border: `1px solid ${T.hairline}`,
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
    >
      <Legend />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(300px,380px)_1fr]">
        <div aria-label="특이사항 카드 목록" className="flex flex-col gap-3">
          <span
            className="text-[13px] font-bold uppercase tracking-wider"
            style={{ color: T.inkMuted }}
          >
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
          className="scroll-mt-20 rounded-2xl p-5 md:p-6"
          style={{
            background: T.card,
            border: `1px solid ${T.hairline}`,
            boxShadow: '0 1px 3px rgba(21,32,46,0.04)',
          }}
        >
          <PanelHeader
            kind={selected.kind}
            employee={selected.employee}
            category={selected.category}
          />
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
