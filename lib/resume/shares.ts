import { randomBytes } from "node:crypto";
import {
  mkdir,
  readdir,
  readFile,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import type { DocKind } from "./document.ts";
import type { FileFormat } from "./files.ts";
import type { ResumePlatform } from "./types.ts";

export interface ShareSummary {
  token: string;
  platform: ResumePlatform;
  versionId: string;
  kind: DocKind;
  format: FileFormat;
  createdAt: string;
  fileName: string;
}
interface StoredShare extends ShareSummary {
  contentType: string;
  base64: string;
}
const TOKEN = /^[0-9a-f]{64}$/;
const missing = (error: unknown) =>
  (error as NodeJS.ErrnoException).code === "ENOENT";

/** 파일과 설명을 한 번에 게시한다. 원본/양식 변경 뒤에도 제출한 바이트는 바뀌지 않는다. */
export async function createShare(
  dir: string,
  input: Omit<ShareSummary, "token" | "createdAt" | "fileName">,
  file: { fileName: string; contentType: string; body: Buffer },
): Promise<ShareSummary> {
  const token = randomBytes(32).toString("hex");
  const summary = {
    ...input,
    token,
    createdAt: new Date().toISOString(),
    fileName: file.fileName,
  };
  const folder = path.join(dir, "shares");
  await mkdir(folder, { recursive: true, mode: 0o700 });
  const target = path.join(folder, `${token}.json`);
  const temp = `${target}.tmp`;
  try {
    await writeFile(
      temp,
      JSON.stringify({
        ...summary,
        contentType: file.contentType,
        base64: file.body.toString("base64"),
      }),
      { mode: 0o600, flag: "wx" },
    );
    await rename(temp, target);
  } catch (error) {
    await unlink(temp).catch(() => undefined);
    throw error;
  }
  return summary;
}

export async function readShare(
  dir: string,
  token: string,
): Promise<StoredShare | null> {
  if (!TOKEN.test(token)) return null;
  try {
    return JSON.parse(
      await readFile(path.join(dir, "shares", `${token}.json`), "utf8"),
    ) as StoredShare;
  } catch (error) {
    if (missing(error)) return null;
    throw error;
  }
}

export async function listShares(
  dir: string,
  platform: ResumePlatform,
  versionId: string,
): Promise<ShareSummary[]> {
  let names: string[];
  try {
    names = await readdir(path.join(dir, "shares"));
  } catch (error) {
    if (missing(error)) return [];
    throw error;
  }
  const result: ShareSummary[] = [];
  // shortcut: 개인 제출용 소량 파일. 수천 건 이상 보관 시 설명과 본문을 나눠 색인한다.
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    const share = await readShare(dir, name.slice(0, -5));
    if (share?.platform === platform && share.versionId === versionId) {
      const { base64: _body, contentType: _type, ...summary } = share;
      result.push(summary);
    }
  }
  return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function revokeShare(dir: string, token: string): Promise<void> {
  if (!TOKEN.test(token)) throw new Error("올바른 공유 링크가 아닙니다.");
  try {
    await unlink(path.join(dir, "shares", `${token}.json`));
  } catch (error) {
    if (!missing(error)) throw error;
  }
}
