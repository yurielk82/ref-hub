# Yurie Docs

프로젝트 통합 레퍼런스 사이트 — Nextra v4 (App Router)

## 프로젝트

| 프로젝트 | 설명 |
|---------|------|
| CSO Web | 건설안전관리 통합 플랫폼 |
| KPIS DSR API | 일일안전보고서 API |
| StudioGo | 스튜디오 예약 관리 |
| EV Motor Reliability | 전기차 모터 신뢰성 분석 |

## 개발

```bash
git submodule update --init --recursive  # submodule 초기화
npm install
npm run dev     # http://localhost:3000 (predev가 문서 자동 동기화)
npm run build   # 프로덕션 빌드 (prebuild가 문서 자동 동기화)
```

## 구조

```
repos/                  # Git submodule (문서 원본)
├── csoweb/
├── kpis-dsr-api/
├── studiogo/
└── ev-motor-reliability/
scripts/
└── sync-docs.mjs       # repos/*/docs/manual/ → content/*/ 동기화
content/                # MDX 문서 파일 (Nextra 자동 라우팅)
├── _meta.tsx           # 전체 네비게이션
├── index.mdx           # 홈페이지
├── csoweb/             # sync 생성 (.gitignore)
├── kpis-dsr-api/       # sync 생성 (.gitignore)
├── studiogo/           # sync 생성 (.gitignore)
└── ev-motor-reliability/ # sync 생성 (.gitignore)
```

## 문서 동기화

각 프로젝트의 `docs/manual/`에서 문서를 작성하고, submodule로 포털에 동기화합니다.

```bash
# 최신 문서 가져오기
git submodule update --remote
npm run sync

# 특정 프로젝트만 업데이트
git submodule update --remote repos/csoweb
```

## 스택

- Next.js 15 + Nextra v4 (App Router)
- TypeScript
- Vercel 배포

## 버전

v0.2.0
