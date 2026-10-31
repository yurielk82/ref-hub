import Image from "next/image";
import {
  CASE_STATUS_LABEL,
  type AxCaseStep,
  type AxCaseStudy,
} from "@/data/ax";
import type { ProjectScreen } from "@/data/project-types";

/** 사례 첫머리 — 내 역할·기간·지금 상태. 읽는 사람이 "이 사람이 무엇을 했나"부터 보게 한다. */
export function CaseOwnership({ caseStudy }: { caseStudy: AxCaseStudy }) {
  const rows = [
    { term: "내 역할", value: caseStudy.role },
    { term: "기간", value: caseStudy.period },
    {
      term: "운영 현황",
      value: `${CASE_STATUS_LABEL[caseStudy.status.kind]} — ${caseStudy.status.note}`,
    },
  ];

  return (
    <dl className="glass-card mt-6 grid gap-3 rounded-xl p-5 sm:grid-cols-[6rem_1fr]">
      {rows.map((row) => (
        <div key={row.term} className="contents">
          <dt className="text-xs font-semibold text-stone-600 dark:text-stone-400">
            {row.term}
          </dt>
          <dd className="text-sm leading-6 text-stone-800 dark:text-stone-200">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** 단계 아래 화면 — 그 단계에서 무엇을 만들었는지 바로 보이게 한다. 누르면 원본 크기로 연다 */
function StepScreen({ screen }: { screen: ProjectScreen }) {
  return (
    <figure className="mt-4">
      <a
        href={screen.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${screen.title} 화면 크게 보기`}
        className="block overflow-hidden rounded-lg border border-stone-200 bg-stone-50 transition-[border-color,box-shadow] hover:border-[var(--accent)] hover:shadow-[0_6px_20px_-12px_rgba(28,25,23,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-stone-700 dark:bg-stone-900"
      >
        <Image
          src={screen.src}
          alt={`${screen.title} 화면`}
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-auto w-full"
        />
      </a>
      <figcaption className="mt-2.5 max-w-[68ch] text-sm leading-6 text-stone-600 dark:text-stone-400">
        <span className="font-semibold text-stone-800 dark:text-stone-200">
          {screen.title}
        </span>
        {" — "}
        {screen.caption}
      </figcaption>
    </figure>
  );
}

/** 시간순 단계 타임라인 — 첫 단계가 문제(이전), 마지막 단계가 결과(지금)를 담는다 */
function CaseTimeline({
  steps,
  screens,
}: {
  steps: readonly AxCaseStep[];
  screens: readonly ProjectScreen[];
}) {
  const bySrc = new Map(screens.map((screen) => [screen.src, screen]));
  return (
    <ol className="relative mt-8 space-y-10 border-l border-stone-200 pl-7 dark:border-stone-700">
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
          <p className="mt-1.5 max-w-[68ch] text-sm leading-7 text-stone-600 dark:text-stone-400">
            {step.body}
          </p>
          {step.screen && bySrc.get(step.screen) && (
            <StepScreen screen={bySrc.get(step.screen)!} />
          )}
        </li>
      ))}
    </ol>
  );
}

/** 단계 서사가 없는 케이스의 폴백 — 문제 / 개입 / 결과 문단 */
function CaseSummary({ caseStudy }: { caseStudy: AxCaseStudy }) {
  const facts = [
    { term: "문제", value: caseStudy.problem },
    { term: "수행 업무", value: caseStudy.intervention },
    { term: "성과·진행 현황", value: caseStudy.outcome },
  ];

  return (
    <dl className="mt-8 space-y-6">
      {facts.map((fact) => (
        <div key={fact.term}>
          <dt className="text-xs font-semibold uppercase text-stone-400">
            {fact.term}
          </dt>
          <dd className="mt-1 text-sm leading-7 text-stone-700 dark:text-stone-300">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * 프로젝트 상세의 케이스 서사.
 * 단계가 있으면 타임라인 하나가 서사 전체(이전 → 개선 → 지금)를 담당하고,
 * 없으면 문제/개입/결과 문단으로 폴백한다. 둘을 함께 렌더하면 같은 내용이 두 번 나온다.
 */
export function CaseNarrative({
  caseStudy,
  screens = [],
}: {
  caseStudy: AxCaseStudy;
  /** 사례의 주요 화면 — 단계(step.screen)가 가리키는 화면을 찾는 데 쓴다 */
  screens?: readonly ProjectScreen[];
}) {
  // 빈 배열도 truthy — 작성 중인 사례가 조용히 사라지지 않도록 길이로 판정한다
  const hasSteps = Boolean(caseStudy.steps?.length);

  return (
    <section className="mt-16">
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        업무 개선 내용
      </h2>
      <CaseOwnership caseStudy={caseStudy} />

      {caseStudy.impact && (
        <p className="mt-5 border-l-2 border-l-[var(--accent)] pl-3 text-sm font-semibold leading-6 text-stone-900 dark:text-stone-100">
          {caseStudy.impact}
        </p>
      )}

      {hasSteps && caseStudy.steps ? (
        <CaseTimeline steps={caseStudy.steps} screens={screens} />
      ) : (
        <CaseSummary caseStudy={caseStudy} />
      )}
    </section>
  );
}

/** 단계에 이미 붙인 화면 — 아래 "주요 화면" 모음에서는 빼서 같은 장면을 두 번 보이지 않는다 */
export function storyScreenSrcs(caseStudy: AxCaseStudy | undefined): string[] {
  return (caseStudy?.steps ?? []).flatMap((step) =>
    step.screen ? [step.screen] : [],
  );
}
