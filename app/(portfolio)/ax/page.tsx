import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Bot, ShieldCheck, Workflow } from "lucide-react";

import {
  AX_GROUNDING,
  AX_METHOD,
  AX_PILLARS,
  AX_STACK,
  AX_TRACK_CASE_SLUGS,
  AX_TRACK_HERO,
  getAxCase,
} from "@/data/ax";
import { OTHER_PROJECTS, getProject } from "@/data/projects";
import { FadeInUp } from "@/components/portfolio/motion";
import { ProjectCard } from "@/components/portfolio/project-card";
import { TechTags } from "@/components/portfolio/tech-tags";
import {
  AxCasesSection,
  AxContactSection,
  AxGroundingSection,
  AxHeroSection,
} from "@/components/portfolio/ax-sections";

/**
 * AX 트랙 — 업무 자동화·AX 직무 지원용 포트폴리오. 영업관리 트랙(/)과 같은 사례를
 * 문제 → 구축 → 자동화 → 운영 관점으로 보여 주고, 개인·외부 작업과 기술을 함께 싣는다.
 */
export const metadata: Metadata = {
  // 문서 페이지 지도가 이 제목을 문자열로 읽는다 — { absolute } 객체를 쓰면 문서 빌드가 깨진다.
  title: `AX 포트폴리오 — ${AX_TRACK_HERO.name}`,
  description: `${AX_TRACK_HERO.name} · ${AX_TRACK_HERO.role}. 영업 데이터 플랫폼·법정 보고 자동화·문서 검증 시스템을 직접 기획·구축·운영한 사례.`,
  alternates: { canonical: "/ax" },
};

const pillarIcons = [Workflow, BookOpen, Bot, ShieldCheck];
/** AX 직무와 가까운 작업(AI 에이전트 작업 환경·도구 도입 평가)을 앞에 둔다 */
const TOOL_ORDER = ["claude-dotfiles", "har-eval", "ev-motor-reliability"];
const toolRank = (slug: string) => {
  const rank = TOOL_ORDER.indexOf(slug);
  return rank === -1 ? TOOL_ORDER.length : rank;
};
const STAGGER_DELAY = 0.05;

export default function AxPage() {
  const cases = AX_TRACK_CASE_SLUGS.flatMap((slug) => {
    const study = getAxCase(slug);
    const project = getProject(slug);
    return study?.ax && project ? [{ ...study, project, ax: study.ax }] : [];
  });

  const tools = [...OTHER_PROJECTS].sort(
    (a, b) => toolRank(a.slug) - toolRank(b.slug),
  );

  return (
    <article className="px-6 pb-28 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <AxHeroSection
          hero={AX_TRACK_HERO}
          primary={{ href: "/ax#cases", label: "대표 사례" }}
          track="ax"
        />

        <section id="method" className="mt-16 scroll-mt-20">
          <FadeInUp>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50">
                일하는 방식
              </h2>
              <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                업무를 직접 하는 자리에서 문제를 찾고, 자료 기준을 정리한 뒤
                필요한 만큼만 자동화합니다.
              </p>
            </div>
          </FadeInUp>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {AX_PILLARS.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Workflow;
              return (
                <FadeInUp key={pillar.title} delay={index * STAGGER_DELAY}>
                  <div className="h-full rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                    <Icon className="h-5 w-5 text-[var(--accent)]" />
                    <h3 className="mt-4 text-base font-bold text-stone-950 dark:text-stone-50">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {pillar.description}
                    </p>
                  </div>
                </FadeInUp>
              );
            })}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeInUp>
              <div>
                <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50">
                  개선은 이 순서로 진행합니다
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
                  반복되는 자료 취합과 확인 작업을 파악하고, 자료의 출처와 집계
                  기준을 정리한 뒤 실제 업무에 필요한 기능을 구축합니다.
                </p>
              </div>
            </FadeInUp>
            <ol className="space-y-3">
              {AX_METHOD.map((step, index) => (
                <FadeInUp key={step.title} delay={index * STAGGER_DELAY}>
                  <li className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[2.5rem_1fr]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-sm font-semibold tabular-nums text-[var(--accent)] dark:bg-stone-800">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-950 dark:text-stone-50">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </FadeInUp>
              ))}
            </ol>
          </div>
        </section>

        <AxCasesSection cases={cases} />

        <AxGroundingSection data={AX_GROUNDING} />

        <section id="tools" className="mt-20 scroll-mt-20">
          <FadeInUp>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50">
                개인·외부 작업
              </h2>
              <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                AI 코딩 에이전트 작업 환경, 도구 도입 평가, 외부 의뢰처럼 회사
                업무 밖에서 만든 것들입니다.
              </p>
            </div>
          </FadeInUp>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((project, index) => (
              <FadeInUp key={project.slug} delay={index * STAGGER_DELAY}>
                <ProjectCard project={project} track="ax" />
              </FadeInUp>
            ))}
          </div>
        </section>

        <section id="stack" className="mt-20 scroll-mt-20">
          <FadeInUp>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50">
                사용하는 기술
              </h2>
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-light)]"
              >
                시스템 매뉴얼 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeInUp>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {AX_STACK.map((group, index) => (
              <FadeInUp key={group.label} delay={index * STAGGER_DELAY}>
                <div className="h-full rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                  <h3 className="mb-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                    {group.label}
                  </h3>
                  <TechTags items={group.items} variant="full" />
                </div>
              </FadeInUp>
            ))}
          </div>
        </section>

        <AxContactSection
          title="업무 자동화와 데이터 시스템 구축 경험을 소개합니다."
          lead="현업 문제를 찾아 시스템으로 바꾸고 운영해 온 과정을 사례와 함께 이야기하겠습니다."
          track="ax"
        />
      </div>
    </article>
  );
}
