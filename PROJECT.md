<!-- HISTORY:TEMPLATE:START -->

## 최초 목적

여러 프로젝트(csoweb, KPIS-DSR-API, ev-motor-reliability 등)의 사용자·운영자 매뉴얼을 한 포털에 모아 공개 서빙하는 Nextra v4 기반 레퍼런스 문서 사이트로 시작. 프로젝트별 분산 문서를 Git submodule로 끌어와 통합 UX 제공.

## 초기 기능

- Nextra v4 MDX 기반 문서 사이트 스캐폴딩 (Next.js 15 App Router)
- 4개 프로젝트 24페이지 매뉴얼 작성 (사용자 가이드 + 운영자 가이드)
- Git submodule 기반 문서 동기화 (`scripts/sync-docs.mjs` — submodule `docs/manual/` → `content/*/` 복사)
- embed 모드(`?embed=true`): iframe 내 네비/사이드바/푸터 숨김 헤더 허용
- `_meta.tsx` 기반 사이드바 타이틀·순서 관리

## 추가된 기능

- 2026-03: Codegear Dev Portal 리브랜딩 → `ref-hub` 전체 리네이밍 (v0.3.0)  # WHY: 포털 독립 정체성 확보
- 2026-03: ev-motor-reliability·CoreRx는 private 리포이므로 submodule 제외, 포털 리포에서 직접 관리  # WHY: private 접근 제약 우회
- 2026-03: Union KPI → PharmKPI 프로젝트명 통일(v0.3.1)  # WHY: 외부 브랜드 변경 반영
- 2026-03: 규칙 준수율 감사 + `.claude/scorecard.json` 생성  # WHY: 문서 품질 자가 측정
- 2026-04: 포트폴리오 사이트로 전환 — 랜딩 + 프로젝트 상세 + 스크린샷(v1.0.0)  # WHY: 단순 매뉴얼 포털에서 개인 포트폴리오·브랜드 사이트로 범위 확장
- 2026-04: About 페이지 + Stitch 디자인 기반 프로젝트 상세 리디자인(v1.2.0)  # WHY: 방문자에게 개인 브랜드·경력 서사 전달
- 2026-04: ERP Spec 프로젝트 추가(785개 테이블 명세 + React Flow 관계 시각화)  # WHY: ERP 리버스 엔지니어링 결과물 공개
- 2026-04: Vercel → PM2 + Nginx 마이그레이션 + 히어로 제거(v1.4.0)  # WHY: OCI 자체 호스팅 전환으로 Vercel 무료 티어 제약 회피
- 2026-04: PM2 namespace `ref-hub` + pmx 명령 통합  # WHY: 워크스페이스 공통 배포 표준 정렬

## 현재 수행

Nextra 기반 통합 문서 포털이면서 동시에 개인 포트폴리오 + 프로젝트 소개 랜딩. 3개 프로젝트(csoweb, KPIS-DSR-API, StudioGo)는 submodule 동기화, 2개(ev-motor-reliability, CoreRx)는 포털 리포에서 직접 편집. 최근 3개월은 포트폴리오 전환과 호스팅 마이그레이션이 중심.

<!-- HISTORY:TEMPLATE:END -->

<!-- 자유 영역: 팀/외부 의존/부채/마이그레이션 이력 -->

## 팀·스테이크홀더

- 운영·편집: 단독 개발자(yurielk82)
- 독자: 각 프로젝트 사용자/운영자 + 포트폴리오 방문자

## 외부 의존

- Nextra v4 + Next.js 15 (App Router, MDX)
- Git submodule (`repos/csoweb`, `repos/kpis-dsr-api`, `repos/studiogo`)
- Nginx (ref.dvsharp.com) + PM2 (포트 3007, namespace `ref-hub`)
- Vercel에서 PM2로 이관 완료 (2026-04)

## 알려진 부채

- Nextra v4 테마 제약으로 커스텀 컴포넌트 분리 어려움 — MDX 문서 중심 운영
- submodule 버전 드리프트 관리 수동 (`git submodule update --remote` 주기 미정)
- 포트폴리오 범위와 매뉴얼 범위가 한 사이트에 혼재 — 장기적으로 분리 고려 여지
