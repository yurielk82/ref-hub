import { T } from './tokens'
import { SubHead, Para, Strong } from './prose'

const BENEFITS = [
  {
    title: '정확함',
    body: '근로기준법의 근로시간·휴게·연장근로 조항이나 관련 대법원 판례를 실제 원문 그대로 인용합니다. 지어낼 여지가 없습니다.',
  },
  {
    title: '항상 최신',
    body: '법이 개정되면 공식 데이터베이스가 갱신되고, 시스템은 자동으로 최신 기준을 따릅니다. 담당자가 법 개정을 따로 챙기지 않아도 됩니다.',
  },
  {
    title: '저렴함',
    body: '이 조회는 이상이 발견된 건에, 참고 설명을 붙일 때만 일어납니다. 매일 모든 직원을 AI로 돌리지 않으므로 운영비(API 토큰)가 거의 들지 않습니다.',
  },
]

function BenefitCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: T.violetTint, border: `1px solid ${T.violet}33` }}
    >
      <h4 className="text-[16px] font-extrabold" style={{ color: T.violet }}>
        {title}
      </h4>
      <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: T.inkSoft }}>
        {body}
      </p>
    </div>
  )
}

export function LegalMcpSection() {
  return (
    <div>
      <SubHead>■ AI가 정당하게 쓰이는 단 한 곳 — 법률MCP</SubHead>
      <Para>
        노동법은 복잡하고 자주 바뀝니다. 그래서{' '}
        <Strong>항상 최신 법전을 들고 있는 보조 변호사 역할</Strong>로 AI를 씁니다. 시스템이 “이
        직원, 이번 주 근무가 좀 이상한데?” 하고 표시하면, AI가 관련 법 조항을 짚어 위험을 설명해
        주는 식입니다.
      </Para>
      <Para>
        다만 한 가지가 중요합니다. <Strong>AI가 노동법을 외워서 답하게 두지 않습니다.</Strong>{' '}
        생성형 AI는 법 조항을 잘못 기억하거나 없는 조문을 지어내기도 하기 때문입니다(이른바 환각).
        그래서 법률MCP라는 방식을 씁니다. 쉽게 말해, AI가 답하기 전에{' '}
        <Strong>법제처의 공식 법령 데이터베이스에 실시간으로 직접 조회</Strong>하도록 연결하는
        장치입니다. AI는 자기 기억이 아니라 방금 조회한 현행 법령 원문을 근거로 설명합니다.
      </Para>
      <div className="mt-6 grid max-w-3xl gap-4 md:grid-cols-3">
        {BENEFITS.map((b) => (
          <BenefitCard key={b.title} title={b.title} body={b.body} />
        ))}
      </div>
      <Para>
        예를 들어 자리비움이 많은 직원이 잡히면, 법률MCP로 근로기준법 휴게시간 조항을 조회한 뒤
        “짧은 자리비움은 근무시간으로 인정되는 경우가 많으니, 이것으로 바로 월급을 깎으면 안 되고
        노무 검토가 필요합니다”라고 근거와 함께 알려 줍니다. 주 52시간이 걱정되는 직원에게는
        근로시간 조항과 위반 판단 기준(대법원 판례)을 함께 짚어 줍니다.
      </Para>
      <Para>
        다시 강조하면, 법률MCP는 <Strong>판단을 대신하지 않습니다.</Strong> 사람이 판단하도록 정확한
        법적 근거를 챙겨 주는 역할까지이며, 최종 결정은 담당자와 노무 담당자가 내립니다.
      </Para>
    </div>
  )
}
