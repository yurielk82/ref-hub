import { NextResponse, type NextRequest } from "next/server";

import { refreshSession } from "@/lib/auth/supabase-server";

/**
 * 로그인 세션을 쓰는 서버 컴포넌트 화면 앞에서만 Supabase 세션을 갱신한다.
 * 서버 컴포넌트는 쿠키를 쓸 수 없어서, 접근 토큰이 만료된 채로 들어가면 갱신 결과를 저장하지 못한다.
 * 포트폴리오 화면은 공개·정적이라 거치지 않는다. 접근 판정은 각 화면의 jobsViewer()가 한다.
 */
export async function proxy(request: NextRequest) {
  return refreshSession(request, (req) => NextResponse.next({ request: req }));
}

export const config = {
  matcher: ["/jobs", "/login"],
};
