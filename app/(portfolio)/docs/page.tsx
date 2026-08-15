import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import { MANUALS } from '@/data/manuals'
import { FadeInUp } from '@/components/portfolio/motion'

const MANUAL_STAGGER_DELAY = 0.05

export const metadata: Metadata = {
  title: '문서',
  description: '프로젝트별 사용자·관리자 매뉴얼 모음',
}

export default function DocsIndexPage() {
  return (
    <section className="px-6 pb-28 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <div className="mb-10">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
              Documentation
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              문서
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-400">
              각 프로젝트의 사용자·관리자 매뉴얼입니다. 실제 운영 중인 시스템의 화면과 절차를 그대로
              담고 있습니다.
            </p>
          </div>
        </FadeInUp>

        <div className="grid gap-4 md:grid-cols-2">
          {MANUALS.map((manual, index) => (
            <FadeInUp key={manual.slug} delay={index * MANUAL_STAGGER_DELAY}>
              <div className="group relative h-full rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-[var(--accent)] dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <h2 className="text-base font-bold text-stone-950 dark:text-stone-50">
                    <Link
                      href={`/${manual.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {manual.title}
                    </Link>
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {manual.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] group-hover:gap-2">
                    매뉴얼 열기
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {manual.projectSlug && (
                    <Link
                      href={`/projects/${manual.projectSlug}`}
                      className="relative z-10 text-xs text-stone-500 underline-offset-4 hover:text-[var(--accent)] hover:underline"
                    >
                      프로젝트 상세
                    </Link>
                  )}
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
