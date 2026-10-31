import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  LineRuleType,
  PageNumber,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

import { KIND_NAMES, type DocBlock, type ResumeDocument } from "./document.ts";

const FONT = "Noto Sans CJK KR";
const INK = "182D40";
const ACCENT = "245D75";

function textRuns(text: string) {
  return text
    .split(/(https?:\/\/[^\s]+)/g)
    .filter(Boolean)
    .map((part) =>
      /^https?:\/\//.test(part)
        ? new ExternalHyperlink({
            link: part,
            children: [new TextRun({ text: part, style: "Hyperlink" })],
          })
        : new TextRun(part),
    );
}

async function toParagraph(block: DocBlock): Promise<Paragraph> {
  const common = { pageBreakBefore: block.pageBreakBefore, widowControl: true };
  switch (block.kind) {
    case "title":
      return new Paragraph({
        ...common,
        text: block.text,
        heading: HeadingLevel.TITLE,
      });
    case "heading":
      return new Paragraph({
        ...common,
        text: block.text,
        heading: HeadingLevel.HEADING_1,
        border: {
          bottom: {
            color: "C7D5DE",
            style: BorderStyle.SINGLE,
            size: 5,
            space: 6,
          },
        },
      });
    case "subheading":
      return new Paragraph({
        ...common,
        text: block.text,
        heading: HeadingLevel.HEADING_2,
      });
    case "bullet":
      return new Paragraph({
        ...common,
        children: textRuns(block.text),
        bullet: { level: 0 },
      });
    case "image": {
      // 이미지 경로는 공개 사례 원본에서만 온다. 사용자 입력·외부 URL은 읽지 않는다.
      if (
        !block.imagePath?.startsWith("/images/portfolio/") ||
        block.imagePath.includes("..")
      )
        throw new Error("잘못된 사례 이미지 경로");
      const input = await readFile(
        path.join(process.cwd(), "public", block.imagePath),
      );
      const { data, info } = await sharp(input)
        .resize({ width: 1200, withoutEnlargement: true })
        .png()
        .toBuffer({ resolveWithObject: true });
      return new Paragraph({
        ...common,
        spacing: {
          before: 200,
          after: 100,
          line: 240,
          lineRule: LineRuleType.AUTO,
        },
        keepNext: true,
        children: [
          new ImageRun({
            type: "png",
            data,
            transformation: {
              width: block.imageWidth ?? 360,
              height: Math.round(
                ((block.imageWidth ?? 360) * info.height) / info.width,
              ),
            },
            altText: {
              title: block.text,
              description: block.text,
              name: block.text,
            },
          }),
        ],
      });
    }
    case "paragraph":
      return new Paragraph({ ...common, children: textRuns(block.text) });
  }
}

/** A4 제출 양식. 이력서·경력기술서는 텍스트 한 단, 사례집만 공개 화면을 포함한다. */
export async function toDocx(document: ResumeDocument): Promise<Buffer> {
  const title = document.blocks.find((block) => block.kind === "title");
  const label = document.kind ? KIND_NAMES[document.kind] : "지원 서류";
  // 사례 이미지를 동시에 디코딩하지 않아 생성 중 메모리 사용을 제한한다.
  const children: Paragraph[] = [];
  for (const block of document.blocks) children.push(await toParagraph(block));
  const doc = new Document({
    title: title?.text,
    creator: document.author,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 20, color: INK },
          paragraph: {
            spacing: { after: 110, line: 300, lineRule: LineRuleType.AUTO },
          },
        },
        title: {
          run: { font: FONT, size: 38, bold: true, color: INK },
          paragraph: {
            spacing: {
              before: 120,
              after: 260,
              line: 290,
              lineRule: LineRuleType.AUTO,
            },
            keepNext: true,
          },
        },
        heading1: {
          run: { font: FONT, size: 25, bold: true, color: ACCENT },
          paragraph: { spacing: { before: 300, after: 170 }, keepNext: true },
        },
        heading2: {
          run: { font: FONT, size: 21, bold: true, color: INK },
          paragraph: { spacing: { before: 200, after: 100 }, keepNext: true },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: {
              top: 1134,
              bottom: 1134,
              left: 1134,
              right: 1134,
              header: 500,
              footer: 500,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: [document.author, label]
                      .filter(Boolean)
                      .join("  |  "),
                    color: "586575",
                    size: 17,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    children: [
                      PageNumber.CURRENT,
                      " / ",
                      PageNumber.TOTAL_PAGES,
                    ],
                    size: 17,
                    color: "586575",
                  }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });
  return Packer.toBuffer(doc);
}
