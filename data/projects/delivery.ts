import type { Project } from "../project-types";

// 회사 업무 사례. 개인·외부 프로젝트의 기존 상세 주소는 보존한다.
export const DELIVERY_PROJECTS: Project[] = [
  {
    slug: "pharmkpi",
    name: "영업 실적 취합·보고 업무 개선",
    tagline: "엑셀·스프레드시트로 취합하던 영업 자료의 조회·분석·보고 개선",
    description:
      "매출·수금·채권·재고 자료를 연계하고, 월간 KPI와 거래처·품목별 조회·분석 기능을 구축했습니다. ERP 전환 전후 자료도 대조했습니다. 사내 영업 데이터 시스템 운영 중.",
    category: "web",
    scope: "company",
    liveUrl: "https://kpi.dvsharp.com",
    docsPath: "/pharmkpi",
    screenshot: "/images/portfolio/pharmkpi/overview.webp",
    screensNote:
      "공개용 화면이라 거래처·사람 이름·사업자번호는 가짜 값으로, 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/pharmkpi/overview.webp",
        title: "종합 현황",
        caption:
          "기준월의 매출·수금·채권 잔고·할인율·재고·반품 대표 지표와 전사 매출 월별 추세를 한 화면에서 확인합니다.",
      },
      {
        src: "/images/portfolio/pharmkpi/sales-causes.webp",
        title: "매출 증감 원인",
        caption:
          "전년 같은 달 대비 매출 증감을 품목·거래처·팀 등 기준별 기여도로 나눠 폭포 차트로 보여 줍니다. 당월과 당년 누계를 바꿔 볼 수 있습니다.",
      },
      {
        src: "/images/portfolio/pharmkpi/sales-comparison.webp",
        title: "매출 목표·기간 비교",
        caption: "매출 실적을 입력 목표, 전년 같은 기간과 나란히 비교합니다.",
      },
      {
        src: "/images/portfolio/pharmkpi/verification.webp",
        title: "데이터 대조",
        caption:
          "지표별·월별로 원본 자료와 집계 값의 대조 상태를 표시해 일치 여부와 확인이 필요한 달을 구분합니다.",
      },
      {
        src: "/images/portfolio/pharmkpi/data-architecture.webp",
        title: "데이터 구조도",
        caption:
          "원천 수집부터 검증·반영, 저장 계층, 조회 화면까지 운영 중인 데이터 흐름을 한 장으로 보여 줍니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "ERP 자료 연계와 매출·수금·채권·재고 통합 조회",
      "월간 KPI, 거래처·품목별 분석 및 자료 내려받기",
      "기준월·비교 기간·대상 조건별 표와 그래프",
      "원본 자료 대조와 매출·반품·매출할인 집계 기준 관리",
    ],
    highlight: "엑셀·스프레드시트로 취합하던 영업 자료의 조회·분석·보고 개선",
    year: "2026",
    tech: ["Next.js 16", "Prisma 7", "Supabase", "Anthropic SDK", "Recharts"],
  },
  {
    slug: "sales-hq-sfe",
    name: "방문 기록과 매출을 연계한 영업 활동 분석(SFE)",
    tagline: "방문 기록과 실적을 연계해 담당자·거래처별 영업 활동 분석",
    description:
      "일보의 방문 기록을 ERP 매출·목표와 연결하고, 방문 현황·목표 달성률·핵심 거래처 관리 현황을 분석하도록 구성했습니다. 월간 영업회의 자료로 활용하며 개선 중.",
    category: "web",
    scope: "company",
    screenshot: "/images/portfolio/sales-hq-sfe/effort-value-quadrant.webp",
    screensNote:
      "공개용 화면이라 거래처·담당자 이름은 가짜 값으로, 금액은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/sales-hq-sfe/effort-value-quadrant.webp",
        title: "노력-가치 사분면",
        caption:
          "도매상마다 한 달 평균 방문 횟수와 실매출을 한 점으로 올리고 중위수 선으로 네 칸을 나눕니다. 매출은 큰데 방문이 적은 곳과 자주 가는데 매출이 작은 곳을 찾아 방문 시간 배분을 바꿀 후보로 봅니다.",
      },
      {
        src: "/images/portfolio/sales-hq-sfe/summary.webp",
        title: "SFE 요약",
        caption:
          "실매출 세 기간과 활동·도달·성과 계층별 핵심 지표를 한 화면에 모읍니다. 카드마다 해당 분석 메뉴로 이어져 '얼마나 다녔나 → 맞는 곳을 다녔나 → 다닌 만큼 나왔나' 순서로 따라가며 봅니다.",
      },
      {
        src: "/images/portfolio/sales-hq-sfe/grade-targeting.webp",
        title: "거래처 등급·타겟팅",
        caption:
          "도매상을 12개월 매출 순으로 A·B·C 등급과 매출 순위 구간으로 나누고, 등급별 매출 비중과 최근 3개월 방문 비중을 나란히 놓습니다. 방문이 등급에 맞게 배분되는지 확인합니다.",
      },
      {
        src: "/images/portfolio/sales-hq-sfe/visit-productivity.webp",
        title: "방문 성과",
        caption:
          "방문이 주문으로 이어진 비율과 방문 없을 때의 주문률, 주문당 품목 수를 월별로 비교합니다. 방문 뒤 첫 주문까지 걸린 영업일 분포로 방문의 몫을 따로 읽습니다.",
      },
      {
        src: "/images/portfolio/sales-hq-sfe/metric-guide.webp",
        title: "SFE 분석 안내",
        caption:
          "제약 SFE 3계층(활동 → 중간 → 성과)에 도매 채널 지표를 더한 분석 메뉴의 읽는 법과 공통 기준을 정리한 안내 화면입니다. 메뉴별 질문·그림·공식을 처음 보는 사람도 따라 읽을 수 있게 둡니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "방문 기록과 거래처·매출·목표 연계",
      "방문 현황·목표 달성률·핵심 거래처 관리 현황 분석",
      "담당자별 활동 계획 검토와 월간 영업회의 자료 작성",
    ],
    highlight: "방문 기록과 실적을 연계해 담당자·거래처별 영업 활동 분석",
    year: "2026",
    tech: [
      "Next.js 16",
      "Prisma 7",
      "Supabase",
      "Google Sheets API",
      "reveal.js",
    ],
  },
  {
    slug: "sales-hq-snop",
    name: "판매 계획·재고 검토 업무 개선(S&OP)",
    tagline: "매출 예측과 수요·공급·재고 검토를 연결하는 계획 업무 개선",
    description:
      "매출 예측·시나리오 비교·계획 저장과 수요·공급·재고 검토 화면을 구축했습니다. 유통재고 관리 업무의 효율화도 함께 진행하고 있습니다. 기능 배포 후 업무 적용·검증 진행 중.",
    category: "web",
    scope: "company",
    screenshot: "/images/portfolio/sales-hq-snop/monthly-overview.webp",
    screensNote:
      "공개용 화면이라 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/sales-hq-snop/monthly-overview.webp",
        title: "이번 달 S&OP",
        caption:
          "월간 계획 주기 다섯 단계(자료 마감 → 수요 → 공급·재고 → 통합 조정 → 경영 승인)의 진행과 기한을 보여 줍니다. 이번 단계에서 할 일과 금액이 가장 큰 예외 품목을 먼저 띄웁니다.",
      },
      {
        src: "/images/portfolio/sales-hq-snop/demand-review.webp",
        title: "수요 검토",
        caption:
          "월별 도매 매출 실적과 기준 예측을 한 차트에 이어 보고, 지난달 예측 오차(WAPE)와 편향, 오차가 큰 품목을 확인합니다. 실적과 기준 예측은 보존하고 영업 조정만 계획 버전에 더합니다.",
      },
      {
        src: "/images/portfolio/sales-hq-snop/supply-inventory.webp",
        title: "공급·재고 검토",
        caption:
          "3개월 안에 부족이 예상되는 품목을 부족 금액 순으로 보여 주고, 품목별 예상 재고를 안전재고 선과 함께 월말 기준으로 그립니다. 입고 예정은 담당자 입력으로 받습니다.",
      },
      {
        src: "/images/portfolio/sales-hq-snop/forecast-lab.webp",
        title: "예측 모델 실험실",
        caption:
          "예측 기간·모델·학습 구간을 골라 기준 예측을 계산하고, 성장률·수량·가격 가정으로 영업 조정을 해 봅니다. 월 매출 수준이 크게 바뀐 시점을 알려 주며, 새 계획의 기본 모델은 과거 평가에서 고른 지수평활 자동 모형(AutoETS)입니다.",
      },
      {
        src: "/images/portfolio/sales-hq-snop/finance-reconcile.webp",
        title: "통합 조정",
        caption:
          "월별 매출과 수금(부가세 포함)을 함께 보고 저장된 계획 버전을 최근 실적과 비교합니다. 경영 승인에 올릴 안건을 정리하는 단계입니다.",
      },
      {
        src: "/images/portfolio/sales-hq-snop/data-close.webp",
        title: "자료 마감 확인",
        caption:
          "지난달 판매 마감, 수금 반영, 현재 로트 재고가 모두 들어왔는지 확인하는 첫 단계입니다. 세 자료가 통과해야 수요 검토로 넘어갑니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "매출 예측·가정별 시나리오 비교 및 계획 저장",
      "수요 검토와 공급·재고 검토 화면",
      "계획 조정·승인 절차와 자료 준비 상태 확인",
    ],
    highlight: "매출 예측과 수요·공급·재고 검토를 연결하는 계획 업무 개선",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    slug: "sales-strategy-portal",
    name: "영업 자료 조회·보고",
    tagline: "주문·거래처·품목·재고·수금 자료를 직접 조회·분석",
    description:
      "자료별 검색·필터·내려받기 기능을 구성하고, 월말 마감과 매출할인 반영 상태를 확인하도록 했습니다. PharmKPI 내 영업지원 화면 운영 중.",
    category: "web",
    scope: "company",
    docsPath: "/pharmkpi",
    screenshot: "/images/portfolio/sales-strategy-portal/orders.webp",
    screensNote:
      "공개용 화면이라 거래처·사람 이름·사업자번호는 가짜 값으로, 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/sales-strategy-portal/orders.webp",
        title: "주문 내역",
        caption:
          "ERP 주문 내역을 기간·구분별로 조회하고, 열 머리의 엑셀식 필터로 값을 골라 거릅니다. 월·분기·연 누계를 함께 확인하고 내려받을 수 있습니다.",
      },
      {
        src: "/images/portfolio/sales-strategy-portal/credit-query.webp",
        title: "채권 조회",
        caption:
          "기준월의 거래처별 순잔고·에이징·90일 이상 채권과 회전일을 사업자번호·거래처코드 기준으로 조회합니다.",
      },
      {
        src: "/images/portfolio/sales-strategy-portal/closings.webp",
        title: "마감 현황",
        caption:
          "청구서·판매·수금·물류의 일자별 마감 여부와 공급내역보고 상태를 확인합니다.",
      },
      {
        src: "/images/portfolio/sales-strategy-portal/inventory-lot.webp",
        title: "LOT별 재고",
        caption:
          "품목별 LOT 재고 수량과 제조일·사용기한·잔여 사용기한 구간을 조회합니다.",
      },
      {
        src: "/images/portfolio/sales-strategy-portal/accounting.webp",
        title: "회계 제출용 실매출",
        caption:
          "판매에서 반품·매출할인을 뺀 실매출과 수금 방법별 누적, 채권 잔액을 회계 제출용으로 정리합니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "주문·거래처·품목·재고·수금 자료 검색과 내려받기",
      "월말 마감·매출할인 반영 상태 확인",
      "회계 제출용 실매출과 기준월별 채권 조회",
    ],
    highlight: "주문·거래처·품목·재고·수금 자료를 직접 조회·분석",
    year: "2026",
    tech: [
      "Next.js 16",
      "Prisma 7",
      "Supabase",
      "공공 데이터(식약처·심평원·국세청)",
      "Recharts",
    ],
  },
  {
    slug: "pharmkpi-exec",
    name: "경영진 보고 화면",
    tagline: "매출·수금·채권 현황을 태블릿에서 조회",
    description:
      "매출·수금·채권 조회 화면을 구성하고, 확인 가능한 자료를 기준으로 보고 항목을 정리했습니다. 2026년 7월 경영진용 BI로 이관.",
    category: "web",
    scope: "company",
    screenshot: "/images/portfolio/pharmkpi-exec/forecast.webp",
    screensNote:
      "공개용 화면이라 거래처·금액은 시험용 합성 자료로 채워 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/pharmkpi-exec/forecast.webp",
        title: "연간 매출 전망",
        caption:
          "연 누적 실적에 최근 3개월 평균을 이어 붙여 연말 예상치를 내고, 작년 추세·증감률 방식의 참고값과 목표까지 남은 금액을 함께 보여 줍니다. 전망이 바뀐 이유도 항목별로 나눠 적습니다.",
      },
      {
        src: "/images/portfolio/pharmkpi-exec/daily.webp",
        title: "데일리 리포트",
        caption:
          "아침마다 여는 첫 화면입니다. 판매 실적과 목표 달성률, 수금 실적, 월별 판매 추이와 채널 구성을 한 화면에서 보고 날짜를 넘겨 지난 날도 확인합니다.",
      },
      {
        src: "/images/portfolio/pharmkpi-exec/item-detail.webp",
        title: "품목 판매 분석",
        caption:
          "품목을 누르면 12개월 판매 추이와 전년 동월 비교가 열리고, 같은 기간 거래처·담당자별 실적으로 바로 내려가 볼 수 있습니다. 기간 단위와 담당 기준도 바꿀 수 있습니다.",
      },
      {
        src: "/images/portfolio/pharmkpi-exec/monthly.webp",
        title: "월간 리포트",
        caption:
          "끝난 달의 판매·반품·매출할인·수금과 실매출을 전년 동월과 비교하고, 월말 채권 잔고를 함께 봅니다. 거래처·브랜드 범위를 골라 같은 표를 다시 계산합니다.",
      },
      {
        src: "/images/portfolio/pharmkpi-exec/visits.webp",
        title: "거래처 방문 준비",
        caption:
          "방문할 거래처를 고르면 연도별 순매출, 품목별 매출 순위와 할인율을 한 장에 모아 보여 줍니다. 방문 전에 거래 현황을 확인하는 용도입니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "태블릿에서 확인하는 읽기 전용 보고 화면",
      "매출·수금·채권 현황과 채권 연령별 조회",
      "경영진용 BI로 이관 후 보고·분석 기능 개선",
    ],
    highlight: "매출·수금·채권 현황을 태블릿에서 조회",
    year: "2026",
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Capacitor",
      "PWA",
      "Supabase",
      "Recharts",
      "Anthropic SDK",
    ],
  },
  {
    slug: "kpis-dsr-api",
    name: "의약품 공급내역보고 자동화",
    tagline: "엑셀 수작업 자동화와 ERP 전환기 보고 업무 유지·API 연계",
    description:
      "엑셀 수작업을 자동화하고 웹 시스템으로 발전시켰습니다. 이후 ERP·보고 프로그램 교체 후 오류가 3개월 이상 지속되는 동안 보고 업무를 이어갔고, 보고 API를 연계한 시스템을 구축했습니다. 다음 날 아침에는 보고 오류와 특이사항을 확인했습니다.",
    category: "web",
    scope: "company",
    liveUrl: "https://kpis.dvsharp.com",
    docsPath: "/kpis-dsr-api",
    screenshot: "/images/portfolio/kpis-dsr-api/hero.png",
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "엑셀 수작업 → 엑셀 자동화 → 웹 기반 공급내역보고 시스템",
      "ERP·보고 프로그램 변경 후 오류 장기화에 대응해 보고 업무 유지",
      "물류 마감 → 바코드 서버 접속 및 갑지·을지 다운로드 → API 공급내역보고",
      "다음 날 아침 의약품 공급내역보고 오류·특이사항 확인",
    ],
    highlight: "엑셀 수작업 자동화와 ERP 전환기 보고 업무 유지·API 연계",
    year: "2026",
    tech: ["Express 5", "React 19", "Vite 7", "MSSQL", "TanStack Table"],
  },
  {
    slug: "csoweb",
    name: "CSO 데이터 조회·검증",
    tagline: "CSO 관련 데이터 조회와 처방통계 자료 검증을 지원",
    description:
      "정산 자료와 업체 정보를 연결하는 조회 포털을 구축하고, 이미지·PDF 자료 추출 및 불일치·의심 자료 확인 기능을 구현했습니다. 상용 솔루션 도입에 따라 2026년 9월 자체 포털 운영 종료.",
    category: "web",
    scope: "company",
    docsPath: "/csoweb",
    screenshot: "/images/portfolio/csoweb/edi-review-detail.webp",
    screensNote:
      "운영 종료 뒤 기록용으로 찍은 화면입니다. 업체·병의원 이름과 금액은 가짜 값이고, 처방 문서 이미지는 자리표시로 바꿨습니다.",
    screens: [
      {
        src: "/images/portfolio/csoweb/edi-review-detail.webp",
        title: "EDI 정산서 검토",
        caption:
          "CSO 업체·거래처별로 처방 문서 이미지와 OCR로 읽은 품목·수량을 나란히 놓고, 정산서 수량과 다른 품목만 '검토 필요'로 띄워 확인하거나 고칩니다. 일치하는 품목은 자동 PASS로 넘어갑니다.",
      },
      {
        src: "/images/portfolio/csoweb/edi-review-workbench.webp",
        title: "리뷰 큐 검토표",
        caption:
          "부서 → CSO 업체 → 거래처 트리에서 대상을 고르면 품목별 정산 수량과 OCR 수량, 단가, 합계금액을 한 표에서 대조합니다. 정산서에 없는 품목이나 수량이 다른 행은 비교 열에서 바로 구분됩니다.",
      },
      {
        src: "/images/portfolio/csoweb/admin-stats.webp",
        title: "관리자 통계 분석",
        caption:
          "정산월 기준으로 수수료·수량의 전월·전년 대비 성장률, 상위 CSO 업체의 제품 구성, 상위 제품의 월별 수량 추이를 차트로 봅니다.",
      },
      {
        src: "/images/portfolio/csoweb/settlement-master.webp",
        title: "정산서 마스터 조회",
        caption:
          "전체 CSO 업체의 월별 정산 내역을 거래처·제품 단위로 조회하고, 거래처별 소계와 CSO 업체별 총합계를 함께 보여 줍니다. 조회 결과는 엑셀로 내려받거나 복사할 수 있습니다.",
      },
      {
        src: "/images/portfolio/csoweb/member-settlement.webp",
        title: "회원사 정산서 조회",
        caption:
          "CSO 회원사는 자기 업체의 정산월별 제약수수료 합계와 거래처·제품별 상세 내역을 조회하고 엑셀로 내려받습니다. 공지 사항은 화면 위에 함께 표시됩니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "정산 데이터와 업체 정보 연결 및 조회",
      "업체별 조회 권한과 정산 자료 발송 기능",
      "처방통계 이미지·PDF 자료 추출",
      "불일치·의심 자료의 담당자 확인 기능",
    ],
    highlight: "CSO 관련 데이터 조회와 처방통계 자료 검증을 지원",
    year: "2026",
    tech: [
      "Next.js 16",
      "Prisma",
      "Supabase Auth",
      "OCR (GPT·Claude 선택형)",
      "Sharp",
    ],
  },
  {
    slug: "erp-spec",
    name: "ERP 데이터 구조 문서",
    tagline: "영업 자료 조회·검증에 필요한 ERP 구조 문서화",
    description:
      "테이블·프로시저·코드 관계를 정리하고, 공급내역보고 등 실제 업무 자료의 조회 구조를 분석했습니다. 기존 ERP 구조와 자료 확인을 위한 참고 문서.",
    category: "web",
    scope: "company",
    liveUrl: "https://erp-spec.dvsharp.com",
    screenshot: "/images/portfolio/erp-spec/barcode-graph.png",
    githubUrl: "https://github.com/yurielk82/erp-spec",
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "ERP 테이블·프로시저·코드 관계 조회",
      "업무별 자료 구조와 조회 경로 문서화",
      "구 ERP 자료 분석 및 전환 이력 참고",
    ],
    highlight: "영업 자료 조회·검증에 필요한 ERP 구조 문서화",
    year: "2026",
    tech: ["Next.js 15", "Nextra", "React Flow", "dagre", "TypeScript"],
  },
  {
    slug: "ev-motor-reliability",
    name: "EV Motor Reliability",
    tagline: "전기차 모터 신뢰성 시험 자동화 (v0.41)",
    description:
      "전기차 구동 모터의 신뢰성 시험 데이터를 수집·분석하는 도구. Python 기반 데이터 처리와 C 기반 DSP를 결합하고, Claude AI로 시험 결과를 자동 해석합니다.",
    tech: ["Python 3.11", "C (DSP)", "FastAPI", "Anthropic SDK", "Plotly"],
    category: "tool",
    scope: "other",
    liveUrl: "https://avl.dvsharp.com",
    docsPath: "/ev-motor-reliability",
    screenshot:
      "/images/portfolio/ev-motor-reliability/avl-converter-review.webp",
    screensNote: "공개용 화면이라 합성 운전 프로파일로 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/ev-motor-reliability/avl-converter-review.webp",
        title: "AVL 변환 — 자동 매칭 검토",
        caption:
          "운전 프로파일 CSV 열을 AVL PUMA 시험기 XML의 속도·토크·추가 명령 변수와 동의어 사전으로 자동 매칭하고 점수로 보여 줍니다. 목표 step 수와 기록 설정(저장 간격·최대 기록 시간·샘플링 주파수)을 정한 뒤 변환합니다.",
      },
      {
        src: "/images/portfolio/ev-motor-reliability/avl-converter-upload.webp",
        title: "AVL 변환 — CSV 업로드",
        caption:
          "운전 프로파일 CSV를 한 개 또는 여러 개 고르면 서버에 내장된 AVL XML 템플릿을 기준으로 변환을 준비합니다. 필요하면 다른 기준 XML을 올려 쓸 수 있습니다.",
      },
      {
        src: "/images/portfolio/ev-motor-reliability/avl-converter-result.webp",
        title: "AVL 변환 — 일괄 결과",
        caption:
          "여러 CSV를 한 번에 XML 시험 프로파일로 바꾼 결과를 파일별로 보여 주고, 개별 XML이나 ZIP으로 내려받습니다. 원본 XML 형식은 유지하고 명령값만 바꿉니다.",
      },
    ],
    emoji: "⚡",
    gradient: "from-yellow-600/20 to-lime-600/20",
    features: [
      "TMS320F2838x DSP 펌웨어, SMC300 모터제어 보드, PMSM/BLDC 시험 데이터 통합",
      "pyserial UART(장기 수집)와 WebSocket(실시간 모니터링) 분리 수집, 임계 초과 시 자동 정지 + 비상정지 버튼 + 안전 게이지",
      "UniFlash/JTAG 자동 플래시와 build→flash→acquire→analyze→report 시험 파이프라인",
      "배치·스윕 시뮬레이션과 PID/FOC 제어 게인 자동 최적화(Nelder-Mead)",
      "Weibull 모수·MTTF·B10 Life·고장률·잔여 수명 추정을 Python 도메인 로직으로 직접 구현(감사 추적성)",
      "Rainflow 피로 사이클 추출(ASTM E1049), Coffin-Manson 열피로, Palmgren-Miner 누적손상",
      "열 프로파일(모터·IGBT·히트싱크 3채널) 분석과 열한계 마진 판정(CRITICAL/HIGH/MARGINAL/PASS)",
      "성능 저하(degradation)·토크-속도 곡선 분석과 시뮬 vs 실측 비교 리포트",
      "FMEA 자동 생성(RPN 기반 위험 등급)과 Weibull·FMEA·비교를 묶은 통합 분석 리포트",
      "확률 플롯·욕조 곡선·신뢰도/CDF·시계열·히트맵을 웹 대시보드에서 탐색",
      "AVL XML 측정 프로파일 변환, 시험 히스토리 관리, 하드웨어 상태(DSP·UART·JTAG) 실시간 조회",
      "Monaco 코드 에디터 + Git 패널(펌웨어·스크립트 브라우징), Admin 권한 관리",
      "로컬 Claude AI 에이전트로 결과 해석·시뮬 파라미터 추천·문서 질의(채팅 이력 저장)",
    ],
    highlight: "Python + C 하이브리드 DSP + AI 해석",
    year: "2026",
  },
];
