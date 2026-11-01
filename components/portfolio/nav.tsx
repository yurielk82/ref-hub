"use client";

import { useTheme } from "next-themes";
import { ChevronDown, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AX_HERO } from "@/data/ax-content";

import { TRACKS, trackOf } from "./track";

/** 로그인한 허용 계정에만 '공고 모음'을 보여 준다. 공개 페이지는 정적이라 브라우저가 묻는다. */
function useCanViewJobs(): boolean {
  const [canView, setCanView] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/me", { signal: controller.signal, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { canViewJobs?: boolean } | null) =>
        setCanView(body?.canViewJobs === true),
      )
      .catch(() => {
        // 확인하지 못하면 메뉴를 숨긴 채 둔다(공고 화면 자체는 서버가 막는다).
      });
    return () => controller.abort();
  }, []);
  return canView;
}

/** 공개 탐색과 소유자 관리 메뉴를 구분하고 현재 밝기를 한 버튼으로 전환한다. */
export function PortfolioNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? "/";
  const track = trackOf(pathname);
  const nav = TRACKS[track];
  const canViewJobs = useCanViewJobs();
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";
  return (
    <header className="folio-nav">
      <nav aria-label={nav.menuLabel}>
        <Link href={nav.home} className="folio-brand">
          {AX_HERO.name}
          <span>
            {nav.badge ? "AX · 업무 개선 포트폴리오" : "업무 개선 포트폴리오"}
          </span>
        </Link>
        <div className="folio-nav-actions">
          <div className="folio-public-links">
            {nav.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          {canViewJobs && (
            <details className="folio-owner-menu" key={pathname}>
              <summary>
                관리 <ChevronDown size={14} aria-hidden />
              </summary>
              <div aria-label="소유자 전용 관리">
                <Link href={track === "ax" ? "/ax/edit" : "/edit"}>
                  홈페이지 편집·저장
                </Link>
                <Link
                  href="/resume"
                  aria-current={pathname === "/resume" ? "page" : undefined}
                >
                  이력서·제출 파일
                </Link>
                <Link
                  href="/jobs"
                  aria-current={pathname === "/jobs" ? "page" : undefined}
                >
                  공고 모음
                </Link>
              </div>
            </details>
          )}
          <div className="folio-theme-slot">
            {mounted && (
              <button
                type="button"
                className="folio-theme-toggle"
                onClick={() => setTheme(dark ? "light" : "dark")}
                aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
                title={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              >
                {dark ? (
                  <Sun size={20} aria-hidden />
                ) : (
                  <Moon size={20} aria-hidden />
                )}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
