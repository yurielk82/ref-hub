import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { CASE_STATUS_LABEL, type AxCaseStudy } from "@/data/ax-types";
import { caseHref, type Track } from "./track";

/** 사례 목록에서 본인의 기여와 업무 화면을 함께 소개한다. */
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
            <ProjectContribution study={study} track={track} />
          )}
          <ProjectRowAction study={study} />
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

/** 담당 범위와 확인된 결과를 같은 항목 구조로 읽게 한다. */
function ProjectContribution({
  study,
  track,
}: {
  study: AxCaseStudy;
  track: Track;
}) {
  return (
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
  );
}

/** 사례 이동 안내와 현재 운영 상태를 한 줄로 표시한다. */
function ProjectRowAction({ study }: { study?: AxCaseStudy }) {
  return (
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
  );
}
