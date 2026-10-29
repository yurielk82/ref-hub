export type MetricDisclosure = "public" | "range" | "withheld";

export interface AxPillar {
  label: string;
  title: string;
  description: string;
}

/** 시간순 진화 단계 — 무엇을 어떤 순서로 효율화했는지 */
export interface AxCaseStep {
  /** 시점 라벨 — '이전', '1단계', '지금' 등 */
  phase: string;
  title: string;
  body: string;
}

/** 지금 상태 — 운영 중 / 다른 시스템으로 이어짐 / 운영 종료. 끝난 일도 기록으로 남긴다. */
export type CaseStatusKind = "live" | "evolved" | "retired";

export const CASE_STATUS_LABEL: Readonly<Record<CaseStatusKind, string>> = {
  live: "운영 중",
  evolved: "다음 시스템으로 이어짐",
  retired: "운영 종료",
};

export interface CaseStatus {
  kind: CaseStatusKind;
  /** 무엇으로 이어졌는지·왜 멈췄는지 한 문장 */
  note: string;
}

export interface AxCaseStudy {
  projectSlug: string;
  label: string;
  /** 내가 맡은 일과 결정권 범위 — 팀·후원자가 아니라 본인 몫을 쓴다 */
  role: string;
  /** 'YYYY-MM ~ YYYY-MM' 또는 'YYYY-MM ~ 지금' — 저장소 첫·마지막 커밋 근거 */
  period: string;
  status: CaseStatus;
  /** 스캔용 임팩트 헤드라인 1줄: before → after + 핵심 기법 */
  impact?: string;
  problem: string;
  intervention: string;
  /** 있으면 상세 페이지에서 intervention 대신 시간순 단계로 렌더 */
  steps?: AxCaseStep[];
  outcome: string;
  disclosure: MetricDisclosure;
  evidenceLabel: string;
  /** AX 트랙(/ax)에서 같은 사례를 다시 읽는 요약. 기간·상태는 위 칸을 그대로 보여 주므로 되풀이하지 않는다 */
  ax?: AxTrackView;
}

/** AX 트랙 사례 요약 — 문제 → 구축 → 자동화·AI → 운영·검증 순서로 읽힌다 */
export interface AxTrackView {
  headline: string;
  problem: string;
  build: string;
  automation: string;
  /** 상태 문구(status.note)와 함께 보이므로, 거기 없는 운영 방식·검증 결과만 쓴다 */
  operation: string;
}

/** 히어로 문안 — 영업관리 트랙(AX_HERO)과 AX 트랙(AX_TRACK_HERO)이 같은 틀을 쓴다 */
export interface HeroContent {
  name: string;
  role: string;
  title: string;
  subhead: string;
  summary: string;
  evidenceTitle: string;
  evidence: { label: string; text: string }[];
}

export interface AxGroundingExample {
  label: string;
  text: string;
}

export interface AxGrounding {
  title: string;
  summary: string;
  examples: AxGroundingExample[];
  /** 같은 원칙이 관통하는 기법 — 설명 한 줄 + 라벨 태그 */
  spreadLead: string;
  spreadTags: string[];
}

export interface AxMethodStep {
  title: string;
  description: string;
}

/** 영업관리 트랙 일하는 방식 — 단계마다 실제로 한 일(data/work-history.ts 근거)을 붙인다 */
export interface WorkMethodStep extends AxMethodStep {
  example: string;
}

export interface AxStackGroup {
  label: string;
  items: string[];
}
