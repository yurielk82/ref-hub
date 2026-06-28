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
