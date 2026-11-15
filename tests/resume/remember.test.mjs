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
  isRememberResume,
  listVersions,
  readVersion,
  saveVersion,
} from "../../lib/resume/versions.ts";
import { safeReturnTo } from "../../lib/selected-portfolio/workspace.ts";

function remember(overrides = {}) {
  return {
    basic: { name: "홍길동" },
    intro: { basic: "한 줄 소개", detail: "긴 소개" },
    careers: [
      {
        company: "가나제약",
        department: "영업관리팀",
        position: "과장",
        start: "2025.03",
        end: null,
        detail: "판매관리",
      },
    ],
    education: [
      {
        school: "가나대학교",
        degree: "학사",
        major: "정보통신공학부",
        start: "2003",
        end: "2011",
      },
    ],
    jobs: ["풀스택"],
    skills: ["ERP"],
    languages: "",
    websites: ["https://example.com"],
    lectures: "",
    publications: "",
    articles: "",
    awards: "",
    certificates: "",
    ...overrides,
  };
}

test("리멤버 버전은 자기 폴더에 쌓이고 다른 사이트 목록에 섞이지 않는다", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-rm-"));
  const saved = await saveVersion(
    dir,
    remember(),
    "리멤버 현재본",
    new Date("2026-11-15T03:00:00Z"),
    "remember",
  );
  assert.deepEqual(await readdir(dir), ["remember-versions"]);
  assert.deepEqual(await listVersions(dir), []);
  assert.deepEqual(await listVersions(dir, "jobkorea"), []);
  assert.deepEqual(
    (await listVersions(dir, "remember")).map((v) => v.id),
    [saved.id],
  );
  assert.equal(
    (await readVersion(dir, saved.id, "remember")).resume.careers[0].detail,
    "판매관리",
  );
  assert.equal(await readVersion(dir, saved.id, "jobkorea"), null);
});

test("리멤버 형식은 칸이 빠진 값과 다른 사이트 형식을 받지 않는다", async () => {
  assert.equal(isRememberResume(remember()), true);
  assert.equal(isRememberResume(remember({ intro: { basic: "소개" } })), false);
  assert.equal(isRememberResume(remember({ jobs: "풀스택" })), false);
  const career = { ...remember().careers[0] };
  delete career.department;
  assert.equal(isRememberResume(remember({ careers: [career] })), false);
  const { awards: _awards, ...withoutAwards } = remember();
  assert.equal(isRememberResume(withoutAwards), false);

  const dir = await mkdtemp(path.join(tmpdir(), "resume-rm-"));
  await assert.rejects(
    saveVersion(dir, remember(), "섞임", new Date(), "jobkorea"),
    /이력서 형식/,
  );
});

test("리멤버는 주소로 고르고 로그인 뒤에도 그 화면으로 돌아오며 제출 파일이 없다", () => {
  assert.equal(parsePlatform("remember"), "remember");
  assert.equal(parsePlatform("constructor"), "saramin");
  assert.equal(
    resumeHref("remember", "saved-1"),
    "/resume?p=remember&v=saved-1",
  );
  assert.equal(
    safeReturnTo("/ax?manage=resume&p=remember&v=saved_1"),
    "/ax?manage=resume&p=remember&v=saved_1",
  );
  assert.equal(safeReturnTo("/?manage=resume&p=unknown"), "/?manage=resume");
  assert.equal(hasFiles("remember"), false);
  assert.equal(hasFiles("jobkorea"), true);
});
