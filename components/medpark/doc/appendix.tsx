'use client'

import { useRef, useState } from 'react'
import { CASES, type CaseItem } from './cases'

const sevColor = (s: CaseItem['sev']) => (s === '심각' ? 'var(--crit)' : 'var(--warn)')

const INK = 'var(--ink)'
const WHITE_TRACK = { background: '#fff', border: '1px solid var(--line)' } as const

function CaseButton({
  c,
  active,
  onSelect,
}: {
  c: CaseItem
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`ccard${active ? ' active' : ''}`}
      onClick={onSelect}
      aria-pressed={active}
    >
      <div className="top">
        <div>
          <span className="nm">{c.nm}</span>
          <span className="cat">{c.cat}</span>
        </div>
        <span className="sev" style={{ color: sevColor(c.sev) }}>
          ● {c.sev}
        </span>
      </div>
      <p className="meas mono">{c.meas}</p>
    </button>
  )
}

function MeasuredTrack({ c }: { c: CaseItem }) {
  return (
    <div className="track" style={{ background: 'var(--ac-tint)' }}>
      <span className="th" style={{ color: 'var(--ac-2)' }}>
        🔒 측정 · 시스템 자동 <span className="lk">수정 불가</span>
      </span>
      <div className="metarow">
        <div>
          <div className="k">사번</div>
          <div className="v">{c.sabun}</div>
        </div>
        <div>
          <div className="k">성명</div>
          <div className="v">{c.nm}</div>
        </div>
        <div>
          <div className="k">일자</div>
          <div className="v" style={{ fontSize: '12px' }}>
            {c.date}
          </div>
        </div>
      </div>
      <div>
        {c.times.map(([label, time]) => (
          <div className="timerow" key={label}>
            <span>{label}</span>
            <span className="t">🔒 {time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeclareTrack({ c }: { c: CaseItem }) {
  if (c.kind === '입력형') {
    return (
      <>
        <div className="track" style={WHITE_TRACK}>
          <span className="th" style={{ color: INK }}>
            ✎ 선언 · 본인 작성
          </span>
          <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: 'var(--ink-3)' }}>
            유형과 사유는 본인이 작성합니다. 시스템·AI가 추정하지 않습니다.
          </p>
          <label className="fl" htmlFor="mp-att-type">
            근태유형
          </label>
          <select id="mp-att-type" className="fl" defaultValue="">
            <option value="" disabled>
              선택하세요
            </option>
            <option>외출</option>
            <option>반차</option>
            <option>휴일근로</option>
            <option>기타</option>
          </select>
          <label className="fl" htmlFor="mp-att-reason">
            사유
          </label>
          <textarea
            id="mp-att-reason"
            className="fl"
            rows={2}
            placeholder="사유를 직접 입력하세요"
          />
        </div>
        <div className="track" style={WHITE_TRACK}>
          <span className="th" style={{ color: INK }}>
            결재선
          </span>
          <div className="approval">
            <span className="step">본인</span>→<span className="step">팀장</span>→
            <span className="step">인사팀</span>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="track" style={WHITE_TRACK}>
      <span className="th" style={{ color: INK }}>
        ◷ 관리자 검토 · 분석형
      </span>
      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-2)' }}>
        시스템은 이 건을 <strong>검토 대상으로 추려</strong> 보여줄 뿐, 자동으로 차감·판정하지
        않습니다. 위 측정값과 아래 법령 자문을 참고해 담당자가 판단합니다.
      </p>
    </div>
  )
}

function LegalTrack({ c }: { c: CaseItem }) {
  return (
    <div className="legal">
      <span className="lh">⚖ 법령 자문 · 참고용</span>
      <div>
        <span className="ref">{c.ref}</span>
      </div>
      <p className="lt">{c.legal}</p>
      <p className="disc">
        ⚠ 법령 해석을 돕는 참고 정보입니다. 시스템이 자동 판정하거나 임금을 차감하지 않습니다. 최종
        판단은 담당자·노무가 합니다. <br />
        현행 기준 자동 반영 - 근로기준법(시행 2025-10-23). 개정 시 기준 갱신.
      </p>
    </div>
  )
}

function Panel({ c }: { c: CaseItem }) {
  const input = c.kind === '입력형'
  return (
    <div className="panel">
      <div className="phead">
        <div>
          <span className="tt">{input ? '기안서' : '검토 카드'}</span>
          <span className="ss">
            {c.nm} · {c.cat}
          </span>
        </div>
        <span className="kind">{c.kind}</span>
      </div>
      <MeasuredTrack c={c} />
      <DeclareTrack c={c} />
      <LegalTrack c={c} />
      <div className="pfoot2">
        <button type="button" className="btn" disabled={!input}>
          {input ? '결재 상신' : '검토 대기'}
        </button>
        <p>
          {input
            ? '상신 전 본인이 내용을 확인합니다. (자동 상신 아님)'
            : '담당자가 검토 후 처리합니다. (자동 처리 아님)'}
        </p>
      </div>
    </div>
  )
}

export function AppendixSample() {
  const [activeId, setActiveId] = useState(CASES[0].id)
  const active = CASES.find((c) => c.id === activeId) ?? CASES[0]
  const panelRef = useRef<HTMLDivElement>(null)

  const onSelect = (id: string) => {
    setActiveId(id)
    // 모바일(단일 컬럼)에선 패널이 카드 목록 아래에 있어, 탭 시 패널로 스크롤
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }),
      )
    }
  }

  return (
    <div className="sbox">
      <div className="scols">
        <div className="clist">
          {CASES.map((c) => (
            <CaseButton
              key={c.id}
              c={c}
              active={c.id === activeId}
              onSelect={() => onSelect(c.id)}
            />
          ))}
        </div>
        <div ref={panelRef} style={{ scrollMarginTop: '12px' }}>
          {/* key로 케이스 전환 시 Panel을 remount - 비제어 입력폼의 이전 값 잔류 방지 */}
          <Panel key={active.id} c={active} />
        </div>
      </div>
    </div>
  )
}
