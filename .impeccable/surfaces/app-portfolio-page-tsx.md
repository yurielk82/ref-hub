---
version: 1
slug: "app-portfolio-page-tsx"
primary_target: "app/(showcase)/page.tsx"
related_targets:
  ["app/(showcase)/ax/page.tsx", "components/selected-portfolio/portfolio.tsx", "components/selected-portfolio/profile-pages.tsx", "components/selected-portfolio/project-detail.tsx"]
---

# 업무 개선의 역할과 결과가 먼저 보이는 포트폴리오

Mode: Experience(home), Read(case).

2026-11-13 사용자가 Ryan Schmidt의 실제 포트폴리오 구성을 선택하고 전체 적용·배포를 승인했다. 예전 녹색 시안이나 왼쪽 탐색·입체 표지를 이 방향의 제약으로 되살리지 않는다.

THESIS: 실무에서 발견한 문제와 직접 내린 판단·구현·검증을 역할·결과와 실제 화면으로 보여 준다.
OWN-WORLD: 미색 바탕·짙은 잉크·적갈색 강조, 가로 탐색, 중앙1160px 문서, 큰 한국어 제목, 실제 캡처 2열 사례 목록.
STORY: 직무와 소개→세 대표 업무 변화→KPI·공급내역보고·경영진 보고→나머지 공개 사례→소개·경력·기술·기록. 상세는 역할·결과→대표 화면→과정과 전체 화면→사용 기술·관련 사례다.
FIRST VIEWPORT: 짧은 직무·업무 개선 제목과 구체적인 소개를 읽고 대표 업무 변화에서 사례로 바로 갈 수 있다. AX도 텍스트 소개 뒤 실제 대표 화면 목록으로 이어진다.
FORM: 기존 사실·편집 키와 실제 캡처를 사용하며 저자 코드·사진·브랜드·성과는 복사하지 않는다. 과도한 애니메이션·생성 차트·챗봇·방문 추적을 추가하지 않는다.
FINISH: 독립 리뷰와 운영 PC·모바일 렌더 확인, 실제 사례 주소·절 공유·키보드 본문 이동·확대·관리 경계 검수를 완료 조건으로 둔다.

## 사용자 제약

- 두 트랙 분리, KPI와 하위 기능 관계, 공개11사례와 숨김4개, 기존 모든 캡처를 보존한다.
- 운영·시제품·준비·종료 상태와 공개용 예시 고지를 보존한다.
- 기존 편집·초안·서버 revision·저장·인증·이력서·공고·제출 공유·매뉴얼을 연결한다.
- 제품 개발 서버는 병합 전에 띄우지 않는다. 정적 검사·관련 기존 시험→독립 검토→병합→중앙 배포→운영 렌더 확인 순서다.
