import { redirect } from "next/navigation";
import { jobsViewer } from "@/auth";
import { ownerHref } from "@/lib/selected-portfolio/workspace";
export default async function EditCompatibilityPage() {
  if (!(await jobsViewer())) redirect(ownerHref("/ax", "login"));
  redirect("/ax?edit=1");
}
