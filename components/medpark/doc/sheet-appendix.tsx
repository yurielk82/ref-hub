import { Sheet, RHead, RFoot } from './chrome'
import { AppendixSample } from './appendix'

export function SheetAppendix() {
  return (
    <Sheet>
      <RHead right="예시 화면" />
      <section id="sap" className="sec">
        <div className="sechd">
          <div className="n">별첨</div>
          <h2>예시 화면 - 특이사항 처리 흐름</h2>
        </div>
        <p style={{ marginTop: 0 }}>
          왼쪽 카드를 누르면 오른쪽 처리 화면이 바뀝니다. 데이터는 세 갈래로 구분됩니다 -{' '}
          <strong style={{ color: 'var(--ac)' }}>측정(시스템 자동·잠금)</strong> ·{' '}
          <strong>선언(본인 작성)</strong> ·{' '}
          <strong style={{ color: 'var(--warn)' }}>자문(법령 참고)</strong>. 모든 값은 가상의
          예시입니다.
        </p>
        <div className="legend">
          <span style={{ color: 'var(--ac)' }}>🔒 측정 (시스템 자동·수정 불가)</span>
          <span style={{ color: 'var(--ink)' }}>✎ 선언 (본인 작성)</span>
          <span style={{ color: 'var(--warn)' }}>⚖ 자문 (법령 참고·자동판정 아님)</span>
        </div>
        <AppendixSample />
        <p className="fcap">
          그림 1. 특이사항 카드 → 본인 정정(입력형) / 관리자 검토(분석형) 흐름. 측정값은 잠금,
          사유는 본인 작성, 법령은 참고용.
        </p>
      </section>
      <RFoot page="7 / 7" label="본 페이지의 직원명·사번·시각·수치는 100% 합성·가명 예시입니다." />
    </Sheet>
  )
}
