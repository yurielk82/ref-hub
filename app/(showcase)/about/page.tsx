import { loadPortfolio } from "@/lib/portfolio/server";
import { MagicProfile } from "@magic/Profile";
export default async function AboutPage() {
  return <MagicProfile copy={await loadPortfolio("sales")} track="sales" />;
}
