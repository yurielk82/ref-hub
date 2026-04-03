import { PROJECTS } from '@/data/projects'
import { ProjectCard } from '@/components/portfolio/project-card'

export default function HomePage() {
  return (
    <>
      {/* 히어로 */}
      <section className="px-6 pb-16 pt-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            권대환
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            수작업 중심의 제약 영업관리 환경에서 데이터와 시스템으로 병목을
            개선해 왔으며, 보다 고도화된 환경에서는 이를 더 큰 운영 효율화로
            확장할 수 있습니다.
          </p>
          <a
            href="https://github.com/yurielk82"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
            github.com/yurielk82
          </a>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            프로젝트
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
