import { connection } from "next/server";

import {
  isAllowedUser,
  isOAuthSession,
  parseAllowlist,
  type AuthUser,
} from "@/lib/auth/allowlist";
import { createSupabaseServer, supabaseEnv } from "@/lib/auth/supabase-server";

/**
 * 공고 모음(/jobs) 전용 로그인. 포트폴리오는 공개이고, 로그인은 공용 Supabase(sb.dvsharp.com)의
 * Google 로그인을 거쳐 허용 목록 계정만 통과한다. 흐름: /auth/google → Supabase → Google → /auth/callback.
 * 운영 값(서버 비밀 파일 → github-ref-hub.service EnvironmentFile):
 *   SUPABASE_URL, SUPABASE_ANON_KEY, JOBS_ALLOWED_EMAILS
 */

export function allowedEmails(): Set<string> {
  return parseAllowlist(process.env.JOBS_ALLOWED_EMAILS);
}

/** 로그인에 필요한 값이 모두 있는가 — 없으면 로그인 화면이 설정 전 안내를 보여 준다 */
export function isAuthConfigured(): boolean {
  return supabaseEnv() !== null && allowedEmails().size > 0;
}

/** 허용 목록 계정이 Google로 받은 세션인가 — 로그인 돌아오기와 화면 확인이 같은 판정을 쓴다 */
export function isJobsSession(
  user: AuthUser | null | undefined,
  accessToken: string | null | undefined,
): boolean {
  return isAllowedUser(user, allowedEmails()) && isOAuthSession(accessToken);
}

/**
 * 공고 모음을 볼 수 있는 세션인가. getUser는 매번 로그인 서버에 물어 위조·폐기된 세션을 막고,
 * 허용 목록이 바뀐 뒤 남은 옛 세션도 막는다. 로그인 서버에 닿지 못하면 로그인 전으로 본다(닫힌 쪽으로 실패).
 */
export async function jobsViewer(): Promise<{ email: string } | null> {
  // 요청마다 판단한다. 빌드 때는 설정 값이 없어 아래에서 바로 끝나므로, 이게 없으면 화면이 정적으로 굳는다.
  await connection();
  if (!isAuthConfigured()) return null;
  const supabase = await createSupabaseServer();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.auth.getUser();
    const email = data.user?.email;
    if (error || !email) return null;
    // getUser가 확인한 같은 접근 토큰이다(쿠키에서 읽고 네트워크는 쓰지 않는다).
    const { data: current } = await supabase.auth.getSession();
    if (!isJobsSession(data.user, current.session?.access_token)) return null;
    return { email: email.toLowerCase() };
  } catch {
    // 시간 초과 등 로그인 서버에 닿지 못한 경우다.
    return null;
  }
}
