import { PROJECTS } from '@/data/projects'
import { SortableGrid } from '@/components/portfolio/sortable-grid'
import { FadeInUp } from '@/components/portfolio/motion'

export default function HomePage() {
  return (
    <>
      {/* 히어로 */}
      <section className="px-6 pb-20 pt-24 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <FadeInUp>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">
                수작업을 시스템으로,
              </span>
              <br />
              <span className="gradient-text">
                데이터로, AI로.
              </span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="mt-5 text-sm text-zinc-500">
              권대환 · 한국유니온제약 영업관리팀
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              제약 영업관리 및 유통 실무를 기반으로, 데이터·시스템·AI를 활용해
              반복 수작업과 운영 병목을 개선해 왔습니다. 현업과 IT 사이의 간극을
              줄이며, 업무를 실제로 작동하는 프로세스와 시스템으로 연결하는 역할에
              강점이 있습니다.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <FadeInUp>
            <div className="mb-10">
              <span className="inline-block rounded-full border border-[var(--accent-muted)] bg-[var(--accent-muted)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs tracking-wider text-[var(--accent)]">
                Projects
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                프로젝트
              </h2>
            </div>
          </FadeInUp>
          <SortableGrid projects={PROJECTS} />
        </div>
      </section>
    </>
  )
}
