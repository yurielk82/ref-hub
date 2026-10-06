'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { AX_HERO } from '@/data/ax-content'

import { GitHubIcon } from './github-icon'

export function PortfolioNav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-transparent bg-white/70 backdrop-blur-xl dark:bg-stone-950/70"
      style={{ borderColor: 'var(--glass-border)' }}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100"
        >
          {AX_HERO.name}
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/#work"
            className="text-xs text-stone-500 transition-colors hover:text-[var(--accent)]"
          >
            맡은 일
          </Link>
          <Link
            href="/projects"
            className="text-xs text-stone-500 transition-colors hover:text-[var(--accent)]"
          >
            프로젝트
          </Link>
          <Link
            href="/ax"
            className="text-xs text-stone-500 transition-colors hover:text-[var(--accent)]"
          >
            AX
          </Link>
          <Link
            href="/#career"
            className="text-xs text-stone-500 transition-colors hover:text-[var(--accent)]"
          >
            경력
          </Link>
          <Link
            href="/docs"
            className="text-xs text-stone-500 transition-colors hover:text-[var(--accent)]"
          >
            문서
          </Link>
          <a
            href="https://github.com/yurielk82"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 transition-colors hover:text-[var(--accent)]"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="rounded-md p-1.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-[var(--accent)] dark:hover:bg-stone-800"
              aria-label="테마 전환"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
