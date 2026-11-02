import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import palette from "@/data/selected-portfolio/theme.json";
import { jobsViewer } from "@/auth";
import { AdminNav } from "@/components/admin/nav";
import { AdminThemeProvider } from "@/components/admin/theme-provider";
import { themeCss } from "@/lib/selected-portfolio/theme";
import "@/app/globals.css";
import "./admin.css";

const pretendard = localFont({
  src: "../../public/assets/selected-portfolio/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "포트폴리오 관리", template: "%s | 포트폴리오 관리" },
  robots: { index: false, follow: false },
  icons: { icon: "/assets/selected-portfolio/favicon.svg" },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const canManage = Boolean(await jobsViewer());
  return (
    <html lang="ko" className="admin-root" suppressHydrationWarning>
      <head>
        <style
          id="portfolio-theme-tokens"
          dangerouslySetInnerHTML={{
            __html: `${themeCss}
:root{--admin-accent:${palette.light.accent}}.dark{--admin-accent:${palette.dark.accent}}`,
          }}
        />
      </head>
      <body className={`${pretendard.variable} admin-shell`}>
        <AdminThemeProvider>
          <a className="admin-skip" href="#admin-main">
            본문으로 이동
          </a>
          <AdminNav canManage={canManage} />
          <main id="admin-main" tabIndex={-1}>
            {children}
          </main>
        </AdminThemeProvider>
      </body>
    </html>
  );
}
