import { Sheet, RHead, RFoot, SecHead } from './chrome'

const STEPS = [
  ['STEP 1', '기록', '출입·결재를 빠짐없이 남기기', '사람이 찍게 만든다'],
  ['STEP 2', '계산', '모아서 현황표로 정리', '계산 로직(파이썬·DB)'],
  ['STEP 3', '판단 보조', '법 위반 위험을 짚기', '여기만 AI가 돕는다'],
]

export function SheetStructure() {
  return (
    <Sheet>
      <RHead right="03–04 · 구조와 법률MCP" />
      <section id="s03" className="sec">
        <SecHead n="03" title="문제를 세 단계로 나눴습니다" />
        <div className="steps">
          {STEPS.map(([k, name, w, who]) => (
            <div className="s" key={k}>
              <div className="k">{k}</div>
              <h4>{name}</h4>
              <p className="w">{w}</p>
              <p className="who">{who}</p>
            </div>
          ))}
        </div>
        <p>STEP 1·2에는 AI가 들어가지 않습니다. AI는 오직 STEP 3, 법 판단 보조에만 쓰입니다.</p>
      </section>

      <section id="s04" className="sec">
        <SecHead n="04" title="AI가 정당하게 쓰이는 단 한 곳 — 법률MCP" />
        <p>
          노동법은 복잡하고 자주 바뀝니다. 그래서 <strong>항상 최신 법전을 든 보조 변호사</strong>{' '}
          역할로 AI를 씁니다. 시스템이 “이 직원, 이번 주 근무가 이상한데?” 하고 표시하면 AI가 관련
          조항을 짚어 위험을 설명합니다.
        </p>
        <p>
          중요한 전제가 있습니다. <strong>AI가 노동법을 외워서 답하게 두지 않습니다.</strong> 생성형
          AI는 조항을 잘못 기억하거나 없는 조문을 지어내기도 하기 때문입니다(환각). 법률MCP는 AI가
          답하기 전에 <strong>법제처 공식 법령 데이터베이스에 실시간으로 직접 조회</strong>하도록
          연결하는 장치입니다. AI는 자기 기억이 아니라 방금 조회한 현행 법령 원문을 근거로
          설명합니다.
        </p>
        <ul className="li">
          <li>
            <span>
              <strong>정확함</strong> — 근로기준법 조항·대법원 판례를 원문 그대로 인용합니다. 지어낼
              여지가 없습니다.
            </span>
          </li>
          <li>
            <span>
              <strong>항상 최신</strong> — 법이 개정되면 공식 DB가 갱신되고, 시스템은 자동으로 최신
              기준을 따릅니다.
            </span>
          </li>
          <li>
            <span>
              <strong>저렴함</strong> — 이상이 발견된 건에만 조회합니다. 매일 모든 직원을 AI로
              돌리지 않아 운영비(토큰)가 거의 없습니다.
            </span>
          </li>
        </ul>
        <p>
          다시 강조하면, 법률MCP는 <strong>판단을 대신하지 않습니다.</strong> 사람이 판단하도록
          정확한 법적 근거를 챙겨 주는 역할까지이며, 최종 결정은 담당자와 노무가 내립니다.
        </p>
      </section>
      <RFoot page="4 / 7" />
    </Sheet>
  )
}
