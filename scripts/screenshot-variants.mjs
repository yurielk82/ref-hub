/**
 * 포트폴리오 캡처마다 본문 표시용 1600px 사본(`<이름>.w1600.webp`)을 만든다.
 * 원본(3000px 이상)은 확대 창에서만 받고, 본문 목록은 srcset 으로 이 사본을 고른다.
 * 휴대폰 390px·3배 화면의 표시 픽셀(약 1044px)보다 크고, 원본의 수 MB 를 받지 않게 한다.
 * 이미 있는 사본은 건너뛴다. node scripts/screenshot-variants.mjs
 */
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const VARIANT_WIDTH = 1600;
export const variantPath = (src) =>
  src.replace(/\.webp$/, `.w${VARIANT_WIDTH}.webp`);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export async function writeVariants() {
  const sources = new Set();
  for (const name of ["portfolio.json", "portfolio-ax.json"]) {
    const data = JSON.parse(
      await readFile(resolve(root, "data/selected-portfolio", name), "utf8"),
    );
    for (const project of data.projects)
      for (const section of project.sections)
        for (const screen of section.screens ?? [])
          if (screen.width > VARIANT_WIDTH) sources.add(screen.src);
  }
  let created = 0;
  for (const src of sources) {
    const output = resolve(root, "public", variantPath(src).slice(1));
    const exists = await access(output).then(
      () => true,
      () => false,
    );
    if (exists) continue;
    await sharp(resolve(root, "public", src.slice(1)))
      .resize({ width: VARIANT_WIDTH, withoutEnlargement: true })
      .webp({ quality: 86, effort: 5 })
      .toFile(output);
    created++;
  }
  return { sources: sources.size, created };
}

if (process.argv[1] === fileURLToPath(import.meta.url))
  console.log(JSON.stringify(await writeVariants()));
