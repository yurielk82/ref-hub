'use client'

import { useEffect, useState } from 'react'
import { ATTENDANCE_TYPES, APPROVAL_LINE, type AttendanceCard } from './sample-data'
import { T, RING } from './tokens'
import { LockIcon, PencilIcon } from './icons'
import { MeasuredField, Meta, LegalPanel } from './shared'

function MeasuredBlock({ card }: { card: AttendanceCard }) {
  return (
    <section
      className="rounded-lg p-4"
      style={{ background: T.tealTint, border: `1px solid ${T.teal}33` }}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <LockIcon />
        <span className="text-[12px] font-semibold" style={{ color: T.teal }}>
          시스템 자동 기록 (수정 불가)
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 border-b pb-2" style={{ borderColor: `${T.teal}22` }}>
        <Meta label="사번" value={card.empNo} />
        <Meta label="성명" value={card.employee} />
        <Meta label="일자" value={card.date} />
      </div>
      <div className="mt-1">
        {card.timeline.map((e) => (
          <MeasuredField key={e.label} label={e.label} value={e.time} />
        ))}
      </div>
    </section>
  )
}

function DeclarationBlock({
  type,
  reason,
  touched,
  onType,
  onReason,
  onBlur,
}: {
  type: string
  reason: string
  touched: boolean
  onType: (v: string) => void
  onReason: (v: string) => void
  onBlur: () => void
}) {
  const valid = type !== ''
  return (
    <section
      className="rounded-lg p-4"
      style={{ background: '#fff', border: `1px solid ${T.hairline}` }}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <PencilIcon />
        <span className="text-[12px] font-semibold" style={{ color: T.ink }}>
          본인 작성
        </span>
      </div>
      <p className="mb-3 text-[11.5px]" style={{ color: T.inkMuted }}>
        유형과 사유는 본인이 작성합니다. 시스템·AI가 추정하지 않습니다.
      </p>
      <label
        className="mb-1 block text-[12px] font-medium"
        style={{ color: T.ink }}
        htmlFor="att-type"
      >
        근태유형
      </label>
      <select
        id="att-type"
        value={type}
        onChange={(e) => onType(e.target.value)}
        onBlur={onBlur}
        className={`mb-3 w-full rounded-md border px-3 py-2 text-[14px] ${RING}`}
        style={{
          borderColor: touched && !valid ? T.amber : T.hairline,
          color: type === '' ? T.inkMuted : T.ink,
          background: '#fff',
        }}
      >
        <option value="" disabled>
          선택하세요
        </option>
        {ATTENDANCE_TYPES.map((t) => (
          <option key={t} value={t} style={{ color: T.ink }}>
            {t}
          </option>
        ))}
      </select>
      <label
        className="mb-1 block text-[12px] font-medium"
        style={{ color: T.ink }}
        htmlFor="att-reason"
      >
        사유
      </label>
      <textarea
        id="att-reason"
        value={reason}
        onChange={(e) => onReason(e.target.value)}
        rows={3}
        placeholder="사유를 직접 입력하세요"
        className={`w-full resize-none rounded-md border px-3 py-2 text-[14px] ${RING}`}
        style={{ borderColor: T.hairline, color: T.ink, background: '#fff' }}
      />
    </section>
  )
}

function ApprovalBlock() {
  return (
    <section
      className="rounded-lg p-4"
      style={{ background: '#fff', border: `1px solid ${T.hairline}` }}
    >
      <span className="mb-2 block text-[12px] font-semibold" style={{ color: T.ink }}>
        결재선
      </span>
      <div className="flex items-center gap-2 text-[13px]" style={{ color: T.ink }}>
        {APPROVAL_LINE.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span
              className="rounded-md px-2.5 py-1"
              style={{ background: T.base, border: `1px solid ${T.hairline}` }}
            >
              {step}
            </span>
            {i < APPROVAL_LINE.length - 1 ? <span style={{ color: T.inkMuted }}>→</span> : null}
          </span>
        ))}
      </div>
    </section>
  )
}

export function DraftForm({ card }: { card: AttendanceCard }) {
  const [type, setType] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState(false)

  // 카드 전환 시 본인 작성 트랙 초기화 (AI/시스템이 미리 채우지 않음)
  useEffect(() => {
    setType('')
    setReason('')
    setSubmitted(false)
    setTouched(false)
  }, [card.id])

  const valid = type !== ''

  return (
    <div className="space-y-4">
      <MeasuredBlock card={card} />
      <DeclarationBlock
        type={type}
        reason={reason}
        touched={touched}
        onType={setType}
        onReason={setReason}
        onBlur={() => setTouched(true)}
      />
      <ApprovalBlock />
      <LegalPanel legal={card.legal} />
      <div>
        <button
          type="button"
          onClick={() => {
            setTouched(true)
            if (valid) setSubmitted(true)
          }}
          className={`rounded-md px-4 py-2.5 text-[14px] font-semibold text-white transition-colors motion-reduce:transition-none ${RING}`}
          style={{ background: T.teal }}
        >
          결재 상신
        </button>
        <p className="mt-1.5 text-[11.5px]" style={{ color: T.inkMuted }}>
          상신 전 본인이 내용을 확인합니다. (자동 상신 아님)
        </p>
        {touched && !valid ? (
          <p className="mt-1.5 text-[12px]" style={{ color: T.amber }}>
            근태유형을 선택하세요.
          </p>
        ) : null}
        {submitted ? (
          <p
            className="mt-2 rounded-md px-3 py-2 text-[12.5px]"
            style={{ background: T.tealTint, color: T.teal, border: `1px solid ${T.teal}33` }}
            role="status"
          >
            ✓ 결재선({APPROVAL_LINE.join(' → ')})으로 상신되었습니다 — 예시 동작
          </p>
        ) : null}
      </div>
    </div>
  )
}
