"use client";

import type { RememberResume } from "@/lib/resume/types";
import { careerMonths, monthsLabel } from "@/lib/resume/months";

import { Block, Line, Section, type FieldContext } from "./fields";

const toLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

/**
 * 리멤버 프로필 칸 배치. 칸 이름과 순서는 리멤버 프로필 편집 화면(2026-11-15 오너 제공)을 따른다.
 * 소개 영역의 둘째 칸은 받은 화면에 이름이 없어 '소개 둘째 칸'으로 적는다.
 */
export function RememberFields({
  draft,
  update,
  ctx,
  asOf,
}: {
  draft: RememberResume;
  update: (mutate: (next: RememberResume) => void) => void;
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
  const list = (path: string, label: string, value: string[]) => (
    <Block
      ctx={ctx}
      path={path}
      label={label}
      value={value.join("\n")}
      onChange={(v) => set(path, toLines(v))}
    />
  );

  const totalMonths = draft.careers.reduce(
    (sum, career) => sum + careerMonths(career.start, career.end ?? asOf),
    0,
  );

  return (
    <>
      <Section title="소개">
        {line("basic.name", "이름", draft.basic.name)}
        {block("intro.basic", "기본 소개 (5,000자까지)", draft.intro.basic)}
        {block(
          "intro.detail",
          "소개 둘째 칸 (5,000자까지)",
          draft.intro.detail,
        )}
      </Section>

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
                  {career.start} ~ {career.end ?? "현재 재직 중"} ·{" "}
                  {monthsLabel(careerMonths(career.start, career.end ?? asOf))}
                </span>
              </p>
              <div className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {line(`careers.${i}.company`, "회사명", career.company)}
                {line(`careers.${i}.department`, "부서", career.department)}
                {line(`careers.${i}.position`, "직급", career.position)}
                {line(`careers.${i}.start`, "입사년월", career.start)}
                <Line
                  ctx={ctx}
                  path={`careers.${i}.end`}
                  label="퇴사년월"
                  value={career.end ?? ""}
                  placeholder="현재 재직 중"
                  onChange={(v) => set(`careers.${i}.end`, v.trim() ? v : null)}
                />
              </div>
              {block(`careers.${i}.detail`, "업무 상세", career.detail)}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="학력">
        <ol className="space-y-3">
          {draft.education.map((school, i) => (
            <li
              key={i}
              className="grid grid-cols-1 gap-x-6 rounded-lg border border-stone-200 p-4 dark:border-stone-800 sm:grid-cols-2"
            >
              {line(`education.${i}.school`, "학교명", school.school)}
              {line(`education.${i}.degree`, "학위", school.degree)}
              {line(`education.${i}.major`, "전공", school.major)}
              {line(`education.${i}.start`, "입학연도", school.start)}
              {line(`education.${i}.end`, "졸업연도", school.end)}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="직무">
        {list("jobs", "선택한 직무 (한 줄에 하나)", draft.jobs)}
      </Section>

      <Section title="전문 분야·스킬">
        {list("skills", "키워드 (한 줄에 하나)", draft.skills)}
      </Section>

      <Section title="외국어">
        {block("languages", "내용", draft.languages)}
      </Section>

      <Section title="웹사이트·블로그">
        {list("websites", "주소 (한 줄에 하나)", draft.websites)}
      </Section>

      <Section title="강의·자문 활동">
        {block("lectures", "제목 · 활동시기", draft.lectures)}
      </Section>

      <Section title="논문·저서">
        {block("publications", "제목 · 발행연월", draft.publications)}
      </Section>

      <Section title="기사">
        {block("articles", "제목 · 링크", draft.articles)}
      </Section>

      <Section title="수상 및 기타이력">
        {block("awards", "특허, 직무 교육, 수상 이력 등", draft.awards)}
      </Section>

      <Section title="자격증">
        {block("certificates", "내용", draft.certificates)}
      </Section>
    </>
  );
}
