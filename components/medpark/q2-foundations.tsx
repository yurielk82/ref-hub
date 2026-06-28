import { T } from './tokens'
import { SubHead, Para, Strong, BulletList, Li } from './prose'

const EVOLUTION = [
  { stage: '1차', what: '엑셀 수작업', note: '휴먼에러 큼' },
  { stage: '2차', what: '엑셀 VBA(매크로)', note: '자동화는 됐으나 직원들이 다루기 어려움' },
  { stage: '3차', what: '스프레드시트 복사·붙여넣기로 가능하게 단순화', note: '휴먼에러 작음' },
  {
    stage: '4차',
    what: '웹으로 구현, VPN으로 ERP에 접속해 자동 계산 + 무결성 검증',
    note: '처음부터 끝까지 약 2분, 휴먼에러 없는 수준',
  },
  {
    stage: '5차',
    what: 'ERP가 새 API를 지원하면 정해진 시각에 API 자동 보고로 갈음',
    note: '사람 개입 0 (※ 구버전 API는 위탁창고 ERP에서 계속 사용 중)',
  },
]

function EvolutionTable() {
  return (
    <div
      className="mt-6 max-w-3xl overflow-hidden rounded-2xl"
      style={{ background: T.card, border: `1px solid ${T.hairline}` }}
    >
      {EVOLUTION.map((r) => (
        <div
          key={r.stage}
          className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
          style={{ borderTop: r.stage === '1차' ? undefined : `1px solid ${T.hairline}` }}
        >
          <span
            className="shrink-0 font-mono text-[14px] font-bold sm:w-10"
            style={{ color: T.teal }}
          >
            {r.stage}
          </span>
          <span
            className="flex-1 text-[15.5px] font-medium leading-relaxed"
            style={{ color: T.ink }}
          >
            {r.what}
          </span>
          <span
            className="text-[13.5px] leading-relaxed sm:w-56 sm:text-right"
            style={{ color: T.inkMuted }}
          >
            {r.note}
          </span>
        </div>
      ))}
    </div>
  )
}

export function BackgroundSection() {
  return (
    <div>
      <SubHead>■ 시작하며 — 같은 문제를 이미 풀어 본 적이 있습니다</SubHead>
      <Para>
        이 과제를 처음 봤을 때 든 생각은 “이건 제가 이미 구축해 운영 중인 KPIS와 사실상 같은
        문제”라는 것이었습니다. 그래서 아래 설명은 가설이 아니라, 실제로 만들어 돌려 본 경험을
        근태에 옮기는 이야기입니다.
      </Para>
      <Para>
        KPIS는 단순히 “흩어진 데이터를 모으는” 시스템이 아닙니다. 시작은 ERP가 그대로 믿고 쓸 수
        있는 값을 주지 못해, 담당자가 매번 엑셀로 손수 가공·검증하던 업무였습니다. 이것을 다섯
        단계에 걸쳐 사람 손과 실수를 걷어내며 자동화했고, 그 과정에서 무엇이 통하고 무엇이 안
        통하는지를 직접 겪었습니다.
      </Para>
      <EvolutionTable />
      <Para>
        이 이력에서 얻은 교훈은 두 가지입니다. 첫째, 자동화는 “한 번에 완성”이 아니라{' '}
        <Strong>현장이 따라올 수 있는 속도로 단계를 밟아 올려야 한다</Strong>는 것입니다. 2차 VBA가
        어려워 3차에서 일부러 더 쉬운 방식으로 되돌린 경험이 그 증거입니다. 둘째, 마지막 단계의
        본질은 속도가 아니라 <Strong>무결성 검증</Strong>입니다. ERP 값을 그대로 믿지 않고 시스템이
        한 번 더 교차 검증해, “사람이 손대지 않아도 항상 맞는 숫자”를 만들었습니다.
      </Para>
      <Para>
        근태현황도 구조가 같습니다. ADT캡스 출입 기록과 더존 전자결재라는 원본은 있지만, 그대로는
        담당자가 매일 2~3시간씩 손으로 대조·검증해야 합니다. KPIS에서 이미 검증한 방식 —{' '}
        <Strong>원본을 자동으로 모아 → 규칙(룰)으로 무결성 검증 → 현황표로 뽑기</Strong> — 을 그대로
        옮기면 됩니다.
      </Para>
    </div>
  )
}

export function PracticeSection() {
  return (
    <div>
      <SubHead>■ 실무에서 배운 것 — 결국 “쓰게 만드는” 디테일</SubHead>
      <Para>
        시스템을 아무리 잘 만들어도 담당자가 매일 쓰지 않으면 의미가 없습니다. 그래서 큰
        구조만큼이나 클릭 한 번, 몇 초를 줄이는 디테일에 집중했고, 실무진이 가장 좋아한 것도 이런
        부분이었습니다.
      </Para>
      <BulletList>
        <Li>
          <Strong>2클릭을 1클릭으로.</Strong> 늘 함께 쓰는 두 파일(예: 갑지·을지)을 따로 두 번 받지
          않고 한 번에 다운로드되게 했습니다.
        </Li>
        <Li>
          <Strong>반복 작업 2분을 3초로.</Strong> CSO 프로젝트와 KPI 전략기획 프로젝트에서는, 표를
          엑셀·CSV로 내려받는 기능에 더해 “복사” 버튼 하나로 엑셀에 바로 붙여넣는 기능을 넣었습니다.
          다운로드하고, 열고, 범위를 지정하고, 복사하던, 체감상 2분 가까이 걸리던 일이 버튼 한 번에
          끝납니다.
        </Li>
      </BulletList>
      <Para>
        여기서 얻은 원칙은 분명합니다. 자동화의 성패는 기술 수준이 아니라,{' '}
        <Strong>실무자가 매일 쓸 만큼 번거로움을 줄였는가</Strong>에서 갈립니다. 근태 시스템도 같은
        기준으로 설계했습니다.
      </Para>
    </div>
  )
}
