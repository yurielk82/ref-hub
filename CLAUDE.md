# ref-hub — 프로젝트 통합 레퍼런스 사이트

| 항목 | 값 |
|------|-----|
| **유형** | 정적 |
| **역할** | 프로젝트 통합 레퍼런스 문서 사이트 |

## 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **스택** | Next.js 15 + Nextra v4 (App Router) + TypeScript |
| **DB** | 없음 (정적 사이트) |
| **호스팅** | PM2 (standalone) + Nginx |
| **도메인** | ref.dvsharp.com |
| **포트** | 3007 |
| **PM2 이름** | ref-hub |
| **인증** | 없음 (공개 문서) |

## 도메인 컨텍스트

6개 프로젝트(csoweb, KPIS-DSR-API, pharmkpi, StudioGo, ev-motor-reliability, CoreRx)의 사용자/운영자 매뉴얼을 통합 관리하는 문서 사이트.

## 프로젝트 구조

- `repos/` — 3개 프로젝트 Git submodule (csoweb, kpis-dsr-api, studiogo)
- `scripts/sync-docs.mjs` — `repos/*/docs/manual/` → `content/*/` 복사 스크립트
- `content/index.mdx`, `content/_meta.tsx` — 포털 홈/네비게이션 (포털 리포 관리)
- `content/{csoweb,kpis-dsr-api,studiogo}/` — submodule에서 동기화된 문서 (.gitignore 대상)
- `content/ev-motor-reliability/` — 포털 리포에서 직접 관리 (private 리포)
- `content/corerx/` — 포털 리포에서 직접 관리 (private 리포)
- `app/layout.tsx` — 루트 레이아웃 (Nextra 테마 설정)
- `public/images/` — 스크린샷, 다이어그램

## 문서 동기화 (Git Submodules)

문서는 각 프로젝트 리포의 `docs/manual/`에서 작성하고, submodule로 포털에 동기화한다. ev-motor-reliability는 private 리포이므로 포털에서 직접 관리.

```bash
# 최신 문서 가져오기 + 동기화
git submodule update --remote && npm run sync

# 로컬 개발 (predev가 sync 자동 실행)
npm run dev
```

- 문서 수정: 프로젝트 리포에서 `docs/manual/` 수정 → 커밋+푸시
- 포털 반영: `git submodule update --remote repos/{project}` → 커밋+푸시
- 배포: `cd /home/ubuntu/GitHub && ./bin/deploy.sh ref-hub` (등록 후 사용 — 현재 `bin/projects.tsv`에 ref-hub 엔트리가 있는지 확인 필요. 없으면 추가해야 함)

## 컨벤션

### 파일 구조

- 새 프로젝트: 해당 프로젝트 리포에 `docs/manual/` 생성 후 submodule 추가
- 구조: `docs/manual/index.mdx` + `user-guide/` + `admin-guide/` + 각 디렉토리에 `_meta.tsx`
- `_meta.tsx`는 `MetaRecord` 타입, 한국어 타이틀
- 파일명: kebab-case (예: `getting-started.mdx`)
- 프론트매터 미사용 (Nextra가 `_meta.tsx`로 타이틀/순서 관리)

### 콘텐츠 스타일

- 모든 문서는 한국어로 작성
- `#` h1: 페이지당 1개 (첫 줄)
- `##` h2: 주요 섹션, `###` h3: 세부 항목
- UI 요소(버튼명, 메뉴명): **굵게** 표기
- 기술 약어: 첫 언급 시 풀네임 병기 (예: "KPIS (의약품관리종합정보센터)")
- 주의/팁: `> **주의**: 텍스트` 형식
- 내부 링크: 절대 경로 (`/csoweb/user-guide/dashboard`)
- 이미지: `public/images/{project}/` 경로, `![설명](/images/{project}/파일명.png)`

### 문서 유형별 템플릿

**프로젝트 소개 (`index.mdx`)**:
1. `#` 제목
2. 한줄 설명
3. 개요 테이블 (스택, DB, 호스팅 등)
4. 도메인 설명
5. 주요 기능 목록
6. 매뉴얼 링크 (사용자 가이드, 운영자 가이드)

**사용자 가이드**:
1. `#` 제목
2. 한줄 설명 (이 페이지에서 다루는 내용)
3. 단계별 절차 (번호 목록)
4. UI 요소 테이블 (버튼/필드명 | 설명)
5. 다음 단계 링크

**운영자 가이드**:
1. `#` 제목
2. 기술 설명
3. 설정/환경변수 테이블
4. 코드 블록 (명령어, 설정 예시)
5. 주의사항 (`> **주의**` 블록)

### _meta.tsx 관리

- 새 문서 추가 시 해당 디렉토리의 `_meta.tsx`에 항목 추가 필수
- 루트 `_meta.tsx`에 새 프로젝트 추가 시 `type: 'page'` 명시
- 순서: `_meta.tsx` 객체 키 순서가 사이드바 순서

## 전역 규칙 오버라이드

- design-constraints: Tailwind 직접 사용 없음 (Nextra 테마가 스타일 제공)
- code-principles: 컴포넌트 분리 불필요 (MDX 문서 중심)

## 트러블슈팅

<!-- 반복 장애 발생 시 1줄씩 추가: 증상 → 원인 → 해결책 -->
