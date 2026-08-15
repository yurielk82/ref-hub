import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import { AX_CASE_STUDIES, FEATURED_CASE_SLUGS } from '@/data/ax'
import { getProject, PROJECTS } from '@/data/projects'
import { MANUALS } from '@/data/manuals'
import { AxCasesSection, AxContactSection, AxHeroSection } from '@/components/portfolio/ax-sections'
import { CareerSection } from '@/components/portfolio/career-section'
import { FadeInUp } from '@/components/portfolio/motion'
import { SortableGrid } from '@/components/portfolio/sortable-grid'

/** 랜딩은 대표 사례만 요약하고, 나머지 서사는 /ax 심화 페이지가 맡는다. */
const LANDING_CASE_COUNT = 3

export const metadata: Metadata = {
  title: { absolute: 'Ref Hub — AX · 프로덕션 시스템 레퍼런스' },
  description:
    '현업 프로세스를 AI 워크플로우로 전환하고 프로덕션 서비스로 직접 운영해 온 기록 — 프로젝트 13건, 경력, 프로젝트별 매뉴얼.',
}

export default function HomePage() {
  const landingSlugs: readonly string[] = FEATURED_CASE_SLUGS.slice(0, LANDING_CASE_COUNT)
  const cases = AX_CASE_STUDIES.map((study) => ({
    ...study,
    project: getProject(study.projectSlug),
  })).filter(
    (study) => study.project !== undefined && landingSlugs.includes(study.projectSlug),
  ) as Array<
    (typeof AX_CASE_STUDIES)[number] & { project: NonNullable<ReturnType<typeof getProject>> }
  >

  return (
    <article className="px-6 pb-28 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <AxHeroSection />

        <AxCasesSection cases={cases} />

        <FadeInUp>
          <div className="mt-8 flex justify-center">
            <Link
              href="/ax"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] dark:border-stone-800 dark:bg-stone-900"
            >
              AX 접근 방식 자세히 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeInUp>

        <section id="projects" className="mt-20 scroll-mt-20">
          <FadeInUp>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
                  Projects
                </p>
                <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
                  전체 프로젝트 {PROJECTS.length}건
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-stone-500 dark:text-stone-400">
                제약 영업관리 현장에서 시작해 엔지니어링 시험·팀 진단·사내 도구까지, 실제로 배포하고
                운영 중인 것들입니다.
              </p>
            </div>
          </FadeInUp>

          <div className="mt-8">
            <SortableGrid projects={PROJECTS} />
          </div>
        </section>

        <CareerSection />

        <section id="docs" className="mt-20 scroll-mt-20">
          <FadeInUp>
            <div className="rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[var(--accent)]" />
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
                  Documentation
                </p>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-stone-950 dark:text-stone-50">
                프로젝트별 매뉴얼 {MANUALS.length}종
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                운영 중인 시스템의 사용자·관리자 문서를 그대로 공개합니다. 화면과 절차가 실제
                서비스와 같습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {MANUALS.map((manual) => (
                  <Link
                    key={manual.slug}
                    href={`/${manual.slug}`}
                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300"
                  >
                    {manual.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/docs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-light)]"
              >
                문서 전체 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeInUp>
        </section>

        <AxContactSection />
      </div>
    </article>
  )
}
