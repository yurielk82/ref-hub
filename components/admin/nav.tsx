"use client";

import { ArrowUpLeft, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function AdminNav({ canManage }: { canManage: boolean }) {
  const pathname = usePathname();
  const ax = pathname === "/ax/edit";
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const links = [
    { href: ax ? "/ax/edit" : "/edit", label: "홈페이지 편집" },
    { href: "/resume", label: "이력서·제출 파일" },
    { href: "/jobs", label: "공고" },
  ];
  return (
    <header className="admin-header" data-print-hide>
      <div className="admin-header-inner">
        <Link href={ax ? "/ax" : "/"} className="admin-home">
          <ArrowUpLeft size={16} aria-hidden />
          포트폴리오
        </Link>
        <nav aria-label="관리 메뉴" className="admin-nav">
          {canManage &&
            links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
        </nav>
        <div className="admin-controls">
          <button
            type="button"
            className="admin-theme-toggle"
            aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
            onClick={() => setTheme(dark ? "light" : "dark")}
          >
            {dark ? (
              <Sun size={17} aria-hidden />
            ) : (
              <Moon size={17} aria-hidden />
            )}
          </button>
          {canManage && (
            <form action="/auth/logout" method="post">
              <button type="submit" className="admin-logout">
                <LogOut size={15} aria-hidden />
                <span>로그아웃</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
