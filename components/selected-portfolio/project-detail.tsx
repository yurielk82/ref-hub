"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import type { Project } from "@/lib/selected-portfolio/types";
import { ProjectFamily } from "./project-family";
import { ProjectScreens } from "./project-screens";

export const sectionId = (project: Project, index: number) =>
  `${project.id}-section-${index + 1}`;

export function ProjectSections({ project }: { project: Project }) {
  return (
    <>
      {project.sections.map((section, i) => (
        <section
          className="detail-section"
          id={sectionId(project, i)}
          key={i}
          tabIndex={-1}
          data-reading-section={i}
        >
          <h3>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            {section.title}
          </h3>
          <p>{section.body}</p>
          {section.screens?.length ? (
            <ProjectScreens screens={section.screens} />
          ) : null}
        </section>
      ))}
    </>
  );
}

export type SectionRequest = {
  projectId: Project["id"];
  index: number;
};

export function ProjectDetail({
  project,
  index,
  projects,
  onNavigate,
  metadata,
  sectionRequest,
  onSectionChange,
}: {
  project: Project;
  index: number;
  projects: Project[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, key: string) => void;
  metadata: ReactNode;
  sectionRequest: SectionRequest | null;
  onSectionChange: (index: number) => void;
}) {
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = body.current;
    if (!box || sectionRequest?.projectId !== project.id) return;
    const target =
      sectionRequest.index < 0
        ? box
        : document.getElementById(sectionId(project, sectionRequest.index));
    if (!target) return;
    box.scrollTo({
      top:
        sectionRequest.index < 0
          ? 0
          : Math.max(
              0,
              box.scrollTop +
                target.getBoundingClientRect().top -
                box.getBoundingClientRect().top -
                12,
            ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    target.focus({ preventScroll: true });
    onSectionChange(sectionRequest.index);
  }, [project, sectionRequest, onSectionChange]);
  useEffect(() => {
    const box = body.current;
    if (!box) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = box.getBoundingClientRect().top + 16;
      let current = -1;
      for (const section of box.querySelectorAll<HTMLElement>(
        "[data-reading-section]",
      )) {
        if (section.getBoundingClientRect().top <= line)
          current = Number(section.dataset.readingSection);
      }
      if (
        box.scrollTop > 0 &&
        box.scrollTop + box.clientHeight >= box.scrollHeight - 2
      )
        current = Math.max(0, project.sections.length - 1);
      onSectionChange(current);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    box.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => {
      cancelAnimationFrame(frame);
      box.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [project, onSectionChange]);
  const back = (
    <a
      className="detail-back"
      href={`#project/${project.id}`}
      onClick={(e) => onNavigate(e, `project/${project.id}`)}
    >
      ← 돌아가기
    </a>
  );
  return (
    <section className="detail-pane" aria-labelledby="detail-title">
      <header className="detail-head">
        <div>
          <h2 id="detail-title">{project.name}</h2>
          <p className="detail-status">
            {project.category} · {project.period}
          </p>
        </div>
        {back}
      </header>
      <div
        className="detail-body"
        ref={body}
        tabIndex={0}
        aria-label={`${project.name} 상세 본문`}
      >
        <div className="detail-content">
          <div className="detail-layout">
            <article className="detail-copy">
              <p className="detail-intro">{project.summary}</p>
              {metadata}
              <ProjectFamily
                project={project}
                projects={projects}
                onNavigate={onNavigate}
              />
              <ProjectSections project={project} />
            </article>
          </div>
        </div>
      </div>
      <footer className="detail-footer">
        <div className="detail-adjacent">
          {index > 0 && (
            <a
              href={`#project/${projects[index - 1].id}/details`}
              onClick={(e) =>
                onNavigate(e, `project/${projects[index - 1].id}/details`)
              }
            >
              ← {projects[index - 1].name}
            </a>
          )}
          {index < projects.length - 1 && (
            <a
              href={`#project/${projects[index + 1].id}/details`}
              onClick={(e) =>
                onNavigate(e, `project/${projects[index + 1].id}/details`)
              }
            >
              {projects[index + 1].name} →
            </a>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            body.current?.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          }}
        >
          맨 위로 ↑
        </button>
      </footer>
    </section>
  );
}
