import type { Metadata } from 'next'
import Link from 'next/link'
import { EXPERIENCES, SKILL_CATEGORIES } from '@/data/experience'
import { getProject } from '@/data/projects'
import { FadeInUp } from '@/components/portfolio/motion'

export const metadata: Metadata = {
  title: 'About',
  description: '권대환 — 제약·물류·라이브커머스 도메인 개발자 소개',
}

export default function AboutPage() {
  return (
    <article className="px-6 pb-28 pt-24 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        {/* 히어로 */}
        <FadeInUp>
          <div className="mb-6 h-1 w-10 rounded-full bg-[var(--accent)]" />
          <h1
            className="font-[family-name:var(--font-display)] text-3xl font-bold leading-snug tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            현장 문제를 시스템으로 바꾸는 개발자
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
            제약 영업관리 현장에서 수기 프로세스를 자동화하며 출발했습니다.
            반복 업무를 줄이는 데서 그치지 않고, 운영 기준을 정리하고 데이터를
            실시간으로 가시화하며 시스템 중심의 업무 구조로 전환하는 일을
            해왔습니다.
          </p>
        </FadeInUp>

        {/* 경험 타임라인 */}
        <section className="mt-20">
          <FadeInUp>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
              Experience
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              경험
            </h2>
          </FadeInUp>

          <div className="relative mt-10 ml-4 border-l-2 border-dashed border-[var(--accent)] pl-8">
            {EXPERIENCES.map((exp, i) => (
              <FadeInUp key={exp.title} delay={i * 0.1}>
                <div className="relative mb-10 last:mb-0">
                  {/* 타임라인 도트 */}
                  <div className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />

                  {/* 연도 뱃지 */}
                  <span className="inline-block rounded-full bg-[var(--accent-warm)]/15 px-3 py-0.5 text-xs font-medium text-[var(--accent-warm)] dark:bg-[var(--accent-warm)]/10">
                    {exp.period}
                  </span>

                  {/* 경험 카드 */}
                  <div className="glass-card mt-3 rounded-xl border-l-[3px] border-l-[var(--accent)] p-5">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      {exp.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-stone-500">{exp.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                      {exp.description}
                    </p>

                    {/* 관련 프로젝트 링크 */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.projects.map((slug) => {
                        const proj = getProject(slug)
                        if (!proj) return null
                        return (
                          <Link
                            key={slug}
                            href={`/projects/${slug}`}
                            className="rounded-md bg-[var(--accent-muted)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                          >
                            {proj.emoji} {proj.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </section>

        {/* 기술 스택 밴드 */}
        <section className="mt-20">
          <FadeInUp>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
              Tech Stack
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              보유 기술
            </h2>
          </FadeInUp>

          <div className="mt-8 space-y-4">
            {SKILL_CATEGORIES.map((cat, i) => (
              <FadeInUp key={cat.label} delay={i * 0.08}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="w-20 shrink-0 text-sm font-medium text-stone-500 dark:text-stone-400">
                    {cat.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-stone-100 px-3 py-1.5 text-sm text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </section>

        {/* 연락처 CTA */}
        <section className="mt-20">
          <FadeInUp>
            <div className="glass-card rounded-2xl p-8">
              <h2
                className="text-xl font-bold text-stone-900 dark:text-stone-100"
                style={{ textWrap: 'balance' }}
              >
                함께 일하는 방식을 고민합니다.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                현업의 문제를 기술로 해결하는 데 관심이 있다면, 편하게 연락해 주세요.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/yurielk82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  LinkedIn 보기
                </a>
                <a
                  href="https://github.com/yurielk82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </FadeInUp>
        </section>
      </div>
    </article>
  )
}
