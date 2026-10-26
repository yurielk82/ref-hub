import { NextResponse } from "next/server";

import { jobsViewer } from "@/auth";

/**
 * 메뉴의 '공고 모음' 표시 여부. 공개 페이지는 정적이라 서버에서 세션을 볼 수 없어 브라우저가 묻는다.
 * 이메일은 돌려주지 않는다.
 */
async function canViewJobs(): Promise<boolean> {
  try {
    return (await jobsViewer()) !== null;
  } catch {
    // 로그인 설정 전(AUTH_SECRET 없음)에는 세션을 읽을 수 없다 — 메뉴만 숨긴다.
    return false;
  }
}

export async function GET() {
  return NextResponse.json(
    { canViewJobs: await canViewJobs() },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
