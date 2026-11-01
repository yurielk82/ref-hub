import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { jobsViewer } from "@/auth";
import { portfolioDataDir } from "@/lib/portfolio/server";
import { loadSelectedPortfolio } from "@/lib/selected-portfolio/server";
import { PortfolioEditor } from "@/components/portfolio/content-editor";

export const metadata: Metadata = {
  title: "홈페이지 편집",
  robots: { index: false, follow: false },
};
export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  if (!(await jobsViewer())) redirect("/login");
  if ((await searchParams).track === "ax") redirect("/ax/edit");
  const track = "sales";
  const content = await loadSelectedPortfolio(track);
  return (
    <PortfolioEditor
      key={track}
      track={track}
      fields={content.fields}
      revision={content.snapshot.revision}
      canSave={Boolean(portfolioDataDir())}
    />
  );
}
