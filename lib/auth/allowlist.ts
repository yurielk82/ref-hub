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
