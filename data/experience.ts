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
      "영업관리 실무를 바탕으로 영업 데이터 관리·분석과 업무 효율화를 추진하고 있습니다. 현재는 SFE·S&OP·유통재고 관리 업무를 개선하고 있으며, 필요한 시스템을 직접 구축하고 운영합니다.",
    highlights: [
      "매출·수금·채권 자료 분석 및 월간 KPI·영업회의 자료 작성",
      "SFE를 통한 영업 활동·실적 분석, S&OP 및 유통재고 관리 업무 개선",
      "CSO 관련 데이터 처리와 조회·검증 시스템 구축",
      "공급내역보고 검증·보정 시간을 약 30분에서 2~3분으로 단축",
      "ERP 전환 전후 데이터 대조 및 영업관리·기획·전산 부서 협업",
    ],
    projects: [
      "pharmkpi",
      "sales-hq-sfe",
      "sales-hq-snop",
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
    ],
  },
  {
    label: "계획·재고 관리 개선",
    items: ["판매·운영 계획(S&OP)", "유통재고 관리", "수요·공급·재고 검토"],
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
