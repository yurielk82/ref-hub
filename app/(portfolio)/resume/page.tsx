import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { jobsViewer } from "@/auth";
import {
  changedPaths,
  listVersions,
  readVersion,
  resumeDataDir,
} from "@/lib/resume/versions";
import { ResumeWorkspace } from "@/components/resume/resume-workspace";

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
 * 사람인 이력서 작업 화면(로그인 전용). 사람인 칸 순서대로 보여 주고 칸마다 복사해 붙여 넣는다.
 * 이력서 내용은 공개 저장소에 두지 않고 서버의 저장소 밖 폴더에 버전별 파일로 쌓는다.
 */
export default async function ResumePage(props: {
  searchParams: Promise<{ v?: string | string[] }>;
}) {
  if (!(await jobsViewer())) redirect("/login");

  const dir = resumeDataDir();
  const versions = dir ? await listVersions(dir) : [];
  const { v } = await props.searchParams;
  const wanted = typeof v === "string" ? v : undefined;
  const index = Math.max(
    0,
    versions.findIndex((version) => version.id === wanted),
  );
  const current =
    dir && versions[index] ? await readVersion(dir, versions[index].id) : null;
  const previousSummary = versions[index + 1] ?? null;
  const previous =
    dir && previousSummary ? await readVersion(dir, previousSummary.id) : null;

  return (
    <section className="px-6 pb-28 pt-12 sm:pt-16">
      <div className="mx-auto max-w-4xl">
        <div
          className="flex flex-wrap items-start justify-between gap-4"
          data-print-hide
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              사람인 이력서
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              사람인 이력서 칸 순서대로 정리했습니다. 칸마다 복사해 사람인에
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

        {current && (
          <ResumeWorkspace
            key={current.id}
            version={{
              id: current.id,
              label: current.label,
              savedLabel: KST_DATE_TIME.format(new Date(current.savedAt)),
            }}
            versions={versions.map((version) => ({
              id: version.id,
              label: version.label,
              savedLabel: KST_DATE_TIME.format(new Date(version.savedAt)),
            }))}
            previousLabel={previousSummary?.label ?? null}
            changed={[
              ...changedPaths(previous?.resume ?? null, current.resume),
            ]}
            resume={current.resume}
            asOf={KST_MONTH.format(new Date())
              .replace(/\.\s?/g, ".")
              .replace(/\.$/, "")}
          />
        )}
      </div>
    </section>
  );
}
