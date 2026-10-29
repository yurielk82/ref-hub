import type {
  AxGrounding,
  AxMethodStep,
  AxPillar,
  AxStackGroup,
  HeroContent,
  WorkMethodStep,
} from "./ax-types";

/**
 * 포트폴리오 문안. 두 트랙이 같은 사실(data/work-history.ts·사례 등록부)을 다른 관점으로 보여 준다.
 * - 영업관리 트랙(/): AX_HERO — 제약사 영업관리팀 지원용
 * - AX 트랙(/ax): AX_TRACK_HERO 이하 — 업무 자동화·AX 직무 지원용
 */

export const AX_HERO = {
  name: "권대환",
  role: "제약 영업관리 · 데이터 분석 · 업무 효율화",
  jobTitle: "영업관리팀 과장 · 영업본부 분석·기획 겸직",
  employer: "부광유니파마",
  title:
    "영업관리 실무를 바탕으로, 엑셀 중심의 자료 관리·분석·보고 업무를 개선해 왔습니다.",
  subhead:
    "제약회사 영업관리팀에서 근무하며 영업본부 분석·기획 업무를 겸하고 있습니다. 스프레드시트와 엑셀로 취합·관리하던 영업 자료의 조회·분석·보고 방식을 개선해 왔습니다.",
  summary:
    "실무에서 반복되는 작업과 확인이 필요한 항목을 파악하고, 필요한 시스템을 직접 구축해 업무에 활용했습니다. 현재는 영업 활동·실적 분석(SFE), 판매·운영 계획(S&OP), 유통재고 관리로 개선 범위를 넓히고 있습니다. 직접 만든 시스템이 개인 도구로 끝나지 않도록, 경영진 지원 아래 전산팀과 사내 서버 이전에 합의했습니다. 경영진용 BI 이관에 이어 회사 운영 체계로 옮기는 과정을 협의하고 있습니다.",
  evidenceTitle: "주요 역량",
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
      label: "엑셀·스프레드시트 업무 개선",
      text: "자료를 취합하고 대조하던 반복 작업을 조회·검증·보고 기능으로 개선합니다.",
    },
    {
      label: "데이터 점검·부서 협업",
      text: "ERP 자료와 집계 기준을 점검하고 관련 부서와 필요한 항목을 협의합니다.",
    },
  ],
} satisfies HeroContent & { jobTitle: string; employer: string };

/**
 * 영업관리 트랙 일하는 방식. AX 트랙의 AX_METHOD를 복사하지 않고, 절차를 세우고 정착시키는 관점으로 쓴다.
 * 사례 문구는 data/work-history.ts에 이미 실린 사실만 쓴다.
 */
export const SALES_METHOD: WorkMethodStep[] = [
  {
    title: "반복 업무와 확인 지점 파악",
    description:
      "자료를 누가 어떤 순서로 취합·확인하는지 살펴보고, 시간이 많이 드는 반복 작업과 실수가 생기는 지점을 찾습니다.",
    example: "엑셀로 수작업하던 공급내역보고와 영업 실적 취합",
  },
  {
    title: "처리 기준 정리와 부서 협의",
    description:
      "집계 기준과 처리 순서를 정리하고, 관련 부서와 필요한 데이터 항목과 보고 기준을 맞춥니다.",
    example:
      "ERP 전환 때 영업관리·기획·전산 부서와 매출·수금·채권 집계 기준 협의",
  },
  {
    title: "반복 작업은 시스템으로, 판단은 담당자에게",
    description:
      "취합·대조·보고처럼 반복되는 일은 시스템이 처리하고, 판단이 필요한 항목만 담당자가 확인하도록 나눕니다.",
    example: "자동 검증 뒤 불일치·의심 자료만 담당자가 확인",
  },
  {
    title: "업무 절차와 문서로 정착",
    description:
      "처리 순서와 확인 시점을 업무 절차로 정하고, 다른 담당자도 이어 쓸 수 있도록 운영 문서를 남깁니다.",
    example:
      "공급내역보고: 물류 마감 → 자료 수집 → API 보고 → 다음 날 아침 오류 확인",
  },
];

/** 영업관리 트랙에서 바로 여는 운영 문서 — 운영 중인 시스템만 둔다 */
export const SALES_MANUAL_SLUGS = ["pharmkpi", "kpis-dsr-api"] as const;

/** 공개 주소 — metadataBase·구조화 데이터가 같은 값을 쓴다. */
export const SITE_URL = "https://ref.dvsharp.com";

/** 연락처 단일 출처 — 히어로·연락 섹션이 같은 값을 쓴다. */
export const AX_CONTACT = {
  email: "yurielk82@gmail.com",
  github: "https://github.com/yurielk82",
};

// ── AX 트랙(/ax) ────────────────────────────────────────────────────────────
// 근거: data/work-history.ts(사용자 확인 2026-10-26), 사례 등록부, 각 저장소 README·git log.

export const AX_TRACK_HERO: HeroContent = {
  name: AX_HERO.name,
  role: "업무 자동화 · 데이터 플랫폼 구축 · AX",
  title: "현업의 반복 업무를 데이터와 자동화로 바꾸고, 운영까지 맡아 왔습니다.",
  subhead:
    "제약회사 영업관리팀에서 일하며 영업 데이터 플랫폼, 법정 보고 자동화, 문서 검증 시스템을 직접 기획·구축·운영했습니다. 업무를 아는 사람이 직접 만들어 현장에서 실제로 쓰이는 형태까지 가져갑니다.",
  summary:
    "Claude Code·Codex 같은 AI 코딩 에이전트를 규칙·검증·배포 절차로 묶은 작업 환경을 만들어, 혼자서도 여러 사내 시스템을 개발하고 운영합니다. 숫자는 원본 자료와 대조해 확정하고, AI에는 설명과 반복 작업을 맡깁니다.",
  evidenceTitle: "확인된 결과",
  evidence: [
    {
      label: "ERP 전환 데이터 대조",
      text: "구 ERP 원장을 월·전표 기준 806개 그룹으로 대조해 차이 없이 새 원천으로 옮겼습니다.",
    },
    {
      label: "법정 보고 유지",
      text: "ERP 전환 뒤 보고 프로그램 오류가 3개월 넘게 이어지는 동안 자체 시스템으로 보고를 이어갔습니다.",
    },
    {
      label: "구조 파악 자동화",
      text: "문서·외래키가 없던 ERP 785개 테이블에서 648개(82.5%)의 관계를 추론해 이관 자료로 만들었습니다.",
    },
    {
      label: "검수 범위 축소",
      text: "처방통계 이미지 위변조를 네 가지 기법으로 1차 선별해, 사람은 의심 건만 확인하게 했습니다.",
    },
  ],
};

/** AX 트랙 대표 사례 — 회사 업무 중 자동화·데이터 통합이 드러나는 순서 */
export const AX_TRACK_CASE_SLUGS = [
  "pharmkpi",
  "kpis-dsr-api",
  "sales-hq-sfe",
  "csoweb",
  "erp-spec",
  "sales-hq-snop",
] as const;

export const AX_PILLARS: AxPillar[] = [
  {
    label: "진단",
    title: "업무 진단",
    description:
      "반복 입력, 자료 대조, 승인 대기처럼 시간이 새는 지점을 먼저 찾습니다. 자동화보다 기준 정리가 먼저인 경우가 많습니다.",
  },
  {
    label: "데이터",
    title: "데이터·ERP 통합",
    description:
      "ERP 조회 자료, 업무 시트, 공공 데이터를 한 저장소로 모으고, 같은 지표는 같은 기준으로 계산하게 합니다.",
  },
  {
    label: "자동화",
    title: "자동화·AI 활용",
    description:
      "검증 규칙과 OCR로 반복 판단을 줄이고, AI 코딩 에이전트로 구현 속도를 높입니다. AI는 확정된 수치의 설명과 요약에 씁니다.",
  },
  {
    label: "운영",
    title: "운영·검증 체계",
    description:
      "사람이 최종 확인하는 지점, 변경 기록, 운영 문서를 함께 만들어 시스템이 현업에서 계속 쓰이게 합니다.",
  },
];

export const AX_GROUNDING: AxGrounding = {
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
    items: ["ERP 조회 인터페이스", "SQL", "Python", "공공 데이터 API"],
  },
  {
    label: "업무 시스템",
    items: ["Next.js", "React", "TypeScript", "FastAPI"],
  },
  {
    label: "데이터 저장·관리",
    items: ["PostgreSQL", "Supabase", "MSSQL", "Prisma"],
  },
  {
    label: "자동화·AI",
    items: ["Claude Code·Codex", "문서 인식(OCR)", "검증 규칙", "예약 작업"],
  },
  {
    label: "운영",
    items: ["자체 서버(OCI)", "CloudFront", "CircleCI", "Sentry"],
  },
];
