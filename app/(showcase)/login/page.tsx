import { redirect } from "next/navigation";
import {
  ownerHref,
  safeReturnTo,
  type WorkspaceQuery,
} from "@/lib/selected-portfolio/workspace";
export default async function LoginCompatibilityPage({
  searchParams,
}: {
  searchParams: Promise<WorkspaceQuery>;
}) {
  const query = await searchParams;
  const next = safeReturnTo(query.next);
  const home = next.startsWith("/ax") ? "/ax" : "/";
  const target = new URL(ownerHref(home, "login"), "https://portfolio.invalid");
  target.searchParams.set("next", next);
  if (typeof query.error === "string")
    target.searchParams.set("error", query.error);
  redirect(`${target.pathname}${target.search}`);
}
