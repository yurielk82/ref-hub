export const PORTFOLIO_MENUS = {
  pharmkpi: [
    {
      id: "kpi",
      name: "KPI",
      description:
        "매출·수금·채권·할인율·재고·반품의 기준월 실적과 원천 자료를 대조합니다.",
      items: [
        "종합 현황",
        "월간 KPI",
        "매출",
        "수금",
        "채권",
        "할인율",
        "재고",
        "반품",
        "자유분석",
        "데이터 대조",
      ],
      sources: [
        "/images/portfolio/pharmkpi/overview.webp",
        "/images/portfolio/pharmkpi/sales-causes.webp",
        "/images/portfolio/pharmkpi/sales-comparison.webp",
        "/images/portfolio/pharmkpi/verification.webp",
      ],
    },
    {
      id: "reports",
      name: "영업리포트",
      description:
        "매월 반복하던 취합 양식을 화면 조회와 보고서 생성으로 연결했습니다.",
      items: [
        "피벗 분석",
        "판매·수금 요약",
        "브랜드·품목 매출",
        "담당자·유통별 월평균",
        "주요품목 매출",
        "거래처 방문준비",
        "분기별 실적",
      ],
      sources: [
        "/images/portfolio/monthly-sales-reports/sales-collection.webp",
        "/images/portfolio/monthly-sales-reports/brand-sku.webp",
        "/images/portfolio/monthly-sales-reports/rep-channel.webp",
      ],
    },
    {
      id: "sales-hq",
      name: "영업본부",
      description:
        "월간 KPI와 SFE 발표·분석 화면을 영업본부 업무 순서에 맞게 모은 메뉴입니다. 같은 기능을 별도 실적으로 중복하지 않습니다.",
      items: ["월간 KPI", "SFE 발표 자료", "SFE 분석"],
      sources: [],
    },
    {
      id: "support",
      name: "영업지원팀",
      description:
        "주문·수금·채권·재고와 마감 상태를 한곳에서 조회하도록 만들었습니다.",
      items: [
        "주문 내역",
        "수금 내역",
        "재고 현황",
        "마감 현황",
        "채권 조회",
        "거래처 원장",
        "수금조정",
        "휴폐업 조회",
        "기초 마스터",
      ],
      sources: [
        "/images/portfolio/sales-strategy-portal/home.webp",
        "/images/portfolio/sales-strategy-portal/home-donut.webp",
        "/images/portfolio/sales-strategy-portal/home-workflow.webp",
        "/images/portfolio/sales-strategy-portal/orders.webp",
        "/images/portfolio/sales-strategy-portal/credit-query.webp",
        "/images/portfolio/sales-strategy-portal/inventory-lot.webp",
        "/images/portfolio/sales-strategy-portal/accounting.webp",
      ],
    },
    {
      id: "accounting",
      name: "회계팀",
      description:
        "회계 보조원장 형식을 구현하고 월말 채권 차이를 수금조정 내역으로 연결했습니다.",
      items: ["회계팀 홈", "거래처 원장", "수금조정 내역", "휴폐업 조회"],
      sources: [
        "/images/portfolio/accounting-ledger/accounting-home.webp",
        "/images/portfolio/accounting-ledger/customer-ledger.webp",
        "/images/portfolio/accounting-ledger/collection-adjustments.webp",
        "/images/portfolio/accounting-ledger/business-status.webp",
      ],
    },
    {
      id: "market",
      name: "시장",
      description:
        "공공 자료와 처방·판매 자료를 연결해 시장과 경쟁 제품을 비교합니다.",
      items: [
        "시장 포트폴리오",
        "처방 동향",
        "대조약·경쟁제품",
        "주력품목 시장",
        "전국 시장",
        "생산실적",
        "판매 지도",
      ],
      sources: [
        "/images/portfolio/market-analysis/portfolio.webp",
        "/images/portfolio/market-analysis/competition.webp",
        "/images/portfolio/market-analysis/national.webp",
      ],
    },
    {
      id: "sfe",
      name: "SFE",
      description:
        "영업 활동량·방문 빈도·거래처 가치·방문 성과를 함께 분석합니다.",
      items: [
        "홈",
        "발표 자료",
        "담당자 종합",
        "활동 현황",
        "커버리지·방문 빈도",
        "등급·타겟팅",
        "노력-가치 사분면",
        "방문 성과",
      ],
      sources: [
        "/images/portfolio/sales-hq-sfe/effort-value-quadrant.webp",
        "/images/portfolio/sales-hq-sfe/summary.webp",
        "/images/portfolio/sales-hq-sfe/grade-targeting.webp",
        "/images/portfolio/sales-hq-sfe/visit-productivity.webp",
        "/images/portfolio/sales-hq-sfe/metric-guide.webp",
      ],
    },
    {
      id: "snop",
      name: "S&OP",
      description:
        "별도 저장소 pharmkpi-SnOP를 KPI에 내장한 개인 시제품입니다. 수요·공급·재고 검토를 연결하며, 실제 업무 도입·예측 성능 검증과는 구분합니다.",
      items: [
        "이번 달 S&OP",
        "자료 마감",
        "수요 검토",
        "공급·재고 검토",
        "통합 조정",
        "경영 승인",
        "예측 모델 실험실",
      ],
      sources: [
        "/images/portfolio/sales-hq-snop/monthly-overview.webp",
        "/images/portfolio/sales-hq-snop/demand-review.webp",
        "/images/portfolio/sales-hq-snop/supply-inventory.webp",
        "/images/portfolio/sales-hq-snop/forecast-lab.webp",
        "/images/portfolio/sales-hq-snop/finance-reconcile.webp",
        "/images/portfolio/sales-hq-snop/data-close.webp",
      ],
    },
    {
      id: "kpis",
      name: "KPIS",
      description:
        "별도 공급내역보고 시스템과 연결된 KPI 내부 조회·대조 메뉴입니다. 아래 이미지는 별도 공급내역보고 앱의 공개용 캡처로, KPI 내장 메뉴의 실제 화면과는 구분합니다.",
      items: [
        "홈",
        "보고 작업",
        "주문·KPIS 대조",
        "갑지·을지 조회",
        "보고 흐름",
        "공급내역 사이트 연결",
      ],
      sources: [
        "/images/portfolio/kpis-dsr-api/report-flow.webp",
        "/images/portfolio/kpis-dsr-api/order-check.webp",
        "/images/portfolio/kpis-dsr-api/kpis-home.webp",
        "/images/portfolio/kpis-dsr-api/report-work.webp",
        "/images/portfolio/kpis-dsr-api/supply-lines.webp",
      ],
    },
    {
      id: "raw",
      name: "원본 자료",
      description:
        "ERP 원본과 공공 API 수집 현황을 확인하는 관리자 메뉴입니다.",
      items: ["데이터 갱신 현황", "ERP 원본 13종", "공공 API 수집·원본"],
      sources: [],
    },
    {
      id: "admin",
      name: "관리자 설정",
      description: "입력 기준·연결 데이터·사용자·메뉴·연동 설정을 관리합니다.",
      items: [
        "운영 현황",
        "입력 규칙",
        "SFE 관리",
        "사용자·메뉴 순서",
        "연동 설정",
      ],
      sources: ["/images/portfolio/pharmkpi/data-architecture.webp"],
    },
  ],
  "pharmkpi-exec": [
    {
      id: "daily",
      name: "데일리 리포트",
      description:
        "검수 환경 bin의 공개용 화면입니다. 일부 전망·확장 기능은 운영 환경과 다릅니다.",
      items: [],
      sources: ["/images/portfolio/pharmkpi-exec/bin-daily.webp"],
    },
    {
      id: "composition",
      name: "판매 구성",
      description:
        "사업 구조·제품 특성·생산 구분을 나눠 무엇이 매출을 구성하는지 확인합니다.",
      items: [],
      sources: [
        "/images/portfolio/pharmkpi-exec/bin-composition-business.webp",
        "/images/portfolio/pharmkpi-exec/bin-composition-product.webp",
        "/images/portfolio/pharmkpi-exec/bin-composition-production.webp",
      ],
    },
    {
      id: "detail",
      name: "상세 조회",
      description:
        "판매 추이, 품목별 거래처·담당자, 수금과 채권을 각각 더 깊게 조회합니다.",
      items: [],
      sources: [
        "/images/portfolio/pharmkpi-exec/bin-sales-detail.webp",
        "/images/portfolio/pharmkpi-exec/bin-item-detail.webp",
        "/images/portfolio/pharmkpi-exec/bin-collection-detail.webp",
        "/images/portfolio/pharmkpi-exec/bin-receivables-detail.webp",
      ],
    },
  ],
} as const;
