import { loadPortfolio } from "@/lib/portfolio/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPANY_PROJECTS, getProject } from "@/data/projects";

import { MagicDetail } from "@magic/Detail";

/** 영업관리 트랙은 회사 사례만 연다. 개인·외부 작업은 AX 트랙(/ax/cases/*)에서만 보인다. */
export const dynamicParams = false;

/** 이 트랙에서 공개하는 사례 경로를 생성한다. */
export function generateStaticParams() {
  return COMPANY_PROJECTS.map((p) => ({ slug: p.slug }));
}

/** 사례 원본에서 검색 결과 제목과 설명을 만든다. */
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.description,
  };
}

/** 저장된 문구와 근거 화면을 같은 사례 페이지에 표시한다. */
export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const copy = await loadPortfolio("sales");
  return <MagicDetail copy={copy} track="sales" slug={slug} />;
}
