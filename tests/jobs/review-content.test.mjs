import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  clearReviewContent,
  ContentError,
  readContent,
  saveContent,
} from "../../lib/portfolio/store.ts";

const fields = [
  {
    id: "ax.hero.role",
    label: "담당 분야",
    value: "업무 자동화 · AX",
    maxLength: 100,
  },
  {
    id: "sales.hero.role",
    label: "담당 분야",
    value: "영업관리",
    maxLength: 100,
  },
  {
    id: "sales.hero.summary",
    label: "소개",
    value: "소개 문구",
    maxLength: 100,
  },
];
async function directory(t) {
  const dir = await mkdtemp(path.join(tmpdir(), "ref-hub-review-content-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}
const initialChange = {
  revision: "initial",
  changes: { "ax.hero.role": "업무 자동화·AX" },
};

test("초기 상태의 검수 저장만 현재 파일과 자기 버전을 함께 정리한다", async (t) => {
  const dir = await directory(t);
  const saved = await saveContent(dir, initialChange, fields, {
    reviewOnly: true,
  });
  assert.equal(
    (await readContent(dir)).values["ax.hero.role"],
    "업무 자동화·AX",
  );
  await clearReviewContent(dir, saved.revision);
  assert.deepEqual(await readContent(dir), {
    revision: "initial",
    savedAt: null,
    values: {},
  });
  await assert.rejects(
    access(path.join(dir, "versions", `${saved.revision}.json`)),
  );
});

test("검수 계정은 다른 항목·여러 항목·기존 저장본을 바꾸지 못한다", async (t) => {
  const dir = await directory(t);
  for (const changes of [
    {},
    { "sales.hero.summary": "변경" },
    { "sales.hero.role": "영업관리", "ax.hero.role": "AX" },
  ])
    await assert.rejects(
      saveContent(dir, { revision: "initial", changes }, fields, {
        reviewOnly: true,
      }),
      ContentError,
    );
  const original = await saveContent(dir, initialChange, fields);
  await assert.rejects(
    saveContent(
      dir,
      { ...initialChange, revision: original.revision },
      fields,
      { reviewOnly: true },
    ),
    ContentError,
  );
  assert.deepEqual(await readContent(dir), original);
});

test("검수 후 다른 오너가 저장했으면 정리 요청이 그 저장을 보존한다", async (t) => {
  const dir = await directory(t);
  const review = await saveContent(dir, initialChange, fields, {
    reviewOnly: true,
  });
  const owner = await saveContent(
    dir,
    {
      revision: review.revision,
      changes: { "sales.hero.summary": "오너 저장" },
    },
    fields,
  );
  await assert.rejects(clearReviewContent(dir, review.revision), ContentError);
  assert.deepEqual(await readContent(dir), owner);
  await access(path.join(dir, "versions", `${review.revision}.json`));
  await access(path.join(dir, "versions", `${owner.revision}.json`));
});

test("현재 파일 삭제 뒤 재시도는 남은 자기 검수 버전만 정리한다", async (t) => {
  const dir = await directory(t);
  const saved = await saveContent(dir, initialChange, fields, {
    reviewOnly: true,
  });
  await rm(path.join(dir, "current.json"));
  await clearReviewContent(dir, saved.revision);
  assert.equal((await readContent(dir)).revision, "initial");
  await assert.rejects(
    access(path.join(dir, "versions", `${saved.revision}.json`)),
  );
});
