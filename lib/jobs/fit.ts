import type { FitLevel, FitResult, JobPosting } from "./types.ts";

/**
 * 지원 적합도 — 제약사 영업관리 지원(ref-hub 포트폴리오 목표)에 얼마나 가까운 공고인지 나눈다.
 * 점수는 정렬·걸러보기용 첫 기준이며, 근거(reasons)를 화면에 함께 보여 준다.
 * 직무 코드는 사람인 코드표5(영업·판매·무역), 업종 코드는 코드표3(703 제약·보건·바이오) 기준.
 */

const JOB_POINTS: Readonly<Record<string, { label: string; points: number }>> =
  {
    "699": { label: "영업관리 직무", points: 3 },
    "2208": { label: "영업기획 직무", points: 2 },
    "700": { label: "영업지원 직무", points: 2 },
  };

const PHARMA_INDUSTRY_PREFIX = "703";
const PHARMA_INDUSTRY_POINTS = 2;
const PHARMA_TEXT = ["제약", "의약품", "약품", "바이오"];
const PHARMA_TEXT_POINTS = 1;

/** 포트폴리오의 강점(영업 분석·SFE·S&OP·유통재고·엑셀 업무 개선)과 겹치는 말 */
const FOCUS_KEYWORDS = [
  "SFE",
  "S&OP",
  "영업분석",
  "KPI",
  "데이터",
  "엑셀",
  "유통",
  "재고",
  "채권",
  "수요예측",
];
const FOCUS_POINTS_MAX = 3;

const NEWCOMER_ONLY_CODE = 1;
const NEWCOMER_PENALTY = 2;

const HIGH_SCORE = 5;
const MEDIUM_SCORE = 3;

function levelOf(score: number): FitLevel {
  if (score >= HIGH_SCORE) return "high";
  if (score >= MEDIUM_SCORE) return "medium";
  return "low";
}

export function scoreFit(posting: JobPosting): FitResult {
  const reasons: string[] = [];
  let score = 0;

  const job = posting.jobCodes
    .map((code) => JOB_POINTS[code])
    .filter((entry) => entry !== undefined)
    .sort((a, b) => b.points - a.points)[0];
  if (job) {
    score += job.points;
    reasons.push(job.label);
  }

  const haystack = [
    posting.title,
    posting.company,
    posting.jobNames,
    ...posting.keywords,
  ]
    .join(" ")
    .toLowerCase();

  if (posting.industryCode.startsWith(PHARMA_INDUSTRY_PREFIX)) {
    score += PHARMA_INDUSTRY_POINTS;
    reasons.push("제약·바이오 업종");
  } else if (PHARMA_TEXT.some((word) => haystack.includes(word))) {
    score += PHARMA_TEXT_POINTS;
    reasons.push("제약·의약품 관련");
  }

  const focus = FOCUS_KEYWORDS.filter((word) =>
    haystack.includes(word.toLowerCase()),
  );
  if (focus.length > 0) {
    score += Math.min(focus.length, FOCUS_POINTS_MAX);
    reasons.push(`업무 키워드: ${focus.join("·")}`);
  }

  if (posting.experience.code === NEWCOMER_ONLY_CODE) {
    score -= NEWCOMER_PENALTY;
    reasons.push("신입 대상");
  }

  return { level: levelOf(score), score, reasons };
}
