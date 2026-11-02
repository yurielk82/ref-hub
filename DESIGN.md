---
name: ref-hub 선택 포트폴리오
description: 제약 영업 운영과 업무 개선 사례를 프로젝트별 입체 장면과 실제 화면으로 보여 주는 채용 포트폴리오
colors:
  paper: "#ffffff"
  ink: "#171717"
  stage: "#fafafa"
  muted-ink: "#626262"
  line: "#e3e3e3"
  wash: "#f3f3f3"
  accent: "#c04466"
  dark-paper: "#151319"
  dark-stage: "#110f15"
  dark-ink: "#e7e5eb"
  dark-line: "#2c2830"
  dark-accent: "#e36986"
typography:
  display:
    fontFamily: "Pretendard"
    fontSize: "clamp(30px, min(3.8vw, 7vh), 60px)"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Pretendard"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  navigation:
    fontFamily: "Pretendard"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.4
  numeric-label:
    fontFamily: "Geist Mono"
    fontSize: "11px"
    fontWeight: 600
rounded:
  small: "7px"
  selection: "10px"
  evidence: "14px"
  dialog: "18px"
  pill: "999px"
spacing:
  small: "8px"
  medium: "16px"
  large: "24px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "9px 22px"
    height: "48px"
  evidence-frame:
    rounded: "{rounded.evidence}"
---

## Overview

[jihyun-el/portfolio-template](https://github.com/jihyun-el/portfolio-template)의 원본 `44cfd52a992c6e49b1547a30d49a0201cb10b728`을 바탕으로 한다. 왼쪽 소개·프로젝트 탐색, 오른쪽 한 사례의 장면, 프로젝트와 기능 목차를 한 왼쪽 탐색 안에서 보여 준다. 사용자의 최신 요청에 따라 Apple 가이드를 참고해 각진 조작부와 강한 경계를 둥근 버튼·옅은 선택·얇은 선으로 정돈했다. 화면의 기준은 `components/selected-portfolio/`이며 기존 Magic Portfolio 기준을 사용하지 않는다. 로그인·문구 편집·이력서·공고도 현재 홈페이지 안에서 처리한다. 매뉴얼과 /docs는 기존 루트를 유지한다.

개인 소개 다음 KPI.와 실제 만든 결과물을 보여 준다. KPI.는 제약 영업 운영 플랫폼으로 정의하고, SFE·S&OP·KPIS·유통재고를 같은 계열의 기능·연계 사례로 구분한다. 공개 항목 11개를 독립 제품 11개로 세지 않는다.

## Colors

색의 원본은 `data/selected-portfolio/theme.json`이다. 밝은 화면은 백색 종이·회색 무대·짙은 잉크·장미색 강조를, 어두운 화면은 보랏빛 중립 바탕과 밝은 잉크를 사용한다. 새 고정색을 CSS에 중복하지 않는다. 종이와 장부의 물성은 두 테마에서 밝은 종이·어두운 잉크로 유지하며 `lib/selected-portfolio/theme.ts`가 같은 테마 자료의 밝은 팔레트에서 재료색을 생성한다.

## Typography

Pretendard를 본문과 한글 제목에 사용하고 숫자·짧은 영문 라벨에 Geist Mono를 제한한다. 프로젝트 제목은 750, 탐색 항목은 700으로 위계를 둔다. 긴 본문은 최대 72ch로 제한한다. 이름·날짜·번호를 제목 위에 반복해 붙이지 않고 필요한 상태와 기간은 설명·하단 정보·상세에서 보존한다.

## Layout

데스크톱은 한 왼쪽 탐색과 본문을 사용한다. 프로젝트 이름은 표지 링크, 별도 펼침 버튼은 이동 없이 목차를 여닫는다. 상세 진입 시 해당 프로젝트의 목차만 자동으로 열리고 다른 프로젝트를 선택하면 이전 목차는 접힌다. 이름 중심의 간결한 목록과 현재 절 표시를 사용하고 같은 목차를 별도 두 번째 레일에 복제하지 않는다. 목록·본문 이동은 유지하면서 막대는 숨긴다.

900px 이하에서는 작은 고정 상단의 탐색 버튼으로 프로젝트와 목차를 열고, 선택 뒤 본문으로 돌아간다. 키보드로 열고 닫기·현재 항목 이동이 가능해야 한다. 화면을 줄였다는 이유로 기능 목차 자체를 없애지 않는다. 복잡한 다중 레일의 스크롤 접힘 계산 대신 상세의 고정 머리글·독립 본문 스크롤을 사용한다.

표지는 1100px 초과에서 제목·설명과 의미 있는 입체 그림을 나란히 놓고 패딩을 포함한 최대 폭을 1312px로 제한한다. 1100px 이하에서는 세로로 쌓는다. 상세 머리글·본문·하단의 최대 폭은 1120px다. 제목·설명·그림은 하나의 실제 상세 링크이며 외부 사이트·저장소 링크는 그 밖에 둔다. 긴 본문은 읽기 폭을 제한하고 실제 캡처는 더 넓게 보여 준다. 낮은 창에서도 그림 때문에 주요 조작부가 가려지지 않아야 한다.

로그인한 허용 오너에게만 홈페이지 위에 문구 편집·이력서·제출 파일·공고·로그아웃 상단바를 표시한다. 로그아웃하면 상단바를 숨긴다. 공개 메뉴에는 관리 항목을 넣지 않고 왼쪽 탐색 하단에 작은 로그인 링크 하나만 둔다. 별도 보기 화면이나 홈페이지 보기 버튼을 만들지 않는다. 문구 편집은 현재 표시된 텍스트 자리를 입력란으로 바꾸고, 이력서·공고·로그인은 탐색을 유지한 오른쪽 본문에서 연다. 관리 본문만 Tailwind 유틸리티와 범위가 정해진 스타일을 사용한다. 기존 서버 인증·저장·제출 고정 주소를 보존하며 두 공개 트랙은 메뉴로 서로 연결하지 않는다.

소개·이력은 소개와 현재 경력을 나란히 배치하고, 아래에 주요 업무 네 묶음과 일하는 방식 세 가지를 둔다. 각 업무는 실제 사례로 연결한다. 기술은 이름·용도·사용 사례를 한 행에서 읽게 하고, 글과 기록은 실제 공개 문서의 제목·설명·분류·링크를 보여 준다. 같은 크기 카드나 빈 메뉴로 내용을 대신하지 않는다.

## Elevation & Depth

표지는 실제 캡처 대신 각 업무의 사건을 담은 SVG 입체 장면이다. 문서·장부·도넛·관계도·접근 경계·검사·비교 시험대의 면·옆면·겹침을 사용한다. 행·곡선·조각은 설명용이며 실측값이나 실제 구성 개수를 주장하지 않는다. 캡처는 상세의 설명 바로 아래에서 확대한다.

그림자와 강조는 재료와 사건을 보조한다. 의미 없는 반복 회전과 전면 발광을 덧붙이지 않는다. 오너 메뉴의 떠 있는 면만 낮은 확산 그림자를 쓴다.

## Shapes

선택 항목은 10px, 작은 조작은 7px, 캡처는 14px, 확대 창은 18px, 주 행동·돌아가기는 캡슐형이다. 프로젝트 목록 상단의 굵은 경계선과 반전된 큰 선택 블록을 사용하지 않는다. 화면을 같은 카드 목록으로 다시 구성하지 않는다.

## Components

- `Portfolio`: 소개 우선 진입·한 사례 장면·탐색과 오너 슬롯.
- `ProjectScene`·`ProjectSceneMark`: 같은 등록부에서 큰 장면과 작은 의미 심볼을 선택한다.
- `ProjectDetail`·`ProjectFamily`: 본문·현재 절 추적·같은 플랫폼의 사례 연결·돌아가기. 목차는 단일 프로젝트 탐색에서 제어한다.
- `ProjectScreens`: 실제 캡처와 설명·공개 자료 조건·확대 창.
- `WorkspacePage`·`OwnerBar`: 서버 권한 확인 뒤 선택한 관리 본문과 오너 상단바만 제공한다.
- `InlineEditingProvider`·`EditableCopy`: 현재 문구의 편집·임시 보관·충돌 확인·저장을 담당한다.
- `ProfilePage`: 소개·현재 경력·주요 업무·기술별 사용 사례와 실제 공개 기록을 표시한다.

동작은 정렬·선택·검사처럼 설명에 필요한 부분의 짧은 단발로 제한한다. 움직임 줄이기에서는 완성된 정지 상태를 보여 준다. 공개 자료와 오너의 개인 서류를 섞지 않는다.

## Do's and Don'ts

- 확인된 업무 문제·직접 한 일·결과를 같은 사례에서 연결한다.
- S&OP의 업무 미적용 개인 시제품, 유통재고의 준비 중, 종료한 프로젝트 상태를 보존한다.
- 프로젝트와 무관한 네 가지 견본을 순환 배정하지 않는다.
- 원본 확보·검사 통과·배포 승인을 사용자 미감 수락으로 바꾸지 않는다.
- 실제 Google 로그인·오너 저장 클릭은 수행한 경우에만 완료라고 쓴다.
