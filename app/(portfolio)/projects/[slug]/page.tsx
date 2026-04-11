import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'
import { PROJECTS, getProject } from '@/data/projects'
import { cn } from '@/lib/utils'
import { NewBadge } from '@/components/portfolio/badge'
import { ProjectThumbnail } from '@/components/portfolio/project-thumbnail'
import { TechTags } from '@/components/portfolio/tech-tags'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.description,
  }
}

export default async function ProjectPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article className="px-6 pb-28 pt-12">
      <div className="mx-auto max-w-5xl">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-light)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          프로젝트 목록
        </Link>

        {/* 히어로: 60/40 스플릿 */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* 좌측 60% — 텍스트 */}
          <div className="lg:w-3/5">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{project.emoji}</span>
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-900 dark:text-stone-50">
                  {project.name}
                </h1>
                <p className="text-base text-stone-500">{project.tagline}</p>
              </div>
            </div>

            <p className="mt-6 max-w-xl leading-relaxed text-stone-600 dark:text-stone-300">
              {project.description}
            </p>

            {/* CTA 버튼 */}
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  사이트 보기
                </a>
              )}
              {project.docsPath && (
                <Link
                  href={project.docsPath}
                  className="glass-card inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  문서 보기
                </Link>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* 우측 40% — 스크린샷 */}
          <div className="lg:w-2/5">
            <div className="glass-card overflow-hidden rounded-2xl">
              <ProjectThumbnail project={project} variant="detail" />
            </div>
          </div>
        </div>

        {/* 핵심 모듈 콜아웃 */}
        {project.featuredModule && (
          <section className="mt-16">
            <div className="overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_20%,transparent)] bg-gradient-to-r from-[color-mix(in_srgb,var(--accent)_5%,transparent)] to-transparent">
              <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{project.featuredModule.emoji}</span>
                    <NewBadge />
                  </div>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-stone-900 dark:text-stone-50">
                    {project.featuredModule.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {project.featuredModule.description}
                  </p>
                </div>
                <Link
                  href={project.featuredModule.path}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  상세 문서
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 기술 스택 */}
        <section className="mt-16">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
            Tech Stack
          </p>
          <TechTags items={project.tech} variant="full" />
        </section>

        {/* 주요 기능 — 번호 매김 */}
        <section className="mt-16">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
            Features
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            주요 기능
          </h2>

          <div className="mt-8 space-y-6">
            {project.features.map((feature, i) => (
              <div
                key={feature}
                className={cn(
                  'flex items-start gap-5',
                  i % 2 === 1 && 'lg:flex-row-reverse lg:text-right',
                )}
              >
                {/* 번호 뱃지 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* 기능 설명 */}
                <div className="pt-1.5">
                  <p className="text-base font-medium text-stone-900 dark:text-stone-100">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 하이라이트 콜아웃 */}
        <section className="mt-16">
          <div className="glass-card flex items-center gap-5 rounded-xl border-l-4 border-l-[var(--accent-warm)] p-6">
            <div className="flex-1">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-stone-500">
                하이라이트
              </p>
              <p className="mt-1 text-lg font-bold text-stone-900 dark:text-stone-100">
                {project.highlight}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
              {project.year}
            </span>
          </div>
        </section>
      </div>
    </article>
  )
}
