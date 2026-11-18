import contentMeta from "@/content/_meta";

export interface Manual {
  slug: string;
  title: string;
  description: string;
  /** 대응하는 포트폴리오 프로젝트 slug (없으면 문서만 존재) */
  projectSlug?: string;
}

/**
 * 매뉴얼 한 줄 소개 — 각 `content/<slug>/index.mdx` 첫 문단 요약.
 * 제목은 `content/_meta.tsx`(Nextra 사이드바 SSOT)에서 가져오므로 여기 두지 않는다.
 */
const MANUAL_DETAILS: Record<string, Omit<Manual, "slug" | "title">> = {
  csoweb: {
    description:
      "운영 당시 화면 기준의 CSO 정산 포털 매뉴얼. 자체 포털은 2026년 9월 운영 종료.",
    projectSlug: "csoweb",
  },
  "kpis-dsr-api": {
    description:
      "공급내역 적재, 주문 대조, KPIS API 보고, 반송 처리까지의 사용법과 운영 안내",
    projectSlug: "kpis-dsr-api",
  },
  pharmkpi: {
    description: "KPI 1차 메뉴 11개의 사용법과 데이터 반영·권한·배포 운영 안내",
    projectSlug: "pharmkpi",
  },
  "edi-verification": {
    description: "프로엠알 연계 EDI 검토의 기준 관리, AI 판정안, 집계 화면",
  },
  corerx: {
    description: "운영하지 않는 이전 ETL·BI 구현의 설계와 지표 기록",
  },
  "ev-motor-reliability": {
    description: "AVL XML 변환과 모터 시험 자료 분석 매뉴얼",
    projectSlug: "ev-motor-reliability",
  },
  "har-eval": {
    description:
      "도구를 만들지, 들일지, 유지할지 측정과 교차 감사로 정하는 평가 방법",
    projectSlug: "har-eval",
  },
};

function readTitle(entry: unknown, fallback: string): string {
  if (entry && typeof entry === "object" && "title" in entry) {
    const { title } = entry as { title?: unknown };
    if (typeof title === "string") return title;
  }
  return fallback;
}

function isDocEntry(entry: unknown): boolean {
  // `index` 는 포트폴리오로 돌아가는 외부 링크라 매뉴얼이 아니다 (href 보유).
  return !(
    entry &&
    typeof entry === "object" &&
    ("href" in entry || ("display" in entry && entry.display === "hidden"))
  );
}

/** Nextra 사이드바 등록 순서를 그대로 따르는 매뉴얼 목록 */
export const MANUALS: Manual[] = Object.entries(contentMeta)
  .filter(([slug, entry]) => isDocEntry(entry) && slug in MANUAL_DETAILS)
  .map(([slug, entry]) => ({
    slug,
    title: readTitle(entry, slug),
    ...MANUAL_DETAILS[slug],
  }));
