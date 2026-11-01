import type { MouseEvent } from "react";
import type { Project } from "@/lib/selected-portfolio/types";

export function ProjectFamily({
  project,
  projects,
  onNavigate,
}: {
  project: Project;
  projects: Project[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, key: string) => void;
}) {
  const parentId = project.parentId || project.id;
  const family = projects.filter(
    (item) => item.id === parentId || item.parentId === parentId,
  );
  if (family.length < 2) return null;
  return (
    <nav className="project-family" aria-label="KPI 계열 사례">
      <p>같은 플랫폼의 기능별 사례</p>
      <div>
        {family.map((item) => (
          <a
            key={item.id}
            href={`#project/${item.id}/details`}
            aria-current={item.id === project.id ? "page" : undefined}
            onClick={(event) => onNavigate(event, `project/${item.id}/details`)}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
