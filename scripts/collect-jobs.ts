/**
 * 사람인 채용 공고를 받아 공고 모음 저장 파일에 합친다. 서버 예약 작업이 하루 한 번 실행한다.
 *   node scripts/collect-jobs.ts
 * 환경: SARAMIN_ACCESS_KEY(필수, 서버 비밀 파일), JOBS_DATA_DIR(필수).
 * 요청 주소에 키가 들어가므로 주소는 기록하지 않는다.
 */
import {
  MAX_PAGES_PER_QUERY,
  PUBLISHED_LOOKBACK_DAYS,
  SEARCH_QUERIES,
} from "../lib/jobs/queries.ts";
import {
  SARAMIN_ENDPOINT,
  SARAMIN_MAX_COUNT,
  buildSearchParams,
  parseSaraminResponse,
} from "../lib/jobs/saramin.ts";
import { mergeCollection, recordFailure } from "../lib/jobs/store.ts";
import { readStore, writeStore } from "../lib/jobs/store-file.ts";
import type { JobPosting, JobStore, SearchQuery } from "../lib/jobs/types.ts";

const REQUEST_TIMEOUT_MS = 15_000;
const DAY_MS = 24 * 60 * 60 * 1000;
/** 종료 코드 — 1: 수집 실패(실패 기록은 남김), 2: 실행 설정 누락 */
const EXIT_FAILED = 1;
const EXIT_MISCONFIGURED = 2;

class CollectError extends Error {}

async function fetchPage(
  query: SearchQuery,
  accessKey: string,
  publishedMin: Date,
  start: number,
) {
  const params = buildSearchParams(query, { accessKey, publishedMin, start });
  let response: Response;
  try {
    response = await fetch(`${SARAMIN_ENDPOINT}?${params}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new CollectError(`${query.id}: 요청 실패 (${(error as Error).name})`);
  }
  if (!response.ok)
    throw new CollectError(`${query.id}: HTTP ${response.status}`);
  const result = parseSaraminResponse(await response.json().catch(() => null));
  if (!result.ok) {
    throw new CollectError(
      `${query.id}: 사람인 오류 ${result.code ?? "?"} ${result.message}`,
    );
  }
  return result;
}

async function collect(accessKey: string, now: Date): Promise<JobPosting[]> {
  const publishedMin = new Date(
    now.getTime() - PUBLISHED_LOOKBACK_DAYS * DAY_MS,
  );
  const postings: JobPosting[] = [];
  for (const query of SEARCH_QUERIES) {
    for (let page = 0; page < MAX_PAGES_PER_QUERY; page += 1) {
      const result = await fetchPage(query, accessKey, publishedMin, page);
      postings.push(...result.postings);
      console.log(
        `${query.id} 쪽 ${page}: ${result.postings.length}건 (전체 ${result.total}, 건너뜀 ${result.skipped})`,
      );
      if ((page + 1) * SARAMIN_MAX_COUNT >= result.total) break;
    }
  }
  return postings;
}

async function main(): Promise<number> {
  const accessKey = process.env.SARAMIN_ACCESS_KEY?.trim();
  const dir = process.env.JOBS_DATA_DIR?.trim();
  if (!dir) {
    console.error("JOBS_DATA_DIR가 없습니다");
    return EXIT_MISCONFIGURED;
  }
  const read = await readStore(dir);
  if (read.kind === "invalid") {
    // 망가진 저장본을 덮어쓰면 모은 공고를 잃는다 — 손으로 확인할 때까지 멈춘다.
    console.error(`저장 파일을 읽지 못했습니다: ${read.message}`);
    return EXIT_FAILED;
  }
  const previous: JobStore | null = read.kind === "ok" ? read.store : null;
  const now = new Date();

  if (!accessKey) {
    await writeStore(
      dir,
      recordFailure(previous, now, "사람인 access-key가 아직 없습니다"),
    );
    console.error("SARAMIN_ACCESS_KEY가 없습니다");
    return EXIT_FAILED;
  }

  try {
    const fetched = await collect(accessKey, now);
    const { store, added } = mergeCollection(previous, fetched, now);
    await writeStore(dir, store);
    console.log(
      `완료: 받은 공고 ${store.lastRun?.fetched}건, 새 공고 ${added}건, 보관 ${store.postings.length}건`,
    );
    return 0;
  } catch (error) {
    const message =
      error instanceof CollectError
        ? error.message
        : `예상하지 못한 오류: ${(error as Error).message}`;
    await writeStore(dir, recordFailure(previous, now, message));
    console.error(message);
    return EXIT_FAILED;
  }
}

process.exitCode = await main();
