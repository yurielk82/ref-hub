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

export interface SignInAttempt {
  provider: string | undefined;
  email: string | null | undefined;
  /** Google 프로필의 email_verified */
  emailVerified: boolean | undefined;
}

export function isAllowedSignIn(
  attempt: SignInAttempt,
  allowlist: Set<string>,
): boolean {
  if (
    attempt.provider !== "google" ||
    attempt.emailVerified !== true ||
    !attempt.email
  ) {
    return false;
  }
  return allowlist.has(attempt.email.toLowerCase());
}
