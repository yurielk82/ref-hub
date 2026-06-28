import Link from 'next/link'
import { ArrowRight, CheckCircle2, ExternalLink, Mail, ShieldCheck } from 'lucide-react'

import { AX_HERO, type AxCaseStudy, type AxGrounding, type MetricDisclosure } from '@/data/ax'
import type { Project } from '@/data/projects'

import { FadeInUp } from './motion'
import { ProjectThumbnail } from './project-thumbnail'

const disclosureLabel: Record<MetricDisclosure, string> = {
  public: '공개',
  range: '범위 한정 공개',
  withheld: '비공개',
}

const CASE_STAGGER_DELAY = 0.06

export function AxHeroSection() {
  return (
    <FadeInUp>
      <section className="grid gap-10 border-b border-stone-200 pb-14 dark:border-stone-800 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
            {AX_HERO.eyebrow}
          </p>
          <h1
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-stone-950 dark:text-stone-50 sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            {AX_HERO.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-stone-900 dark:text-stone-100">
            {AX_HERO.subhead}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300">
            {AX_HERO.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cases"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              대표 사례
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/yurielk82"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            >
              <ExternalLink className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/yurielk82"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-stone-500">
            Operating Model
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {AX_HERO.evidence.map((item) => (
              <div key={item.label} className="rounded-lg bg-stone-50 px-4 py-3 dark:bg-stone-950">
                <p className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase text-[var(--accent)]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-stone-700 dark:text-stone-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInUp>
  )
}

type AxCase = AxCaseStudy & { project: Project }

export function AxCasesSection({ cases }: { cases: AxCase[] }) {
  return (
    <section id="cases" className="mt-20 scroll-mt-20">
      <FadeInUp>
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
          Featured Cases
        </p>
        <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">AX 대표 사례</h2>
      </FadeInUp>

      <div className="mt-8 space-y-5">
        {cases.map((study, index) => (
          <FadeInUp key={study.projectSlug} delay={index * CASE_STAGGER_DELAY}>
            <div className="group relative overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:hover:border-[var(--accent)]">
              <div className="grid lg:grid-cols-[0.44fr_0.56fr]">
                <div className="flex items-center justify-center border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950 lg:border-b-0 lg:border-r">
                  <ProjectThumbnail project={study.project} variant="detail" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[var(--accent-muted)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] uppercase text-[var(--accent)]">
                      {study.label}
                    </span>
                    <span className="rounded-md bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                      {disclosureLabel[study.disclosure]}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-stone-950 dark:text-stone-50">
                        {study.project.name}
                      </h3>
                      <p className="mt-1 text-sm text-stone-500">{study.project.highlight}</p>
                    </div>
                    <Link
                      href={`/projects/${study.project.slug}`}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--accent)] after:absolute after:inset-0 after:content-[''] hover:text-[var(--accent-light)] group-hover:gap-2"
                    >
                      {study.evidenceLabel}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  {study.impact && (
                    <p className="mt-5 border-l-2 border-l-[var(--accent)] pl-3 text-sm font-semibold leading-6 text-stone-900 dark:text-stone-100">
                      {study.impact}
                    </p>
                  )}

                  <dl className="mt-6 grid gap-4">
                    <AxCaseFact term="Problem" value={study.problem} />
                    <AxCaseFact term="AX Intervention" value={study.intervention} />
                    <AxCaseFact term="Outcome" value={study.outcome} />
                  </dl>
                </div>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  )
}

export function AxGroundingSection({ data }: { data: AxGrounding }) {
  return (
    <section className="mt-20">
      <FadeInUp>
        <div className="overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--accent)_24%,transparent)] bg-[color-mix(in_srgb,var(--accent)_5%,white)] p-6 dark:bg-[color-mix(in_srgb,var(--accent)_10%,black)] sm:p-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
              {data.eyebrow}
            </p>
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold text-stone-950 dark:text-stone-50">
            {data.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
            {data.summary}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.examples.map((example) => (
              <div
                key={example.label}
                className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
              >
                <span className="rounded-md bg-[var(--accent-muted)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] uppercase text-[var(--accent)]">
                  {example.label}
                </span>
                <p className="mt-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
                  {example.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[color-mix(in_srgb,var(--accent)_18%,transparent)] pt-6">
            <p className="max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              {data.spreadLead}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.spreadTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  )
}

function AxCaseFact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-stone-400">{term}</dt>
      <dd className="mt-1 text-sm leading-6 text-stone-700 dark:text-stone-300">{value}</dd>
    </div>
  )
}

export function AxContactSection() {
  return (
    <FadeInUp>
      <section className="mt-20 rounded-lg border border-[color-mix(in_srgb,var(--accent)_24%,transparent)] bg-[color-mix(in_srgb,var(--accent)_5%,white)] p-6 dark:bg-[color-mix(in_srgb,var(--accent)_10%,black)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
              Contact
            </p>
            <h2 className="mt-2 text-xl font-bold text-stone-950 dark:text-stone-50">
              AX 사례와 구현 세부 내용을 더 설명할 수 있습니다.
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              공개 가능한 범위 안에서 문제 정의, 구현 방식, 운영상 배운 점을 중심으로
              이야기하겠습니다.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="mailto:ssmtransite@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              이메일 문의
            </a>
            <a
              href="https://www.linkedin.com/in/yurielk82"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            >
              <ExternalLink className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/yurielk82"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </FadeInUp>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}
