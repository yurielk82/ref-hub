import { cache } from "react";
import { connection } from "next/server";
import path from "node:path";
import { resumeDataDir } from "../resume/versions";
import { readContent } from "./store";
import { portfolioContent, type PortfolioTrack } from "./content";

export function portfolioDataDir(): string | null {
  const dir = resumeDataDir();
  return dir ? path.join(dir, "portfolio") : null;
}
export const loadPortfolio = cache(async (track: PortfolioTrack) => {
  await connection();
  const dir = portfolioDataDir();
  const snapshot = dir
    ? await readContent(dir)
    : { revision: "initial", savedAt: null, values: {} };
  return { ...portfolioContent(track, snapshot.values), snapshot };
});
