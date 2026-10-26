import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AX_CONTACT, AX_HERO, SITE_URL } from "@/data/ax";
import { COMPANY_PROJECTS } from "@/data/projects";
import {
  AxContactSection,
  AxHeroSection,
} from "@/components/portfolio/ax-sections";
import { CareerSection } from "@/components/portfolio/career-section";
import { FadeInUp } from "@/components/portfolio/motion";
import { SortableGrid } from "@/components/portfolio/sortable-grid";
import { WorkSection } from "@/components/portfolio/work-section";

// 이력서 링크를 공유했을 때 탭·미리보기에 이름이 먼저 보여야 한다.
const LANDING_TITLE = `${AX_HERO.name} — ${AX_HERO.role}`;
const LANDING_DESCRIPTION = `${AX_HERO.name} · ${AX_HERO.role}. SFE·S&OP·유통재고 관리 개선, 영업 데이터 분석, 자료 취합·보고 자동화 경험.`;
const LANDING_PREVIEW_IMAGE = "/images/portfolio/pharmkpi/hero.png";

export const metadata: Metadata = {
  title: { absolute: LANDING_TITLE },
  description: LANDING_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [
      {
        url: LANDING_PREVIEW_IMAGE,
        alt: "PharmKPI 사내 영업 데이터 플랫폼 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [LANDING_PREVIEW_IMAGE],
  },
};

/** Google ProfilePage 구조화 데이터 — 검색이 이 페이지를 한 사람의 프로필로 읽게 한다. */
const PROFILE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  mainEntity: {
    "@type": "Person",
    name: AX_HERO.name,
    jobTitle: AX_HERO.jobTitle,
    worksFor: { "@type": "Organization", name: AX_HERO.employer },
    description: AX_HERO.subhead,
    email: `mailto:${AX_CONTACT.email}`,
    sameAs: [AX_CONTACT.linkedin, AX_CONTACT.github],
  },
} as const;

const PROJECT_GROUPS = [
  {
    id: "projects",
    // 묶음을 나누기 전 키 — 방문자가 저장해 둔 순서를 이어 쓴다
    storageKey: "ref-hub-project-order",
    title: `업무 개선에 활용한 시스템 ${COMPANY_PROJECTS.length}건`,
    lead: "직접 구축한 회사 업무 시스템입니다. 운영 중·개선 중·이관·종료 상태를 사례별로 표시했습니다.",
    projects: COMPANY_PROJECTS,
  },
] as const;

export default function HomePage() {
  return (
    <article className="px-6 pb-28 pt-20 sm:pt-24">
      <script
        type="application/ld+json"
        // 정적 데이터지만 </script> 조기 종료를 막으려고 < 를 이스케이프한다
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl">
        <AxHeroSection />

        <WorkSection />

        <FadeInUp>
          <div className="mt-8 flex justify-center">
            <Link
              href="/ax"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] dark:border-stone-800 dark:bg-stone-900"
            >
              업무 개선 사례 자세히 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeInUp>

        {PROJECT_GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="mt-20 scroll-mt-20">
            <FadeInUp>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="mt-2 text-2xl font-bold text-stone-950 dark:text-stone-50">
                    {group.title}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {group.lead}
                </p>
              </div>
            </FadeInUp>

            <div className="mt-8">
              <SortableGrid
                projects={group.projects}
                storageKey={group.storageKey}
              />
            </div>
          </section>
        ))}

        <CareerSection />

        <AxContactSection />
      </div>
    </article>
  );
}
