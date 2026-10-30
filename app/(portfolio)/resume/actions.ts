"use server";

import { redirect } from "next/navigation";

import { jobsViewer } from "@/auth";
import { resumeDataDir, saveVersion } from "@/lib/resume/versions";
import type { SaraminResume } from "@/lib/resume/types";

/**
 * 고친 이력서를 새 버전으로 저장한다. Server Action은 누구나 POST로 부를 수 있으므로
 * 화면과 같은 허용 계정 확인을 여기서 다시 한다. 기존 버전은 고치지 않는다.
 */
export async function saveResumeVersion(input: {
  resume: SaraminResume;
  label: string;
}): Promise<{ error: string }> {
  if (!(await jobsViewer())) return { error: "로그인이 필요합니다." };
  const dir = resumeDataDir();
  if (!dir) return { error: "서버에 이력서 저장 폴더가 지정되지 않았습니다." };
  let id: string;
  try {
    id = (await saveVersion(dir, input.resume, String(input.label ?? ""))).id;
  } catch (error) {
    return { error: `저장하지 못했습니다: ${(error as Error).message}` };
  }
  redirect(`/resume?v=${id}`);
}
