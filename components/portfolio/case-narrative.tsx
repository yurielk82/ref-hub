import { CASE_STATUS_LABEL, type AxCaseStep, type AxCaseStudy } from '@/data/ax'

/** 사례 첫머리 — 내 역할·기간·지금 상태. 읽는 사람이 "이 사람이 무엇을 했나"부터 보게 한다. */
function CaseOwnership({ caseStudy }: { caseStudy: AxCaseStudy }) {
  const rows = [
    { term: '내 역할', value: caseStudy.role },
    { term: '기간', value: caseStudy.period },
    {
      term: '지금',
      value: `${CASE_STATUS_LABEL[caseStudy.status.kind]} — ${caseStudy.status.note}`,
    },
  ]

  return (
    <dl className="glass-card mt-6 grid gap-3 rounded-xl p-5 sm:grid-cols-[6rem_1fr]">
      {rows.map((row) => (
        <div key={row.term} className="contents">
          <dt className="text-xs font-semibold text-stone-600 dark:text-stone-400">{row.term}</dt>
          <dd className="text-sm leading-6 text-stone-800 dark:text-stone-200">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

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
    { term: '문제', value: caseStudy.problem },
    { term: '내가 한 일', value: caseStudy.intervention },
    { term: '결과', value: caseStudy.outcome },
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
      <CaseOwnership caseStudy={caseStudy} />

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
    </section>
  )
}
