import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: {
    title: "← 포트폴리오",
    type: "page",
    href: "/",
  },
  pharmkpi: {
    title: "영업 데이터 분석·보고",
    type: "page",
  },
  "kpis-dsr-api": {
    title: "의약품 공급내역보고",
    type: "page",
  },
  csoweb: {
    title: "CSO 데이터 조회·검증 (운영 종료)",
    type: "page",
  },
  "edi-verification": {
    title: "처방통계 자료 검증 (이전 사례)",
    type: "page",
  },
  corerx: {
    display: "hidden",
    title: "CoreRx",
    type: "page",
  },
  "ev-motor-reliability": {
    display: "hidden",
    title: "EV Motor Reliability",
    type: "page",
  },
  "har-eval": {
    display: "hidden",
    title: "har_eval",
    type: "page",
  },
  // 포트폴리오 화면(app/(portfolio))도 페이지 지도에 잡힌다. 문서 메뉴에는 매뉴얼만 둔다.
  // jobs·login은 로그인 전용이라 공개 메뉴에 이름도 드러내지 않는다.
  ax: { display: "hidden", type: "page" },
  docs: { display: "hidden", type: "page" },
  projects: { display: "hidden", type: "page" },
  jobs: { display: "hidden", type: "page" },
  login: { display: "hidden", type: "page" },
};

export default meta;
