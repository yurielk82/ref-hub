import Image from 'next/image'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

const config = {
  card: {
    imageClass: 'object-cover transition-transform duration-500 group-hover:scale-105',
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: false,
    emojiSize: 'text-5xl',
    wrapperClass: 'h-full',
  },
  detail: {
    imageClass: 'object-cover',
    sizes: '(max-width: 1024px) 100vw, 40vw',
    priority: true,
    emojiSize: 'text-6xl',
    wrapperClass: 'aspect-video',
  },
} as const

export function ProjectThumbnail({
  project,
  variant,
}: {
  project: Pick<Project, 'screenshot' | 'name' | 'gradient' | 'emoji'>
  variant: 'card' | 'detail'
}) {
  const v = config[variant]

  if (project.screenshot) {
    return (
      <div className="relative aspect-video">
        <Image
          src={project.screenshot}
          alt={`${project.name} 스크린샷`}
          fill
          className={v.imageClass}
          sizes={v.sizes}
          priority={v.priority}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br',
        v.wrapperClass,
        project.gradient,
      )}
    >
      <span className={v.emojiSize}>{project.emoji}</span>
    </div>
  )
}
