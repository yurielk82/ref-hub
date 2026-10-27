# 공통 모듈 목록

`python3 -m bin.shared_modules_catalog write <repo>`(워크스페이스 루트에서)가 생성한다. 손으로 고치지 않는다.
새 helper·여러 화면 공통 동작을 만들기 전에 여기서 먼저 찾는다([topic:workspace/reuse]).
대상 공통 층(`.shared-modules.json`): `lib`

### `lib/auth/allowlist.ts`

- `parseAllowlist`
- `isAllowedUser` — 공용 로그인 서버는 여러 앱 회원(이메일로 누구나 가입하는 앱 포함)이 함께 쓴다.
- `isOAuthSession` — 이번 세션이 Google(OAuth)로 받은 것인가.

### `lib/auth/config.ts`

- `PRODUCTION_ORIGIN` — 공고 모음 로그인 상수.
- `HOME_PATH`
- `LOGIN_PATH`
- `JOBS_PATH`
- `CALLBACK_PATH`
- `CODE_VERIFIER_SUFFIX`
- `SEE_OTHER` — 로그아웃(POST) 뒤 GET으로 이동
- `AUTH_REQUEST_TIMEOUT_MS` — 로그인 서버 호출 시간 제한.

### `lib/auth/cookies.ts`

- `hardenAuthCookie` — Supabase 인증 쿠키 속성 강화(ASVS 5.0 V3.3).

### `lib/auth/origin.ts`

- `publicOrigin` — 돌아올 주소를 만들 공개 출처.
- `isSameOriginRequest` — 상태를 바꾸는 요청이 우리 화면에서 왔는가(OWASP CSRF 치트시트: Origin, 없으면 Sec-Fetch-Site)
- `loginErrorUrl` — 로그인 화면에 오류를 띄워 돌려보낼 주소

### `lib/auth/supabase-server.ts`

- `supabaseEnv` — 공용 Supabase 주소와 공개(anon) 키.
- `createSupabaseServer` — 페이지·라우트 핸들러용 클라이언트(세션은 쿠키)
- `refreshSession` — proxy.ts에서 세션을 갱신한다.

### `lib/jobs/board.ts`

- `CLOSING_SOON_DAYS` — 마감까지 이 날수 이하이면 '마감 임박'이다
- `kstDaysUntil` — 마감일까지 남은 날 — 한국 날짜 기준.
- `toBoardItems` — 화면에 올릴 공고 — 마감이 지났거나 사람인에서 마감 처리된 공고는 뺀다.

### `lib/jobs/fit.ts`

- `scoreFit`

### `lib/jobs/queries.ts`

- `SEARCH_QUERIES` — 매일 수집하는 조건.
- `PUBLISHED_LOOKBACK_DAYS` — 등록일 하한 — 하루 한 번 수집이 하루쯤 빠져도 놓치지 않게 3일을 겹쳐 받는다
- `MAX_PAGES_PER_QUERY` — 조건마다 최대 몇 쪽(쪽당 110건)까지 받는가 — 3조건 × 3쪽 = 하루 최대 9회(한도 500회)

### `lib/jobs/saramin.ts`

- `SARAMIN_ENDPOINT`
- `SARAMIN_MAX_COUNT`
- `buildSearchParams`
- `parseSaraminResponse`

### `lib/jobs/store-file.ts`

- `STORE_FILE` — 공고 저장 파일.
- `jobsDataDir`
- `readStore`
- `writeStore` — 임시 파일에 쓴 뒤 이름을 바꿔, 읽는 쪽이 반쯤 쓴 파일을 보지 않게 한다.

### `lib/jobs/store.ts`

- `emptyStore`
- `mergeCollection` — 한 번의 수집 결과를 저장본에 합친다.
- `recordFailure` — 수집이 실패해도 이미 모은 공고는 그대로 두고 실패만 남긴다.

### `lib/jobs/types.ts`

- `DAY_MS` — 하루(밀리초) — 수집 기간·정리 기준·마감 계산이 함께 쓴다.

### `lib/sentry-tunnel.ts`

- `resolveTunnelTarget`

### `lib/utils.ts`

- `cn`
