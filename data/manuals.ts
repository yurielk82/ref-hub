import contentMeta from '@/content/_meta'

export interface Manual {
  slug: string
  title: string
  description: string
  /** 대응하는 포트폴리오 프로젝트 slug (없으면 문서만 존재) */
  projectSlug?: string
}

/**
 * 매뉴얼 한 줄 소개 — 각 `content/<slug>/index.mdx` 첫 문단 요약.
 * 제목은 `content/_meta.tsx`(Nextra 사이드바 SSOT)에서 가져오므로 여기 두지 않는다.
 */
const MANUAL_DETAILS: Record<string, Omit<Manual, 'slug' | 'title'>> = {
  csoweb: {
    description: 'B2B 제약 CSO 정산 포털 — 수수료 조회·정산서·메일머지 사용자·관리자 매뉴얼',
    projectSlug: 'csoweb',
  },
  'kpis-dsr-api': {
    description: '의약품 공급내역(갑지·을지) 가공·검증·조회 시스템 매뉴얼',
    projectSlug: 'kpis-dsr-api',
  },
  pharmkpi: {
    description: '제약 경영 KPI 대시보드 — 매출·수금·흡수율·마진 분석 매뉴얼',
    projectSlug: 'pharmkpi',
  },
  'edi-verification': {
    description: '처방통계 이미지 OCR + 위변조 탐지 + 사람 검수(HITL) 워크플로우 매뉴얼',
  },
  corerx: {
    description: 'UBIST 처방·ERP 출고·CSO 정산을 통합하는 ETL + BI 플랫폼 매뉴얼',
  },
  'ev-motor-reliability': {
    description: '전기차 구동모터·인버터 신뢰성 시험 자동화 플랫폼 매뉴얼',
    projectSlug: 'ev-motor-reliability',
  },
  'har-eval': {
    description: '증거 게이트로 도구를 만들지 도입할지 결정하는 메타 하네스 문서',
    projectSlug: 'har-eval',
  },
}

function readTitle(entry: unknown, fallback: string): string {
  if (entry && typeof entry === 'object' && 'title' in entry) {
    const { title } = entry as { title?: unknown }
    if (typeof title === 'string') return title
  }
  return fallback
}

function isDocEntry(entry: unknown): boolean {
  // `index` 는 포트폴리오로 돌아가는 외부 링크라 매뉴얼이 아니다 (href 보유).
  return !(entry && typeof entry === 'object' && 'href' in entry)
}

/** Nextra 사이드바 등록 순서를 그대로 따르는 매뉴얼 목록 */
export const MANUALS: Manual[] = Object.entries(contentMeta)
  .filter(([slug, entry]) => isDocEntry(entry) && slug in MANUAL_DETAILS)
  .map(([slug, entry]) => ({
    slug,
    title: readTitle(entry, slug),
    ...MANUAL_DETAILS[slug],
  }))
