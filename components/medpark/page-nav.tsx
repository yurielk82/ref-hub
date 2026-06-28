'use client'

import { useEffect, useState } from 'react'
import { T } from './tokens'

const SECTIONS = [
  { id: 'greeting', label: '인사말' },
  { id: 'assignment', label: '과제' },
  { id: 'sample', label: '샘플' },
] as const

function NavLink({
  id,
  label,
  index,
  active,
  onGo,
}: {
  id: string
  label: string
  index: number
  active: boolean
  onGo: (id: string) => void
}) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        onGo(id)
      }}
      aria-current={active ? 'true' : undefined}
      className="relative rounded-md px-2.5 py-1.5 text-[14px] font-semibold transition-colors sm:px-3.5 sm:text-[15px]"
      style={{ color: active ? T.teal : T.inkMuted }}
    >
      <span className="mr-1 text-[11px] font-bold tabular-nums opacity-50">0{index + 1}</span>
      {label}
      {active ? (
        <span
          className="absolute -bottom-[1px] left-2.5 right-2.5 h-[2px] rounded-full sm:left-3.5 sm:right-3.5"
          style={{ background: T.teal }}
        />
      ) : null}
    </a>
  )
}

export function PageNav() {
  const [active, setActive] = useState<string>('greeting')

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 1] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: 'rgba(245,247,249,0.82)', borderBottom: `1px solid ${T.hairline}` }}
    >
      <nav className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-5 md:px-8">
        <a
          href="#greeting"
          onClick={(e) => {
            e.preventDefault()
            go('greeting')
          }}
          className="flex items-center gap-2.5"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-md text-[13px] font-extrabold text-white"
            style={{ background: T.teal }}
          >
            근
          </span>
          <span className="text-[15px] font-bold tracking-tight" style={{ color: T.ink }}>
            근태 자동화 <span style={{ color: T.inkMuted }}>· 사전과제</span>
          </span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <NavLink id={s.id} label={s.label} index={i} active={active === s.id} onGo={go} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
