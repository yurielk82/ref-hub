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

export interface AxCaseStudy {
  projectSlug: string
  label: string
  /** 스캔용 임팩트 헤드라인 1줄: before → after + 핵심 기법 */
  impact?: string
  problem: string
  intervention: string
  /** 있으면 상세 페이지에서 intervention 대신 시간순 단계로 렌더 */
  steps?: AxCaseStep[]
  outcome: string
  /** 이 일이 가능했던 조직적 조건 (경영진 지원 등) */
  sponsorship?: string
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
