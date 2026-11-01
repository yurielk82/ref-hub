import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PROJECTS, getProject } from "@/data/projects";
import { ProjectBody } from "@/components/selected-portfolio/portfolio";
import { ProjectDetailRedirect } from "@/components/selected-portfolio/project-detail-redirect";
import { ThemeToggle } from "@/components/selected-portfolio/theme-toggle";
import { portfolio, axPortfolio } from "@/lib/selected-portfolio/content";
import { findSelectedProject } from "@/lib/selected-portfolio/adapter";
import { loadSelectedPortfolio } from "@/lib/selected-portfolio/server";
import type { PortfolioTrack } from "@/lib/portfolio/content";

export function selectedRouteParams(track: PortfolioTrack) {
  const base = track === "ax" ? axPortfolio : portfolio;
  return [
    ...new Set([
      ...base.projects.map((project) => project.id),
      ...PROJECTS.map((project) => project.slug),
    ]),
  ].map((slug) => ({ slug }));
}

export function selectedProjectMetadata(
  track: PortfolioTrack,
  slug: string,
): Metadata {
  const base = track === "ax" ? axPortfolio : portfolio;
  const project = findSelectedProject(base, slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: {
      canonical: `${track === "ax" ? "/ax" : ""}/projects/${project.id}`,
    },
  };
}

export async function SelectedProjectPage({
  track,
  slug,
}: {
  track: PortfolioTrack;
  slug: string;
}) {
  const home = track === "ax" ? "/ax" : "/";
  const { data } = await loadSelectedPortfolio(track);
  const project = findSelectedProject(data, slug);
  if (!project) {
    if (getProject(slug)) redirect(`${home}#about`);
    notFound();
  }
  const destination = `${home}#project/${project.id}/details`;
  return (
    <main id="main-content" className="standalone">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(destination).replace(/</g, "\\u003c")})`,
        }}
      />
      <ProjectDetailRedirect id={project.id} homePath={home} />
      <nav className="detail-nav">
        <a href={`${home}#project/${project.id}`}>← 포트폴리오</a>
        <ThemeToggle />
      </nav>
      <header>
        <p className="stage-kicker">
          {project.category} · {project.period}
        </p>
        <h1>{project.name}</h1>
        <p className="page-intro">{project.summary}</p>
      </header>
      <ProjectBody project={project} />
    </main>
  );
}
