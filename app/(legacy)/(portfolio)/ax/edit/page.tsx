import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { jobsViewer } from "@/auth";
import { loadPortfolio, portfolioDataDir } from "@/lib/portfolio/server";
import { PortfolioEditor } from "@/components/portfolio/content-editor";
export const metadata: Metadata = {
  title: "AX 홈페이지 편집",
  robots: { index: false, follow: false },
};
export default async function AxEditPage() {
  if (!(await jobsViewer())) redirect("/login");
  const content = await loadPortfolio("ax");
  return (
    <PortfolioEditor
      track="ax"
      fields={content.fields}
      revision={content.snapshot.revision}
      canSave={Boolean(portfolioDataDir())}
    />
  );
}
