import type { NextRequest } from "next/server";

import { jobsViewer } from "@/auth";
import { parseDocKind, resumeDocument } from "@/lib/resume/document";
import { toDocx } from "@/lib/resume/docx";
import { parsePlatform } from "@/lib/resume/platforms";
import {
  listVersions,
  readVersion,
  resumeDataDir,
} from "@/lib/resume/versions";

/** 개인 정보 파일이라 브라우저·Cloudflare 어디에도 남기지 않는다 */
const PRIVATE = { "Cache-Control": "private, no-store" };

function plain(status: number, message: string) {
  return new Response(message, {
    status,
    headers: { ...PRIVATE, "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * 저장된 이력서 한 버전을 사람인 파일 업로드용 DOCX로 내려준다(로그인 전용).
 * ?p=사이트 &v=버전 &kind=resume|career|cover. 버전이 없으면 최신 버전이다.
 */
export async function GET(request: NextRequest) {
  if (!(await jobsViewer())) return plain(401, "로그인이 필요합니다.");
  const dir = resumeDataDir();
  if (!dir) return plain(404, "이력서 저장 폴더가 없습니다.");

  const params = request.nextUrl.searchParams;
  const platform = parsePlatform(params.get("p"));
  const kind = parseDocKind(params.get("kind"));
  if (!kind) return plain(400, "문서 종류를 알 수 없습니다.");

  const id = params.get("v") ?? (await listVersions(dir, platform))[0]?.id;
  const version = id ? await readVersion(dir, id, platform) : null;
  if (!version) return plain(404, "저장된 이력서 버전이 없습니다.");

  const document = resumeDocument(platform, version.resume, kind);
  const body = await toDocx(document);
  return new Response(new Uint8Array(body), {
    headers: {
      ...PRIVATE,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="resume-${kind}.docx"; filename*=UTF-8''${encodeURIComponent(document.fileName)}`,
    },
  });
}
