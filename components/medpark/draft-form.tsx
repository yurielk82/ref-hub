'use client'

import { useEffect, useState } from 'react'
import { ATTENDANCE_TYPES, APPROVAL_LINE, type AttendanceCard } from './sample-data'
import { T, RING } from './tokens'
import { MeasuredField, Meta, LegalPanel, TrackHeader } from './shared'

function MeasuredBlock({ card }: { card: AttendanceCard }) {
  return (
    <section
      className="rounded-xl p-5"
      style={{ background: T.tealTint, border: `1px solid ${T.teal}26` }}
    >
      <TrackHeader track="measure" note="수정 불가" />
      <div className="grid grid-cols-3 gap-3 pb-1">
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
      className="rounded-xl p-5"
      style={{ background: T.card, border: `1px solid ${T.hairline}` }}
    >
      <TrackHeader track="declare" />
      <p className="mb-4 text-[13.5px] leading-relaxed" style={{ color: T.inkMuted }}>
        유형과 사유는 본인이 작성합니다. 시스템·AI가 추정하지 않습니다.
      </p>
      <label
        className="mb-1.5 block text-[14px] font-semibold"
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
        className={`mb-4 w-full rounded-lg border px-3.5 py-2.5 text-[15px] ${RING}`}
        style={{
          borderColor: touched && !valid ? T.amber : T.hairline,
          color: type === '' ? T.inkMuted : T.ink,
          background: T.card,
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
        className="mb-1.5 block text-[14px] font-semibold"
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
        className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-[15px] leading-relaxed ${RING}`}
        style={{ borderColor: T.hairline, color: T.ink, background: T.card }}
      />
    </section>
  )
}

function ApprovalBlock() {
  return (
    <section
      className="rounded-xl p-5"
      style={{ background: T.card, border: `1px solid ${T.hairline}` }}
    >
      <span className="mb-3 block text-[14px] font-bold" style={{ color: T.ink }}>
        결재선
      </span>
      <div className="flex flex-wrap items-center gap-2 text-[14px]" style={{ color: T.ink }}>
        {APPROVAL_LINE.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span
              className="rounded-lg px-3 py-1.5 font-medium"
              style={{ background: T.hairlineSoft, border: `1px solid ${T.hairline}` }}
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

function SubmitBlock({
  valid,
  touched,
  submitted,
  onSubmit,
}: {
  valid: boolean
  touched: boolean
  submitted: boolean
  onSubmit: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onSubmit}
        className={`rounded-xl px-5 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 motion-reduce:transform-none ${RING}`}
        style={{ background: T.teal }}
      >
        결재 상신
      </button>
      <p className="mt-2 text-[13px]" style={{ color: T.inkMuted }}>
        상신 전 본인이 내용을 확인합니다. (자동 상신 아님)
      </p>
      {touched && !valid ? (
        <p className="mt-2 text-[13.5px] font-medium" style={{ color: T.amber }}>
          근태유형을 선택하세요.
        </p>
      ) : null}
      {submitted ? (
        <p
          className="mt-3 rounded-lg px-4 py-2.5 text-[13.5px] font-medium"
          style={{ background: T.tealTint, color: T.tealDeep, border: `1px solid ${T.teal}33` }}
          role="status"
        >
          ✓ 결재선({APPROVAL_LINE.join(' → ')})으로 상신되었습니다 — 예시 동작
        </p>
      ) : null}
    </div>
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
      <SubmitBlock
        valid={valid}
        touched={touched}
        submitted={submitted}
        onSubmit={() => {
          setTouched(true)
          if (valid) setSubmitted(true)
        }}
      />
    </div>
  )
}
