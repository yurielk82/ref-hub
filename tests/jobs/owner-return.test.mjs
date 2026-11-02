import test from "node:test";
import assert from "node:assert/strict";
import {
  ownerSection,
  portfolioHome,
  safeReturnTo,
} from "../../lib/selected-portfolio/workspace.ts";

test("오너 로그인 복귀는 현재 공개 트랙의 허용된 작업만 받는다", () => {
  assert.equal(
    safeReturnTo("/ax?manage=resume&p=jobkorea&v=saved_1"),
    "/ax?manage=resume&p=jobkorea&v=saved_1",
  );
  assert.equal(safeReturnTo("/?manage=jobs"), "/?manage=jobs");
  for (const value of [
    "https://evil.example/",
    "//evil.example/",
    "/\\evil.example/",
    "/resume",
    ["/ax"],
    null,
  ]) {
    assert.equal(safeReturnTo(value), "/");
  }
  assert.equal(
    safeReturnTo("/ax?manage=unknown&next=https://evil.example"),
    "/ax",
  );
});

test("배열·임의 관리 작업과 다른 트랙 이름을 실행하지 않는다", () => {
  assert.equal(ownerSection(["resume"]), null);
  assert.equal(ownerSection("settings"), null);
  assert.equal(ownerSection("jobs"), "jobs");
  assert.equal(portfolioHome("/ax"), "/ax");
  assert.equal(portfolioHome("/other"), "/");
});
