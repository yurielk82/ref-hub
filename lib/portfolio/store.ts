import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export interface ContentSnapshot {
  revision: string;
  savedAt: string | null;
  values: Record<string, string>;
}
export interface CopyField {
  id: string;
  label: string;
  group: string;
  value: string;
  maxLength: number;
  multiline?: boolean;
}
export class ContentError extends Error {}
const MAX_BYTES = 200_000;
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export async function readContent(dir: string): Promise<ContentSnapshot> {
  let raw: string;
  try {
    raw = await readFile(path.join(dir, "current.json"), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return { revision: "initial", savedAt: null, values: {} };
    throw error;
  }
  const value: unknown = JSON.parse(raw);
  if (
    Buffer.byteLength(raw) > MAX_BYTES ||
    !record(value) ||
    typeof value.revision !== "string" ||
    typeof value.savedAt !== "string" ||
    !record(value.values) ||
    !Object.values(value.values).every((v) => typeof v === "string")
  )
    throw new Error("저장된 홈페이지 문구의 형식을 확인해 주세요.");
  return value as unknown as ContentSnapshot;
}

// shortcut: 현재 운영은 단일 Node 프로세스다. 다중 인스턴스 도입 시 저장소의 조건부 쓰기로 바꾼다.
let writes: Promise<unknown> = Promise.resolve();
export function saveContent(
  dir: string,
  input: unknown,
  fields: readonly CopyField[],
): Promise<ContentSnapshot> {
  const task = writes.then(() => writeContent(dir, input, fields));
  writes = task.catch(() => undefined);
  return task;
}

async function writeContent(
  dir: string,
  input: unknown,
  fields: readonly CopyField[],
): Promise<ContentSnapshot> {
  if (
    !record(input) ||
    typeof input.revision !== "string" ||
    !record(input.changes)
  )
    throw new ContentError("저장할 내용을 확인해 주세요.");
  const definitions = new Map(fields.map((field) => [field.id, field]));
  const changes: Record<string, string> = {};
  for (const [key, value] of Object.entries(input.changes)) {
    const field = definitions.get(key);
    if (!field || typeof value !== "string")
      throw new ContentError("수정할 수 없는 항목이 포함돼 있습니다.");
    const text = value.trim();
    if (!text || text.length > field.maxLength)
      throw new ContentError(
        `${field.label}: 1~${field.maxLength}자로 입력해 주세요.`,
      );
    changes[key] = text;
  }
  const current = await readContent(dir);
  if (input.revision !== current.revision)
    throw new ContentError(
      "다른 창에서 저장한 내용이 있습니다. 수정한 글을 복사한 뒤 ‘수정 취소’ → 새로고침 → 다시 붙여넣기 순서로 진행해 주세요.",
    );
  if (Object.keys(changes).length === 0) return current;
  const next: ContentSnapshot = {
    revision: randomUUID(),
    savedAt: new Date().toISOString(),
    values: { ...current.values, ...changes },
  };
  const body = `${JSON.stringify(next, null, 2)}\n`;
  if (Buffer.byteLength(body) > MAX_BYTES)
    throw new ContentError("저장할 내용이 너무 큽니다.");
  await mkdir(path.join(dir, "versions"), { recursive: true, mode: 0o700 });
  // 과거 저장본을 남기고 공개본은 rename 한 번으로 교체한다. 실패하면 이전 공개본을 유지한다.
  const temp = path.join(dir, `${next.revision}.tmp`);
  try {
    await writeFile(path.join(dir, "versions", `${next.revision}.json`), body, {
      flag: "wx",
      mode: 0o600,
    });
    await writeFile(temp, body, { flag: "wx", mode: 0o600 });
    await rename(temp, path.join(dir, "current.json"));
  } finally {
    await rm(temp, { force: true });
  }
  return next;
}
