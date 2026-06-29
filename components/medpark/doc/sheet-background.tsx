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
      <RHead right="06-07 · 실제 경험과 마무리" />
      <section id="s06" className="sec">
        <SecHead n="06" title="이건 가설이 아닙니다 - 실제 경험" />
        <p>
          앞의 설계는 책상에서 그린 그림이 아닙니다. 제가 이미 구축해 운영 중인{' '}
          <strong>KPIS</strong>가 사실상 같은 구조의 문제였고, 지금까지의 방안은 그 경험을 근태에
          그대로 옮긴 것입니다.
        </p>
        <p>
          KPIS는 ERP 값을 그대로 믿고 쓸 수 없어 담당자가 매번 엑셀로 손수 가공·검증하던
          업무였습니다. 이것을 다섯 단계에 걸쳐 사람 손과 실수를 걷어내며 자동화했습니다.
        </p>
        <table className="doc">
          <caption>표 1. KPIS 자동화 단계 - 현장 속도에 맞춰 단계적으로</caption>
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
          이 과정에서 두 가지를 배웠습니다. 첫째, 자동화는 한 번에 완성되는 것이 아니라{' '}
          <strong>현장이 소화할 수 있는 속도에 맞춰 단계적으로</strong> 진행해야 한다는 점입니다.
          2차의 VBA 방식이 직원들에게 어려워, 3차에서는 오히려 더 단순한 방식으로 되돌리기도
          했습니다. 둘째, 마지막 단계의 핵심은 속도가 아니라 <strong>무결성 검증</strong>이라는
          점입니다. 근태도 구조는 같습니다 - 원본 기록(ADT캡스 출입·더존 전자결재)을 자동으로 모아
          정해진 규칙으로 무결성을 검증한 뒤, 현황표로 정리하면 됩니다.
        </p>
      </section>

      <section id="s07" className="sec">
        <SecHead n="07" title="마무리 의견" />
        <p>
          앞의 시스템은 “근태를 정확하고 빠르게 파악한다”는 당면 문제의 답입니다. 여기에 한 가지
          관점을 덧붙입니다.
        </p>
        <p>
          근태 관리의 방식은 결국 회사가 정하는 기조입니다. 전통적으로는 “같은 시각에 와서 같은
          시간을 채웠는가”를 봅니다. 다만 정해진 업무량을 각자의 속도로 처리하는 사무·기획
          직무에서는, <strong>들인 시간보다 맡은 일을 해냈는가</strong>를 함께 보는 것이 더 맞을 수
          있습니다(반면 생산·현장 직무는 시간 기반 관리가 여전히 적합합니다).
        </p>
        <p>
          어느 방향이든 전제는 하나입니다.{' '}
          <strong>기준이 먼저 서야 하고, 기준을 재려면 정확한 측정이 먼저 있어야</strong> 합니다.
          그래서 이 시스템은 두 의미를 가집니다 - 지금의 시간 기반 관리를 자동화·정확화하는 답인
          동시에, <strong>회사가 향후 어떤 근태 기조를 택하더라도 그 판단의 정확한 토대</strong>가
          됩니다.
        </p>
      </section>
      <RFoot page="6 / 7" />
    </Sheet>
  )
}
