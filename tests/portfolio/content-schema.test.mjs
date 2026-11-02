import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "../helpers.mjs";
import { validatePortfolio } from "../../scripts/selected-portfolio/schema.mjs";

// 빌드는 lib/selected-portfolio/content.ts에서 같은 검사를 돌리고 실패하면 멈춘다(2026-11-02 배포 실패).
for (const name of ["portfolio.json", "portfolio-ax.json"]) {
  test(`${name} passes the portfolio content schema the build enforces`, () => {
    const data = JSON.parse(
      readFileSync(path.join(ROOT, "data/selected-portfolio", name), "utf8"),
    );
    assert.deepEqual(validatePortfolio(data), []);
  });
}

test("highlights must be a list of non-empty strings", () => {
  const data = JSON.parse(
    readFileSync(
      path.join(ROOT, "data/selected-portfolio/portfolio.json"),
      "utf8",
    ),
  );
  data.profile.highlights = ["성과 — 근거", 3];
  assert.ok(
    validatePortfolio(data).some((e) => e.startsWith("profile.highlights")),
  );
});

test("lead must name one of the project's own captures", () => {
  const data = JSON.parse(
    readFileSync(
      path.join(ROOT, "data/selected-portfolio/portfolio.json"),
      "utf8",
    ),
  );
  data.projects[0].lead = "/assets/selected-portfolio/images/none.webp";
  assert.ok(
    validatePortfolio(data).some((e) => e.startsWith("projects[0].lead")),
  );
});
