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
export async function readContent(_dir: string): Promise<ContentSnapshot> {
  return { revision: "initial", savedAt: null, values: {} };
}
export async function saveContent(
  _dir: string,
  _input: unknown,
  _fields: readonly CopyField[],
): Promise<ContentSnapshot> {
  throw new Error("저장이 구현되지 않았습니다");
}
