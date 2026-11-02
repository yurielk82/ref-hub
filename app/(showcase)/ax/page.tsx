import type { Metadata } from "next";
import { axPortfolio } from "@/lib/selected-portfolio/content";
import { WorkspacePage } from "@/components/selected-portfolio/workspace-page";
import type { WorkspaceQuery } from "@/lib/selected-portfolio/workspace";

const metadata: Metadata = {
  title: `AX 포트폴리오 — ${axPortfolio.profile.name}`,
  description: axPortfolio.site.description,
  alternates: { canonical: "/ax" },
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
