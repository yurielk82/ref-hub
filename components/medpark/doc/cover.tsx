import { Sheet, RFoot } from './chrome'

const TOC = [
  { n: '01', t: '핵심 관점 - AI에 다 맡기지 않습니다', href: '#s01' },
  { n: '02', t: '문제를 세 단계로 나눴습니다', href: '#s02' },
  { n: '03', t: 'AI가 정당하게 쓰이는 단 한 곳 - 법률MCP', href: '#s03' },
  { n: '04', t: '매일의 결과물 - 근무현황표', href: '#s04' },
  { n: '05', t: '장점과 도입 로드맵', href: '#s05' },
  { n: '06', t: '직접 구축·운영한 KPIS 경험', href: '#s06' },
  { n: '07', t: '마무리 의견', href: '#s07' },
  { n: '별첨', t: '예시 화면 - 특이사항 처리 흐름', href: '#sap' },
]

function Summary() {
  return (
    <div className="summary">
      <div className="lab">핵심 요약</div>
      <ol>
        <li>
          <span>
            <strong>기록은 사람이, 계산은 로직이.</strong> 빠진 출입·결재는 본인이 당일 직접
            채우고(AI가 추측 금지), 시간·초과근무 계산은 정해진 로직(파이썬·DB)이 합니다. 같은
            입력은 늘 같은 결과.
          </span>
        </li>
        <li>
          <span>
            <strong>AI는 단 한 곳, 법 판단 보조.</strong> 법률MCP로 법제처 현행 법령을 실시간 조회해
            근거를 붙입니다 - 판정이 아니라 근거 제시까지.
          </span>
        </li>
        <li>
          <span>
            <strong>담당자의 하루 2~3시간 → 버튼 한 번 몇 분.</strong> 1단계는 더존 자료만으로 즉시
            적용 가능하고, 이후 API 연동·실시간 알림으로 확장합니다.
          </span>
        </li>
      </ol>
    </div>
  )
}

function Toc() {
  return (
    <nav className="toc">
      {TOC.map((e) => (
        <a key={e.href} href={e.href}>
          <span className="tn">{e.n}</span>
          <span className="tt">{e.t}</span>
          <span className="dots" />
        </a>
      ))}
    </nav>
  )
}

export function Cover() {
  return (
    <Sheet>
      <div className="cover">
        <div className="kicker">메드파크 사전과제</div>
        <h1>
          AI를 활용한
          <br />
          일일 근태현황 자동화 방안
        </h1>
        <div className="meta">
          지원 직무 <b>AX</b> &nbsp;·&nbsp; 제출 <b className="mono">2026.06</b>
        </div>
        <div className="rule" />
        <p className="thesis">
          결론부터 말씀드립니다. 이 문제의 <strong>대부분은 AI를 쓰면 안 되는 영역</strong>이며,
          AI는 단 한 곳(법 판단 보조)에만 사용합니다. 이 방안은 구조가 비슷한 시스템(KPIS)을 직접
          구축·운영해 본 경험에서 나왔습니다(근거는 06장).
        </p>
        <Summary />
        <Toc />
        <div className="q1">
          <span className="t">
            <b>Q1.</b> AI 기반 업무 시스템 구축·운영 - 별도 포트폴리오로 갈음합니다.
          </span>
          <a href="https://ref.dvsharp.com" target="_blank" rel="noopener noreferrer">
            포트폴리오 ↗
          </a>
        </div>
      </div>
      <RFoot page="1 / 7" />
    </Sheet>
  )
}
