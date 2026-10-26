import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { jobsViewer, signOut } from "@/auth";
import { toBoardItems } from "@/lib/jobs/board";
import { SEARCH_QUERIES } from "@/lib/jobs/queries";
import { jobsDataDir, readStore } from "@/lib/jobs/store-file";
import type { JobStore } from "@/lib/jobs/types";
import { JobsBoard, type JobsBoardItem } from "@/components/jobs/jobs-board";
import { CollectionInfo } from "@/components/jobs/collection-info";

export const metadata: Metadata = {
  title: "공고 모음",
  robots: { index: false, follow: false },
};

const KST_DATE = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
});
const KST_DATE_TIME = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

async function signOutToHome() {
  "use server";
  await signOut({ redirectTo: "/" });
}

async function loadStore(): Promise<{
  store: JobStore | null;
  problem: string | null;
}> {
  const dir = jobsDataDir();
  if (!dir)
    return {
      store: null,
      problem: "서버에 공고 저장 폴더가 지정되지 않았습니다.",
    };
  const read = await readStore(dir);
  if (read.kind === "ok") return { store: read.store, problem: null };
  if (read.kind === "missing") return { store: null, problem: null };
  return {
    store: null,
    problem: `저장 파일을 읽지 못했습니다: ${read.message}`,
  };
}

export default async function JobsPage() {
  if (!(await jobsViewer())) redirect("/login");

  const now = new Date();
  const { store, problem } = await loadStore();
  const items: JobsBoardItem[] = store
    ? toBoardItems(store, now).map((item) => ({
        ...item,
        postedLabel: item.postedAt
          ? KST_DATE.format(new Date(item.postedAt))
          : null,
      }))
    : [];
  const lastRun = store?.lastRun ?? null;
  const failure =
    problem ??
    (lastRun && !lastRun.ok
      ? `${KST_DATE_TIME.format(new Date(lastRun.at))} 수집이 실패했습니다: ${lastRun.message ?? "원인 미상"}. 이전에 모은 공고를 보여 줍니다.`
      : null);

  return (
    <section className="px-6 pb-28 pt-12 sm:pt-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              공고 모음
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              제약사 영업관리·영업기획 공고를 사람인에서 매일 아침 모읍니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CollectionInfo
              lastRunLabel={
                lastRun ? KST_DATE_TIME.format(new Date(lastRun.at)) : null
              }
              lastRunOk={lastRun?.ok ?? null}
              lastRunSummary={
                lastRun?.ok
                  ? `받은 공고 ${lastRun.fetched}건 · 새 공고 ${lastRun.added}건`
                  : null
              }
              storedCount={store?.postings.length ?? 0}
              queries={SEARCH_QUERIES.map((query) => query.label)}
            />
            <form action={signOutToHome}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
              >
                <LogOut className="h-3.5 w-3.5" />
                로그아웃
              </button>
            </form>
          </div>
        </div>

        {failure && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
          >
            {failure}
          </p>
        )}

        <JobsBoard items={items} hasStore={store !== null} />

        <p className="mt-10 text-xs leading-6 text-stone-500 dark:text-stone-400">
          공고 정보 출처:{" "}
          <a
            href="https://www.saramin.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-[var(--accent)]"
          >
            사람인
          </a>
          . 지원 전 원문 공고에서 내용을 확인하세요.
        </p>
      </div>
    </section>
  );
}
