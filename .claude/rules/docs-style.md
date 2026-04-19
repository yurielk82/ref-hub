---
description: MDX 문서 작성·파일 구조·_meta.tsx 관리 규칙
paths:
  - "content/**/*.mdx"
  - "content/**/_meta.tsx"
  - "app/**/*.mdx"
---

# Docs Style Rules

ref-hub Nextra 포털의 MDX 문서·네비게이션 메타 작성 규칙.

## 파일 구조

- 새 프로젝트 추가: 해당 프로젝트 리포에 `docs/manual/` 생성 → submodule 추가
- 구조: `docs/manual/index.mdx` + `user-guide/` + `admin-guide/` + 각 디렉토리에 `_meta.tsx`
- 파일명: kebab-case (`getting-started.mdx`)
- 프론트매터 미사용 — Nextra가 `_meta.tsx`로 타이틀·순서 관리

## 콘텐츠 스타일

- 모든 문서는 한국어로 작성
- `#` h1: 페이지당 1개 (첫 줄)
- `##` h2: 주요 섹션, `###` h3: 세부 항목
- UI 요소(버튼명·메뉴명): **굵게** 표기
- 기술 약어: 첫 언급 시 풀네임 병기 — 예: "KPIS (의약품관리종합정보센터)"
- 주의/팁: `> **주의**: 텍스트` 형식
- 내부 링크: 절대 경로 — `/csoweb/user-guide/dashboard`
- 이미지: `public/images/{project}/` 경로, `![설명](/images/{project}/파일명.png)`

## 문서 유형별 템플릿

### 프로젝트 소개 (`index.mdx`)

1. `#` 제목
2. 한줄 설명
3. 개요 테이블 (스택, DB, 호스팅 등)
4. 도메인 설명
5. 주요 기능 목록
6. 매뉴얼 링크 (사용자 가이드, 운영자 가이드)

### 사용자 가이드

1. `#` 제목
2. 한줄 설명 (이 페이지에서 다루는 내용)
3. 단계별 절차 (번호 목록)
4. UI 요소 테이블 (버튼/필드명 | 설명)
5. 다음 단계 링크

### 운영자 가이드

1. `#` 제목
2. 기술 설명
3. 설정/환경변수 테이블
4. 코드 블록 (명령어, 설정 예시)
5. 주의사항 (`> **주의**` 블록)

## _meta.tsx 관리

- `_meta.tsx`는 `MetaRecord` 타입, 한국어 타이틀
- 새 문서 추가 시 해당 디렉토리의 `_meta.tsx`에 항목 추가 필수
- 루트 `_meta.tsx`에 새 프로젝트 추가 시 `type: 'page'` 명시
- 순서: 객체 키 순서가 사이드바 순서
