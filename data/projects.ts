export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  tech: string[]
  category: 'web' | 'mobile' | 'api' | 'tool'
  liveUrl?: string
  docsPath?: string
  screenshot?: string
  emoji: string
  gradient: string
  features: string[]
  highlight: string
  year: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'pharmkpi',
    name: 'PharmKPI',
    tagline: '제약 KPI 대시보드',
    description:
      '매출·수금·마진·흡수율 등 제약 산업 핵심 지표를 실시간으로 시각화하는 대시보드. Oracle ERP 데이터를 자동 수집하여 경영진 의사결정을 지원합니다.',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'Supabase', 'Recharts'],
    category: 'web',
    liveUrl: 'https://kpi.dvsharp.com',
    docsPath: '/pharmkpi',
    screenshot: '/images/portfolio/pharmkpi/hero.png',
    emoji: '📊',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    features: [
      '실시간 매출·수금·마진 KPI 대시보드',
      'AI 기반 매출 추이 분석 및 예측',
      'PDF/Excel 리포트 자동 생성',
      'Oracle ERP → Supabase ETL 파이프라인',
    ],
    highlight: 'Oracle ERP 연동 실시간 ETL + AI 분석',
    year: '2024',
  },
  {
    slug: 'srt',
    name: 'SRT 자동예매',
    tagline: 'SRT 열차 자동 예매 시스템',
    description:
      'SRT 열차 매진 좌석을 자동으로 감시하고 예매하는 풀스택 웹 애플리케이션. Redis 큐 기반 타이밍 제어, Rate Limiting 준수, 텔레그램 알림을 통해 안정적으로 운영합니다.',
    tech: ['Next.js 16', 'TypeScript', 'FastAPI', 'Redis', 'Tailwind'],
    category: 'web',
    liveUrl: 'https://srt.dvsharp.com',
    screenshot: '/images/portfolio/srt/hero.png',
    emoji: '🚄',
    gradient: 'from-indigo-600/20 to-blue-600/20',
    features: [
      'SRT API 연동 자동 예매 매크로',
      'Redis 큐 기반 백그라운드 작업 관리',
      'Rate Limiting + 재시도 전략',
      '텔레그램 봇 실시간 알림',
    ],
    highlight: 'Next.js + FastAPI + Redis 풀스택 자동화',
    year: '2025',
  },
  {
    slug: 'csoweb',
    name: 'CSO Web',
    tagline: 'B2B 제약 CSO 정산 포털',
    description:
      'CSO(위탁영업조직) 수수료 정산 내역을 조회·관리하는 B2B 포털. 거래처별 매출 대비 수수료 계산, 월별 정산 이력 추적, 다단계 승인 워크플로우를 제공합니다.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'Supabase Auth'],
    category: 'web',
    liveUrl: 'https://cso.dvsharp.com',
    docsPath: '/csoweb',
    screenshot: '/images/portfolio/csoweb/hero.png',
    emoji: '💼',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    features: [
      '거래처별 수수료 자동 정산',
      '월별 정산 이력 및 승인 워크플로우',
      'Supabase Auth 기반 역할별 접근 제어',
      '이메일 알림 워커 (자동 발송)',
    ],
    highlight: 'Prisma + Supabase 기반 다중 테넌트 정산',
    year: '2024',
  },
  {
    slug: 'kpis-dsr-api',
    name: 'KPIS DSR',
    tagline: '의약품 공급내역 가공·조회 시스템',
    description:
      '의약품관리종합정보센터(KPIS) 공급내역(갑지) 데이터를 가공·검증·조회하는 풀스택 시스템. 일일 리포트 자동 생성, 데이터 검증 규칙 관리, 반품 관리 기능을 포함합니다.',
    tech: ['Express 5', 'React 19', 'TypeScript', 'PostgreSQL', 'Vite'],
    category: 'web',
    docsPath: '/kpis-dsr-api',
    screenshot: '/images/portfolio/kpis-dsr-api/hero.png',
    emoji: '📋',
    gradient: 'from-violet-600/20 to-purple-600/20',
    features: [
      '일일 공급내역 자동 리포트 생성',
      '커스텀 검증 규칙 엔진',
      '반품·수정 관리 워크플로우',
      'PDF 리포트 Export',
    ],
    highlight: 'Express 5 + React 19 풀스택 SPA',
    year: '2024',
  },
  {
    slug: 'studiogo',
    name: 'StudioGo',
    tagline: '라이브커머스 스튜디오 예약 플랫폼',
    description:
      '라이브커머스 스튜디오 예약·관리 모바일 앱. 달력 기반 예약, 체크인, 이행 관리, 멤버 관리 등 스튜디오 운영에 필요한 전 과정을 모바일에서 처리합니다.',
    tech: ['Expo 52', 'React Native', 'Hono', 'Supabase', 'TypeScript'],
    category: 'mobile',
    docsPath: '/studiogo',
    emoji: '🎬',
    gradient: 'from-orange-600/20 to-amber-600/20',
    features: [
      '달력 기반 스튜디오 예약 시스템',
      '실시간 체크인·이행 관리',
      '멤버 역할별 권한 제어',
      'Hono 경량 API + Supabase 실시간',
    ],
    highlight: 'Expo + Hono 크로스플랫폼 모바일 앱',
    year: '2024',
  },
  {
    slug: 'ev-motor-reliability',
    name: 'EV Motor Reliability',
    tagline: '전기차 모터 신뢰성 시험 자동화',
    description:
      '전기차 구동 모터의 신뢰성 시험 데이터를 수집·분석하는 도구. Python 기반 데이터 처리와 C 기반 DSP(디지털 신호 처리)를 결합하여 시험 결과를 자동 시각화합니다.',
    tech: ['Python 3.11', 'C (DSP)', 'FastAPI', 'SQLite', 'Plotly'],
    category: 'tool',
    docsPath: '/ev-motor-reliability',
    screenshot: '/images/portfolio/ev-motor-reliability/hero.png',
    emoji: '⚡',
    gradient: 'from-yellow-600/20 to-lime-600/20',
    features: [
      '시험 데이터 자동 수집 및 파싱',
      'C 기반 고속 DSP 신호 처리',
      'Plotly 인터랙티브 시각화',
      'FastAPI 데이터 분석 API',
    ],
    highlight: 'Python + C 하이브리드 DSP 파이프라인',
    year: '2024',
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
