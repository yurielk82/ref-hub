import Link from 'next/link'
import { LiveSample } from './live-sample'
import { SectionHead } from './section-head'
import { T } from './tokens'

export function GreetingSection() {
  return (
    <section id="greeting" className="scroll-mt-24 pt-12 md:pt-16">
      <span
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold"
        style={{ background: T.tealTint, color: T.tealDeep }}
      >
        메드파크 사전과제 · AX 직무
      </span>
      <h1
        className="mt-5 text-[34px] font-extrabold leading-[1.2] tracking-[-0.01em] md:text-[46px]"
        style={{ color: T.ink }}
      >
        안녕하세요.
        <br />
        <span style={{ color: T.teal }}>일하는 방식</span>으로 답을 드립니다.
      </h1>
      <p className="mt-6 max-w-2xl text-[18px] leading-[1.85]" style={{ color: T.inkSoft }}>
        AI를 어디에 쓰고 어디에는 절대 쓰지 않을지 가르는 일이 핵심이라 믿습니다. 이 한 페이지에 그
        관점(Q2)과, 이미 만들어 운영 중인 시스템들(Q1), 그리고 실제로 어떻게 보일지(샘플)를
        담았습니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[16px] font-semibold text-white shadow-sm outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E7C7B] motion-reduce:transform-none"
          style={{ background: T.teal }}
        >
          AI 업무 시스템 경험 — 포트폴리오 보기
          <span aria-hidden="true">↗</span>
        </Link>
        <span className="text-[14px]" style={{ color: T.inkMuted }}>
          Q1 답변은 새 탭의 포트폴리오로 대신합니다.
        </span>
      </div>
    </section>
  )
}

export function SampleSection() {
  return (
    <section id="sample" className="scroll-mt-24 pt-20 md:pt-28">
      <SectionHead
        n="03"
        kicker="샘플 / 예상 화면"
        title="근태 특이사항, 실제로 이렇게 처리됩니다"
      />
      <p className="max-w-3xl text-[17px] leading-[1.8]" style={{ color: T.inkSoft }}>
        왼쪽 특이사항 카드를 누르면 오른쪽 처리 화면이 바뀝니다. 화면은 데이터를 세 갈래로
        구분합니다 — <strong style={{ color: T.teal }}>측정(시스템 자동·자물쇠)</strong> ·{' '}
        <strong style={{ color: T.ink }}>선언(본인 작성)</strong> ·{' '}
        <strong style={{ color: T.violet }}>자문(법령 참고·자동 판정 아님)</strong>. 모든 값은 가짜
        예시입니다.
      </p>
      <div className="mt-7">
        <LiveSample />
      </div>
    </section>
  )
}
