import type { Metadata } from "next";
import { axPortfolio } from "@/lib/selected-portfolio/content";
import { WorkspacePage } from "@/components/selected-portfolio/workspace-page";
import type { WorkspaceQuery } from "@/lib/selected-portfolio/workspace";

const metadata: Metadata = {
  title: `AX 포트폴리오 — ${axPortfolio.profile.name}`,
  description: axPortfolio.site.description,
  alternates: { canonical: "/ax" },
  openGraph: {
    title: `${axPortfolio.profile.name} · ${axPortfolio.profile.role}`,
    description: axPortfolio.site.description,
    url: "/ax",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/assets/selected-portfolio/images/pharmkpi/overview-content-d6a098019822.webp",
        alt: "KPI. 제약 영업 운영 플랫폼 종합 현황",
      },
    ],
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<WorkspaceQuery>;
}): Promise<Metadata> {
  const query = (await searchParams) ?? {};
  return {
    ...metadata,
    ...(query.manage || query.edit
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export default async function AxPage({
  searchParams,
}: {
  searchParams: Promise<WorkspaceQuery>;
}) {
  return <WorkspacePage track="ax" query={await searchParams} />;
}
