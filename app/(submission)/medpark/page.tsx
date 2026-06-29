import type { Metadata } from 'next'
import './medpark.css'
import { MedparkNav } from '@/components/medpark/doc/nav'
import { Cover } from '@/components/medpark/doc/cover'
import { Section01, Section02, Section03, Section04 } from '@/components/medpark/doc/sections-core'
import { Section05, Section06, Section07, Section08 } from '@/components/medpark/doc/sections-flow'
import { Section09, Section10, Section11 } from '@/components/medpark/doc/sections-impact'
import { AppendixSection } from '@/components/medpark/doc/appendix-section'

export const metadata: Metadata = {
  title: '메드파크 사전과제 - 근태 자동화',
  description: 'AI를 활용한 일일 근태현황 자동화 방안',
  robots: { index: false, follow: false },
}

export default function MedparkAssignmentPage() {
  return (
    <div className="mpdoc" lang="ko">
      <MedparkNav />
      <main className="mpmain">
        <Cover />
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
        <Section06 />
        <Section07 />
        <Section08 />
        <Section09 />
        <Section10 />
        <Section11 />
        <AppendixSection />
      </main>
    </div>
  )
}
