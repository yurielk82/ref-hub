import { T } from './tokens'
import { SubHead, Para, Strong, Callout, BulletList, Li } from './prose'

function AntiPattern({
  n,
  title,
  body,
  answer,
}: {
  n: string
  title: string
  body: string
  answer: string
}) {
  return (
    <div
      className="mt-6 max-w-3xl rounded-2xl p-5 md:p-6"
      style={{
        background: T.card,
        border: `1px solid ${T.hairline}`,
        boxShadow: '0 1px 3px rgba(21,32,46,0.04)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[15px] font-extrabold"
          style={{ background: T.redTint, color: T.red }}
        >
          {n}
        </span>
        <h4 className="text-[18px] font-bold leading-snug" style={{ color: T.ink }}>
          {title}
        </h4>
      </div>
      <p className="mt-3 text-[16px] leading-[1.85]" style={{ color: T.inkSoft }}>
        {body}
      </p>
      <p
        className="mt-4 rounded-lg px-3.5 py-2.5 text-[15px] font-semibold leading-relaxed"
        style={{ background: T.tealTint, color: T.tealDeep }}
      >
        → {answer}
      </p>
    </div>
  )
}

export function ApproachSection() {
  return (
    <div>
      <SubHead>■ 핵심 관점 — “AI한테 다 맡기기”가 아닙니다</SubHead>
      <Para>
        근태 자동화라고 하면 흔히 “AI에게 시키자”고 생각하기 쉽습니다. 하지만 저는 반대로 봤습니다.
        이 문제의 <Strong>대부분은 오히려 AI를 쓰면 안 되는 영역</Strong>이고, AI를 잘못 갖다 대면
        더 부정확해집니다. AI는 딱 한 군데(법 판단 보조)에만 씁니다.
      </Para>
      <AntiPattern
        n="①"
        title="빠진 기록을 AI가 추측해서 채우면 안 됩니다."
        body="출석부에 학생이 사인을 안 했는데 선생님이 “쟤 온 것 같은데?” 하고 대신 사인하면, 그건 기록이 아니라 추측입니다. 근태도 같습니다. 직원이 출입 태그를 안 찍었거나 결재를 안 올렸을 때 AI가 “아마 외출이었겠지” 하고 채워 넣으면 그 기록은 가짜가 됩니다. 그 가짜 기록으로 월급과 주 52시간을 계산하게 되니, 분쟁이 나면 근거가 통째로 무너집니다."
        answer="AI가 메우는 것이 아니라, 사람이 직접 찍게 만드는 것입니다."
      />
      <AntiPattern
        n="②"
        title="계산을 AI한테 시키면 안 됩니다."
        body="엑셀 수작업은 숫자를 잘못 옮기거나 수식이 어긋나는 실수가 납니다. 그런데 이것을 생성형 AI에 맡기면 더 나빠집니다. AI는 같은 자료를 줘도 답이 매번 조금씩 달라질 수 있고(비결정적), 숫자 계산도 틀릴 수 있기 때문입니다. 월급·근로시간처럼 “항상 똑같이 정확해야 하는 계산”에는 부적합합니다."
        answer="정해진 계산 로직(파이썬과 데이터베이스 쿼리)이 계산하게 하는 것입니다. 같은 입력은 언제 돌려도 항상 같은 결과가 나오고(재현 가능), “이 숫자가 어떤 규칙·어떤 원본 기록에서 나왔는지”를 그대로 추적해 보여줄 수 있습니다."
      />
      <Callout title="역할 경계 — 누가 무엇을 정하는가" tone={T.ink} tint={T.hairlineSoft}>
        <p className="text-[16px] leading-[1.8]" style={{ color: T.inkSoft }}>
          오해를 막기 위해 경계를 분명히 합니다. <Strong>시스템은 사실을 만들지 않습니다.</Strong>
        </p>
        <BulletList>
          <Li>
            <Strong>사실 확정:</Strong> 출입·결재 기록은 사람이 찍고, 시간 합계·초과근무 같은 숫자는
            계산 로직이 냅니다.
          </Li>
          <Li>
            <Strong>이상 후보 제시:</Strong> “이건 평소와 다르니 봐야 한다”고 추려서 보여주는
            것까지가 시스템의 역할입니다. 판정이 아니라 후보 제시입니다.
          </Li>
          <Li>
            <Strong>최종 판정:</Strong> 무단결근인지, 징계 대상인지, 임금을 조정할지는 반드시 사람이
            정합니다.
          </Li>
        </BulletList>
        <p className="mt-4 text-[16px] leading-[1.8]" style={{ color: T.inkSoft }}>
          즉 시스템은 담당자가 들여다볼 대상을 좁혀 줄 뿐, 결론을 대신 내리지 않습니다.
        </p>
      </Callout>
    </div>
  )
}

const STAGES = [
  {
    n: '1',
    name: '기록',
    what: '출입·결재를 빠짐없이 남기기',
    who: '사람이 찍게 만든다 (AI 아님)',
    tone: T.teal,
  },
  {
    n: '2',
    name: '계산',
    what: '모아서 현황표로 정리',
    who: '계산 로직(파이썬·DB)이 한다 (AI 아님)',
    tone: T.ink,
  },
  {
    n: '3',
    name: '판단 보조',
    what: '법 위반 위험을 짚기 (법률MCP로 현행 법령 조회)',
    who: '여기만 AI가 돕는다',
    tone: T.violet,
  },
]

export function ThreeStageSection() {
  return (
    <div>
      <SubHead>■ 그래서 문제를 세 단계로 나눴습니다</SubHead>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {STAGES.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl p-5"
            style={{
              background: T.card,
              border: `1px solid ${T.hairline}`,
              borderTop: `3px solid ${s.tone}`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[13px] font-bold" style={{ color: s.tone }}>
                STEP {s.n}
              </span>
            </div>
            <h4 className="mt-1 text-[19px] font-extrabold" style={{ color: T.ink }}>
              {s.name}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: T.inkSoft }}>
              {s.what}
            </p>
            <p
              className="mt-3 text-[14.5px] font-semibold leading-relaxed"
              style={{ color: s.tone }}
            >
              {s.who}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
