import { NextResponse, type NextRequest } from "next/server";

import { isJobsSession } from "@/auth";
import { type LoginError } from "@/lib/auth/config";
import { loginErrorUrl, publicOrigin } from "@/lib/auth/origin";
import { createSupabaseServer } from "@/lib/auth/supabase-server";
import {
  RETURN_TO_COOKIE,
  safeReturnTo,
} from "@/lib/selected-portfolio/workspace";

/**
 * Google 로그인에서 돌아오기 — code를 서버 세션으로 바꾸고 허용 계정인지 본다.
 * 허용되지 않은 계정은 이 사이트 세션만 바로 끊는다(공용 로그인 서버의 다른 앱 세션은 남긴다).
 */
export async function GET(request: NextRequest) {
  const origin = publicOrigin(request.url);
  const next = safeReturnTo(request.cookies.get(RETURN_TO_COOKIE)?.value);
  const toLogin = (error: LoginError) => {
    const url = loginErrorUrl(origin, error);
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  };

  const code = request.nextUrl.searchParams.get("code");
  const supabase = await createSupabaseServer();
  if (!supabase) return toLogin("config");
  if (!code) return toLogin("oauth");

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return toLogin("oauth");
  if (!isJobsSession(data.user, data.session?.access_token)) {
    await supabase.auth.signOut({ scope: "local" });
    return toLogin("forbidden");
  }
  const response = NextResponse.redirect(new URL(next, origin));
  response.cookies.delete(RETURN_TO_COOKIE);
  return response;
}
