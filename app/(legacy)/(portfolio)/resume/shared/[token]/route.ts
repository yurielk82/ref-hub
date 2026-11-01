import { fileResponse, PRIVATE_FILE_HEADERS } from "@/lib/resume/files";
import { readShare } from "@/lib/resume/shares";
import { resumeDataDir } from "@/lib/resume/versions";

export const dynamic = "force-dynamic";

/** 토큰이 가리키는 저장 파일 하나만 제공한다. 공개 요청에서 문서 변환은 하지 않는다. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const dir = resumeDataDir();
  try {
    const share = dir ? await readShare(dir, token) : null;
    if (!share)
      return new Response("공유가 중단되었거나 올바르지 않은 주소입니다.", {
        status: 404,
        headers: PRIVATE_FILE_HEADERS,
      });
    return fileResponse({
      fileName: share.fileName,
      contentType: share.contentType,
      body: Buffer.from(share.base64, "base64"),
    });
  } catch {
    return new Response("파일을 읽지 못했습니다. 잠시 뒤 다시 시도해 주세요.", {
      status: 500,
      headers: PRIVATE_FILE_HEADERS,
    });
  }
}
