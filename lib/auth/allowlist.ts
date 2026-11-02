/**
 * 공고 모음 로그인 허용 계정. 운영 값은 서버 비밀 파일의 JOBS_ALLOWED_EMAILS(쉼표 구분)다.
 * 목록이 비어 있으면 아무도 들어오지 못한다.
 */

export function parseAllowlist(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(/[\s,]+/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

/** 공용 로그인 서버(Supabase GoTrue)가 돌려주는 사용자 중 판정에 쓰는 부분 */
export interface AuthUser {
  email?: string | null;
  email_confirmed_at?: string | null;
  app_metadata?: { provider?: string; providers?: string[] };
}

function hasGoogleIdentity(user: AuthUser): boolean {
  const meta = user.app_metadata ?? {};
  return (
    meta.provider === "google" || (meta.providers ?? []).includes("google")
  );
}

/**
 * 공용 로그인 서버는 여러 앱 회원(이메일로 누구나 가입하는 앱 포함)이 함께 쓴다.
 * 로그인만으로는 부족해서 Google 신원이 있고 이메일이 확인된 허용 목록 계정만 연다.
 */
export function isAllowedUser(
  user: AuthUser | null | undefined,
  allowlist: Set<string>,
): boolean {
  if (!user?.email || !user.email_confirmed_at || !hasGoogleIdentity(user)) {
    return false;
  }
  return allowlist.has(user.email.toLowerCase());
}

/** JWT 내용(가운데 부분)을 읽는다. 서명 확인은 getUser가 로그인 서버에서 이미 했다 */
function readJwtPayload(accessToken: string): unknown {
  const parts = accessToken.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

/**
 * 이번 세션이 Google(OAuth)로 받은 것인가. 같은 계정에 비밀번호 로그인이 함께 걸려 있어도
 * 공고 모음은 Google로 받은 세션만 연다(GoTrue 접근 토큰의 amr).
 */
export function isOAuthSession(
  accessToken: string | null | undefined,
): boolean {
  if (!accessToken) return false;
  const payload = readJwtPayload(accessToken);
  const amr = (payload as { amr?: unknown } | null)?.amr;
  return (
    Array.isArray(amr) &&
    amr.some(
      (entry) => (entry as { method?: unknown } | null)?.method === "oauth",
    )
  );
}
