import Link from 'next/link'

import { getProject } from '@/data/projects'
import { EDGE_CASES, WORK_CHAPTERS, type WorkChapter } from '@/data/work-history'

import { FadeInUp } from './motion'

const CHAPTER_STAGGER_DELAY = 0.04

/** 랜딩의 중심 — 무엇을 만들었는지보다 어떤 업무를 맡아 무엇을 바꿨는지를 먼저 보인다. */
export function WorkSection() {
  return (
    <section id="work" className="mt-20 scroll-mt-20">
      <FadeInUp>
        <SectionHeading
          label="맡아 온 일"
          title="영업관리 정상화부터 회생·통합·영업본부까지"
          lead="시기별로 어떤 상황에서 무엇을 했고 어떻게 됐는지 적었습니다. 시스템은 그 업무를 받치려고 만든 것입니다."
        />
      </FadeInUp>
      <ol className="mt-8 space-y-5">
        {WORK_CHAPTERS.map((chapter, index) => (
          <li key={chapter.id} id={`work-${chapter.id}`} className="scroll-mt-20">
            <FadeInUp delay={index * CHAPTER_STAGGER_DELAY}>
              <WorkChapterCard chapter={chapter} />
            </FadeInUp>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function EdgeCaseSection() {
  return (
    <section id="edge-cases" className="mt-20 scroll-mt-20">
      <FadeInUp>
        <SectionHeading
          label="겪은 예외 상황"
          title={`규칙으로 남긴 예외 ${EDGE_CASES.length}가지`}
          lead="ERP 전환과 법정 보고를 거치며 실제로 부딪힌 문제와, 다시 생기지 않게 정한 처리 방식입니다."
        />
      </FadeInUp>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {EDGE_CASES.map((edgeCase) => (
          <li
            key={edgeCase.title}
            className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
          >
            <h3 className="text-base font-bold text-stone-950 dark:text-stone-50">
              {edgeCase.title}
            </h3>
            <dl className="mt-3 space-y-2 text-sm leading-6">
              <div>
                <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">문제</dt>
                <dd className="text-stone-700 dark:text-stone-300">{edgeCase.problem}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">처리</dt>
                <dd className="text-stone-700 dark:text-stone-300">{edgeCase.handling}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SectionHeading({ label, title, lead }: { label: string; title: string; lead: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold text-[var(--accent)]">{label}</p>
        <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">{title}</h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">{lead}</p>
    </div>
  )
}

function WorkChapterCard({ chapter }: { chapter: WorkChapter }) {
  return (
    <article className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[8rem_1fr] sm:p-6">
      <p className="font-[family-name:var(--font-mono)] text-xs text-stone-500 dark:text-stone-400">
        {chapter.period}
      </p>
      <div>
        <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50">{chapter.title}</h3>
        <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
          {chapter.situation}
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <ChapterList
            term="내가 한 일"
            items={chapter.actions}
            itemClassName="text-stone-700 dark:text-stone-300"
          />
          <ChapterList
            term="결과"
            items={chapter.results}
            itemClassName="font-semibold text-stone-900 dark:text-stone-100"
          />
        </div>
        <ChapterProjects slugs={chapter.projects} />
      </div>
    </article>
  )
}

function ChapterList({
  term,
  items,
  itemClassName,
}: {
  term: string
  items: readonly string[]
  itemClassName: string
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">{term}</p>
      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-6 marker:text-[var(--accent)]">
        {items.map((item) => (
          <li key={item} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChapterProjects({ slugs }: { slugs: readonly string[] }) {
  const projects = slugs.map(getProject).filter((project) => project !== undefined)
  if (projects.length === 0) return null
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="text-xs text-stone-500 dark:text-stone-400">이 일에 쓴 시스템</span>
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300"
        >
          {project.name}
        </Link>
      ))}
    </div>
  )
}
