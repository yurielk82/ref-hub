import type { AxCaseStudy, AxTrackView } from "@/data/ax";

import { AxTrackFacts } from "./ax-sections";
import { CaseOwnership } from "./case-narrative";

/** AX 트랙 사례 상세의 서사 — 역할·기간·운영 현황은 영업관리 트랙과 같은 사실을 쓴다 */
export function AxCaseDetail({
  caseStudy,
  view,
}: {
  caseStudy: AxCaseStudy;
  view: AxTrackView;
}) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        {view.headline}
      </h2>
      <CaseOwnership caseStudy={caseStudy} />
      <AxTrackFacts view={view} className="mt-8 max-w-3xl gap-6" />
    </section>
  );
}
