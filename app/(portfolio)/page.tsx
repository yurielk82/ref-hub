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
              복잡한 현업을 구조화하고,
              <br />
              데이터와 시스템으로 팀이 더
              <br />
              효율적으로 움직이는 환경을
              <br />
              만듭니다.
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="mt-5 text-sm text-stone-500">
              권대환 · 한국유니온제약 영업관리팀
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
              제약 영업관리 현장에서 반복 업무와 운영 혼선을 단순히 처리하는 데
              그치지 않고, 병목이 발생하는 지점을 빠르게 파악해 데이터 기준과
              시스템 구조로 재설계해 왔습니다. 수기 프로세스 자동화, 운영 기준
              정리, 실시간 가시화 체계 구축을 통해 개인의 경험에 의존하던 업무를
              누구나 이해하고 실행할 수 있는 체계로 전환하는 데 집중했습니다.
              그 결과 팀은 불필요한 반복과 커뮤니케이션 비용을 줄이고, 더
              안정적이고 효율적으로 움직일 수 있는 기반을 갖추게 되었습니다.
              앞으로는 이러한 강점을 바탕으로 더 고도화된 환경에서 표준화, 운영
              효율화, 데이터 기반 의사결정, 조직의 실행 체계 정립까지 확장해
              나가고자 합니다.
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
