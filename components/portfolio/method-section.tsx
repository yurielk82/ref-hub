import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { SALES_MANUAL_SLUGS, SALES_METHOD } from "@/data/ax";
import { MANUALS } from "@/data/manuals";

import { FadeInUp } from "./motion";

const STEP_STAGGER_DELAY = 0.05;

const manuals = MANUALS.filter((manual) =>
  (SALES_MANUAL_SLUGS as readonly string[]).includes(manual.slug),
);

/** 영업관리 트랙 일하는 방식 — 업무 절차를 세우고 문서로 정착시키는 순서와 그 근거 */
export function MethodSection() {
  return (
    <section id="method" className="mt-16 scroll-mt-20">
      <FadeInUp>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50">
            일하는 방식
          </h2>
          <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
            반복 업무를 찾아 기준을 정하고, 시스템으로 처리한 뒤 다른 담당자도
            이어 쓸 수 있도록 절차와 문서로 남깁니다.
          </p>
        </div>
      </FadeInUp>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <ol className="space-y-3">
          {SALES_METHOD.map((step, index) => (
            <FadeInUp key={step.title} delay={index * STEP_STAGGER_DELAY}>
              <li className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[2.5rem_1fr]">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-sm font-semibold tabular-nums text-[var(--accent)] dark:bg-stone-800">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                    {step.description}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-stone-600 dark:text-stone-400">
                    <span className="mr-1.5 font-semibold text-[var(--accent)]">
                      사례
                    </span>
                    {step.example}
                  </p>
                </div>
              </li>
            </FadeInUp>
          ))}
        </ol>

        <FadeInUp>
          <div className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
            <h3 className="flex items-center gap-2 text-base font-bold text-stone-950 dark:text-stone-50">
              <BookOpen className="h-4 w-4 shrink-0 text-[var(--accent)]" />
              운영 문서
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              운영 중인 시스템의 업무 흐름과 사용법을 정리한 매뉴얼입니다.
            </p>
            <ul className="mt-4 divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
              {manuals.map((manual) => (
                <li key={manual.slug}>
                  <Link
                    href={`/${manual.slug}`}
                    className="group flex items-start justify-between gap-3 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-stone-900 transition-colors group-hover:text-[var(--accent)] dark:text-stone-100">
                        {manual.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-stone-600 dark:text-stone-400">
                        {manual.description}
                      </span>
                    </span>
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
