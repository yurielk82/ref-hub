import { T } from './tokens'
import { SubHead, Para, Strong, BulletList, Li } from './prose'

const CASES = [
  {
    no: '①',
    name: '결재와 출입기록이 다름',
    how: '두 기록을 자동 대조해 어긋난 건만 추려냄 → 직원이 직접 결재를 올려 바로잡게 함',
    tone: T.teal,
  },
  {
    no: '②',
    name: '출입·결재 둘 다 없음',
    how: '빈 곳을 자동 발견 → 즉시 본인에게 알림. “무단결근” 판정은 사람이',
    tone: T.teal,
  },
  {
    no: '③',
    name: '자리비움 과다',
    how: '자리 비운 시간을 자동 합산해 표시 (아래 설명)',
    tone: T.violet,
  },
  {
    no: '④',
    name: '초과근무 많음(주 52시간)',
    how: '실제 근무시간을 자동 합산해 52시간에 가까워지면 미리 경고',
    tone: T.violet,
  },
  {
    no: '⑤',
    name: '기타 이상',
    how: '평소와 다른 패턴(심야·주말 출입 등)을 자동 표시',
    tone: T.violet,
  },
]

export function OutputSection() {
  return (
    <div>
      <SubHead>■ 매일 나오는 결과물 — 근무현황표 (버튼 한 번)</SubHead>
      <Para>
        담당자가 지금 2~3시간씩 손으로 만들던 현황표가 <Strong>버튼 한 번에 몇 분 만에</Strong>{' '}
        나옵니다. 표에는 출퇴근 시각, 실제 근무시간, 초과근무, 자리비움 누적, 이상 표시가 들어가고,
        각 숫자가 어떤 규칙과 원본 기록에서 나왔는지도 함께 확인할 수 있습니다. KPIS에서처럼 표를
        엑셀로 바로 붙여넣는 복사 기능도 넣어, 보고서로 옮기는 작업까지 클릭 한 번으로 끝납니다.
      </Para>
      <Para>
        이 시스템이 실제로 어떻게 보이는지, 예시 화면을 함께 제출합니다. 화면은 세 부분으로
        구성됩니다.
      </Para>
      <BulletList>
        <Li>
          <Strong>특이사항 카드:</Strong> 그날 이상이 잡힌 직원들이 한눈에 카드로 뜹니다. 각
          카드에는 시스템이 자동 측정한 객관 기록(출입 시각)과 왜 특이한지가 표시됩니다.
        </Li>
        <Li>
          <Strong>셀프 정정(기안) 화면:</Strong> 카드를 누르면 해당 직원이 사유·유형을 골라 결재를
          올리는 화면이 열립니다. 출입 시각은 시스템이 채워(수정 불가) 두고, 직원은 사유만
          입력합니다.
        </Li>
        <Li>
          <Strong>법률MCP 안내:</Strong> 자리비움·초과근무처럼 법적 검토가 필요한 건에는, 법률MCP가
          조회한 현행 법령 근거와 주의사항이 함께 표시됩니다.
        </Li>
      </BulletList>
      <div className="mt-7">
        <a
          href="#sample"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[16px] font-semibold text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E7C7B] motion-reduce:transform-none"
          style={{ background: T.teal }}
        >
          → 예시 화면 보기 (이 페이지 아래)
        </a>
      </div>
      <CaseTableSection />
    </div>
  )
}

function CaseTableSection() {
  return (
    <div
      className="mt-8 max-w-3xl rounded-2xl p-5 md:p-6"
      style={{ background: T.hairlineSoft, border: `1px solid ${T.hairline}` }}
    >
      <div
        className="mb-4 inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-bold"
        style={{ background: T.ink, color: '#fff' }}
      >
        다섯 가지 이상 케이스는 이렇게 처리합니다
      </div>
      <div
        className="overflow-hidden rounded-xl"
        style={{ background: T.card, border: `1px solid ${T.hairline}` }}
      >
        {CASES.map((c, i) => (
          <div
            key={c.no}
            className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:gap-4"
            style={{ borderTop: i === 0 ? undefined : `1px solid ${T.hairline}` }}
          >
            <span className="shrink-0 text-[15px] font-bold sm:w-44" style={{ color: c.tone }}>
              {c.no} {c.name}
            </span>
            <span className="flex-1 text-[15px] leading-relaxed" style={{ color: T.inkSoft }}>
              {c.how}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[15px] leading-relaxed" style={{ color: T.inkSoft }}>
        세 단계 모두, 시스템은 추려서 보여줄 뿐 <Strong>판정은 사람이 합니다</Strong>(앞의 역할
        경계).
      </p>
    </div>
  )
}
