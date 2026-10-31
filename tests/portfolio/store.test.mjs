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
