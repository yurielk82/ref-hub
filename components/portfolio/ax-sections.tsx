import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

import {
  AX_CONTACT,
  type AxCaseStudy,
  type AxGrounding,
  type AxTrackView,
  type HeroContent,
} from "@/data/ax";
import type { Project } from "@/data/projects";

import { FadeInUp } from "./motion";
import { GitHubIcon } from "./github-icon";
import { PrintButton } from "./print-button";
import { ProjectThumbnail } from "./project-thumbnail";

const CASE_STAGGER_DELAY = 0.06;

const SECONDARY_BUTTON =
  "inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300";

/**
 * 첫 화면. 영업관리 트랙은 GitHub를 앞세우지 않고(개발 이력보다 업무 역량이 먼저),
 * AX 트랙은 GitHub를 함께 보여 준다.
 */
export function AxHeroSection({
  hero,
  primary,
  showGithub,
}: {
  hero: HeroContent;
  primary: { href: string; label: string };
  showGithub: boolean;
}) {
  return (
    <FadeInUp>
      <section className="grid gap-10 border-b border-stone-200 pb-14 dark:border-stone-800 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              {hero.name}
            </span>
            <span className="text-sm font-medium text-stone-500 dark:text-stone-400">
              {hero.role}
            </span>
          </p>
          <h1
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-stone-950 dark:text-stone-50 sm:text-5xl"
            style={{ textWrap: "balance" }}
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-stone-900 dark:text-stone-100">
            {hero.subhead}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300">
            {hero.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`mailto:${AX_CONTACT.email}`} className={SECONDARY_BUTTON}>
              <Mail className="h-4 w-4" />
              이메일
            </a>
            {showGithub && (
              <a
                href={AX_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className={SECONDARY_BUTTON}
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
            <PrintButton />
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            {hero.evidenceTitle}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {hero.evidence.map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-stone-50 px-4 py-3 dark:bg-stone-950"
              >
                <p className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-stone-700 dark:text-stone-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInUp>
  );
}

type AxCase = AxCaseStudy & { project: Project; ax: AxTrackView };

/** AX 트랙 대표 사례 — 같은 사례를 문제 → 구축 → 자동화 → 운영 순서로 읽는다 */
export function AxCasesSection({ cases }: { cases: AxCase[] }) {
  return (
    <section id="cases" className="mt-20 scroll-mt-20">
      <FadeInUp>
        <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50">
          대표 사례
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-400">
          회사 업무에서 직접 기획·구축·운영한 시스템입니다. 기간과 지금 운영
          상태를 함께 적었습니다.
        </p>
      </FadeInUp>

      <div className="mt-8 space-y-5">
        {cases.map((study, index) => (
          <FadeInUp key={study.projectSlug} delay={index * CASE_STAGGER_DELAY}>
            <div className="group relative overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:hover:border-[var(--accent)]">
              <div className="grid lg:grid-cols-[0.44fr_0.56fr]">
                <div className="flex items-center justify-center border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950 lg:border-b-0 lg:border-r">
                  <ProjectThumbnail project={study.project} variant="detail" />
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-stone-950 dark:text-stone-50">
                        {study.project.name}
                      </h3>
                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                        {study.period} · {study.status.note}
                      </p>
                    </div>
                    <Link
                      href={`/ax/cases/${study.project.slug}`}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--accent)] after:absolute after:inset-0 after:content-[''] hover:text-[var(--accent-light)] group-hover:gap-2"
                    >
                      사례 상세
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  <p className="mt-5 text-base font-semibold leading-7 text-stone-900 dark:text-stone-100">
                    {study.ax.headline}
                  </p>

                  <AxTrackFacts view={study.ax} className="mt-5" />
                </div>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  );
}

/** AX 요약 네 칸 — 사례 목록과 상세가 같은 틀을 쓴다 */
export function AxTrackFacts({
  view,
  className = "",
}: {
  view: AxTrackView;
  className?: string;
}) {
  return (
    <dl className={`grid gap-4 ${className}`}>
      <AxCaseFact term="문제" value={view.problem} />
      <AxCaseFact term="구축" value={view.build} />
      <AxCaseFact term="자동화" value={view.automation} />
      <AxCaseFact term="운영·검증" value={view.operation} />
    </dl>
  );
}

export function AxGroundingSection({ data }: { data: AxGrounding }) {
  return (
    <section className="mt-20">
      <FadeInUp>
        <div className="overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--accent)_24%,transparent)] bg-[color-mix(in_srgb,var(--accent)_5%,white)] p-6 dark:bg-[color-mix(in_srgb,var(--accent)_10%,black)] sm:p-8">
          <h2 className="flex max-w-3xl items-center gap-2.5 text-2xl font-bold text-stone-950 dark:text-stone-50">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            {data.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
            {data.summary}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.examples.map((example) => (
              <div
                key={example.label}
                className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
              >
                <h3 className="text-sm font-semibold text-[var(--accent)]">
                  {example.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-stone-300">
                  {example.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[color-mix(in_srgb,var(--accent)_18%,transparent)] pt-6">
            <p className="max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              {data.spreadLead}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.spreadTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

function AxCaseFact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-stone-700 dark:text-stone-300">
        {value}
      </dd>
    </div>
  );
}

export function AxContactSection({
  title,
  lead,
  showGithub,
}: {
  title: string;
  lead: string;
  showGithub: boolean;
}) {
  return (
    <FadeInUp>
      <section
        id="contact"
        className="mt-20 scroll-mt-20 rounded-lg border border-[color-mix(in_srgb,var(--accent)_24%,transparent)] bg-[color-mix(in_srgb,var(--accent)_5%,white)] p-6 dark:bg-[color-mix(in_srgb,var(--accent)_10%,black)]"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-950 dark:text-stone-50">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              {lead}
            </p>
            {/* 주소를 화면에 노출 — 버튼의 mailto 만으로는 복사도 검색도 안 된다 */}
            <a
              href={`mailto:${AX_CONTACT.email}`}
              className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-stone-700 underline-offset-4 hover:text-[var(--accent)] hover:underline dark:text-stone-300"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {AX_CONTACT.email}
            </a>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={`mailto:${AX_CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              이메일 문의
            </a>
            {showGithub && (
              <a
                href={AX_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className={SECONDARY_BUTTON}
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>
    </FadeInUp>
  );
}
