---
version: 1
slug: "app-portfolio-page-tsx"
primary_target: "app/(portfolio)/page.tsx"
related_targets: ["app/(portfolio)/ax/page.tsx","components/portfolio/project-detail.tsx"]
---

# 포트폴리오 홈과 사례

Mode: Experience(home), Read(case). 사용자 선택 시안: 독립 흐름 소스7422d98. 2026-11-01 실제 자료로 계획·구현 진행 승인. 기존 정적 A/B/D comp는 탐색 이력이며 최종 공간 계약은 수정된 클릭 시안이다. 이번 구현은 그 코드 시안을 실제 자료로 확장한다. 새 시안 선택 라운드는 하지 않는다.

## Direction contract

THESIS: 채용 담당자가 이 사람의 역할과 해결한 일을 읽고 같은 사례 안의 화면에서 확인한다. 도구 메뉴·반복 카드가 중심인 구성을 버린다.

OWN-WORLD: 백색 업무 지면, 남색 제목, 청색 조작, 옅은 청색 증거 영역. 각진 윤곽과 여유 있는 행, 굵은 한국어 제목과 짧은 본문. 어두운 테마에서도 같은 위계를 보존한다.

STORY: 홈에서 경력과 강점을 읽고 대표 사례로 이동한다. 문제·내 행동·결과 뒤에 기능의 목적과 실제 캡처를 이어 읽는다. 별도 기능 페이지는 없다. 서류·수동 편집·기존 주소는 보존한다.

FIRST VIEWPORT: 최대1160px 지면. 소개가 왼쪽 약60%, 실제 경력이 오른쪽40%. 소개 아래 대표 사례 버튼. 네 역량 다음 대표 사례 세 개는 텍스트와 넓은 화면이 짝을 이룬 행. 390px에서는 소개→경력→역량→사례 순서로 쌓는다.

FORM: 수정 시안의 인물 중심 소개(D), 사례 서사(B), 같은 본문의 넓은 화면(A)을 한 체계로 연결. 최초 후보3 전시 방향에서 사용자 교정으로 확정. seed: e886c2e399c48ef6. signature interaction: 본문 화면의 선택적 원본 확대, 닫으면 URL·위치·포커스 복귀. 숨김 진입 애니메이션 없음.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Quality bar

수정 시안의 desktop/mobile 홈·사례·확대 6개 캡처를 구조와 읽기 위계 기준으로 사용한다. 실제 문구 길이와 화면 비율에 맞게 늘어나며 숫자·역할·상태를 생략하지 않는다. 대비4.5:1, 주요 조작44px, 전체 가로 넘침 없음, 캡처 무자름, 제목 단계 연속, 편집·고정주소 보존. 물성·장식 재설계는 하지 않는다.
