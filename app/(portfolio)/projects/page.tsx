import { COMPANY_PROJECTS } from "@/data/projects";
import { SortableGrid } from "@/components/portfolio/sortable-grid";
import { FadeInUp } from "@/components/portfolio/motion";

export default function ProjectsPage() {
  return (
    <section className="px-6 pb-28 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <div className="mb-10">
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              회사 업무 개선 사례
            </h1>
          </div>
        </FadeInUp>
        <SortableGrid
          projects={COMPANY_PROJECTS}
          storageKey="ref-hub-all-project-order"
        />
      </div>
    </section>
  );
}
