import type { Metadata } from "next";
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
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return selectedProjectMetadata("sales", slug);
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SelectedProjectPage track="sales" slug={slug} />;
}
