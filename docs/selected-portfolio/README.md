# 선택한 포트폴리오 원본과 운영 연결

[jihyun-el/portfolio-template](https://github.com/jihyun-el/portfolio-template)의 MIT 원본 `44cfd52a992c6e49b1547a30d49a0201cb10b728`을 사용한다. 라이선스는 `components/selected-portfolio/LICENSE`에 보존한다. 기존 Magic Portfolio가 아닌 이 원본의 레이아웃·글꼴·읽기 동작을 사용하며, 사용자의 최신 요청에 따라 조작부·테두리를 Apple 가이드에 맞춰 정돈한다.

같은 폴더의 ART 문서는 원본 아트 기준이다. 파일 지도는 upstream 기준이며 운영 구현은 아래 위치로 옮겼다. 실제 데이터나 정량 효과를 새로 주장하지 않고, 서로 다른 업무를 서로 다른 입체 장면으로 표현한다.

| 역할 | 운영 파일 |
|---|---|
| 공개 루트·AX·기존 상세 주소 | `app/(showcase)/` |
| 원본 컴포넌트·스타일·프로젝트별 장면 | `components/selected-portfolio/` |
| 글·테마 기본값 | `data/selected-portfolio/` |
| 타입·필터·읽기·기존 편집키 연결 | `lib/selected-portfolio/` |
| 원본의 순수 계산·검증 | `scripts/selected-portfolio/` |
| 공개용 캡처·글꼴·원본 예제 | `public/assets/selected-portfolio/` |

KPI.는 제약 영업 운영 플랫폼으로 소개한다. SFE·S&OP·KPIS·유통재고는 같은 계열의 기능·연계 사례이며 `parentId`로 연결한다. 공개 항목 11개를 독립 제품 11개로 집계하지 않는다. 숨긴 네 프로젝트는 JSON에서 `hidden: true`로 보관하고 목록·이전/다음·실제 상세 본문에서 제외한다.

원본 `/`와 `/ax`의 메뉴는 서로 연결하지 않는다. 기존 `loadPortfolio()`가 읽는 저장소 밖 snapshot의 명시적인 수정값만 새 기본값에 덮는다. 기존 필드 이름과 저장 원본을 보존하며 의미가 바뀐 섹션에는 `selected.*` 키를 쓴다. 새 필드도 기존 저장 액션의 허용 목록에 등록한다. 같은 캡처는 실제 경로로 원래 편집키에 연결하고 편집 목록에서 중복을 제거한다.

`app/(legacy)`의 로그인·편집·이력서·공고·매뉴얼과 인증·파일 저장 모듈은 유지한다. 오너 메뉴는 기존 서버 인증 판정 뒤에만 제공한다. 제출 PDF/DOCX의 고정 주소와 저장된 파일은 공개 화면 교체와 독립이다.

[Apple 레이아웃](https://developer.apple.com/design/human-interface-guidelines/layout), [타이포그래피](https://developer.apple.com/design/human-interface-guidelines/typography), [움직임](https://developer.apple.com/design/human-interface-guidelines/motion)은 정렬·글자 위계·차분한 조작의 참고다. 실제 적용값은 운영 CSS와 `DESIGN.md`를 따른다. Apple 글꼴·상표·아이콘을 가져오지 않는다.
