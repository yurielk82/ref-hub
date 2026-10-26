import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { isAllowedSignIn, parseAllowlist } from "@/lib/auth/allowlist";

/**
 * 공고 모음(/jobs) 전용 로그인. 포트폴리오는 공개이고, 로그인은 허용 목록의 Google 계정만 통과한다.
 * DB 없이 암호화한 JWT 쿠키로 세션을 둔다.
 * 운영 값(서버 비밀 파일 → github-ref-hub.service EnvironmentFile):
 *   AUTH_SECRET, AUTH_URL, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, JOBS_ALLOWED_EMAILS
 */

const SESSION_MAX_AGE_SECONDS = 14 * 24 * 60 * 60;

export function allowedEmails(): Set<string> {
  return parseAllowlist(process.env.JOBS_ALLOWED_EMAILS);
}

/** 로그인에 필요한 값이 모두 있는가 — 없으면 로그인 화면이 설정 전 안내를 보여 준다 */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET &&
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_SECRET &&
    allowedEmails().size > 0,
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt", maxAge: SESSION_MAX_AGE_SECONDS },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    signIn({ account, profile }) {
      return isAllowedSignIn(
        {
          provider: account?.provider,
          email: profile?.email,
          emailVerified:
            typeof profile?.email_verified === "boolean"
              ? profile.email_verified
              : undefined,
        },
        allowedEmails(),
      );
    },
  },
});

/** 공고 모음을 볼 수 있는 세션인가 — 허용 목록이 바뀐 뒤 남은 옛 세션도 막는다 */
export async function jobsViewer(): Promise<{ email: string } | null> {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  return email && allowedEmails().has(email) ? { email } : null;
}
