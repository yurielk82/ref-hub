export type MetricDisclosure = 'public' | 'range' | 'withheld'

export interface AxPillar {
  label: string
  title: string
  description: string
}

/** 시간순 진화 단계 — 무엇을 어떤 순서로 효율화했는지 */
export interface AxCaseStep {
  /** 시점 라벨 — '이전', '1단계', '지금' 등 */
  phase: string
  title: string
  body: string
}

/** 지금 상태 — 운영 중 / 다른 시스템으로 이어짐 / 운영 종료. 끝난 일도 기록으로 남긴다. */
export type CaseStatusKind = 'live' | 'evolved' | 'retired'

export const CASE_STATUS_LABEL: Readonly<Record<CaseStatusKind, string>> = {
  live: '운영 중',
  evolved: '다음 시스템으로 이어짐',
  retired: '운영 종료',
}

export interface CaseStatus {
  kind: CaseStatusKind
  /** 무엇으로 이어졌는지·왜 멈췄는지 한 문장 */
  note: string
}

export interface AxCaseStudy {
  projectSlug: string
  label: string
  /** 내가 맡은 일과 결정권 범위 — 팀·후원자가 아니라 본인 몫을 쓴다 */
  role: string
  /** 'YYYY-MM ~ YYYY-MM' 또는 'YYYY-MM ~ 지금' — 저장소 첫·마지막 커밋 근거 */
  period: string
  status: CaseStatus
  /** 스캔용 임팩트 헤드라인 1줄: before → after + 핵심 기법 */
  impact?: string
  problem: string
  intervention: string
  /** 있으면 상세 페이지에서 intervention 대신 시간순 단계로 렌더 */
  steps?: AxCaseStep[]
  outcome: string
  disclosure: MetricDisclosure
  evidenceLabel: string
}

export interface AxGroundingExample {
  label: string
  text: string
}

export interface AxGrounding {
  eyebrow: string
  title: string
  summary: string
  examples: AxGroundingExample[]
  /** 같은 원칙이 관통하는 기법 — 설명 한 줄 + 라벨 태그 */
  spreadLead: string
  spreadTags: string[]
}

export interface AxMethodStep {
  title: string
  description: string
}

export interface AxStackGroup {
  label: string
  items: string[]
}
