import type { Project } from "@/lib/selected-portfolio/types";
import {
  projectHref,
  projectState,
} from "@/lib/selected-portfolio/presentation";

export function ProjectFamily({
  project,
  projects,
  trackPath,
}: {
  project: Project;
  projects: Project[];
  trackPath: string;
}) {
  const parentId = project.parentId || project.id;
  const family = projects.filter(
    (item) => item.id === parentId || item.parentId === parentId,
  );
  if (family.length < 2) return null;
  return (
    <nav className="project-family" aria-label="KPI 계열 사례">
      <h2>같은 플랫폼의 기능별 사례</h2>
      <ul>
        {family.map((item) => (
          <li key={item.id}>
            <a
              href={projectHref(trackPath, item.id)}
              aria-current={item.id === project.id ? "page" : undefined}
            >
              <span>{item.name}</span>
              <small>{projectState(item)}</small>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
