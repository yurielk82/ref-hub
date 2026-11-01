import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { CASE_STATUS_LABEL, type AxCaseStudy } from "@/data/ax-types";
import { caseHref, type Track } from "./track";

export function ProjectRow({
  project,
  study,
  track = "sales",
  featured = false,
}: {
  project: Project;
  study?: AxCaseStudy;
  track?: Track;
  featured?: boolean;
}) {
  return (
    <article className={`folio-project-row ${featured ? "is-featured" : ""}`}>
      <Link href={caseHref(track, project.slug)}>
        <div className="folio-project-copy">
          <h3>{project.name}</h3>
          <p>{project.tagline}</p>
          {featured && study && (
            <dl>
              <div>
                <dt>담당</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt>결과</dt>
                <dd>
                  {track === "ax" && study.ax
                    ? study.ax.headline
                    : (study.impact ?? study.outcome)}
                </dd>
              </div>
            </dl>
          )}
          <div className="folio-row-bottom">
            <span className="folio-row-action">
              해결 과정 보기 <ArrowRight size={17} aria-hidden />
            </span>
            {study && (
              <span className="folio-status">
                {CASE_STATUS_LABEL[study.status.kind]}
              </span>
            )}
          </div>
        </div>
        {featured && project.screenshot && (
          <div className="folio-project-image">
            <p>
              {project.screensNote ?? "실제 업무 화면 · 공개용 비식별 처리"}
            </p>
            <Image
              src={project.screenshot}
              alt={`${project.name} 업무 화면`}
              width={1440}
              height={900}
              sizes="(max-width: 760px) 100vw, 520px"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
