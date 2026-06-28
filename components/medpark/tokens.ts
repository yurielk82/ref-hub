// 메드파크 라이브 샘플 디자인 토큰 (제너릭 AI 룩 회피).
import type { Severity } from './sample-data'

export const T = {
  base: '#F7F8FA',
  card: '#FFFFFF',
  ink: '#1A2230',
  inkMuted: '#5B6577',
  hairline: '#E4E8EE',
  // 측정/검증 = teal
  teal: '#0E7C7B',
  tealTint: '#E6F2F1',
  // 주의 = amber, 심각 = red
  amber: '#B45309',
  red: '#B91C1C',
  // 법령 자문 = violet
  violet: '#5B4FC4',
  violetTint: '#F3F1FC',
} as const

/** 키보드 포커스 가시성 공통 클래스 */
export const RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1A2230]'

export const SEVERITY: Record<Severity, { dot: string; label: string }> = {
  low: { dot: '#9AA4B2', label: '낮음' },
  med: { dot: T.amber, label: '주의' },
  high: { dot: T.red, label: '심각' },
}
