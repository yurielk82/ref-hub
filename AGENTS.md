# 역할

AX 포트폴리오 + 프로젝트 통합 레퍼런스 사이트. 랜딩(`/`)은 쇼케이스 포트폴리오(`data/projects.ts` 카드 + `data/ax.ts`), 하위 경로는 프로젝트별 Nextra 매뉴얼(csoweb · kpis-dsr-api · pharmkpi · ev-motor-reliability · corerx · edi-verification). studiogo는 숨김(카드·문서·nav 제거, repos submodule만 보존). ref.dvsharp.com 공개 서빙.

# 기술 구성

- 언어: TypeScript
- 프레임워크: Next.js 15 + Nextra v4 (App Router, MDX 중심)
- 데이터베이스(DB): 없음 (정적 사이트)
- 문서 수집: Git submodule (`repos/*/docs/manual/`) + `scripts/sync-docs.mjs` → `content/*/` 복사
- 호스팅: systemd standalone (`github-ref-hub.service`, Next.js standalone, 포트 3007) + Nginx (ref.dvsharp.com)
- 인증: 없음 (공개)

# 진입점

| 명령                                                | 용도                                |
| --------------------------------------------------- | ----------------------------------- |
| `npm run dev`                                       | 로컬 개발 (predev가 sync 자동 실행) |
| `npm run sync`                                      | submodule docs 동기화               |
| `git submodule update --remote && npm run sync`     | 최신 문서 가져오기 + 동기화         |

Health URL: http://127.0.0.1:3007/
배포: 워크스페이스 배포 규칙(`/home/ubuntu/GitHub/.claude/rules/deploy.md`)
systemd 유닛: `github-ref-hub.service` (target `github-ref-hub.target`). 관리: `./bin/pmx logs ref-hub`, `./bin/pmx restart ref-hub`

# 관례

- MDX 문서 중심 — 일반 React 컴포넌트 분리 불필요
- 문서는 기존 MDX의 파일 구조·문체를 따르고, 탐색 항목을 바꿀 때 같은 디렉터리의 `_meta.tsx`도 함께 검증한다.
- Tailwind 직접 사용 없음 (Nextra 테마가 스타일 제공)
- 문서 수정 흐름(submodule 프로젝트): 각 프로젝트 리포의 `docs/manual/` 수정·커밋·푸시 → 포털에서 `git submodule update --remote repos/<project>` → `npm run sync` → 커밋·푸시 → 배포
- 직접 관리(submodule 아님): `content/pharmkpi/`·`content/corerx/`·`content/edi-verification/` 는 포털 리포에서 직접 편집 (private/내부)

# 예외

- design-constraints(Tailwind): 미적용 — Nextra 테마가 스타일링 담당
- code-principles(컴포넌트 분리): 미적용 — MDX 문서 중심

# 도메인

- 사이트 구성: 랜딩(`/`) = AX 포트폴리오, 하위 경로 = 프로젝트별 Nextra 매뉴얼
- 포트폴리오 레이어:
  - `data/projects.ts` — 쇼케이스 카드 (pharmkpi · sales-strategy-portal · pharmkpi-exec · csoweb · kpis-dsr-api · ev-motor-reliability · erp-spec · srt · team-pulse · naver-place-collector · apinfy-lab · claude-dotfiles · har-eval; studiogo는 숨김). csoweb 카드는 edi-verification을 featuredModule로 노출
  - `data/ax.ts`·`data/experience.ts` — AX 역량·이력 데이터
  - `app/(portfolio)/` — 랜딩·프로젝트 상세(`projects/[slug]`)·ax 페이지
- 문서(매뉴얼) 레이어:
  - `repos/` — Git submodule (csoweb, kpis-dsr-api, ev-motor-reliability; studiogo submodule은 보존하되 sync 목록에서 제외)
  - `scripts/sync-docs.mjs` — submodule `docs/manual/` → `content/{csoweb,kpis-dsr-api,ev-motor-reliability}/` 복사
  - `content/{pharmkpi,corerx,edi-verification}/` — 포털 리포 직접 관리 (submodule 아님)
  - `content/_meta.tsx` — 매뉴얼 사이드바 네비게이션 (포털 리포 관리). `content/index.mdx`는 없음 — 랜딩은 포트폴리오가 대체
  - `content/*` 는 git 추적 (Vercel 빌드용, sync는 빌드 전 로컬 갱신) — `.gitignore` 의 content 항목은 주석 처리됨
  - `app/(docs)/` — 매뉴얼 라우팅 (Nextra catch-all), `app/layout.tsx` — 루트 레이아웃 (Nextra 테마)
  - `public/images/{project}/`, `public/images/portfolio/{project}/` — 스크린샷·다이어그램

## 트러블슈팅

<!-- 반복 장애 발생 시 1줄씩 추가: 증상 → 원인 → 해결책 -->

## 고유 주의사항

- 원본은 존재하지 않는 `/_next/static/*` 요청에도 `Cache-Control: s-maxage=31536000`(1년)이 붙은 404를 낸다(2026-10-13 `curl`로 재확인). 정적 자산 요청이 Nextra catch-all `app/(docs)/[...mdxPath]`로 흘러 프리렌더된 404 셸이 나가기 때문이다. 배포 도중 새 HTML이 옛 서버가 못 주는 청크를 참조하면 Cloudflare가 그 404를 1년 캐시한다(2026-08-30 사고). `next.config.mjs`의 `deploymentId`(`NEXT_DEPLOYMENT_ID`, 없으면 빌드 시점 git 짧은 해시)가 자산 URL에 `?dpl=`을 붙여 오염된 URL을 다시 참조하지 않게 한다. 404 응답 자체의 1년 TTL은 Nginx/Cloudflare 계층 소관이라 그대로이고 바꾸려면 별도 승인이 필요하다. `app/not-found.tsx`+`force-dynamic`은 시도했으나 자산 404가 catch-all에서 나와 효과가 없었다.
- 검증 빌드는 `.next-verify`에 쓰도록 `WORKSPACE_VERIFY_BUILD=1`로 돌리고 `NODE_OPTIONS`에 `--disable-wasm-trap-handler --max-old-space-size=4096`을 유지한다(`package.json` `build`와 동일, 빼면 `WebAssembly.Instance(): Out of memory`). 이 빌드는 `tsconfig.json`의 include를 바꾸므로 끝난 뒤 원복한다. `bin/batch`는 `WORKSPACE_*`·`WIKI_ROOT`·`NODE_OPTIONS`만 넘기고 이름에 TOKEN·SECRET·KEY·PASSWORD·CREDENTIAL이 든 변수는 넘기지 않는다(`bin/batch:29-32`). 그 밖의 변수는 `bin/batch env VAR=값 <명령>`으로 넣는다. 변수가 빠지면 빌드가 운영 `.next`를 덮어 `.next/standalone`이 지워지고 ref.dvsharp.com의 CSS·JS가 500이 된다(2026-10-07, `~/GitHub/incidents/0007-ref-hub-verify-build-overwrote-prod-2026-10-07.md`). 격리 빌드 전후로 운영 `.next/BUILD_ID` 시각을 비교한다. 복구는 `bin/deploy-main ref-hub`(운영 배포라 승인 필요)뿐이다. `timeout`은 대기열 대기 시간을 포함하므로 빌드·관문에는 5400초처럼 넉넉히 준다.
- 포트폴리오 사례 문구의 업무 서사 원본은 `data/work-history.ts`다. 문구를 쓰거나 고치기 전에 해당 저장소(README·`docs/plans`·git log)와 `/home/ubuntu/GitHub/wiki`를 실측해 날짜·커밋 근거가 있는 사실만 쓰고, 현재 운영 상태(운영·중지·이관)를 함께 적는다. 거래처명·직원 이름·금액은 싣지 않는다.

# ref-hub Codex 어댑터

- 이 저장소 `AGENTS.md`의 공통 프로젝트 규칙을 적용한다.
