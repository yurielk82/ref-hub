import type { ResumePlatform } from "./types.ts";

/** 이력서 화면이 다루는 사이트. 주소의 ?p= 값이 없거나 모르는 값이면 사람인이다. */
export const SITE_NAMES: Record<ResumePlatform, string> = {
  saramin: "사람인",
  jobkorea: "잡코리아",
};

export function parsePlatform(value: unknown): ResumePlatform {
  return value === "jobkorea" ? "jobkorea" : "saramin";
}

/** 사람인은 처음 만든 주소(/resume?v=)를 그대로 둔다 */
export function resumeHref(platform: ResumePlatform, id?: string): string {
  const params = new URLSearchParams();
  if (platform !== "saramin") params.set("p", platform);
  if (id) params.set("v", id);
  const query = params.toString();
  return query ? `/resume?${query}` : "/resume";
}
