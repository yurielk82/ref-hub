---
name: ref-hub 포트폴리오
description: 짙은 녹색 도입과 실제 업무 화면으로 해결 과정을 보여 주는 지면
colors:
  folio-ink: "#133c30"
  folio-muted: "#52675d"
  folio-line: "#dce5df"
  folio-paper: "#fff"
  folio-well: "#f2f6f2"
  folio-accent: "#1c5a46"
  action-hover: "#123e30"
  dark-ink: "#e7f1e9"
  dark-muted: "#b3c8ba"
  dark-line: "#354b40"
  dark-paper: "#0e2018"
  dark-well: "#193025"
  dark-accent: "#d2e99a"
  hero-bg: "#0e3024"
  nav-bg: "#12382c"
  nav-line: "#355347"
  hero-ink: "#f5faf5"
  hero-lead: "#e0ece3"
  hero-muted: "#bdcfc3"
  hero-action: "#edf18f"
  hero-action-hover: "#f8fbb7"
  hero-action-ink: "#153a2b"
  hero-secondary-ink: "#f3f8f1"
  hero-secondary-hover: "#274e3c"
  hero-control-line: "#8aa697"
  evidence-frame: "#e5e9e5"
  process-paper: "#faf9f7"
  process-icon: "#dfe9df"
  process-icon-ink: "#174532"
  process-icon-highlight: "#eef0b0"
  proof-paper: "#f6f7f5"
typography:
  display:
    fontFamily: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif
    fontSize: clamp(2.7rem, 4.7vw, 4.5rem)
    fontWeight: 780
    lineHeight: 1.28
    letterSpacing: -0.035em
  headline:
    fontFamily: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif
    fontSize: clamp(1.5rem, 2.4vw, 2rem)
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: -0.035em
  title:
    fontSize: 1.2rem
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: -0.035em
  body:
    fontFamily: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  lead:
    fontSize: 1.1rem
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontSize: 0.95rem
    fontWeight: 650
    lineHeight: 1.75
rounded:
  control: 3px
  dialog: 5px
  mobile-evidence: 10px
  home-panel: 12px
  hero-evidence: 14px
  tag: 18px
  circle: 50%
spacing:
  inline: 8px
  compact: 12px
  frame: 16px
  text: 20px
  mobile-inset: 22px
  group: 24px
  row: 28px
  panel: 32px
  wide: 48px
  mobile-section: 56px
  section: 88px
  home-mobile-section: 52px
  home-section: 72px
components:
  button-primary:
    backgroundColor: "{colors.folio-accent}"
    textColor: "{colors.folio-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: 10px 17px
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    backgroundColor: "{colors.folio-paper}"
    textColor: "{colors.folio-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: 10px 17px
  button-secondary-hover:
    backgroundColor: "{colors.folio-well}"
  button-expand:
    textColor: "{colors.folio-accent}"
    rounded: "{rounded.control}"
    padding: 8px 12px
  navigation:
    backgroundColor: "{colors.nav-bg}"
    textColor: "{colors.hero-ink}"
    height: 76px
    padding: 0 48px
  disclosure:
    textColor: "{colors.folio-ink}"
    padding: 16px 0
  case-row:
    textColor: "{colors.folio-ink}"
    padding: 26px 0
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
    width: min(96vw, 1600px)
  button-hero-primary:
    backgroundColor: "{colors.hero-action}"
    textColor: "{colors.hero-action-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.home-panel}"
    padding: 12px 30px
  button-hero-primary-hover:
    backgroundColor: "{colors.hero-action-hover}"
  button-hero-secondary:
    backgroundColor: transparent
    textColor: "{colors.hero-secondary-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.home-panel}"
    padding: 12px 30px
  button-hero-secondary-hover:
    backgroundColor: "{colors.hero-secondary-hover}"
  proof-card:
    backgroundColor: "{colors.proof-paper}"
    rounded: "{rounded.home-panel}"
    padding: "{spacing.group}"
  proof-tag:
    backgroundColor: "{colors.folio-line}"
    textColor: "{colors.folio-ink}"
    rounded: "{rounded.tag}"
    padding: 3px 9px
  hero-evidence:
    backgroundColor: "{colors.folio-paper}"
    rounded: "{rounded.hero-evidence}"
    padding: "{spacing.inline}"
---

# Design System: ref-hub 포트폴리오

## Overview

**Creative North Star: "해결 과정 먼저"**

짙은 녹색 도입과 백색 본문을 실제 업무 화면으로 연결한다. 굵은 한국어 제목, 연노랑 핵심 조작, 차분한 본문 색으로 읽을 순서를 만든다. 첫 화면의 사선 면과 둥근 화면 틀은 도입의 특징이며 긴 사례 본문은 선과 여백으로 정리한다.

이 시스템은 공개 포트폴리오의 영업관리·AX 두 트랙과 사례 본문에 적용한다. 두 트랙은 색상·서체·구성 요소를 공유하지만 서로 연결하는 메뉴를 두지 않는다. 매뉴얼과 로그인 전용 편집 화면의 별도 스타일을 이 시스템으로 일반화하지 않는다.

**Key Characteristics:**

- 짙은 녹색 바탕, 밝은 제목과 연노랑 핵심 조작
- 굵은 한국어 제목과 여유 있는 본문 행간
- 실제 업무 화면과 설명용 그림의 구분
- 둥근 홈 근거 영역과 선으로 정리한 사례 본문
- 밝은 테마와 어두운 테마에서 같은 정보 위계

기록 근거는 `app/(portfolio)/portfolio.css`, `app/globals.css`, `components/portfolio/portfolio-home.tsx`, `nav.tsx`, `screen-gallery.tsx`와 공통 사례 구성 요소다. 승인 방향과 첫 화면의 구성 계약은 `.impeccable/surfaces/app-portfolio-page-tsx.md`, 승인 시안은 `.impeccable/mocks/story-approved.png`에 둔다. 첫 화면의 좌표를 모든 새 화면에 강제하지 않는다.

## Colors

녹색은 도입의 큰 바탕과 본문 잉크를 함께 맡고, 연노랑은 어두운 바탕의 제목 강조·핵심 조작·초점을 밝힌다. 정확한 색 값은 앞의 토큰을 따른다.

### Primary

- **업무 녹색** (`folio-accent`, `action-hover`): 본문 링크·초점·주요 버튼과 짧은 문제 해결 표제. 본문 주요 채움 버튼은 두 테마 모두 같은 녹색 배경과 흰 글자를 유지한다.
- **도입의 연노랑** (`hero-action`, `hero-action-hover`): 도입 제목의 후속 줄, 주요 버튼과 도입·메뉴의 키보드 초점. 마우스를 올린 주요 버튼은 더 밝아진다.
- **어두운 지면의 연녹색** (`dark-accent`): 어두운 테마 본문의 링크·초점·표제.

### Neutral

- **짙은 녹색 지면** (`hero-bg`, `nav-bg`): 홈 도입과 고정 메뉴. 밝은 테마에서도 유지한다.
- **녹색 잉크 / 밝은 잉크** (`folio-ink`, `dark-ink`): 본문 제목·강조 문장·주요 경계선.
- **설명 잉크** (`folio-muted`, `dark-muted`): 본문·기간·상태·캡션. 도입에는 밝은 `hero-lead`, `hero-muted`를 쓴다.
- **지면과 증거 영역** (`folio-paper`, `folio-well`, `dark-paper`, `dark-well`): 본문·확대창과 설명 묶음. 실제 캡처 틀의 흰 배경은 어두운 테마에서도 유지한다.
- **과정 바탕과 근거 바탕** (`process-paper`, `proof-paper`): 홈의 단계 설명과 근거 카드. 어두운 테마에서는 두 영역 모두 `dark-well`로 바뀐다.
- **구분선** (`folio-line`, `dark-line`, `nav-line`): 본문 행·이미지 틀·메뉴 경계. 설명 태그도 본문의 구분선 색을 바탕으로 쓴다.
- **단계 아이콘 바탕** (`process-icon`, `process-icon-highlight`): 원형 아이콘 배경. 현재 홈의 세 번째 단계만 연노랑 바탕이며 다른 화면의 특정 순번까지 규칙으로 삼지 않는다.

**The 바탕에 맞는 조작 Rule.** 어두운 도입에서는 연노랑, 밝은 본문에서는 녹색으로 조작을 구분한다. 어두운 테마의 본문에는 밝은 강조색을 쓴다.

## Typography

**Display Font:** Pretendard Variable, Pretendard와 한국어를 지원하는 sans-serif 대체 글꼴.
**Body Font:** 같은 Pretendard 계열. 전역의 다른 장식 글꼴을 포트폴리오 제목의 기준으로 삼지 않는다.

**Character:** 굵은 제목과 촘촘한 자간으로 내용을 구분하고 본문은 긴 행간으로 읽기 쉽게 한다. 장식용 대문자 표제를 추가하지 않는다. 과정의 숫자는 순서를 알려 주는 정보다.

### Hierarchy

- **Display:** 홈 도입의 `display` 토큰. 저장 문구의 줄바꿈을 각 줄로 표시하고 둘째 줄부터 연노랑으로 강조한다. 761–1100px에서는 3rem, 760px 이하에서는 clamp(2.1rem, 7.4vw, 3rem)이다.
- **Headline:** 주요 절은 `headline`, 근거 카드 제목은 clamp(1.3rem, 1.9vw, 1.9rem)이며 모바일에서는 1.2rem이다.
- **Title:** 일반 소제목은 `title`. 넓은 사례 행은 1.75rem, 간결한 행은 1.4rem, 모바일의 넓은 행은 1.5rem이다. 과정 제목은 1.15rem, 모바일에서는 1rem이다.
- **Body:** `body`를 바탕으로 짧은 설명은 0.9–0.96rem이다. 도입 설명은 `lead`와 최대 48ch, 도입 보조 문장은 0.92rem·행간 1.8·최대 56ch다. 긴 업무 설명은 대체로 65–76ch다.
- **Label:** 본문 버튼은 `label`. 홈 버튼은 모바일에서 0.9rem, 메뉴는 0.95rem에서 0.85rem으로 줄어든다. 기간은 0.85rem과 같은 폭 숫자, 상태는 0.8rem, 설명 태그는 0.78rem이다.
- **Case display:** 사례 제목은 clamp(2rem, 3.5vw, 3rem), 굵기 750, 행간 1.35와 최대 26ch를 사용한다.

**The 한국어 읽기 Rule.** 제목은 균형 있게 줄바꿈하고, 본문은 한국어 단어 단위를 우선한다. 긴 주소나 끊기지 않는 문자열은 지면 안에서 줄바꿈한다.

## Layout

홈 도입과 과정 바탕은 화면 끝까지 이어진다. 도입의 안쪽 여백은 좌우 max(48px, calc((100vw - 1440px) / 2)), 위 14px이며 최소 높이는 496px다. 설명과 실제 화면은 0.92fr:1.08fr, 간격 40px로 배치한다. 설명 위에는 28px 여백을 둔다. 화면 틀은 아래로 24px 겹쳐 다음 바탕과 연결한다. 도입 설명 앞에는 짧은 가로선을 두되 모바일에서는 생략한다.

홈 근거·목록·연락 영역의 너비는 calc(100% - 96px), 최대 1440px다. 근거 카드는 두 열과 간격 20px, 카드 안은 설명과 그림을 1.15fr:1fr로 나눈다. 과정은 네 열이다. 이 첫 화면 구성은 홈에만 적용한다.

사례 지면의 바깥 최대 너비는 1184px, 좌우 안쪽 여백은 32px, 위 여백은 40px다. 기본 지면은 최대 1224px다. 넓은 사례 행은 설명과 화면을 같은 너비로 나누고 간격 48px를 둔다. 문제 해결 요약은 세 열, 경력은 기간 180px와 나머지 설명이다. 현재 홈의 앞쪽 사례를 넓은 행으로 표시하는 개수는 공통 규칙이 아니다.

홈 절 간격은 `home-section`, 일반 절은 `section`, 화면 증거 절 앞은 72px다. 짧은 설명은 `inline`부터 `text`, 묶음과 안쪽 여백은 `group`부터 `panel`을 사용한다. 실제 간격을 하나의 배수에 맞추기 위해 바꾸지 않는다.

- **1100px 이하:** 이름 옆 부연 문구를 숨긴다. 홈 도입 좌우 여백은 32px, 간격은 28px다. 과정 아이콘과 글은 세로로 놓는다. 761–1100px에서는 도입 버튼 위 여백이 64px이며 근거 카드 안도 한 열이다.
- **900px 이하:** 사례 행 간격은 28px, 문제 해결 요약은 한 열, 연락 영역은 세로 배치다.
- **760px 이하:** 홈 도입은 한 열, 여백 36px 22px 28px다. 화면 틀의 아래 겹침을 없앤다. 과정은 두 열이며 연결 화살표를 숨긴다. 근거 카드와 카드 내부도 한 열이며 그림 최대 너비는 270px다. 홈 본문 너비는 calc(100% - 44px), 절 간격은 `home-mobile-section`이다.
- **640px 이하:** 사례 지면 여백은 40px 22px 64px다. 사례의 설명·화면과 경력은 한 열이다. 일반 절 간격은 `mobile-section`, 문제 해결 영역 안쪽은 22px, 화면 틀은 8px다.
- **고정 메뉴와 앵커:** 메뉴와 본문 시작 여백은 데스크톱 76px, 760px 이하 72px다. 메뉴는 모바일에서도 한 줄이다. 본문 절 이동의 상단 여유는 기본 112px, 640px 이하 128px이며 과정은 96px다.

## Elevation & Depth

홈 도입의 겹친 사선 면은 CSS 그라데이션으로 만든다. 그림자와 둥근 틀은 실제 화면을 도입에서 분리하고, 근거 카드에는 옅은 배경과 마우스 올림 경계를 사용한다. 긴 본문의 일반 행은 평평하며 얇은 선과 배경색으로 구분한다.

### Shadow Vocabulary

- **도입 화면 틀:** `0 12px 28px #031e2e24`. 두꺼운 밝은 테두리와 함께 실제 화면을 구분한다.
- **관리 메뉴:** `0 12px 32px #001b2520`. 소유자 전용 펼침 메뉴를 본문과 분리한다.
- **화면 확대창:** `0 24px 80px #00000040`. 확대창 뒤의 배경은 `#0a193abf`로 가린다.
- **근거 카드 마우스 올림:** `inset 0 0 0 1px var(--folio-accent)`. 카드를 띄우지 않고 안쪽 경계를 드러낸다.

**The 깊이의 역할 Rule.** 도입 화면·관리 메뉴·확대창의 분리에 그림자를 쓴다. 일반 사례 행은 선과 배경으로 구분한다.

## Shapes

홈 버튼과 근거 카드는 `home-panel`, 도입 화면 틀은 `hero-evidence`의 둥근 모서리를 쓴다. 모바일 화면 틀은 `mobile-evidence`다. 도입 화면 틀의 테두리는 기본 8px, 모바일 5px다. 단계 아이콘과 테마 버튼은 원형이며 설명 태그는 `tag`의 긴 둥근 형태다.

본문 사례 행·업무 화면 틀은 각진 형태다. 본문·확대 버튼은 `control`, 확대창은 `dialog`의 작은 반경을 유지한다. 일반 경계는 1px, 주요 목록·사례 끝의 상단 경계는 2px다. 홈의 둥근 영역을 금지하거나 모든 본문 행을 같은 카드로 바꾸지 않는다.

## Components

### Buttons

홈 주요 버튼은 연노랑 채움, 보조 버튼은 투명 배경과 밝은 테두리다. 둘 다 최소 높이 52px, 여백 12px 30px다. 주요 버튼 최소 너비는 204px, 보조는 164px다. 모바일에서도 주요 버튼의 204px은 유지하고 보조 버튼의 최소 너비만 해제한다. 두 버튼의 모바일 최소 높이는 48px, 여백은 10px 18px다.

본문의 `button-primary`는 녹색 채움, `button-secondary`는 지면색과 테두리, `button-expand`는 강조색 글자와 테두리다. 본문·확대 버튼 최소 높이는 44px다. 아이콘은 SVG이며 설명 없는 문자 기호로 대체하지 않는다.

버튼 배경·테두리 전환은 0.18s ease-out이다. 공통 초점은 2px 외곽선과 4px 간격이며 도입·상단 메뉴에서는 연노랑, 펼친 관리 메뉴 내부 링크와 본문에서는 테마 강조색이다. 본문을 숨긴 뒤 드러내는 진입 애니메이션은 없다. 움직임 축소 설정에서는 전환을 끈다.

### Navigation

짙은 녹색 고정 메뉴에 이름, 현재 트랙의 작업·경력·연락, 테마 버튼을 한 줄로 놓는다. 트랙별 메뉴는 분리한다. 링크와 테마 버튼은 44px 이상 조작 영역을 갖는다. 테마는 해·달 SVG를 쓰는 단일 원형 버튼으로 밝게·어둡게 전환하며 접근성 이름에 다음 동작을 표시한다.

권한 확인을 통과한 소유자에게만 관리 메뉴를 표시한다. 홈페이지 편집·저장, 이력서·제출 파일, 공고 모음은 이 펼침 안에 둔다. 420px 이하에서는 관리 메뉴가 있을 때 간격과 좌우 여백을 줄인다. 기존 제출 파일 주소와 홈페이지 문구 저장 정책은 유지한다. 홈페이지 저장과 제출 서류 저장은 별개이며 편집기 필드 자체는 이 시각 시스템의 기록 범위가 아니다.

### Proof cards and tags

근거 카드는 제목·짧은 설명·태그·설명용 그림을 담는 하나의 사례 링크다. 기본 여백은 24px, 최소 높이는 210px다. 마우스를 올리면 안쪽 경계, 키보드 초점에는 공통 외곽선이 나타난다. 그림은 원래 비율로 표시하며 실제 화면과 설명용 그림을 구분한다.

태그는 본문 구분선 색 바탕, 본문 잉크와 3px 9px 여백을 쓴다. 현재 구현은 설명용 `span`이며 필터·선택·독립 버튼 상태가 없다.

### Process steps

원형 SVG 아이콘, 같은 폭 숫자, 제목과 짧은 설명으로 순서를 나타낸다. 기본 아이콘 영역은 52px, 모바일은 44px다. 넓은 화면에서는 단계 사이에 SVG 화살표를 두며 모바일에서는 읽기 순서로 연결한다.

### Case rows and story panels

사례 행은 제목·요약·이동 안내·현재 상태를 선으로 구분한다. 넓은 변형은 담당·결과 설명과 실제 화면을 짝지으며 행 전체가 링크다. 마우스를 올리면 배경이 증거 영역색으로 바뀌고 이동 안내에 밑줄이 생긴다. 배경 전환은 0.2s ease-out이다. 간결한 변형에는 화면과 기여 설명을 반복하지 않는다.

문제 해결 요약은 옅은 증거 바탕에 문제·행동·결과를 묶는다. 기본 여백은 `panel`, 모바일은 `mobile-inset`이다. 업무 단계 설명과 해당 화면은 같은 사례 본문 안에서 이어 읽는다.

### Screen figures and dialogs

실제 화면은 원래 비율을 보존하고 잘라 채우지 않는다. 홈의 대표 화면은 사례로 연결하고 사례 본문의 화면 아래에는 이름과 선택적 원본 확대 버튼을 둔다. 본문만으로 설명과 화면을 모두 볼 수 있어야 한다.

확대는 기본 `dialog`로 열며 최대 높이는 92dvh다. 내부 이미지 영역은 64dvh, 640px 이하에서는 55dvh 안에서 스크롤한다. 원본 크기 모드는 너비 max(100%, 1440px)를 사용한다. 닫기와 Escape로 종료하며 URL을 바꾸지 않고 원래 위치와 확대 버튼 초점으로 돌아온다. 여러 화면이 있을 때만 이전·다음 조작을 제공한다. 이는 구현된 동작의 기록이며 문서 갱신만으로 운영 동작 검사를 대체하지 않는다.

### Disclosures and footer

보충 경력과 참고 자료는 기본 `details`·`summary`로 펼친다. 요약 조작 최소 높이는 44px, 열린 다음 내용과 간격은 16px다. 푸터는 위 구분선과 28px 세로 여백, 차분한 작은 글자로 닫는다.

## Do's and Don'ts

### Do:

- **Do** 도입의 녹색·연노랑과 본문의 테마별 색상 역할을 구분한다.
- **Do** 실제 업무 화면의 비율과 내용을 보존하고 설명 가까이에 둔다.
- **Do** 설명용 그림을 실제 시스템 화면이나 성과 수치로 소개하지 않는다.
- **Do** 확대를 닫으면 원래 읽던 위치와 누른 버튼의 초점을 보존한다.
- **Do** 주요 본문 조작에 최소 높이 44px와 보이는 키보드 초점을 제공한다.
- **Do** 모바일에서 설명과 화면을 읽기 순서대로 세로로 배치한다.

### Don't:

- **Don't** 두 직무 트랙을 서로 이동하는 메뉴로 연결하지 않는다.
- **Don't** 실제 캡처를 장식용 이미지처럼 잘라 쓰거나 가상의 수치로 대체하지 않는다.
- **Don't** 본문을 숨긴 채 스크롤 진입 애니메이션을 기다리게 하지 않는다.
- **Don't** 일반 사례 행에 전역 유리 카드 효과를 적용하지 않는다.
- **Don't** 홈의 둥근 근거 카드·태그·그림자를 금지하는 예전 규칙을 되살리지 않는다.
