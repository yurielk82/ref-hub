"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { Check, Copy, PencilLine, Save, X } from "lucide-react";

import { saveResumeVersion } from "@/app/(portfolio)/resume/actions";
import type { SaraminResume } from "@/lib/resume/types";
import { careerMonths, monthsLabel } from "@/lib/resume/months";

interface VersionOption {
  id: string;
  label: string;
  savedLabel: string;
}

/**
 * 사람인 이력서 작업 화면. 칸마다 복사 버튼과 글자 수를 두고, 이전 버전과 달라진 칸은 표시해
 * 사람인에서 무엇을 고쳐야 하는지 바로 보이게 한다. 편집한 내용은 새 버전으로만 저장한다.
 */
export function ResumeWorkspace({
  version,
  versions,
  previousLabel,
  changed,
  resume,
  asOf,
}: {
  version: VersionOption;
  versions: VersionOption[];
  previousLabel: string | null;
  changed: string[];
  resume: SaraminResume;
  /** 재직 중 경력의 기준 달("YYYY.MM", KST) — 서버와 브라우저가 같은 값을 쓰게 서버에서 정한다 */
  asOf: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(resume);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();

  const changedSet = new Set(changed);
  const isChanged = (path: string) =>
    [...changedSet].some(
      (item) => item === path || item.startsWith(`${path}.`),
    );

  const update = (mutate: (next: SaraminResume) => void) =>
    setDraft((current) => {
      const next = structuredClone(current);
      mutate(next);
      return next;
    });

  const totalMonths = draft.careers.reduce(
    (sum, career) => sum + careerMonths(career.start, career.end ?? asOf),
    0,
  );

  const ctx: FieldContext = { editing, isChanged };

  return (
    <div className="mt-8">
      <div
        className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:flex-row sm:items-end sm:justify-between"
        data-print-hide
      >
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400">
          버전
          <select
            value={version.id}
            onChange={(event) =>
              router.push(`/resume?v=${encodeURIComponent(event.target.value)}`)
            }
            className="w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            {versions.map((option, index) => (
              <option key={option.id} value={option.id}>
                {option.savedLabel} · {option.label}
                {index === 0 ? " (최신)" : ""}
              </option>
            ))}
          </select>
        </label>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={BUTTON}
          >
            <PencilLine className="h-4 w-4" />
            고쳐서 새 버전 만들기
          </button>
        ) : (
          <div className="flex flex-wrap items-end gap-2">
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400">
              새 버전 이름
              <input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                maxLength={80}
                placeholder="예: 안국약품 유통지원팀 지원용"
                className="w-64 max-w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
              />
            </label>
            <button
              type="button"
              disabled={saving}
              onClick={() =>
                startSaving(async () => {
                  setError(null);
                  const result = await saveResumeVersion({
                    resume: draft,
                    label,
                  });
                  if (result?.error) setError(result.error);
                })
              }
              className={PRIMARY_BUTTON}
            >
              <Save className="h-4 w-4" />
              {saving ? "저장 중" : "새 버전으로 저장"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setDraft(resume);
                setEditing(false);
                setError(null);
              }}
              className={BUTTON}
            >
              <X className="h-4 w-4" />
              취소
            </button>
          </div>
        )}
      </div>
      <p
        className="mt-2 text-xs leading-5 text-stone-500 dark:text-stone-400"
        data-print-hide
      >
        {previousLabel
          ? `'${previousLabel}' 버전과 달라진 칸에 '변경' 표시가 붙습니다. 사람인에서는 그 칸만 고치면 됩니다.`
          : "처음 저장한 버전이라 비교할 이전 버전이 없습니다."}
      </p>
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
        >
          {error}
        </p>
      )}

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
    </div>
  );
}

const BUTTON =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-60";

interface FieldContext {
  editing: boolean;
  isChanged: (path: string) => boolean;
}

function Section({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <div className="flex items-baseline justify-between gap-3 border-b border-stone-200 pb-3 dark:border-stone-800">
        <h2 className="text-lg font-bold text-stone-950 dark:text-stone-50">
          {title}
        </h2>
        {aside && (
          <span className="text-sm font-semibold tabular-nums text-[var(--accent)]">
            {aside}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Line({
  ctx,
  path,
  label,
  value,
  placeholder,
  onChange,
}: {
  ctx: FieldContext;
  path: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 border-b border-stone-100 py-2.5 last:border-b-0 dark:border-stone-800/60">
      <span className="w-20 shrink-0 pt-1 text-xs font-semibold text-stone-500 dark:text-stone-400">
        {label}
        {ctx.isChanged(path) && <ChangedBadge />}
      </span>
      {ctx.editing ? (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full min-w-0 flex-1 rounded-md border border-stone-200 bg-white px-2 py-1 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
        />
      ) : (
        <span className="min-w-0 flex-1 break-words pt-0.5 text-sm text-stone-900 dark:text-stone-100">
          {value || (
            <span className="text-stone-400 dark:text-stone-500">
              {placeholder ?? "비어 있음"}
            </span>
          )}
        </span>
      )}
      {!ctx.editing && value && <CopyButton text={value} label={label} />}
    </div>
  );
}

function Block({
  ctx,
  path,
  label,
  value,
  onChange,
}: {
  ctx: FieldContext;
  path: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
          {label}
          {ctx.isChanged(path) && <ChangedBadge />}
          <span className="ml-2 font-normal tabular-nums">
            {value.length.toLocaleString("ko-KR")}자
          </span>
        </span>
        {!ctx.editing && value && <CopyButton text={value} label={label} />}
      </div>
      {ctx.editing ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={Math.min(24, Math.max(4, value.split("\n").length + 1))}
          className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm leading-6 text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
        />
      ) : (
        <p className="mt-2 whitespace-pre-wrap break-words rounded-md bg-stone-50 px-3 py-2.5 text-sm leading-7 text-stone-800 dark:bg-stone-950 dark:text-stone-200">
          {value || (
            <span className="text-stone-400 dark:text-stone-500">
              비어 있음
            </span>
          )}
        </p>
      )}
    </div>
  );
}

function ChangedBadge() {
  return (
    <span className="ml-1.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
      변경
    </span>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      data-print-hide
      aria-label={`${label} 복사`}
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-stone-200 px-2 py-1 text-xs font-semibold text-stone-600 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-stone-700 dark:text-stone-300"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "복사됨" : "복사"}
    </button>
  );
}
