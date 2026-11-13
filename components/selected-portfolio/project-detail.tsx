"use client";

import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { Project } from "@/lib/selected-portfolio/types";
import {
  orderedProjects,
  projectHref,
} from "@/lib/selected-portfolio/presentation";
import { sitePath } from "@/lib/selected-portfolio/content";
import { EditableCopy, useProjectCopy, useCopyEditing } from "./editable-copy";
import { Highlights } from "./highlights";
import { ProjectFamily } from "./project-family";
import { ProjectScreens } from "./project-screens";

export const sectionId = (project: Project, index: number) =>
  `${project.id}-section-${index + 1}`;

export type LeadScreen = {
  section: number;
  index: number;
  screen: NonNullable<Project["sections"][number]["screens"]>[number];
};

export function leadScreen(project: Project): LeadScreen | null {
  const screens = project.sections.flatMap((section, sectionIndex) =>
    (section.screens ?? []).map((screen, index) => ({
      section: sectionIndex,
      index,
      screen,
    })),
  );
  return (
    screens.find((entry) => entry.screen.src === project.lead) ??
    screens[0] ??
    null
  );
}

export function ProjectSections({
  project,
  withoutLead = false,
}: {
  project: Project;
  withoutLead?: boolean;
}) {
  const copy = useProjectCopy(project.id);
  const lead = withoutLead ? leadScreen(project) : null;
  return (
    <>
      {project.sections.map((section, sectionIndex) => {
        const keep = (_: unknown, index: number) =>
          !lead || lead.section !== sectionIndex || lead.index !== index;
        const screens = (section.screens ?? []).filter(keep);
        return (
          <section
            className="detail-section"
            id={sectionId(project, sectionIndex)}
            key={sectionIndex}
            tabIndex={-1}
          >
            <EditableCopy
              as="h2"
              field={copy?.sections[sectionIndex]?.title ?? ""}
            >
              {section.title}
            </EditableCopy>
            <EditableCopy
              as="p"
              field={copy?.sections[sectionIndex]?.body ?? ""}
              multiline
            >
              {section.body}
            </EditableCopy>
            {screens.length > 0 && (
              <ProjectScreens
                screens={screens}
                copyFields={copy?.sections[sectionIndex]?.screens.filter(keep)}
              />
            )}
          </section>
        );
      })}
    </>
  );
}

export function ProjectDetail({
  project,
  projects,
  trackPath,
}: {
  project: Project;
  projects: Project[];
  trackPath: string;
}) {
  const copy = useProjectCopy(project.id);
  const editing = useCopyEditing()?.editing;
  const lead = leadScreen(project);
  const ordered = orderedProjects(projects);
  const index = ordered.findIndex((entry) => entry.id === project.id);
  const previous = ordered[index - 1];
  const next = ordered[index + 1];
  return (
    <article className="case-study" aria-labelledby="case-title">
      <a href={`${sitePath(trackPath || "/")}#work`} className="back-link">
        <ArrowLeft size={16} aria-hidden /> 대표 사례로
      </a>
      <header className="case-introduction">
        <EditableCopy
          as="h1"
          id="case-title"
          className="case-title"
          field={copy?.title ?? ""}
        >
          {project.title}
        </EditableCopy>
        <EditableCopy
          as="p"
          className="case-summary"
          field={copy?.summary ?? ""}
          multiline
        >
          {project.summary}
        </EditableCopy>
        <div className="case-facts">
          <div className="case-role">
            <h2>
              {trackPath === "/ax"
                ? "직접 판단하고 구현한 범위"
                : "내가 맡은 일"}
            </h2>
            <EditableCopy as="p" field={copy?.role ?? ""} multiline>
              {project.role}
            </EditableCopy>
            {trackPath === "/ax" && (
              <ul className="tags case-role-tools">
                {project.stack.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            )}
            <div className="case-state">
              <EditableCopy as="p" field={copy?.category ?? ""}>
                {project.category}
              </EditableCopy>
              <EditableCopy as="p" field={copy?.period ?? ""}>
                {project.period}
              </EditableCopy>
            </div>
          </div>
          <Highlights
            title="주요 결과"
            items={project.highlights ?? []}
            field={copy?.highlights ?? ""}
          />
        </div>
      </header>
      {lead && (
        <div className="case-lead">
          <ProjectScreens
            screens={[lead.screen]}
            copyFields={copy?.sections[lead.section]?.screens.slice(
              lead.index,
              lead.index + 1,
            )}
          />
        </div>
      )}
      <div className="case-reading">
        <nav className="case-contents" aria-label={`${project.name} 목차`}>
          <p>이 사례에서 읽을 내용</p>
          <ul>
            {project.sections.map((section, sectionIndex) => (
              <li key={sectionIndex}>
                <a href={`#${sectionId(project, sectionIndex)}`}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ProjectSections project={project} withoutLead />
      </div>
      <section
        className="case-technology"
        aria-labelledby="case-technology-title"
      >
        <h2 id="case-technology-title">사용한 기술</h2>
        {editing ? (
          <EditableCopy as="p" field={copy?.stack ?? ""} multiline>
            {project.stack.join("\n")}
          </EditableCopy>
        ) : (
          <ul className="tags">
            {project.stack.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
        {project.links.length > 0 && (
          <div className="public-links">
            {project.links.map((link) => (
              <a key={link.url} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>
      <ProjectFamily
        project={project}
        projects={projects}
        trackPath={trackPath}
      />
      <nav className="case-pagination" aria-label="다른 사례">
        {previous ? (
          <a href={projectHref(trackPath, previous.id)}>
            <ArrowLeft size={16} aria-hidden />
            {previous.name}
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={projectHref(trackPath, next.id)}>
            {next.name}
            <ArrowRight size={16} aria-hidden />
          </a>
        )}
      </nav>
      <a className="back-top" href="#main-content">
        맨 위로 <ArrowUp size={14} aria-hidden />
      </a>
    </article>
  );
}
