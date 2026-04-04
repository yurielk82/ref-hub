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
    title: '한국유니온제약(주) 영업관리팀',
    role: '운영 체계 재정비 · 시스템 기획·구축',
    description:
      '회생절차와 인수 과정에서 불안정해진 운영 기준을 재정비하고, 부서 간 협업 구조를 실무적으로 재설계했습니다. CSO 정산 시스템을 AI로 기획·구축하여 수기 정산을 자동화했고, ERP 신규 전환에서 현업·전산팀·외부 파트너 간 조율을 담당했습니다.',
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
    label: '웹 개발',
    items: ['Next.js', 'React', 'React Native', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: '백엔드',
    items: ['Express', 'FastAPI', 'Hono', 'Prisma', 'Supabase'],
  },
  {
    label: 'AI · 데이터',
    items: ['Claude API', 'Gemini', 'GPT', 'Python', 'ERP 운영'],
  },
  {
    label: '도구',
    items: ['GitHub', 'Cloudflare', 'Netlify', 'Office 365', 'Google Workspace'],
  },
]
