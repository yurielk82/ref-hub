import test from "node:test";
import assert from "node:assert/strict";

import { mergeCollection, recordFailure } from "../../lib/jobs/store.ts";
import { toBoardItems, kstDaysUntil } from "../../lib/jobs/board.ts";

function posting(id, overrides = {}) {
  return {
    id,
    url: `https://www.saramin.co.kr/${id}`,
    title: `공고 ${id}`,
    company: "회사",
    companyUrl: null,
    location: "서울",
    jobType: "정규직",
    industryCode: "703",
    industry: "제약·보건·바이오",
    jobCodes: ["699"],
    jobNames: "영업관리",
    experience: { code: 2, min: 3, max: 10, label: "경력 3~10년" },
    education: "학력무관",
    salary: "회사내규에 따름",
    keywords: [],
    postedAt: "2026-10-20T00:00:00.000Z",
    expiresAt: "2026-11-20T14:59:59.000Z",
    closeType: "접수마감일",
    active: true,
    ...overrides,
  };
}

const DAY1 = new Date("2026-10-26T22:00:00.000Z"); // 10-27 07:00 KST
const DAY2 = new Date("2026-10-27T22:00:00.000Z"); // 10-28 07:00 KST

test("처음 본 공고는 수집 시각을 처음 본 시각으로 남긴다", () => {
  const { store, added } = mergeCollection(
    null,
    [posting("a"), posting("b")],
    DAY1,
  );
  assert.equal(added, 2);
  assert.equal(store.version, 1);
  assert.equal(store.lastSuccessAt, DAY1.toISOString());
  assert.deepEqual(store.lastRun, {
    at: DAY1.toISOString(),
    ok: true,
    fetched: 2,
    added: 2,
  });
  for (const p of store.postings) {
    assert.equal(p.firstSeenAt, DAY1.toISOString());
    assert.equal(p.fit.level, "high");
  }
});

test("다시 받은 공고는 처음 본 시각을 지키고 내용은 새 값으로 바꾼다", () => {
  const first = mergeCollection(null, [posting("a")], DAY1).store;
  const { store, added } = mergeCollection(
    first,
    [posting("a", { title: "바뀐 제목" }), posting("c")],
    DAY2,
  );
  assert.equal(added, 1);
  const a = store.postings.find((p) => p.id === "a");
  assert.equal(a.firstSeenAt, DAY1.toISOString());
  assert.equal(a.lastSeenAt, DAY2.toISOString());
  assert.equal(a.title, "바뀐 제목");
});

test("같은 수집 안에서 겹친 공고는 한 번만 센다", () => {
  const { store, added } = mergeCollection(
    null,
    [posting("a"), posting("a")],
    DAY1,
  );
  assert.equal(added, 1);
  assert.equal(store.postings.length, 1);
  assert.equal(store.lastRun.fetched, 1);
});

test("마감 뒤 14일이 지난 공고와 30일 넘게 다시 안 보인 상시 공고는 지운다", () => {
  const old = mergeCollection(
    null,
    [
      posting("expired", { expiresAt: "2026-10-10T14:59:59.000Z" }),
      posting("recently-expired", { expiresAt: "2026-10-20T14:59:59.000Z" }),
      posting("always", { expiresAt: null, closeType: "상시" }),
    ],
    new Date("2026-09-20T22:00:00.000Z"),
  ).store;
  const { store } = mergeCollection(old, [], DAY2);
  assert.deepEqual(store.postings.map((p) => p.id).sort(), [
    "recently-expired",
  ]);
});

test("최근 게시된 공고가 앞에 온다", () => {
  const { store } = mergeCollection(
    null,
    [
      posting("old", { postedAt: "2026-10-01T00:00:00.000Z" }),
      posting("new", { postedAt: "2026-10-25T00:00:00.000Z" }),
    ],
    DAY1,
  );
  assert.deepEqual(
    store.postings.map((p) => p.id),
    ["new", "old"],
  );
});

test("수집 실패는 기존 공고를 지우지 않고 실패만 남긴다", () => {
  const ok = mergeCollection(null, [posting("a")], DAY1).store;
  const failed = recordFailure(ok, DAY2, "일일 최대 요청 가능 횟수 초과");
  assert.equal(failed.postings.length, 1);
  assert.equal(failed.lastSuccessAt, DAY1.toISOString());
  assert.deepEqual(failed.lastRun, {
    at: DAY2.toISOString(),
    ok: false,
    fetched: 0,
    added: 0,
    message: "일일 최대 요청 가능 횟수 초과",
  });
  assert.equal(recordFailure(null, DAY2, "x").postings.length, 0);
});

test("마감까지 남은 날은 한국 날짜로 센다", () => {
  // 10-27 07:00 KST 기준, 10-27 23:59:59 KST 마감은 오늘(0일)이다.
  assert.equal(kstDaysUntil("2026-10-27T14:59:59.000Z", DAY1), 0);
  assert.equal(kstDaysUntil("2026-10-28T14:59:59.000Z", DAY1), 1);
  assert.equal(kstDaysUntil("2026-10-26T14:59:59.000Z", DAY1), -1);
  assert.equal(kstDaysUntil(null, DAY1), null);
});

test("목록 항목에 새 공고·마감 임박 표시를 붙이고 마감 지난 공고는 뺀다", () => {
  const first = mergeCollection(null, [posting("a")], DAY1).store;
  const store = mergeCollection(
    first,
    [
      posting("a"),
      posting("soon", { expiresAt: "2026-10-30T14:59:59.000Z" }),
      posting("gone", { expiresAt: "2026-10-27T14:59:59.000Z" }),
    ],
    DAY2,
  ).store;
  const items = toBoardItems(store, DAY2);
  assert.deepEqual(items.map((i) => i.id).sort(), ["a", "soon"]);
  const soon = items.find((i) => i.id === "soon");
  assert.equal(soon.isNew, true);
  assert.equal(soon.daysLeft, 2);
  assert.equal(soon.closingSoon, true);
  const a = items.find((i) => i.id === "a");
  assert.equal(a.isNew, false);
  assert.equal(a.closingSoon, false);
});
