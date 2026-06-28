import type { ReactNode } from 'react'
import { T } from './tokens'

/** ■ 소제목 */
export function SubHead({ children }: { children: ReactNode }) {
  return (
    <h3
      className="mt-14 mb-3 text-[21px] font-extrabold leading-[1.35] md:text-[23px]"
      style={{ color: T.ink }}
    >
      {children}
    </h3>
  )
}

/** 본문 단락 */
export function Para({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <p
      className="mt-4 max-w-3xl text-[16.5px] leading-[1.85]"
      style={{ color: muted ? T.inkMuted : T.inkSoft }}
    >
      {children}
    </p>
  )
}

export function Strong({ children }: { children: ReactNode }) {
  return (
    <strong className="font-bold" style={{ color: T.ink }}>
      {children}
    </strong>
  )
}

/** 불릿 목록 — 정적 children(li) 을 받는다 */
export function BulletList({ children }: { children: ReactNode }) {
  return <ul className="mt-4 max-w-3xl space-y-3">{children}</ul>
}

export function Li({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[16px] leading-[1.8]" style={{ color: T.inkSoft }}>
      <span aria-hidden="true" className="mt-[3px] shrink-0 font-bold" style={{ color: T.teal }}>
        ·
      </span>
      <span>{children}</span>
    </li>
  )
}

/** 강조 박스 (역할 경계·자리비움 등) */
export function Callout({
  title,
  tone = T.teal,
  tint = T.tealTint,
  children,
}: {
  title: string
  tone?: string
  tint?: string
  children: ReactNode
}) {
  return (
    <div
      className="mt-7 max-w-3xl rounded-2xl p-5 md:p-6"
      style={{ background: tint, border: `1px solid ${tone}40` }}
    >
      <div
        className="mb-3 inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-bold"
        style={{ background: tone, color: '#fff' }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}
