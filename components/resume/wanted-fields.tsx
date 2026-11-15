"use client";

import type { WantedResume } from "@/lib/resume/types";
import { careerMonths, monthsLabel } from "@/lib/resume/months";

import { Block, Line, Section, type FieldContext } from "./fields";

/**
 * 원티드 이력서 칸 배치. 칸 이름과 순서는 원티드 이력서 편집 화면(2026-11-15 오너 제공)을 따른다.
 * 경력마다 직무·직책을 적고 그 아래 주요 성과(제목·기간·직무·직책·내용)를 여러 건 단다.
 */
export function WantedFields({
  draft,
  update,
  ctx,
  asOf,
}: {
  draft: WantedResume;
  update: (mutate: (next: WantedResume) => void) => void;
  ctx: FieldContext;
  /** 재직 중 경력의 기준 달("YYYY.MM", KST) */
  asOf: string;
}) {
  const set = (path: string, value: unknown) =>
    update((next) => {
      const keys = path.split(".");
      let target = next as unknown as Record<string, unknown>;
      for (const key of keys.slice(0, -1))
        target = target[key] as Record<string, unknown>;
      target[keys.at(-1)!] = value;
    });
  const line = (path: string, label: string, value: string) => (
    <Line
      ctx={ctx}
      path={path}
      label={label}
      value={value}
      onChange={(v) => set(path, v)}
    />
  );
  const block = (path: string, label: string, value: string) => (
    <Block
      ctx={ctx}
      path={path}
      label={label}
      value={value}
      onChange={(v) => set(path, v)}
    />
  );

  const totalMonths = draft.careers.reduce(
    (sum, career) => sum + careerMonths(career.start, career.end ?? asOf),
    0,
  );

  return (
    <>
      <Section title="기본 정보">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          {line("basic.name", "이름", draft.basic.name)}
          {line("basic.phone", "연락처", draft.basic.phone)}
          {line("basic.email", "이메일", draft.basic.email)}
        </div>
      </Section>

      <Section title="간단 소개">{block("intro", "내용", draft.intro)}</Section>

      <Section title="경력" aside={`총 경력 ${monthsLabel(totalMonths)}`}>
        <ol className="space-y-4">
          {draft.careers.map((career, i) => (
            <li
              key={i}
              className="rounded-lg border border-stone-200 p-4 dark:border-stone-800"
            >
              <p className="text-sm font-bold text-stone-950 dark:text-stone-50">
                {career.company}
                <span className="ml-2 text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400">
                  {career.start} ~ {career.end ?? "재직 중"} ·{" "}
                  {monthsLabel(careerMonths(career.start, career.end ?? asOf))}
                </span>
              </p>
              <div className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {line(`careers.${i}.company`, "회사명", career.company)}
                {line(`careers.${i}.job`, "직무", career.job)}
                {line(`careers.${i}.start`, "입사년월", career.start)}
                <Line
                  ctx={ctx}
                  path={`careers.${i}.end`}
                  label="퇴사년월"
                  value={career.end ?? ""}
                  placeholder="재직 중"
                  onChange={(v) => set(`careers.${i}.end`, v.trim() ? v : null)}
                />
                {line(`careers.${i}.position`, "직책", career.position)}
              </div>
              <ol className="mt-3 space-y-3">
                {career.achievements.map((item, j) => {
                  const at = `careers.${i}.achievements.${j}`;
                  return (
                    <li
                      key={j}
                      className="rounded-md border border-stone-200 bg-stone-50/60 p-3 dark:border-stone-800 dark:bg-stone-950/40"
                    >
                      <p className="text-xs font-bold text-stone-600 dark:text-stone-300">
                        주요 성과 {j + 1}
                      </p>
                      {line(`${at}.title`, "성과명", item.title)}
                      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                        {line(`${at}.start`, "시작년월", item.start)}
                        {line(`${at}.end`, "종료년월", item.end)}
                        {line(`${at}.job`, "직무", item.job)}
                        {line(`${at}.position`, "직책", item.position)}
                      </div>
                      {block(`${at}.detail`, "내용", item.detail)}
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="학력">
        <ol className="space-y-3">
          {draft.education.map((school, i) => (
            <li
              key={i}
              className="rounded-lg border border-stone-200 p-4 dark:border-stone-800"
            >
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {line(`education.${i}.school`, "학교명", school.school)}
                {line(`education.${i}.major`, "전공·학위", school.major)}
                {line(`education.${i}.start`, "입학년월", school.start)}
                {line(`education.${i}.end`, "졸업년월", school.end)}
              </div>
              {block(`education.${i}.detail`, "이수 과목·활동", school.detail)}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="AI 활용 경험">
        {block("aiExperience", "AI 활용 경험 요약", draft.aiExperience)}
      </Section>

      <Section title="스킬">
        <Block
          ctx={ctx}
          path="skills"
          label="스킬 (한 줄에 하나)"
          value={draft.skills.join("\n")}
          onChange={(v) =>
            set(
              "skills",
              v
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </Section>

      <Section title="수상/자격증/기타">
        {block("awards", "활동명 · 연월 · 세부 내용", draft.awards)}
      </Section>

      <Section title="언어">
        {block(
          "languages",
          "어학시험 (시험명 · 점수/등급 · 날짜)",
          draft.languages,
        )}
      </Section>

      <Section title="링크">
        {draft.links.map((item, i) => (
          <div key={i}>
            {line(`links.${i}.label`, "이름", item.label)}
            {line(`links.${i}.url`, "주소", item.url)}
          </div>
        ))}
      </Section>
    </>
  );
}
