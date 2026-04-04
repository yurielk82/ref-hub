import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

export function ProjectCard({ project }: { project: Project }) {
  const { screenshot } = project

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass-card group block overflow-hidden rounded-2xl"
    >
      {/* 스크린샷 또는 그라데이션 플레이스홀더 */}
      <div className="relative aspect-video overflow-hidden">
        {screenshot ? (
          <Image
            src={screenshot}
            alt={`${project.name} 스크린샷`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className={cn(
              'flex h-full items-center justify-center bg-gradient-to-br',
              project.gradient,
            )}
          >
            <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
              {project.emoji}
            </span>
          </div>
        )}

        {/* 카테고리 뱃지 */}
        <span className="absolute right-3 top-3 rounded-full border border-stone-200 bg-white/90 px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-stone-600 dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-300">
          {project.category}
        </span>
      </div>

      {/* 콘텐츠 */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          {project.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {project.tagline}
        </p>

        {/* 기술 스택 태그 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-[var(--accent-muted)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
