import { PRODUCTION_ORIGIN } from "./config.ts";

/**
 * 돌아올 주소를 만들 공개 출처. 운영은 고정값만 쓴다(Host 헤더로 바뀌지 않게, RFC 9700 정확 일치).
 * 개발에서만 요청 주소를 쓴다.
 */
export function publicOrigin(requestUrl: string): string {
  if (process.env.NODE_ENV === "production") return PRODUCTION_ORIGIN;
  return new URL(requestUrl).origin;
}

/** 상태를 바꾸는 요청이 우리 화면에서 왔는가(OWASP CSRF 치트시트: Origin, 없으면 Sec-Fetch-Site) */
export function isSameOriginRequest(
  headers: Headers,
  expectedOrigin: string,
): boolean {
  const origin = headers.get("origin");
  if (origin) return origin === expectedOrigin;
  return headers.get("sec-fetch-site") === "same-origin";
}
