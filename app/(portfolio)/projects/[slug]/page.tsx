import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProject } from "@/data/projects";
import { AX_CASE_STUDIES } from "@/data/ax";
import { CaseNarrative } from "@/components/portfolio/case-narrative";
import { ProjectDetail } from "@/components/portfolio/project-detail";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
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

  const caseStudy = AX_CASE_STUDIES.find((c) => c.projectSlug === slug);

  return (
    <ProjectDetail
      project={project}
      narrative={caseStudy && <CaseNarrative caseStudy={caseStudy} />}
      back={{ href: "/#projects", label: "사례 목록" }}
      showTech={false}
    />
  );
}
