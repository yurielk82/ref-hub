"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type {
  PortfolioData,
  Project,
  PublicLink,
} from "@/lib/selected-portfolio/types";
import { sitePath } from "@/lib/selected-portfolio/content";
import { ThemeToggle } from "./theme-toggle";
import { ProjectArt } from "./project-art";
import {
  ProjectDetail,
  ProjectSections,
  sectionId,
  type SectionRequest,
} from "./project-detail";

function Links({ links }: { links: PublicLink[] }) {
  return (
    <div className="public-links">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          {...(link.url.startsWith("https:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
function ProjectMetadata({ project }: { project: Project }) {
  return (
    <div className="detail-meta">
      <p>{project.role}</p>
      <ul className="tags">
        {project.stack.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <Links links={project.links} />
    </div>
  );
}
export function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="project-body">
      <ProjectMetadata project={project} />
      <ProjectSections project={project} />
    </div>
  );
}
function Accent({ text, accent }: { text: string; accent: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  return at < 0 ? (
    text
  ) : (
    <>
      {text.slice(0, at)}
      <em>{accent}</em>
      {text.slice(at + accent.length)}
    </>
  );
}
export function Portfolio({
  data,
  trackPath = "",
  ownerTools,
}: {
  data: PortfolioData;
  trackPath?: string;
  ownerTools?: ReactNode;
}) {
  const { profile, projects } = data;
  const first = "about";
  const [selected, setSelected] = useState(first);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(-1);
  const [sectionRequest, setSectionRequest] = useState<SectionRequest | null>(
    null,
  );
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const focusMain = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      setCompact(query.matches);
      if (!query.matches) setNavigationOpen(false);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const valid = (key: string) =>
      ["about", "skills", "writing"].includes(key) ||
      projects.some(
        (p) => key === `project/${p.id}` || key === `project/${p.id}/details`,
      );
    const sync = () => {
      let key: string;
      try {
        key = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        key = first;
      }
      const next = valid(key) ? key : first;
      setSelected(next);
      setOpenProject(next.endsWith("/details") ? next.split("/")[1] : null);
      setActiveSection(-1);
      setSectionRequest(null);
      setNavigationOpen(false);
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [first, projects]);
  useEffect(() => {
    root.current
      ?.querySelector<HTMLAnchorElement>(".browser-choices a[aria-current]")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
    if (!navigationOpen && focusMain.current) {
      main.current?.focus({ preventScroll: true });
      focusMain.current = false;
    }
  }, [selected, navigationOpen]);
  const select = (key: string) => {
    if (selected !== key) window.history.pushState(null, "", `#${key}`);
    setSelected(key);
    setOpenProject(key.endsWith("/details") ? key.split("/")[1] : null);
    setActiveSection(-1);
    setSectionRequest(null);
    setNavigationOpen(false);
    focusMain.current = true;
    main.current?.scrollTo(0, 0);
  };
  const choose = (event: MouseEvent<HTMLAnchorElement>, key: string) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return;
    event.preventDefault();
    select(key);
  };
  const goToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    project: Project,
    index: number,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return;
    event.preventDefault();
    select(`project/${project.id}/details`);
    focusMain.current = false;
    setSectionRequest({ projectId: project.id, index });
    setActiveSection(index);
  };
  const project = projects.find(
    (p) =>
      selected === `project/${p.id}` || selected === `project/${p.id}/details`,
  );
  const detail = selected.endsWith("/details");
  const current = (key: string) =>
    selected === key || selected === `${key}/details`
      ? ("page" as const)
      : undefined;
  return (
    <div
      className="project-browser"
      ref={root}
      onKeyDown={(event) => {
        if (event.key === "Escape" && navigationOpen) {
          setNavigationOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <header className="browser-mobile-head">
        <a href="#about" onClick={(event) => choose(event, first)}>
          {profile.name}
        </a>
        <button
          className="browser-menu-toggle"
          type="button"
          ref={menuButton}
          aria-controls="portfolio-navigation"
          aria-expanded={navigationOpen}
          onClick={() => setNavigationOpen(!navigationOpen)}
        >
          {navigationOpen ? "메뉴 닫기" : "프로젝트·목차"}
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {navigationOpen ? (
              <path d="m5 5 10 10M15 5 5 15" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </header>
      {navigationOpen && (
        <button
          className="browser-menu-scrim"
          type="button"
          aria-label="탐색 메뉴 닫기"
          onClick={() => {
            setNavigationOpen(false);
            menuButton.current?.focus();
          }}
        />
      )}
      <aside
        className="browser-side"
        id="portfolio-navigation"
        data-open={navigationOpen || undefined}
      >
        <div className="browser-identity">
          <div className="browser-id-row browser-name-row">
            <div className="browser-name">
              <h1>
                <a href={`#${first}`} onClick={(e) => choose(e, first)}>
                  {profile.name}
                </a>
              </h1>
              <p>{profile.role}</p>
            </div>
            <ThemeToggle />
          </div>
          <p className="browser-fields">{profile.fields.join(" · ")}</p>
          {ownerTools || (
            <a
              className="owner-entry"
              href="https://ref.dvsharp.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              관리 · 로그인 ↗
            </a>
          )}
        </div>
        <nav className="browser-choices" aria-label="프로젝트와 목차">
          <ul className="project-tree">
            {projects.map((p) => {
              const expanded = openProject === p.id;
              const isCurrent = !!current(`project/${p.id}`);
              return (
                <li
                  className={`project-tree-item${p.parentId ? " project-family-child" : ""}`}
                  data-project-id={p.id}
                  key={p.id}
                >
                  <div className="project-tree-row">
                    <a
                      className="project-tree-link"
                      href={`#project/${p.id}`}
                      aria-current={current(`project/${p.id}`)}
                      onClick={(event) => choose(event, `project/${p.id}`)}
                    >
                      {p.name}
                    </a>
                    <button
                      className="project-tree-toggle"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`project-toc-${p.id}`}
                      aria-label={`${p.name} 목차 ${expanded ? "접기" : "펼치기"}`}
                      onClick={() => setOpenProject(expanded ? null : p.id)}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="m6 3 5 5-5 5" />
                      </svg>
                    </button>
                  </div>
                  <ul
                    className="project-tree-sections"
                    id={`project-toc-${p.id}`}
                    hidden={!expanded}
                  >
                    {[{ title: "개요와 담당 역할" }, ...p.sections].map(
                      (section, row) => {
                        const index = row - 1;
                        return (
                          <li key={index}>
                            <a
                              className="project-tree-section"
                              data-section-index={index}
                              href={`${sitePath(`${trackPath}/projects/${p.id}/`)}${index >= 0 ? `#${sectionId(p, index)}` : ""}`}
                              aria-current={
                                detail && isCurrent && activeSection === index
                                  ? "location"
                                  : undefined
                              }
                              onClick={(event) => goToSection(event, p, index)}
                            >
                              {section.title}
                            </a>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className="browser-resources" aria-label="소개와 기록">
          <a
            href="#about"
            aria-current={current("about")}
            onClick={(e) => choose(e, "about")}
          >
            소개·이력
          </a>
          <a
            href="#skills"
            aria-current={current("skills")}
            onClick={(e) => choose(e, "skills")}
          >
            기술 스택
          </a>
          <a
            href="#writing"
            aria-current={current("writing")}
            onClick={(e) => choose(e, "writing")}
          >
            글과 기록
          </a>
        </nav>
        <Links links={profile.links} />
        {data.site.example && (
          <p className="template-note">
            샘플 포트폴리오
            <br />
            내용을 내 이야기로 바꿔 보세요.
          </p>
        )}
      </aside>
      <main
        ref={main}
        id="main-content"
        className={`browser-main${detail ? " is-detail" : ""}`}
        tabIndex={-1}
        inert={compact && navigationOpen}
      >
        <div
          key={project?.id || selected}
          className={`scene${project ? " project-stage" : ""}`}
          hidden={detail}
          aria-label={project?.name || "프로필"}
        >
          {project ? (
            <>
              <a
                className="stage-cover-link"
                href={sitePath(`${trackPath}/projects/${project.id}/`)}
                onClick={(event) =>
                  choose(event, `project/${project.id}/details`)
                }
              >
                <header className="stage-head">
                  <h2 className="stage-title">
                    <Accent text={project.title} accent={project.accent} />
                  </h2>
                  <p className="stage-summary">{project.summary}</p>
                  <p className="stage-role">{project.role}</p>
                  <span className="stage-go">
                    만든 과정 보기 <span aria-hidden="true">→</span>
                  </span>
                </header>
                <ProjectArt project={project} />
              </a>
              <footer className="stage-foot">
                <div>
                  <p className="stage-state">
                    {project.category} · {project.period}
                  </p>
                  <p className="art-disclosure">
                    업무 흐름을 표현한 그림 · 실제 화면은 만든 과정에서 확인할
                    수 있습니다.
                  </p>
                  <ul className="tags">
                    {project.stack.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
                <Links links={project.links} />
              </footer>
            </>
          ) : selected === "skills" ? (
            <section className="text-page">
              <p className="eyebrow">TOOLS & PRACTICE</p>
              <h2>기술 스택</h2>
              <p className="page-intro">
                직접 사용한 기술과, 그 기술로 해 본 일입니다.
              </p>
              {data.skills.length ? (
                <div className="skills-grid">
                  {data.skills.map((skill) => (
                    <article key={skill.name}>
                      <h3>{skill.name}</h3>
                      <p>{skill.usage}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="empty-state">아직 등록한 기술이 없습니다.</p>
              )}
            </section>
          ) : selected === "writing" ? (
            <section className="text-page">
              <p className="eyebrow">NOTES & QUESTIONS</p>
              <h2>글과 기록</h2>
              <p className="page-intro">
                만들면서 만난 문제와 그 문제를 풀어 간 기록입니다.
              </p>
              {data.writing.length ? (
                <div className="writing-list">
                  {data.writing.map((post) => (
                    <article key={post.url}>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3>{post.title} ↗</h3>
                        <p>{post.summary}</p>
                      </a>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="empty-state">아직 등록한 글이 없습니다.</p>
              )}
            </section>
          ) : (
            <section className="text-page">
              <p className="eyebrow">ABOUT ME</p>
              <h2>{profile.name}</h2>
              <p className="about-intro">{profile.intro}</p>
              <Links links={profile.links} />
              {projects[0] && (
                <a
                  className="stage-go about-project-entry"
                  href="#project/kpi"
                  onClick={(e) => choose(e, `project/${projects[0].id}`)}
                >
                  대표 프로젝트 KPI 보기 <span aria-hidden="true">→</span>
                </a>
              )}
              {[
                { name: "경험", rows: profile.experiences },
                { name: "교육", rows: profile.education },
              ].map(
                (group) =>
                  group.rows.length > 0 && (
                    <section className="record-group" key={group.name}>
                      <h3>{group.name}</h3>
                      {group.rows.map((row, i) => (
                        <article key={i}>
                          <span className="num">{row.period}</span>
                          <div>
                            <h4>{row.title}</h4>
                            <p>{row.description}</p>
                          </div>
                        </article>
                      ))}
                    </section>
                  ),
              )}
            </section>
          )}
        </div>
        {project && detail && (
          <ProjectDetail
            key={`detail/${project.id}`}
            project={project}
            projects={projects}
            index={projects.indexOf(project)}
            onNavigate={choose}
            metadata={<ProjectMetadata project={project} />}
            sectionRequest={sectionRequest}
            onSectionChange={setActiveSection}
          />
        )}
        <noscript>
          <div className="noscript-links">
            <p>프로젝트 상세 페이지</p>
            {projects.map((p) => (
              <a key={p.id} href={sitePath(`${trackPath}/projects/${p.id}/`)}>
                {p.name} →
              </a>
            ))}
          </div>
        </noscript>
      </main>
    </div>
  );
}
