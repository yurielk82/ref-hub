import { T } from './tokens'
import { SubHead, Para, Strong, BulletList, Li } from './prose'

const ROLLOUT = [
  {
    n: '1',
    label: '1단계 (바로 가능)',
    body: '더존 자료를 내려받아(엑셀/CSV) 파이썬으로 현황표를 자동 생성. 시스템 간 연동 권한을 협의하는 동안에도 즉시 2~3시간을 회수하는 임시 단계입니다. (KPIS도 같은 이유로 초기엔 복사·붙여넣기 방식부터 시작했습니다.)',
  },
  {
    n: '2',
    label: '2단계',
    body: '시스템 간 API 자동 연동 + 빠진 기록 실시간 알림 + 결과를 웹 화면(프론트엔드)에서 조회.',
  },
  {
    n: '3',
    label: '3단계',
    body: '자리비움 정밀 관리(전자결재 + 일정표 함께 반영) + 주 52시간 사전 경고. 더존이 근태 API를 지원하면 정해진 시각의 API 자동 보고로 갈음합니다(KPIS 5차와 동일 패턴).',
  },
]

export function BenefitsSection() {
  return (
    <div>
      <SubHead>■ 이 방식의 장점</SubHead>
      <BulletList>
        <Li>
          <Strong>빠름:</Strong> 2~3시간 → 몇 분
        </Li>
        <Li>
          <Strong>정확함:</Strong> 사람·AI의 계산 실수가 구조적으로 사라짐 (계산은 파이썬·DB 전담,
          같은 입력은 늘 같은 결과)
        </Li>
        <Li>
          <Strong>저렴함:</Strong> AI를 매일 돌리지 않아 운영비(토큰)가 거의 없음
        </Li>
        <Li>
          <Strong>법적으로 안전함:</Strong> 기록은 본인이 남기고, 법 판단은 법률MCP가 조회한 현행
          법령 근거와 함께 사람이 내림
        </Li>
        <Li>
          <Strong>잘 쓰임:</Strong> 클릭 한 번·몇 초 단위까지 번거로움을 줄여 담당자가 실제로 매일
          쓰게 만듦
        </Li>
      </BulletList>
    </div>
  )
}

export function RolloutSection() {
  return (
    <div>
      <SubHead>■ 도입은 단계적으로</SubHead>
      <ol className="mt-5 max-w-3xl space-y-3">
        {ROLLOUT.map((r) => (
          <li
            key={r.n}
            className="flex items-start gap-4 rounded-xl p-4"
            style={{ background: T.card, border: `1px solid ${T.hairline}` }}
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[15px] font-extrabold text-white"
              style={{ background: T.teal }}
            >
              {r.n}
            </span>
            <p className="text-[15.5px] leading-[1.8]" style={{ color: T.inkSoft }}>
              <Strong>{r.label}</Strong> — {r.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ClosingSection() {
  return (
    <div>
      <SubHead>■ 마무리 의견 — 근태 관리의 방향에 대하여</SubHead>
      <Para>
        앞의 시스템은 “근태를 정확하고 빠르게 파악한다”는 당면 문제의 답입니다. 여기에 한 가지
        관점을 덧붙이고자 합니다.
      </Para>
      <Para>
        근태 관리의 방식은 결국 회사가 정하는 기조입니다. 전통적으로는 “같은 시각에 와서 같은 시간을
        채웠는가”를 봅니다. 다만 직무에 따라서는, 특히 정해진 업무량을 각자의 속도로 처리하는
        사무·기획 직무에서는, <Strong>들인 시간보다 맡은 일을 해냈는가</Strong>를 함께 보는 것이 더
        맞을 수 있습니다. (반면 생산·현장 직무는 시간 기반 관리가 여전히 적합합니다.)
      </Para>
      <Para>
        회사가 어느 방향을 택하든, 공통 전제는 하나입니다.{' '}
        <Strong>기준이 먼저 서야 하고, 그 기준을 재려면 정확한 측정이 먼저 있어야 한다</Strong>는
        것입니다. 자리비움을 “몇 분부터 관리할지” 기준을 정해야 측정이 시작되는 것과 같습니다.
      </Para>
      <Para>
        그래서 이번 과제의 시스템은 두 가지 의미를 가집니다. 지금의 시간 기반 관리를
        자동화·정확화하는 답인 동시에,{' '}
        <Strong>회사가 향후 어떤 근태 기조를 택하더라도 그 판단의 정확한 토대</Strong>가 되어 준다는
        것입니다.
      </Para>
    </div>
  )
}
