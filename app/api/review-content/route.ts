import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { jobsViewer } from "@/auth";
import { isSameOriginRequest, publicOrigin } from "@/lib/auth/origin";
import { portfolioDataDir } from "@/lib/portfolio/server";
import { clearReviewContent, ContentError } from "@/lib/portfolio/store";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request.headers, publicOrigin(request.url)))
    return NextResponse.json({ error: "cross_origin_write" }, { status: 403 });
  const viewer = await jobsViewer();
  const expiresAt = Number(process.env.REF_HUB_REVIEW_EXPIRES_AT);
  if (
    !viewer ||
    viewer.id !== process.env.REF_HUB_REVIEW_USER_ID ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= Date.now()
  )
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const input: unknown = await request.json().catch(() => null);
  if (
    typeof input !== "object" ||
    input === null ||
    !("expectedRevision" in input) ||
    typeof input.expectedRevision !== "string"
  )
    return NextResponse.json({ error: "invalid_revision" }, { status: 400 });
  const dir = portfolioDataDir();
  if (!dir)
    return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
  try {
    const snapshot = await clearReviewContent(dir, input.expectedRevision);
    revalidatePath("/");
    revalidatePath("/ax");
    return NextResponse.json({ revision: snapshot.revision });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof ContentError ? error.message : "cleanup_failed",
      },
      { status: error instanceof ContentError ? 409 : 500 },
    );
  }
}
