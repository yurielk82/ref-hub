import { listShares } from "@/lib/resume/shares";
import Link from "next/link";
import { redirect } from "next/navigation";

import { jobsViewer } from "@/auth";
import {
  ownerHref,
  type PortfolioHome,
  type WorkspaceQuery,
} from "@/lib/selected-portfolio/workspace";
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

export async function OwnerResume({
  home,
  query,
}: {
  home: PortfolioHome;
  query: WorkspaceQuery;
}) {
  if (!(await jobsViewer())) redirect(ownerHref(home, "login"));

  const dir = resumeDataDir();
  const { v, p } = query;
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

  const shares =
    dir && current ? await listShares(dir, platform, current.id) : [];

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
        </div>

        <nav
          aria-label="이력서 사이트"
          className="mt-6 inline-flex rounded-lg border border-stone-200 bg-white p-1 dark:border-stone-800 dark:bg-stone-900"
          data-print-hide
        >
          {(Object.keys(SITE_NAMES) as ResumePlatform[]).map((key) => (
            <Link
              key={key}
              href={resumeHref(key, undefined, home)}
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
              home,
              shares,
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
