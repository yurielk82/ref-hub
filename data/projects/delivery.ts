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
      "마감 감시와 반영 누락 경고, 마감·아침 알림 자동화",
      "거래처 사업자번호 약 2만 4천 개 매일 새벽 국세청 휴·폐업 조회",
      "재직자 계정 자동 생성",
    ],
    highlight: "엑셀·스프레드시트로 취합하던 영업 자료의 조회·분석·보고 개선",
    year: "2026",
    tech: ["Next.js 16", "Prisma 7", "Supabase", "Anthropic SDK", "Recharts"],
  },
  {
    slug: "accounting-ledger",
    name: "회계팀 거래처 원장·채권 대사",
    tagline: "회계 보조원장 형식의 거래처 원장과 월말 채권 대사",
    description:
      "회계 보조원장 형식(전기이월·차변·대변·월계·누계)의 거래처 원장을 만들고, 월말 채권을 기존 회계 자료와 대사해 차이를 수금조정으로 정리했습니다. 회계팀 현황판에서 구분별 실매출, 수금 방법별 실적, 채권 증감과 채권연령을 봅니다. PharmKPI 회계팀 메뉴 운영 중.",
    category: "web",
    scope: "company",
    docsPath: "/pharmkpi",
    screenshot: "/images/portfolio/accounting-ledger/accounting-home.webp",
    screensNote:
      "공개용 화면이라 거래처·사람 이름·사업자번호·거래처코드는 가짜 값으로, 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/accounting-ledger/accounting-home.webp",
        title: "회계팀 홈",
        caption:
          "월말 실매출(판매−반품−매출할인)을 도매·수출·수탁 구분별 공급가액·부가세로 나눠 회계 제출 양식 그대로 복사하고, 수금 방법별 실적과 도매 채권 잔액을 한 화면에서 봅니다.",
      },
      {
        src: "/images/portfolio/accounting-ledger/customer-ledger.webp",
        title: "거래처 원장",
        caption:
          "사업자 하나에 묶인 거래처코드를 골라 회계 보조원장 형식(전기이월·차변·대변·월계·누계)으로 판매·수금·수금조정 줄을 날짜순으로 쌓고, 월말 잔액을 회계 채권과 대조합니다.",
      },
      {
        src: "/images/portfolio/accounting-ledger/collection-adjustments.webp",
        title: "수금조정 내역",
        caption:
          "월별 도매 채권 증감(전월말+판매−수금±수금조정=월말)을 보고, 원본 판매·수금에 없는 채권 이동을 거래처별 수금조정 줄로 남겨 원장에서 바로 확인합니다.",
      },
      {
        src: "/images/portfolio/accounting-ledger/business-status.webp",
        title: "사업자 휴·폐업 조회",
        caption:
          "기간 안에 판매나 채권 잔고가 있는 사업자를 국세청 상태와 맞춰 휴·폐업 거래처만 골라냅니다. 채권이 남은 폐업 거래처를 마지막 판매일과 함께 확인합니다.",
      },
    ],
    emoji: "📒",
    gradient: "from-emerald-600/20 to-teal-600/20",
    features: [
      "회계 보조원장 형식 거래처 원장(전기이월·차변·대변·월계·누계)",
      "월말 채권을 기존 회계 자료와 대사하고 차이를 수금조정으로 정리",
      "회계팀 현황판: 구분별 실매출, 수금 방법별 실적",
      "채권 증감(전월말+판매−수금±수금조정=월말)과 채권연령",
    ],
    highlight: "회계 보조원장 형식의 거래처 원장과 월말 채권 대사",
    year: "2026",
    tech: ["Next.js 16", "Prisma 7", "Supabase"],
  },
  {
    slug: "monthly-sales-reports",
    name: "영업 월 보고서 자동화",
    tagline: "매달 손으로 만들던 엑셀 월 보고서 4종을 원천 자료에서 자동 작성",
    description:
      "매달 손으로 만들던 엑셀 월 보고서 4종(판매·수금 요약, 브랜드·품목 매출, 담당자·유통별 월평균, 담당자별 주요품목 매출)을 원천 자료에서 다시 계산해 웹 화면과 원본 양식 엑셀로 제공합니다. 다단 피벗 분석, 거래처 방문준비 리포트, 분기 매출 비교도 함께 둡니다. PharmKPI 영업리포트 메뉴 운영 중.",
    category: "web",
    scope: "company",
    docsPath: "/pharmkpi",
    screenshot: "/images/portfolio/monthly-sales-reports/sales-collection.webp",
    screensNote:
      "공개용 화면이라 거래처·사람 이름·사업자번호·거래처코드는 가짜 값으로, 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/monthly-sales-reports/sales-collection.webp",
        title: "판매·수금 요약",
        caption:
          "매달 엑셀로 만들던 판매·수금 요약 양식을 같은 모양으로 다시 계산합니다. 지점별 월 판매와 목표·달성률·성장률을 기준월만 고르면 바로 보고, 원본 양식 엑셀로 내려받습니다.",
      },
      {
        src: "/images/portfolio/monthly-sales-reports/brand-sku.webp",
        title: "브랜드·품목 매출",
        caption:
          "브랜드와 품목(SKU)별 월 매출을 약효군·주요품목 구분과 함께 펼치고, 분기 평균과 전년 같은 달 대비 증감을 나란히 봅니다.",
      },
      {
        src: "/images/portfolio/monthly-sales-reports/rep-channel.webp",
        title: "담당자·유통별 월평균",
        caption:
          "부서·담당자·거래처 유통 구분별 공급가액 월평균을 지난해·분기·이번 달로 비교하고, 담당자 안에서 유통 구분별 점유율을 봅니다.",
      },
    ],
    emoji: "🗂️",
    gradient: "from-amber-600/20 to-orange-600/20",
    features: [
      "월 보고서 4종을 원천 자료에서 다시 계산해 원본 양식 그대로 제공",
      "기준월 선택과 전년·직전 분기 대비 비교 기간 자동 이동",
      "판매·수금·채권·목표 대비 실적 다단 피벗 분석",
      "거래처 방문준비 리포트와 판매 자료 변경 시 자동 재생성",
      "분기별 매출 실적 비교",
    ],
    highlight:
      "매달 손으로 만들던 엑셀 월 보고서 4종을 원천 자료에서 자동 작성",
    year: "2026",
    tech: ["Next.js 16", "Prisma 7", "Supabase", "ExcelJS"],
  },
  {
    slug: "market-analysis",
    name: "시장·경쟁 분석",
    tagline: "공공 데이터를 매일 모아 성분 시장과 경쟁 제품을 분석",
    description:
      "심평원·식약처 공공 데이터를 매일 자동으로 모아 성분 시장 규모와 성장, 대조약·경쟁 제품, 주력 품목 시장, 전국 시장, 생산실적을 봅니다. 판매 지도로 지역별 판매도 확인합니다. PharmKPI 시장 메뉴 운영 중.",
    category: "web",
    scope: "company",
    docsPath: "/pharmkpi",
    screenshot: "/images/portfolio/market-analysis/portfolio.webp",
    screensNote:
      "시장 화면은 심평원·식약처 공공 데이터라 값을 바꾸지 않았습니다. 경쟁 제품 화면의 업체·제품 표시는 가렸습니다.",
    screens: [
      {
        src: "/images/portfolio/market-analysis/portfolio.webp",
        title: "자사 포트폴리오",
        caption:
          "식약처 허가 품목과 심평원 보험 상한가를 모아 허가 품목 수, 평균 상한가, 전문·일반 비율, 특허 만료 임박 품목을 한 화면에 보여 줍니다. 공공 데이터는 매일 자동으로 다시 받습니다.",
      },
      {
        src: "/images/portfolio/market-analysis/competition.webp",
        title: "대조약·경쟁 제품",
        caption:
          "시장이 큰 성분에서 점유가 높은 제품을 점유율과 성장률 좌표로 찍어, 자사 품목이 들어간 시장에서 누가 크고 누가 빠르게 크는지 봅니다.",
      },
      {
        src: "/images/portfolio/market-analysis/national.webp",
        title: "전국 시장",
        caption:
          "심평원 청구 자료로 성분별 최근 12개월(MAT) 시장 규모와 점유율, 전년비, 5년 연평균 성장률 순위를 매기고, 성분·ATC·상병 기준으로 바꿔 봅니다.",
      },
    ],
    emoji: "🧭",
    gradient: "from-indigo-600/20 to-sky-600/20",
    features: [
      "심평원·식약처 공공 데이터 매일 자동 수집과 실패 시 재시도",
      "성분 시장 규모·연간 누적(MAT)·성장과 자사 위치",
      "대조약·경쟁 제품 비교와 주력 품목 성분 시장",
      "전국 시장과 식약처 생산실적 조회",
      "지역별 판매 지도",
    ],
    highlight: "공공 데이터를 매일 모아 성분 시장과 경쟁 제품을 분석",
    year: "2026",
    tech: ["Next.js 16", "Prisma 7", "Supabase", "공공 데이터(심평원·식약처)"],
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
      "발표 자료(PDF·PPT) 자동 생성과 일보 미입력 알림",
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
    name: "판매·운영 계획(S&OP) 개인 시제품",
    tagline: "계획 업무 흐름을 익히려고 직접 만들어 본 매출 예측·시나리오 화면",
    description:
      "회사가 외부 컨설팅으로 판매·운영 계획(S&OP)을 ERP에 반영하는 동안, 영업 데이터로 매출 예측과 가정별 시나리오 비교, 수요·공급·재고 검토 화면을 직접 만들어 보며 계획 업무의 흐름을 익혔습니다. 업무에는 적용하지 않은 개인 시제품입니다.",
    category: "web",
    scope: "other",
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
    highlight: "계획 업무 흐름을 익히려고 직접 만들어 본 S&OP 시제품",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    slug: "sales-strategy-portal",
    name: "영업지원팀 홈과 마감 관리",
    tagline: "영업지원팀이 매일 챙기는 마감·수치를 한 화면에",
    description:
      "영업지원팀이 매일 확인하는 청구서·판매·수금·물류·공급내역보고 마감과 적기보고율(목표 95%), 실매출·수금·채권, 품목 구성을 홈 한 화면에 모았습니다. 주문·채권·LOT 재고 조회와 회계 제출용 실매출 복사도 같은 메뉴에 둡니다. PharmKPI 영업지원팀 메뉴 운영 중.",
    category: "web",
    scope: "company",
    docsPath: "/pharmkpi",
    screenshot: "/images/portfolio/sales-strategy-portal/home.webp",
    screensNote:
      "공개용 화면이라 거래처·사람 이름·사업자번호는 가짜 값으로, 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/sales-strategy-portal/home.webp",
        title: "영업지원 홈",
        caption:
          "오늘의 마감(청구서·판매·수금·물류·공급내역보고) 상태부터 실매출·판매·반품·매출할인·수금 현황, 채권 잔고·회전일까지 영업지원 업무 순서대로 한 화면에 모았습니다. 각 지표는 전년 같은 달의 같은 영업일과 비교합니다.",
      },
      {
        src: "/images/portfolio/sales-strategy-portal/home-donut.webp",
        title: "실매출 구성 도넛",
        caption:
          "영업지원팀에 요구되는 실매출 구성을 CSO·비CSO, 도매 분류, 브랜드, SKU 등으로 나눠 월·분기·연 누계와 전월비로 봅니다. 주요품목 조각은 브랜드로 내려갑니다.",
      },
      {
        src: "/images/portfolio/sales-strategy-portal/home-workflow.webp",
        title: "판매·수금 추이와 구성",
        caption:
          "일별 판매·반품·수금 추이와 실매출 누계를 확인하고, 거래처별 채권 잔고와 품목·생산 구분별 실매출 구성을 이어서 봅니다.",
      },
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
    screenshot: "/images/portfolio/kpis-dsr-api/report-flow.webp",
    screensNote:
      "공개용 화면이라 거래처 이름·사업자번호·거래처코드는 가짜 값으로, 금액·수량은 실제와 다른 값으로 바꿔 찍었습니다. 적기보고율은 실제 값입니다.",
    screens: [
      {
        src: "/images/portfolio/kpis-dsr-api/report-flow.webp",
        title: "보고 흐름",
        caption:
          "원본 수집 → 보내기 전 주문 대조 → 보고 계획·보내기 → 접수 확인 → 반송·정정 → 보낸 뒤 대조 → 적기보고율 일곱 단계와 단계마다 막는 것을 한 장에 정리했습니다. 운영 KPIS로 보낸 보고는 되돌릴 수 없어 그 앞에 확인·잠금·사전 점검을 겹쳐 두었습니다.",
      },
      {
        src: "/images/portfolio/kpis-dsr-api/order-check.webp",
        title: "주문·KPIS 대조",
        caption:
          "한 달 주문 내역과 KPIS 접수를 거래처·날짜별로 맞대 수량·금액이 다른 곳만 펼칩니다. 8월은 주문과 KPIS가 다른 거래처가 남아 있어 정정 대상으로 잡혀 있습니다.",
      },
      {
        src: "/images/portfolio/kpis-dsr-api/kpis-home.webp",
        title: "KPIS 홈",
        caption:
          "한 달 보고를 날짜 줄로 보여 주고 보고 완료 일수, 볼 날, 분기 적기보고율, 주문과 KPIS가 다른 거래처 수를 위에 둡니다. 최근 3개월의 볼 날을 사유와 함께 모아 보고 작업으로 바로 넘어갑니다.",
      },
      {
        src: "/images/portfolio/kpis-dsr-api/report-work.webp",
        title: "보고 작업",
        caption:
          "날짜별 보고 상태와 갑지·접수·반송 줄 수, 처리 내용(API 접수 확인·수기 완료 표시)을 한 달치로 보고, 오른쪽에서 오늘 할 일과 반송 처리를 이어서 합니다.",
      },
      {
        src: "/images/portfolio/kpis-dsr-api/supply-lines.webp",
        title: "갑지·을지 조회",
        caption:
          "날짜별 보고 줄 수와 반송 수를 골라, 줄마다 공급구분·보고 상태·공급받은자·제품·표준코드·수량을 엑셀식 필터로 걸러 봅니다.",
      },
    ],
    emoji: "📊",
    gradient: "from-blue-600/20 to-cyan-600/20",
    features: [
      "엑셀 수작업 → 엑셀 자동화 → 웹 기반 공급내역보고 시스템",
      "ERP·보고 프로그램 변경 후 오류 장기화에 대응해 보고 업무 유지",
      "물류 마감 → 바코드 서버 접속 및 갑지·을지 다운로드 → API 공급내역보고",
      "다음 날 아침 의약품 공급내역보고 오류·특이사항 확인",
      "PharmKPI 메뉴에서 보고 상태·적기보고율과 갑지·을지 조회",
    ],
    highlight: "엑셀 수작업 자동화와 ERP 전환기 보고 업무 유지·API 연계",
    year: "2026",
    tech: ["Express 5", "React 19", "Vite 7", "MSSQL", "TanStack Table"],
  },
  {
    slug: "csoweb",
    name: "CSO 정산 조회·처방 자료 OCR",
    tagline: "CSO 정산 자료 조회와 처방통계 이미지·PDF의 OCR 자료화",
    description:
      "정산 자료와 업체 정보를 연결하는 조회 포털을 구축하고, 처방통계 이미지·PDF를 OCR로 읽어 품목·수량 자료로 만들었습니다. 상용 솔루션 도입에 따라 2026년 9월 자체 포털 운영 종료.",
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
          "CSO 업체·거래처별로 처방 문서 이미지와 OCR로 읽은 품목·수량을 나란히 놓고 확인합니다.",
      },
      {
        src: "/images/portfolio/csoweb/edi-review-workbench.webp",
        title: "리뷰 큐 검토표",
        caption:
          "부서 → CSO 업체 → 거래처 트리에서 대상을 고르면 품목별 정산 수량과 OCR로 읽은 수량, 단가, 합계금액을 한 표에서 봅니다.",
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
      "처방통계 이미지·PDF를 OCR로 읽어 품목·수량 자료화",
    ],
    highlight: "CSO 정산 자료 조회와 처방통계 이미지·PDF의 OCR 자료화",
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
    screenshot: "/images/portfolio/erp-spec/overview.webp",
    screensNote: "테이블별 행 수는 실제와 다른 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/erp-spec/overview.webp",
        title: "UNION_ERP 개요",
        caption:
          "기존 Oracle ERP(UNION_ERP, KUP 스키마) 테이블 명세의 전체 통계와 마이그레이션 우선순위를 정리한 첫 화면입니다. 왼쪽 메뉴에서 컬럼 검색·매핑 체크리스트·카테고리별 테이블 명세로 이동합니다.",
      },
      {
        src: "/images/portfolio/erp-spec/volume-chart.webp",
        title: "데이터 볼륨",
        caption:
          "카테고리별 총 행 수를 막대로 비교해 대용량 카테고리부터 이관 순서를 정하는 데 씁니다. 카테고리 이름을 누르면 해당 테이블 명세로 이동합니다.",
      },
      {
        src: "/images/portfolio/erp-spec/category-erd.webp",
        title: "카테고리 관계도",
        caption:
          "카테고리 문서 안에 PK 컬럼명 매칭으로 추정한 테이블 관계를 ERD로 띄워, 확대·이동하며 어떤 테이블이 서로 이어지는지 확인합니다.",
      },
      {
        src: "/images/portfolio/erp-spec/table-spec.webp",
        title: "테이블 상세 명세",
        caption:
          "테이블마다 PK, 컬럼명·타입·NULL 허용·설명과 인덱스를 표로 정리하고, MariaDB DDL을 함께 제공합니다.",
      },
      {
        src: "/images/portfolio/erp-spec/column-search.webp",
        title: "컬럼 검색",
        caption:
          "컬럼명을 입력하면 그 컬럼을 쓰는 모든 테이블을 타입·NULL 허용·설명과 함께 찾아 줍니다.",
      },
      {
        src: "/images/portfolio/erp-spec/mapping-checklist.webp",
        title: "매핑 체크리스트",
        caption:
          "테이블별 마이그레이션 매핑 상태(미완료·완료·제외)와 메모를 추적하고 전체 진행률을 봅니다. 상태와 메모는 서버에 저장되어 팀원과 공유됩니다.",
      },
    ],
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
