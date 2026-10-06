import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import { AX_CASE_STUDIES, AX_CONTACT, AX_HERO, FEATURED_CASE_SLUGS, SITE_URL } from '@/data/ax'
import { COMPANY_PROJECTS, getProject, OTHER_PROJECTS, PROJECTS } from '@/data/projects'
import { MANUALS } from '@/data/manuals'
import { AxCasesSection, AxContactSection, AxHeroSection } from '@/components/portfolio/ax-sections'
import { CareerSection } from '@/components/portfolio/career-section'
import { FadeInUp } from '@/components/portfolio/motion'
import { SortableGrid } from '@/components/portfolio/sortable-grid'

/** 랜딩은 대표 사례만 요약하고, 나머지 서사는 /ax 심화 페이지가 맡는다. */
const LANDING_CASE_COUNT = 3

// 이력서 링크를 공유했을 때 탭·미리보기에 이름이 먼저 보여야 한다.
const LANDING_TITLE = `${AX_HERO.name} — ${AX_HERO.role}`
const LANDING_DESCRIPTION = `${AX_HERO.name} · ${AX_HERO.role}. 영업 현장의 정산·법정 보고·영업 데이터 문제를 직접 만든 시스템으로 풀고 운영해 온 기록 — 프로젝트 ${PROJECTS.length}건, 경력, 프로젝트별 매뉴얼.`
const LANDING_PREVIEW_IMAGE = '/images/portfolio/pharmkpi/hero.png'

export const metadata: Metadata = {
  title: { absolute: LANDING_TITLE },
  description: LANDING_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [{ url: LANDING_PREVIEW_IMAGE, alt: 'PharmKPI 사내 영업 데이터 플랫폼 화면' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [LANDING_PREVIEW_IMAGE],
  },
}

/** Google ProfilePage 구조화 데이터 — 검색이 이 페이지를 한 사람의 프로필로 읽게 한다. */
const PROFILE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: SITE_URL,
  mainEntity: {
    '@type': 'Person',
    name: AX_HERO.name,
    jobTitle: AX_HERO.jobTitle,
    worksFor: { '@type': 'Organization', name: AX_HERO.employer },
    description: AX_HERO.subhead,
    email: `mailto:${AX_CONTACT.email}`,
    sameAs: [AX_CONTACT.linkedin, AX_CONTACT.github],
  },
} as const

const PROJECT_GROUPS = [
  {
    id: 'projects',
    // 묶음을 나누기 전 키 — 방문자가 저장해 둔 순서를 이어 쓴다
    storageKey: 'ref-hub-project-order',
    eyebrow: 'Company Work',
    title: `회사 업무 ${COMPANY_PROJECTS.length}건`,
    lead: '영업관리팀과 영업본부에서 직접 기획·구축·운영한 시스템입니다. 운영을 마친 것도 어디로 이어졌는지와 함께 남깁니다.',
    projects: COMPANY_PROJECTS,
  },
  {
    id: 'other-projects',
    storageKey: 'ref-hub-other-project-order',
    eyebrow: 'Other Work',
    title: `그 밖의 작업 ${OTHER_PROJECTS.length}건`,
    lead: '외부 의뢰와 개인 도구입니다. 회사 업무를 만들고 운영하는 작업 환경도 여기 있습니다.',
    projects: OTHER_PROJECTS,
  },
] as const

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
      <script
        type="application/ld+json"
        // 정적 데이터지만 </script> 조기 종료를 막으려고 < 를 이스케이프한다
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_JSON_LD).replace(/</g, '\\u003c'),
        }}
      />
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

        {PROJECT_GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="mt-20 scroll-mt-20">
            <FadeInUp>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
                    {group.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
                    {group.title}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {group.lead}
                </p>
              </div>
            </FadeInUp>

            <div className="mt-8">
              <SortableGrid projects={group.projects} storageKey={group.storageKey} />
            </div>
          </section>
        ))}

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
