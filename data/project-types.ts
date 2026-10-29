/** 사례 상세 "주요 화면" 한 장 — 화면 이름과 그 화면이 하는 업무 */
export interface ProjectScreen {
  src: string;
  title: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  category: "web" | "mobile" | "api" | "tool";
  /** 랜딩 묶음 — 회사 업무(company)와 그 밖의 작업(개인 도구·외부 의뢰, other) */
  scope: "company" | "other";
  liveUrl?: string;
  githubUrl?: string;
  docsPath?: string;
  screenshot?: string;
  /** 사례 상세에 싣는 주요 화면 — 첫 장이 대표 화면 */
  screens?: ProjectScreen[];
  /** 화면을 가짜 값으로 바꿔 찍었을 때 갤러리 위에 밝히는 한 줄 */
  screensNote?: string;
  emoji: string;
  gradient: string;
  features: string[];
  highlight: string;
  year: string;
  badge?: string;
  featuredModule?: {
    name: string;
    description: string;
    path: string;
    emoji: string;
  };
}

/** 영업관리 지원용 대표 레퍼런스. 화면별 세부 사례는 개별 주소로 보존한다. */
export const REFERENCE_PROJECT_SLUGS = [
  "pharmkpi",
  "sales-hq-sfe",
  "sales-hq-snop",
  "kpis-dsr-api",
  "csoweb",
] as const;
