import { portfolioDocument } from "./portfolio.ts";
import type {
  JobkoreaResume,
  ResumeByPlatform,
  ResumePlatform,
  SaraminResume,
} from "./types.ts";

/**
 * 사람인 '파일로 이력서 만들기'에 올릴 문서. 사람인은 파일마다 종류(이력서·경력기술서·자기소개서)를 골라
 * 칸으로 바꿔 주므로 세 파일로 나눈다. 여기서는 문서 내용만 정하고 DOCX로 굽는 일은 docx.ts가 한다.
 */
export type DocKind = "resume" | "career" | "cover" | "portfolio";

export interface DocBlock {
  kind: "title" | "heading" | "subheading" | "paragraph" | "bullet" | "image";
  text: string;
  pageBreakBefore?: boolean;
  imagePath?: string;
}

export interface ResumeDocument {
  fileName: string;
  author?: string;
  kind?: DocKind;
  blocks: DocBlock[];
}

export const KIND_NAMES: Record<DocKind, string> = {
  resume: "이력서",
  career: "경력기술서",
  cover: "자기소개서",
  portfolio: "포트폴리오",
};

export function parseDocKind(value: unknown): DocKind | null {
  return value === "resume" ||
    value === "career" ||
    value === "cover" ||
    value === "portfolio"
    ? value
    : null;
}

export function resumeDocument<P extends ResumePlatform>(
  platform: P,
  resume: ResumeByPlatform[P],
  kind: DocKind,
): ResumeDocument {
  if (kind === "portfolio") return portfolioDocument(resume);
  const blocks =
    kind === "resume"
      ? platform === "jobkorea"
        ? jobkoreaBlocks(resume as JobkoreaResume)
        : saraminBlocks(resume as SaraminResume)
      : kind === "career"
        ? careerBlocks(resume.careerDescription)
        : coverBlocks(resume.coverLetter);
  return {
    fileName: `${resume.basic.name}_${KIND_NAMES[kind]}.docx`,
    author: resume.basic.name,
    kind,
    blocks,
  };
}

const heading = (text: string): DocBlock => ({ kind: "heading", text });
const subheading = (text: string): DocBlock => ({ kind: "subheading", text });
const paragraph = (text: string): DocBlock => ({ kind: "paragraph", text });

/** "이름: 값" 줄. 값이 비면 줄을 만들지 않는다. */
function fields(pairs: [string, string | undefined][]): DocBlock[] {
  return pairs
    .filter(([, value]) => value?.trim())
    .map(([name, value]) => paragraph(`${name}: ${value!.trim()}`));
}

/** 빈 줄은 버리고 줄마다 문단 하나 */
function lines(text: string): DocBlock[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(paragraph);
}

const period = (start: string, end: string | null) =>
  `${start} ~ ${end ?? "재직중"}`;

/** 최근에 시작한 경력부터 */
const byRecent = <C extends { start: string }>(careers: C[]) =>
  [...careers].sort((a, b) => b.start.localeCompare(a.start));

const joined = (...parts: string[]) =>
  parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" · ");

function saraminBlocks(resume: SaraminResume): DocBlock[] {
  const { basic } = resume;
  return [
    { kind: "title", text: resume.title?.trim() || "이력서" },
    heading("기본 정보"),
    ...fields([
      ["이름", basic.name],
      ["경력 구분", basic.careerType],
      ["성별", basic.gender],
      ["출생 연도", basic.birthYear && `${basic.birthYear}년`],
      ["이메일", basic.email],
      ["휴대폰", basic.phone],
      ["주소", basic.address],
    ]),
    heading("경력 요약"),
    ...lines(resume.myCareer),
    heading("경력"),
    ...byRecent(resume.careers).flatMap((career) => [
      subheading(
        joined(
          career.company,
          period(career.start, career.end),
          career.role,
          career.job,
        ),
      ),
      ...lines(career.duty),
      ...fields([["퇴사 사유", career.leaveReason]]),
    ]),
    heading("학력"),
    ...resume.education.map((school) =>
      paragraph(
        joined(
          school.school,
          school.level,
          school.major,
          school.minor && `부전공 ${school.minor}`,
          school.status,
        ),
      ),
    ),
    ...skillsAndLinks(resume.skills, resume.portfolio),
  ];
}

/** 잡코리아 칸 그대로. 연봉은 회사에 보이는 파일이라 넣지 않는다. */
function jobkoreaBlocks(resume: JobkoreaResume): DocBlock[] {
  const { basic, preference } = resume;
  return [
    { kind: "title", text: resume.title.trim() || "이력서" },
    heading("기본 정보"),
    ...fields([
      ["이름", basic.name],
      ["성별", basic.gender],
      ["출생 연도", basic.birthYear && `${basic.birthYear}년`],
      ["이메일", basic.email],
      ["휴대폰", basic.phone],
      ["주소", basic.address],
    ]),
    heading("경력"),
    ...byRecent(resume.careers).flatMap((career) => [
      subheading(
        joined(
          career.company,
          period(career.start, career.end),
          joined(`${career.department} ${career.position}`, career.title),
          career.job,
        ),
      ),
      ...lines(career.duty),
    ]),
    heading("학력"),
    ...resume.education.map((school) =>
      paragraph(
        joined(
          school.school,
          school.level,
          school.start || school.end
            ? `${school.start} ~ ${school.end}`.trim()
            : "",
          school.major,
          school.gpa && `학점 ${school.gpa}`,
          school.status,
        ),
      ),
    ),
    ...(resume.activities.trim()
      ? [heading("인턴·대외활동"), ...lines(resume.activities)]
      : []),
    ...(resume.certificates.trim()
      ? [heading("자격증·어학"), ...lines(resume.certificates)]
      : []),
    ...skillsAndLinks(resume.skills, resume.portfolio),
    heading("희망 근무 조건"),
    ...fields([
      ["고용 형태", preference.employmentType],
      ["근무 지역", preference.location],
      ["희망 연봉", preference.salary],
      ["희망 직무", preference.jobs],
      ["희망 산업", preference.industries],
    ]),
  ];
}

function skillsAndLinks(
  skills: string[],
  portfolio: { label: string; url: string }[],
): DocBlock[] {
  return [
    ...(skills.length
      ? [heading("보유 기술"), paragraph(skills.join(", "))]
      : []),
    ...(portfolio.length
      ? [
          heading("포트폴리오"),
          ...portfolio.map((link) => paragraph(`${link.label}: ${link.url}`)),
        ]
      : []),
  ];
}

/**
 * 경력기술서 본문은 사람인 칸에 붙여 넣던 글 그대로다. "1. " 줄은 소제목, "* " 줄은 글머리표로 바꾸고,
 * 칸 너비에 맞춰 줄을 바꾼 들여쓴 줄은 앞줄에 다시 붙인다.
 */
function careerBlocks(description: {
  title: string;
  body: string;
}): DocBlock[] {
  const blocks: DocBlock[] = [
    { kind: "title", text: description.title.trim() || "경력기술서" },
  ];
  for (const raw of description.body.split("\n")) {
    const text = raw.trim();
    if (!text) continue;
    const last = blocks.at(-1);
    if (/^■\s*/.test(text)) {
      blocks.push(heading(text.replace(/^■\s*/, "")));
    } else if (/^\[[^\]]+\]$/.test(text)) {
      blocks.push(subheading(text.slice(1, -1)));
    } else if (
      /^\s/.test(raw) &&
      last &&
      last.kind !== "title" &&
      !/^[*•-]\s/.test(text)
    ) {
      last.text = `${last.text} ${text}`;
    } else if (/^\d+\.\s/.test(text)) {
      blocks.push(heading(text));
    } else if (/^[*•-]\s/.test(text)) {
      blocks.push({ kind: "bullet", text: text.replace(/^[*•-]\s+/, "") });
    } else {
      blocks.push(paragraph(text));
    }
  }
  return blocks;
}

function coverBlocks(items: { title: string; body: string }[]): DocBlock[] {
  return [
    { kind: "title", text: "자기소개서" },
    ...items.flatMap((item) => [
      heading(item.title.trim()),
      ...item.body
        .split(/\n\s*\n/)
        .map((part) => part.replace(/\s*\n\s*/g, " ").trim())
        .filter(Boolean)
        .map(paragraph),
    ]),
  ];
}
