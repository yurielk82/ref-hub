import { redirect } from "next/navigation";
import {
  ownerHref,
  type WorkspaceQuery,
} from "@/lib/selected-portfolio/workspace";
export default async function CompatibilityPage({
  searchParams,
}: {
  searchParams: Promise<WorkspaceQuery>;
}) {
  const query = await searchParams;
  const params = new URLSearchParams(ownerHref("/", "resume").split("?")[1]);
  for (const key of ["p", "v"])
    if (typeof query[key] === "string") params.set(key, query[key]);
  redirect(`/?${params}`);
}
