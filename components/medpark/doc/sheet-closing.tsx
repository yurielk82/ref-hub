import { Sheet, RHead, RFoot, SecHead } from './chrome'

const BENEFITS = [
  ['빠름', '2~3시간 → 몇 분'],
  ['정확함', '계산 실수가 구조적으로 사라짐(계산은 파이썬·DB 전담, 같은 입력은 늘 같은 결과)'],
  ['저렴함', 'AI를 매일 돌리지 않아 운영비(토큰) 거의 없음'],
  ['법적으로 안전함', '기록은 본인이, 법 판단은 현행 법령 근거와 함께 사람이'],
  ['쓰기 쉬움', '클릭 한 번·몇 초까지 번거로움을 줄여 실제로 매일 쓰게 만듦'],
]

const ROADMAP = [
  '1단계 (바로 가능) - 더존 자료를 내려받아(엑셀/CSV) 파이썬으로 현황표 자동 생성. 연동 권한을 협의하는 동안에도 즉시 2~3시간을 회수하는 임시 단계.',
  '2단계 - 시스템 간 API 자동 연동 + 빠진 기록 실시간 알림 + 결과를 웹 화면에서 조회.',
  '3단계 - 자리비움 정밀 관리(전자결재 + 일정표) + 주 52시간 사전 경고. 더존이 근태 API를 지원하면 정해진 시각 API 자동 보고로 갈음(KPIS 5차와 동일 패턴).',
]

export function SheetClosing() {
  return (
    <Sheet>
      <RHead right="06-07 · 로드맵과 마무리" />
      <section id="s06" className="sec">
        <SecHead n="06" title="장점과 도입 로드맵" />
        <ul className="li">
          {BENEFITS.map(([k, v]) => (
            <li key={k}>
              <span>
                <strong>{k}</strong> - {v}
              </span>
            </li>
          ))}
        </ul>
        <div className="road">
          {ROADMAP.map((r) => {
            const [head, ...rest] = r.split(' - ')
            return (
              <div className="r" key={head}>
                <span className="num" />
                <p>
                  <strong>{head}</strong> - {rest.join(' - ')}
                </p>
              </div>
            )
          })}
        </div>
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
