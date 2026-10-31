import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { readContent, saveContent } from "../../lib/portfolio/store.ts";
const fields = [
  {
    id: "sales.title",
    label: "제목",
    group: "소개",
    value: "원래 제목",
    maxLength: 80,
  },
];
test("저장한 홈페이지 문구를 다시 읽고 오래된 탭의 덮어쓰기를 막는다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "portfolio-"));
  try {
    const initial = await readContent(dir);
    const saved = await saveContent(
      dir,
      {
        revision: initial.revision,
        changes: { "sales.title": "문제를 찾아 해결합니다" },
      },
      fields,
    );
    assert.equal(
      (await readContent(dir)).values["sales.title"],
      "문제를 찾아 해결합니다",
    );
    assert.notEqual(saved.revision, initial.revision);
    await assert.rejects(
      saveContent(
        dir,
        { revision: initial.revision, changes: { "sales.title": "오래된 탭" } },
        fields,
      ),
      /다른 창/,
    );
    assert.deepEqual(await readContent(dir), saved);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("등록되지 않은 항목과 빈 값·길이 초과는 공개본을 바꾸지 않는다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "portfolio-invalid-"));
  try {
    for (const changes of [
      { "sales.title": "" },
      { "sales.title": "a".repeat(81) },
      { "auth.email": "x" },
      { "sales.title": 42 },
    ]) {
      await assert.rejects(
        saveContent(dir, { revision: "initial", changes }, fields),
      );
      assert.equal((await readContent(dir)).revision, "initial");
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("동시에 저장한 두 요청 중 하나만 반영하고 다른 트랙의 문구를 보존한다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "portfolio-concurrent-"));
  try {
    const bothFields = [...fields, { ...fields[0], id: "ax.title" }];
    const first = await saveContent(
      dir,
      { revision: "initial", changes: { "ax.title": "자동화" } },
      bothFields,
    );
    const results = await Promise.allSettled(
      ["첫 요청", "둘째 요청"].map((value) =>
        saveContent(
          dir,
          { revision: first.revision, changes: { "sales.title": value } },
          bothFields,
        ),
      ),
    );
    assert.equal(
      results.filter((result) => result.status === "fulfilled").length,
      1,
    );
    assert.equal(
      results.filter((result) => result.status === "rejected").length,
      1,
    );
    assert.equal((await readContent(dir)).values["ax.title"], "자동화");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
