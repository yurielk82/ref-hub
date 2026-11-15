import type { FilePlatform, ResumePlatform } from "./types.ts";

/** 이력서 화면이 다루는 사이트. 주소의 ?p= 값이 없거나 모르는 값이면 사람인이다. */
export const SITE_NAMES: Record<ResumePlatform, string> = {
  saramin: "사람인",
  jobkorea: "잡코리아",
  remember: "리멤버",
};

/** 그 사이트에서 이 문서를 부르는 이름 */
export const SITE_DOCS: Record<ResumePlatform, string> = {
  saramin: "이력서",
  jobkorea: "이력서",
  remember: "프로필",
};

export function isPlatform(value: unknown): value is ResumePlatform {
  return typeof value === "string" && Object.hasOwn(SITE_NAMES, value);
}

export function parsePlatform(value: unknown): ResumePlatform {
  return isPlatform(value) ? value : "saramin";
}

export function hasFiles(platform: ResumePlatform): platform is FilePlatform {
  return platform !== "remember";
}

/** 사람인은 처음 만든 주소(/resume?v=)를 그대로 둔다 */
export function resumeHref(
  platform: ResumePlatform,
  id?: string,
  home?: "/" | "/ax",
): string {
  const params = new URLSearchParams();
  if (home) params.set("manage", "resume");
  if (platform !== "saramin") params.set("p", platform);
  if (id) params.set("v", id);
  const query = params.toString();
  const pathname = home ?? "/resume";
  return query ? `${pathname}?${query}` : pathname;
}
