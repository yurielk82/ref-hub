// 메드파크 라이브 샘플 디자인 토큰 — 정제된 에디토리얼·기관 신뢰감.
// 3트랙 의미 색(측정=teal / 주의=amber·red / 자문=violet)은 화면 정체성이라 고정.
import type { Severity } from './sample-data'

export const T = {
  page: '#F5F7F9',
  card: '#FFFFFF',
  ink: '#15202E',
  inkSoft: '#39434F',
  inkMuted: '#5A6573',
  hairline: '#E3E7EC',
  hairlineSoft: '#EEF1F4',
  // 측정/검증 = teal
  teal: '#0E7C7B',
  tealDeep: '#0A5F5E',
  tealTint: '#E5F1F0',
  // 주의 = amber, 심각 = red
  amber: '#B45309',
  amberTint: '#FBF1E4',
  red: '#B91C1C',
  redTint: '#FBEBEB',
  // 법령 자문 = violet
  violet: '#5B4FC4',
  violetTint: '#F1EFFB',
} as const

/** 키보드 포커스 가시성 공통 클래스 */
export const RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E7C7B]'

export const SEVERITY: Record<Severity, { dot: string; tint: string; label: string }> = {
  low: { dot: '#8A94A3', tint: '#EEF1F4', label: '낮음' },
  med: { dot: T.amber, tint: T.amberTint, label: '주의' },
  high: { dot: T.red, tint: T.redTint, label: '심각' },
}
