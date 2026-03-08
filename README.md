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
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드
```

## 구조

```
content/          # MDX 문서 파일
├── _meta.tsx     # 전체 네비게이션
├── index.mdx     # 홈페이지
├── csoweb/       # CSO Web 매뉴얼
├── kpis-dsr-api/ # KPIS DSR API 매뉴얼
├── studiogo/     # StudioGo 매뉴얼
└── ev-motor-reliability/ # EV Motor 매뉴얼
```

## 스택

- Next.js 15 + Nextra v4 (App Router)
- TypeScript
- Vercel 배포

## 버전

v0.1.0
