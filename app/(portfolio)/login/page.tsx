import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LogIn } from "lucide-react";

import { isAuthConfigured, jobsViewer, signIn } from "@/auth";

export const metadata: Metadata = {
  title: "로그인",
  robots: { index: false, follow: false },
};

/** Auth.js가 /login?error=… 로 돌려보내는 오류 코드 */
const ERROR_MESSAGES: Readonly<Record<string, string>> = {
  AccessDenied:
    "이 계정으로는 공고 모음을 볼 수 없습니다. 허용된 Google 계정으로 다시 로그인하세요.",
  Configuration:
    "로그인 설정에 문제가 있어 로그인하지 못했습니다. 서버의 로그인 설정을 확인하세요.",
};
const DEFAULT_ERROR = "로그인하지 못했습니다. 잠시 뒤 다시 시도하세요.";

async function signInWithGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/jobs" });
}

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  if (await jobsViewer()) redirect("/jobs");

  const { error } = await props.searchParams;
  const errorCode = Array.isArray(error) ? error[0] : error;
  const errorMessage = errorCode
    ? (ERROR_MESSAGES[errorCode] ?? DEFAULT_ERROR)
    : null;
  const configured = isAuthConfigured();

  return (
    <section className="px-6 pb-28 pt-20 sm:pt-28">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          공고 모음 로그인
        </h1>
        <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
          허용된 Google 계정으로 로그인하면 매일 모은 제약사 영업관리 채용
          공고를 볼 수 있습니다. 포트폴리오는 로그인 없이 볼 수 있습니다.
        </p>

        {errorMessage && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
          >
            {errorMessage}
          </p>
        )}

        <form action={signInWithGoogle} className="mt-8">
          <button
            type="submit"
            disabled={!configured}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LogIn className="h-4 w-4" />
            Google 계정으로 로그인
          </button>
        </form>
        {!configured && (
          <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
            로그인 설정이 아직 끝나지 않아 지금은 로그인할 수 없습니다.
          </p>
        )}

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-stone-500 underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          포트폴리오로 돌아가기
        </Link>
      </div>
    </section>
  );
}
