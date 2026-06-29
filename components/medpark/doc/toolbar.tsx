'use client'

export function Toolbar() {
  const print = () => window.print()
  return (
    <div className="toolbar">
      <button type="button" onClick={print} title="인쇄">
        ⎙ 인쇄
      </button>
      <button type="button" className="primary" onClick={print} title="PDF로 저장">
        ↓ PDF 저장
      </button>
    </div>
  )
}
