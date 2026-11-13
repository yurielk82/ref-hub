import type { Metadata } from "next";
import { portfolio } from "@/lib/selected-portfolio/content";
import { WorkspacePage } from "@/components/selected-portfolio/workspace-page";
import type { WorkspaceQuery } from "@/lib/selected-portfolio/workspace";

const metadata: Metadata = {
  title: `${portfolio.profile.name} — ${portfolio.profile.role}`,
  description: portfolio.site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${portfolio.profile.name} · ${portfolio.profile.role}`,
    description: portfolio.site.description,
    url: "/",
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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<WorkspaceQuery>;
}) {
  return <WorkspacePage track="sales" query={await searchParams} />;
}
