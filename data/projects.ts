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
      '실시간 매출·수금·마진 KPI 대시보드',
      '멀티 AI (Claude, Gemini, GPT) 매출 분석',
      'PDF/Excel 리포트 자동 생성',
      'Oracle ERP → Supabase ETL 파이프라인',
    ],
    highlight: 'Oracle ERP 연동 + 멀티 AI 분석 대시보드',
    year: '2024',
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
      '거래처별 수수료 자동 정산',
      'AI Vision 기반 EDI 문서 자동 검토',
      '다단계 승인 워크플로우',
      '이메일 알림 워커 + Upstash Rate Limit',
    ],
    highlight: 'Anthropic Vision API + EDI 문서 자동화',
    year: '2024',
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
    gradient: 'from-violet-600/20 to-purple-600/20',
    features: [
      '일일 공급내역 자동 리포트 생성',
      '커스텀 검증 규칙 엔진',
      '가상 스크롤 대용량 테이블 (TanStack)',
      'PDF 리포트 Export',
    ],
    highlight: 'Express 5 + React 19 + MSSQL 풀스택',
    year: '2024',
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
      '시험 데이터 자동 수집 및 파싱',
      'C 기반 고속 DSP 신호 처리',
      'Claude AI 시험 결과 자동 해석',
      'Plotly 인터랙티브 시각화',
    ],
    highlight: 'Python + C 하이브리드 DSP + AI 해석',
    year: '2024',
  },
  {
    slug: 'claude-dotfiles',
    name: 'Claude Dotfiles',
    tagline: 'AI 개발 자동화 하네스 (규칙 22 + 훅 48 + 스킬 128)',
    description:
      'Claude Code의 규칙·훅·에이전트·스킬을 계층화하여 관리하는 개발 자동화 설정 저장소. 코드 품질 강제, 배포 안전장치, 리뷰 자동화 등 AI 페어 프로그래밍의 생산성을 극대화합니다.',
    tech: ['Bash', 'Markdown', 'YAML', 'Claude Code', 'Git Hooks'],
    category: 'tool',
    githubUrl: 'https://github.com/yurielk82/claude-dotfiles',
    emoji: '🤖',
    gradient: 'from-rose-600/20 to-pink-600/20',
    features: [
      '22개 규칙 (코드 원칙, 보안, DDD, 디자인 시스템)',
      '48개 훅 (커밋 가드, 배포 검증, GSD 워크플로우)',
      '4개 에이전트 (architect, reviewer, tester, debugger)',
      '128개 온디맨드 스킬 (UI, 보안 감사, 체계적 디버깅)',
    ],
    highlight: 'AI 페어 프로그래밍 생산성 자동화 하네스',
    year: '2025',
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
