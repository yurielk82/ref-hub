import { loadPortfolio } from "@/lib/portfolio/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AX_TRACK_CASE_SLUGS } from "@/data/ax";
import { OTHER_PROJECTS, getProject } from "@/data/projects";

import { MagicDetail } from "@magic/Detail";

/** AX 트랙에서 여는 사례 — 회사 대표 사례와 개인·외부 작업 */
const AX_DETAIL_SLUGS: readonly string[] = [
  ...AX_TRACK_CASE_SLUGS,
  ...OTHER_PROJECTS.map((project) => project.slug),
];

export const dynamicParams = false;

/** 이 트랙에서 공개하는 사례 경로를 생성한다. */
export function generateStaticParams() {
  return AX_DETAIL_SLUGS.map((slug) => ({ slug }));
}

/** 사례 원본에서 검색 결과 제목과 설명을 만든다. */
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — AX 사례`,
    description: project.description,
  };
}

/** 저장된 문구와 근거 화면을 같은 사례 페이지에 표시한다. */
export default async function AxCasePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project || !AX_DETAIL_SLUGS.includes(slug)) notFound();

  const copy = await loadPortfolio("ax");
  return <MagicDetail copy={copy} track="ax" slug={slug} />;
}
