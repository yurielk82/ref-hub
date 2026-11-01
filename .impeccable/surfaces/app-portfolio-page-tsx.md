---
version: 1
slug: "app-portfolio-page-tsx"
primary_target: "app/(portfolio)/page.tsx"
related_targets:
  ["app/(portfolio)/ax/page.tsx", "components/portfolio/project-detail.tsx"]
---

# 해결 과정 먼저 — 포트폴리오 홈과 사례

Mode: Experience(home), Read(case). 2026-11-01 사용자가 새 세 시안 중 해결 과정 먼저를 명시 선택했다. 승인 comp: .impeccable/mocks/story-approved.png. 이전 백색 지면 방향은 이번 선택으로 교체한다.

## Direction contract

THESIS: 다른 두 회사의 기준을 협의하고 지표와 시스템으로 구현한 경험을 실제 작업과 연결한다. 큰 소개와 경력만 보이던 첫 화면을 바꾼다.
OWN-WORLD: 짙은 녹색 첫 화면과 메뉴, 백색 본문, 연노랑 핵심 조작. 한국어 고딕의 굵은 두 줄 제목과 실제 BI 화면이 중심이다. 개인 작업·관리 기능은 본문의 읽기 흐름과 구분한다.
STORY: 업무 파악→기준 합의→직접 구현→검증·운영을 먼저 읽고 원장 대조와 보고서 사례로 확인한다. 전체 작업 목록→사례 본문 안 기능 설명과 실제 화면→선택적 확대. 기능만 보려고 한 페이지 더 들어가지 않는다.
FIRST VIEWPORT: 1536×1024 comp 기준 높이76px 메뉴. x50~710의 제목·설명·두 버튼, x742~1496 y90~580의 BI. 아래 y575~750 네 단계, y785부터 두 근거 영역. 실제 캡처 비율을 보존한다. 모바일은 메뉴→소개→BI→네 단계→근거 순서다.
FORM: 사용자 선택 해결 과정 먼저, seed:5a985c2e52ee8b55. 시그니처는 같은 본문에서 실제 화면을 확대하고 원래 위치로 돌아오는 기존 동작이다. 가짜 차트와 생성 이미지의 문구는 제품 사실로 복사하지 않는다.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## 구현·검증 계약

- 기존 편집 키·저장값, 두 트랙 경계, 인증·고정 공유 URL 보존.
- 원본 팩트는 work-history와 사례 등록부. 사용자가 이번 대화에서 밝힌 회생·업무 지식 공백·양사 공통 기준 협의를 반영하며 전사 PMI 총괄·새 절감률을 주장하지 않는다.
- 사용자 공통 개발 기준에 따라 제품 개발 서버는 병합 전에 띄우지 않는다. 정적 검사·관련 기존 시험→독립 코드 리뷰→PR 병합→중앙 배포→운영 PC/모바일 검수 순서. Impeccable의 선행 렌더링 게이트보다 이 사용자 실행 순서가 우선한다. 형식적인 게이트 통과를 만들지 않는다.
