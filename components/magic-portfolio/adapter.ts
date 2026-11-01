import type { portfolioContent } from "@/lib/portfolio/content";
import { PROJECTS } from "@/data/projects";
import { caseHref, type Track } from "@/components/portfolio/track";
export type Copy = ReturnType<typeof portfolioContent>;
export const portfolioBase = (track: Track) => (track === "ax" ? "/ax" : "");
const primary = [
  "pharmkpi",
  "pharmkpi-exec",
  "kpis-dsr-api",
  "csoweb",
  "erp-spec",
];
const modules = new Set([
  "accounting-ledger",
  "monthly-sales-reports",
  "market-analysis",
  "sales-hq-sfe",
  "sales-hq-snop",
  "sales-strategy-portal",
]);
export function visibleProjects(copy: Copy) {
  return copy.details
    .filter((d) => !modules.has(d.project.slug))
    .sort((a, b) => {
      const ia = primary.indexOf(a.project.slug),
        ib = primary.indexOf(b.project.slug);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
}
export function cardProps(
  project: Copy["details"][number]["project"],
  track: Track,
) {
  return {
    href: caseHref(track, project.slug),
    images: project.screenshot
      ? [project.screenshot]
      : (project.screens?.slice(0, 1).map((s) => s.src) ?? []),
    title: project.name,
    description: project.tagline,
    hasContent: true,
    avatars: [],
    link: "",
  };
}
export function allScreens(copy: Copy) {
  const result = new Map(
    PROJECTS.flatMap((p) => p.screens ?? []).map((s) => [s.src, s]),
  );
  for (const d of copy.details)
    for (const s of d.project.screens ?? []) result.set(s.src, s);
  return result;
}

/** 현재 템플릿에서 표시하는 필드만 편집한다. 기존 키와 과거 저장값은 보존한다. */
export function editableFields(copy: Copy, track: Track) {
  const shown =
    /^(hero\.|career\.|skills\.|contact\.|project\.|detail\.|case\.)/;
  return copy.fields.filter((field) =>
    shown.test(field.id.slice(track.length + 1)),
  );
}
