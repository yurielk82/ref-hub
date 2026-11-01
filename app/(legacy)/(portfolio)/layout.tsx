import "./portfolio.css";
import type { ReactNode } from "react";
import { PortfolioNav } from "@/components/portfolio/nav";
import { PortfolioFooter } from "@/components/portfolio/footer";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio-shell">
      <PortfolioNav />
      <a className="folio-skip" href="#portfolio-main">
        본문으로 건너뛰기
      </a>
      <main id="portfolio-main" className="folio-main">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}
