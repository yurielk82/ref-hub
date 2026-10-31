export interface Experience {
  period: string;
  title: string;
  role: string;
  description: string;
  highlights: string[];
  projects: string[];
}

export interface SkillCategory {
  label: string;
  items: string[];
}

/** 주요 업무와 수행 범위의 원본은 data/work-history.ts. */
export const EXPERIENCES: Experience[] = [
  {
    period: "2025-03 ~ 현재",
    title: "부광유니파마(구 한국유니온제약) 영업관리팀",
    role: "과장 · 2026-08부터 영업본부 분석·기획 겸직",
    description:
      "영업관리 실무를 바탕으로 스프레드시트·엑셀에서 반복하던 자료 취합·분석·보고 업무를 개선해 왔습니다. 필요한 시스템을 직접 구축해 활용하고 있으며, 현재는 영업 활동 분석(SFE)과 유통재고 관리로 개선 범위를 넓히고 있습니다.",
    highlights: [
      "매출·수금·채권 자료 분석 및 월간 KPI·영업회의 자료 작성",
      "경영진 데일리 리포트(BI) 구축·운영: 목표 대비 실적, 품목·거래처 상세 조회, 마감 후 자료 갱신·검산",
      "SFE를 통한 영업 활동·실적 분석과 유통재고 관리 개선(진행 중)",
      "영업지원팀·회계팀·영업본부 부서별 업무 화면 구축과 엑셀 월 보고서 자동화",
      "공공 데이터 기반 시장·경쟁 분석",
      "CSO 정산 자료 조회 포털과 처방 자료 OCR 구축",
      "엑셀 수작업 공급내역보고를 웹 시스템으로 개선하고, ERP 전환 후 보고 업무 유지 및 API 연계 시스템 구축",
      "ERP 전환 전후 데이터 대조 및 영업관리·기획·전산 부서 협업",
    ],
    projects: [
      "pharmkpi",
      "pharmkpi-exec",
      "accounting-ledger",
      "monthly-sales-reports",
      "market-analysis",
      "sales-hq-sfe",
      "sales-strategy-portal",
      "csoweb",
      "kpis-dsr-api",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "영업 데이터 분석",
    items: [
      "매출·수금·채권 분석",
      "월간 KPI",
      "영업 활동 분석(SFE)",
      "보고 자료 작성",
      "시장·경쟁 분석",
    ],
  },
  {
    label: "재고 관리 개선",
    items: ["유통재고 관리", "재고 개월수", "LOT·사용기한 관리"],
  },
  {
    label: "데이터 관리·검증",
    items: [
      "ERP 자료 연계",
      "집계 기준 정리",
      "데이터 대조",
      "CSO 관련 데이터 처리",
    ],
  },
  {
    label: "업무 자동화",
    items: [
      "자료 취합·보고 자동화",
      "공급내역 검증·보정",
      "업무 시스템 구축",
      "SQL·Python·웹 개발",
    ],
  },
];
