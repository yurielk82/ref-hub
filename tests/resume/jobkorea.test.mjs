import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  isJobkoreaResume,
  listVersions,
  readVersion,
  saveVersion,
} from "../../lib/resume/versions.ts";

function jobkorea(overrides = {}) {
  return {
    title: "영업관리 경력",
    basic: {
      name: "홍길동",
      gender: "남",
      birthYear: "1985",
      phone: "",
      email: "hong@example.com",
      address: "",
    },
    skills: ["ERP"],
    education: [
      {
        school: "가나대학교",
        level: "대학교(4년)",
        start: "2003.03",
        end: "2010.03",
        status: "졸업",
        major: "정보통신공학부",
        gpa: "3.2 / 4.5",
      },
    ],
    careers: [
      {
        company: "가나제약",
        start: "2025.03",
        end: null,
        department: "영업관리팀",
        position: "과장",
        title: "파트장",
        job: "영업관리",
        salary: "",
        duty: "판매관리",
      },
    ],
    activities: "",
    certificates: "",
    careerDescription: { title: "경력기술서", body: "본문" },
    coverLetter: [{ title: "제목", body: "본문" }],
    portfolio: [{ label: "포트폴리오", url: "https://example.com" }],
    preference: {
      employmentType: "정규직",
      location: "서울전지역",
      salary: "면접 후 결정",
      jobs: "영업관리",
      industries: "제약·보건·바이오",
    },
    ...overrides,
  };
}

const SARAMIN_LIKE = {
  basic: { name: "홍길동" },
  myCareer: "소개",
  careers: [],
};

test("잡코리아 버전은 사람인과 다른 폴더에 쌓이고 서로의 목록에 섞이지 않는다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-jk-"));
  const saved = await saveVersion(
    dir,
    jobkorea(),
    "잡코리아 현재본",
    new Date("2026-10-31T03:00:00Z"),
    "jobkorea",
  );
  assert.deepEqual(await readdir(dir), ["jobkorea-versions"]);
  assert.deepEqual(await listVersions(dir), [], "사람인 목록에는 없다");
  assert.deepEqual(
    (await listVersions(dir, "jobkorea")).map((v) => v.id),
    [saved.id],
  );
  assert.equal(
    (await readVersion(dir, saved.id, "jobkorea")).resume.preference.salary,
    "면접 후 결정",
  );
  assert.equal(
    await readVersion(dir, saved.id),
    null,
    "사람인으로는 못 읽는다",
  );
});

test("잡코리아 형식은 사람인 형식과 칸이 빠진 값을 받지 않는다", async () => {
  assert.equal(isJobkoreaResume(jobkorea()), true);
  assert.equal(isJobkoreaResume(SARAMIN_LIKE), false);
  assert.equal(
    isJobkoreaResume(jobkorea({ preference: { jobs: "영업관리" } })),
    false,
  );
  const career = { ...jobkorea().careers[0] };
  delete career.salary;
  assert.equal(isJobkoreaResume(jobkorea({ careers: [career] })), false);

  const dir = await mkdtemp(path.join(tmpdir(), "resume-jk-"));
  await assert.rejects(
    saveVersion(dir, SARAMIN_LIKE, "섞임", new Date(), "jobkorea"),
    /이력서 형식/,
  );
  await assert.rejects(saveVersion(dir, jobkorea(), "섞임"), /이력서 형식/);
});
