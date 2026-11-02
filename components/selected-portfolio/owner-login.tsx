import { isAuthConfigured } from "@/auth";
import type { PortfolioHome } from "@/lib/selected-portfolio/workspace";
import { safeReturnTo } from "@/lib/selected-portfolio/workspace";

const errors: Readonly<Record<string, string>> = {
  forbidden:
    "이 계정에는 관리 권한이 없습니다. 허용된 Google 계정으로 다시 로그인하세요.",
  config: "로그인 설정을 확인하지 못했습니다. 잠시 뒤 다시 시도해 주세요.",
  oauth: "Google 로그인을 마치지 못했습니다. 다시 시도해 주세요.",
};

export function OwnerLogin({
  home,
  next,
  error,
}: {
  home: PortfolioHome;
  next?: string;
  error?: string;
}) {
  const configured = isAuthConfigured();
  return (
    <section className="owner-login">
      <h2>오너 로그인</h2>
      <p>
        허용된 Google 계정으로 로그인하면 이 화면에서 홈페이지 문구와
        이력서·공고를 관리할 수 있습니다.
      </p>
      {error && (
        <p role="alert">
          {errors[error] ?? "로그인하지 못했습니다. 다시 시도해 주세요."}
        </p>
      )}
      <form action="/auth/google" method="get">
        <input type="hidden" name="next" value={safeReturnTo(next ?? home)} />
        <button type="submit" disabled={!configured}>
          Google 계정으로 로그인
        </button>
      </form>
      {!configured && (
        <p role="status">현재 로그인 설정을 확인할 수 없습니다.</p>
      )}
    </section>
  );
}
