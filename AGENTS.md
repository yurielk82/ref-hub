# ref-hub

포트폴리오 + 프로젝트 레퍼런스 사이트(ref.dvsharp.com, 공개). 포트폴리오는 두 트랙이다. `/`는 제약사 영업관리 지원용, `/ax`는 업무 자동화·AX 직무용이며 같은 사실(`data/work-history.ts`·`data/ax-cases/`)을 다른 관점으로 보여 준다. 메뉴는 트랙마다 따로 두고(`components/portfolio/nav.tsx`), 서로 링크하지 않는다. 하위 경로는 프로젝트별 Nextra 매뉴얼이다. DB는 없다.

- 공고 모음(`/jobs`)과 이력서(`/resume`)만 로그인 전용이다. 공용 Supabase(`sb.dvsharp.com`)의 Google 로그인을 거쳐 허용 목록(`JOBS_ALLOWED_EMAILS`) 계정만 들어오고, 서버가 페이지마다 다시 확인한다(`auth.ts`, `app/auth/`, `proxy.ts`). Google 콘솔은 건드리지 않고 Supabase 허용 주소에 `/auth/callback`만 둔다. 공고는 하루 한 번 사람인에서 받아 저장소 밖 파일에 둔다. API 키가 있으면 API, 없으면 공개 검색 화면을 읽는다(`scripts/collect-jobs.ts`, `lib/jobs/`). 이력서는 사람인·잡코리아에 칸별로 붙여 넣는 원본이며(사이트마다 칸이 달라 버전을 따로 쌓는다, `?p=jobkorea`), 개인 정보라 버전별 JSON 파일로 저장소 밖에만 둔다(`lib/resume/`, 저장은 새 버전으로만). 사람인 '파일로 이력서 만들기'용으로 버전마다 이력서·경력기술서·자기소개서 DOCX를 내려받는다(`/resume/download`, `lib/resume/document.ts`). 서버 설정·비밀 파일은 `ops/systemd/README.md`.

## 문서 흐름

- csoweb·kpis-dsr-api·ev-motor-reliability 매뉴얼은 각 저장소의 `docs/manual/`이 원본이다. 그 저장소에서 고친 뒤 여기서 `git submodule update --remote repos/<project>` → `npm run sync`(`scripts/sync-docs.mjs`가 `content/<project>/`로 복사)한다.
- `content/pharmkpi/`·`content/corerx/`·`content/edi-verification/`은 이 저장소에서 직접 편집한다.
- 탐색 항목을 바꾸면 같은 폴더의 `_meta.tsx`도 함께 고친다. studiogo는 숨김이다(submodule만 보존).
- 포트폴리오 사례 문구의 원본은 `data/work-history.ts`다. 해당 저장소(README·`docs/plans`·git log)와 `~/GitHub/wiki`에서 날짜·커밋 근거가 있는 사실만 쓰고 현재 운영 상태(운영·중지·이관)를 함께 적는다. 거래처명·직원 이름·금액은 싣지 않는다.

## 빌드 함정

- 확인용 빌드는 `WORKSPACE_VERIFY_BUILD=1`로 돌려 `.next-verify`에 쓴다. 이 변수가 빠지면 운영 `.next`를 덮어 `.next/standalone`이 지워지고 사이트 CSS·JS가 500이 된다(2026-10-07 사고). 빌드 전후로 운영 `.next/BUILD_ID` 시각을 비교한다.
- 빌드는 `package.json` `build`처럼 `--disable-wasm-trap-handler`와 `--max-old-space-size=4096`을 유지한다. 빼면 `WebAssembly.Instance(): Out of memory`가 난다.
- 원본은 없는 `/_next/static/*` 요청에 1년 캐시가 붙은 404를 낸다(Nextra catch-all이 받음). 배포 중 옛 청크 404가 Cloudflare에 1년 캐시된 사고(2026-08-30) 뒤로 `next.config.mjs`의 `deploymentId`가 자산 URL에 `?dpl=`을 붙인다. 404 TTL 자체는 Nginx/Cloudflare 소관이라 바꾸려면 별도 승인이 필요하다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Agent skills

### Issue tracker

GitHub 이슈(`gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

기본 다섯 라벨(`needs-triage`·`needs-info`·`ready-for-agent`·`ready-for-human`·`wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

단일 맥락(`GLOSSARY.md` + `docs/adr/`). See `docs/agents/domain.md`.
