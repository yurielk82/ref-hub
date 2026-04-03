import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'
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
    <article className="px-6 pb-24 pt-12">
      <div className="mx-auto max-w-3xl">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          전체 프로젝트
        </Link>

        {/* 히어로 이미지 */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800/60">
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
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {project.name}
              </h1>
              <p className="text-sm text-zinc-500">{project.tagline}</p>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>

          {/* 기술 하이라이트 */}
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/50">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              핵심 기술
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{project.highlight}</p>
          </div>

          {/* 기술 스택 */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              기술 스택
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 주요 기능 */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
              주요 기능
            </p>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
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
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                라이브 데모
              </a>
            )}
            {project.docsPath && (
              <Link
                href={project.docsPath}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
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
