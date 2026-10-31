import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPANY_PROJECTS, getProject } from "@/data/projects";
import { getAxCase } from "@/data/ax";
import {
  CaseNarrative,
  storyScreenSrcs,
} from "@/components/portfolio/case-narrative";
import { ProjectDetail } from "@/components/portfolio/project-detail";

/** 영업관리 트랙은 회사 사례만 연다. 개인·외부 작업은 AX 트랙(/ax/cases/*)에서만 보인다. */
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPANY_PROJECTS.map((p) => ({ slug: p.slug }));
}

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

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const caseStudy = getAxCase(slug);

  return (
    <ProjectDetail
      project={project}
      narrative={
        caseStudy && (
          <CaseNarrative caseStudy={caseStudy} screens={project.screens} />
        )
      }
      storyScreens={storyScreenSrcs(caseStudy)}
      back={{ href: "/#projects", label: "사례 목록" }}
      track="sales"
    />
  );
}
