"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PortfolioData } from "@/lib/selected-portfolio/types";
import { EditableCopy } from "./editable-copy";
import "./profile-pages.css";

type ProfilePageProps = {
  page: "about" | "skills" | "writing";
  data: PortfolioData;
  onProjectSelect: (id: string) => void;
};

function ProjectLinks({
  ids,
  data,
  onProjectSelect,
}: {
  ids: string[];
  data: PortfolioData;
  onProjectSelect: (id: string) => void;
}) {
  const projects = ids.flatMap((id) => {
    const project = data.projects.find(
      (entry) => entry.id === id && !entry.hidden,
    );
    return project ? [project] : [];
  });
  if (!projects.length) return null;
  return (
    <ul className="profile-case-links" aria-label="관련 사례">
      {projects.map((project) => (
        <li key={project.id}>
          <a
            href={`#project/${project.id}/details`}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              event.preventDefault();
              onProjectSelect(project.id);
            }}
          >
            {project.name}
            <ArrowRight size={14} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProfilePage({ page, data, onProjectSelect }: ProfilePageProps) {
  const { profile } = data;
  if (page === "skills")
    return (
      <section
        className="profile-page profile-tools"
        aria-labelledby="profile-tools-title"
      >
        <header className="profile-page-heading">
          <h2 id="profile-tools-title">기술 스택</h2>
          <p>
            실제 업무와 프로젝트에서 사용한 기술입니다. 도구 이름과 함께 사용한
            일과 사례를 정리했습니다.
          </p>
        </header>
        <div className="profile-tool-list">
          {data.skills.map((skill, index) => {
            const key = skill.id ?? index;
            return (
              <article className="profile-tool-row" key={key}>
                <div className="profile-tool-name">
                  <EditableCopy as="h3" field={`selected.skills.${key}.name`}>
                    {skill.name}
                  </EditableCopy>
                  {skill.category && (
                    <EditableCopy
                      className="profile-tool-category"
                      field={`selected.skills.${key}.category`}
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
                    onProjectSelect={onProjectSelect}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );

  if (page === "writing")
    return (
      <section
        className="profile-page profile-writing"
        aria-labelledby="profile-writing-title"
      >
        <header className="profile-page-heading">
          <h2 id="profile-writing-title">글과 기록</h2>
          <p>
            업무를 바꾼 과정과 사용 방법, 개발 중 정리한 판단 기준입니다. 이
            사이트에 공개한 문서와 이전 구현 기록을 모았습니다.
          </p>
        </header>
        <div className="profile-writing-list">
          {data.writing.map((post, index) => (
            <article className="profile-writing-row" key={post.url}>
              <div>
                <EditableCopy as="h3" field={`selected.writing.${index}.title`}>
                  {post.title}
                </EditableCopy>
                {post.category && (
                  <EditableCopy
                    className="profile-record-category"
                    field={`selected.writing.${index}.category`}
                  >
                    {post.category}
                  </EditableCopy>
                )}
                <EditableCopy
                  as="p"
                  field={`selected.writing.${index}.summary`}
                  multiline
                >
                  {post.summary}
                </EditableCopy>
              </div>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-record-link"
                aria-label={`${post.title} 문서 열기 · 새 창`}
              >
                문서 열기 <ArrowUpRight size={16} aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </section>
    );

  return (
    <section
      className="profile-page profile-about"
      aria-labelledby="profile-about-title"
    >
      <div className="profile-overview">
        <header className="profile-introduction">
          <h2 id="profile-about-title">{profile.name}</h2>
          <EditableCopy as="p" field="hero.role" className="profile-role">
            {profile.role}
          </EditableCopy>
          <EditableCopy
            as="p"
            field="hero.summary"
            className="profile-summary"
            multiline
          >
            {profile.intro}
          </EditableCopy>
          <ProjectLinks
            ids={data.projects.slice(0, 1).map((project) => project.id)}
            data={data}
            onProjectSelect={onProjectSelect}
          />
          {profile.links.length > 0 && (
            <ul className="profile-public-links">
              {profile.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url}>
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>
        {profile.experiences.length > 0 && (
          <section
            className="profile-career"
            aria-labelledby="profile-career-title"
          >
            <h3 id="profile-career-title">현재 경력</h3>
            {profile.experiences.map((entry, index) => (
              <article key={`${index}-${entry.period}`}>
                <EditableCopy
                  field={`career.${index}.period`}
                  className="profile-career-period"
                >
                  {entry.period}
                </EditableCopy>
                <EditableCopy as="h4" field={`career.${index}.title`}>
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
          </section>
        )}
      </div>
      {(profile.workAreas ?? []).length > 0 && (
        <section className="profile-work" aria-labelledby="profile-work-title">
          <div className="profile-section-heading">
            <h3 id="profile-work-title">맡아 온 일</h3>
            <p>
              실무에서 발견한 문제를 자료와 업무 기준부터 살피고,
              조회·검증·분석·보고로 연결했습니다.
            </p>
          </div>
          {profile.workAreas?.map((area, index) => (
            <article className="profile-work-row" key={index}>
              <EditableCopy
                as="h4"
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
                  onProjectSelect={onProjectSelect}
                />
              </div>
            </article>
          ))}
        </section>
      )}
      {(profile.approach ?? []).length > 0 && (
        <section
          className="profile-approach"
          aria-labelledby="profile-approach-title"
        >
          <h3 id="profile-approach-title">일하는 방식</h3>
          <div className="profile-approach-list">
            {profile.approach?.map((entry, index) => (
              <article key={index}>
                <EditableCopy
                  as="h4"
                  field={`selected.profile.approach.${index}.title`}
                >
                  {entry.title}
                </EditableCopy>
                <EditableCopy
                  as="p"
                  field={`selected.profile.approach.${index}.description`}
                  multiline
                >
                  {entry.description}
                </EditableCopy>
              </article>
            ))}
          </div>
        </section>
      )}
      {profile.education.length > 0 && (
        <section
          className="profile-education"
          aria-labelledby="profile-education-title"
        >
          <h3 id="profile-education-title">교육·학습</h3>
          {profile.education.map((entry, index) => (
            <article className="profile-work-row" key={index}>
              <EditableCopy
                field={`selected.education.${index}.period`}
                className="profile-career-period"
              >
                {entry.period}
              </EditableCopy>
              <div>
                <EditableCopy
                  as="h4"
                  field={`selected.education.${index}.title`}
                >
                  {entry.title}
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
        </section>
      )}
    </section>
  );
}
