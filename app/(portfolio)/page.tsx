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
                보이지 않는 패턴을
              </span>
              <br />
              <span className="gradient-text">
                시스템으로 만듭니다.
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
              제약 영업관리 현장에서 수기 프로세스를 자동화하며 출발했습니다.
              반복 업무를 줄이는 데서 그치지 않고, 운영 기준을 정리하고 데이터를
              실시간으로 가시화하며 시스템 중심의 업무 구조로 전환하는 일을
              해왔습니다. 앞으로는 이러한 경험을 바탕으로 더 고도화된 환경에서
              표준화, 운영 효율화, 시스템 혁신까지 확장해 나가고자 합니다.
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
