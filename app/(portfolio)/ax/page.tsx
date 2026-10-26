import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Bot, ShieldCheck, Workflow } from "lucide-react";

import {
  AX_METHOD,
  AX_PILLARS,
  AX_STACK,
  AX_CASE_STUDIES,
  AX_GROUNDING,
  AX_HERO,
  FEATURED_CASE_SLUGS,
} from "@/data/ax";
import { getProject } from "@/data/projects";
import { FadeInUp } from "@/components/portfolio/motion";
import { TechTags } from "@/components/portfolio/tech-tags";
import {
  AxCasesSection,
  AxContactSection,
  AxGroundingSection,
  AxHeroSection,
} from "@/components/portfolio/ax-sections";

export const metadata: Metadata = {
  title: `업무 개선 방식 — ${AX_HERO.name}`,
  description: `${AX_HERO.name} — ${AX_HERO.role}. 영업 데이터 분석과 업무 시스템 구축 사례, 자료 검증 및 업무 개선 방식`,
};

const pillarIcons = [Workflow, BookOpen, Bot, ShieldCheck];
const PILLAR_STAGGER_DELAY = 0.06;
const STEP_STAGGER_DELAY = 0.05;

export default function AxPage() {
  const featured = new Set<string>(FEATURED_CASE_SLUGS);
  const cases = AX_CASE_STUDIES.map((study) => ({
    ...study,
    project: getProject(study.projectSlug),
  })).filter(
    (study) => study.project !== undefined && featured.has(study.projectSlug),
  ) as Array<
    (typeof AX_CASE_STUDIES)[number] & {
      project: NonNullable<ReturnType<typeof getProject>>;
    }
  >;

  return (
    <article className="px-6 pb-28 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <AxHeroSection />

        <section className="mt-16">
          <FadeInUp>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
                  업무 역량
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-stone-500 dark:text-stone-400">
                영업관리 실무와 데이터 분석을 바탕으로 자료 취합·조회·보고
                업무를 개선합니다.
              </p>
            </div>
          </FadeInUp>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {AX_PILLARS.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Workflow;
              return (
                <FadeInUp
                  key={pillar.title}
                  delay={index * PILLAR_STAGGER_DELAY}
                >
                  <div className="h-full rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400">
                        {pillar.label}
                      </span>
                      <Icon className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-stone-950 dark:text-stone-50">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {pillar.description}
                    </p>
                  </div>
                </FadeInUp>
              );
            })}
          </div>
        </section>

        <AxCasesSection cases={cases} />

        <FadeInUp>
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] dark:border-stone-800 dark:bg-stone-900"
            >
              회사 업무 개선 사례 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeInUp>

        <AxGroundingSection data={AX_GROUNDING} />

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeInUp>
            <div>
              <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
                업무를 개선하는 방식
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-400">
                반복되는 자료 취합과 확인 작업을 파악하고, 자료의 출처와 집계
                기준을 정리한 뒤 실제 업무에 필요한 기능을 구축합니다.
              </p>
            </div>
          </FadeInUp>

          <div className="space-y-3">
            {AX_METHOD.map((step, index) => (
              <FadeInUp key={step.title} delay={index * STEP_STAGGER_DELAY}>
                <div className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[3rem_1fr]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 font-[family-name:var(--font-mono)] text-xs font-semibold text-[var(--accent)] dark:bg-stone-800">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <FadeInUp>
            <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
              시스템 구축에 활용한 도구
            </h2>
          </FadeInUp>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {AX_STACK.map((group, index) => (
              <FadeInUp key={group.label} delay={index * STEP_STAGGER_DELAY}>
                <div className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                  <h3 className="mb-4 font-[family-name:var(--font-mono)] text-xs uppercase text-stone-500">
                    {group.label}
                  </h3>
                  <TechTags items={group.items} variant="full" />
                </div>
              </FadeInUp>
            ))}
          </div>
        </section>

        <AxContactSection />
      </div>
    </article>
  );
}
