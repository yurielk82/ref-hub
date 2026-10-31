"use client";

import type { JobkoreaResume } from "@/lib/resume/types";
import { careerMonths, monthsLabel } from "@/lib/resume/months";

import { Block, Line, Section, type FieldContext } from "./fields";

/**
 * 잡코리아 이력서 칸 배치. 칸 이름과 순서는 잡코리아 이력서 보기 화면(2026-10-31 오너 제공)을 따른다.
 * 사람인과 달리 경력마다 부서·직급·직책·연봉을 따로 받고, 학력에 기간·학점, 끝에 희망근무조건이 있다.
 */
export function JobkoreaFields({
  draft,
  update,
  ctx,
  asOf,
}: {
  draft: JobkoreaResume;
  update: (mutate: (next: JobkoreaResume) => void) => void;
  ctx: FieldContext;
  /** 재직 중 경력의 기준 달("YYYY.MM", KST) */
  asOf: string;
}) {
  /** "careers.0.salary" 같은 경로의 칸 하나를 고친다 */
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

  const totalMonths = draft.careers.reduce(
    (sum, career) => sum + careerMonths(career.start, career.end ?? asOf),
    0,
  );

  return (
    <>
      <Section title="이력서 제목">
        {line("title", "제목", draft.title)}
      </Section>

      <Section title="인적사항">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          {line("basic.name", "이름", draft.basic.name)}
          {line("basic.gender", "성별", draft.basic.gender)}
          {line("basic.birthYear", "출생연도", draft.basic.birthYear)}
          {line("basic.phone", "휴대폰", draft.basic.phone)}
          {line("basic.email", "이메일", draft.basic.email)}
          {line("basic.address", "주소", draft.basic.address)}
        </div>
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

      <Section title="학력">
        <ol className="space-y-3">
          {draft.education.map((school, i) => (
            <li
              key={i}
              className="grid grid-cols-1 gap-x-6 rounded-lg border border-stone-200 p-4 dark:border-stone-800 sm:grid-cols-2"
            >
              {line(`education.${i}.school`, "학교명", school.school)}
              {line(`education.${i}.level`, "구분", school.level)}
              {line(`education.${i}.start`, "입학년월", school.start)}
              {line(`education.${i}.end`, "졸업년월", school.end)}
              {line(`education.${i}.status`, "졸업상태", school.status)}
              {line(`education.${i}.major`, "전공", school.major)}
              {line(`education.${i}.gpa`, "학점", school.gpa)}
            </li>
          ))}
        </ol>
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
                  {career.start} ~ {career.end ?? "재직중"} ·{" "}
                  {monthsLabel(careerMonths(career.start, career.end ?? asOf))}
                </span>
              </p>
              <div className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {line(`careers.${i}.company`, "회사명", career.company)}
                {line(`careers.${i}.department`, "부서", career.department)}
                {line(`careers.${i}.start`, "입사년월", career.start)}
                <Line
                  ctx={ctx}
                  path={`careers.${i}.end`}
                  label="퇴사년월"
                  value={career.end ?? ""}
                  placeholder="재직중"
                  onChange={(v) => set(`careers.${i}.end`, v.trim() ? v : null)}
                />
                {line(`careers.${i}.position`, "직급", career.position)}
                {line(`careers.${i}.title`, "직책", career.title)}
                {line(`careers.${i}.job`, "주요직무", career.job)}
                {line(`careers.${i}.salary`, "연봉", career.salary)}
              </div>
              <Block
                ctx={ctx}
                path={`careers.${i}.duty`}
                label="담당업무"
                value={career.duty}
                onChange={(v) => set(`careers.${i}.duty`, v)}
              />
            </li>
          ))}
        </ol>
      </Section>

      <Section title="인턴·대외활동 / 해외경험">
        <Block
          ctx={ctx}
          path="activities"
          label="내용"
          value={draft.activities}
          onChange={(v) => set("activities", v)}
        />
      </Section>

      <Section title="자격증 / 어학">
        <Block
          ctx={ctx}
          path="certificates"
          label="내용"
          value={draft.certificates}
          onChange={(v) => set("certificates", v)}
        />
      </Section>

      <Section title="경력기술서">
        {line("careerDescription.title", "제목", draft.careerDescription.title)}
        <Block
          ctx={ctx}
          path="careerDescription.body"
          label="내용"
          value={draft.careerDescription.body}
          onChange={(v) => set("careerDescription.body", v)}
        />
      </Section>

      <Section title="자기소개서">
        {draft.coverLetter.map((essay, i) => (
          <div key={i} className="mt-2">
            {line(`coverLetter.${i}.title`, "제목", essay.title)}
            <Block
              ctx={ctx}
              path={`coverLetter.${i}.body`}
              label="내용"
              value={essay.body}
              onChange={(v) => set(`coverLetter.${i}.body`, v)}
            />
          </div>
        ))}
      </Section>

      <Section title="포트폴리오">
        {draft.portfolio.map((item, i) => (
          <div key={i}>{line(`portfolio.${i}.url`, item.label, item.url)}</div>
        ))}
      </Section>

      <Section title="희망근무조건">
        {line(
          "preference.employmentType",
          "고용형태",
          draft.preference.employmentType,
        )}
        {line("preference.location", "희망근무지", draft.preference.location)}
        {line("preference.salary", "희망연봉", draft.preference.salary)}
        {line("preference.jobs", "직무", draft.preference.jobs)}
        {line("preference.industries", "산업", draft.preference.industries)}
      </Section>
    </>
  );
}
