"use client";

import { useId, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";

import type { BoardItem } from "@/lib/jobs/board";
import type { FitLevel } from "@/lib/jobs/types";

export interface JobsBoardItem extends BoardItem {
  /** 서버에서 한국 날짜로 만든 게시일 표기 — 브라우저 시간대와 무관하게 같게 보인다 */
  postedLabel: string | null;
}

type Filter = "all" | "new" | "closing" | "high";

const FILTERS: ReadonlyArray<{ id: Filter; label: string }> = [
  { id: "all", label: "전체" },
  { id: "new", label: "새 공고" },
  { id: "closing", label: "마감 임박" },
  { id: "high", label: "적합도 높음" },
];

const FIT_LABEL: Readonly<Record<FitLevel, string>> = {
  high: "적합도 높음",
  medium: "적합도 보통",
  low: "적합도 낮음",
};

const FIT_CLASS: Readonly<Record<FitLevel, string>> = {
  high: "bg-[var(--accent-muted)] text-[var(--accent)]",
  medium: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
  low: "bg-stone-50 text-stone-500 dark:bg-stone-900 dark:text-stone-400",
};

const FIT_ORDER: Readonly<Record<FitLevel, number>> = {
  high: 0,
  medium: 1,
  low: 2,
};

function matches(item: JobsBoardItem, filter: Filter): boolean {
  if (filter === "new") return item.isNew;
  if (filter === "closing") return item.closingSoon;
  if (filter === "high") return item.fit.level === "high";
  return true;
}

function deadlineLabel(item: JobsBoardItem): string {
  if (item.daysLeft === null) return item.closeType || "마감일 없음";
  return item.daysLeft === 0 ? "오늘 마감" : `D-${item.daysLeft}`;
}

export function JobsBoard({
  items,
  hasStore,
}: {
  items: JobsBoardItem[];
  hasStore: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map(({ id }) => [
          id,
          items.filter((item) => matches(item, id)).length,
        ]),
      ) as Record<Filter, number>,
    [items],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = items.filter(
      (item) =>
        matches(item, filter) &&
        (!needle ||
          `${item.title} ${item.company}`.toLowerCase().includes(needle)),
    );
    if (filter === "closing") {
      return [...list].sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0));
    }
    if (filter === "all") {
      // 적합도 → 새 공고 → 게시일(저장 순서) 순
      return [...list].sort(
        (a, b) =>
          FIT_ORDER[a.fit.level] - FIT_ORDER[b.fit.level] ||
          Number(b.isNew) - Number(a.isNew),
      );
    }
    return list;
  }, [items, filter, query]);

  if (!hasStore) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-stone-300 px-6 py-10 dark:border-stone-700">
        <p className="text-base font-semibold text-stone-900 dark:text-stone-100">
          아직 모은 공고가 없습니다.
        </p>
        <p className="mt-2 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-400">
          매일 아침 7시에 사람인에서 제약·바이오 업종의
          영업관리·영업기획·영업지원 공고를 모아 여기에 보여 줍니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="공고 걸러 보기"
          className="flex flex-wrap gap-1.5"
        >
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] aria-pressed:border-[var(--accent)] aria-pressed:bg-[var(--accent-muted)] aria-pressed:text-[var(--accent)] border-stone-200 bg-white text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-600"
            >
              {label}
              <span className="tabular-nums text-xs opacity-70">
                {counts[id]}
              </span>
            </button>
          ))}
        </div>
        <label htmlFor={searchId} className="relative block sm:w-64">
          <span className="sr-only">회사·공고명 검색</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="회사·공고명 검색"
            className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-8 pr-3 text-sm text-stone-900 placeholder:text-stone-500 focus-visible:border-[var(--accent)] focus-visible:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-400"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-stone-300 px-6 py-8 text-sm leading-6 text-stone-600 dark:border-stone-700 dark:text-stone-400">
          {items.length === 0
            ? "지금 진행 중인 공고가 없습니다. 다음 수집을 기다려 주세요."
            : "조건에 맞는 공고가 없습니다. 다른 보기나 검색어를 골라 보세요."}
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-stone-200 overflow-hidden rounded-lg border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
          {visible.map((item) => (
            <li key={item.id} className="px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 text-base font-semibold leading-6 text-stone-950 underline-offset-4 hover:text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:text-stone-50"
                  >
                    {item.isNew && (
                      <span className="mt-0.5 shrink-0 rounded bg-[var(--accent)] px-1.5 py-0.5 text-[11px] font-bold leading-4 text-white">
                        새 공고
                      </span>
                    )}
                    <span className="break-words">{item.title}</span>
                    <ExternalLink
                      className="mt-1 h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(사람인 공고, 새 창)</span>
                  </a>
                  <p className="mt-1 text-sm leading-6 text-stone-700 dark:text-stone-300">
                    {[
                      item.company,
                      item.location.split(",")[0],
                      item.experience.label,
                      item.jobType,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {item.fit.reasons.length > 0 && (
                    <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">
                      {item.fit.reasons.join(" · ")}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${FIT_CLASS[item.fit.level]}`}
                  >
                    {FIT_LABEL[item.fit.level]}
                  </span>
                  <span
                    className={`text-sm font-semibold tabular-nums ${item.closingSoon ? "text-red-700 dark:text-red-400" : "text-stone-700 dark:text-stone-300"}`}
                  >
                    {deadlineLabel(item)}
                  </span>
                  {item.postedLabel && (
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {item.postedLabel} 게시
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
