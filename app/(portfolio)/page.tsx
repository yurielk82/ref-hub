import { PROJECTS } from '@/data/projects'
import { SortableGrid } from '@/components/portfolio/sortable-grid'
import { FadeInUp } from '@/components/portfolio/motion'

export default function HomePage() {
  return (
    <section className="px-6 pb-28 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <div className="mb-10">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--accent)]">
              Projects
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              프로젝트
            </h2>
          </div>
        </FadeInUp>
        <SortableGrid projects={PROJECTS} />
      </div>
    </section>
  )
}
