import { WORK_CHAPTERS } from "../../data/work-history.ts";
import { DELIVERY_PROJECTS } from "../../data/projects/delivery.ts";
import type { DocBlock, ResumeDocument } from "./document.ts";
import type { SaraminResume, JobkoreaResume } from "./types.ts";

// 현재 이력서의 업무 흐름에 맞춘 대표 사례. 서술·운영 상태는 공개 원본을 그대로 사용한다.
const CHAPTERS = [
  "sales-analysis",
  "executive-bi",
  "sales-hq",
  "distribution-inventory",
  "cso-data",
  "reporting",
];

export function portfolioDocument(
  resume: SaraminResume | JobkoreaResume,
): ResumeDocument {
  const blocks: DocBlock[] = [
    { kind: "title", text: "포트폴리오" },
    { kind: "subheading", text: resume.title?.trim() || "업무 개선 사례" },
    {
      kind: "paragraph",
      text: [resume.basic.name, resume.basic.email, resume.basic.phone]
        .filter(Boolean)
        .join(" · "),
    },
    { kind: "heading", text: "대표 업무 사례" },
    ...CHAPTERS.flatMap((id) => {
      const chapter = WORK_CHAPTERS.find((item) => item.id === id);
      return chapter
        ? [
            {
              kind: "paragraph" as const,
              text: `${chapter.title} · ${chapter.period}`,
            },
          ]
        : [];
    }),
    { kind: "heading", text: "온라인 포트폴리오" },
    ...resume.portfolio.map((link) => ({
      kind: "paragraph" as const,
      text: `${link.label}: ${link.url}`,
    })),
  ];
  for (const id of CHAPTERS) {
    const chapter = WORK_CHAPTERS.find((item) => item.id === id);
    if (!chapter) continue;
    const project = DELIVERY_PROJECTS.find(
      (item) => item.slug === chapter.projects[0],
    );
    // 유통재고는 아직 진행 중이며 별도 공개 화면이 없어 경영지표 화면을 중복 싣지 않는다.
    const screen =
      id === "distribution-inventory" ? undefined : project?.screens?.[0];
    blocks.push(
      { kind: "heading", text: chapter.title, pageBreakBefore: true },
      { kind: "paragraph", text: chapter.period },
      { kind: "subheading", text: "업무 과제" },
      { kind: "paragraph", text: chapter.situation },
      { kind: "subheading", text: "수행 내용" },
      ...chapter.actions.map((text) => ({ kind: "bullet" as const, text })),
      { kind: "subheading", text: "결과와 현재 상태" },
      ...chapter.results.map((text) => ({ kind: "bullet" as const, text })),
    );
    if (screen)
      blocks.push(
        { kind: "image", text: screen.title, imagePath: screen.src },
        { kind: "paragraph", text: screen.caption },
        {
          kind: "paragraph",
          text: project?.screensNote || "공개용 화면입니다.",
        },
      );
    if (project)
      blocks.push({
        kind: "paragraph",
        text: `상세 사례: https://ref.dvsharp.com/projects/${project.slug}`,
      });
  }
  return {
    fileName: `${resume.basic.name}_포트폴리오.docx`,
    author: resume.basic.name,
    kind: "portfolio",
    blocks,
  };
}
