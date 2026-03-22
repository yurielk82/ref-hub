# Rule Audit Report — ref-hub

| 항목 | 값 |
|------|-----|
| **프로젝트** | ref-hub (프로젝트 통합 레퍼런스 사이트) |
| **감사일** | 2026-03-23 |
| **브랜치** | `rule-audit/20260323` |
| **감사 범위** | ref-hub 자체 소스 (repos/ 서브모듈 제외) |
| **대상 파일** | 11개 (TS/TSX 4, MJS 2, MDX content _meta.tsx 7) |
| **대상 줄수** | 269줄 |

## 가중 종합 점수: **100.0 / 100** (수정 후)

## Phase 1: 규칙 소스

| 소스 | 위치 |
|------|------|
| 워크스페이스 CLAUDE.md | `/home/ubuntu/GitHub/CLAUDE.md` |
| 글로벌 규칙 | `~/.claude/rules/*.md` (12개 파일) |
| 프로젝트 CLAUDE.md | `/home/ubuntu/GitHub/ref-hub/CLAUDE.md` |
| 프로젝트 로컬 규칙 | 없음 (`.claude/rules/` 미존재) |
| tsconfig.json | `strict: true`, `noEmit: true` |
| ESLint | 미설치 |
| Prettier | 미설치 |
| package.json scripts | `sync`, `dev`, `build`, `start` |

## Phase 2: 카테고리별 정량 측정

| 카테고리 | 가중치 | 점수 | 위반/대상 | 비고 |
|---------|--------|------|-----------|------|
| TYPE_SAFETY | 20% | 100 | 0/5 | tsc 0 errors, any 0건, strict: true |
| CODE_QUALITY | 15% | 100 | 0/5 | 빈 catch 0, 최대 파일 71줄, 중첩 ≤2 |
| SECURITY | 15% | 100 | 0/3 | 하드코딩 IP/URL 수정 완료 |
| ARCHITECTURE | 10% | 100 | 0/3 | 서버 컴포넌트 기본, 순환 의존 없음 |
| NAMING | 10% | 100 | 0/11 | kebab-case/camelCase/UPPER_SNAKE 준수 |
| GIT | 10% | 100 | 0/20 | conventional commit + 한국어 100% |
| STYLE | 5% | N/A | — | ESLint/Prettier 미설치 (정적 문서 사이트) |
| TEST | 5% | N/A | — | 테스트 없음 (정적 문서 사이트) |
| DOCS | 5% | 100 | 0/1 | CLAUDE.md 완비 |
| PERFORMANCE | 5% | 100 | 0/1 | SSG 73페이지, DB/API 없음 |

> STYLE, TEST는 정적 문서 사이트 특성상 N/A. 가중치는 유효 카테고리에 재분배.

## Phase 3: 자동 수정 (3건)

| # | 커밋 | 카테고리 | 수정 내용 |
|---|------|---------|----------|
| 1 | `fdd4574` | SECURITY | `next.config.mjs` CSP frame-ancestors 하드코딩 IP/URL(`103.218.158.157`, `localhost`, `kpis-dsr-api.vercel.app`) → 환경변수 `EMBED_ORIGIN_*`로 분리. `.env.example` 생성 |
| 2 | `1faea96` | TYPE_SAFETY | `mdx-components.tsx` 파라미터 `Record<string, unknown>` → Nextra 공식 `MDXComponents` 타입 적용 |
| 3 | `513bb5f` | NAMING | `ev-motor-reliability/_meta.tsx` 사이드바 타이틀 '사용자 매뉴얼/운영자 매뉴얼' → '사용자 가이드/운영자 가이드'로 통일 |

## Phase 4: 허점 보완

| 항목 | 현재 상태 | 권장 |
|------|----------|------|
| ESLint | 미설치 | 정적 문서 사이트로 현재 불필요. 커스텀 컴포넌트 추가 시 도입 권장 |
| Prettier | 미설치 | 동일 |
| 테스트 | 없음 | `sync-docs.mjs` 스크립트에 대한 단위 테스트 권장 (우선도 낮음) |
| Vercel 환경변수 | 미설정 | `.env.example` 기준으로 Vercel 프로젝트에 `EMBED_ORIGIN_*` 환경변수 설정 필요 |

## Phase 5: 스코어카드

`/home/ubuntu/GitHub/ref-hub/.claude/scorecard.json` 생성 완료.

## Phase 6: 재검증

| 검증 항목 | 결과 |
|----------|------|
| `tsc --noEmit` | PASS (0 errors) |
| `npm run build` | PASS (73 pages SSG) |
| ESLint | N/A (미설치) |
| Prettier | N/A (미설치) |
| 테스트 | N/A (미설치) |

## MANUAL_REQUIRED

없음.

## 결론

ref-hub는 소규모 정적 문서 사이트(269줄)로, 규칙 준수 상태가 양호합니다. 발견된 3건의 위반을 모두 자동 수정했으며, 수정 후 TypeScript 타입체크 + 빌드 모두 통과합니다. 주요 수정은 보안 규칙(하드코딩 IP/URL 환경변수 분리)이며, 나머지는 타입 정밀도와 네이밍 일관성 개선입니다.
