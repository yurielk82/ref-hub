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
    period: '2024 — 현재',
    title: '한국유니온제약 영업관리팀',
    role: '영업관리 시스템 개발',
    description:
      '영업 데이터 자동화, KPI 대시보드, CSO 정산 시스템 등 현업 문제를 직접 시스템으로 해결',
    projects: ['pharmkpi', 'csoweb', 'kpis-dsr-api', 'erp-spec'],
  },
  {
    period: '2024',
    title: '프리랜서 개발',
    role: '다양한 도메인 프로젝트',
    description:
      '라이브커머스 스튜디오 예약 플랫폼, EV 모터 신뢰성 분석 도구 등 다양한 도메인 프로젝트',
    projects: ['studiogo', 'ev-motor-reliability'],
  },
  {
    period: '2025',
    title: 'AI 개발 자동화',
    role: 'Claude Code 하네스 구축',
    description:
      '규칙·훅·에이전트·스킬을 계층화한 AI 페어 프로그래밍 자동화 설정 저장소 구축',
    projects: ['claude-dotfiles', 'srt'],
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
