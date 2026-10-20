# ref-hub

AX 포트폴리오 + 프로젝트 레퍼런스 사이트(ref.dvsharp.com, 공개). 랜딩(`/`)은 포트폴리오(`data/projects.ts`, `data/ax.ts`), 하위 경로는 프로젝트별 Nextra 매뉴얼이다. 정적 사이트라 DB·인증이 없다.

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
