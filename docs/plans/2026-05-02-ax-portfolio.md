# AX Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an AX-focused resume reference page that positions the portfolio owner as a practitioner who turns field operations into AI workflows.

**Architecture:** Keep the existing Ref Hub home and docs intact. Add a dedicated `/ax` route backed by a new `data/ax.ts` source so the AX story is isolated from synced Nextra docs and existing project metadata.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, Tailwind CSS, existing portfolio layout/components.

---

## Positioning

Target role: AX Specialist / Manager hybrid.

Primary message: 현업 프로세스를 AI 워크플로우로 전환하는 AX 실무자.

The page should emphasize practical transformation work, not generic AI enthusiasm. The story starts from field operations, shows how bottlenecks were diagnosed, then proves that AI/data systems were used to change work structure.

## Scope

Create:
- `data/ax.ts`
- `app/(portfolio)/ax/page.tsx`

Modify:
- `tests/site-integrity.test.mjs`
- `components/portfolio/nav.tsx`
- `app/(docs)/[[...mdxPath]]/page.tsx` route shape if Next dev/build reports root route conflict

Do not modify:
- `package.json`
- `package-lock.json`
- submodules under `repos/`
- synced docs under `content/`
- deployment, PM2, Nginx, Docker, or infra state

## Page Structure

1. Hero
   - One-line AX positioning.
   - Supporting paragraph explaining voluntary AX work started from real field bottlenecks.
   - CTAs to featured cases and contact/GitHub.

2. AX Fit
   - Four capability pillars:
     - 업무 진단
     - 데이터/ERP 통합
     - AI 자동화/에이전트
     - 도입·운영·거버넌스

3. Featured Cases
   - CSO Web: AI Vision EDI verification and Human-in-the-loop review.
   - PharmKPI: Oracle ERP data integration and multi-AI sales analysis.
   - Claude Dotfiles: agentic development harness and guardrails.
   - KPIS DSR: supply data validation and reporting automation.

4. Operating Method
   - Observe the bottleneck.
   - Define the source of truth.
   - Automate the repeated judgment or handoff.
   - Keep human review for risky decisions.
   - Measure and document the result.

5. Proof Stack
   - Reframe existing technologies under AX categories instead of generic web/backend labels.

6. Contact CTA
   - Keep exposure conservative: LinkedIn and GitHub only for v1.

## Data Model

Use `data/ax.ts` as the single AX page source. Reference existing project slugs instead of duplicating all project metadata.

Recommended data shapes:

```ts
export interface AxCaseStudy {
  projectSlug: string
  problem: string
  intervention: string
  outcome: string
  disclosure: 'public' | 'range' | 'withheld'
  evidenceLabel: string
}
```

Metrics can be upgraded later when exact numbers are safe to disclose.

## Verification

1. Add a failing integrity test for `/ax` route and `data/ax.ts`.
2. Run `npm test` and verify the new test fails before implementation.
3. Implement data and page.
4. Run `npm test`.
5. Run `npx tsc --noEmit` if dependencies are already available.
6. Run a dev-server smoke check for `/ax`. If Next reports root route conflict between `/` and `/[[...mdxPath]]`, move the docs route to required catch-all `[...mdxPath]` so `/` remains owned by the portfolio home.
7. Do not run `npm run build` in the live `/home/ubuntu/GitHub` checkout unless a deployment flow is explicitly approved.

## Rollback

Because v1 is isolated to `/ax`, rollback is simple:
- remove `app/(portfolio)/ax/page.tsx`
- remove `data/ax.ts`
- remove the nav link and integrity test additions

Existing project pages and docs remain untouched.
