import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PROJECTS, getProject } from "@/data/projects";
import { WorkspacePage } from "@/components/selected-portfolio/workspace-page";
import { portfolio, axPortfolio } from "@/lib/selected-portfolio/content";
import { findSelectedProject } from "@/lib/selected-portfolio/adapter";
import type { PortfolioTrack } from "@/lib/portfolio/content";
import type { WorkspaceQuery } from "@/lib/selected-portfolio/workspace";

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
  const url = `${track === "ax" ? "/ax" : ""}/projects/${project.id}`;
  const screen = project.sections.flatMap(
    (section) => section.screens ?? [],
  )[0];
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: project.name,
      description: project.summary,
      url,
      type: "article",
      locale: "ko_KR",
      ...(screen
        ? {
            images: [
              {
                url: screen.src,
                alt: screen.title,
                width: screen.width,
                height: screen.height,
              },
            ],
          }
        : {}),
    },
  };
}

export async function SelectedProjectPage({
  track,
  slug,
  query = {},
}: {
  track: PortfolioTrack;
  slug: string;
  query?: WorkspaceQuery;
}) {
  const home = track === "ax" ? "/ax" : "/";
  const base = track === "ax" ? axPortfolio : portfolio;
  const project = findSelectedProject(base, slug);
  if (!project) {
    if (getProject(slug)) redirect(`${home}#about`);
    notFound();
  }
  return (
    <WorkspacePage
      track={track}
      query={query}
      view={{ kind: "project", id: project.id }}
    />
  );
}
