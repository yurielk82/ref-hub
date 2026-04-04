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
              목적을 기준으로 병목을 해석하고,
              <br />
              데이터와 시스템으로 해결합니다.
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="mt-5 text-sm text-stone-500">
              권대환 · 한국유니온제약 영업관리팀
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
              제약 영업관리 현장에서 반복 업무와 운영 혼선을 단순한 실무 이슈가
              아니라, 목적 달성을 가로막는 구조적 병목으로 보고 개선해 왔습니다.
              수기 프로세스 자동화, 운영 기준 정리, 데이터 가시화, 시스템 중심
              업무 전환을 통해 개인의 경험에 의존하던 업무를 더 명확하고 안정적인
              운영 구조로 바꾸는 데 집중했습니다. 그 결과 팀이 더 적은 혼선과
              피로로도 일관되게 움직일 수 있는 기반을 만들었고, 앞으로는 이러한
              강점을 바탕으로 더 고도화된 환경에서 표준화, 운영 효율화, 시스템
              혁신까지 확장하고자 합니다.
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
