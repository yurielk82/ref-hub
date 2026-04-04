import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink, BookOpen, Check } from 'lucide-react'
import { PROJECTS, getProject } from '@/data/projects'
import { cn } from '@/lib/utils'

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

  const { screenshot } = project

  return (
    <article className="px-6 pb-28 pt-12">
      <div className="mx-auto max-w-3xl">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          전체 프로젝트
        </Link>

        {/* 히어로 이미지 */}
        <div className="glass-card overflow-hidden rounded-2xl">
          {screenshot ? (
            <div className="relative aspect-video">
              <Image
                src={screenshot}
                alt={`${project.name} 스크린샷`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          ) : (
            <div
              className={cn(
                'flex aspect-video items-center justify-center bg-gradient-to-br',
                project.gradient,
              )}
            >
              <span className="text-7xl">{project.emoji}</span>
            </div>
          )}
        </div>

        {/* 프로젝트 정보 */}
        <div className="mt-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.emoji}</span>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
                {project.name}
              </h1>
              <p className="text-sm text-zinc-500">{project.tagline}</p>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>

          {/* 기술 하이라이트 */}
          <div className="glass-card mt-6 rounded-xl border-l-2 border-l-[var(--accent)] px-5 py-4">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-zinc-500">
              핵심 기술
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {project.highlight}
            </p>
          </div>

          {/* 기술 스택 */}
          <div className="mt-8">
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-zinc-500">
              기술 스택
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-[var(--accent-muted)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 주요 기능 */}
          <div className="mt-8">
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-zinc-500">
              주요 기능
            </p>
            <ul className="space-y-2.5">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* 링크 */}
          <div className="mt-10 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                라이브 데모
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
                GitHub
              </a>
            )}
            {project.docsPath && (
              <Link
                href={project.docsPath}
                className="glass-card inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                <BookOpen className="h-3.5 w-3.5" />
                문서 보기
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
