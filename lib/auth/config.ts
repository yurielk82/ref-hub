/**
 * 공고 모음 로그인 상수. 로그인은 공용 Supabase(sb.dvsharp.com)의 Google 로그인을 거친다.
 * Google에는 sb 콜백만 등록돼 있고, ref로 돌아오는 주소는 Supabase 허용 목록(ADDITIONAL_REDIRECT_URLS)에
 * CALLBACK_PATH를 정확히 넣어 둔다. 참고 구현: erp-spec lib/auth.
 */
export const PRODUCTION_ORIGIN = "https://ref.dvsharp.com";
export const LOGIN_PATH = "/login";
export const JOBS_PATH = "/jobs";
export const CALLBACK_PATH = "/auth/callback";
export const CODE_VERIFIER_SUFFIX = "-code-verifier";
/** 로그아웃(POST) 뒤 GET으로 이동 */
export const SEE_OTHER = 303;
