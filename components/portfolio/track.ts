/**
 * 포트폴리오는 두 트랙이다. 영업관리 지원용(/)과 AX 직무용(/ax). 지원처에 따라 다른 링크를 보내고,
 * 각 트랙은 자기 메뉴만 보여 준다. 시스템 매뉴얼(/docs)과 AX 사례 상세(/ax/cases/*)는 AX 트랙,
 * 회사 사례 상세(/projects/*)는 영업관리 트랙이다. 트랙마다 다른 표시는 아래 TRACKS 한 곳에서 정한다.
 */
export type Track = "sales" | "ax";

interface NavLink {
  href: string;
  label: string;
}

interface TrackConfig {
  /** 메뉴의 접근성 이름 */
  menuLabel: string;
  /** 메뉴의 이름 옆 표시. 영업관리 트랙은 이름만 쓴다 */
  badge?: string;
  home: string;
  links: readonly NavLink[];
  /** GitHub·사용 기술 같은 개발자용 정보. 영업관리 트랙은 업무 역량이 먼저라 숨긴다 */
  developerLinks: boolean;
  /** 사례 상세 주소의 앞부분 */
  casePath: string;
}

export const TRACKS: Readonly<Record<Track, TrackConfig>> = {
  sales: {
    menuLabel: "포트폴리오 메뉴",
    home: "/",
    links: [
      { href: "/#work", label: "주요 업무" },
      { href: "/#projects", label: "사례" },
      { href: "/#career", label: "경력" },
      { href: "/#contact", label: "연락" },
    ],
    developerLinks: false,
    casePath: "/projects",
  },
  ax: {
    menuLabel: "AX 포트폴리오 메뉴",
    badge: "AX",
    home: "/ax",
    links: [
      { href: "/ax#method", label: "일하는 방식" },
      { href: "/ax#cases", label: "사례" },
      { href: "/ax#tools", label: "개인 작업" },
      { href: "/ax#stack", label: "기술" },
      { href: "/docs", label: "문서" },
    ],
    developerLinks: true,
    casePath: "/ax/cases",
  },
};

export function trackOf(pathname: string): Track {
  return pathname === "/ax" ||
    pathname.startsWith("/ax/") ||
    pathname === "/docs"
    ? "ax"
    : "sales";
}

export function caseHref(track: Track, slug: string): string {
  return `${TRACKS[track].casePath}/${slug}`;
}
