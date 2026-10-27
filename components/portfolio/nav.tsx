"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
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

const LINK_CLASS =
  "rounded text-xs text-stone-500 transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function PortfolioNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? "/";
  const track = trackOf(pathname);
  const nav = TRACKS[track];
  const canViewJobs = useCanViewJobs();

  useEffect(() => setMounted(true), []);

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-transparent bg-white/70 backdrop-blur-xl dark:bg-stone-950/70"
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
          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="shrink-0 rounded-md p-1.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-[var(--accent)] dark:hover:bg-stone-800"
              aria-label="테마 전환"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
