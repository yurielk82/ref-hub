import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AX_TRACK_CASE_SLUGS, getAxCase } from "@/data/ax";
import { OTHER_PROJECTS, getProject } from "@/data/projects";
import { AxCaseDetail } from "@/components/portfolio/ax-case-detail";
import { CaseNarrative } from "@/components/portfolio/case-narrative";
import { ProjectDetail } from "@/components/portfolio/project-detail";

/** AX 트랙에서 여는 사례 — 회사 대표 사례와 개인·외부 작업 */
const AX_DETAIL_SLUGS: readonly string[] = [
  ...AX_TRACK_CASE_SLUGS,
  ...OTHER_PROJECTS.map((project) => project.slug),
];

export const dynamicParams = false;

export function generateStaticParams() {
  return AX_DETAIL_SLUGS.map((slug) => ({ slug }));
}

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

export default async function AxCasePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project || !AX_DETAIL_SLUGS.includes(slug)) notFound();

  const caseStudy = getAxCase(slug);
  const isOwnWork = project.scope === "other";

  return (
    <ProjectDetail
      project={project}
      narrative={
        caseStudy &&
        (caseStudy.ax ? (
          <AxCaseDetail caseStudy={caseStudy} view={caseStudy.ax} />
        ) : (
          <CaseNarrative caseStudy={caseStudy} />
        ))
      }
      back={{
        href: isOwnWork ? "/ax#tools" : "/ax#cases",
        label: isOwnWork ? "개인 작업 목록" : "AX 사례 목록",
      }}
      track="ax"
    />
  );
}
