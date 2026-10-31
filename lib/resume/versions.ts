import { randomBytes } from "node:crypto";
import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  JobkoreaResume,
  ResumeByPlatform,
  ResumePlatform,
  ResumeVersion,
  ResumeVersionSummary,
  SaraminResume,
} from "./types.ts";

export { careerMonths, monthsLabel } from "./months.ts";

/**
 * 이력서 버전 보관. 버전마다 JSON 파일 하나(<사이트 폴더>/<id>.json)이고 고치지 않고 새로 쌓는다.
 * 폴더는 RESUME_DATA_DIR, 없으면 공고 저장 폴더(JOBS_DATA_DIR) 옆의 resume 폴더다.
 * 사람인은 처음 만든 versions 폴더를 그대로 쓰고, 잡코리아는 칸이 달라 따로 쌓는다.
 */
const FOLDERS: Record<ResumePlatform, string> = {
  saramin: "versions",
  jobkorea: "jobkorea-versions",
};
const VALIDATORS: {
  [P in ResumePlatform]: (v: unknown) => v is ResumeByPlatform[P];
} = {
  saramin: isResume,
  jobkorea: isJobkoreaResume,
};
const ID = /^\d{8}-\d{6}-[0-9a-f]{6}$/;
/** 이력서 한 벌이 이보다 크면 잘못 들어온 값으로 본다 */
export const MAX_RESUME_BYTES = 200_000;

export function resumeDataDir(): string | null {
  const dir = process.env.RESUME_DATA_DIR?.trim();
  if (dir) return dir;
  const jobs = process.env.JOBS_DATA_DIR?.trim();
  return jobs ? path.join(path.dirname(jobs), "resume") : null;
}

export async function listVersions(
  dir: string,
  platform: ResumePlatform = "saramin",
): Promise<ResumeVersionSummary[]> {
  let names: string[];
  try {
    names = await readdir(path.join(dir, FOLDERS[platform]));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const versions = await Promise.all(
    names
      .filter((name) => ID.test(name.replace(/\.json$/, "")))
      .map((name) => readVersion(dir, name.replace(/\.json$/, ""), platform)),
  );
  return versions
    .filter((version) => version !== null)
    .map(({ id, savedAt, label }) => ({ id, savedAt, label }))
    .sort((a, b) => b.id.localeCompare(a.id));
}

export async function readVersion<P extends ResumePlatform = "saramin">(
  dir: string,
  id: string,
  platform: P = "saramin" as P,
): Promise<ResumeVersion<ResumeByPlatform[P]> | null> {
  if (!ID.test(id)) return null;
  let raw: string;
  try {
    raw = await readFile(
      path.join(dir, FOLDERS[platform], `${id}.json`),
      "utf8",
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  const parsed = JSON.parse(raw) as Partial<ResumeVersion<unknown>> | null;
  if (parsed?.format !== 1 || !VALIDATORS[platform](parsed.resume)) return null;
  return parsed as ResumeVersion<ResumeByPlatform[P]>;
}

/** 새 버전을 쓴다. 같은 이름이 생기지 않게 시각과 난수로 id를 만들고, 다 쓴 뒤 이름을 바꿔 반쪽 파일을 남기지 않는다. */
export async function saveVersion<P extends ResumePlatform = "saramin">(
  dir: string,
  resume: ResumeByPlatform[P],
  label: string,
  now: Date = new Date(),
  platform: P = "saramin" as P,
): Promise<ResumeVersion<ResumeByPlatform[P]>> {
  if (!VALIDATORS[platform](resume)) throw new Error("이력서 형식이 아닙니다");
  const body = JSON.stringify(resume);
  if (Buffer.byteLength(body) > MAX_RESUME_BYTES)
    throw new Error("이력서가 너무 큽니다");
  const version: ResumeVersion<ResumeByPlatform[P]> = {
    format: 1,
    id: versionId(now),
    savedAt: now.toISOString(),
    label: label.trim().slice(0, 80) || "이름 없는 버전",
    resume,
  };
  const folder = path.join(dir, FOLDERS[platform]);
  await mkdir(folder, { recursive: true, mode: 0o700 });
  const target = path.join(folder, `${version.id}.json`);
  const temp = `${target}.tmp`;
  await writeFile(temp, `${JSON.stringify(version, null, 2)}\n`, {
    mode: 0o600,
    flag: "wx",
  });
  await rename(temp, target);
  return version;
}

function versionId(now: Date): string {
  // KST 기준 날짜-시각이라 파일 이름만 봐도 저장 시점을 안다
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:T]/g, "")
    .slice(0, 14);
  return `${kst.slice(0, 8)}-${kst.slice(8)}-${randomBytes(3).toString("hex")}`;
}

/** 두 버전에서 값이 달라진 칸의 경로(예: careers.6.duty). 비교할 이전 버전이 없으면 빈 집합이다. */
export function changedPaths(
  previous: object | null,
  current: object,
): Set<string> {
  const changed = new Set<string>();
  if (!previous) return changed;
  const walk = (a: unknown, b: unknown, at: string) => {
    if (typeof a === "object" && a && typeof b === "object" && b) {
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      for (const key of keys)
        walk(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
          at ? `${at}.${key}` : key,
        );
      return;
    }
    if (a !== b) changed.add(at);
  };
  walk(previous, current, "");
  return changed;
}

const strings = (o: unknown, keys: string[]) =>
  typeof o === "object" &&
  o !== null &&
  keys.every((key) => typeof (o as Record<string, unknown>)[key] === "string");

const stringList = (value: unknown) =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const titledList = (value: unknown, keys: string[]) =>
  Array.isArray(value) && value.every((item) => strings(item, keys));

export function isResume(value: unknown): value is SaraminResume {
  if (typeof value !== "object" || value === null) return false;
  const r = value as Partial<SaraminResume>;
  return (
    strings(r.basic, [
      "name",
      "careerType",
      "gender",
      "birthYear",
      "email",
      "phone",
      "address",
    ]) &&
    typeof r.myCareer === "string" &&
    Array.isArray(r.careers) &&
    r.careers.every(
      (c) =>
        strings(c, [
          "company",
          "start",
          "job",
          "role",
          "duty",
          "leaveReason",
        ]) &&
        (c.end === null || typeof c.end === "string"),
    ) &&
    Array.isArray(r.education) &&
    r.education.every((e) =>
      strings(e, ["school", "level", "status", "major", "minor"]),
    ) &&
    Array.isArray(r.skills) &&
    r.skills.every((s) => typeof s === "string") &&
    Array.isArray(r.portfolio) &&
    r.portfolio.every((p) => strings(p, ["label", "url"])) &&
    strings(r.careerDescription, ["title", "body"]) &&
    Array.isArray(r.coverLetter) &&
    r.coverLetter.every((c) => strings(c, ["title", "body"]))
  );
}

export function isJobkoreaResume(value: unknown): value is JobkoreaResume {
  if (typeof value !== "object" || value === null) return false;
  const r = value as Partial<JobkoreaResume>;
  return (
    typeof r.title === "string" &&
    strings(r.basic, [
      "name",
      "gender",
      "birthYear",
      "phone",
      "email",
      "address",
    ]) &&
    stringList(r.skills) &&
    titledList(r.education, [
      "school",
      "level",
      "start",
      "end",
      "status",
      "major",
      "gpa",
    ]) &&
    Array.isArray(r.careers) &&
    r.careers.every(
      (c) =>
        strings(c, [
          "company",
          "start",
          "department",
          "position",
          "title",
          "job",
          "salary",
          "duty",
        ]) &&
        (c.end === null || typeof c.end === "string"),
    ) &&
    typeof r.activities === "string" &&
    typeof r.certificates === "string" &&
    strings(r.careerDescription, ["title", "body"]) &&
    titledList(r.coverLetter, ["title", "body"]) &&
    titledList(r.portfolio, ["label", "url"]) &&
    strings(r.preference, [
      "employmentType",
      "location",
      "salary",
      "jobs",
      "industries",
    ])
  );
}
