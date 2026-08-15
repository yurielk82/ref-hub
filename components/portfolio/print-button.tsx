'use client'

import { Printer } from 'lucide-react'

/**
 * 인쇄/PDF 저장 — 채용 절차가 PDF 첨부를 요구하는 경우가 많아 별도 파일 대신
 * 브라우저 인쇄로 낸다. 인쇄용 레이아웃은 globals.css 의 `@media print` 가 담당한다.
 */
export function PrintButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-print-hide
      className={`inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 ${className}`}
    >
      <Printer className="h-4 w-4" />
      PDF로 저장
    </button>
  )
}
