export type MetricDisclosure = 'public' | 'range' | 'withheld'

export interface AxPillar {
  label: string
  title: string
  description: string
}

export interface AxCaseStudy {
  projectSlug: string
  label: string
  /** 스캔용 임팩트 헤드라인 1줄: before → after + 핵심 기법 */
  impact?: string
  problem: string
  intervention: string
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
