import type { Metadata } from 'next'
import { PageNav } from '@/components/medpark/page-nav'
import { GreetingSection, SampleSection } from '@/components/medpark/sections'
import { AssignmentSection } from '@/components/medpark/assignment-section'

export const metadata: Metadata = {
  title: '메드파크 사전과제',
  description: 'AX 직무 사전과제 — 인사말 · 근태 자동화 설계(Q2) · 라이브 샘플',
  robots: { index: false, follow: false },
}

const INK = '#15202E'
const INK_MUTED = '#5A6573'
const HAIRLINE = '#E3E7EC'

export default function MedparkAssignmentPage() {
  return (
    <div
      lang="ko"
      className="min-h-dvh font-[family-name:var(--font-sans)]"
      style={{
        background: '#F5F7F9',
        color: INK,
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
    >
      <PageNav />
      <main className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
        <GreetingSection />
        <AssignmentSection />
        <SampleSection />
      </main>
      <footer style={{ borderTop: `1px solid ${HAIRLINE}` }}>
        <p
          className="mx-auto max-w-5xl px-5 py-8 text-[14px] leading-[1.8] md:px-8"
          style={{ color: INK_MUTED }}
        >
          본 페이지의 모든 직원명·사번·시각·수치는 100% 합성·가명 예시 데이터입니다. 실제 직원
          정보나 실데이터, 외부 시스템 실연동은 포함되어 있지 않습니다.
        </p>
      </footer>
    </div>
  )
}
