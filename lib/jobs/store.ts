import { scoreFit } from "./fit.ts";
import {
  DAY_MS,
  type JobPosting,
  type JobStore,
  type StoredPosting,
} from "./types.ts";

/** 마감 뒤 이 기간이 지나면 목록에서 지운다 */
const EXPIRED_RETENTION_DAYS = 14;
/** 마감일이 없는 공고(상시·수시)는 이 기간 동안 다시 안 보이면 지운다 */
const UNSEEN_RETENTION_DAYS = 30;

export function emptyStore(): JobStore {
  return { version: 1, lastSuccessAt: null, lastRun: null, postings: [] };
}

function keep(posting: StoredPosting, now: Date): boolean {
  if (posting.expiresAt) {
    return (
      Date.parse(posting.expiresAt) >=
      now.getTime() - EXPIRED_RETENTION_DAYS * DAY_MS
    );
  }
  return (
    Date.parse(posting.lastSeenAt) >=
    now.getTime() - UNSEEN_RETENTION_DAYS * DAY_MS
  );
}

function byPostedDesc(a: StoredPosting, b: StoredPosting): number {
  return (
    (b.postedAt ?? "").localeCompare(a.postedAt ?? "") ||
    a.id.localeCompare(b.id)
  );
}

/** 한 번의 수집 결과를 저장본에 합친다. 처음 본 공고 수를 함께 돌려준다. */
export function mergeCollection(
  previous: JobStore | null,
  fetched: JobPosting[],
  runAt: Date,
): { store: JobStore; added: number } {
  const at = runAt.toISOString();
  const byId = new Map(
    (previous ?? emptyStore()).postings.map((p) => [p.id, p]),
  );
  const unique = new Map(fetched.map((p) => [p.id, p]));
  let added = 0;

  for (const posting of unique.values()) {
    const existing = byId.get(posting.id);
    if (!existing) added += 1;
    byId.set(posting.id, {
      ...posting,
      firstSeenAt: existing?.firstSeenAt ?? at,
      lastSeenAt: at,
      fit: scoreFit(posting),
    });
  }

  const postings = [...byId.values()]
    .filter((p) => keep(p, runAt))
    .sort(byPostedDesc);
  return {
    store: {
      version: 1,
      lastSuccessAt: at,
      lastRun: { at, ok: true, fetched: unique.size, added },
      postings,
    },
    added,
  };
}

/** 수집이 실패해도 이미 모은 공고는 그대로 두고 실패만 남긴다. */
export function recordFailure(
  previous: JobStore | null,
  runAt: Date,
  message: string,
): JobStore {
  const base = previous ?? emptyStore();
  return {
    ...base,
    lastRun: {
      at: runAt.toISOString(),
      ok: false,
      fetched: 0,
      added: 0,
      message,
    },
  };
}
