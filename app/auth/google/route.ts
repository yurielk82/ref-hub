import { NextResponse, type NextRequest } from "next/server";

import { isAuthConfigured } from "@/auth";
import { CALLBACK_PATH, LOGIN_PATH } from "@/lib/auth/config";
import { publicOrigin } from "@/lib/auth/origin";
import { createSupabaseServer } from "@/lib/auth/supabase-server";

/**
 * Google 로그인 시작 — 서버 PKCE(확인 값은 쿠키). 공용 Supabase가 Google로 보내고, Google은 sb 콜백으로,
 * Supabase는 다시 이 사이트의 고정 콜백 경로로 돌려보낸다.
 */
export async function GET(request: NextRequest) {
  const origin = publicOrigin(request.url);
  const supabase = isAuthConfigured() ? await createSupabaseServer() : null;
  const started = supabase
    ? await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: new URL(CALLBACK_PATH, origin).toString(),
          queryParams: { prompt: "select_account" },
          skipBrowserRedirect: true,
        },
      })
    : null;
  if (!started || started.error || !started.data.url) {
    const login = new URL(LOGIN_PATH, origin);
    login.searchParams.set("error", supabase ? "oauth" : "config");
    return NextResponse.redirect(login);
  }
  return NextResponse.redirect(started.data.url);
}
