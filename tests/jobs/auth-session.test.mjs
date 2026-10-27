import test from "node:test";
import assert from "node:assert/strict";

import { hardenAuthCookie } from "../../lib/auth/cookies.ts";
import { isSameOriginRequest } from "../../lib/auth/origin.ts";

test("로그아웃 같은 쓰기 요청은 우리 화면에서 온 것만 받는다", () => {
  const origin = "https://ref.dvsharp.com";
  assert.equal(isSameOriginRequest(new Headers({ origin }), origin), true);
  assert.equal(
    isSameOriginRequest(
      new Headers({ origin: "https://evil.example" }),
      origin,
    ),
    false,
  );
  // Origin이 없으면 Sec-Fetch-Site로 판단하고, 둘 다 없으면 거절한다.
  assert.equal(
    isSameOriginRequest(
      new Headers({ "sec-fetch-site": "same-origin" }),
      origin,
    ),
    true,
  );
  assert.equal(
    isSameOriginRequest(
      new Headers({ "sec-fetch-site": "cross-site" }),
      origin,
    ),
    false,
  );
  assert.equal(isSameOriginRequest(new Headers(), origin), false);
});

test("세션 쿠키는 HttpOnly, PKCE 확인 값 쿠키만 예외다", () => {
  const base = { path: "/", sameSite: "lax" };
  assert.equal(hardenAuthCookie("sb-sb-auth-token", base).httpOnly, true);
  assert.equal(hardenAuthCookie("sb-sb-auth-token.0", base).httpOnly, true);
  assert.equal(
    hardenAuthCookie("sb-sb-auth-token-code-verifier", base).httpOnly,
    false,
  );
  assert.equal(hardenAuthCookie("sb-sb-auth-token", base).path, "/");
});
