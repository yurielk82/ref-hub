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
              그 목적이 작동하는 시스템을
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
              정산이 매달 흔들리는 건 담당자 문제가 아니라 기준이 없기 때문이고,
              리포트를 매번 새로 만드는 건 시스템이 없기 때문입니다. 제약 영업관리
              현장에서 이런 병목의 원인을 목적 단위로 재정의하고, KPI 대시보드·CSO
              정산 포털·공급내역 검증 시스템을 직접 설계·구축해 운영하고 있습니다.
              개인의 숙련도에 기대던 업무를 구조와 시스템 위에 올려, 사람이
              바뀌어도 기준이 흔들리지 않는 팀을 만들었습니다. 다음은 이 관점을
              팀이 아니라 조직 단위로 확장하는 것입니다.
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
