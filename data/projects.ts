export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  tech: string[]
  category: 'web' | 'mobile' | 'api' | 'tool'
  liveUrl?: string
  githubUrl?: string
  docsPath?: string
  screenshot?: string
  emoji: string
  gradient: string
  features: string[]
  highlight: string
  year: string
  badge?: string
  featuredModule?: {
    name: string
    description: string
    path: string
    emoji: string
  }
}

export const PROJECTS: Project[] = [
  {
    slug: 'pharmkpi',
    name: 'PharmKPI',
    tagline: '제약 KPI 대시보드 (v1.16)',
    description:
      '매출·수금·마진·흡수율 등 제약 산업 핵심 지표를 실시간으로 시각화하는 대시보드. Oracle ERP 데이터를 자동 수집하고, Claude·Gemini·GPT 멀티 AI로 매출 추이를 분석합니다.',
    tech: ['Next.js 16', 'Prisma 7', 'Supabase', 'Anthropic SDK', 'Recharts'],
    category: 'web',
    liveUrl: 'https://kpi.dvsharp.com',
    docsPath: '/pharmkpi',
    screenshot: '/images/portfolio/pharmkpi/hero.png',
    emoji: '📊',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    features: [
      'ERP Relay → Supabase 동기화로 도매·CSO·수금·마진·흡수율 KPI를 통합',
      '도매/CSO 매출, 제품별 실적, 전월·전년 대비 추이, 3M·6M·12M 흡수율 분석',
      '과거 월 데이터 불변 캐시와 당월 수동 동기화로 보고 기준 안정화',
      'Claude·Gemini 기반 AI 채팅으로 현재 대시보드 데이터 질의와 추세 해석 지원',
      '웹 관리자 콘솔에서 동기화 상태, 데이터 기준월, DB 연결 상태를 한 번에 점검',
      '지역 분포, Sankey, 영업활동, 공급현황, 준수율까지 확장 가능한 KPI 메뉴 구조',
    ],
    highlight: 'Oracle ERP 연동 + 멀티 AI 분석 대시보드',
    year: '2026',
  },
  {
    slug: 'csoweb',
    name: 'CSO Web',
    tagline: 'B2B 제약 CSO 정산 + AI Vision EDI (v1.20)',
    description:
      'CSO(위탁영업조직) 수수료 정산 내역을 조회·관리하는 B2B 포털. 거래처별 수수료 정산, 승인 워크플로우에 더해 AI Vision 기반 EDI 문서 자동 검토 기능을 구축 중입니다.',
    tech: ['Next.js 16', 'Prisma', 'Supabase Auth', 'Anthropic SDK', 'Sharp'],
    category: 'web',
    liveUrl: 'https://cso.dvsharp.com',
    docsPath: '/csoweb',
    screenshot: '/images/portfolio/csoweb/hero.png',
    emoji: '💼',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    features: [
      '사업자번호 기반 가입과 국세청 NTS API 검증으로 계속사업자만 포털 접근 허용',
      'SIT 정산 원천 데이터를 웹에서 매핑하고 CSO 업체명과 회원 사업자번호를 연결',
      'CSO 매칭 상태(normal/unregistered/pending/missing_match)와 무결성 검사로 조회 누락 원인 추적',
      '회원별 자사 정산 조회, 월별 수수료 합계, 컬럼별 상세 내역을 웹 화면에서 확인',
      'Resend API와 하이웍스 SMTP 워커를 병행한 승인·업로드·메일머지 알림 발송',
      'Supabase PostgreSQL, 자체 JWT, 서버측 권한 필터링으로 일반회원은 자사 데이터만 접근',
    ],
    highlight: 'Anthropic Vision API + EDI 문서 자동화',
    year: '2026',
    badge: 'NEW',
    featuredModule: {
      name: 'EDI 검증 시스템',
      description:
        '처방통계 이미지를 Claude Vision OCR로 자동 추출하고, ELA·EXIF·Perceptual Hash로 위변조를 탐지하며, 사람이 최종 검수하는 Human-in-the-loop 자동 검증 모듈',
      path: '/edi-verification',
      emoji: '🔍',
    },
  },
  {
    slug: 'kpis-dsr-api',
    name: 'KPIS DSR',
    tagline: '의약품 공급내역 가공·조회 시스템 (v1.29)',
    description:
      '의약품관리종합정보센터(KPIS) 공급내역(갑지) 데이터를 가공·검증·조회하는 풀스택 시스템. 커스텀 검증 규칙 엔진으로 데이터 무결성을 보장하고, 일일 리포트를 자동 생성합니다.',
    tech: ['Express 5', 'React 19', 'Vite 7', 'MSSQL', 'TanStack Table'],
    category: 'web',
    docsPath: '/kpis-dsr-api',
    screenshot: '/images/portfolio/kpis-dsr-api/hero.png',
    emoji: '📋',
    gradient: 'from-stone-500/15 to-stone-400/15',
    features: [
      '갑지·을지 원천 데이터를 웹 화면에서 불러오고 공급구분별 탭으로 자동 분류',
      '코드매핑, 마스터 자동매칭, 단가학습, 규격보정, 규칙엔진으로 ERP 오류 데이터를 단계별 보정',
      '조건·액션 기반 배치 규칙과 사용 이력 학습으로 반복 수정 패턴을 다음 업로드에 재적용',
      'DataGrid 셀 편집, 총액 불변 수량·단가 역산, 수정 이력(manual/rule/correction/auto_match) 추적',
      '필수값·형식·비즈니스 3단계 검증과 DC/DE/DH 오류 가이드로 제출 불가 행 식별',
      '최종 규칙 적용 후 웹 화면에서 KPIS 제출 전 상태를 확인하고 MA111~MA114 API로 자동 제출',
    ],
    highlight: 'Express 5 + React 19 + MSSQL 풀스택',
    year: '2026',
  },
  {
    slug: 'studiogo',
    name: 'StudioGo',
    tagline: '라이브커머스 스튜디오 예약 플랫폼 (v1.5)',
    description:
      '라이브커머스 스튜디오 예약·관리 모바일 앱. 달력 기반 예약, 체크인, 이행 관리, 멤버 관리 등 스튜디오 운영에 필요한 전 과정을 모바일에서 처리합니다.',
    tech: ['Expo 52', 'React Native', 'Hono', 'Supabase', 'TypeScript'],
    category: 'mobile',
    docsPath: '/studiogo',
    emoji: '🎬',
    gradient: 'from-orange-600/20 to-amber-600/20',
    features: [
      '스튜디오 검색, 날짜·설비 필터, 슬롯 선택, 2분 Hold로 중복 예약을 방지하는 예약 위자드',
      '운영자 웹/모바일 대시보드에서 승인 대기·승인·거절·완료·노쇼 상태를 관리',
      'QR 스캔, PIN, 수동 입력 기반 체크인·체크아웃과 중복 스캔 방지 흐름',
      '방송 후 대기→포장 중→발송 준비→발송됨→완료까지 출고 상태와 운송장 관리',
      '카카오 로그인, 카카오 알림톡, Expo Push, 인앱 알림을 통한 예약·취소·노쇼 알림',
      'Hono API, Neon PostgreSQL, Drizzle, TanStack Query/Zustand로 모바일·웹 운영 도구 분리',
    ],
    highlight: 'Expo + Hono 크로스플랫폼 모바일 앱',
    year: '2026',
  },
  {
    slug: 'ev-motor-reliability',
    name: 'EV Motor Reliability',
    tagline: '전기차 모터 신뢰성 시험 자동화 (v0.41)',
    description:
      '전기차 구동 모터의 신뢰성 시험 데이터를 수집·분석하는 도구. Python 기반 데이터 처리와 C 기반 DSP를 결합하고, Claude AI로 시험 결과를 자동 해석합니다.',
    tech: ['Python 3.11', 'C (DSP)', 'FastAPI', 'Anthropic SDK', 'Plotly'],
    category: 'tool',
    docsPath: '/ev-motor-reliability',
    screenshot: '/images/portfolio/ev-motor-reliability/hero.png',
    emoji: '⚡',
    gradient: 'from-yellow-600/20 to-lime-600/20',
    features: [
      'TMS320F2838x DSP 펌웨어, SMC300 모터제어 보드, PMSM/BLDC 시험 데이터 통합',
      'pyserial UART와 WebSocket으로 속도·전류·온도·토크를 실시간 수집하고 임계치 알림 처리',
      'UniFlash/JTAG 자동 플래시와 build→flash→acquire→analyze→report 시험 파이프라인',
      'Weibull 모수, MTTF, B10 Life, 고장률, 잔여 수명 예측을 Python 도메인 로직으로 계산',
      '확률 플롯, 욕조 곡선, 신뢰도/CDF, 시계열, 히트맵을 웹 대시보드에서 즉시 탐색',
      'Claude API 채팅으로 시험 결과 해석, 시뮬레이션 파라미터 추천, 문서 질의 지원',
    ],
    highlight: 'Python + C 하이브리드 DSP + AI 해석',
    year: '2026',
  },
  {
    slug: 'erp-spec',
    name: 'ERP Spec',
    tagline: '인수사 IT팀 인계를 위한 ERP 구조 분석 포털 (v2.9)',
    description:
      '인수사 IT팀 요청에 대응해 자사 Oracle ERP 785개 테이블 구조를 웹에서 검색·분석할 수 있게 정리한 포털. 테이블 간 관계를 인터랙티브 그래프(React Flow + dagre)로 시각화하여 인계, 영향 범위 검토, 스키마 탐색을 지원합니다.',
    tech: ['Next.js 15', 'Nextra', 'React Flow', 'dagre', 'TypeScript'],
    category: 'web',
    liveUrl: 'https://erp-spec.dvsharp.com',
    githubUrl: 'https://github.com/yurielk82/erp-spec',
    screenshot: '/images/portfolio/erp-spec/hero.png',
    emoji: '🗄️',
    gradient: 'from-stone-600/15 to-stone-400/15',
    features: [
      '인수사 IT팀 요청에 맞춰 자사 Oracle ERP 785개 테이블 구조를 웹 분석 포털로 제공',
      '컬럼 타입, 제약조건, 인덱스, 설명을 표준화해 ERP 구조 인계와 신규 담당자 온보딩 지원',
      '테이블명·컬럼명 검색으로 ERP 스키마를 빠르게 탐색하고 개발/운영 문의 대응 기준 마련',
      'React Flow와 dagre 자동 레이아웃으로 테이블 간 참조 관계와 의존도를 인터랙티브하게 시각화',
      '개별 테이블 상세와 관계 그래프를 연결해 영향 범위 파악과 데이터 출처 추적 지원',
      'Nextra 기반 웹 레퍼런스로 DBA·개발자·현업·인수사 IT팀이 같은 구조 기준을 공유',
    ],
    highlight: '인수사 IT팀 인계를 위한 ERP 구조 분석 포털',
    year: '2026',
  },
  {
    slug: 'srt',
    name: 'SRT 자동예매',
    tagline: 'SRT 열차 자동 예매 시스템 (v1.3)',
    description:
      'SRT 열차 매진 좌석을 자동으로 감시하고 예매하는 풀스택 웹 애플리케이션. Redis 큐 기반 타이밍 제어, Rate Limiting 준수, 텔레그램 알림을 통해 안정적으로 운영합니다.',
    tech: ['Next.js 16', 'FastAPI', 'Redis', 'Tailwind', 'Base UI'],
    category: 'web',
    liveUrl: 'https://srt.dvsharp.com',
    screenshot: '/images/portfolio/srt/hero.png',
    emoji: '🚄',
    gradient: 'from-sky-500/15 to-teal-500/15',
    features: [
      'SRT 매진 좌석을 주기적으로 감시하고 조건에 맞는 열차가 열리면 자동 예매 시도',
      'Next.js 웹 UI와 FastAPI 백엔드를 분리해 검색 조건, 작업 상태, 결과 알림 관리',
      'Redis 큐로 예약 시도 작업을 직렬화하고 타이밍 제어·중복 실행 방지·재시도 전략 구성',
      'SRT API 호출에 Rate Limiting과 백오프를 적용해 안정적인 폴링/예매 흐름 유지',
      '텔레그램 봇으로 예매 성공, 실패, 대기 상태를 실시간 알림',
      '개인 자동화 요구를 풀스택 백그라운드 작업 시스템으로 구조화한 실전 자동화 사례',
    ],
    highlight: 'Next.js + FastAPI + Redis 풀스택 자동화',
    year: '2026',
  },
  {
    slug: 'claude-dotfiles',
    name: 'Claude/Codex Harness',
    tagline: 'AX Delivery 자동화 하네스 (규칙 22 + 훅 48 + 스킬 128)',
    description:
      'Claude Code와 Codex 기반 작업 방식을 규칙·훅·에이전트·스킬로 계층화하여 관리하는 AX Delivery 자동화 하네스. 코드 품질 강제, 배포 안전장치, 리뷰 자동화 등 AI 페어 프로그래밍의 생산성을 운영 체계로 고정합니다.',
    tech: ['Bash', 'Markdown', 'YAML', 'Claude Code', 'Codex', 'Git Hooks'],
    category: 'tool',
    githubUrl: 'https://github.com/yurielk82/claude-dotfiles',
    emoji: '🤖',
    gradient: 'from-amber-500/15 to-orange-500/15',
    features: [
      'Claude Code와 Codex 작업 규칙을 계층화해 코드 원칙, 보안, DDD, 디자인, 배포 기준을 자동 주입',
      '48개 훅으로 커밋 전 검증, 테스트/빌드 가드, 배포 안전장치, 반복 실수 방지 흐름 구성',
      'architect, reviewer, tester, debugger 에이전트 역할을 분리해 계획·리뷰·검증·디버깅 병렬화',
      '128개 온디맨드 스킬로 UI, 보안 감사, 체계적 디버깅, TDD, 배포 대응을 상황별 호출',
      'AI 페어 프로그래밍을 개인 프롬프트가 아니라 AX 프로젝트 납품용 운영 하네스로 표준화',
      '작업 완료 후 검증·커밋·push·배포 흐름까지 규칙화해 구현 속도와 운영 안전성을 함께 강화',
    ],
    highlight: 'Claude/Codex 기반 AX Delivery 자동화 하네스',
    year: '2026',
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
