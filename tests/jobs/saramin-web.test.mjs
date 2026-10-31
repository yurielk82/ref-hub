import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildWebSearches,
  parseSaraminSearchHtml,
} from "../../lib/jobs/saramin-web.ts";

const html = await readFile(
  new URL("./fixtures/saramin-search-sample.html", import.meta.url),
  "utf8",
);
const PHARMA = {
  id: "pharma",
  label: "제약",
  params: { ind_cd: "703", job_cd: "699,2208,700" },
};
// 2026-10-31 10:00 KST
const NOW = new Date("2026-10-31T01:00:00Z");

test("검색 결과 화면의 공고를 저장 형태로 바꾸고 번호 없는 광고는 건너뛴다", () => {
  const result = parseSaraminSearchHtml(html, PHARMA, NOW);
  assert.equal(result.total, 1234);
  assert.equal(result.skipped, 1);
  assert.deepEqual(
    result.postings.map((p) => p.id),
    ["90000001", "90000002", "90000003"],
  );

  const [first] = result.postings;
  assert.equal(first.title, "가나제약 영업관리 & 영업지원 경력 채용");
  assert.equal(
    first.url,
    "https://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=90000001",
  );
  assert.equal(first.company, "(주)가나제약");
  assert.equal(
    first.companyUrl,
    "https://www.saramin.co.kr/zf_user/company-info/view?csn=TESTCSN1",
  );
  assert.equal(first.location, "서울 강남구");
  assert.deepEqual(first.experience, {
    code: 2,
    min: 5,
    max: 15,
    label: "경력 5~15년",
  });
  assert.equal(first.education, "대졸↑");
  assert.equal(first.jobType, "정규직");
  assert.deepEqual(first.jobCodes, ["699", "700"]);
  assert.equal(first.jobNames, "영업관리, 영업지원");
  // 검색 조건의 업종으로 걸렀으므로 업종 코드는 조건에서 가져온다
  assert.equal(first.industryCode, "703");
  assert.equal(first.postedAt, "2026-10-30T15:00:00.000Z");
  assert.equal(first.expiresAt, "2026-11-30T14:59:59.000Z");
  assert.equal(first.closeType, "접수마감일");
  assert.equal(first.active, true);
});

test("상시채용·신입경력·수정일과 해를 넘기는 마감일을 읽는다", () => {
  const [, second, third] = parseSaraminSearchHtml(html, PHARMA, NOW).postings;
  assert.equal(second.expiresAt, null);
  assert.equal(second.closeType, "상시채용");
  assert.equal(second.experience.code, 3);
  assert.equal(second.jobType, "계약직 외");
  assert.equal(second.postedAt, "2026-10-28T15:00:00.000Z");

  assert.equal(third.experience.code, 0);
  // 10월에 본 1월 마감은 다음 해다
  assert.equal(third.expiresAt, "2027-01-05T14:59:59.000Z");
});

test("업종이 없는 조건은 업종 코드를 비우고, 키워드는 낱말마다 검색한다", () => {
  const query = {
    id: "kw",
    label: "키워드",
    params: { job_cd: "699,2208,700", keywords: "제약,의약품" },
  };
  assert.equal(
    parseSaraminSearchHtml(html, query, NOW).postings[0].industryCode,
    "",
  );
  const searches = buildWebSearches(query).map((p) => Object.fromEntries(p));
  assert.deepEqual(
    searches.map((s) => s.searchword),
    ["제약", "의약품"],
  );
  assert.equal(searches[0].cat_kewd, "699,2208,700");
  assert.equal(searches[0].recruitSort, "reg_dt");
  assert.equal(
    searches[0].keywords,
    undefined,
    "API 변수 이름은 보내지 않는다",
  );

  const [only] = buildWebSearches(PHARMA).map((p) => Object.fromEntries(p));
  assert.equal(only.ind_cd, "703");
  assert.equal(only.cat_kewd, "699,2208,700");
  assert.equal(only.searchword, undefined);
});
