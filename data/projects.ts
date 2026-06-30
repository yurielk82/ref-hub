import type { Project } from './project-types'
import { DELIVERY_PROJECTS } from './projects/delivery'
import { TOOLING_PROJECTS } from './projects/tooling'

export type { Project }

// 쇼케이스 등록부 — 엔터프라이즈 딜리버리 → 사내 도구·하네스 순 (랜딩 카드 노출 순서)
export const PROJECTS: Project[] = [...DELIVERY_PROJECTS, ...TOOLING_PROJECTS]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
