import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  createShare,
  listShares,
  readShare,
  revokeShare,
  revokeDocumentShares,
} from "../../lib/resume/shares.ts";

test("제출 파일을 고정하고 버전별로 찾으며 공유 중단 뒤에는 읽을 수 없다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-share-test-"));
  try {
    const input = {
      platform: "saramin",
      versionId: "20261101-010000-abcdef",
      kind: "resume",
      format: "docx",
    };
    const body = Buffer.from("submitted file");
    const share = await createShare(dir, input, {
      fileName: "지원자_이력서.docx",
      contentType: "application/octet-stream",
      body,
    });
    assert.match(share.token, /^[0-9a-f]{64}$/);
    body.fill(0);
    assert.equal(
      Buffer.from(
        (await readShare(dir, share.token)).base64,
        "base64",
      ).toString(),
      "submitted file",
    );
    assert.equal(
      (await stat(path.join(dir, "shares", share.token + ".json"))).mode &
        0o777,
      0o600,
    );
    const listed = await listShares(dir, "saramin", input.versionId);
    assert.equal(listed.length, 1);
    assert.equal("base64" in listed[0], false);
    assert.equal(
      (await listShares(dir, "jobkorea", input.versionId)).length,
      0,
    );
    assert.equal(
      (await listShares(dir, "saramin", "different-version")).length,
      0,
    );
    assert.equal(await readShare(dir, "../versions/private"), null);
    assert.equal(await readShare(dir, "0".repeat(64)), null);
    await revokeShare(dir, share.token);
    assert.equal(await readShare(dir, share.token), null);
    assert.deepEqual(await listShares(dir, "saramin", input.versionId), []);
    await revokeShare(dir, share.token);
    await assert.rejects(revokeShare(dir, "../versions/private"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("두 탭이 만든 같은 문서 주소는 한 번에 중단하고 다른 문서는 유지한다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-share-test-"));
  try {
    const input = {
      platform: "saramin",
      versionId: "20261101-010000-abcdef",
      kind: "resume",
      format: "docx",
    };
    const file = {
      fileName: "sample.docx",
      contentType: "application/octet-stream",
      body: Buffer.from("file"),
    };
    const [a, b, career] = await Promise.all([
      createShare(dir, input, file),
      createShare(dir, input, file),
      createShare(dir, { ...input, kind: "career" }, file),
    ]);
    await revokeDocumentShares(dir, a.token);
    assert.equal(await readShare(dir, a.token), null);
    assert.equal(await readShare(dir, b.token), null);
    assert.ok(await readShare(dir, career.token));
    const replacement = await createShare(dir, input, file);
    await assert.rejects(revokeDocumentShares(dir, a.token), /새로고침/);
    assert.ok(await readShare(dir, replacement.token));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
