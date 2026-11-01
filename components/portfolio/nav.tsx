"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AX_CONTACT, AX_HERO } from "@/data/ax-content";

import { GitHubIcon } from "./github-icon";
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

/** 테마 선택 — 밝게·어둡게·기기 설정 따라가기 */
const THEMES: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "light", label: "밝게", Icon: Sun },
  { value: "dark", label: "어둡게", Icon: Moon },
  { value: "system", label: "기기 설정 따라가기", Icon: Monitor },
];

const LINK_CLASS =
  "rounded text-xs text-stone-500 transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

/** 현재 트랙의 메뉴와 로그인·테마 선택을 제공한다. */
export function PortfolioNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? "/";
  const track = trackOf(pathname);
  const nav = TRACKS[track];
  const canViewJobs = useCanViewJobs();

  useEffect(() => setMounted(true), []);

  return (
    <header
      className="folio-nav"
      style={{ borderColor: "var(--glass-border)" }}
    >
      <nav
        aria-label={nav.menuLabel}
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6"
      >
        <Link
          href={nav.home}
          className="shrink-0 font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100"
        >
          {AX_HERO.name}
          {nav.badge && (
            <span className="ml-1.5 font-sans text-xs font-semibold text-[var(--accent)]">
              {nav.badge}
            </span>
          )}
        </Link>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex min-w-0 items-center gap-3 overflow-x-auto [scrollbar-width:none]">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${LINK_CLASS} shrink-0`}
              >
                {link.label}
              </Link>
            ))}
            {canViewJobs && (
              <Link
                href="/jobs"
                aria-current={pathname === "/jobs" ? "page" : undefined}
                className="shrink-0 rounded text-xs font-semibold text-[var(--accent)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                공고 모음
              </Link>
            )}
            {canViewJobs && (
              <Link
                href="/resume"
                aria-current={pathname === "/resume" ? "page" : undefined}
                className="shrink-0 rounded text-xs font-semibold text-[var(--accent)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                이력서
              </Link>
            )}
            {canViewJobs && (
              <Link
                href={track === "ax" ? "/ax/edit" : "/edit"}
                className="shrink-0 rounded text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                홈페이지 편집
              </Link>
            )}
            {nav.developerLinks && (
              <a
                href={AX_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK_CLASS} shrink-0`}
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            )}
          </div>
          {mounted && (
            <div
              role="group"
              aria-label="화면 테마"
              className="flex shrink-0 items-center gap-0.5 rounded-md border border-stone-200 p-0.5 dark:border-stone-800"
            >
              {THEMES.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  aria-pressed={theme === value}
                  aria-label={label}
                  title={label}
                  className={`rounded p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)] ${
                    theme === value
                      ? "bg-stone-100 text-[var(--accent)] dark:bg-stone-800"
                      : "text-stone-500 hover:text-[var(--accent)]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
