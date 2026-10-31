import type { JobExperience, JobPosting, SearchQuery } from "./types.ts";

/**
 * 사람인 웹 검색 화면 수집 경계. 사람인 API 키 발급이 늦어(2026-10-31 오너 결정) 키가 없을 때는 공개 검색 화면을 읽는다.
 * robots.txt(2026-10-31 확인)는 검색 화면(/zf_user/search)을 막지 않고 공고 상세(recruit_view)·회원 화면을 막는다.
 * 그래서 목록에 보이는 값만 읽고 상세 화면은 열지 않는다(연봉은 목록에 없어 비운다).
 * 조건 변수는 API와 같은 SearchQuery를 쓴다: ind_cd → ind_cd, job_cd → cat_kewd, keywords → 낱말마다 searchword 한 번.
 */

export const SARAMIN_SEARCH_URL =
  "https://www.saramin.co.kr/zf_user/search/recruit";
export const SARAMIN_WEB_PAGE_SIZE = 100;

const ORIGIN = "https://www.saramin.co.kr";
const INDUSTRY_NAMES: Record<string, string> = { "703": "제약·보건·바이오" };
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function buildWebSearches(query: SearchQuery): URLSearchParams[] {
  const base = new URLSearchParams({
    searchType: "search",
    recruitSort: "reg_dt",
    recruitPageCount: String(SARAMIN_WEB_PAGE_SIZE),
  });
  if (query.params.ind_cd) base.set("ind_cd", query.params.ind_cd);
  if (query.params.job_cd) base.set("cat_kewd", query.params.job_cd);
  const words = (query.params.keywords ?? "")
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);
  if (words.length === 0) return [base];
  return words.map((word) => {
    const params = new URLSearchParams(base);
    params.set("searchword", word);
    return params;
  });
}

export interface WebParseResult {
  total: number;
  postings: JobPosting[];
  skipped: number;
}

export function parseSaraminSearchHtml(
  html: string,
  query: SearchQuery,
  now: Date,
): WebParseResult {
  const total = Number(
    (html.match(/class="cnt_result">\s*총\s*([\d,]+)/)?.[1] ?? "0").replaceAll(
      ",",
      "",
    ),
  );
  const postings: JobPosting[] = [];
  let skipped = 0;
  for (const block of html.split('<div class="item_recruit"').slice(1)) {
    const posting = toPosting(block, query, now);
    if (posting) postings.push(posting);
    else skipped += 1;
  }
  return { total, postings, skipped };
}

function toPosting(
  block: string,
  query: SearchQuery,
  now: Date,
): JobPosting | null {
  const id = block.match(/^\s*value="(\d+)"/)?.[1];
  const title = decode(
    block.match(/class="job_tit">\s*<a[^>]*\btitle="([^"]*)"/)?.[1] ?? "",
  );
  if (!id || !title) return null;

  const corp = block.match(
    /class="corp_name">\s*<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/,
  );
  const spans = [
    ...(between(block, 'class="job_condition">', "</div>") ?? "").matchAll(
      /<span>([\s\S]*?)<\/span>/g,
    ),
  ].map((match) => clean(match[1]));
  const sector = between(block, 'class="job_sector">', "</div>") ?? "";
  const jobs = [...sector.matchAll(/cat_kewd=(\d+)"[^>]*>([^<]+)</g)];
  const dateText = clean(block.match(/class="date">([^<]*)</)?.[1] ?? "");
  const deadline = parseDeadline(dateText, now);
  const industryCode = query.params.ind_cd ?? "";

  return {
    id,
    url: `${ORIGIN}/zf_user/jobs/relay/view?rec_idx=${id}`,
    title,
    company: corp ? clean(corp[2]) : "",
    companyUrl: corp ? absolute(decode(corp[1])) : null,
    location: spans[0] ?? "",
    jobType: spans.find(isJobType) ?? "",
    industryCode,
    industry: INDUSTRY_NAMES[industryCode] ?? "",
    jobCodes: jobs.map((match) => match[1]),
    jobNames: jobs.map((match) => decode(match[2]).trim()).join(", "),
    experience: parseExperience(spans.find(isExperience) ?? ""),
    education: spans.find(isEducation) ?? "",
    salary: "",
    keywords: jobs.map((match) => decode(match[2]).trim()),
    postedAt: parsePosted(sector),
    expiresAt: deadline.at,
    closeType: deadline.label,
    active: true,
  };
}

const isExperience = (text: string) => /신입|경력/.test(text);
const isEducation = (text: string) =>
  /학력무관|고졸|초대졸|대졸|석사|박사/.test(text);
const isJobType = (text: string) =>
  /정규직|계약직|인턴|파견직|프리랜서|아르바이트|위촉직|교육생/.test(text);

/** 사람인 코드에 맞춘다 — 1 신입, 2 경력, 3 신입·경력, 0 경력무관 */
function parseExperience(label: string): JobExperience {
  const range = label.match(/(\d+)\s*~\s*(\d+)\s*년/);
  const atLeast = label.match(/(\d+)\s*년\s*↑/);
  const atMost = label.match(/(\d+)\s*년\s*↓/);
  const code = label.includes("경력무관")
    ? 0
    : label.includes("신입") && label.includes("경력")
      ? 3
      : label.includes("신입")
        ? 1
        : label.includes("경력")
          ? 2
          : 0;
  return {
    code,
    min: Number(range?.[1] ?? atLeast?.[1] ?? 0),
    max: Number(range?.[2] ?? atMost?.[1] ?? 0),
    label,
  };
}

/** "등록일 26/10/31"·"수정일 26/10/31" → 그날 0시(KST) */
function parsePosted(sector: string): string | null {
  const match = sector.match(/(?:등록일|수정일)\s*(\d{2})\/(\d{2})\/(\d{2})/);
  if (!match) return null;
  return kstMidnight(
    2000 + Number(match[1]),
    Number(match[2]),
    Number(match[3]),
  ).toISOString();
}

/** "~ 11/30(월)"은 그날 23:59:59(KST), "오늘마감"·"내일마감"도 날짜로 바꾼다. 상시·수시·채용시는 마감 시각이 없다. */
function parseDeadline(
  text: string,
  now: Date,
): { at: string | null; label: string } {
  const today = new Date(now.getTime() + KST_OFFSET_MS);
  const md = text.match(/(\d{1,2})\/(\d{1,2})/);
  let day: Date | null = null;
  if (md) {
    day = kstMidnight(today.getUTCFullYear(), Number(md[1]), Number(md[2]));
    // 지난 날짜로 보이면 해를 넘긴 마감이다(목록에는 진행 중인 공고만 나온다)
    if (day.getTime() < now.getTime() - 30 * DAY_MS)
      day = kstMidnight(
        today.getUTCFullYear() + 1,
        Number(md[1]),
        Number(md[2]),
      );
  } else if (text.includes("오늘마감")) {
    day = kstMidnight(
      today.getUTCFullYear(),
      today.getUTCMonth() + 1,
      today.getUTCDate(),
    );
  } else if (text.includes("내일마감")) {
    day = new Date(
      kstMidnight(
        today.getUTCFullYear(),
        today.getUTCMonth() + 1,
        today.getUTCDate(),
      ).getTime() + DAY_MS,
    );
  }
  if (!day) return { at: null, label: text };
  return {
    at: new Date(day.getTime() + DAY_MS - 1000).toISOString(),
    label: "접수마감일",
  };
}

function kstMidnight(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day) - KST_OFFSET_MS);
}

function between(text: string, start: string, end: string): string | null {
  const from = text.indexOf(start);
  if (from < 0) return null;
  const to = text.indexOf(end, from + start.length);
  return text.slice(from + start.length, to < 0 ? undefined : to);
}

function absolute(href: string): string | null {
  if (!href) return null;
  if (href.startsWith("/")) return `${ORIGIN}${href}`;
  return href.startsWith("https://") ? href : null;
}

function clean(html: string): string {
  return decode(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function decode(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&");
}
