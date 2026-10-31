"use server";

import { redirect } from "next/navigation";

import { jobsViewer } from "@/auth";
import { parsePlatform, resumeHref } from "@/lib/resume/platforms";
import { resumeDataDir, saveVersion } from "@/lib/resume/versions";
import type { JobkoreaResume, SaraminResume } from "@/lib/resume/types";

export type SaveInput =
  | { platform: "saramin"; resume: SaraminResume; label: string }
  | { platform: "jobkorea"; resume: JobkoreaResume; label: string };

/**
 * 고친 이력서를 새 버전으로 저장한다. Server Action은 누구나 POST로 부를 수 있으므로
 * 화면과 같은 허용 계정 확인을 여기서 다시 한다. 기존 버전은 고치지 않는다.
 * 사이트마다 형식 검사가 달라, 다른 사이트 형식이 섞여 들어오면 저장하지 않는다.
 */
export async function saveResumeVersion(
  input: SaveInput,
): Promise<{ error: string }> {
  if (!(await jobsViewer())) return { error: "로그인이 필요합니다." };
  const dir = resumeDataDir();
  if (!dir) return { error: "서버에 이력서 저장 폴더가 지정되지 않았습니다." };
  const platform = parsePlatform(input.platform);
  const label = String(input.label ?? "");
  let id: string;
  try {
    id = (
      platform === "jobkorea"
        ? await saveVersion(
            dir,
            input.resume as JobkoreaResume,
            label,
            new Date(),
            "jobkorea",
          )
        : await saveVersion(dir, input.resume as SaraminResume, label)
    ).id;
  } catch (error) {
    return { error: `저장하지 못했습니다: ${(error as Error).message}` };
  }
  redirect(resumeHref(platform, id));
}
