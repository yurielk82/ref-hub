import test from "node:test";
import assert from "node:assert/strict";

import { isAllowedUser, parseAllowlist } from "../../lib/auth/allowlist.ts";

test("허용 목록은 쉼표·공백으로 나누고 대소문자를 무시한다", () => {
  assert.deepEqual(
    [
      ...parseAllowlist(
        " Owner@Example.com, second@example.com\nthird@example.com ",
      ),
    ],
    ["owner@example.com", "second@example.com", "third@example.com"],
  );
  assert.equal(parseAllowlist(undefined).size, 0);
  assert.equal(parseAllowlist("  ").size, 0);
});

const owner = {
  email: "OWNER@example.com",
  email_confirmed_at: "2026-10-01T00:00:00Z",
  app_metadata: { provider: "google", providers: ["google"] },
};

test("공용 로그인 서버에서 Google로 인증된 허용 계정만 들어온다", () => {
  assert.equal(isAllowedUser(owner, parseAllowlist("owner@example.com")), true);
});

test("Google 신원이 함께 연결된 계정은 처음 가입 방식이 달라도 들어온다", () => {
  const linked = {
    ...owner,
    app_metadata: { provider: "email", providers: ["email", "google"] },
  };
  assert.equal(
    isAllowedUser(linked, parseAllowlist("owner@example.com")),
    true,
  );
});

test("다른 앱 회원·이메일 미확인·Google 신원 없음·빈 목록은 거절한다", () => {
  const allow = parseAllowlist("owner@example.com");
  assert.equal(isAllowedUser(null, allow), false);
  assert.equal(
    isAllowedUser({ ...owner, email: "other@example.com" }, allow),
    false,
  );
  assert.equal(isAllowedUser({ ...owner, email: undefined }, allow), false);
  assert.equal(
    isAllowedUser({ ...owner, email_confirmed_at: undefined }, allow),
    false,
  );
  assert.equal(
    isAllowedUser(
      { ...owner, app_metadata: { provider: "email", providers: ["email"] } },
      allow,
    ),
    false,
  );
  assert.equal(isAllowedUser({ ...owner, app_metadata: {} }, allow), false);
  assert.equal(isAllowedUser(owner, parseAllowlist("")), false);
});
