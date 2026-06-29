'use client'

import { useEffect, useState } from 'react'

// 사이드바 목차 - 본문 섹션 id 와 1:1. 라벨은 사이드바 가독성을 위해 짧게.
const NAV = [
  { id: 'mptop', n: '', t: '결론·핵심 요약' },
  { id: 's01', n: '01', t: '핵심 관점' },
  { id: 's02', n: '02', t: '세 단계 구분' },
  { id: 's03', n: '03', t: '현황표 자동 생성' },
  { id: 's04', n: '04', t: '이상 유형' },
  { id: 's05', n: '05', t: '당일 정정' },
  { id: 's06', n: '06', t: '자리비움' },
  { id: 's07', n: '07', t: '법률 MCP' },
  { id: 's08', n: '08', t: '도입 로드맵' },
  { id: 's09', n: '09', t: '기대 효과' },
  { id: 's10', n: '10', t: 'KPIS 경험' },
  { id: 's11', n: '11', t: '마무리 의견' },
] as const

function useActiveSection(): string {
  const [active, setActive] = useState<string>(NAV[0].id)
  useEffect(() => {
    const els = NAV.map((x) => document.getElementById(x.id)).filter(
      (e): e is HTMLElement => e !== null,
    )
    if (els.length === 0) return
    const visible = new Map<string, boolean>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        const current = NAV.find((x) => visible.get(x.id))
        if (current) setActive(current.id)
      },
      // 뷰포트 정중앙을 가로지르는 섹션을 현재 위치로 본다.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    for (const el of els) obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return active
}

export function MedparkNav() {
  const active = useActiveSection()
  const print = () => window.print()
  return (
    <nav className="mpnav" aria-label="목차">
      <div className="brand">
        메드파크 사전과제
        <br />
        근태 자동화 방안
      </div>
      <button type="button" className="pdf" onClick={print} title="인쇄 / PDF로 저장">
        ⎙ 인쇄 · PDF 저장
      </button>
      <ul>
        {NAV.map((e) => (
          <li key={e.id}>
            <a href={`#${e.id}`} className={active === e.id ? 'on' : undefined}>
              <span className="n">{e.n}</span>
              <span className="tt">{e.t}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
