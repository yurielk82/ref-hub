import type { JobPosting, SearchQuery } from "./types.ts";

/**
 * 사람인 채용 공고 API(GET https://oapi.saramin.co.kr/job-search) 요청·응답 경계.
 * 근거: 사람인 오픈 API 가이드 /guide/job-search, /guide/info (2026-10-27 확인).
 * - 하루 최대 500회 호출, 한 번에 최대 110건.
 * - 한 변수 안의 여러 값은 OR, 서로 다른 변수는 AND.
 * - 응답 값은 숫자·문자열이 섞여 오고, 공고가 하나면 배열 대신 객체로 올 수 있어 경계에서 맞춘다.
 */

export const SARAMIN_ENDPOINT = "https://oapi.saramin.co.kr/job-search";
export const SARAMIN_MAX_COUNT = 110;

/** close-type 1 = 접수마감일. 나머지(채용시·상시·수시)는 마감 시각이 의미 없다. */
const CLOSE_TYPE_DEADLINE = "1";

export interface SearchOptions {
  accessKey: string;
  /** 이 시각 이후 등록된 공고만 받는다 */
  publishedMin: Date;
  start: number;
}

export function buildSearchParams(
  query: SearchQuery,
  options: SearchOptions,
): URLSearchParams {
  const params = new URLSearchParams(query.params);
  params.set("access-key", options.accessKey);
  params.set("sr", "directhire");
  params.set("count", String(SARAMIN_MAX_COUNT));
  params.set("sort", "pd");
  params.set("start", String(options.start));
  params.set(
    "published_min",
    String(Math.floor(options.publishedMin.getTime() / 1000)),
  );
  return params;
}

export type ParseResult =
  | { ok: true; total: number; postings: JobPosting[]; skipped: number }
  | { ok: false; code: number | null; message: string };

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function num(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(text(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function child(value: unknown, key: string): unknown {
  return isObject(value) ? value[key] : undefined;
}

function codeName(value: unknown): { code: string; name: string } {
  return { code: text(child(value, "code")), name: text(child(value, "name")) };
}

/** 화면에서 링크로 여는 주소라 http(s)만 받는다 — 그 밖의 형식(javascript: 등)은 버린다. */
function safeUrl(url: string): string | null {
  if (!/^https?:\/\//i.test(url)) return null;
  return url.replace(/^http:\/\//i, "https://");
}

function timestamp(value: unknown): string | null {
  const seconds = num(value);
  return seconds > 0 ? new Date(seconds * 1000).toISOString() : null;
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toPosting(raw: unknown): JobPosting | null {
  if (!isObject(raw)) return null;
  const position = raw.position;
  const id = text(raw.id);
  const title = text(child(position, "title"));
  const url = safeUrl(text(raw.url));
  if (!id || !title || !url) return null;

  const company = child(raw.company, "detail");
  const industry = codeName(child(position, "industry"));
  const job = codeName(child(position, "job-code"));
  const experience = child(position, "experience-level");
  const closeType = codeName(raw["close-type"]);

  return {
    id,
    url,
    title,
    company: text(child(company, "name")),
    companyUrl: safeUrl(text(child(company, "href"))),
    location: codeName(child(position, "location")).name,
    jobType: codeName(child(position, "job-type")).name,
    industryCode: industry.code,
    industry: industry.name,
    jobCodes: splitList(job.code),
    jobNames: job.name,
    experience: {
      code: num(child(experience, "code")),
      min: num(child(experience, "min")),
      max: num(child(experience, "max")),
      label: text(child(experience, "name")),
    },
    education: codeName(child(position, "required-education-level")).name,
    salary: codeName(raw.salary).name,
    keywords: splitList(text(raw.keyword)),
    postedAt: timestamp(raw["posting-timestamp"]),
    expiresAt:
      closeType.code === CLOSE_TYPE_DEADLINE
        ? timestamp(raw["expiration-timestamp"])
        : null,
    closeType: closeType.name,
    active: num(raw.active) === 1,
  };
}

function errorOf(body: Json): { code: number; message: string } | null {
  const source = isObject(body.result) ? body.result : body;
  if (source.code === undefined || source.jobs !== undefined) return null;
  const code = num(source.code);
  return code > 0
    ? { code, message: text(source.message) || "사람인 오류" }
    : null;
}

export function parseSaraminResponse(body: unknown): ParseResult {
  if (!isObject(body))
    return { ok: false, code: null, message: "응답이 JSON 객체가 아닙니다" };
  const error = errorOf(body);
  if (error) return { ok: false, ...error };

  const jobs = body.jobs;
  if (!isObject(jobs))
    return { ok: false, code: null, message: "알 수 없는 응답 형식" };

  const rawList = Array.isArray(jobs.job)
    ? jobs.job
    : jobs.job === undefined
      ? []
      : [jobs.job];
  const postings: JobPosting[] = [];
  for (const raw of rawList) {
    const posting = toPosting(raw);
    if (posting) postings.push(posting);
  }
  return {
    ok: true,
    total: num(jobs.total),
    postings,
    skipped: rawList.length - postings.length,
  };
}
