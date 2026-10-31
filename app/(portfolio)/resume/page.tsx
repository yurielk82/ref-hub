import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { jobsViewer } from "@/auth";
import {
  changedPaths,
  listVersions,
  readVersion,
  resumeDataDir,
} from "@/lib/resume/versions";
import { SITE_NAMES, parsePlatform, resumeHref } from "@/lib/resume/platforms";
import type {
  JobkoreaResume,
  ResumePlatform,
  SaraminResume,
} from "@/lib/resume/types";
import {
  JobkoreaWorkspace,
  SaraminWorkspace,
} from "@/components/resume/resume-workspace";

export const metadata: Metadata = {
  title: "이력서",
  robots: { index: false, follow: false },
};

const KST_DATE_TIME = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const KST_MONTH = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
});

/**
 * 이력서 작업 화면(로그인 전용). 사람인·잡코리아 칸 순서대로 보여 주고 칸마다 복사해 붙여 넣는다.
 * 두 사이트는 칸이 달라 버전을 따로 쌓는다(?p=jobkorea). 이력서 내용은 공개 저장소에 두지 않고
 * 서버의 저장소 밖 폴더에 버전별 파일로 쌓는다.
 */
export default async function ResumePage(props: {
  searchParams: Promise<{ v?: string | string[]; p?: string | string[] }>;
}) {
  if (!(await jobsViewer())) redirect("/login");

  const dir = resumeDataDir();
  const { v, p } = await props.searchParams;
  const platform = parsePlatform(p);
  const site = SITE_NAMES[platform];
  const versions = dir ? await listVersions(dir, platform) : [];
  const wanted = typeof v === "string" ? v : undefined;
  const index = Math.max(
    0,
    versions.findIndex((version) => version.id === wanted),
  );
  const current =
    dir && versions[index]
      ? await readVersion(dir, versions[index].id, platform)
      : null;
  const previousSummary = versions[index + 1] ?? null;
  const previous =
    dir && previousSummary
      ? await readVersion(dir, previousSummary.id, platform)
      : null;

  return (
    <section className="px-6 pb-28 pt-12 sm:pt-16">
      <div className="mx-auto max-w-4xl">
        <div
          className="flex flex-wrap items-start justify-between gap-4"
          data-print-hide
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              {site} 이력서
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              {site} 이력서 칸 순서대로 정리했습니다. 칸마다 복사해 {site}에
              붙여 넣으세요.
            </p>
          </div>
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              로그아웃
            </button>
          </form>
        </div>

        <nav
          aria-label="이력서 사이트"
          className="mt-6 inline-flex rounded-lg border border-stone-200 bg-white p-1 dark:border-stone-800 dark:bg-stone-900"
          data-print-hide
        >
          {(Object.keys(SITE_NAMES) as ResumePlatform[]).map((key) => (
            <Link
              key={key}
              href={resumeHref(key)}
              aria-current={key === platform ? "page" : undefined}
              className={
                key === platform
                  ? "rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white"
                  : "rounded-md px-3 py-1.5 text-sm font-semibold text-stone-600 transition-colors hover:text-[var(--accent)] dark:text-stone-300"
              }
            >
              {SITE_NAMES[key]}
            </Link>
          ))}
        </nav>

        {!dir && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
          >
            서버에 이력서 저장 폴더가 지정되지 않았습니다.
          </p>
        )}
        {dir && !current && (
          <p className="mt-6 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
            저장된 이력서 버전이 없습니다.
          </p>
        )}

        {current &&
          (() => {
            const shared = {
              version: {
                id: current.id,
                label: current.label,
                savedLabel: KST_DATE_TIME.format(new Date(current.savedAt)),
              },
              versions: versions.map((version) => ({
                id: version.id,
                label: version.label,
                savedLabel: KST_DATE_TIME.format(new Date(version.savedAt)),
              })),
              previousLabel: previousSummary?.label ?? null,
              changed: [
                ...changedPaths(previous?.resume ?? null, current.resume),
              ],
              asOf: KST_MONTH.format(new Date())
                .replace(/\.\s?/g, ".")
                .replace(/\.$/, ""),
            };
            return platform === "jobkorea" ? (
              <JobkoreaWorkspace
                key={current.id}
                {...shared}
                resume={current.resume as JobkoreaResume}
              />
            ) : (
              <SaraminWorkspace
                key={current.id}
                {...shared}
                resume={current.resume as SaraminResume}
              />
            );
          })()}
      </div>
    </section>
  );
}
