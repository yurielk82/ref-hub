import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type { JobStore } from "./types.ts";

/**
 * 공고 저장 파일. 저장소 밖 서버 폴더(JOBS_DATA_DIR)에 두고 git에 올리지 않는다.
 * 사람인 이용 조건에 저장 범위가 정해져 있지 않아 본인 열람용으로만 보관한다.
 */
export const STORE_FILE = "postings.json";

export type StoreRead =
  | { kind: "ok"; store: JobStore }
  | { kind: "missing" }
  | { kind: "invalid"; message: string };

export function jobsDataDir(): string | null {
  const dir = process.env.JOBS_DATA_DIR?.trim();
  return dir ? dir : null;
}

function isStore(value: unknown): value is JobStore {
  if (typeof value !== "object" || value === null) return false;
  const store = value as Partial<JobStore>;
  return store.version === 1 && Array.isArray(store.postings);
}

export async function readStore(dir: string): Promise<StoreRead> {
  let raw: string;
  try {
    raw = await readFile(path.join(dir, STORE_FILE), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return { kind: "missing" };
    return { kind: "invalid", message: (error as Error).message };
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return isStore(parsed)
      ? { kind: "ok", store: parsed }
      : { kind: "invalid", message: "저장 파일 형식이 다릅니다" };
  } catch (error) {
    return { kind: "invalid", message: (error as Error).message };
  }
}

/** 임시 파일에 쓴 뒤 이름을 바꿔, 읽는 쪽이 반쯤 쓴 파일을 보지 않게 한다. */
export async function writeStore(dir: string, store: JobStore): Promise<void> {
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const target = path.join(dir, STORE_FILE);
  const temp = `${target}.${process.pid}.tmp`;
  await writeFile(temp, `${JSON.stringify(store)}\n`, { mode: 0o600 });
  await rename(temp, target);
}
