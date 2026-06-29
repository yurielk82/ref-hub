import type { ReactNode } from 'react'

const DOC_TITLE = '메드파크 사전과제 — 근태 자동화 방안'

export function Sheet({ children }: { children: ReactNode }) {
  return <div className="sheet">{children}</div>
}

export function RHead({ right }: { right: string }) {
  return (
    <div className="rhead">
      <span>Q2 답안 · 근태 자동화 방안</span>
      <span>{right}</span>
    </div>
  )
}

export function RFoot({ page, label = DOC_TITLE }: { page: string; label?: string }) {
  return (
    <div className="rfoot">
      <span>{label}</span>
      <span className="pg">{page}</span>
    </div>
  )
}

export function SecHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="sechd">
      <div className="n">{n}</div>
      <h2>{title}</h2>
    </div>
  )
}
