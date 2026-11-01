import data from "../../data/selected-portfolio/portfolio.json";
import axData from "../../data/selected-portfolio/portfolio-ax.json";
import type { PortfolioData } from "./types";
import { validatePortfolio } from "../../scripts/selected-portfolio/schema.mjs";

function isPortfolioData(value: unknown): value is PortfolioData {
  return validatePortfolio(value).length === 0;
}

function publicPortfolio(value: unknown): PortfolioData {
  if (!isPortfolioData(value))
    throw new Error("포트폴리오 콘텐츠 형식을 확인하세요.");
  return {
    ...value,
    projects: value.projects.filter((project) => !project.hidden),
  };
}

export const portfolio = publicPortfolio(data);
export const axPortfolio = publicPortfolio(axData);
export function sitePath(pathname: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${pathname}`;
}
