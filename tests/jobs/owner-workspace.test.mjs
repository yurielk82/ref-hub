import test from "node:test";
import assert from "node:assert/strict";
import { resumeHref } from "../../lib/resume/platforms.ts";

test("홈페이지 안에서 이력서 사이트와 버전을 바꿔도 같은 트랙을 유지한다", () => {
  assert.equal(resumeHref("saramin", undefined, "/"), "/?manage=resume");
  assert.equal(
    resumeHref("jobkorea", "saved-version", "/ax"),
    "/ax?manage=resume&p=jobkorea&v=saved-version",
  );
});

test("기존 이력서 다운로드와 외부 진입에서 쓰는 주소는 보존한다", () => {
  assert.equal(resumeHref("saramin"), "/resume");
  assert.equal(
    resumeHref("jobkorea", "saved-version"),
    "/resume?p=jobkorea&v=saved-version",
  );
});
