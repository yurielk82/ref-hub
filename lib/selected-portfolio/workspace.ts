export type PortfolioHome = "/" | "/ax";
export type OwnerSection = "resume" | "jobs" | "login";
export type WorkspaceQuery = Record<string, string | string[] | undefined>;

export function portfolioHome(value: unknown): PortfolioHome {
  return value === "/ax" ? "/ax" : "/";
}

export function ownerSection(value: unknown): OwnerSection | null {
  return value === "resume" || value === "jobs" || value === "login"
    ? value
    : null;
}

export function ownerHref(home: PortfolioHome, section: OwnerSection): string {
  return `${home}?manage=${section}`;
}

export function safeReturnTo(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  )
    return "/";
  try {
    const url = new URL(value, "https://portfolio.invalid");
    if (
      url.origin !== "https://portfolio.invalid" ||
      !["/", "/ax"].includes(url.pathname)
    )
      return "/";
    const params = new URLSearchParams();
    const section = ownerSection(url.searchParams.get("manage"));
    if (section && section !== "login") params.set("manage", section);
    if (!section && url.searchParams.get("edit") === "1")
      params.set("edit", "1");
    if (section === "resume") {
      if (url.searchParams.get("p") === "jobkorea") params.set("p", "jobkorea");
      const version = url.searchParams.get("v");
      if (version && /^[a-zA-Z0-9_-]{1,100}$/.test(version))
        params.set("v", version);
    }
    const query = params.toString();
    return `${url.pathname}${query ? `?${query}` : ""}`;
  } catch {
    return "/";
  }
}

export const RETURN_TO_COOKIE = "ref-hub-return-to";
