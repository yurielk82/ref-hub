import type {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@magic/types";
import { AX_CONTACT, AX_HERO } from "@/data/ax-content";

const person: Person = {
  firstName: AX_HERO.name,
  lastName: "",
  name: AX_HERO.name,
  role: AX_HERO.jobTitle,
  avatar: "/images/portfolio/profile.jpg",
  email: AX_CONTACT.email,
  location: "Asia/Seoul",
  languages: [],
  locale: "ko-KR",
};
const social: Social = [
  { name: "GitHub", icon: "github", link: AX_CONTACT.github, essential: true },
  {
    name: "이메일",
    icon: "email",
    link: `mailto:${AX_CONTACT.email}`,
    essential: true,
  },
];
const newsletter: Newsletter = { display: false, title: "", description: "" };
const home: Home = {
  path: "/",
  image: "/images/portfolio/pharmkpi/overview.webp",
  label: "홈",
  title: `${person.name} · 포트폴리오`,
  description: AX_HERO.summary,
  headline: person.name,
  featured: { display: false, title: "", href: "/projects/pharmkpi" },
  subline: AX_HERO.role,
};
const about: About = {
  path: "/about",
  label: "소개·경력",
  title: "소개·경력",
  description: AX_HERO.summary,
  tableOfContent: { display: false, subItems: false },
  avatar: { display: true },
  calendar: { display: false, link: "" },
  intro: { display: true, title: "소개", description: AX_HERO.summary },
  work: { display: true, title: "경력", experiences: [] },
  studies: { display: false, title: "학력", institutions: [] },
  technical: { display: true, title: "담당 업무와 역량", skills: [] },
};
const work: Work = {
  path: "/projects",
  label: "프로젝트",
  title: "프로젝트",
  description: "직접 만든 시스템과 업무 개선 사례",
};
const blog: Blog = { path: "/blog", label: "글", title: "글", description: "" };
const gallery: Gallery = {
  path: "/gallery",
  label: "갤러리",
  title: "갤러리",
  description: "",
  images: [],
};
export { person, social, newsletter, home, about, work, blog, gallery };
