import type { Metadata } from "next";
import { SelectedOwnerTools } from "@/components/selected-portfolio/owner-tools";
import { Portfolio } from "@/components/selected-portfolio/portfolio";
import { portfolio } from "@/lib/selected-portfolio/content";
import { loadSelectedPortfolio } from "@/lib/selected-portfolio/server";

export const metadata: Metadata = {
  title: `${portfolio.profile.name} — ${portfolio.profile.role}`,
  description: portfolio.site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const { data } = await loadSelectedPortfolio("sales");
  return (
    <Portfolio data={data} ownerTools={<SelectedOwnerTools track="sales" />} />
  );
}
