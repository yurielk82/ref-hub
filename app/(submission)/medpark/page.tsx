import type { Metadata } from 'next'
import Link from 'next/link'
import { LiveSample } from '@/components/medpark/live-sample'

export const metadata: Metadata = {
  title: '메드파크 사전과제',
  description: 'AX 직무 사전과제 — Q1 포트폴리오 · Q2 근태 자동화 설계 · 라이브 샘플',
  robots: { index: false, follow: false },
}

const INK = '#1A2230'
const INK_MUTED = '#5B6577'
const HAIRLINE = '#E4E8EE'
const TEAL = '#0E7C7B'
const VIOLET = '#5B4FC4'

export default function MedparkAssignmentPage() {
  return (
    <div
      lang="ko"
      style={{
        background: '#F7F8FA',
        color: INK,
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
      className="min-h-dvh font-[family-name:var(--font-sans)]"
    >
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
        {/* 헤더 */}
        <header className="mb-12">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ background: TEAL, color: '#fff' }}
            >
              메드파크 사전과제
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ background: '#fff', color: INK_MUTED, border: `1px solid ${HAIRLINE}` }}
            >
              예시 데이터 · 100% 합성·가명
            </span>
          </div>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: INK }}>
            AI 기반 업무 시스템 — 사전과제 답변
          </h1>
          <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: INK_MUTED }}>
            한 페이지에 Q1(역량 증빙)·Q2(설계 설명)·실제 화면 예시를 담았습니다.
          </p>
        </header>

        <Q1Section />
        <Q2Section />
        <SampleSection />

        <footer
          className="mt-14 border-t pt-6 text-[12px] leading-relaxed"
          style={{ borderColor: HAIRLINE, color: INK_MUTED }}
        >
          본 페이지의 모든 직원명·사번·시각·수치는 100% 합성·가명 예시 데이터입니다. 실제 직원
          정보나 실데이터, 외부 시스템 실연동은 포함되어 있지 않습니다.
        </footer>
      </div>
    </div>
  )
}

function Q1Section() {
  return (
    <section className="mb-14">
      <SectionTag>Q1</SectionTag>
      <h2 className="mt-2 text-xl font-bold" style={{ color: INK }}>
        AI 기반 업무 시스템 구축·운영 경험
      </h2>
      <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: INK }}>
        실제 구축·운영 중인 시스템들을 포트폴리오로 정리해 두었습니다. 제약·물류 도메인의 데이터
        수집·검증·자동 리포트 사례를 화면과 함께 확인하실 수 있습니다.
      </p>
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[14px] font-semibold text-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A2230] motion-reduce:transition-none"
        style={{ background: TEAL }}
      >
        포트폴리오 보기 → ref.dvsharp.com
        <span aria-hidden="true">↗</span>
      </Link>
      <p className="mt-2 text-[12.5px]" style={{ color: INK_MUTED }}>
        버튼을 누르면 같은 사이트의 포트폴리오 첫 화면으로 이동합니다.
      </p>
    </section>
  )
}

function Q2Layers() {
  return (
    <div className="mt-4 space-y-3">
      <LayerCard
        accent={TEAL}
        title="1. 기록 — 사람이 안 찍은 것"
        body="출퇴근·외출을 본인이 안 찍은 경우입니다. 여기서 AI가 빠진 기록을 추측해 채우면 안 됩니다. 추측으로 채운 시각이 그대로 월급과 주 52시간 계산의 근거가 되면, 근거 자체가 가짜가 됩니다. 그래서 빈 기록은 메우지 않고 본인이 직접 찍거나 확인하도록 만듭니다."
      />
      <LayerCard
        accent={INK}
        title="2. 계산 — 엑셀 수작업의 실수"
        body="근무시간·이탈시간을 더하고 빼는 부분입니다. 여기엔 AI가 필요 없습니다. 정해진 컴퓨터 공식(데이터베이스·파이썬)이 계산하면 같은 자료는 언제나 같은 결과가 나오고, 사람이 옮겨 적다 생기는 오기입이 구조적으로 사라집니다."
      />
      <LayerCard
        accent={VIOLET}
        dashed
        title="3. 판단 — 법을 어겼는지 여부"
        body="오직 이 층에서만 AI가 ‘법령 도우미’ 역할을 합니다. 관련 조문과 해석을 근거로 제시할 뿐, 위반이라고 자동으로 판정하거나 임금을 깎지 않습니다. 최종 판단은 담당자와 노무 전문가가 합니다."
      />
    </div>
  )
}

function Q2CaseTable() {
  return (
    <div className="mt-3 overflow-hidden rounded-lg" style={{ border: `1px solid ${HAIRLINE}` }}>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr style={{ background: '#fff' }}>
            <Th>유형</Th>
            <Th>무엇을</Th>
            <Th>처리 방식</Th>
          </tr>
        </thead>
        <tbody>
          <Tr
            label="① 결재 ↔ 출입 불일치"
            what="외출 결재 없이 자리를 비운 경우"
            how="입력 강제 (본인 기안)"
            tone={TEAL}
          />
          <Tr
            label="② 기록 둘 다 없음"
            what="출입·결재가 모두 없는 경우"
            how="입력 강제 (본인 확인)"
            tone={TEAL}
          />
          <Tr
            label="③ 자리비움 과다"
            what="미승인 이탈이 임계 초과"
            how="자동 분석 (모니터링)"
            tone={VIOLET}
          />
          <Tr
            label="④ 주 52시간 임박"
            what="주간 한도에 근접"
            how="자동 분석 (사전 경고)"
            tone={VIOLET}
          />
          <Tr
            label="⑤ 기타 이상 (심야·휴일 등)"
            what="평소 패턴을 벗어난 출입"
            how="자동 분석 (검토)"
            tone={VIOLET}
          />
        </tbody>
      </table>
    </div>
  )
}

function Q2Section() {
  return (
    <section className="mb-14">
      <SectionTag>Q2</SectionTag>
      <h2 className="mt-2 text-xl font-bold" style={{ color: INK }}>
        근태 현황 자동화 — 어떻게 설계할 것인가
      </h2>
      <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: INK }}>
        결론부터 말하면, 이 과제는 <strong>이미 사내에서 운영 중인 시스템과 같은 구조</strong>
        입니다. 회계·인사 프로그램(ERP)의 데이터를 자동으로 가져와 → 정해진 규칙으로 점검하고 → 우리
        회사 양식의 현황표로 만들어 줍니다. 핵심은 새 기술이 아니라{' '}
        <strong>“어디에 AI를 쓰고, 어디에는 절대 쓰지 않을지”</strong>를 가르는 일입니다.
      </p>
      <h3 className="mt-7 text-[15.5px] font-bold" style={{ color: INK }}>
        가장 중요한 관점 — 문제를 세 층으로 나눕니다
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: INK_MUTED }}>
        근태 업무는 성격이 다른 세 가지가 섞여 있습니다. 섞어서 한 번에 AI로 처리하면 오히려
        위험합니다. 그래서 층을 나눕니다.
      </p>
      <Q2Layers />
      <h3 className="mt-7 text-[15.5px] font-bold" style={{ color: INK }}>
        매일 나오는 결과물
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: INK }}>
        담당자는 <strong>근무현황표 버튼을 한 번</strong> 누르면 됩니다. 손으로 2~3시간 걸리던
        정리가 몇 분으로 줄어듭니다. 표의 숫자마다{' '}
        <strong>어디서 나온 값인지(어떤 규칙·어떤 원천 기록)</strong>가 함께 표시되어, 따져 묻기
        쉽습니다.
      </p>
      <h3 className="mt-7 text-[15.5px] font-bold" style={{ color: INK }}>
        잡아내는 특이사항 (5종 이상)
      </h3>
      <Q2CaseTable />
      <p className="mt-2 text-[12.5px]" style={{ color: INK_MUTED }}>
        ①②는 사람이 직접 입력해야 풀리는 항목(입력 강제), ③④⑤는 시스템이 알아서 찾아내는 항목(자동
        분석)입니다.
      </p>
      <h3 className="mt-7 text-[15.5px] font-bold" style={{ color: INK }}>
        도입 단계
      </h3>
      <ol className="mt-2 space-y-1.5 text-[14px] leading-relaxed" style={{ color: INK }}>
        <li>
          <strong>1단계 (즉시)</strong> — 회계·인사 프로그램 자료를 받아 현황표를 자동으로 만듭니다.
        </li>
        <li>
          <strong>2단계</strong> — 실시간 알림과 결재 경로를 붙입니다.
        </li>
        <li>
          <strong>3단계</strong> — 자리비움 정밀 측정과 주 52시간 사전 경고를 더합니다.
        </li>
      </ol>
      <a
        href="#live-sample"
        className="mt-7 inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-[14px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A2230] motion-reduce:transition-none"
        style={{ borderColor: TEAL, color: TEAL, background: '#fff' }}
      >
        ↓ 실제 화면 예시 보기
      </a>
    </section>
  )
}

function SampleSection() {
  return (
    <section id="live-sample" className="scroll-mt-6">
      <SectionTag>샘플</SectionTag>
      <h2 className="mt-2 text-xl font-bold" style={{ color: INK }}>
        예상 화면 — 근태 특이사항 처리
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: INK_MUTED }}>
        왼쪽 특이사항 카드를 누르면 오른쪽 처리 화면이 바뀝니다. 화면은 데이터를 세 갈래로
        구분합니다 — <span style={{ color: TEAL }}>측정(시스템 자동, 자물쇠·수정 불가)</span> ·{' '}
        <span style={{ color: INK }}>선언(본인 작성)</span> ·{' '}
        <span style={{ color: VIOLET }}>자문(법령 참고, 자동 판정 아님)</span>. 모든 값은 가짜
        예시입니다.
      </p>
      <div className="mt-5">
        <LiveSample />
      </div>
    </section>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-[11px] font-bold tracking-wide"
      style={{ background: '#1A2230', color: '#fff' }}
    >
      {children}
    </span>
  )
}

function LayerCard({
  title,
  body,
  accent,
  dashed,
}: {
  title: string
  body: string
  accent: string
  dashed?: boolean
}) {
  return (
    <div
      className="rounded-lg bg-white p-4"
      style={{
        border: `1px solid ${HAIRLINE}`,
        borderLeftWidth: 3,
        borderLeftColor: accent,
        borderLeftStyle: dashed ? 'dashed' : 'solid',
      }}
    >
      <h4 className="text-[14.5px] font-bold" style={{ color: accent }}>
        {title}
      </h4>
      <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: INK }}>
        {body}
      </p>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-3 py-2 text-left text-[12px] font-semibold"
      style={{ color: INK_MUTED, borderBottom: `1px solid ${HAIRLINE}` }}
    >
      {children}
    </th>
  )
}

function Tr({
  label,
  what,
  how,
  tone,
}: {
  label: string
  what: string
  how: string
  tone: string
}) {
  return (
    <tr style={{ background: '#fff' }}>
      <td
        className="px-3 py-2 align-top font-medium"
        style={{ color: INK, borderTop: `1px solid ${HAIRLINE}` }}
      >
        {label}
      </td>
      <td
        className="px-3 py-2 align-top"
        style={{ color: INK_MUTED, borderTop: `1px solid ${HAIRLINE}` }}
      >
        {what}
      </td>
      <td
        className="px-3 py-2 align-top font-medium"
        style={{ color: tone, borderTop: `1px solid ${HAIRLINE}` }}
      >
        {how}
      </td>
    </tr>
  )
}
