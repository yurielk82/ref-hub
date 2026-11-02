import test from "node:test";
import assert from "node:assert/strict";
import { isReviewSession, isOAuthSession } from "../../lib/auth/allowlist.ts";

const session = (method) =>
  `header.${Buffer.from(JSON.stringify({ amr: [{ method }] })).toString("base64url")}.signature`;
const user = {
  id: "review-user",
  email: "review@example.invalid",
  email_confirmed_at: "2026-11-02T00:00:00Z",
  app_metadata: { provider: "email" },
};
const allowed = {
  user,
  accessToken: session("password"),
  allowlist: new Set([user.email]),
  userId: user.id,
  expiresAt: 200,
  now: 100,
};

test("검토 계정은 정확한 신원과 허용 이메일·유효 시간·비밀번호 세션이 모두 필요하다", () => {
  assert.equal(isReviewSession(allowed), true);
  for (const changes of [
    { userId: undefined },
    { userId: "another-user" },
    { user: null },
    { user: { ...user, email_confirmed_at: null } },
    { allowlist: new Set() },
    { expiresAt: Number.NaN },
    { expiresAt: Number.POSITIVE_INFINITY },
    { expiresAt: 100 },
    { expiresAt: 99 },
    { accessToken: null },
    { accessToken: session("oauth") },
    { accessToken: session("otp") },
  ])
    assert.equal(isReviewSession({ ...allowed, ...changes }), false);
});

test("검토용 비밀번호 세션은 Google OAuth 세션으로 판정하지 않는다", () => {
  assert.equal(isOAuthSession(allowed.accessToken), false);
  assert.equal(isOAuthSession(session("oauth")), true);
});
