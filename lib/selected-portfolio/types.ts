export type PublicLink = { label: string; url: string };
export type RecordEntry = {
  title: string;
  period: string;
  description: string;
};
export type WorkArea = {
  title: string;
  description: string;
  projectIds: string[];
};
export type WorkingApproach = { title: string; description: string };
export type PortfolioSkill = {
  id?: string;
  name: string;
  usage: string;
  category?: string;
  projectIds?: string[];
};
export type ProjectScreen = {
  src: string;
  title: string;
  caption: string;
  note: string;
  width: number;
  height: number;
  /** 운영 명세 묶음 이름. 이름이 같은 연속 화면은 접힌 "운영 명세 보기" 안에 들어간다. */
  spec?: string;
};
export type ProjectSection = {
  title: string;
  body: string;
  screens?: ProjectScreen[];
};
export type Project = {
  id: string;
  hidden?: boolean;
  parentId?: string;
  name: string;
  category: string;
  period: string;
  role: string;
  title: string;
  accent: string;
  summary: string;
  highlights?: string[];
  /** 홈 카드·목록의 한두 줄 설명. 없으면 summary. */
  brief?: string;
  /** 상세 첫 화면에 먼저 보일 캡처의 src. 없으면 첫 캡처. */
  lead?: string;
  /** 자동화 뒤에 사람이 맡는 판단. 상세 머리의 "사람이 맡는 판단" 칸. */
  judgment?: string;
  /** 캡처가 없는 대표 사례 카드의 그림 칸에 보일 절차. */
  cardSteps?: { title: string; items: string[] };
  stack: string[];
  links: PublicLink[];
  image: string;
  imageAlt: string;
  art: "orbit" | "layers" | "flow" | "quantization" | "none";
  artLabels: string[];
  sections: ProjectSection[];
};
/** 홈의 "시스템에 넘긴 반복 / 사람이 집중하는 판단" 한 줄. projectId가 없으면 경력 칸의 일하는 방식을 가리킨다. */
export type FocusItem = { text: string; projectId?: string };
export type FocusSide = { label: string; note?: string; items: FocusItem[] };
/** 홈 "업무별로 바뀐 점" 표의 한 줄. 상태 표식은 projectId 사례의 상태에서 읽는다. */
export type ResultRow = {
  work: string;
  projectId: string;
  system: string;
  human: string;
};
export type Saying = {
  quote: string;
  translation: string;
  source: string;
  url: string;
};
export type PortfolioData = {
  site: { title: string; description: string; example: boolean };
  profile: {
    name: string;
    role: string;
    intro: string;
    highlights?: string[];
    /** 홈 첫 줄 헤드라인(직무 + 차별 성과 한 문장). 있으면 홈이 헤드라인 구성으로 바뀐다. */
    headline?: string;
    headlineNote?: string;
    /** 헤드라인과 같은 뜻의 해외 인용. 원문을 출처에서 확인한 것만 싣는다. */
    headlineSayings?: { label: string; items: Saying[] };
    /** 홈 제목 아래 누구인지 한 줄(회사 이름 없이)과 작은 줄. */
    identity?: { title: string; detail: string };
    focus?: {
      title: string;
      description: string;
      system: FocusSide;
      human: FocusSide;
    };
    results?: { title: string; description: string; rows: ResultRow[] };
    fields: string[];
    links: PublicLink[];
    experiences: RecordEntry[];
    education: RecordEntry[];
    workAreas?: WorkArea[];
    approach?: WorkingApproach[];
  };
  projects: Project[];
  skills: PortfolioSkill[];
  writing: { title: string; summary: string; url: string; category?: string }[];
};
