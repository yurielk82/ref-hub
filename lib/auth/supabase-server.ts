import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

import { hardenAuthCookie } from "./cookies.ts";

/**
 * 공용 Supabase 주소와 공개(anon) 키. 서버에서만 읽어서 빌드에 박히지 않게 NEXT_PUBLIC_ 이름을 쓰지 않는다.
 * 운영 값은 서버 비밀 파일(ops/systemd/README.md)에 있다. 없으면 로그인 설정 전으로 본다.
 */
export function supabaseEnv(): { url: string; anonKey: string } | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  return url && anonKey ? { url, anonKey } : null;
}

/** 페이지·라우트 핸들러용 클라이언트(세션은 쿠키) */
export async function createSupabaseServer() {
  const env = supabaseEnv();
  if (!env) return null;
  const store = await cookies();
  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (toSet) => {
        try {
          for (const { name, value, options } of toSet) {
            store.set(name, value, hardenAuthCookie(name, options));
          }
        } catch {
          // 서버 컴포넌트는 쿠키를 쓸 수 없다. 세션 갱신은 proxy.ts가 같은 요청 앞에서 이미 했다.
        }
      },
    },
  });
}

/**
 * proxy.ts에서 세션을 갱신한다. 갱신한 쿠키를 이번 요청(뒤따르는 서버 컴포넌트)과 응답(브라우저) 양쪽에 싣는다.
 * 요청 쿠키를 고친 뒤 응답을 새로 만들어야 서버 컴포넌트가 새 쿠키를 본다(Supabase SSR 안내의 패턴).
 */
export async function refreshSession(
  request: NextRequest,
  next: (request: NextRequest) => NextResponse,
): Promise<NextResponse> {
  let response = next(request);
  const env = supabaseEnv();
  if (!env) return response;
  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        for (const { name, value } of toSet) request.cookies.set(name, value);
        response = next(request);
        for (const { name, value, options } of toSet) {
          response.cookies.set(name, value, hardenAuthCookie(name, options));
        }
      },
    },
  });
  // getUser가 만료된 접근 토큰을 갱신하면서 setAll을 부른다. 로그인 서버 오류는 페이지의 확인이 처리한다.
  await supabase.auth.getUser();
  return response;
}
