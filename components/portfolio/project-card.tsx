import Link from 'next/link'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'
import { NewBadge } from './badge'
import { ProjectThumbnail } from './project-thumbnail'
import { TechTags } from './tech-tags'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'glass-card group block overflow-hidden rounded-2xl',
        project.badge && 'ring-2 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]',
      )}
    >
      {/* 스크린샷 또는 그라데이션 플레이스홀더 */}
      <div className="relative aspect-video overflow-hidden">
        <ProjectThumbnail project={project} variant="card" />

        {/* NEW 뱃지 */}
        {project.badge && (
          <span className="absolute left-3 top-3 z-10 shadow-sm">
            <NewBadge label={project.badge} />
          </span>
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
        <div className="mt-3">
          <TechTags items={project.tech.slice(0, 4)} variant="compact" />
        </div>
      </div>
    </Link>
  )
}
