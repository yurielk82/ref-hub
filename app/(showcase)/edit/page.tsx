import { redirect } from "next/navigation";
import { jobsViewer } from "@/auth";
import { ownerHref } from "@/lib/selected-portfolio/workspace";
export default async function EditCompatibilityPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  if ((await searchParams).track === "ax") redirect("/ax/edit");
  if (!(await jobsViewer()))
    redirect(
      `${ownerHref("/", "login")}&next=${encodeURIComponent("/?edit=1")}`,
    );
  redirect("/?edit=1");
}
