# yurie-docs — 프로젝트 통합 레퍼런스 사이트

## 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **스택** | Next.js 15 + Nextra v4 (App Router) + TypeScript |
| **DB** | 없음 (정적 사이트) |
| **호스팅** | Vercel |
| **인증** | 없음 (공개 문서) |

## 도메인 컨텍스트

4개 프로젝트(csoweb, KPIS-DSR-API, StudioGo, ev-motor-reliability)의 사용자/운영자 매뉴얼을 통합 관리하는 문서 사이트.

## 프로젝트 구조

- `content/` — MDX 문서 파일 (Nextra가 자동 라우팅)
- `content/_meta.tsx` — 전체 네비게이션 구조
- `content/{project}/` — 프로젝트별 섹션
- `app/layout.tsx` — 루트 레이아웃 (Nextra 테마 설정)
- `public/images/` — 스크린샷, 다이어그램

## 컨벤션

- 모든 문서는 한국어로 작성
- `_meta.tsx`에서 `MetaRecord` 타입 사용
- 각 프로젝트: `index.mdx` (소개) + `user-guide/` + `admin-guide/` 구조
- 이미지: `public/images/{project}/` 경로에 저장

## 전역 규칙 오버라이드

- design-constraints: Tailwind 직접 사용 없음 (Nextra 테마가 스타일 제공)
- code-principles: 컴포넌트 분리 불필요 (MDX 문서 중심)
