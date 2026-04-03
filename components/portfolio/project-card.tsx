import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

export function ProjectCard({ project }: { project: Project }) {
  const { screenshot } = project

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
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
        <span className="absolute right-3 top-3 rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 backdrop-blur-sm dark:bg-zinc-950/70 dark:text-zinc-300">
          {project.category}
        </span>
      </div>

      {/* 콘텐츠 */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-zinc-900 group-hover:text-black dark:text-zinc-100 dark:group-hover:text-white">
          {project.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
          {project.tagline}
        </p>

        {/* 기술 스택 태그 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-200/80 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
