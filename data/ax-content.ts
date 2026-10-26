import type {
  AxGrounding,
  AxMethodStep,
  AxPillar,
  AxStackGroup,
} from "./ax-types";

export const AX_HERO = {
  name: "권대환",
  role: "제약 영업관리 · 데이터 분석 · 업무 효율화",
  jobTitle: "영업관리팀 과장 · 영업본부 분석·기획 겸직",
  employer: "부광유니파마",
  title: "영업 데이터 분석과 업무 개선으로 영업관리의 효율을 높이고 있습니다.",
  subhead:
    "제약회사 영업관리팀에서 근무하며 영업본부 분석·기획 업무를 겸하고 있습니다. 현재는 영업 활동·실적 분석(SFE), 판매·운영 계획(S&OP), 유통재고 관리 업무를 개선하고 있습니다.",
  summary:
    "매출·수금·채권 등 영업 데이터를 정리·분석하고, 반복되는 자료 취합과 보고 작업을 개선해 왔습니다. 필요한 시스템을 직접 구축하고 운영하며, CSO 관련 업무에서는 데이터 처리와 시스템 구축을 수행했습니다.",
  evidence: [
    {
      label: "영업 데이터 분석",
      text: "매출·수금·채권 자료를 분석하고 월간 KPI와 영업회의 자료를 작성합니다.",
    },
    {
      label: "현재 진행 중인 개선",
      text: "SFE·S&OP·유통재고 관리 업무의 효율화를 추진하고 있습니다.",
    },
    {
      label: "업무 자동화",
      text: "자료 취합·검증·보고의 반복 작업을 줄이는 시스템을 직접 구축합니다.",
    },
    {
      label: "데이터 점검·부서 협업",
      text: "ERP 자료와 집계 기준을 점검하고 관련 부서와 필요한 항목을 협의합니다.",
    },
  ],
};

/** 공개 주소 — metadataBase·구조화 데이터가 같은 값을 쓴다. */
export const SITE_URL = "https://ref.dvsharp.com";

/** 연락처 단일 출처 — 히어로·연락 섹션이 같은 값을 쓴다. */
export const AX_CONTACT = {
  email: "ssmtransite@gmail.com",
  linkedin: "https://www.linkedin.com/in/yurielk82",
  github: "https://github.com/yurielk82",
};

export const AX_PILLARS: AxPillar[] = [
  {
    label: "분석",
    title: "영업 실적 분석",
    description:
      "매출·수금·채권과 영업 활동 자료를 연결해 실적 현황과 관리가 필요한 항목을 확인합니다.",
  },
  {
    label: "계획",
    title: "계획·재고 관리",
    description:
      "S&OP와 유통재고 관리에 필요한 자료와 절차를 정리하고 개선합니다.",
  },
  {
    label: "자동화",
    title: "반복 업무 개선",
    description:
      "자료 취합·검증·보고 작업을 시스템으로 처리해 수작업을 줄입니다.",
  },
  {
    label: "협업",
    title: "기준 정리·부서 협업",
    description:
      "ERP 자료와 보고 수치의 기준을 점검하고 영업관리·기획·전산 부서와 협의합니다.",
  },
];

export const FEATURED_CASE_SLUGS = [
  "pharmkpi",
  "sales-hq-sfe",
  "sales-hq-snop",
  "csoweb",
  "kpis-dsr-api",
  "sales-strategy-portal",
  "pharmkpi-exec",
] as const;

export const AX_GROUNDING: AxGrounding = {
  eyebrow: "자료 검증",
  title: "원본 자료와 계산 기준을 확인합니다",
  summary:
    "같은 매출도 기간·대상·반품·매출할인 반영 여부에 따라 달라집니다. 원본 자료와 집계 기준을 확인하고, AI는 확정된 수치의 설명과 요약에 활용합니다.",
  examples: [
    {
      label: "수치 확인",
      text: "매출·수금·채권은 원본 자료와 대조합니다. 실제 0과 자료 누락을 구분하고, 확인되지 않은 값은 확정된 수치로 제시하지 않습니다.",
    },
    {
      label: "검토와 판단",
      text: "자동 검증에서 불일치가 확인되면 담당자가 원본을 확인하도록 합니다. AI 설명은 업무 판단을 보조하는 자료로 활용합니다.",
    },
  ],
  spreadLead:
    "자료의 출처와 계산 기준, 수정 내역을 확인할 수 있도록 시스템과 문서에 남깁니다.",
  spreadTags: ["원본 대조", "집계 기준", "검증 내역", "담당자 확인"],
};

export const AX_METHOD: AxMethodStep[] = [
  {
    title: "업무와 반복 작업 파악",
    description:
      "자료를 누가 취합하고 어떤 기준으로 확인하는지 살펴본 뒤 개선할 작업을 정합니다.",
  },
  {
    title: "자료와 집계 기준 정리",
    description:
      "ERP와 업무 자료의 출처를 확인하고 기간·대상·단위 등 집계 기준을 정리합니다.",
  },
  {
    title: "조회·검증·보고 기능 구축",
    description:
      "반복되는 자료 취합과 확인 작업을 시스템으로 처리하고, 분석 결과를 업무에 활용하도록 구성합니다.",
  },
  {
    title: "담당자 확인과 업무 적용",
    description:
      "자동으로 처리하기 어려운 항목은 담당자가 확인하도록 하고, 실제 업무에서 필요한 부분을 조정합니다.",
  },
  {
    title: "적용 결과 확인·개선",
    description:
      "완료된 성과와 진행 중인 개선을 구분하고, 사용 과정에서 확인한 문제를 반영합니다.",
  },
];

export const AX_STACK: AxStackGroup[] = [
  {
    label: "자료 연계·분석",
    items: ["ERP 조회 자료", "SQL", "Python", "공공 데이터 API"],
  },
  {
    label: "업무 시스템 구축",
    items: ["Next.js", "React", "TypeScript", "FastAPI"],
  },
  {
    label: "데이터 저장·관리",
    items: ["PostgreSQL", "Supabase", "MSSQL", "Prisma"],
  },
  {
    label: "자동화·운영",
    items: ["문서 인식(OCR)", "AI 요약", "데이터 검증", "운영 문서"],
  },
];
