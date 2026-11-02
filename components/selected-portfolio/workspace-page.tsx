import { jobsViewer } from "@/auth";
import { portfolioDataDir } from "@/lib/portfolio/server";
import type { PortfolioTrack } from "@/lib/portfolio/content";
import { loadSelectedPortfolio } from "@/lib/selected-portfolio/server";
import {
  ownerSection,
  safeReturnTo,
  type WorkspaceQuery,
} from "@/lib/selected-portfolio/workspace";
import { Portfolio } from "./portfolio";
import { OwnerResume } from "./owner-resume";
import { OwnerJobs } from "./owner-jobs";
import { OwnerLogin } from "./owner-login";
import { projectCopyFields } from "@/lib/selected-portfolio/adapter";
import { portfolio, axPortfolio } from "@/lib/selected-portfolio/content";
import type { OwnerWorkspace } from "./portfolio";

export async function WorkspacePage({
  track,
  query,
}: {
  track: PortfolioTrack;
  query: WorkspaceQuery;
}) {
  const home = track === "ax" ? "/ax" : "/";
  const [content, viewer] = await Promise.all([
    loadSelectedPortfolio(track),
    jobsViewer(),
  ]);
  const requested = ownerSection(query.manage);
  const returnQuery = new URLSearchParams();
  if (requested && requested !== "login") returnQuery.set("manage", requested);
  for (const key of ["p", "v"]) {
    if (typeof query[key] === "string") returnQuery.set(key, query[key]);
  }
  if (query.edit === "1") returnQuery.set("edit", "1");
  const section =
    requested && (!viewer || requested === "login") ? "login" : requested;
  const workspace: OwnerWorkspace | null =
    section === "resume" && viewer
      ? { section, content: <OwnerResume home={home} query={query} /> }
      : section === "jobs" && viewer
        ? { section, content: <OwnerJobs /> }
        : section === "login" && !viewer
          ? {
              section,
              content: (
                <OwnerLogin
                  home={home}
                  next={safeReturnTo(
                    typeof query.next === "string"
                      ? query.next
                      : `${home}${returnQuery.size ? `?${returnQuery}` : ""}`,
                  )}
                  error={
                    typeof query.error === "string" ? query.error : undefined
                  }
                />
              ),
            }
          : null;
  return (
    <Portfolio
      data={content.data}
      trackPath={track === "ax" ? "/ax" : ""}
      initialEditing={query.edit === "1"}
      owner={
        viewer
          ? {
              fields: content.fields,
              revision: content.snapshot.revision,
              canSave: Boolean(portfolioDataDir()),
              projectFields: Object.fromEntries(
                (track === "ax" ? axPortfolio : portfolio).projects.map(
                  (project) => [project.id, projectCopyFields(project)],
                ),
              ),
            }
          : null
      }
      workspace={workspace}
    />
  );
}
