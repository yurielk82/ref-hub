import {
  AX_HERO,
  AX_TRACK_HERO,
  SALES_METHOD,
  AX_METHOD,
  AX_PILLARS,
  AX_GROUNDING,
  AX_STACK,
  AX_TRACK_CASE_SLUGS,
} from "../../data/ax-content";
import { getAxCase } from "../../data/ax";
import { WORK_CHAPTERS } from "../../data/work-history";
import { EXPERIENCES, SKILL_CATEGORIES } from "../../data/experience";
import {
  REFERENCE_PROJECTS,
  OTHER_PROJECTS,
  getProject,
  PROJECTS,
} from "../../data/projects";
import type { CopyField } from "./store";

export type PortfolioTrack = "sales" | "ax";
/** 편집 항목과 표시 값을 같은 정의에서 만든다. 등록되지 않은 키는 저장할 수 없다. */
export function portfolioContent(
  track: PortfolioTrack,
  values: Record<string, string> = {},
) {
  const fields: CopyField[] = [];
  /** 항목을 편집 목록에 등록하고 저장값 또는 기본값을 돌려준다. */
  const text = (
    key: string,
    label: string,
    group: string,
    original: string,
    maxLength = 300,
    multiline = false,
  ) => {
    const id = `${track}.${key}`;
    const value = values[id] ?? original;
    fields.push({ id, label, group, value, maxLength, multiline });
    return value;
  };
  /** 여러 줄 편집값을 빈 줄 없는 목록으로 읽는다. */
  const lines = (
    key: string,
    label: string,
    group: string,
    original: readonly string[],
  ) =>
    text(key, label, group, original.join("\n"), 2000, true)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  const originalHero = track === "sales" ? AX_HERO : AX_TRACK_HERO;
  const hero = {
    ...originalHero,
    role: text("hero.role", "담당 분야", "첫 소개", originalHero.role, 100),
    title: text(
      "hero.title",
      "대표 소개문",
      "첫 소개",
      originalHero.title,
      100,
    ),
    subhead: text(
      "hero.subhead",
      "담당 업무",
      "첫 소개",
      originalHero.subhead,
      180,
    ),
    summary: text(
      "hero.summary",
      "강점 요약",
      "첫 소개",
      originalHero.summary,
      300,
    ),
    evidenceTitle: text(
      "hero.evidenceTitle",
      "강점 제목",
      "첫 소개",
      originalHero.evidenceTitle,
      50,
    ),
    evidence: originalHero.evidence.map((item, index) => ({
      label: text(
        `hero.evidence.${index}.label`,
        `강점 ${index + 1} · 제목`,
        "첫 소개",
        item.label,
        60,
      ),
      text: text(
        `hero.evidence.${index}.text`,
        `강점 ${index + 1} · 근거`,
        "첫 소개",
        item.text,
        180,
      ),
    })),
  };
  const method = SALES_METHOD.map((step, index) => ({
    ...step,
    title:
      track === "sales"
        ? text(
            `method.${index}.title`,
            "단계 제목",
            "일하는 방식",
            step.title,
            80,
          )
        : step.title,
    description:
      track === "sales"
        ? text(
            `method.${index}.description`,
            "설명",
            "일하는 방식",
            step.description,
            200,
          )
        : step.description,
    example:
      track === "sales"
        ? text(
            `method.${index}.example`,
            "실제 사례",
            "일하는 방식",
            step.example,
            180,
          )
        : step.example,
  }));
  const work = WORK_CHAPTERS.map((chapter) => {
    if (track !== "sales") return chapter;
    const group = `업무 · ${chapter.title}`;
    const key = `work.${chapter.id}`;
    return {
      ...chapter,
      title: text(`${key}.title`, "업무 제목", group, chapter.title, 100),
      period: text(`${key}.period`, "기간", group, chapter.period, 60),
      situation: text(
        `${key}.situation`,
        "문제·과제",
        group,
        chapter.situation,
        300,
      ),
      actions: lines(
        `${key}.actions`,
        "해결한 일 · 한 줄에 한 항목",
        group,
        chapter.actions,
      ),
      results: lines(
        `${key}.results`,
        "결과·현재 상태 · 한 줄에 한 항목",
        group,
        chapter.results,
      ),
    };
  });
  const experiences = EXPERIENCES.map((entry, index) => {
    if (track !== "sales") return entry;
    const group = "경력";
    const key = `career.${index}`;
    return {
      ...entry,
      title: text(`${key}.title`, "회사·부서", group, entry.title, 100),
      role: text(`${key}.role`, "직급·담당 업무", group, entry.role, 120),
      period: text(`${key}.period`, "재직 기간", group, entry.period, 60),
      description: text(
        `${key}.description`,
        "경력 요약",
        group,
        entry.description,
        300,
      ),
      highlights: lines(
        `${key}.highlights`,
        "주요 경력 · 한 줄에 한 항목",
        group,
        entry.highlights,
      ),
    };
  });
  const skills = SKILL_CATEGORIES.map((item, i) =>
    track !== "sales"
      ? item
      : {
          label: text(
            `skills.${i}.label`,
            "역량 분류",
            "업무 역량",
            item.label,
            60,
          ),
          items: lines(
            `skills.${i}.items`,
            "역량 · 한 줄에 한 항목",
            "업무 역량",
            item.items,
          ),
        },
  );
  /** 사례의 공통 소개 문구에 저장값을 적용한다. */
  const projectCopy = (project: (typeof REFERENCE_PROJECTS)[number]) => ({
    ...project,
    name: text(
      `project.${project.slug}.name`,
      "사례 이름",
      `사례 · ${project.name}`,
      project.name,
      100,
    ),
    tagline: text(
      `project.${project.slug}.tagline`,
      "사례 요약",
      `사례 · ${project.name}`,
      project.tagline,
      180,
    ),
  });
  const projects = (
    track === "sales" ? REFERENCE_PROJECTS : OTHER_PROJECTS
  ).map(projectCopy);
  const cases =
    track !== "ax"
      ? []
      : AX_TRACK_CASE_SLUGS.flatMap((slug) => {
          const study = getAxCase(slug);
          const project = getProject(slug);
          if (!study?.ax || !project) return [];
          const group = `대표 사례 · ${project.name}`;
          const key = `case.${slug}`;
          return [
            {
              ...study,
              project,
              ax: {
                headline: text(
                  `${key}.headline`,
                  "핵심 성과",
                  group,
                  study.ax.headline,
                  160,
                ),
                problem: text(
                  `${key}.problem`,
                  "문제",
                  group,
                  study.ax.problem,
                  300,
                ),
                build: text(`${key}.build`, "구축", group, study.ax.build, 400),
                automation: text(
                  `${key}.automation`,
                  "자동화",
                  group,
                  study.ax.automation,
                  400,
                ),
                operation: text(
                  `${key}.operation`,
                  "운영·검증",
                  group,
                  study.ax.operation,
                  300,
                ),
              },
            },
          ];
        });
  const axMethod = AX_METHOD.map((step, i) =>
    track !== "ax"
      ? step
      : {
          title: text(
            `method.${i}.title`,
            "단계 제목",
            "일하는 방식",
            step.title,
            80,
          ),
          description: text(
            `method.${i}.description`,
            "설명",
            "일하는 방식",
            step.description,
            200,
          ),
        },
  );
  const pillars = AX_PILLARS.map((item, i) =>
    track !== "ax"
      ? item
      : {
          ...item,
          title: text(
            `pillar.${i}.title`,
            "역량 제목",
            "핵심 역량",
            item.title,
            80,
          ),
          description: text(
            `pillar.${i}.description`,
            "설명",
            "핵심 역량",
            item.description,
            250,
          ),
        },
  );
  const grounding =
    track !== "ax"
      ? AX_GROUNDING
      : {
          ...AX_GROUNDING,
          title: text(
            "grounding.title",
            "제목",
            "검증 원칙",
            AX_GROUNDING.title,
            100,
          ),
          summary: text(
            "grounding.summary",
            "요약",
            "검증 원칙",
            AX_GROUNDING.summary,
            300,
          ),
          examples: AX_GROUNDING.examples.map((item, i) => ({
            label: text(
              `grounding.${i}.label`,
              "항목",
              "검증 원칙",
              item.label,
              60,
            ),
            text: text(
              `grounding.${i}.text`,
              "설명",
              "검증 원칙",
              item.text,
              250,
            ),
          })),
          spreadLead: text(
            "grounding.lead",
            "운영 설명",
            "검증 원칙",
            AX_GROUNDING.spreadLead,
            200,
          ),
          spreadTags: lines(
            "grounding.tags",
            "검증 항목 · 한 줄에 한 항목",
            "검증 원칙",
            AX_GROUNDING.spreadTags,
          ),
        };
  const stack = AX_STACK.map((item, i) =>
    track !== "ax"
      ? item
      : {
          label: text(
            `stack.${i}.label`,
            "기술 분류",
            "사용 기술",
            item.label,
            60,
          ),
          items: lines(
            `stack.${i}.items`,
            "기술 · 한 줄에 한 항목",
            "사용 기술",
            item.items,
          ),
        },
  );
  const contact = {
    title: text(
      "contact.title",
      "연락 제목",
      "연락",
      "업무 개선 경험을 이야기하겠습니다.",
      100,
    ),
    lead: text(
      "contact.lead",
      "연락 설명",
      "연락",
      track === "sales"
        ? "영업관리·데이터 분석·문제 해결 경험을 소개합니다."
        : "업무 자동화·시스템 구축·운영 경험을 소개합니다.",
      200,
    ),
  };
  // 기존 이름·요약 키를 공유해 홈에서 저장한 문구가 사례에서도 이어지게 한다.
  const details = PROJECTS.filter((project) =>
    track === "sales"
      ? project.scope === "company"
      : project.scope === "other" ||
        AX_TRACK_CASE_SLUGS.some((slug) => slug === project.slug),
  ).map((original) => {
    const project =
      projects.find((item) => item.slug === original.slug) ??
      projectCopy(original);
    const study = getAxCase(project.slug);
    const usesAxSummary = track === "ax" && Boolean(study?.ax);
    const group = `상세 · ${original.name}`;
    const key = `detail.${project.slug}`;
    const screens = project.screens?.map((screen, index) => ({
      ...screen,
      title: text(
        `${key}.screen.${index}.title`,
        `화면 ${index + 1} 제목`,
        group,
        screen.title,
        120,
      ),
      caption: text(
        `${key}.screen.${index}.caption`,
        `화면 ${index + 1} 설명`,
        group,
        screen.caption,
        800,
        true,
      ),
    }));
    const editedStudy = study
      ? {
          ...study,
          role: text(`${key}.role`, "내 역할", group, study.role, 500, true),
          problem: usesAxSummary
            ? study.problem
            : text(`${key}.problem`, "문제", group, study.problem, 800, true),
          intervention: usesAxSummary
            ? study.intervention
            : text(
                `${key}.intervention`,
                "내가 한 일",
                group,
                study.intervention,
                1000,
                true,
              ),
          outcome: usesAxSummary
            ? study.outcome
            : text(
                `${key}.outcome`,
                "결과·진행 현황",
                group,
                study.outcome,
                800,
                true,
              ),
          impact: study.impact
            ? text(`${key}.impact`, "대표 결과", group, study.impact, 300)
            : undefined,
          steps: study.steps?.map((step, index) => ({
            ...step,
            title: text(
              `${key}.step.${index}.title`,
              `과정 ${index + 1} 제목`,
              group,
              step.title,
              160,
            ),
            body: text(
              `${key}.step.${index}.body`,
              `과정 ${index + 1} 설명`,
              group,
              step.body,
              1200,
              true,
            ),
          })),
          ax:
            cases.find((item) => item.projectSlug === project.slug)?.ax ??
            study.ax,
        }
      : undefined;
    return {
      project: { ...project, screens },
      study: editedStudy,
    };
  });
  return {
    hero,
    method,
    work,
    experiences,
    skills,
    projects,
    cases,
    axMethod,
    pillars,
    grounding,
    stack,
    contact,
    details,
    fields,
  };
}
