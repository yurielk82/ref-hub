import test from "node:test";
import assert from "node:assert/strict";

import { scoreFit } from "../../lib/jobs/fit.ts";

function posting(overrides = {}) {
  return {
    id: "1",
    url: "https://www.saramin.co.kr/x",
    title: "영업 담당자 채용",
    company: "회사",
    companyUrl: null,
    location: "서울",
    jobType: "정규직",
    industryCode: "301",
    industry: "솔루션",
    jobCodes: [],
    jobNames: "",
    experience: { code: 2, min: 3, max: 10, label: "경력 3~10년" },
    education: "대학교졸업(4년)",
    salary: "회사내규에 따름",
    keywords: [],
    postedAt: "2026-10-26T00:00:00.000Z",
    expiresAt: null,
    closeType: "상시",
    active: true,
    ...overrides,
  };
}

test("제약·바이오 업종의 영업관리 직무는 높음이다", () => {
  const fit = scoreFit(posting({ industryCode: "703", jobCodes: ["699"] }));
  assert.equal(fit.level, "high");
  assert.deepEqual(fit.reasons, ["영업관리 직무", "제약·바이오 업종"]);
});

test("업무 키워드는 공고명·키워드에서 찾고 3개까지만 더한다", () => {
  const fit = scoreFit(
    posting({
      title: "SFE 담당 (S&OP·KPI)",
      keywords: ["데이터분석", "엑셀", "유통"],
      jobCodes: ["700"],
    }),
  );
  assert.equal(fit.score, 2 + 3);
  assert.equal(
    fit.reasons.filter((r) => r.startsWith("업무 키워드")).length,
    1,
  );
  assert.match(fit.reasons.join(" "), /SFE/);
});

test("업종이 달라도 공고에 제약·의약품이 나오면 1점을 더한다", () => {
  const fit = scoreFit(posting({ company: "○○약품", jobCodes: ["2208"] }));
  assert.equal(fit.score, 2 + 1);
  assert.equal(fit.level, "medium");
  assert.ok(fit.reasons.includes("제약·의약품 관련"));
});

test("신입만 뽑는 공고는 2점을 뺀다", () => {
  const fit = scoreFit(
    posting({
      industryCode: "703",
      jobCodes: ["699"],
      experience: { code: 1, min: 0, max: 0, label: "신입" },
    }),
  );
  assert.equal(fit.score, 3 + 2 - 2);
  assert.equal(fit.level, "medium");
  assert.ok(fit.reasons.includes("신입 대상"));
});

test("관련 신호가 없으면 낮음이고 이유가 비어 있다", () => {
  const fit = scoreFit(posting());
  assert.deepEqual(fit, { level: "low", score: 0, reasons: [] });
});

test("세부 업종 코드(703으로 시작)도 제약·바이오로 본다", () => {
  assert.ok(
    scoreFit(posting({ industryCode: "70301" })).reasons.includes(
      "제약·바이오 업종",
    ),
  );
  assert.ok(
    !scoreFit(posting({ industryCode: "1703" })).reasons.includes(
      "제약·바이오 업종",
    ),
  );
});
