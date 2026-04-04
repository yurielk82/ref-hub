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
            <div className="mb-6 h-1 w-10 rounded-full bg-[var(--accent)]" />
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-snug tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
              목적을 정의하고,
              <br />
              그것이 실행되는 구조를
              <br />
              직접 만듭니다.
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="mt-5 text-sm text-stone-500">
              권대환 · 한국유니온제약 영업관리팀
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
              실질적 목적을 기준으로 병목을 해석하고, 데이터와 시스템으로 운영
              구조를 전환합니다.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <FadeInUp>
            <div className="mb-10">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
                Projects
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
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
