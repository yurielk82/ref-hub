import { NextResponse, type NextRequest } from "next/server";

import { HOME_PATH, SEE_OTHER } from "@/lib/auth/config";
import { isSameOriginRequest, publicOrigin } from "@/lib/auth/origin";
import { createSupabaseServer } from "@/lib/auth/supabase-server";
import { portfolioHome } from "@/lib/selected-portfolio/workspace";

/** 로그아웃 — 이 사이트 세션만 끊고(공용 로그인 서버의 다른 앱 세션은 남긴다) 포트폴리오로 보낸다 */
export async function POST(request: NextRequest) {
  const origin = publicOrigin(request.url);
  if (!isSameOriginRequest(request.headers, origin)) {
    return NextResponse.json({ error: "cross_origin_write" }, { status: 403 });
  }
  const supabase = await createSupabaseServer();
  await supabase?.auth.signOut({ scope: "local" });
  const form = await request.formData().catch(() => null);
  return NextResponse.redirect(
    new URL(portfolioHome(form?.get("next") ?? HOME_PATH), origin),
    SEE_OTHER,
  );
}
