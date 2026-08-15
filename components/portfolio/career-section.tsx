import Link from 'next/link'
import { Check } from 'lucide-react'

import { EXPERIENCES, SKILL_CATEGORIES, type Experience } from '@/data/experience'
import { getProject } from '@/data/projects'

import { FadeInUp } from './motion'
import { TechTags } from './tech-tags'

const ENTRY_STAGGER_DELAY = 0.06

const GROUPS = [
  { kind: 'employment' as const, label: '재직', title: '회사 경력' },
  { kind: 'independent' as const, label: '개인', title: '개인 프로젝트 · 프리랜스' },
]

export function CareerSection() {
  return (
    <section id="career" className="mt-20 scroll-mt-20">
      <FadeInUp>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-[var(--accent)]">
              Career
            </p>
            <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">경력</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-500 dark:text-stone-400">
            현업 부서에서 운영 기준을 세우고, 그 자리에서 필요한 시스템을 직접 만들어 왔습니다.
          </p>
        </div>
      </FadeInUp>

      {GROUPS.map((group) => {
        const entries = EXPERIENCES.filter((experience) => experience.kind === group.kind)
        if (entries.length === 0) return null
        return (
          <div key={group.kind} className="mt-8">
            <FadeInUp>
              <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
                {group.title}
              </h3>
            </FadeInUp>
            <ol className="mt-4 space-y-4">
              {entries.map((experience, index) => (
                <FadeInUp key={experience.title} delay={index * ENTRY_STAGGER_DELAY}>
                  <CareerEntry experience={experience} />
                </FadeInUp>
              ))}
            </ol>
          </div>
        )
      })}

      <FadeInUp>
        <h3 className="mt-12 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
          기술 스택
        </h3>
      </FadeInUp>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {SKILL_CATEGORIES.map((category, index) => (
          <FadeInUp key={category.label} delay={index * ENTRY_STAGGER_DELAY}>
            <div className="h-full rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h4 className="mb-4 font-[family-name:var(--font-mono)] text-xs uppercase text-stone-500">
                {category.label}
              </h4>
              <TechTags items={category.items} variant="full" />
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  )
}

function CareerEntry({ experience }: { experience: Experience }) {
  return (
    <li className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[8rem_1fr]">
      <p className="font-[family-name:var(--font-mono)] text-xs text-stone-400">
        {experience.period}
      </p>
      <div>
        <h4 className="text-base font-bold text-stone-950 dark:text-stone-50">
          {experience.title}
        </h4>
        <p className="mt-1 text-sm font-medium text-[var(--accent)]">{experience.role}</p>
        <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
          {experience.description}
        </p>

        <ul className="mt-4 space-y-2">
          {experience.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
              <span className="text-sm leading-6 text-stone-700 dark:text-stone-300">
                {highlight}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {experience.projects.map((slug) => {
            const project = getProject(slug)
            if (!project) return null
            return (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300"
              >
                {project.name}
              </Link>
            )
          })}
        </div>
      </div>
    </li>
  )
}
