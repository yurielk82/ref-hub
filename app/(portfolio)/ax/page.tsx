import { loadPortfolio } from "@/lib/portfolio/server";
import type { Metadata } from "next";
import { AX_TRACK_HERO } from "@/data/ax";
import { PortfolioHome } from "@/components/portfolio/portfolio-home";

export const metadata: Metadata = {
  // 문서 페이지 지도가 이 제목을 문자열로 읽는다 — { absolute } 객체를 쓰면 문서 빌드가 깨진다.
  title: `AX 포트폴리오 — ${AX_TRACK_HERO.name}`,
  description: `${AX_TRACK_HERO.name} · ${AX_TRACK_HERO.role}. 영업 데이터 플랫폼·법정 보고 자동화·문서 검증 시스템을 직접 기획·구축·운영한 사례.`,
  alternates: { canonical: "/ax" },
};

/** AX 트랙의 저장 문구를 같은 포트폴리오 틀에 연결한다. */
export default async function AxPage() {
  const copy = await loadPortfolio("ax");
  return <PortfolioHome copy={copy} track="ax" />;
}
