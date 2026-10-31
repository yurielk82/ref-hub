import Link from "next/link";

import { getProject } from "@/data/projects";
import { WORK_CHAPTERS, type WorkChapter } from "@/data/work-history";

import { FadeInUp } from "./motion";

const CHAPTER_STAGGER_DELAY = 0.04;

/** 랜딩의 중심 — 무엇을 만들었는지보다 어떤 업무를 맡아 무엇을 바꿨는지를 먼저 보인다. */
export function WorkSection() {
  return (
    <section id="work" className="mt-20 scroll-mt-20">
      <FadeInUp>
        <SectionHeading
          title="주요 업무 및 개선 사례"
          lead="공급내역보고 오류 대응부터 부서별 업무 화면, SFE 분석까지 문제를 찾아 시스템으로 바꾼 순서대로 정리했습니다."
        />
      </FadeInUp>
      <ol className="mt-8 space-y-5">
        {WORK_CHAPTERS.map((chapter, index) => (
          <li
            key={chapter.id}
            id={`work-${chapter.id}`}
            className="scroll-mt-20"
          >
            <FadeInUp delay={index * CHAPTER_STAGGER_DELAY}>
              <WorkChapterCard chapter={chapter} />
            </FadeInUp>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionHeading({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
        {lead}
      </p>
    </div>
  );
}

function WorkChapterCard({ chapter }: { chapter: WorkChapter }) {
  return (
    <article className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[8rem_1fr] sm:p-6">
      <p className="font-[family-name:var(--font-mono)] text-xs text-stone-500 dark:text-stone-400">
        {chapter.period}
      </p>
      <div>
        <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50">
          {chapter.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
          {chapter.situation}
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <ChapterList
            term="수행 업무"
            items={chapter.actions}
            itemClassName="text-stone-700 dark:text-stone-300"
          />
          <ChapterList
            term="성과·진행 현황"
            items={chapter.results}
            itemClassName="font-semibold text-stone-900 dark:text-stone-100"
          />
        </div>
        <ChapterProjects slugs={chapter.projects} />
      </div>
    </article>
  );
}

function ChapterList({
  term,
  items,
  itemClassName,
}: {
  term: string;
  items: readonly string[];
  itemClassName: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
        {term}
      </p>
      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-6 marker:text-[var(--accent)]">
        {items.map((item) => (
          <li key={item} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterProjects({ slugs }: { slugs: readonly string[] }) {
  const projects = slugs
    .map(getProject)
    .filter((project) => project !== undefined);
  if (projects.length === 0) return null;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="text-xs text-stone-500 dark:text-stone-400">
        관련 시스템
      </span>
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
  );
}
