import type { ReactNode } from 'react'
import { T } from './tokens'
import { Strong } from './prose'

function BoxedSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      className="mt-8 max-w-3xl rounded-2xl p-5 md:p-6"
      style={{
        background: T.card,
        border: `1px solid ${T.hairline}`,
        boxShadow: '0 1px 3px rgba(21,32,46,0.04)',
      }}
    >
      <div
        className="mb-4 inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-bold"
        style={{ background: T.teal, color: '#fff' }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function Box({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[16px] leading-[1.85]" style={{ color: T.inkSoft }}>
      {children}
    </p>
  )
}

const FLOW = [
  {
    n: '1',
    t: '시스템이 먼저 발견',
    b: '출입·결재가 비거나 어긋난 건을 그날(또는 실시간으로) 자동으로 찾아냅니다. 담당자가 일일이 대조할 필요가 없습니다.',
  },
  {
    n: '2',
    t: '본인에게 즉시 알림',
    b: '해당 직원에게 “오늘 14:00~15:30 자리비움이 사유 없이 잡혔습니다. 회의였나요? 외근이었나요?” 하고 그 자리에서 물어봅니다.',
  },
  {
    n: '3',
    t: '본인이 직접 정정',
    b: '직원은 시스템이 보여 주는 객관적 출입 시각(시스템이 채운, 수정 불가) 위에, 사유와 근태 유형만 골라 결재를 올립니다. 시스템이 사유를 대신 추측하지 않습니다(앞의 ① 원칙).',
  },
  {
    n: '4',
    t: '마감',
    b: '그날 안에 정리되므로, 다음 날 담당자가 들여다볼 “미해결 건”이 거의 남지 않습니다.',
  },
]

export function SelfCorrectSection() {
  return (
    <BoxedSection title="빠진 기록은 “사후 변명”이 아니라 “당일 셀프 정정”으로">
      <Box>
        오해를 막고 싶은 부분이 있습니다. 이 시스템은{' '}
        <Strong>직원이 나중에 사유서를 제출해 무마하는 사후 보고 도구가 아닙니다.</Strong> 반대로,
        빈 곳이 생긴 그 순간 직원 본인이 바로 채우게 만드는 구조입니다.
      </Box>
      <ol className="mt-4 space-y-3">
        {FLOW.map((f) => (
          <li key={f.n} className="flex items-start gap-3.5">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[14px] font-extrabold text-white"
              style={{ background: T.teal }}
            >
              {f.n}
            </span>
            <p className="text-[15.5px] leading-[1.8]" style={{ color: T.inkSoft }}>
              <Strong>{f.t}:</Strong> {f.b}
            </p>
          </li>
        ))}
      </ol>
      <Box>
        즉 <Strong>기억이 생생한 당일에, 본인이, 한 번에</Strong> 끝냅니다. 시간이 지나 “그때
        뭐였더라” 하며 사후에 끼워 맞추는 일이 사라지고, 기록의 정확성도 올라갑니다.
      </Box>
    </BoxedSection>
  )
}

export function IdleSection() {
  return (
    <BoxedSection title="특히 “자리비움”은 이렇게 봅니다">
      <Box>
        지문리더기는 출퇴근뿐 아니라 근무 중 구역을 이동할 때마다 출입 시각을 기록합니다. 이
        기록으로 근무시간(예: 9~18시) 중에 나간 시각부터 다시 들어온 시각까지를 자리 비운 시간으로
        계산합니다.
      </Box>
      <Box>
        여기서 점심시간을 빼고, 정당한 사유가 있는 시간도 뺍니다. 사유는 두 군데서 확인합니다.
        반차·외출·조퇴처럼 결재가 필요한 것은 <Strong>전자결재</Strong>로, 잠깐의 회의·외근처럼
        가벼운 것은 <Strong>일정표(캘린더)</Strong>로 확인합니다. 결재까지 올리기 번거로운 일정은
        캘린더에 적어 두기만 해도 자리비움에서 빠지므로, 직원도 번거롭지 않고 정상 업무를
        자리비움으로 잘못 잡는 일도 줄어듭니다.
      </Box>
      <Box>
        이렇게 빼고 남은 시간이 “그냥 자리비움”이고, 하루나 한 주에 일정 기준(예: 30분)을 넘기면
        표에 표시합니다.
      </Box>
      <Box>
        이 방식의 핵심은 <Strong>“고충을 없애는 것”</Strong>입니다. 지금 인사팀은 이상 근태가 보이면
        자리비움 여부를 일일이 수기로 확인해야 합니다. 가장 큰 고충이 바로 이 부분입니다. 출입 구역
        단위로 자리비움을 자동 집계하면, 그 수기 확인 자체가 대부분 사라집니다. 다만 구역 안에서의
        미세한 이탈(같은 층에서 오래 자리를 비우는 등)까지는 출입 기록만으로 잡히지 않으므로, 그
        부분은 애초에 모두 잡으려 하기보다 <Strong>“관리할 기준”을 회사가 먼저 정하는 문제</Strong>
        로 봐야 합니다. 그리고 이 표시는 <Strong>참고용 경고까지</Strong>입니다. 짧게 자리를 비운
        것까지 근무시간으로 인정하는 것이 법이기 때문에, 바로 월급을 깎는 용도가 아니라 담당자가
        들여다볼 대상을 골라 주는 역할입니다(이때 법률MCP가 법적 주의사항을 함께 띄워 줍니다).
      </Box>
    </BoxedSection>
  )
}
