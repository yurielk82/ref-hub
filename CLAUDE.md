# Role

AX 포트폴리오 + 프로젝트 통합 레퍼런스 사이트. 랜딩(`/`)은 쇼케이스 포트폴리오(`data/projects.ts` — 8개 카드 + `data/ax.ts`), 하위 경로는 프로젝트별 Nextra 매뉴얼(문서셋 7개: csoweb · kpis-dsr-api · studiogo · pharmkpi · ev-motor-reliability · corerx · edi-verification). ref.dvsharp.com 공개 서빙.

# Stack

- 언어: TypeScript
- 프레임워크: Next.js 15 + Nextra v4 (App Router, MDX 중심)
- DB: 없음 (정적 사이트)
- 문서 수집: Git submodule (`repos/*/docs/manual/`) + `scripts/sync-docs.mjs` → `content/*/` 복사
- 호스팅: systemd standalone (`github-ref-hub.service`, Next.js standalone, 포트 3007) + Nginx (ref.dvsharp.com)
- 인증: 없음 (공개)

# Entry Points

| 명령                                                | 용도                                |
| --------------------------------------------------- | ----------------------------------- |
| `npm run dev`                                       | 로컬 개발 (predev가 sync 자동 실행) |
| `npm run sync`                                      | submodule docs 동기화               |
| `git submodule update --remote && npm run sync`     | 최신 문서 가져오기 + 동기화         |
| `cd /home/ubuntu/GitHub && ./bin/deploy.sh ref-hub` | 프로덕션 배포                       |

Health URL: http://127.0.0.1:3007/
systemd 유닛: `github-ref-hub.service` (target `github-ref-hub.target`). 관리: `./bin/pmx logs ref-hub`, `./bin/pmx restart ref-hub`

# Conventions

- MDX 문서 중심 — 일반 React 컴포넌트 분리 불필요
- 파일 구조·콘텐츠 스타일·\_meta.tsx 관리 등 문서 작성 규칙: @.claude/rules/docs-style.md
- Tailwind 직접 사용 없음 (Nextra 테마가 스타일 제공)
- 문서 수정 흐름(submodule 프로젝트): 각 프로젝트 리포의 `docs/manual/` 수정·커밋·푸시 → 포털에서 `git submodule update --remote repos/<project>` → `npm run sync` → 커밋·푸시 → 배포
- 직접 관리(submodule 아님): `content/pharmkpi/`·`content/corerx/`·`content/edi-verification/` 는 포털 리포에서 직접 편집 (private/내부)

# Overrides

- design-constraints(Tailwind): 미적용 — Nextra 테마가 스타일링 담당
- code-principles(컴포넌트 분리): 미적용 — MDX 문서 중심

# Domain

- 사이트 구성: 랜딩(`/`) = AX 포트폴리오, 하위 경로 = 프로젝트별 Nextra 매뉴얼
- 포트폴리오 레이어:
  - `data/projects.ts` — 쇼케이스 카드 8개 (csoweb · pharmkpi · kpis-dsr-api · studiogo · ev-motor-reliability + 외부 erp-spec · srt · claude-dotfiles). csoweb 카드는 edi-verification을 featuredModule로 노출
  - `data/ax.ts`·`data/experience.ts` — AX 역량·이력 데이터
  - `app/(portfolio)/` — 랜딩·프로젝트 상세(`projects/[slug]`)·ax 페이지
- 문서(매뉴얼) 레이어:
  - `repos/` — 4개 Git submodule (csoweb, kpis-dsr-api, studiogo, ev-motor-reliability)
  - `scripts/sync-docs.mjs` — submodule `docs/manual/` → `content/{csoweb,kpis-dsr-api,studiogo,ev-motor-reliability}/` 복사
  - `content/{pharmkpi,corerx,edi-verification}/` — 포털 리포 직접 관리 (submodule 아님)
  - `content/_meta.tsx` — 매뉴얼 사이드바 네비게이션 (포털 리포 관리). `content/index.mdx`는 없음 — 랜딩은 포트폴리오가 대체
  - `content/*` 는 git 추적 (Vercel 빌드용, sync는 빌드 전 로컬 갱신) — `.gitignore` 의 content 항목은 주석 처리됨
  - `app/(docs)/` — 매뉴얼 라우팅 (Nextra catch-all), `app/layout.tsx` — 루트 레이아웃 (Nextra 테마)
  - `public/images/{project}/`, `public/images/portfolio/{project}/` — 스크린샷·다이어그램

## 트러블슈팅

<!-- 반복 장애 발생 시 1줄씩 추가: 증상 → 원인 → 해결책 -->

<!-- AUTO-HISTORY:START -->

_자동 생성 — `.claude/scripts/sync-claude-md.sh`. 수동 편집 금지 (append-only 로 .claude/SESSION_LOG.md 가 원본)._

## 최근 세션 히스토리

_세션 로그 미생성 — 첫 커밋 후 자동 초기화._

원본: `.claude/SESSION_LOG.md` (append-only)

<!-- AUTO-HISTORY:END -->
