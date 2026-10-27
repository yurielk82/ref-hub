import type { CookieOptions } from "@supabase/ssr";

import { CODE_VERIFIER_SUFFIX } from "./config.ts";

/**
 * Supabase 인증 쿠키 속성 강화(ASVS 5.0 V3.3). 운영(https)에서는 Secure, 세션 쿠키는 HttpOnly.
 * 브라우저 코드는 세션을 읽지 않는다. PKCE 확인 값 쿠키만 erp-spec·team-pulse와 같은 규칙으로 HttpOnly에서 뺀다.
 */
export function hardenAuthCookie(
  name: string,
  options: CookieOptions,
): CookieOptions {
  return {
    ...options,
    secure: process.env.NODE_ENV === "production",
    httpOnly: !name.endsWith(CODE_VERIFIER_SUFFIX),
  };
}
