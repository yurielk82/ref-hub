import { SectionHead } from './section-head'
import { T } from './tokens'

function LayerCard({
  index,
  title,
  body,
  accent,
  tint,
  verdict,
}: {
  index: string
  title: string
  body: string
  accent: string
  tint: string
  verdict: string
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: T.card,
        border: `1px solid ${T.hairline}`,
        boxShadow: '0 1px 3px rgba(21,32,46,0.04)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 place-items-center rounded-lg text-[15px] font-extrabold"
          style={{ background: tint, color: accent }}
        >
          {index}
        </span>
        <h3 className="text-[19px] font-bold" style={{ color: T.ink }}>
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[16px] leading-[1.8]" style={{ color: T.inkSoft }}>
        {body}
      </p>
      <p
        className="mt-4 rounded-lg px-3 py-2 text-[14.5px] font-semibold"
        style={{ background: tint, color: accent }}
      >
        {verdict}
      </p>
    </div>
  )
}

function CaseRow({ no, what, how, tone }: { no: string; what: string; how: string; tone: string }) {
  return (
    <tr style={{ borderTop: `1px solid ${T.hairline}` }}>
      <td className="px-4 py-3.5 align-top text-[15px] font-bold" style={{ color: T.ink }}>
        {no}
      </td>
      <td
        className="px-4 py-3.5 align-top text-[15px] leading-relaxed"
        style={{ color: T.inkSoft }}
      >
        {what}
      </td>
      <td className="px-4 py-3.5 align-top text-[14.5px] font-semibold" style={{ color: tone }}>
        {how}
      </td>
    </tr>
  )
}

function CaseTable() {
  return (
    <div
      className="mt-5 overflow-hidden rounded-2xl"
      style={{ background: T.card, border: `1px solid ${T.hairline}` }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: T.hairlineSoft }}>
            <th className="px-4 py-3 text-left text-[13px] font-bold" style={{ color: T.inkMuted }}>
              유형
            </th>
            <th className="px-4 py-3 text-left text-[13px] font-bold" style={{ color: T.inkMuted }}>
              무엇을
            </th>
            <th className="px-4 py-3 text-left text-[13px] font-bold" style={{ color: T.inkMuted }}>
              처리 방식
            </th>
          </tr>
        </thead>
        <tbody>
          <CaseRow
            no="① 결재 ↔ 출입 불일치"
            what="외출 결재 없이 자리를 비운 경우"
            how="입력 강제 (본인 기안)"
            tone={T.teal}
          />
          <CaseRow
            no="② 기록 둘 다 없음"
            what="출입·결재가 모두 없는 경우"
            how="입력 강제 (본인 확인)"
            tone={T.teal}
          />
          <CaseRow
            no="③ 자리비움 과다"
            what="미승인 이탈이 임계 초과"
            how="자동 분석 (모니터링)"
            tone={T.violet}
          />
          <CaseRow
            no="④ 주 52시간 임박"
            what="주간 한도에 근접"
            how="자동 분석 (사전 경고)"
            tone={T.violet}
          />
          <CaseRow
            no="⑤ 기타 이상 (심야·휴일)"
            what="평소 패턴을 벗어난 출입"
            how="자동 분석 (검토)"
            tone={T.violet}
          />
        </tbody>
      </table>
    </div>
  )
}

function StepList() {
  const steps = [
    {
      n: '1',
      when: '즉시',
      body: '회계·인사 프로그램 자료를 받아 근무현황표를 자동으로 만듭니다.',
    },
    { n: '2', when: '다음', body: '실시간 알림과 결재 경로를 붙입니다.' },
    { n: '3', when: '확장', body: '자리비움 정밀 측정과 주 52시간 사전 경고를 더합니다.' },
  ]
  return (
    <ol className="mt-5 space-y-3">
      {steps.map((s) => (
        <li
          key={s.n}
          className="flex items-start gap-4 rounded-xl p-4"
          style={{ background: T.card, border: `1px solid ${T.hairline}` }}
        >
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[15px] font-extrabold text-white"
            style={{ background: T.teal }}
          >
            {s.n}
          </span>
          <p className="text-[16px] leading-[1.7]" style={{ color: T.inkSoft }}>
            <strong style={{ color: T.ink }}>{s.when}</strong> — {s.body}
          </p>
        </li>
      ))}
    </ol>
  )
}

export function AssignmentSection() {
  return (
    <section id="assignment" className="scroll-mt-24 pt-20 md:pt-28">
      <SectionHead n="02" kicker="과제 / Q2" title="근태 현황 자동화 — 어떻게 설계할 것인가" />
      <p className="max-w-3xl text-[18px] leading-[1.85]" style={{ color: T.inkSoft }}>
        결론부터 말씀드리면, 이 과제는{' '}
        <strong style={{ color: T.ink }}>이미 사내에서 운영 중인 시스템과 같은 구조</strong>입니다.
        회계·인사 프로그램(ERP)의 데이터를 자동으로 가져와 → 정해진 규칙으로 점검하고 → 우리 회사
        양식의 현황표로 만들어 줍니다.
      </p>

      <h3 className="mt-12 text-[20px] font-bold" style={{ color: T.ink }}>
        가장 중요한 관점 — 문제를 세 층으로 나눕니다
      </h3>
      <p className="mt-2 max-w-3xl text-[16px] leading-[1.8]" style={{ color: T.inkMuted }}>
        근태 업무는 성격이 다른 세 가지가 섞여 있습니다. 한 번에 AI로 처리하면 오히려 위험합니다.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <LayerCard
          index="1"
          accent={T.teal}
          tint={T.tealTint}
          title="기록"
          body="출퇴근·외출을 본인이 안 찍은 경우. AI가 빠진 기록을 추측해 채우면, 그 시각이 그대로 월급·주 52시간 계산의 근거가 되어 근거 자체가 가짜가 됩니다."
          verdict="→ AI 추정 금지. 본인이 직접 찍거나 확인하게."
        />
        <LayerCard
          index="2"
          accent={T.ink}
          tint={T.hairlineSoft}
          title="계산"
          body="근무시간·이탈시간을 더하고 빼는 부분. 정해진 컴퓨터 공식(DB·파이썬)이 계산하면 같은 자료는 늘 같은 결과가 나오고, 옮겨 적다 생기는 실수가 사라집니다."
          verdict="→ AI 아님. 정해진 공식이 계산."
        />
        <LayerCard
          index="3"
          accent={T.violet}
          tint={T.violetTint}
          title="판단"
          body="법을 어겼는지 여부. 오직 이 층에서만 AI가 ‘법령 도우미’ 역할로 조문·해석을 근거로 제시합니다. 위반이라 자동 판정하거나 임금을 깎지 않습니다."
          verdict="→ AI는 근거만. 최종 판단은 담당자·노무."
        />
      </div>

      <h3 className="mt-14 text-[20px] font-bold" style={{ color: T.ink }}>
        매일 나오는 결과물
      </h3>
      <p className="mt-2 max-w-3xl text-[16px] leading-[1.8]" style={{ color: T.inkSoft }}>
        담당자는 <strong style={{ color: T.ink }}>근무현황표 버튼을 한 번</strong> 누르면 됩니다.
        손으로 2~3시간 걸리던 정리가 몇 분으로 줄고, 표의 숫자마다{' '}
        <strong style={{ color: T.ink }}>어디서 나온 값인지(규칙·원천 기록)</strong>가 함께 표시되어
        따져 묻기 쉽습니다.
      </p>

      <h3 className="mt-14 text-[20px] font-bold" style={{ color: T.ink }}>
        잡아내는 특이사항 (5종 이상)
      </h3>
      <CaseTable />
      <p className="mt-3 text-[14.5px]" style={{ color: T.inkMuted }}>
        ①②는 사람이 직접 입력해야 풀리는 항목(입력 강제), ③④⑤는 시스템이 알아서 찾아내는 항목(자동
        분석)입니다.
      </p>

      <h3 className="mt-14 text-[20px] font-bold" style={{ color: T.ink }}>
        도입 단계
      </h3>
      <StepList />

      <div className="mt-10">
        <a
          href="#sample"
          className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-[16px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E7C7B]"
          style={{ borderColor: T.teal, color: T.teal, background: T.card }}
        >
          ↓ 실제 화면 예시 보기
        </a>
      </div>
    </section>
  )
}
