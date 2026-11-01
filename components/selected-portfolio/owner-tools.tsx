import { jobsViewer } from "@/auth";
import type { PortfolioTrack } from "@/lib/portfolio/content";

export async function SelectedOwnerTools({ track }: { track: PortfolioTrack }) {
  if (!(await jobsViewer())) {
    return (
      <a className="owner-entry" href="/login">
        관리 · 로그인 ↗
      </a>
    );
  }
  return (
    <details className="owner-menu">
      <summary>관리</summary>
      <nav aria-label="소유자 전용 관리">
        <a href={track === "ax" ? "/ax/edit" : "/edit"}>홈페이지 편집·저장</a>
        <a href="/resume">이력서·제출 파일</a>
        <a href="/jobs">공고 모음</a>
        <form action="/auth/logout" method="post">
          <button type="submit">로그아웃</button>
        </form>
      </nav>
    </details>
  );
}
