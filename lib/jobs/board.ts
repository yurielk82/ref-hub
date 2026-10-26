import { DAY_MS, type JobStore, type StoredPosting } from "./types.ts";

/** 마감까지 이 날수 이하이면 '마감 임박'이다 */
export const CLOSING_SOON_DAYS = 3;

const KST_DATE = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function kstDayNumber(date: Date): number {
  return Date.parse(`${KST_DATE.format(date)}T00:00:00Z`) / DAY_MS;
}

/** 마감일까지 남은 날 — 한국 날짜 기준. 오늘 마감이면 0, 지났으면 음수, 마감일이 없으면 null */
export function kstDaysUntil(iso: string | null, now: Date): number | null {
  if (!iso) return null;
  return kstDayNumber(new Date(iso)) - kstDayNumber(now);
}

export interface BoardItem extends StoredPosting {
  /** 마지막 성공 수집에서 처음 본 공고 */
  isNew: boolean;
  daysLeft: number | null;
  closingSoon: boolean;
}

/** 화면에 올릴 공고 — 마감이 지났거나 사람인에서 마감 처리된 공고는 뺀다. */
export function toBoardItems(store: JobStore, now: Date): BoardItem[] {
  const items: BoardItem[] = [];
  for (const posting of store.postings) {
    const daysLeft = kstDaysUntil(posting.expiresAt, now);
    if (!posting.active || (daysLeft !== null && daysLeft < 0)) continue;
    items.push({
      ...posting,
      isNew:
        store.lastSuccessAt !== null &&
        posting.firstSeenAt === store.lastSuccessAt,
      daysLeft,
      closingSoon: daysLeft !== null && daysLeft <= CLOSING_SOON_DAYS,
    });
  }
  return items;
}
