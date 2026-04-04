export interface Experience {
  period: string
  title: string
  role: string
  description: string
  projects: string[]
}

export interface SkillCategory {
  label: string
  items: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    period: '2025 — 2026',
    title: '한국유니온제약 영업관리팀',
    role: '사내 시스템 기획·개발',
    description:
      '매출·수금·마진 지표를 실시간으로 추적하는 KPI 대시보드, CSO 수수료 정산 포털, 의약품 공급내역 검증 시스템을 직접 설계하고 운영까지 담당. Oracle ERP 데이터를 자동 수집하는 파이프라인과 멀티 AI 분석 기능을 구축했습니다.',
    projects: ['pharmkpi', 'csoweb', 'kpis-dsr-api', 'erp-spec'],
  },
  {
    period: '2025',
    title: 'AI 기반 개발 환경 구축',
    role: 'Claude Code 하네스 + 자동 예매 시스템',
    description:
      '규칙 22개·훅 48개·스킬 128개로 구성된 AI 페어 프로그래밍 자동화 하네스를 설계하고, SRT 열차 자동 예매 시스템을 Next.js + FastAPI + Redis 풀스택으로 구축했습니다.',
    projects: ['claude-dotfiles', 'srt'],
  },
  {
    period: '2024',
    title: '프리랜서 개발',
    role: '외부 프로젝트',
    description:
      '라이브커머스 스튜디오 예약 모바일 앱(Expo + Hono)과 전기차 구동 모터 신뢰성 시험 데이터 분석 도구(Python + C DSP)를 개발했습니다.',
    projects: ['studiogo', 'ev-motor-reliability'],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: '프론트엔드',
    items: ['Next.js', 'React', 'React Native', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    label: '백엔드',
    items: ['Express', 'FastAPI', 'Hono', 'Prisma', 'Supabase'],
  },
  {
    label: 'AI · 데이터',
    items: ['Claude API', 'Gemini', 'GPT', 'Python', 'Plotly'],
  },
]
