import type { SearchQuery } from "./types.ts";

/**
 * 매일 수집하는 조건. 사람인 코드표 기준(2026-10-27 확인):
 * - 업종 703 제약·보건·바이오
 * - 직무 699 영업관리, 2208 영업기획, 700 영업지원 (상위 8 영업·판매·무역)
 * SFE·S&OP·영업분석은 직무 코드가 없어 키워드로 찾는다. 한 변수 안의 값은 OR, 변수끼리는 AND다.
 */
export const SEARCH_QUERIES: readonly SearchQuery[] = [
  {
    id: "pharma-sales-admin",
    label: "제약·바이오 업종의 영업관리·영업기획·영업지원",
    params: { ind_cd: "703", job_cd: "699,2208,700" },
  },
  {
    id: "pharma-analytics",
    label: "제약·바이오 업종의 SFE·S&OP·영업분석·수요예측·유통재고",
    params: { ind_cd: "703", keywords: "SFE,S&OP,영업분석,수요예측,유통재고" },
  },
  {
    id: "sales-admin-pharma-keyword",
    label: "다른 업종으로 분류된 제약·의약품 회사의 영업관리·영업기획·영업지원",
    params: { job_cd: "699,2208,700", keywords: "제약,의약품,바이오" },
  },
];

/** 등록일 하한 — 하루 한 번 수집이 하루쯤 빠져도 놓치지 않게 3일을 겹쳐 받는다 */
export const PUBLISHED_LOOKBACK_DAYS = 3;
/** 조건마다 최대 몇 쪽(쪽당 110건)까지 받는가 — 3조건 × 3쪽 = 하루 최대 9회(한도 500회) */
export const MAX_PAGES_PER_QUERY = 3;
