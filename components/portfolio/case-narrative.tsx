import type { AxCaseStep, AxCaseStudy } from '@/data/ax'

/** 시간순 단계 타임라인 — 첫 단계가 문제(이전), 마지막 단계가 결과(지금)를 담는다 */
function CaseTimeline({ steps }: { steps: readonly AxCaseStep[] }) {
  return (
    <ol className="relative mt-8 space-y-7 border-l border-stone-200 pl-7 dark:border-stone-700">
      {steps.map((step) => (
        <li key={step.phase} className="relative">
          <span
            className="absolute -left-[33px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[var(--accent)] dark:border-stone-950"
            aria-hidden
          />
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-[var(--accent)]">
            {step.phase}
          </p>
          <p className="mt-1 text-base font-semibold text-stone-900 dark:text-stone-100">
            {step.title}
          </p>
          <p className="mt-1.5 text-sm leading-7 text-stone-600 dark:text-stone-400">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

/** 단계 서사가 없는 케이스의 폴백 — 문제 / 개입 / 결과 문단 */
function CaseSummary({ caseStudy }: { caseStudy: AxCaseStudy }) {
  const facts = [
    { term: 'Problem', value: caseStudy.problem },
    { term: 'AX Intervention', value: caseStudy.intervention },
    { term: 'Outcome', value: caseStudy.outcome },
  ]

  return (
    <dl className="mt-8 space-y-6">
      {facts.map((fact) => (
        <div key={fact.term}>
          <dt className="text-xs font-semibold uppercase text-stone-400">{fact.term}</dt>
          <dd className="mt-1 text-sm leading-7 text-stone-700 dark:text-stone-300">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * 프로젝트 상세의 케이스 서사.
 * 단계가 있으면 타임라인 하나가 서사 전체(이전 → 개선 → 지금)를 담당하고,
 * 없으면 문제/개입/결과 문단으로 폴백한다. 둘을 함께 렌더하면 같은 내용이 두 번 나온다.
 */
export function CaseNarrative({ caseStudy }: { caseStudy: AxCaseStudy }) {
  // 빈 배열도 truthy — 작성 중인 사례가 조용히 사라지지 않도록 길이로 판정한다
  const hasSteps = Boolean(caseStudy.steps?.length)

  return (
    <section className="mt-16">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
        Case
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        {hasSteps ? '이전 → 단계별 개선 → 지금' : '문제 → 해결 → 결과'}
      </h2>
      {caseStudy.impact && (
        <p className="mt-5 border-l-2 border-l-[var(--accent)] pl-3 text-sm font-semibold leading-6 text-stone-900 dark:text-stone-100">
          {caseStudy.impact}
        </p>
      )}

      {hasSteps && caseStudy.steps ? (
        <CaseTimeline steps={caseStudy.steps} />
      ) : (
        <CaseSummary caseStudy={caseStudy} />
      )}

      {caseStudy.sponsorship && (
        <div className="glass-card mt-8 rounded-xl border-l-4 border-l-[var(--accent-warm)] p-5">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-stone-500">
            추진 배경
          </p>
          <p className="mt-1.5 text-sm leading-7 text-stone-700 dark:text-stone-300">
            {caseStudy.sponsorship}
          </p>
        </div>
      )}
    </section>
  )
}
