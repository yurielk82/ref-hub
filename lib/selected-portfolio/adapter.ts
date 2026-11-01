import { PROJECTS } from "@/data/projects";
import type { PortfolioTrack } from "@/lib/portfolio/content";
import type { CopyField } from "@/lib/portfolio/store";
import type { PortfolioData, Project } from "./types";

const legacyProjectIds: Readonly<Record<string, string>> = {
  pharmkpi: "kpi",
  "pharmkpi-exec": "bi",
  "kpis-dsr-api": "kpis",
  "sales-hq-sfe": "kpi-sfe",
  "sales-hq-snop": "kpi-snop",
  "accounting-ledger": "kpi",
  "monthly-sales-reports": "kpi",
  "market-analysis": "kpi",
  "sales-strategy-portal": "kpi",
};
const legacySlugs: Readonly<Record<string, string>> = {
  kpi: "pharmkpi",
  bi: "pharmkpi-exec",
  kpis: "kpis-dsr-api",
  "kpi-sfe": "sales-hq-sfe",
  "kpi-snop": "sales-hq-snop",
};

const screenshotKey = (src: string) =>
  src.replace(
    /^\/(?:assets\/selected-portfolio\/images|images\/portfolio)\//,
    "",
  );
const legacyScreens = new Map(
  PROJECTS.flatMap((project) =>
    (project.screens ?? []).map<[string, string]>((screen, index) => [
      screenshotKey(screen.src),
      `detail.${project.slug}.screen.${index}`,
    ]),
  ),
);

export function selectedProjectId(slug: string): string {
  return legacyProjectIds[slug] ?? slug;
}

export function findSelectedProject(
  data: PortfolioData,
  slug: string,
): Project | undefined {
  return data.projects.find(
    (project) => project.id === selectedProjectId(slug),
  );
}

export function selectedPortfolioContent(
  base: PortfolioData,
  track: PortfolioTrack,
  overrides: Record<string, string> = {},
): { data: PortfolioData; fields: CopyField[] } {
  const fields: CopyField[] = [];
  const text = (
    key: string,
    label: string,
    group: string,
    original: string,
    maxLength = 300,
    multiline = false,
  ): string => {
    const id = `${track}.${key}`;
    const value = overrides[id] ?? original;
    fields.push({ id, label, group, value, maxLength, multiline });
    return value;
  };
  const list = (
    key: string,
    label: string,
    group: string,
    original: string[],
  ): string[] =>
    text(key, label, group, original.join("\n"), 2000, true)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  const savedIntroParts = ["hero.title", "hero.subhead"].flatMap((key) => {
    const saved = overrides[`${track}.${key}`];
    return saved === undefined
      ? []
      : [
          text(
            key,
            key === "hero.title" ? "저장된 소개 제목" : "저장된 소개 설명",
            "소개",
            saved,
            key === "hero.title" ? 100 : 180,
            true,
          ),
        ];
  });
  const intro = text(
    "hero.summary",
    "소개 본문",
    "소개",
    base.profile.intro,
    1000,
    true,
  );
  const profile = {
    ...base.profile,
    role: text("hero.role", "담당 분야", "소개", base.profile.role, 100),
    intro: [...savedIntroParts, intro].join("\n\n"),
    fields: list(
      "selected.profile.fields",
      "주요 분야 · 한 줄에 한 항목",
      "소개",
      base.profile.fields,
    ),
    experiences: base.profile.experiences.map((entry, index) => ({
      ...entry,
      title: text(
        `career.${index}.title`,
        "회사·부서·담당 업무",
        "경력",
        entry.title,
        300,
      ),
      period: text(
        `career.${index}.period`,
        "재직 기간",
        "경력",
        entry.period,
        60,
      ),
      description: text(
        `career.${index}.description`,
        "경력 요약",
        "경력",
        entry.description,
        1000,
        true,
      ),
    })),
    education: base.profile.education.map((entry, index) => ({
      ...entry,
      title: text(
        `selected.education.${index}.title`,
        "교육·학습 이름",
        "교육",
        entry.title,
        200,
      ),
      period: text(
        `selected.education.${index}.period`,
        "기간",
        "교육",
        entry.period,
        100,
      ),
      description: text(
        `selected.education.${index}.description`,
        "내용",
        "교육",
        entry.description,
        1000,
        true,
      ),
    })),
  };
  const projects = base.projects.map((project) => {
    const slug = legacySlugs[project.id] ?? project.id;
    const group = `사례 · ${project.name}`;
    const key = `selected.project.${project.id}`;
    return {
      ...project,
      name: text(`project.${slug}.name`, "이름", group, project.name, 100),
      summary: text(
        `project.${slug}.tagline`,
        "소개 요약",
        group,
        project.summary,
        1000,
        true,
      ),
      role: text(
        `detail.${slug}.role`,
        "직접 맡은 일",
        group,
        project.role,
        1000,
        true,
      ),
      title: text(`${key}.title`, "표지 제목", group, project.title, 300, true),
      category: text(
        `${key}.category`,
        "현재 상태",
        group,
        project.category,
        100,
      ),
      period: text(`${key}.period`, "기간", group, project.period, 100),
      stack: list(
        `${key}.stack`,
        "사용 기술 · 한 줄에 한 항목",
        group,
        project.stack,
      ),
      sections: project.sections.map((section, sectionIndex) => {
        const sectionKey = `${key}.section.${sectionIndex}`;
        const bodyKey =
          section.title === "문제와 시작"
            ? `detail.${slug}.problem`
            : section.title === "직접 한 일"
              ? `detail.${slug}.intervention`
              : section.title === "결과와 현재 상태"
                ? `detail.${slug}.outcome`
                : `${sectionKey}.body`;
        const sectionGroup = `${project.name} · ${section.title}`;
        const legacyCaseKey =
          section.title === "문제와 시작"
            ? `case.${slug}.problem`
            : section.title === "직접 한 일"
              ? `case.${slug}.build`
              : section.title === "결과와 현재 상태"
                ? `case.${slug}.operation`
                : undefined;
        const originalBody =
          track === "ax" && legacyCaseKey
            ? (overrides[`${track}.${legacyCaseKey}`] ?? section.body)
            : section.body;
        return {
          ...section,
          title: text(
            `${sectionKey}.title`,
            "본문 제목",
            sectionGroup,
            section.title,
            200,
          ),
          body: text(bodyKey, "본문", sectionGroup, originalBody, 12000, true),
          screens: section.screens?.map((screen, screenIndex) => {
            const screenKey =
              legacyScreens.get(screenshotKey(screen.src)) ??
              `${sectionKey}.screen.${screenIndex}`;
            return {
              ...screen,
              title: text(
                `${screenKey}.title`,
                `화면 ${screenIndex + 1} 제목`,
                sectionGroup,
                screen.title,
                200,
              ),
              caption: text(
                `${screenKey}.caption`,
                `화면 ${screenIndex + 1} 설명`,
                sectionGroup,
                screen.caption,
                3000,
                true,
              ),
            };
          }),
        };
      }),
    };
  });
  return {
    data: {
      ...base,
      profile,
      projects,
      skills: base.skills.map((skill, index) => ({
        name: text(
          `selected.skills.${index}.name`,
          "기술·도구",
          "기술 스택",
          skill.name,
          100,
        ),
        usage: text(
          `selected.skills.${index}.usage`,
          "실제 사용한 일",
          "기술 스택",
          skill.usage,
          2000,
          true,
        ),
      })),
      writing: base.writing.map((post, index) => ({
        ...post,
        title: text(
          `selected.writing.${index}.title`,
          "글 제목",
          "글과 기록",
          post.title,
          200,
        ),
        summary: text(
          `selected.writing.${index}.summary`,
          "설명",
          "글과 기록",
          post.summary,
          1000,
          true,
        ),
      })),
    },
    fields: [...new Map(fields.map((field) => [field.id, field])).values()],
  };
}
