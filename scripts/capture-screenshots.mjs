/**
 * 검토한 콘텐츠 캡처를 두 포트폴리오에 함께 반영한다. 로컬 파일만 읽는다.
 * node scripts/capture-screenshots.mjs --manifest FILE [--apply] [--allow-pending]
 */
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { dirname, resolve, relative, posix } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { validatePortfolio } from "./selected-portfolio/schema.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const options = new Map();
for (let index = 0; index < args.length; index++) {
  const arg = args[index];
  if (arg === "--apply" || arg === "--allow-pending") options.set(arg, true);
  else if (arg === "--manifest" || arg === "--baseline") {
    if (!args[index + 1] || args[index + 1].startsWith("--"))
      throw new Error(`${arg}: 파일 경로가 필요합니다.`);
    options.set(arg, args[++index]);
  } else throw new Error(`알 수 없는 인수: ${arg}`);
}
if (!options.has("--manifest"))
  throw new Error(
    "사용: node scripts/capture-screenshots.mjs --manifest FILE [--apply] [--allow-pending]",
  );
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const fail = (condition, message) => {
  if (!condition) throw new Error(message);
};
const manifestFile = resolve(options.get("--manifest"));
const manifest = await readJson(manifestFile);
const baseline = await readJson(
  resolve(
    root,
    options.get("--baseline") || "docs/quality/portfolio-captures.json",
  ),
);
const originals = new Map(
  (Array.isArray(baseline) ? baseline : baseline.entries).map((entry) => [
    entry.originalSrc || entry.src,
    entry,
  ]),
);
fail(
  manifest.version === 1 && Array.isArray(manifest.entries),
  "manifest version/entries가 올바르지 않습니다.",
);
fail(
  originals.size === 59 && manifest.entries.length === 59,
  "원본 59개 전체의 상태가 필요합니다.",
);
const seen = new Set(),
  captures = [],
  pending = [];
const sourceKinds = new Set([
  "actual-bin-ui-with-synthetic-responses",
  "deployed-public-document",
  "actual-command-output",
  "isolated-original-components",
  "deployed-original-ui-anonymized",
  "deployed-original-ui",
  "deployed-original-static-guide",
  "original-component-synthetic-fixture",
  "deployed-build-readonly",
]);
for (const entry of manifest.entries) {
  const original = originals.get(entry.originalSrc);
  fail(
    original &&
      original.project === entry.project &&
      !seen.has(entry.originalSrc),
    `중복되거나 알려지지 않은 원본: ${entry.originalSrc}`,
  );
  seen.add(entry.originalSrc);
  entry.originalSha256 = original.originalSha256 || original.sha256;
  fail(
    /^[a-f0-9]{64}$/.test(entry.originalSha256),
    "원본 파일 해시가 없습니다.",
  );
  fail(
    entry.status === "ready" || entry.status === "pending",
    `잘못된 상태: ${entry.originalSrc}`,
  );
  if (entry.status === "pending") {
    fail(!entry.captures?.length, "대기 원본에 캡처가 들어 있습니다.");
    pending.push(entry.originalSrc);
    continue;
  }
  fail(entry.captures?.length > 0, `새 캡처가 없습니다: ${entry.originalSrc}`);
  for (const capture of entry.captures) {
    fail(
      [capture.title, capture.caption, capture.note].every(
        (value) => typeof value === "string" && value.trim().length > 0,
      ),
      `제목·설명·주석은 비어 있지 않은 문자열이어야 합니다: ${entry.originalSrc}`,
    );
    fail(
      sourceKinds.has(capture.source?.kind),
      `촬영 출처가 없습니다: ${entry.originalSrc}`,
    );
    fail(
      capture.verification?.reviewed === true &&
        capture.verification?.sidebarExcluded === true &&
        Array.isArray(capture.verification?.errors) &&
        capture.verification.errors.length === 0,
      `검토 미완료 또는 촬영 오류: ${entry.originalSrc}`,
    );
    const file = resolve(dirname(manifestFile), capture.file);
    const bytes = await readFile(file);
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    const image = await sharp(bytes).metadata();
    fail(
      image.format === "webp" &&
        image.width === capture.width &&
        image.height === capture.height,
      `파일 형식/크기 불일치: ${file}`,
    );
    fail(sha256 === capture.sha256, `파일 해시 불일치: ${file}`);
    fail(
      sha256 !== entry.originalSha256,
      `이전 이미지가 재사용됐습니다: ${file}`,
    );
    const folder = posix.dirname(entry.originalSrc);
    const basename =
      capture.basename || posix.basename(entry.originalSrc, ".webp");
    fail(
      /^[a-z0-9-]+$/.test(basename) &&
        folder.startsWith("/assets/selected-portfolio/images/") &&
        !folder.includes(".."),
      `잘못된 출력 경로: ${basename}`,
    );
    capture.src = `${folder}/${basename}-content-${sha256.slice(0, 12)}.webp`;
    capture.absoluteFile = file;
    captures.push(capture);
  }
}
fail(seen.size === originals.size, "원본 coverage가 일치하지 않습니다.");
fail(
  options.has("--allow-pending") || pending.length === 0,
  `아직 ${pending.length}개 원본이 대기 중입니다. 부분 반영은 --allow-pending을 사용하세요.`,
);
fail(
  new Set(captures.map((capture) => capture.src)).size === captures.length,
  "새 이미지 URL이 중복됩니다.",
);
const tracks = [];
for (const name of ["portfolio.json", "portfolio-ax.json"]) {
  const file = resolve(root, "data/selected-portfolio", name);
  const data = await readJson(file);
  const replacements = new Map(),
    applied = new Set(),
    extras = new Set();
  for (const entry of manifest.entries.filter(
    (entry) => entry.status === "ready",
  )) {
    replacements.set(entry.originalSrc, entry);
    replacements.set(entry.captures[0].src, entry);
    for (const capture of entry.captures.slice(1)) extras.add(capture.src);
  }
  for (const project of data.projects) {
    for (const section of project.sections) {
      if (!section.screens) continue;
      section.screens = section.screens.flatMap((screen) => {
        if (extras.has(screen.src)) return [];
        const entry = replacements.get(screen.src);
        if (!entry) return [screen];
        fail(
          entry.project === project.id && !applied.has(entry.originalSrc),
          `원본 위치 중복/불일치: ${name} ${entry.originalSrc}`,
        );
        applied.add(entry.originalSrc);
        return entry.captures.map(
          ({ src, title, caption, note, width, height }) => ({
            src,
            title,
            caption,
            note,
            width,
            height,
          }),
        );
      });
    }
  }
  fail(
    applied.size === manifest.entries.length - pending.length,
    `${name}: 원본 위치를 모두 찾지 못했습니다.`,
  );
  for (const update of manifest.sectionUpdates || []) {
    const project = data.projects.find((item) => item.id === update.project);
    fail(
      project?.sections[update.section] && typeof update.body === "string",
      "본문 수정 위치가 잘못됐습니다.",
    );
    project.sections[update.section].body = update.body;
  }
  const errors = validatePortfolio(data);
  fail(errors.length === 0, `${name}: ${errors.join("\n")}`);
  tracks.push({ file, data });
}
const publicManifest = {
  version: 1,
  originalCount: originals.size,
  replacedOriginalCount: originals.size - pending.length,
  imageCount: captures.length,
  pending,
  entries: manifest.entries.map(
    ({ originalSrc, originalSha256, project, status, captures = [] }) => ({
      originalSrc,
      originalSha256,
      project,
      status,
      captures: captures.map(
        ({
          src,
          title,
          caption,
          note,
          width,
          height,
          sha256,
          source,
          verification,
        }) => ({
          src,
          title,
          caption,
          note,
          width,
          height,
          sha256,
          source: Object.fromEntries(
            ["kind", "route", "revision"]
              .filter((key) => source[key])
              .map((key) => [key, source[key]]),
          ),
          verification: {
            reviewed: verification.reviewed,
            sidebarExcluded: verification.sidebarExcluded,
            errors: verification.errors,
          },
        }),
      ),
    }),
  ),
};
const publicText = JSON.stringify(publicManifest, null, 2) + "\n";
fail(
  !/\/home\/|\/tmp\/|access_token|refresh_token|Bearer\s|@/.test(publicText),
  "공개 기록에 비공개 경로/인증 정보가 있습니다.",
);
if (options.has("--apply")) {
  for (const capture of captures) {
    const output = resolve(root, "public", capture.src.slice(1));
    fail(
      !relative(resolve(root, "public"), output).startsWith(".."),
      "public 밖 출력은 허용하지 않습니다.",
    );
    await mkdir(dirname(output), { recursive: true });
    await copyFile(capture.absoluteFile, output);
  }
  for (const { file, data } of tracks)
    await writeFile(file, JSON.stringify(data, null, 2) + "\n");
  const auditFile = resolve(root, "docs/quality/portfolio-captures.json");
  await mkdir(dirname(auditFile), { recursive: true });
  await writeFile(auditFile, publicText);
}
console.log(
  JSON.stringify({
    mode: options.has("--apply") ? "applied" : "checked",
    originals: originals.size,
    replacedOriginals: originals.size - pending.length,
    images: captures.length,
    pending: pending.length,
    tracks: tracks.length,
  }),
);
