# Role

프로젝트 통합 레퍼런스 문서 사이트. 6개 프로젝트(csoweb, KPIS-DSR-API, pharmkpi, StudioGo, ev-motor-reliability, CoreRx)의 사용자/운영자 매뉴얼을 Nextra로 통합 제공. ref.dvsharp.com 공개 서빙.

# Stack

- 언어: TypeScript
- 프레임워크: Next.js 15 + Nextra v4 (App Router, MDX 중심)
- DB: 없음 (정적 사이트)
- 문서 수집: Git submodule (`repos/*/docs/manual/`) + `scripts/sync-docs.mjs` → `content/*/` 복사
- 호스팅: PM2 standalone (포트 3007) + Nginx (ref.dvsharp.com)
- 인증: 없음 (공개)

# Entry Points

| 명령 | 용도 |
|---|---|
| `npm run dev` | 로컬 개발 (predev가 sync 자동 실행) |
| `npm run sync` | submodule docs 동기화 |
| `git submodule update --remote && npm run sync` | 최신 문서 가져오기 + 동기화 |
| `cd /home/ubuntu/GitHub && ./bin/deploy.sh ref-hub` | 프로덕션 배포 |

Health URL: http://127.0.0.1:3007/
PM2 namespace: `ref-hub`. 관리: `./bin/pmx logs ref-hub`, `./bin/pmx restart ref-hub`

# Conventions

- MDX 문서 중심 — 일반 React 컴포넌트 분리 불필요
- 파일 구조·콘텐츠 스타일·_meta.tsx 관리 등 문서 작성 규칙: @.claude/rules/docs-style.md
- Tailwind 직접 사용 없음 (Nextra 테마가 스타일 제공)
- 문서 수정 흐름: 각 프로젝트 리포의 `docs/manual/` 수정·커밋·푸시 → 포털에서 `git submodule update --remote repos/<project>` → 커밋·푸시 → 배포
- ev-motor-reliability·CoreRx는 private 리포 — 포털 리포에서 `content/ev-motor-reliability/`·`content/corerx/` 직접 관리 (submodule 아님)

# Overrides

- design-constraints(Tailwind): 미적용 — Nextra 테마가 스타일링 담당
- code-principles(컴포넌트 분리): 미적용 — MDX 문서 중심

# Domain

- 프로젝트 구조:
  - `repos/` — 3개 프로젝트 Git submodule (csoweb, kpis-dsr-api, studiogo)
  - `scripts/sync-docs.mjs` — submodule `docs/manual/` → `content/*/` 복사
  - `content/index.mdx`, `content/_meta.tsx` — 포털 홈/네비게이션 (포털 리포 관리)
  - `content/{csoweb,kpis-dsr-api,studiogo}/` — submodule에서 동기화 (`.gitignore` 대상)
  - `content/ev-motor-reliability/`, `content/corerx/` — 포털 리포에서 직접 관리 (private)
  - `app/layout.tsx` — 루트 레이아웃 (Nextra 테마 설정)
  - `public/images/{project}/` — 스크린샷·다이어그램

## 트러블슈팅

<!-- 반복 장애 발생 시 1줄씩 추가: 증상 → 원인 → 해결책 -->

<!-- AUTO-HISTORY:START -->
_자동 생성 — `.claude/scripts/sync-claude-md.sh`. 수동 편집 금지 (append-only 로 .claude/SESSION_LOG.md 가 원본)._

## 최근 세션 히스토리

_세션 로그 미생성 — 첫 커밋 후 자동 초기화._

원본: `.claude/SESSION_LOG.md` (append-only)
<!-- AUTO-HISTORY:END -->
