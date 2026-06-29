import type { Metadata } from 'next'
import './medpark.css'
import { Toolbar } from '@/components/medpark/doc/toolbar'
import { Cover } from '@/components/medpark/doc/cover'
import { SheetBackground } from '@/components/medpark/doc/sheet-background'
import { SheetPerspective } from '@/components/medpark/doc/sheet-perspective'
import { SheetStructure } from '@/components/medpark/doc/sheet-structure'
import { SheetResult } from '@/components/medpark/doc/sheet-result'
import { SheetClosing } from '@/components/medpark/doc/sheet-closing'
import { SheetAppendix } from '@/components/medpark/doc/sheet-appendix'

export const metadata: Metadata = {
  title: { absolute: '메드파크 사전과제 - 근태 자동화' },
  description: 'AI를 활용한 일일 근태현황 자동화 방안 (A4 보고서)',
  robots: { index: false, follow: false },
}

export default function MedparkAssignmentPage() {
  return (
    <div className="mpdoc" lang="ko">
      <Toolbar />
      <Cover />
      <SheetBackground />
      <SheetPerspective />
      <SheetStructure />
      <SheetResult />
      <SheetClosing />
      <SheetAppendix />
    </div>
  )
}
