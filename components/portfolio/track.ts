/**
 * 포트폴리오는 두 트랙이다. 영업관리 지원용(/)과 AX 직무용(/ax). 지원처에 따라 다른 링크를 보내고,
 * 각 트랙은 자기 메뉴만 보여 준다. 시스템 매뉴얼(/docs)과 AX 사례 상세(/ax/cases/*)는 AX 트랙,
 * 회사 사례 상세(/projects/*)는 영업관리 트랙이다.
 */
export type Track = "sales" | "ax";

export function trackOf(pathname: string): Track {
  return pathname === "/ax" ||
    pathname.startsWith("/ax/") ||
    pathname === "/docs"
    ? "ax"
    : "sales";
}

/** GitHub·사용 기술 같은 개발자용 정보는 AX 트랙에서만 보인다. */
export function showsDeveloperLinks(track: Track): boolean {
  return track === "ax";
}
