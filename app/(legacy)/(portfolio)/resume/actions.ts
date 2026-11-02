"use server";

import { parseDocKind, resumeDocument } from "@/lib/resume/document";
import { parseFileFormat, renderFile } from "@/lib/resume/files";
import {
  createShare,
  listShares,
  revokeDocumentShares,
} from "@/lib/resume/shares";
import { readVersion } from "@/lib/resume/versions";
import { redirect } from "next/navigation";

import { jobsViewer } from "@/auth";
import { portfolioHome } from "@/lib/selected-portfolio/workspace";
import { parsePlatform, resumeHref } from "@/lib/resume/platforms";
import { resumeDataDir, saveVersion } from "@/lib/resume/versions";
import type { JobkoreaResume, SaraminResume } from "@/lib/resume/types";

export type SaveInput = (
  | { platform: "saramin"; resume: SaraminResume; label: string }
  | { platform: "jobkorea"; resume: JobkoreaResume; label: string }
) & { home?: "/" | "/ax" };

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
  redirect(
    resumeHref(
      platform,
      id,
      input.home ? portfolioHome(input.home) : undefined,
    ),
  );
}

// shortcut: 현재 웹 서비스는 단일 프로세스다. 다중 인스턴스로 늘리면 공유 저장소 잠금으로 옮긴다.
let shareChanges: Promise<unknown> = Promise.resolve();
function serializeShareChange<T>(work: () => Promise<T>): Promise<T> {
  const task = shareChanges.then(work);
  shareChanges = task.catch(() => undefined);
  return task;
}

/** 소유자 화면에서만 공유 파일 생성·폐기. 원본은 서버에서 다시 읽는다. */
export async function shareResumeFile(input: {
  platform: string;
  versionId: string;
  kind: string;
  format: string;
}) {
  if (!(await jobsViewer())) return { error: "로그인이 필요합니다." };
  const dir = resumeDataDir();
  if (!dir) return { error: "이력서 저장 폴더가 없습니다." };
  const kind = parseDocKind(input?.kind);
  const format = parseFileFormat(input?.format);
  if (!kind || !format || !["saramin", "jobkorea"].includes(input?.platform))
    return { error: "문서 종류와 파일 형식을 확인해 주세요." };
  const platform = parsePlatform(input.platform);
  try {
    return await serializeShareChange(async () => {
      const version = await readVersion(dir, String(input.versionId), platform);
      if (!version) return { error: "저장된 이력서 버전이 없습니다." };
      const existing = (await listShares(dir, platform, version.id)).find(
        (share) => share.kind === kind && share.format === format,
      );
      if (existing) return { share: existing };
      const file = await renderFile(
        resumeDocument(platform, version.resume, kind),
        format,
      );
      return {
        share: await createShare(
          dir,
          { platform, versionId: version.id, kind, format },
          file,
        ),
      };
    });
  } catch {
    return {
      error: "제출 파일을 만들지 못했습니다. 잠시 뒤 다시 시도해 주세요.",
    };
  }
}

export async function stopResumeShare(token: string) {
  if (!(await jobsViewer())) return { error: "로그인이 필요합니다." };
  const dir = resumeDataDir();
  if (!dir) return { error: "이력서 저장 폴더가 없습니다." };
  try {
    await serializeShareChange(() => revokeDocumentShares(dir, String(token)));
    return { ok: true };
  } catch {
    return {
      error:
        "공유 상태가 바뀌었거나 중단하지 못했습니다. 새로고침 후 확인해 주세요.",
    };
  }
}
