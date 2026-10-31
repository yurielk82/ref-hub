import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

import type { DocBlock, ResumeDocument } from "./document.ts";

/** 사람인 파일 변환이 글자를 그대로 읽도록 표·그림 없이 제목·문단·글머리표만 쓴다. */
const FONT = "맑은 고딕";

function toParagraph(block: DocBlock): Paragraph {
  switch (block.kind) {
    case "title":
      return new Paragraph({ text: block.text, heading: HeadingLevel.TITLE });
    case "heading":
      return new Paragraph({
        text: block.text,
        heading: HeadingLevel.HEADING_1,
      });
    case "subheading":
      return new Paragraph({
        text: block.text,
        heading: HeadingLevel.HEADING_2,
      });
    case "bullet":
      return new Paragraph({ text: block.text, bullet: { level: 0 } });
    case "paragraph":
      return new Paragraph({ children: [new TextRun(block.text)] });
  }
}

export async function toDocx(document: ResumeDocument): Promise<Buffer> {
  const title = document.blocks.find((block) => block.kind === "title");
  const doc = new Document({
    title: title?.text,
    styles: {
      default: {
        document: { run: { font: FONT, size: 21 } },
        title: { run: { font: FONT, size: 32, bold: true } },
        heading1: {
          run: { font: FONT, size: 26, bold: true },
          paragraph: { spacing: { before: 280, after: 120 } },
        },
        heading2: {
          run: { font: FONT, size: 22, bold: true },
          paragraph: { spacing: { before: 200, after: 80 } },
        },
      },
    },
    sections: [{ children: document.blocks.map(toParagraph) }],
  });
  return Packer.toBuffer(doc);
}
