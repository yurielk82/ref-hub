import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { portfolio } from "@/lib/selected-portfolio/content";
import { themeCss } from "@/lib/selected-portfolio/theme";
import { SITE_URL } from "@/data/ax-content";
import "@/components/selected-portfolio/globals.css";
import "@/components/selected-portfolio/owner-workspace.css";

const pretendard = localFont({
  src: "../../public/assets/selected-portfolio/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});
const mono = localFont({
  src: "../../public/assets/selected-portfolio/fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0030-0039, U+0041-005A, U+0061-007A, U+0025, U+002B-002F, U+003A, U+007E, U+00D7, U+2013, U+2212",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${portfolio.profile.name} | ${portfolio.site.title}`,
    template: `%s | ${portfolio.profile.name}`,
  },
  description: portfolio.site.description,
  icons: { icon: "/assets/selected-portfolio/favicon.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function ShowcaseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <style
          id="portfolio-theme-tokens"
          dangerouslySetInnerHTML={{ __html: themeCss }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const t=localStorage.getItem('portfolio-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch{}",
          }}
        />
      </head>
      <body className={`${pretendard.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main-content">
          본문으로 이동
        </a>
        {children}
      </body>
    </html>
  );
}
