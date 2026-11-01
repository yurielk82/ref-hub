import { Column, Heading } from "@once-ui-system/core";
import { loadPortfolio } from "@/lib/portfolio/server";
import { MagicProjects } from "@magic/Home";
export default async function ProjectsPage() {
  const copy = await loadPortfolio("sales");
  return (
    <Column maxWidth="m" gap="xl">
      <Heading variant="display-strong-m">직접 만든 시스템과 도구</Heading>
      <MagicProjects copy={copy} track="sales" />
    </Column>
  );
}
