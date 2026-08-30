import type { AxCaseStudy } from './ax-types'
import { DELIVERY_CASE_STUDIES } from './ax-cases/delivery'
import { TOOLING_CASE_STUDIES } from './ax-cases/tooling'

export * from './ax-types'
export * from './ax-content'

// AX 케이스 등록부 — 엔터프라이즈 딜리버리 → 사내 도구·하네스 순 (렌더 순서)
export const AX_CASE_STUDIES: AxCaseStudy[] = [...DELIVERY_CASE_STUDIES, ...TOOLING_CASE_STUDIES]
