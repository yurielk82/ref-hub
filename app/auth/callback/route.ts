import { NextResponse, type NextRequest } from "next/server";

import { allowedEmails } from "@/auth";
import { isAllowedUser } from "@/lib/auth/allowlist";
import { JOBS_PATH, LOGIN_PATH } from "@/lib/auth/config";
import { publicOrigin } from "@/lib/auth/origin";
import { createSupabaseServer } from "@/lib/auth/supabase-server";

/**
 * Google 로그인에서 돌아오기 — code를 서버 세션으로 바꾸고 허용 계정인지 본다.
 * 허용되지 않은 계정은 이 사이트 세션만 바로 끊는다(공용 로그인 서버의 다른 앱 세션은 남긴다).
 */
export async function GET(request: NextRequest) {
  const origin = publicOrigin(request.url);
  const toLogin = (error: string) =>
    NextResponse.redirect(new URL(`${LOGIN_PATH}?error=${error}`, origin));

  const code = request.nextUrl.searchParams.get("code");
  const supabase = await createSupabaseServer();
  if (!supabase) return toLogin("config");
  if (!code) return toLogin("oauth");

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return toLogin("oauth");
  if (!isAllowedUser(data.user, allowedEmails())) {
    await supabase.auth.signOut({ scope: "local" });
    return toLogin("forbidden");
  }
  return NextResponse.redirect(new URL(JOBS_PATH, origin));
}
