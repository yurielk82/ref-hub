import { Info } from "lucide-react";

/**
 * 수집 시각·건수·조건 같은 운영 정보는 목록 위에 늘어놓지 않고 이 정보창에 모은다.
 * <details>라 스크립트 없이 키보드·터치로 열고 닫힌다.
 */
export function CollectionInfo(props: {
  lastRunLabel: string | null;
  lastRunOk: boolean | null;
  lastRunSummary: string | null;
  storedCount: number;
  queries: string[];
}) {
  return (
    <details className="group relative">
      <summary
        className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] group-open:border-[var(--accent)] group-open:text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 [&::-webkit-details-marker]:hidden"
        aria-label="수집 정보"
      >
        <Info className="h-3.5 w-3.5" />
        수집 정보
      </summary>
      <div className="absolute right-0 z-20 mt-2 w-[min(22rem,calc(100vw-3rem))] rounded-lg border border-stone-200 bg-white p-4 text-sm shadow-[0_8px_24px_-8px_rgb(0_0_0/0.25)] dark:border-stone-800 dark:bg-stone-900">
        <dl className="grid gap-3">
          <div>
            <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              마지막 수집
            </dt>
            <dd className="mt-1 leading-6 text-stone-800 dark:text-stone-200">
              {props.lastRunLabel
                ? `${props.lastRunLabel} · ${props.lastRunOk ? "성공" : "실패"}`
                : "아직 수집하지 않았습니다"}
            </dd>
            {props.lastRunSummary && (
              <dd className="leading-6 text-stone-600 dark:text-stone-400">
                {props.lastRunSummary}
              </dd>
            )}
          </div>
          <div>
            <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              보관 중인 공고
            </dt>
            <dd className="mt-1 leading-6 text-stone-800 dark:text-stone-200">
              {props.storedCount}건 · 마감 뒤 14일까지 보관
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              수집 조건 · 매일 07:00
            </dt>
            <dd className="mt-1">
              <ul className="grid gap-1 leading-6 text-stone-700 dark:text-stone-300">
                {props.queries.map((query) => (
                  <li key={query}>{query}</li>
                ))}
              </ul>
              <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">
                헤드헌팅·파견 공고는 제외합니다.
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </details>
  );
}
