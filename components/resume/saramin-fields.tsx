"use client";

import type { SaraminResume } from "@/lib/resume/types";
import { careerMonths, monthsLabel } from "@/lib/resume/months";

import { Block, Line, Section, type FieldContext } from "./fields";

/** 사람인 이력서 칸 배치. 칸 이름과 순서는 사람인 이력서 화면을 따른다. */
export function SaraminFields({
  draft,
  update,
  ctx,
  asOf,
}: {
  draft: SaraminResume;
  update: (mutate: (next: SaraminResume) => void) => void;
  ctx: FieldContext;
  /** 재직 중 경력의 기준 달("YYYY.MM", KST) */
  asOf: string;
}) {
  const totalMonths = draft.careers.reduce(
    (sum, career) => sum + careerMonths(career.start, career.end ?? asOf),
    0,
  );
  return (
    <>
      <Section title="기본정보">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          <Line
            ctx={ctx}
            path="basic.name"
            label="이름"
            value={draft.basic.name}
            onChange={(v) =>
              update((n) => {
                n.basic.name = v;
              })
            }
          />
          <Line
            ctx={ctx}
            path="basic.careerType"
            label="경력구분"
            value={draft.basic.careerType}
            onChange={(v) =>
              update((n) => {
                n.basic.careerType = v;
              })
            }
          />
          <Line
            ctx={ctx}
            path="basic.gender"
            label="성별"
            value={draft.basic.gender}
            onChange={(v) =>
              update((n) => {
                n.basic.gender = v;
              })
            }
          />
          <Line
            ctx={ctx}
            path="basic.birthYear"
            label="출생연도"
            value={draft.basic.birthYear}
            onChange={(v) =>
              update((n) => {
                n.basic.birthYear = v;
              })
            }
          />
          <Line
            ctx={ctx}
            path="basic.email"
            label="이메일"
            value={draft.basic.email}
            onChange={(v) =>
              update((n) => {
                n.basic.email = v;
              })
            }
          />
          <Line
            ctx={ctx}
            path="basic.phone"
            label="휴대폰"
            value={draft.basic.phone}
            onChange={(v) =>
              update((n) => {
                n.basic.phone = v;
              })
            }
          />
          <div className="sm:col-span-2">
            <Line
              ctx={ctx}
              path="basic.address"
              label="주소"
              value={draft.basic.address}
              onChange={(v) =>
                update((n) => {
                  n.basic.address = v;
                })
              }
            />
          </div>
        </div>
      </Section>

      <Section title="MY Career">
        <Block
          ctx={ctx}
          path="myCareer"
          label="마이커리어 소개"
          value={draft.myCareer}
          onChange={(v) =>
            update((n) => {
              n.myCareer = v;
            })
          }
        />
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
                <Line
                  ctx={ctx}
                  path={`careers.${i}.company`}
                  label="회사명"
                  value={career.company}
                  onChange={(v) =>
                    update((n) => {
                      n.careers[i].company = v;
                    })
                  }
                />
                <Line
                  ctx={ctx}
                  path={`careers.${i}.job`}
                  label="직무"
                  value={career.job}
                  onChange={(v) =>
                    update((n) => {
                      n.careers[i].job = v;
                    })
                  }
                />
                <Line
                  ctx={ctx}
                  path={`careers.${i}.start`}
                  label="입사년월"
                  value={career.start}
                  onChange={(v) =>
                    update((n) => {
                      n.careers[i].start = v;
                    })
                  }
                />
                <Line
                  ctx={ctx}
                  path={`careers.${i}.end`}
                  label="퇴사년월"
                  value={career.end ?? ""}
                  placeholder="재직중"
                  onChange={(v) =>
                    update((n) => {
                      n.careers[i].end = v.trim() ? v : null;
                    })
                  }
                />
                <Line
                  ctx={ctx}
                  path={`careers.${i}.role`}
                  label="부서·직급"
                  value={career.role}
                  onChange={(v) =>
                    update((n) => {
                      n.careers[i].role = v;
                    })
                  }
                />
                <Line
                  ctx={ctx}
                  path={`careers.${i}.leaveReason`}
                  label="퇴사사유"
                  value={career.leaveReason}
                  onChange={(v) =>
                    update((n) => {
                      n.careers[i].leaveReason = v;
                    })
                  }
                />
              </div>
              <Block
                ctx={ctx}
                path={`careers.${i}.duty`}
                label="담당업무"
                value={career.duty}
                onChange={(v) =>
                  update((n) => {
                    n.careers[i].duty = v;
                  })
                }
              />
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
              <Line
                ctx={ctx}
                path={`education.${i}.school`}
                label="학교명"
                value={school.school}
                onChange={(v) =>
                  update((n) => {
                    n.education[i].school = v;
                  })
                }
              />
              <Line
                ctx={ctx}
                path={`education.${i}.level`}
                label="구분"
                value={school.level}
                onChange={(v) =>
                  update((n) => {
                    n.education[i].level = v;
                  })
                }
              />
              <Line
                ctx={ctx}
                path={`education.${i}.status`}
                label="졸업여부"
                value={school.status}
                onChange={(v) =>
                  update((n) => {
                    n.education[i].status = v;
                  })
                }
              />
              <Line
                ctx={ctx}
                path={`education.${i}.major`}
                label="전공·계열"
                value={school.major}
                onChange={(v) =>
                  update((n) => {
                    n.education[i].major = v;
                  })
                }
              />
              <Line
                ctx={ctx}
                path={`education.${i}.minor`}
                label="부전공"
                value={school.minor}
                onChange={(v) =>
                  update((n) => {
                    n.education[i].minor = v;
                  })
                }
              />
            </li>
          ))}
        </ol>
      </Section>

      <Section title="스킬">
        <Block
          ctx={ctx}
          path="skills"
          label="나의 스킬 (한 줄에 하나)"
          value={draft.skills.join("\n")}
          onChange={(v) =>
            update((n) => {
              n.skills = v
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);
            })
          }
        />
      </Section>

      <Section title="포트폴리오">
        {draft.portfolio.map((item, i) => (
          <Line
            key={i}
            ctx={ctx}
            path={`portfolio.${i}.url`}
            label={item.label}
            value={item.url}
            onChange={(v) =>
              update((n) => {
                n.portfolio[i].url = v;
              })
            }
          />
        ))}
      </Section>

      <Section title="경력기술서">
        <Line
          ctx={ctx}
          path="careerDescription.title"
          label="제목"
          value={draft.careerDescription.title}
          onChange={(v) =>
            update((n) => {
              n.careerDescription.title = v;
            })
          }
        />
        <Block
          ctx={ctx}
          path="careerDescription.body"
          label="내용"
          value={draft.careerDescription.body}
          onChange={(v) =>
            update((n) => {
              n.careerDescription.body = v;
            })
          }
        />
      </Section>

      <Section title="자기소개서">
        {draft.coverLetter.map((essay, i) => (
          <div key={i} className="mt-2">
            <Line
              ctx={ctx}
              path={`coverLetter.${i}.title`}
              label="제목"
              value={essay.title}
              onChange={(v) =>
                update((n) => {
                  n.coverLetter[i].title = v;
                })
              }
            />
            <Block
              ctx={ctx}
              path={`coverLetter.${i}.body`}
              label="내용"
              value={essay.body}
              onChange={(v) =>
                update((n) => {
                  n.coverLetter[i].body = v;
                })
              }
            />
          </div>
        ))}
      </Section>
    </>
  );
}
