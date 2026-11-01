import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { CASE_STATUS_LABEL, type AxCaseStudy } from "@/data/ax-types";
import { ScreenGallery } from "./screen-gallery";
import { TRACKS, type Track } from "./track";

/** 설명과 그 설명의 화면을 한 사례에서 읽는다. 확대만 클라이언트 상태다. */
export function ProjectDetail({
  project,
  caseStudy,
  back,
  track,
}: {
  project: Project;
  caseStudy?: AxCaseStudy;
  back: { href: string; label: string };
  track: Track;
}) {
  const view = track === "ax" ? caseStudy?.ax : undefined;
  const facts = view
    ? [
        ["문제", view.problem],
        ["구축·자동화", `${view.build} ${view.automation}`],
        ["운영·검증", view.operation],
      ]
    : caseStudy
      ? [
          ["문제", caseStudy.problem],
          ["내가 한 일", caseStudy.intervention],
          ["업무에 남긴 변화", caseStudy.outcome],
        ]
      : [];
  const screens = project.screens ?? [];
  const evidence = (caseStudy?.steps ?? []).map((step) => ({
    ...step,
    image: screens.find((screen) => screen.src === step.screen),
  }));
  const shown = new Set(
    evidence.flatMap((step) => (step.image ? [step.image.src] : [])),
  );
  const remaining = screens.filter((screen) => !shown.has(screen.src));
  return (
    <article className="folio-page folio-case">
      <Link className="folio-back" href={back.href}>
        <ArrowLeft size={16} aria-hidden />
        {back.label}
      </Link>
      <div className="folio-case-heading">
        <h1>{project.name}</h1>
        <p className="folio-lead">{project.tagline}</p>
        {view && <p className="folio-summary">{view.headline}</p>}
        {caseStudy && (
          <dl className="folio-ownership">
            <div>
              <dt>내가 맡은 일</dt>
              <dd>{caseStudy.role}</dd>
            </div>
            <div>
              <dt>기간</dt>
              <dd>{caseStudy.period}</dd>
            </div>
            <div>
              <dt>현재 상태</dt>
              <dd>
                <strong>{CASE_STATUS_LABEL[caseStudy.status.kind]}</strong> ·{" "}
                {caseStudy.status.note}
              </dd>
            </div>
          </dl>
        )}
      </div>
      {facts.length > 0 ? (
        <section className="folio-story" aria-labelledby="case-story">
          <h2 id="case-story">문제와 해결</h2>
          <dl>
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {caseStudy?.impact && (
            <p className="folio-impact">{caseStudy.impact}</p>
          )}
        </section>
      ) : (
        <p className="folio-lead">{project.description}</p>
      )}
      {(evidence.length > 0 || screens.length > 0) && (
        <section className="folio-evidence" aria-labelledby="case-evidence">
          <div className="folio-section-heading">
            <h2 id="case-evidence">업무에 적용한 방식</h2>
            {project.screensNote && <p>{project.screensNote}</p>}
          </div>
          {evidence.map((step) => (
            <section
              className="folio-evidence-step"
              key={`${step.phase}-${step.title}`}
            >
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.image && (
                <>
                  <ScreenGallery screens={[step.image]} inline />
                  <p className="folio-screen-note">{step.image.caption}</p>
                </>
              )}
            </section>
          ))}
          {remaining.map((screen) => (
            <section className="folio-evidence-step" key={screen.src}>
              <h3>{screen.title}</h3>
              <p>{screen.caption}</p>
              <ScreenGallery screens={[screen]} inline />
            </section>
          ))}
        </section>
      )}
      <details className="folio-disclosure">
        <summary>구현 범위와 참고 자료</summary>
        <ul className="folio-bullets">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="folio-links">
          {project.docsPath && (
            <Link href={project.docsPath}>
              운영 매뉴얼 <ArrowUpRight size={16} aria-hidden />
            </Link>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              서비스 보기 <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
          {TRACKS[track].developerLinks && project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              소스 코드 <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
          {project.featuredModule && (
            <Link href={project.featuredModule.path}>
              {project.featuredModule.name} 문서{" "}
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          )}
        </div>
        {TRACKS[track].developerLinks && (
          <p className="folio-tech">{project.tech.join(" · ")}</p>
        )}
      </details>
      <div className="folio-case-end">
        <Link className="folio-button" href={back.href}>
          <ArrowLeft size={16} aria-hidden />
          다른 사례 살펴보기
        </Link>
      </div>
    </article>
  );
}
