import type { Metadata } from "next";
import type { WorkspaceQuery } from "@/lib/selected-portfolio/workspace";
import {
  SelectedProjectPage,
  selectedProjectMetadata,
  selectedRouteParams,
} from "../../selected-project";

export const dynamicParams = false;
export function generateStaticParams() {
  return selectedRouteParams("sales");
}
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<WorkspaceQuery>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  return {
    ...selectedProjectMetadata("sales", slug),
    ...(query.manage || query.edit
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<WorkspaceQuery>;
}) {
  const { slug } = await params;
  return (
    <SelectedProjectPage track="sales" slug={slug} query={await searchParams} />
  );
}
