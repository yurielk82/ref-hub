import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  careerMonths,
  changedPaths,
  isResume,
  listVersions,
  monthsLabel,
  readVersion,
  resumeDataDir,
  saveVersion,
} from "../../lib/resume/versions.ts";

function resume(overrides = {}) {
  return {
    basic: {
      name: "홍길동",
      careerType: "경력",
      gender: "남",
      birthYear: "1985",
      email: "hong@example.com",
      phone: "",
      address: "",
    },
    myCareer: "소개",
    careers: [
      {
        company: "가나제약",
        start: "2025.03",
        end: null,
        job: "유통관리",
        role: "영업관리팀 과장",
        duty: "판매관리",
        leaveReason: "",
      },
    ],
    education: [],
    skills: ["ERP"],
    portfolio: [{ label: "포트폴리오", url: "https://example.com" }],
    careerDescription: { title: "경력기술서", body: "본문" },
    coverLetter: [{ title: "제목", body: "본문" }],
    ...overrides,
  };
}

test("버전은 새 파일로 쌓이고 최근 순으로 나온다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-"));
  assert.deepEqual(await listVersions(dir), []);

  const first = await saveVersion(
    dir,
    resume(),
    "사람인 현재본",
    new Date("2026-10-31T01:00:00Z"),
  );
  const second = await saveVersion(
    dir,
    resume({ myCareer: "바뀐 소개" }),
    "",
    new Date("2026-10-31T02:30:00Z"),
  );
  assert.match(
    first.id,
    /^20261031-100000-[0-9a-f]{6}$/,
    "KST 시각으로 이름을 짓는다",
  );

  const list = await listVersions(dir);
  assert.deepEqual(
    list.map((v) => v.id),
    [second.id, first.id],
  );
  assert.equal(list[1].label, "사람인 현재본");
  assert.equal(list[0].label, "이름 없는 버전");

  const read = await readVersion(dir, first.id);
  assert.equal(read.resume.myCareer, "소개");

  const files = await readdir(path.join(dir, "versions"));
  assert.equal(files.length, 2, "임시 파일을 남기지 않는다");
  const mode = (await stat(path.join(dir, "versions", files[0]))).mode & 0o777;
  assert.equal(mode, 0o600, "본인만 읽는 파일로 쓴다");
});

test("형식이 아니거나 경로를 벗어나는 id는 읽지도 쓰지도 않는다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-"));
  assert.equal(await readVersion(dir, "../../etc/passwd"), null);
  assert.equal(await readVersion(dir, "20261031-100000-abcdef"), null);
  await assert.rejects(saveVersion(dir, { basic: {} }, "x"));
  assert.equal(isResume(resume({ skills: [1] })), false);
  await assert.rejects(
    saveVersion(dir, resume({ myCareer: "가".repeat(100_000) }), "x"),
    /너무 큽니다/,
  );
});

test("이전 버전과 달라진 칸의 경로만 고른다", () => {
  const before = resume();
  const after = resume({
    myCareer: "바뀐 소개",
    careers: [{ ...before.careers[0], duty: "판매관리·CSO" }],
    skills: ["ERP", "SQL"],
  });
  assert.deepEqual([...changedPaths(before, after)].sort(), [
    "careers.0.duty",
    "myCareer",
    "skills.1",
  ]);
  assert.equal(changedPaths(null, after).size, 0);
});

test("근무 기간은 사람인처럼 시작·끝 달을 모두 센다", () => {
  assert.equal(careerMonths("2024.08", "2025.02"), 7);
  assert.equal(careerMonths("2020.03", "2023.01"), 35);
  assert.equal(careerMonths("2025.03", null, new Date(2026, 9, 31)), 20);
  assert.equal(monthsLabel(20), "1년 8개월");
  assert.equal(monthsLabel(7), "7개월");
  assert.equal(monthsLabel(147), "12년 3개월");
  assert.equal(monthsLabel(24), "2년");
});

test("폴더 지정이 없으면 공고 저장 폴더 옆 resume 폴더를 쓴다", () => {
  const saved = { ...process.env };
  try {
    delete process.env.RESUME_DATA_DIR;
    process.env.JOBS_DATA_DIR = "/data/ref-hub/jobs";
    assert.equal(resumeDataDir(), "/data/ref-hub/resume");
    process.env.RESUME_DATA_DIR = "/private/resume";
    assert.equal(resumeDataDir(), "/private/resume");
    delete process.env.RESUME_DATA_DIR;
    delete process.env.JOBS_DATA_DIR;
    assert.equal(resumeDataDir(), null);
  } finally {
    process.env = saved;
  }
});
