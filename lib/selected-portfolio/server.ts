import "server-only";

import { cache } from "react";
import { loadPortfolio } from "@/lib/portfolio/server";
import type { PortfolioTrack } from "@/lib/portfolio/content";
import { portfolio, axPortfolio } from "./content";
import { selectedPortfolioContent } from "./adapter";

export const loadSelectedPortfolio = cache(async (track: PortfolioTrack) => {
  const { snapshot } = await loadPortfolio(track);
  const base = track === "ax" ? axPortfolio : portfolio;
  return {
    ...selectedPortfolioContent(base, track, snapshot.values),
    snapshot,
  };
});

export function selectedEditableFields(track: PortfolioTrack) {
  return selectedPortfolioContent(
    track === "ax" ? axPortfolio : portfolio,
    track,
  ).fields;
}
