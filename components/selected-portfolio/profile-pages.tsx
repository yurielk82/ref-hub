"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PortfolioData, Project } from "@/lib/selected-portfolio/types";
import {
  orderedProjects,
  projectHref,
  projectState,
} from "@/lib/selected-portfolio/presentation";
import { sitePath } from "@/lib/selected-portfolio/content";
import { Highlights } from "./highlights";
import { EditableCopy, useCopyEditing, useProjectCopy } from "./editable-copy";
import { leadScreen } from "./project-detail";
import { srcSet } from "./project-screens";

function ProjectLinks({
  ids,
  data,
  trackPath,
}: {
  ids: string[];
  data: PortfolioData;
  trackPath: string;
}) {
  const projects = ids.flatMap((id) =>
    data.projects.filter((entry) => entry.id === id),
  );
  return (
    <ul className="profile-case-links">
      {projects.map((project) => (
        <li key={project.id}>
          <a href={projectHref(trackPath, project.id)}>
            {project.name}
            <ArrowRight size={14} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

function WorkCard({
  project,
  trackPath,
  featured,
}: {
  project: Project;
  trackPath: string;
  featured: boolean;
}) {
  const lead = leadScreen(project);
  const copy = useProjectCopy(project.id);
  const editing = useCopyEditing()?.editing;
  return (
    <article className={`work-card${featured ? " is-featured" : ""}`}>
      {lead ? (
        <a
          className="work-card-image"
          href={projectHref(trackPath, project.id)}
          aria-label={`${project.name} 사례 보기`}
        >
          <img
            src={sitePath(lead.screen.src)}
            srcSet={srcSet(lead.screen)}
            sizes="(max-width: 760px) calc(100vw - 40px), 550px"
            alt={`${project.name} · ${lead.screen.title}`}
            width={lead.screen.width}
            height={lead.screen.height}
            loading="lazy"
          />
        </a>
      ) : (
        <div className="work-card-placeholder">
          <span>{projectState(project)}</span>
        </div>
      )}
      <div className="work-card-copy">
        <h3>
          {editing ? (
            <EditableCopy field={copy?.name ?? ""}>{project.name}</EditableCopy>
          ) : (
            <a href={projectHref(trackPath, project.id)}>{project.name}</a>
          )}
        </h3>
        <p className="project-state">
          <EditableCopy field={copy?.category ?? ""}>
            {project.category}
          </EditableCopy>
        </p>
        <EditableCopy
          as="p"
          className="work-card-summary"
          field={copy?.summary ?? ""}
          multiline
        >
          {project.summary}
        </EditableCopy>
        <div className="work-card-bottom">
          <span>
            {project.parentId
              ? "KPI. 기능·연계 사례"
              : project.stack.slice(0, 2).join(" · ")}
          </span>
          <a href={projectHref(trackPath, project.id)}>
            사례 보기 <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}

function About({
  data,
  trackPath,
}: {
  data: PortfolioData;
  trackPath: string;
}) {
  const { profile } = data;
  return (
    <section
      id="about"
      className="profile-section"
      aria-labelledby="about-title"
    >
      <h2 id="about-title">소개·이력</h2>
      <div className="about-overview">
        <div>
          <EditableCopy as="p" field="hero.role" className="about-role">
            {profile.role}
          </EditableCopy>
          <EditableCopy
            as="p"
            field="hero.summary"
            className="about-intro"
            multiline
          >
            {profile.intro}
          </EditableCopy>
          <EditableCopy
            as="p"
            field="selected.profile.fields"
            className="profile-fields"
            multiline
          >
            {profile.fields.join(" · ")}
          </EditableCopy>
        </div>
        <div className="career-list">
          {profile.experiences.map((entry, index) => (
            <article key={`${entry.title}-${index}`}>
              <EditableCopy
                as="p"
                field={`career.${index}.period`}
                className="record-period"
              >
                {entry.period}
              </EditableCopy>
              <EditableCopy as="h3" field={`career.${index}.title`}>
                {entry.title}
              </EditableCopy>
              <EditableCopy
                as="p"
                field={`career.${index}.description`}
                multiline
              >
                {entry.description}
              </EditableCopy>
            </article>
          ))}
        </div>
      </div>
      <div className="work-areas">
        {profile.workAreas?.map((area, index) => (
          <article className="profile-row" key={index}>
            <EditableCopy
              as="h3"
              field={`selected.profile.workAreas.${index}.title`}
            >
              {area.title}
            </EditableCopy>
            <div>
              <EditableCopy
                as="p"
                field={`selected.profile.workAreas.${index}.description`}
                multiline
              >
                {area.description}
              </EditableCopy>
              <ProjectLinks
                ids={area.projectIds}
                data={data}
                trackPath={trackPath}
              />
            </div>
          </article>
        ))}
      </div>
      <div className="working-approach">
        {profile.approach?.map((item, index) => (
          <article key={index}>
            <EditableCopy
              as="h3"
              field={`selected.profile.approach.${index}.title`}
            >
              {item.title}
            </EditableCopy>
            <EditableCopy
              as="p"
              field={`selected.profile.approach.${index}.description`}
              multiline
            >
              {item.description}
            </EditableCopy>
          </article>
        ))}
      </div>
      {profile.education.length > 0 && (
        <div className="education-list">
          {profile.education.map((entry, index) => (
            <article className="profile-row" key={index}>
              <EditableCopy as="h3" field={`selected.education.${index}.title`}>
                {entry.title}
              </EditableCopy>
              <div>
                <EditableCopy
                  as="p"
                  field={`selected.education.${index}.period`}
                >
                  {entry.period}
                </EditableCopy>
                <EditableCopy
                  as="p"
                  field={`selected.education.${index}.description`}
                  multiline
                >
                  {entry.description}
                </EditableCopy>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function PortfolioHome({
  data,
  trackPath,
}: {
  data: PortfolioData;
  trackPath: string;
}) {
  const { profile } = data;
  const projects = orderedProjects(data.projects);
  const editing = useCopyEditing()?.editing;
  const featured = projects.slice(0, 3);
  const remaining = projects.slice(3);
  return (
    <>
      <section className="home-introduction" aria-labelledby="home-title">
        <EditableCopy
          as="h1"
          id="home-title"
          field={profile.headline ? "selected.profile.headline" : "hero.role"}
          className="home-title"
        >
          {profile.headline ?? profile.role}
        </EditableCopy>
        <EditableCopy
          as="p"
          field="hero.summary"
          className="home-description"
          multiline
        >
          {profile.intro}
        </EditableCopy>
        {profile.headlineNote && (
          <EditableCopy
            as="p"
            field="selected.profile.headlineNote"
            className="home-current-role"
          >
            {profile.headlineNote}
          </EditableCopy>
        )}
        <div className="home-outcomes" aria-label="대표 업무 변화">
          {featured.map((project) => (
            <HomeOutcome
              key={project.id}
              project={project}
              trackPath={trackPath}
            />
          ))}
        </div>
      </section>
      <section id="work" className="work-section" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">대표 사례</h2>
          <a href="#all-work">
            전체 사례 <ArrowRight size={16} aria-hidden />
          </a>
        </div>
        <div className="work-grid">
          {featured.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              trackPath={trackPath}
              featured
            />
          ))}
        </div>
      </section>
      <section
        id="all-work"
        className="work-section all-work"
        aria-labelledby="all-work-title"
      >
        <div className="section-heading">
          <h2 id="all-work-title">함께 만든 업무와 도구</h2>
        </div>
        <p className="section-description">
          KPI.의 기능별 개선 사례와 다른 업무 도구입니다. 실제 업무에 적용한
          범위와 현재 상태를 구분했습니다.
        </p>
        <div className="work-grid secondary-work">
          {remaining.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              trackPath={trackPath}
              featured={false}
            />
          ))}
        </div>
      </section>
      <section
        className="profile-section profile-achievements"
        aria-labelledby="achievements-title"
      >
        <h2 id="achievements-title">주요 업무 변화</h2>
        <Highlights
          title="핵심 성과"
          items={profile.highlights ?? []}
          field="selected.profile.highlights"
        />
      </section>
      <About data={data} trackPath={trackPath} />
      <section
        id="skills"
        className="profile-section"
        aria-labelledby="skills-title"
      >
        <h2 id="skills-title">기술과 사용 경험</h2>
        <div>
          {data.skills.map((skill, index) => {
            const key = skill.id ?? index;
            return (
              <article className="profile-row" key={key}>
                <div>
                  <EditableCopy as="h3" field={`selected.skills.${key}.name`}>
                    {skill.name}
                  </EditableCopy>
                  {skill.category && (
                    <EditableCopy
                      as="p"
                      field={`selected.skills.${key}.category`}
                      className="record-period"
                    >
                      {skill.category}
                    </EditableCopy>
                  )}
                </div>
                <div>
                  <EditableCopy
                    as="p"
                    field={`selected.skills.${key}.usage`}
                    multiline
                  >
                    {skill.usage}
                  </EditableCopy>
                  <ProjectLinks
                    ids={skill.projectIds ?? []}
                    data={data}
                    trackPath={trackPath}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section
        id="writing"
        className="profile-section"
        aria-labelledby="writing-title"
      >
        <h2 id="writing-title">글과 기록</h2>
        <div>
          {data.writing.map((post, index) => (
            <article className="profile-row writing-row" key={post.url}>
              <div>
                <EditableCopy as="h3" field={`selected.writing.${index}.title`}>
                  {post.title}
                </EditableCopy>
                {post.category && (
                  <EditableCopy
                    as="p"
                    className="record-period"
                    field={`selected.writing.${index}.category`}
                  >
                    {post.category}
                  </EditableCopy>
                )}
              </div>
              <div>
                <EditableCopy
                  as="p"
                  field={`selected.writing.${index}.summary`}
                  multiline
                >
                  {post.summary}
                </EditableCopy>
                <a
                  className="text-link"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  문서 열기 <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      {editing && (
        <p className="editing-note">각 문구를 수정한 뒤 상단에서 저장하세요.</p>
      )}
    </>
  );
}

function HomeOutcome({
  project,
  trackPath,
}: {
  project: Project;
  trackPath: string;
}) {
  const copy = useProjectCopy(project.id);
  const editing = useCopyEditing()?.editing;
  const highlight = project.highlights?.[0] ?? project.summary;
  const [heading, ...detail] = highlight.split(" — ");
  const Tag = editing ? "div" : "a";
  return (
    <Tag
      className="home-outcome"
      {...(!editing ? { href: projectHref(trackPath, project.id) } : {})}
    >
      <strong>{heading}</strong>
      <span>{detail.join(" — ") || project.summary}</span>
      <span className="outcome-project">
        {project.name}
        <ArrowRight size={13} aria-hidden />
      </span>
      {editing && (
        <EditableCopy as="p" field={copy?.highlights ?? ""} multiline>
          {(project.highlights ?? []).join("\n")}
        </EditableCopy>
      )}
    </Tag>
  );
}
