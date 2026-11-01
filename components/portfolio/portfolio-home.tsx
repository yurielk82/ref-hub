import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { AX_CONTACT } from "@/data/ax-content";
import type { portfolioContent } from "@/lib/portfolio/content";
import { ProjectRow } from "./project-row";
import { SortableGrid } from "./sortable-grid";
import type { Track } from "./track";

type Copy = ReturnType<typeof portfolioContent>;
const SALES_LEAD = ["pharmkpi-exec", "kpis-dsr-api", "monthly-sales-reports"];

/** 경력 소개와 담당 역할을 먼저 보여 주고 같은 트랙의 사례로 연결한다. */
export function PortfolioHome({ copy, track }: { copy: Copy; track: Track }) {
  const sales = track === "sales";
  const caseId = sales ? "projects" : "cases";
  const home = sales ? "/" : "/ax";
  const career = copy.experiences[0];
  const originalProjects = sales
    ? copy.projects
    : copy.cases.map(
        (item) =>
          copy.details.find(
            (detail) => detail.project.slug === item.projectSlug,
          )?.project ?? item.project,
      );
  const projects = sales
    ? [
        ...SALES_LEAD.flatMap((slug) =>
          originalProjects.filter((project) => project.slug === slug),
        ),
        ...originalProjects.filter(
          (project) => !SALES_LEAD.includes(project.slug),
        ),
      ]
    : originalProjects;
  const studies = copy.details.flatMap((item) =>
    item.study ? [item.study] : [],
  );
  return (
    <div className="folio-page">
      <section className="folio-hero" aria-labelledby="profile-title">
        <div>
          <h1 id="profile-title">{copy.hero.title}</h1>
          <p className="folio-profession">
            {copy.hero.name} · {copy.hero.role}
          </p>
          <p className="folio-lead">{copy.hero.subhead}</p>
          <p className="folio-summary">{copy.hero.summary}</p>
          <Link className="folio-button is-primary" href={`${home}#${caseId}`}>
            문제 해결 사례 보기 <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        {career && (
          <aside
            className="folio-career-summary"
            aria-labelledby="career-summary-title"
          >
            <h2 id="career-summary-title">경력의 중심</h2>
            <p className="folio-career-company">{career.title}</p>
            <p>{career.role}</p>
            <p className="folio-period">{career.period}</p>
            <p>{career.description}</p>
            <Link href={`${home}#career`}>
              경력과 업무 보기 <ArrowRight size={16} aria-hidden />
            </Link>
          </aside>
        )}
      </section>
      <section className="folio-strengths" aria-label={copy.hero.evidenceTitle}>
        {copy.hero.evidence.map((item) => (
          <div key={item.label}>
            <h2>{item.label}</h2>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
      <section id={caseId} className="folio-section">
        <div className="folio-section-heading">
          <h2>문제 해결 사례</h2>
          <p>내가 맡은 일과 바꾼 점을 실제 업무 화면과 함께 정리했습니다.</p>
        </div>
        <SortableGrid
          projects={projects}
          studies={studies}
          rows
          track={track}
          storageKey={sales ? "ref-hub-project-order" : "ref-hub-ax-case-order"}
        />
      </section>
      {sales ? <SalesWork copy={copy} /> : <AxPractice copy={copy} />}
      <section id="career" className="folio-section">
        <div className="folio-section-heading">
          <h2>경력과 업무 역량</h2>
          <p>영업관리 실무를 바탕으로 분석과 업무 개선을 함께 수행합니다.</p>
        </div>
        {copy.experiences.map((entry) => (
          <div className="folio-career-entry" key={entry.period}>
            <p className="folio-period">{entry.period}</p>
            <div>
              <h3>{entry.title}</h3>
              <p className="folio-career-role">{entry.role}</p>
              <p>{entry.description}</p>
              <details className="folio-disclosure">
                <summary>주요 경력 자세히 보기</summary>
                <ul className="folio-bullets">
                  {entry.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        ))}
        <div className="folio-skills">
          {copy.skills.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      {!sales && (
        <>
          <section id="tools" className="folio-section">
            <div className="folio-section-heading">
              <h2>개인·외부 작업</h2>
              <p>회사 업무와 구분한 도구 개발·평가와 외부 의뢰 작업입니다.</p>
            </div>
            {copy.projects.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                track="ax"
                study={studies.find(
                  (study) => study.projectSlug === project.slug,
                )}
              />
            ))}
          </section>
          <section id="stack" className="folio-section">
            <h2>사용하는 기술</h2>
            <div className="folio-skills">
              {copy.stack.map((group) => (
                <div key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
            <Link className="folio-text-link" href="/docs">
              시스템 매뉴얼 보기 <ArrowRight size={16} aria-hidden />
            </Link>
          </section>
        </>
      )}
      <section id="contact" className="folio-contact">
        <div>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.lead}</p>
        </div>
        <a className="folio-button" href={`mailto:${AX_CONTACT.email}`}>
          <Mail size={18} aria-hidden />
          {AX_CONTACT.email}
        </a>
      </section>
    </div>
  );
}

/** 현재 업무의 수행 내용과 결과를 펼쳐 읽도록 구성한다. */
function SalesWork({ copy }: { copy: Copy }) {
  return (
    <>
      <section id="work" className="folio-section">
        <div className="folio-section-heading">
          <h2>주요 업무 경험</h2>
          <p>구축한 결과와 현재 개선 중인 일을 구분해 기록했습니다.</p>
        </div>
        <div className="folio-work-list">
          {copy.work.map((chapter) => (
            <details className="folio-disclosure" key={chapter.id}>
              <summary>
                <span>{chapter.title}</span>
                <span className="folio-period">{chapter.period}</span>
              </summary>
              <p>{chapter.situation}</p>
              <h3>수행 업무</h3>
              <ul className="folio-bullets">
                {chapter.actions.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h3>결과·현재 상태</h3>
              <ul className="folio-bullets">
                {chapter.results.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="folio-links">
                {chapter.projects.map((slug) => (
                  <Link key={slug} href={`/projects/${slug}`}>
                    {copy.details.find((item) => item.project.slug === slug)
                      ?.project.name ?? slug}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
      <section id="method" className="folio-section">
        <h2>일하는 방식</h2>
        <ol className="folio-method">
          {copy.method.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <p className="folio-method-example">{step.example}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

/** AX 업무의 실행 방식과 원천 검증 근거를 보여 준다. */
function AxPractice({ copy }: { copy: Copy }) {
  return (
    <>
      <section id="method" className="folio-section">
        <h2>일하는 방식</h2>
        <div className="folio-skills">
          {copy.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
        <ol className="folio-method">
          {copy.axMethod.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="folio-section folio-grounding">
        <h2>{copy.grounding.title}</h2>
        <p>{copy.grounding.summary}</p>
        <dl>
          {copy.grounding.examples.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
        <p>{copy.grounding.spreadLead}</p>
        <p>{copy.grounding.spreadTags.join(" · ")}</p>
      </section>
    </>
  );
}
