"use server";
import { revalidatePath } from "next/cache";
import { jobsViewer } from "@/auth";
import { portfolioContent } from "@/lib/portfolio/content";
import { portfolioDataDir } from "@/lib/portfolio/server";
import { ContentError, saveContent } from "@/lib/portfolio/store";

export async function savePortfolio(input: unknown) {
  if (!(await jobsViewer()))
    return {
      error:
        "로그인이 만료됐습니다. 수정한 글을 복사해 두고 다시 로그인해 주세요.",
    };
  const dir = portfolioDataDir();
  if (!dir) return { error: "저장 폴더가 설정되지 않았습니다." };
  try {
    const fields = [
      ...portfolioContent("sales").fields,
      ...portfolioContent("ax").fields,
    ];
    const snapshot = await saveContent(dir, input, fields);
    revalidatePath("/");
    revalidatePath("/ax");
    return { revision: snapshot.revision, savedAt: snapshot.savedAt };
  } catch (error) {
    return {
      error:
        error instanceof ContentError
          ? error.message
          : "저장하지 못했습니다. 입력한 글은 그대로 있으니 잠시 뒤 다시 저장해 주세요.",
    };
  }
}
