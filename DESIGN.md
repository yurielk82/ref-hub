---
name: ref-hub 포트폴리오
description: 경력과 문제 해결의 근거를 읽는 백색 업무 지면
colors:
  folio-ink: "#162c4b"
  folio-muted: "#526580"
  folio-line: "#dce4ef"
  folio-paper: "#fff"
  folio-well: "#eef3fb"
  folio-accent: "#2457cb"
  action-hover: "#1644a5"
  dark-ink: "#e6edf8"
  dark-muted: "#adbdd3"
  dark-line: "#35455f"
  dark-paper: "#111e32"
  dark-well: "#1c2d48"
  dark-accent: "#9bbcff"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.35rem)"
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: "-0.035em"
  title:
    fontSize: "1.2rem"
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  lead:
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontSize: "0.95rem"
    fontWeight: 650
    lineHeight: 1.75
rounded:
  control: "3px"
  dialog: "5px"
spacing:
  inline: "8px"
  compact: "12px"
  frame: "16px"
  text: "20px"
  mobile-inset: "22px"
  group: "24px"
  row: "28px"
  panel: "32px"
  wide: "48px"
  mobile-section: "56px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.folio-accent}"
    textColor: "{colors.folio-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    backgroundColor: "{colors.folio-paper}"
    textColor: "{colors.folio-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  button-secondary-hover:
    backgroundColor: "{colors.folio-well}"
  button-expand:
    textColor: "{colors.folio-accent}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  navigation:
    backgroundColor: "{colors.folio-paper}"
    textColor: "{colors.folio-muted}"
    height: "80px"
    padding: "0 32px"
  disclosure:
    textColor: "{colors.folio-ink}"
    padding: "16px 0"
  case-row:
    textColor: "{colors.folio-ink}"
    padding: "26px 0"
  story-panel:
    backgroundColor: "{colors.folio-well}"
    padding: "{spacing.panel}"
  screen-frame:
    backgroundColor: "{colors.folio-well}"
    padding: "{spacing.frame}"
  image-dialog:
    backgroundColor: "{colors.folio-paper}"
    textColor: "{colors.folio-ink}"
    rounded: "{rounded.dialog}"
    padding: "{spacing.text}"
    width: "min(96vw, 1600px)"
---

# Design System: ref-hub 포트폴리오

## Overview

**Creative North Star: "백색 업무 지면"**

백색 업무 지면은 짧은 한국어 설명과 실제 업무 화면을 같은 읽기 흐름으로 묶는다. 남색 제목, 차분한 본문, 얇은 구분선으로 구조를 드러내고 청색은 이동·조작과 핵심 설명에 사용한다. 장식보다 경력과 근거의 가독성을 우선한다.

이 시스템은 공개 포트폴리오의 영업관리·AX 두 트랙과 사례 본문에 적용한다. 두 트랙은 색상·서체·구성 요소를 공유하지만 서로 연결하는 메뉴를 두지 않는다. 매뉴얼과 로그인 전용 편집 화면의 별도 스타일을 이 시스템으로 일반화하지 않는다.

**Key Characteristics:**

- 굵은 한국어 제목과 여유 있는 본문 행간
- 평평한 지면, 얇은 경계선, 옅은 청색 증거 영역
- 자르지 않은 실제 화면과 선택적 원본 확대
- 밝은 테마와 어두운 테마에서 같은 정보 위계

## Colors

밝은 지면의 남색 잉크와 청색 조작을 바탕으로, 어두운 테마에서는 같은 역할을 밝은 잉크와 연청색으로 바꾼다. 정확한 색 값은 앞의 토큰을 따른다.

### Primary

- **조작 청색** (`folio-accent`): 링크, 키보드 초점, 주요 버튼, 짧은 문제 해결 표제에 사용한다.
- **눌림을 예고하는 짙은 청색** (`action-hover`): 주요 버튼의 마우스 올림 상태에 사용한다.
- **어두운 지면의 연청색** (`dark-accent`): 어두운 테마의 링크·초점·표제에 사용한다. 주요 채움 버튼은 두 테마에서 밝은 테마의 청색 배경과 흰 글자를 유지한다.

### Neutral

- **남색 잉크 / 밝은 잉크** (`folio-ink`, `dark-ink`): 제목, 강조 문장, 주요 경계선.
- **설명 잉크** (`folio-muted`, `dark-muted`): 본문, 기간, 현재 상태와 캡션.
- **지면** (`folio-paper`, `dark-paper`): 페이지·고정 메뉴·확대창의 바탕.
- **증거 영역** (`folio-well`, `dark-well`): 문제 해결 설명과 실제 화면을 담는 바탕.
- **구분선** (`folio-line`, `dark-line`): 행, 내비게이션, 이미지 틀의 얇은 경계.

**The 조작의 청색 Rule.** 본문 전체를 강조색으로 칠하지 않는다. 청색은 링크·버튼·초점과 문제 해결 설명의 짧은 표제에 사용한다.

## Typography

**Display Font:** Pretendard Variable, Pretendard와 한국어를 지원하는 sans-serif 대체 글꼴.
**Body Font:** 같은 Pretendard 계열. 전역에서 불러오는 다른 장식 글꼴을 포트폴리오 제목의 기준으로 삼지 않는다.

**Character:** 제목의 굵기와 촘촘한 자간으로 역할을 선명하게 드러낸다. 본문은 긴 행간과 차분한 색상으로 읽는 속도를 유지한다. 별도의 장식용 대문자 표제를 만들지 않는다.

### Hierarchy

- **Display:** 홈의 주제 제목. `display` 토큰을 사용하며 최대 너비는 16ch다. 모바일에서는 2rem과 17ch를 쓴다.
- **Headline:** 주요 절 제목. `headline` 토큰으로 화면 너비에 따라 크기를 조절한다.
- **Title:** 일반 소제목. `title` 토큰을 기본으로, 넓은 사례 행 제목은 1.75rem, 간결한 행은 1.4rem, 모바일의 넓은 행은 1.5rem을 쓴다.
- **Body:** `body` 토큰을 바탕으로 짧은 보조 설명은 0.9–0.95rem, 도입 설명은 `lead` 토큰을 쓴다. 도입은 최대 64ch, 긴 업무 설명은 대체로 65–76ch다.
- **Label:** `label` 토큰은 본문 버튼과 주요 텍스트 링크에 사용한다. 기간은 0.85rem과 같은 폭 숫자, 상태는 0.8rem으로 구분한다.
- **Case display:** 사례 제목은 clamp(2rem, 3.5vw, 3rem)과 최대 26ch를 사용한다.

**The 한국어 읽기 Rule.** 제목은 균형 있게 줄바꿈하고, 본문은 한국어 단어 단위를 우선한다. 긴 주소나 끊기지 않는 문자열은 지면 안에서 줄바꿈한다.

## Layout

가운데 지면의 바깥 최대 너비는 1224px이고 좌우 안쪽 여백은 32px다. 따라서 홈의 실제 내용 너비는 최대 1160px다. 사례 지면의 바깥 최대 너비는 1184px, 내용 너비는 최대 1120px다. 홈의 위·아래 여백은 76px·96px이고 사례의 위 여백은 40px다.

가로 배치는 읽을 정보의 관계에 따라 정한다. 소개와 경력 요약은 1.35fr:0.85fr, 간격 76px다. 넓은 사례 행은 설명과 화면을 같은 너비로 나누고 간격 48px를 둔다. 역량은 네 열, 문제 해결 요약은 세 열, 경력은 기간 180px와 나머지 설명으로 구성한다. 현재 홈은 첫 세 사례를 넓은 행으로 표시하고 이후 사례를 간결한 행으로 잇는다. 이 개수를 다른 화면의 공통 규칙으로 강제하지 않는다.

본문 절 사이에는 `section`, 화면 증거 절 앞에는 72px를 두어 읽기의 단락을 나눈다. 짧은 설명은 `inline`부터 `text`, 묶음과 지면 안쪽은 `group`부터 `panel` 간격을 사용한다. 모든 값을 하나의 배수에 맞추기 위해 실제 간격을 바꾸지 않는다.

- **900px 이하:** 소개의 비율을 1.2fr:1fr, 간격을 36px로 줄인다. 사례 행 간격은 28px, 문제 해결 요약은 한 열, 연락 영역은 세로 배치다.
- **640px 이하:** 지면 여백은 40px 22px 64px다. 소개·경력·사례 설명과 화면은 한 열, 역량은 두 열로 쌓인다. 절 간격은 `mobile-section`으로 줄인다. 문제 해결 영역 안쪽은 22px, 화면 틀은 8px다.
- **고정 메뉴와 앵커:** 메뉴 높이는 데스크톱 80px, 모바일 106px이며 본문 시작도 그만큼 내려온다. 절 이동의 상단 여유는 각각 112px·128px다.

## Elevation & Depth

일반 지면은 평평하다. 얇은 선과 증거 영역의 배경색으로 묶음을 드러내고, 제목이 있는 주요 목록과 경력 요약의 시작에는 두꺼운 상단선을 둔다. 실제 캡처의 배경은 어두운 테마에서도 흰색을 유지하여 원본 화면의 색을 보존한다.

### Shadow Vocabulary

- **화면 확대창:** `0 24px 80px #00000040`. 확대창만 본문에서 분리한다. 뒤의 배경은 `#0a193abf`로 가린다.

**The 평평한 지면 Rule.** 일반 행과 설명 영역은 선과 배경색으로 구분한다. 큰 그림자는 화면 확대창의 분리에 사용한다.

## Shapes

지면·사례 행·업무 화면 틀은 각진 형태다. 본문 버튼과 확대 버튼은 `control`, 확대창은 `dialog`의 작은 모서리 반경만 사용한다. 일반 경계는 1px, 주요 목록·경력 요약·사례 끝의 상단 경계는 2px다. 형태를 부드럽게 만들기 위해 큰 둥근 카드나 알약 모양을 추가하지 않는다.

## Components

### Buttons

이동과 조작이 바로 읽히는 작은 직사각형이다. `button-primary`는 채움형, `button-secondary`는 지면색과 테두리, `button-expand`는 청색 글자와 테두리를 사용한다. 본문 버튼과 확대 버튼은 최소 높이 44px, 아이콘과 글자 간격은 각각 10px·8px다. 아이콘은 SVG이며 설명 없는 문자 기호로 대체하지 않는다.

기본 버튼은 마우스를 올리면 테두리가 조작 청색, 배경이 증거 영역색으로 바뀐다. 주요 버튼은 짙은 청색, 확대 버튼은 지면색으로 바뀐다. 기본 버튼의 배경·테두리 전환은 0.18s ease-out이다. 공통 키보드 초점은 조작 청색의 2px 외곽선과 4px 간격이다. 본문에 숨김 진입 애니메이션은 없다.

### Navigation

지면색의 고정 메뉴와 아래 구분선으로 본문 시작을 알린다. 트랙별 메뉴는 분리하며 모바일에서는 이름과 조작 영역을 두 줄로 배치한다. 메뉴 링크는 44px 이상의 높이를 갖는다. 테마는 밝게·어둡게·기기 설정을 SVG 아이콘 버튼으로 고르고 선택 상태를 배경과 `aria-pressed`로 표시한다. 권한이 필요한 링크는 허용된 사용자에게만 표시한다.

### Case rows

제목·요약·이동 안내·현재 상태를 선으로 구분한 행이다. 넓은 변형은 담당·결과 설명과 실제 화면을 짝지으며, 행 전체가 사례 링크다. 마우스를 올리면 이동 안내에 밑줄을 긋는다. 화면은 너비에 맞추되 원래 비율을 보존한다. 간결한 변형에는 화면과 기여 설명을 반복하지 않는다.

### Story panels

옅은 증거 영역에 문제·행동·결과를 짧게 묶는다. 기본 안쪽 여백은 `panel`, 모바일은 `mobile-inset`이다. 세부 업무 단계의 설명과 해당 화면은 같은 사례 본문 안에서 이어 읽는다. 구체적인 표제는 직무 트랙에 맞춰 바꿀 수 있다.

### Screen figures and dialogs

이미지 틀은 `screen-frame`을 사용하고 아래에 화면 이름과 원본 확대 버튼을 둔다. 이미지의 높이는 자동이며 잘라 채우지 않는다. 확대는 선택적이다. 본문만으로 설명과 화면을 모두 볼 수 있어야 한다.

확대는 브라우저 기본 `dialog`로 열며 최대 높이는 92dvh다. 내부 이미지 영역은 64dvh, 모바일에서는 55dvh 안에서 스크롤한다. 원본 크기 모드는 너비 max(100%, 1440px)를 사용한다. 닫기와 Escape로 종료하며 URL을 바꾸지 않고 원래 위치와 확대 버튼 초점으로 돌아온다. 한 묶음에 여러 화면이 있을 때만 이전·다음 조작을 제공한다.

### Disclosures and footer

보충 경력과 참고 자료는 기본 `details`·`summary`로 펼쳐 읽는다. 요약 조작의 최소 높이는 44px, 열렸을 때 다음 내용과 간격은 16px다. 푸터는 위 구분선과 28px의 세로 여백, 차분한 작은 글자로 닫는다.

이 범위의 공개 본문에는 입력 필드나 칩을 공통 구성 요소로 두지 않는다. 로그인 전용 편집기의 필드 디자인과 저장 동작은 이 문서의 기록 범위가 아니다.

## Do's and Don'ts

### Do:

- **Do** 같은 의미의 색상 역할을 두 테마에서 유지한다.
- **Do** 실제 업무 화면의 비율과 내용을 보존하고 설명 가까이에 둔다.
- **Do** 확대를 닫으면 원래 읽던 위치와 누른 버튼의 초점을 보존한다.
- **Do** 주요 본문 조작에 최소 높이 44px와 보이는 키보드 초점을 제공한다.
- **Do** 모바일에서 설명과 화면을 읽기 순서대로 세로로 배치한다.

### Don't:

- **Don't** 두 직무 트랙을 서로 이동하는 메뉴로 연결하지 않는다.
- **Don't** 실제 캡처를 장식용 이미지처럼 잘라 쓰거나 가상의 수치로 대체하지 않는다.
- **Don't** 본문을 숨긴 채 스크롤 진입 애니메이션을 기다리게 하지 않는다.
- **Don't** 공개 포트폴리오의 평평한 행에 기존 전역 유리 카드 효과를 적용하지 않는다.
