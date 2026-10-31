import test from "node:test";
import assert from "node:assert/strict";

import { parseDocKind, resumeDocument } from "../../lib/resume/document.ts";
import { toDocx } from "../../lib/resume/docx.ts";

const saramin = {
  title: "제약 영업관리 과장",
  basic: {
    name: "홍길동",
    careerType: "경력",
    gender: "남",
    birthYear: "1985",
    email: "hong@example.com",
    phone: "",
    address: "서울 송파구",
  },
  myCareer: "첫 문단\n\n둘째 문단",
  careers: [
    {
      company: "옛회사",
      start: "2016.01",
      end: "2019.06",
      job: "R&D",
      role: "대리",
      duty: "품질 관리",
      leaveReason: "",
    },
    {
      company: "가나제약",
      start: "2025.03",
      end: null,
      job: "유통관리",
      role: "영업관리팀 과장",
      duty: "1. 판매관리\n2. 공급내역보고",
      leaveReason: "",
    },
  ],
  education: [
    {
      school: "가나대학교",
      level: "대학교(4년)",
      status: "졸업",
      major: "정보통신",
      minor: "",
    },
  ],
  skills: ["영업관리", "ERP"],
  portfolio: [{ label: "포트폴리오", url: "https://example.com/" }],
  careerDescription: {
    title: "경력기술서",
    body: "가나제약 / 과장\n\n1. 실무\n\n* 매출 관리\n* 긴 줄이\n   이어집니다",
  },
  coverLetter: [{ title: "제목", body: "첫 문단\n\n둘째 문단" }],
};

const jobkorea = {
  title: "잡코리아 제목",
  basic: {
    name: "홍길동",
    gender: "남",
    birthYear: "1985",
    phone: "",
    email: "hong@example.com",
    address: "서울 송파구",
  },
  skills: ["영업관리"],
  education: [],
  careers: [
    {
      company: "가나제약",
      start: "2025.03",
      end: null,
      department: "영업관리팀",
      position: "과장",
      title: "파트장",
      job: "영업관리",
      salary: "5,000만원",
      duty: "판매관리",
    },
  ],
  activities: "",
  certificates: "",
  careerDescription: { title: "경력기술서", body: "본문" },
  coverLetter: [],
  portfolio: [],
  preference: {
    employmentType: "정규직",
    location: "서울",
    salary: "면접 후 결정",
    jobs: "영업관리",
    industries: "제약",
  },
};

const texts = (doc) => doc.blocks.map((block) => block.text);

test("문서 종류는 이력서·경력기술서·자기소개서 셋만 받는다", () => {
  assert.equal(parseDocKind("resume"), "resume");
  assert.equal(parseDocKind("career"), "career");
  assert.equal(parseDocKind("cover"), "cover");
  assert.equal(parseDocKind("../etc"), null);
  assert.equal(parseDocKind(null), null);
});

test("이력서 파일은 경력을 최근 순으로 놓고 재직 중이면 '재직중'으로 쓴다", () => {
  const doc = resumeDocument("saramin", saramin, "resume");
  assert.equal(doc.fileName, "홍길동_이력서.docx");
  assert.equal(doc.blocks[0].kind, "title");
  assert.equal(doc.blocks[0].text, "제약 영업관리 과장");
  const all = texts(doc);
  const current = all.findIndex((text) => text.startsWith("가나제약"));
  const old = all.findIndex((text) => text.startsWith("옛회사"));
  assert.ok(current > 0 && current < old);
  assert.match(all[current], /2025\.03 ~ 재직중/);
  assert.ok(all.includes("둘째 문단"));
  assert.ok(all.includes("2. 공급내역보고"));
  assert.ok(all.some((text) => text.includes("영업관리, ERP")));
  assert.ok(all.some((text) => text.includes("https://example.com/")));
});

test("빈 칸은 줄을 만들지 않는다", () => {
  const all = texts(resumeDocument("saramin", saramin, "resume"));
  assert.ok(!all.some((text) => text.startsWith("휴대폰")));
});

test("잡코리아 이력서 파일에는 연봉을 넣지 않고 직급·직책은 넣는다", () => {
  const all = texts(resumeDocument("jobkorea", jobkorea, "resume"));
  assert.ok(!all.some((text) => text.includes("5,000만원")));
  assert.ok(all.some((text) => text.includes("영업관리팀 과장 · 파트장")));
  assert.ok(all.some((text) => text.includes("면접 후 결정")));
});

test("경력기술서는 * 줄을 글머리표로 바꾸고 들여쓴 줄은 앞줄에 붙인다", () => {
  const doc = resumeDocument("saramin", saramin, "career");
  assert.equal(doc.fileName, "홍길동_경력기술서.docx");
  const bullets = doc.blocks.filter((block) => block.kind === "bullet");
  assert.deepEqual(
    bullets.map((block) => block.text),
    ["매출 관리", "긴 줄이 이어집니다"],
  );
  assert.ok(
    doc.blocks.some(
      (block) => block.kind === "heading" && block.text === "1. 실무",
    ),
  );
});

test("자기소개서는 항목 제목과 문단을 나눈다", () => {
  const doc = resumeDocument("saramin", saramin, "cover");
  assert.equal(doc.fileName, "홍길동_자기소개서.docx");
  assert.deepEqual(
    doc.blocks.map((block) => [block.kind, block.text]),
    [
      ["title", "자기소개서"],
      ["heading", "제목"],
      ["paragraph", "첫 문단"],
      ["paragraph", "둘째 문단"],
    ],
  );
});

test("DOCX 파일로 만들어진다", async () => {
  const buffer = await toDocx(resumeDocument("saramin", saramin, "resume"));
  assert.equal(buffer.subarray(0, 2).toString(), "PK");
  assert.ok(buffer.length > 1000);
});

test("포트폴리오도 별도 제출 문서로 선택한다", () => {
  assert.equal(parseDocKind("portfolio"), "portfolio");
});

test("실제 경력기술서의 사각 제목과 성과 구분을 문서 제목으로 읽는다", () => {
  const input = structuredClone(saramin);
  input.careerDescription.body =
    "■ 영업 데이터 시스템\n[추진 배경]\n자료가 흩어져 있었음\n[성과]\n* 보고 자동화";
  const doc = resumeDocument("saramin", input, "career");
  assert.ok(
    doc.blocks.some(
      (b) => b.kind === "heading" && b.text === "영업 데이터 시스템",
    ),
  );
  assert.ok(
    doc.blocks.some((b) => b.kind === "subheading" && b.text === "성과"),
  );
});

test("포트폴리오는 공개 업무 사례·운영 상태·화면을 포함한다", () => {
  const doc = resumeDocument("saramin", saramin, "portfolio");
  assert.equal(doc.fileName, "홍길동_포트폴리오.docx");
  assert.ok(
    doc.blocks.some(
      (b) => b.kind === "image" && b.imagePath.startsWith("/images/portfolio/"),
    ),
  );
  assert.ok(doc.blocks.some((b) => b.text.includes("운영 종료")));
  assert.ok(doc.blocks.some((b) => b.text.includes("개선 진행 중")));
  assert.ok(
    doc.blocks.some((b) =>
      b.text.includes("https://ref.dvsharp.com/projects/pharmkpi"),
    ),
  );
});
