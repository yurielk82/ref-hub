/**
 * 공고 모음의 자료 형태. 사람인 응답(lib/jobs/saramin.ts)을 이 형태로 바꿔 저장하고 화면에 쓴다.
 * 시각은 모두 ISO 문자열(UTC)이며, 한국 날짜 계산은 lib/jobs/board.ts가 맡는다.
 *
 * 이 폴더의 파일은 수집 스크립트가 Node로 바로 실행하므로 서로를 `.ts` 확장자로 불러오고,
 * 타입은 `import type`으로만 가져온다(Node 형식 제거 실행 조건).
 */

export interface JobExperience {
  /** 1 신입, 2 경력, 3 신입/경력, 0 경력무관 (사람인 코드) */
  code: number;
  min: number;
  max: number;
  label: string;
}

export interface JobPosting {
  id: string;
  url: string;
  title: string;
  company: string;
  companyUrl: string | null;
  location: string;
  jobType: string;
  industryCode: string;
  industry: string;
  jobCodes: string[];
  jobNames: string;
  experience: JobExperience;
  education: string;
  salary: string;
  keywords: string[];
  postedAt: string | null;
  /** 접수마감일이 정해진 공고만 값이 있다. 상시·수시·채용시 마감은 null */
  expiresAt: string | null;
  closeType: string;
  active: boolean;
}

export type FitLevel = "high" | "medium" | "low";

export interface FitResult {
  level: FitLevel;
  score: number;
  /** 점수를 만든 근거 — 화면에 그대로 보여 준다 */
  reasons: string[];
}

export interface StoredPosting extends JobPosting {
  firstSeenAt: string;
  lastSeenAt: string;
  fit: FitResult;
}

export interface CollectionRun {
  at: string;
  ok: boolean;
  fetched: number;
  added: number;
  message?: string;
}

export interface JobStore {
  version: 1;
  /** 마지막으로 성공한 수집 시각 — 이 수집에서 처음 본 공고가 '새 공고'다 */
  lastSuccessAt: string | null;
  lastRun: CollectionRun | null;
  postings: StoredPosting[];
}

export interface SearchQuery {
  id: string;
  /** 화면의 수집 조건 설명에 쓰는 이름 */
  label: string;
  params: Record<string, string>;
}
