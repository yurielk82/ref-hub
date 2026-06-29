import { Sheet, RHead, RFoot, SecHead } from './chrome'

const STAGES = [
  ['1차', '엑셀 수작업', '휴먼에러 큼'],
  ['2차', '엑셀 VBA(매크로)', '자동화는 됐으나 직원이 다루기 어려움'],
  ['3차', '스프레드시트 복사·붙여넣기로 단순화', '휴먼에러 작음'],
  ['4차', '웹 구현 · VPN으로 ERP 접속, 자동 계산 + 무결성 검증', '약 2분, 휴먼에러 없는 수준'],
  ['5차', 'ERP 새 API 지원 시, 정해진 시각 API 자동 보고로 갈음', '사람 개입 0'],
]

export function SheetBackground() {
  return (
    <Sheet>
      <RHead right="01 · 배경" />
      <section id="s01" className="sec">
        <SecHead n="01" title="이미 풀어 본 문제입니다" />
        <p>
          이 과제를 처음 봤을 때 든 생각은 “이건 제가 이미 구축해 운영 중인 <strong>KPIS</strong>와
          사실상 같은 문제”라는 것이었습니다. 그래서 아래는 가설이 아니라, 실제로 만들어 돌려 본
          경험을 근태에 옮기는 이야기입니다.
        </p>
        <p>
          KPIS는 ERP 값을 그대로 믿고 쓸 수 없어 담당자가 매번 엑셀로 손수 가공·검증하던
          업무였습니다. 이것을 다섯 단계에 걸쳐 사람 손과 실수를 걷어내며 자동화했습니다.
        </p>
        <table className="doc">
          <caption>표 1. KPIS 자동화 단계 — 현장 속도에 맞춰 단계적으로</caption>
          <thead>
            <tr>
              <th style={{ width: '48px' }}>단계</th>
              <th>방식</th>
              <th>결과</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map(([stage, how, note]) => (
              <tr key={stage}>
                <td className="km">{stage}</td>
                <td className="k">{how}</td>
                <td className="note">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          여기서 얻은 교훈은 둘입니다. 첫째, 자동화는 “한 번에 완성”이 아니라{' '}
          <strong>현장이 따라올 수 있는 속도로 단계를 밟아야</strong> 합니다(2차 VBA가 어려워
          3차에서 일부러 더 쉬운 방식으로 되돌린 경험이 그 증거). 둘째, 마지막 단계의 본질은 속도가
          아니라 <strong>무결성 검증</strong>입니다. 근태도 구조가 같습니다 — 원본(ADT캡스 출입·더존
          전자결재)을 <strong>자동으로 모아 → 룰로 무결성 검증 → 현황표로</strong> 뽑으면 됩니다.
        </p>
      </section>
      <RFoot page="2 / 7" />
    </Sheet>
  )
}
