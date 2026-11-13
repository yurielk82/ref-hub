"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { PortfolioData } from "@/lib/selected-portfolio/types";
import { sitePath } from "@/lib/selected-portfolio/content";
import {
  projectHref,
  type PortfolioView,
} from "@/lib/selected-portfolio/presentation";
import {
  ownerHref,
  type OwnerSection,
  type PortfolioHome as PortfolioHomePath,
} from "@/lib/selected-portfolio/workspace";
import {
  InlineEditingProvider,
  EditableCopy,
  useCopyEditing,
  type OwnerEditing,
} from "./editable-copy";
import { OwnerBar } from "./owner-bar";
import { PortfolioHome } from "./profile-pages";
import { ProjectDetail } from "./project-detail";
import { ThemeToggle } from "./theme-toggle";

export type OwnerWorkspace = { section: OwnerSection; content: ReactNode };
type PortfolioProps = {
  data: PortfolioData;
  trackPath?: string;
  view?: PortfolioView;
  owner?: OwnerEditing | null;
  workspace?: OwnerWorkspace | null;
  initialEditing?: boolean;
};

export function Portfolio(props: PortfolioProps) {
  return (
    <InlineEditingProvider
      owner={props.owner ?? null}
      track={props.trackPath === "/ax" ? "ax" : "sales"}
      initialEditing={props.initialEditing}
    >
      <PortfolioFrame {...props} />
    </InlineEditingProvider>
  );
}

function PortfolioFrame({
  data,
  trackPath = "",
  view = { kind: "home" },
  owner = null,
  workspace = null,
}: PortfolioProps) {
  const router = useRouter();
  const editing = useCopyEditing();
  const home: PortfolioHomePath = trackPath === "/ax" ? "/ax" : "/";
  const [navigationOpen, setNavigationOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const project =
    view.kind === "project"
      ? data.projects.find((entry) => entry.id === view.id)
      : undefined;

  useEffect(() => {
    if (workspace) return;
    const followLegacyProject = () => {
      const match = /^#project\/([^/]+)(?:\/details)?$/.exec(
        window.location.hash,
      );
      const id = match?.[1];
      if (id && data.projects.some((entry) => entry.id === id))
        router.replace(
          `${projectHref(trackPath, id)}${window.location.search}`,
        );
    };
    followLegacyProject();
    window.addEventListener("hashchange", followLegacyProject);
    return () => window.removeEventListener("hashchange", followLegacyProject);
  }, [data.projects, router, trackPath, workspace]);

  useEffect(() => {
    if (!navigationOpen) return;
    navigation.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnResize = () => {
      if (window.innerWidth > 760) setNavigationOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [navigationOpen]);

  const IdentityTag = editing?.editing ? "div" : "a";
  const sectionHref = (id: string) =>
    view.kind === "home" && !workspace ? `#${id}` : `${sitePath(home)}#${id}`;

  return (
    <div className="portfolio-site" data-owner={Boolean(owner) || undefined}>
      {owner && <OwnerBar home={home} section={workspace?.section ?? null} />}
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && navigationOpen) {
            setNavigationOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <IdentityTag
          className="site-identity"
          {...(!editing?.editing ? { href: sitePath(home) } : {})}
        >
          <strong>{data.profile.name}</strong>
          <span>
            <EditableCopy field="hero.role">{data.profile.role}</EditableCopy>
          </span>
        </IdentityTag>
        <button
          className="menu-button"
          type="button"
          ref={menuButton}
          aria-label={navigationOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={navigationOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setNavigationOpen((open) => !open)}
        >
          {navigationOpen ? (
            <X size={20} aria-hidden />
          ) : (
            <Menu size={20} aria-hidden />
          )}
        </button>
        <nav
          id="portfolio-navigation"
          aria-label="포트폴리오 메뉴"
          className="site-navigation"
          data-open={navigationOpen || undefined}
          ref={navigation}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a"))
              setNavigationOpen(false);
          }}
        >
          <a href={sectionHref("work")}>사례</a>
          <a href={sectionHref("about")}>소개·이력</a>
          <a href={sectionHref("skills")}>기술</a>
          <a href={sectionHref("writing")}>기록</a>
          {data.profile.links.slice(0, 1).map((link) => (
            <a key={link.url} href={link.url}>
              이메일 <ArrowUpRight size={13} aria-hidden />
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </header>
      <main id="main-content" className="site-main" tabIndex={-1}>
        {workspace ? (
          <div className="owner-workspace">{workspace.content}</div>
        ) : project ? (
          <ProjectDetail
            project={project}
            projects={data.projects}
            trackPath={trackPath}
          />
        ) : (
          <PortfolioHome data={data} trackPath={trackPath} />
        )}
      </main>
      <footer className="site-footer">
        <div>
          <strong>{data.profile.name}</strong>
          <p>{data.site.title}</p>
        </div>
        <div className="footer-links">
          {data.profile.links.map((link) => (
            <a href={link.url} key={link.url}>
              {link.label} <ArrowUpRight size={14} aria-hidden />
            </a>
          ))}
          {!owner && (
            <a className="owner-login-entry" href={ownerHref(home, "login")}>
              로그인
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
