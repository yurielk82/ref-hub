import { loadPortfolio } from "@/lib/portfolio/server";
import type { Metadata } from "next";
import { AX_CONTACT, AX_HERO, SITE_URL } from "@/data/ax";
import { PortfolioHome } from "@/components/portfolio/portfolio-home";

// 이력서 링크를 공유했을 때 탭·미리보기에 이름이 먼저 보여야 한다.
const LANDING_TITLE = `${AX_HERO.name} — ${AX_HERO.role}`;
const LANDING_DESCRIPTION = `${AX_HERO.name} · ${AX_HERO.role}. 엑셀·스프레드시트 자료 관리·분석·보고 개선 경험. 공급내역보고·SFE·유통재고 관리 업무 효율화.`;
const LANDING_PREVIEW_IMAGE = "/images/portfolio/pharmkpi/hero.png";

// Nextra가 빌드 중 문서 메뉴에서 읽으므로 요청별 API를 쓰지 않는다.
export const metadata: Metadata = {
  title: { absolute: LANDING_TITLE },
  description: LANDING_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [
      {
        url: LANDING_PREVIEW_IMAGE,
        alt: "PharmKPI 사내 영업 데이터 플랫폼 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [LANDING_PREVIEW_IMAGE],
  },
};

/** Google ProfilePage 구조화 데이터 — 검색이 이 페이지를 한 사람의 프로필로 읽게 한다. */
const PROFILE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  mainEntity: {
    "@type": "Person",
    name: AX_HERO.name,
    jobTitle: AX_HERO.jobTitle,
    worksFor: { "@type": "Organization", name: AX_HERO.employer },
    description: AX_HERO.subhead,
    email: `mailto:${AX_CONTACT.email}`,
    sameAs: [AX_CONTACT.github],
  },
} as const;

export default async function HomePage() {
  const copy = await loadPortfolio("sales");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...PROFILE_JSON_LD,
            mainEntity: {
              ...PROFILE_JSON_LD.mainEntity,
              description: copy.hero.subhead,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioHome copy={copy} track="sales" />
    </>
  );
}
