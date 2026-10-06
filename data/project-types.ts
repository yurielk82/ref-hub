export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  tech: string[]
  category: 'web' | 'mobile' | 'api' | 'tool'
  /** 랜딩 묶음 — 회사 업무(company)와 그 밖의 작업(개인 도구·외부 의뢰, other) */
  scope: 'company' | 'other'
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
