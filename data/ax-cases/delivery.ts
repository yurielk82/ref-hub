import type { AxCaseStudy } from "../ax-types";

// 근거: data/work-history.ts, 각 프로젝트 README·git log, 사용자 확인(2026-10-26).
export const DELIVERY_CASE_STUDIES: AxCaseStudy[] = [
  {
    projectSlug: "pharmkpi",
    label: "영업 실적 취합·보고 업무 개선",
    role: "영업 자료 조회와 분석에 필요한 지표·데이터·화면을 설계하고 시스템을 구축·운영했습니다.",
    period: "2026-03 ~ 현재",
    status: {
      kind: "live",
      note: "사내 영업 데이터 시스템 운영 중",
    },
    impact: "엑셀·스프레드시트로 취합하던 영업 자료의 조회·분석·보고 개선",
    problem:
      "ERP와 엑셀에 자료가 나뉘어 있어 실적을 취합하고 집계 기준을 확인하는 작업이 필요했습니다.",
    intervention:
      "매출·수금·채권·재고 자료를 연계하고, 월간 KPI와 거래처·품목별 조회·분석 기능을 구축했습니다. ERP 전환 전후 자료도 대조했습니다.",
    outcome:
      "실적 조회와 월간 보고에 활용하고 있습니다. 분석 조건별 표·그래프와 자료 내려받기 등 업무 편의 기능을 계속 개선하고 있습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "sales-hq-sfe",
    label: "방문 기록과 매출을 연계한 영업 활동 분석(SFE)",
    role: "영업본부 분석·기획 업무로 분석 지표와 회의 자료를 구성하고 관련 기능을 구현했습니다.",
    period: "2026-09 ~ 현재",
    status: {
      kind: "live",
      note: "월간 영업회의 자료로 활용하며 개선 중",
    },
    impact: "방문 기록과 실적을 연계해 담당자·거래처별 영업 활동 분석",
    problem:
      "방문 기록과 매출·목표가 따로 관리돼 활동과 실적을 함께 검토하기 어려웠습니다.",
    intervention:
      "일보의 방문 기록을 ERP 매출·목표와 연결하고, 방문 현황·목표 달성률·핵심 거래처 관리 현황을 분석하도록 구성했습니다.",
    outcome:
      "2026년 10월 월간 영업회의에서 발표했습니다. 담당자별 거래처 관리와 활동 계획 검토에 활용하도록 개선하고 있습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "sales-hq-snop",
    label: "판매 계획·재고 검토 업무 개선(S&OP)",
    role: "판매·운영 계획 기능을 구축하고 업무 적용을 위한 개선을 진행하고 있습니다.",
    period: "2026-10 ~ 현재",
    status: {
      kind: "live",
      note: "기능 배포 후 업무 적용·검증 진행 중",
    },
    impact: "매출 예측과 수요·공급·재고 검토를 연결하는 계획 업무 개선",
    problem:
      "판매 계획을 검토하려면 실적과 수요·공급·재고 자료를 함께 확인할 수 있어야 합니다.",
    intervention:
      "매출 예측·시나리오 비교·계획 저장과 수요·공급·재고 검토 화면을 구축했습니다. 유통재고 관리 업무의 효율화도 함께 진행하고 있습니다.",
    outcome:
      "2026년 10월 기능을 배포한 뒤 실제 업무 적용과 검증을 진행하고 있습니다. 수요·공급·재고 검토와 계획 수립 과정을 계속 개선하고 있습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "sales-strategy-portal",
    label: "영업 자료 조회·보고",
    role: "업무별 조회 화면과 월말 마감 현황을 설계·구현했습니다.",
    period: "2026-03 ~ 현재",
    status: {
      kind: "live",
      note: "PharmKPI 내 영업지원 화면 운영 중",
    },
    impact: "주문·거래처·품목·재고·수금 자료를 직접 조회·분석",
    problem:
      "자료가 ERP 여러 화면에 나뉘어 있어 조회와 취합을 반복해야 했습니다.",
    intervention:
      "자료별 검색·필터·내려받기 기능을 구성하고, 월말 마감과 매출할인 반영 상태를 확인하도록 했습니다.",
    outcome:
      "영업 자료 조회와 회계 제출용 실매출 확인에 활용하고 있습니다. 월간 KPI와 자유분석 기능을 개선하고 있습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "pharmkpi-exec",
    label: "경영 보고 자료 조회",
    role: "경영 보고에 필요한 지표를 정리하고 태블릿용 조회 화면을 구축했습니다.",
    period: "2026-06 ~ 2026-07",
    status: {
      kind: "evolved",
      note: "2026년 7월 경영진용 BI로 이관",
    },
    impact: "매출·수금·채권 현황을 태블릿에서 조회",
    problem:
      "경영진이 정기 보고 자료를 태블릿에서 확인할 수 있는 화면이 필요했습니다.",
    intervention:
      "매출·수금·채권 조회 화면을 구성하고, 확인 가능한 자료를 기준으로 보고 항목을 정리했습니다.",
    outcome:
      "태블릿용 화면을 구축한 뒤 별도 경영진용 BI로 이관했습니다. 이관한 시스템에서 보고·분석 기능을 개선하고 있습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "kpis-dsr-api",
    label: "공급내역보고 자동화·업무 대응",
    role: "영업관리 실무를 바탕으로 엑셀·웹 자동화와 데이터 검증·보정, API 보고 연계 시스템을 구축했습니다.",
    period: "2025 ~ 현재",
    status: {
      kind: "live",
      note: "공급내역보고에 활용 중 · API 연계 구축, 운영 전송 검증 별도 확인 필요",
    },
    impact: "엑셀 수작업의 단계적 자동화와 ERP 전환 후 보고 업무 유지",
    problem:
      "입사 당시 공급내역보고를 엑셀로 수작업했습니다. 이후 ERP와 보고 프로그램이 함께 바뀐 뒤 새 프로그램 오류가 3개월 이상 지속됐습니다.",
    intervention:
      "최초에는 엑셀 수작업을 자동화하고 웹 시스템으로 발전시켰습니다. ERP 전환 후에는 자체 시스템으로 보고 업무를 이어갔고, 이후 API 연계 시스템을 구축했습니다.",
    outcome:
      "반복 작업을 자동화하고 ERP 전환기에도 보고 업무를 이어갔습니다. 물류 마감 후 갑지·을지 다운로드와 API 보고를 연결하고, 다음 날 아침 오류·특이사항을 확인하는 절차를 구성했습니다.",
    steps: [
      {
        phase: "최초 업무 개선",
        title: "엑셀 수작업에서 웹 시스템으로",
        body: "입사 당시 엑셀로 수작업하던 공급내역보고를 엑셀 자동화로 개선하고, 이후 웹 기반 시스템으로 발전시켜 반복되는 자료 검증·보정 작업을 자동화했습니다.",
      },
      {
        phase: "ERP 전환 후 대응",
        title: "오류 장기화 중 보고 업무 유지·API 연계",
        body: "ERP와 공급내역보고 프로그램 교체 후 새 프로그램 오류가 3개월 이상 지속됐습니다. 자체 시스템으로 보고 업무를 이어갔고, 이후 보고 API를 연계한 시스템을 구축했습니다.",
      },
      {
        phase: "업무 흐름",
        title: "물류 마감부터 API 보고까지",
        body: "물류 마감 → 바코드 서버 접속 및 갑지·을지 다운로드 → API 공급내역보고",
      },
      {
        phase: "아침 확인",
        title: "의약품 공급내역보고 오류·특이사항 확인",
        body: "다음 날 아침에는 전날 의약품 공급내역보고의 오류와 특이사항을 확인했습니다.",
      },
    ],
    disclosure: "public",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "csoweb",
    label: "CSO 데이터 처리·검증",
    role: "CSO 관련 데이터 처리와 시스템 구축을 수행했습니다.",
    period: "2026 ~ 2026-09",
    status: {
      kind: "retired",
      note: "상용 솔루션 도입에 따라 2026년 9월 자체 포털 운영 종료",
    },
    impact: "CSO 관련 데이터 조회와 처방통계 자료 검증을 지원",
    problem:
      "정산 자료 조회·발송과 처방통계 자료 확인에 반복 작업이 있었습니다.",
    intervention:
      "정산 자료와 업체 정보를 연결하는 조회 포털을 구축하고, 이미지·PDF 자료 추출 및 불일치·의심 자료 확인 기능을 구현했습니다.",
    outcome:
      "CSO 관련 자료를 조회하고 검증하는 시스템을 구축했습니다. 자체 포털은 상용 솔루션 도입에 따라 운영을 종료했습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
  {
    projectSlug: "erp-spec",
    label: "ERP 데이터 구조 파악",
    role: "ERP 테이블과 조회 구조를 분석하고 참고 문서를 구축했습니다.",
    period: "2026-03 ~ 2026-04",
    status: {
      kind: "live",
      note: "기존 ERP 구조와 자료 확인을 위한 참고 문서",
    },
    impact: "영업 자료 조회·검증에 필요한 ERP 구조 문서화",
    problem:
      "영업 자료가 어느 테이블에서 어떤 기준으로 생성되는지 파악할 자료가 필요했습니다.",
    intervention:
      "테이블·프로시저·코드 관계를 정리하고, 공급내역보고 등 실제 업무 자료의 조회 구조를 분석했습니다.",
    outcome:
      "ERP 데이터 구조를 확인할 수 있는 문서를 구축했습니다. 구 ERP 자료 분석과 전환 이력을 확인하는 참고 자료로 남겼습니다.",
    disclosure: "withheld",
    evidenceLabel: "사례 상세",
  },
];
