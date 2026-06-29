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
  '3단계 - 자리비움 정밀 관리(전자결재 + 일정표) + 주 52시간 사전 경고. 더존이 근태 API를 지원하면 정해진 시각 API 자동 보고로 갈음(과거 KPIS에서 검증한 방식).',
]

export function SheetClosing() {
  return (
    <Sheet>
      <RHead right="05 · 장점과 도입 로드맵" />
      <section id="s05" className="sec">
        <SecHead n="05" title="장점과 도입 로드맵" />
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
      <RFoot page="5 / 7" />
    </Sheet>
  )
}
