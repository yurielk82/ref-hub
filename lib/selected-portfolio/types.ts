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
  stack: string[];
  links: PublicLink[];
  image: string;
  imageAlt: string;
  art: "orbit" | "layers" | "flow" | "quantization" | "none";
  artLabels: string[];
  sections: ProjectSection[];
};
export type PortfolioData = {
  site: { title: string; description: string; example: boolean };
  profile: {
    name: string;
    role: string;
    intro: string;
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
