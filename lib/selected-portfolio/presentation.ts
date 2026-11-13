import type { Project } from "./types";
import { sitePath } from "./content";

export type PortfolioView = { kind: "home" } | { kind: "project"; id: string };

export const projectHref = (trackPath: string, id: string) =>
  sitePath(`${trackPath}/projects/${id}/`);

export function projectState(project: Project): string {
  if (/준비 중/.test(`${project.category} ${project.period}`)) return "준비 중";
  if (/시제품|미적용/.test(`${project.category} ${project.period}`))
    return "업무 미적용 시제품";
  if (/운영 종료/.test(project.category)) return "운영 종료";
  if (project.id === "erp-spec") return "구조 참고 자료";
  return project.category;
}

export function orderedProjects(projects: Project[]): Project[] {
  const primary = ["kpi", "kpis", "bi"];
  return [
    ...primary.flatMap((id) => projects.filter((project) => project.id === id)),
    ...projects.filter((project) => !primary.includes(project.id)),
  ];
}
