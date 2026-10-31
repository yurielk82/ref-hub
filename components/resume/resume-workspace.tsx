"use client";

import type { ShareSummary } from "@/lib/resume/shares";
import type { JobkoreaResume, SaraminResume } from "@/lib/resume/types";

import { JobkoreaFields } from "./jobkorea-fields";
import { ResumeShell, type VersionOption } from "./resume-shell";
import { SaraminFields } from "./saramin-fields";

interface WorkspaceProps<R> {
  shares: ShareSummary[];
  version: VersionOption;
  versions: VersionOption[];
  previousLabel: string | null;
  changed: string[];
  resume: R;
  /** 재직 중 경력의 기준 달("YYYY.MM", KST) — 서버와 브라우저가 같은 값을 쓰게 서버에서 정한다 */
  asOf: string;
}

/** 사람인 이력서 작업 화면 */
export function SaraminWorkspace({
  asOf,
  ...props
}: WorkspaceProps<SaraminResume>) {
  return (
    <ResumeShell platform="saramin" {...props}>
      {(state) => <SaraminFields {...state} asOf={asOf} />}
    </ResumeShell>
  );
}

/** 잡코리아 이력서 작업 화면 */
export function JobkoreaWorkspace({
  asOf,
  ...props
}: WorkspaceProps<JobkoreaResume>) {
  return (
    <ResumeShell platform="jobkorea" {...props}>
      {(state) => <JobkoreaFields {...state} asOf={asOf} />}
    </ResumeShell>
  );
}
