import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  hasFiles,
  parsePlatform,
  resumeHref,
} from "../../lib/resume/platforms.ts";
import {
  isWantedResume,
  listVersions,
  readVersion,
  saveVersion,
} from "../../lib/resume/versions.ts";

function wanted(overrides = {}) {
  return {
    basic: { name: "홍길동", phone: "", email: "hong@example.com" },
    intro: "간단 소개",
    careers: [
      {
        company: "가나제약",
        start: "2025.03",
        end: null,
        job: "영업관리",
        position: "과장",
        achievements: [
          {
            title: "보고 자동화",
            start: "2026.03",
            end: "2026.11",
            job: "업무 분석",
            position: "과장",
            detail: "월 보고서 자동 생성",
          },
        ],
      },
    ],
    education: [
      {
        school: "가나대학교",
        start: "2003.03",
        end: "2008.12",
        major: "정보통신공학부",
        detail: "C/C++",
      },
    ],
    aiExperience: "",
    skills: ["Python"],
    awards: "",
    languages: "",
    links: [{ label: "레퍼런스", url: "https://example.com" }],
    ...overrides,
  };
}

test("원티드 버전은 자기 폴더에 쌓이고 다른 사이트 목록에 섞이지 않는다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-wt-"));
  const saved = await saveVersion(
    dir,
    wanted(),
    "원티드 현재본",
    new Date("2026-11-15T03:00:00Z"),
    "wanted",
  );
  assert.deepEqual(await readdir(dir), ["wanted-versions"]);
  assert.deepEqual(await listVersions(dir), []);
  assert.deepEqual(await listVersions(dir, "remember"), []);
  assert.equal(
    (await readVersion(dir, saved.id, "wanted")).resume.careers[0]
      .achievements[0].title,
    "보고 자동화",
  );
  assert.equal(await readVersion(dir, saved.id, "remember"), null);
});

test("원티드 형식은 주요 성과 칸이 빠진 값을 받지 않는다", () => {
  assert.equal(isWantedResume(wanted()), true);
  const career = structuredClone(wanted().careers[0]);
  delete career.achievements[0].detail;
  assert.equal(isWantedResume(wanted({ careers: [career] })), false);
  const bare = structuredClone(wanted().careers[0]);
  delete bare.achievements;
  assert.equal(isWantedResume(wanted({ careers: [bare] })), false);
  assert.equal(
    isWantedResume(wanted({ links: ["https://example.com"] })),
    false,
  );
});

test("원티드는 주소로 고르고 제출 파일이 없다", () => {
  assert.equal(parsePlatform("wanted"), "wanted");
  assert.equal(resumeHref("wanted", "saved-1"), "/resume?p=wanted&v=saved-1");
  assert.equal(hasFiles("wanted"), false);
  assert.equal(hasFiles("saramin"), true);
});
