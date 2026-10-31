import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { toDocx } from "./docx.ts";
import type { ResumeDocument } from "./document.ts";

export type FileFormat = "docx" | "pdf";
export const MIME = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
};
export const PRIVATE_FILE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};
export const parseFileFormat = (value: unknown): FileFormat | null =>
  value === "pdf" || value === "docx" ? value : null;

const execFileAsync = promisify(execFile);
// shortcut: 한 프로세스에서 PDF 한 건씩 변환. 다중 인스턴스 배포 시 외부 작업 대기열로 옮긴다.
let pdfQueue: Promise<unknown> = Promise.resolve();
async function pdfFromDocx(bytes: Buffer): Promise<Buffer> {
  const task = pdfQueue.then(async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "ref-resume-"));
    try {
      const input = path.join(dir, "document.docx");
      await writeFile(input, bytes, { mode: 0o600 });
      await execFileAsync(
        "/usr/bin/libreoffice",
        [
          `-env:UserInstallation=${pathToFileURL(path.join(dir, "profile")).href}`,
          "--headless",
          "--convert-to",
          "pdf:writer_pdf_Export",
          "--outdir",
          dir,
          input,
        ],
        { timeout: 60_000, maxBuffer: 64 * 1024 },
      );
      const pdf = await readFile(path.join(dir, "document.pdf"));
      if (pdf.subarray(0, 5).toString() !== "%PDF-")
        throw new Error("PDF 변환 결과가 올바르지 않습니다.");
      return pdf;
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
  pdfQueue = task.catch(() => undefined);
  return task;
}

export async function renderFile(document: ResumeDocument, format: FileFormat) {
  const docx = await toDocx(document);
  return {
    fileName: document.fileName.replace(/\.docx$/, `.${format}`),
    contentType: MIME[format],
    body: format === "pdf" ? await pdfFromDocx(docx) : docx,
  };
}

export function fileResponse(file: {
  body: Buffer;
  fileName: string;
  contentType: string;
}) {
  return new Response(new Uint8Array(file.body), {
    headers: {
      ...PRIVATE_FILE_HEADERS,
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="document.${file.contentType === MIME.pdf ? "pdf" : "docx"}"; filename*=UTF-8''${encodeURIComponent(file.fileName)}`,
    },
  });
}
