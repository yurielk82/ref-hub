import test from "node:test";
import assert from "node:assert/strict";

import { isAllowedSignIn, parseAllowlist } from "../../lib/auth/allowlist.ts";

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

test("Google에서 인증된 허용 계정만 들어온다", () => {
  const allow = parseAllowlist("owner@example.com");
  assert.equal(
    isAllowedSignIn(
      { provider: "google", email: "OWNER@example.com", emailVerified: true },
      allow,
    ),
    true,
  );
});

test("이메일 미인증·다른 계정·다른 제공자·빈 목록은 거절한다", () => {
  const allow = parseAllowlist("owner@example.com");
  const ok = {
    provider: "google",
    email: "owner@example.com",
    emailVerified: true,
  };
  assert.equal(isAllowedSignIn({ ...ok, emailVerified: false }, allow), false);
  assert.equal(
    isAllowedSignIn({ ...ok, emailVerified: undefined }, allow),
    false,
  );
  assert.equal(
    isAllowedSignIn({ ...ok, email: "other@example.com" }, allow),
    false,
  );
  assert.equal(isAllowedSignIn({ ...ok, email: null }, allow), false);
  assert.equal(isAllowedSignIn({ ...ok, provider: "github" }, allow), false);
  assert.equal(isAllowedSignIn(ok, parseAllowlist("")), false);
});
