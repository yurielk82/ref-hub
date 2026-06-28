import { SectionHead } from './section-head'
import { T } from './tokens'
import { BackgroundSection, PracticeSection } from './q2-foundations'
import { ApproachSection, ThreeStageSection } from './q2-approach'
import { LegalMcpSection } from './q2-legal'
import { OutputSection } from './q2-output'
import { SelfCorrectSection, IdleSection } from './q2-detail'
import { BenefitsSection, RolloutSection, ClosingSection } from './q2-closing'

export function AssignmentSection() {
  return (
    <section id="assignment" className="scroll-mt-24 pt-20 md:pt-28">
      <SectionHead n="02" kicker="과제 / Q2" title="AI를 활용한 일일 근태현황 자동화 방안" />
      <BackgroundSection />
      <PracticeSection />
      <ApproachSection />
      <ThreeStageSection />
      <LegalMcpSection />
      <OutputSection />
      <SelfCorrectSection />
      <IdleSection />
      <BenefitsSection />
      <RolloutSection />
      <ClosingSection />
      <div
        className="mt-12 max-w-3xl rounded-xl p-4 text-[14px]"
        style={{ background: T.hairlineSoft, color: T.inkMuted }}
      >
        아래 “샘플” 섹션이 위에서 말한 예시 화면입니다. 카드를 눌러 직접 조작해 보실 수 있습니다.
      </div>
    </section>
  )
}
