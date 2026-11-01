import type { Metadata } from "next";
import { SelectedOwnerTools } from "@/components/selected-portfolio/owner-tools";
import { Portfolio } from "@/components/selected-portfolio/portfolio";
import { axPortfolio } from "@/lib/selected-portfolio/content";
import { loadSelectedPortfolio } from "@/lib/selected-portfolio/server";

export const metadata: Metadata = {
  title: `AX 포트폴리오 — ${axPortfolio.profile.name}`,
  description: axPortfolio.site.description,
  alternates: { canonical: "/ax" },
};

export default async function AxPage() {
  const { data } = await loadSelectedPortfolio("ax");
  return (
    <Portfolio
      data={data}
      trackPath="/ax"
      ownerTools={<SelectedOwnerTools track="ax" />}
    />
  );
}
