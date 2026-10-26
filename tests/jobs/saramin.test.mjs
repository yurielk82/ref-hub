import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  buildSearchParams,
  parseSaraminResponse,
} from "../../lib/jobs/saramin.ts";

// 사람인 공식 가이드(/guide/job-search)의 JSON 응답 예시 원문(2026-10-27 받음).
const SAMPLE = JSON.parse(
  readFileSync(
    path.join(import.meta.dirname, "fixtures", "saramin-sample.json"),
    "utf8",
  ),
);

test("공식 응답 예시의 공고를 화면용 형태로 바꾼다", () => {
  const result = parseSaraminResponse(SAMPLE);
  assert.equal(result.ok, true);
  assert.equal(result.total, 7629);
  assert.equal(result.postings.length, 2);

  const [first, second] = result.postings;
  assert.equal(first.id, "27614114");
  assert.equal(first.company, "(주)사람인");
  assert.equal(
    first.title,
    "(주)사람인 사무보조·문서작성 경력 채용합니다11212",
  );
  assert.equal(first.industryCode, "301");
  assert.deepEqual(first.jobCodes, ["2323"]);
  assert.deepEqual(first.experience, {
    code: 2,
    min: 2,
    max: 3,
    label: "경력 2~3년",
  });
  assert.deepEqual(first.keywords, [
    "SI·시스템통합",
    "Excel·도표",
    "PowerPoint",
    "전산입력·편집",
  ]);
  assert.equal(first.location, "서울 > 관악구,서울 > 광진구,서울 > 구로구");
  assert.equal(first.postedAt, new Date(1559191564 * 1000).toISOString());
  // 접수마감일(close-type 1)만 마감 시각을 둔다.
  assert.equal(first.expiresAt, new Date(1561820399 * 1000).toISOString());
  assert.equal(first.closeType, "접수마감일");
  assert.equal(first.active, true);

  // 직무 코드가 없는 공고도 버리지 않는다.
  assert.equal(second.id, "27614112");
  assert.deepEqual(second.jobCodes, []);
  assert.equal(second.experience.code, 1);
});

test("공고 주소는 https로 바꾼다", () => {
  const [first] = parseSaraminResponse(SAMPLE).postings;
  assert.match(first.url, /^https:\/\/www\.saramin\.co\.kr\//);
  assert.match(first.companyUrl ?? "", /^https:\/\/www\.saramin\.co\.kr\//);
});

test("http(s)가 아닌 공고 주소는 버리고 회사 주소는 비운다", () => {
  const job = structuredClone(SAMPLE.jobs.job[0]);
  job.company.detail.href = "javascript:alert(1)";
  const ok = parseSaraminResponse({
    jobs: { count: 1, start: 0, total: "1", job: [job] },
  });
  assert.equal(ok.postings[0].companyUrl, null);

  job.url = "javascript:alert(1)";
  const dropped = parseSaraminResponse({
    jobs: { count: 1, start: 0, total: "1", job: [job] },
  });
  assert.equal(dropped.postings.length, 0);
  assert.equal(dropped.skipped, 1);
});

test("상시·수시 공고는 마감 시각을 비우고 마감 방식만 남긴다", () => {
  const job = structuredClone(SAMPLE.jobs.job[0]);
  job["close-type"] = { code: "3", name: "상시" };
  const [posting] = parseSaraminResponse({
    jobs: { count: 1, start: 0, total: "1", job: [job] },
  }).postings;
  assert.equal(posting.expiresAt, null);
  assert.equal(posting.closeType, "상시");
});

test("id나 제목이 없는 항목은 건너뛰고 나머지는 살린다", () => {
  const broken = { ...SAMPLE.jobs.job[0], id: "" };
  const result = parseSaraminResponse({
    jobs: { count: 2, start: 0, total: "2", job: [broken, SAMPLE.jobs.job[1]] },
  });
  assert.equal(result.ok, true);
  assert.deepEqual(
    result.postings.map((p) => p.id),
    ["27614112"],
  );
  assert.equal(result.skipped, 1);
});

test("공고가 하나뿐이면 배열이 아닌 객체로 와도 읽는다", () => {
  const result = parseSaraminResponse({
    jobs: { count: 1, start: 0, total: "1", job: SAMPLE.jobs.job[0] },
  });
  assert.equal(result.postings.length, 1);
});

test("오류 응답은 코드와 메시지를 돌려준다", () => {
  assert.deepEqual(
    parseSaraminResponse({ code: 4, message: "일일 최대 요청 가능 횟수 초과" }),
    {
      ok: false,
      code: 4,
      message: "일일 최대 요청 가능 횟수 초과",
    },
  );
  assert.deepEqual(
    parseSaraminResponse({ result: { code: "2", message: "invalid" } }),
    {
      ok: false,
      code: 2,
      message: "invalid",
    },
  );
});

test("알 수 없는 응답은 성공으로 위장하지 않는다", () => {
  const result = parseSaraminResponse({ hello: "world" });
  assert.equal(result.ok, false);
  assert.equal(result.code, null);
});

test("검색 조건에 공통 값(헤드헌팅 제외·최대 건수·게시일 순·등록 하한)을 붙인다", () => {
  const params = buildSearchParams(
    { id: "q", label: "q", params: { ind_cd: "703", job_cd: "699,2208,700" } },
    {
      accessKey: "KEY",
      publishedMin: new Date("2026-10-24T00:00:00Z"),
      start: 1,
    },
  );
  assert.equal(params.get("access-key"), "KEY");
  assert.equal(params.get("ind_cd"), "703");
  assert.equal(params.get("job_cd"), "699,2208,700");
  assert.equal(params.get("sr"), "directhire");
  assert.equal(params.get("count"), "110");
  assert.equal(params.get("sort"), "pd");
  assert.equal(params.get("start"), "1");
  assert.equal(
    params.get("published_min"),
    String(Date.parse("2026-10-24T00:00:00Z") / 1000),
  );
});
