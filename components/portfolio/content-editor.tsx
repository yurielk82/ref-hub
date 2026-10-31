"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { savePortfolio } from "@/app/(portfolio)/edit/actions";
import type { CopyField } from "@/lib/portfolio/store";
import type { PortfolioTrack } from "@/lib/portfolio/content";

const inputClass =
  "mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-base leading-7 text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50";
export function PortfolioEditor({
  track,
  fields,
  revision: initialRevision,
  canSave,
}: {
  track: PortfolioTrack;
  fields: CopyField[];
  revision: string;
  canSave: boolean;
}) {
  const [saved, setSaved] = useState(() =>
    Object.fromEntries(fields.map((field) => [field.id, field.value])),
  );
  const [draft, setDraft] = useState(saved);
  const [revision, setRevision] = useState(initialRevision);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const saving = useRef(false);
  const [query, setQuery] = useState("");
  const changed = fields.filter((field) => draft[field.id] !== saved[field.id]);
  const dirty = changed.length > 0;
  const invalid = changed.find(
    (field) =>
      !draft[field.id].trim() ||
      draft[field.id].trim().length > field.maxLength,
  );
  const groups = [...new Set(fields.map((field) => field.group))];
  const home = track === "ax" ? "/ax" : "/";
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  function submit() {
    if (saving.current || !dirty || invalid || !canSave) return;
    saving.current = true;
    setError("");
    setMessage("");
    const changes = Object.fromEntries(
      changed.map((field) => [field.id, draft[field.id]]),
    );
    startTransition(async () => {
      try {
        const result = await savePortfolio({ revision, changes });
        if (result.error) {
          setError(result.error);
          return;
        }
        if (!result.revision) {
          setError("저장 결과를 확인하지 못했습니다. 다시 저장해 주세요.");
          return;
        }
        const normalized = Object.fromEntries(
          Object.entries(changes).map(([key, value]) => [key, value.trim()]),
        );
        setSaved((previous) => ({ ...previous, ...normalized }));
        setDraft((previous) => ({ ...previous, ...normalized }));
        setRevision(result.revision);
        setMessage("저장 완료. 공개 홈페이지에 반영했습니다.");
      } catch {
        setError(
          "연결이 끊겨 저장 결과를 확인하지 못했습니다. 입력한 글을 복사해 두고 새로고침해 주세요.",
        );
      } finally {
        saving.current = false;
      }
    });
  }
  return (
    <section className="mx-auto max-w-4xl px-6 pt-10 pb-40">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-950 dark:text-stone-50">
            홈페이지 편집
          </h1>
          <p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">
            {track === "ax" ? "AX" : "영업관리"} 소개와 사례 문구를 직접
            수정하세요. 저장하면 공개 화면에 바로 반영됩니다.
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
            제출용 이력서는 이력서 메뉴에서 별도로 수정합니다.
          </p>
        </div>
        <a
          href={home}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-4 font-semibold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
        >
          공개 화면 보기 ↗
        </a>
      </div>
      <label className="mt-8 block font-semibold" htmlFor="copy-search">
        수정할 항목 찾기
      </label>
      <input
        id="copy-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="예: 첫 소개, 경영진, 공급내역보고"
        className={inputClass}
      />
      <div className="mt-6 divide-y divide-stone-200 dark:divide-stone-800">
        {groups.map((group, index) => {
          const matches = fields.filter(
            (field) =>
              field.group === group &&
              `${group} ${field.label} ${draft[field.id]}`.includes(query),
          );
          if (!matches.length) return null;
          return (
            <details
              key={`${group}-${Boolean(query)}`}
              open={query ? true : index === 0}
              className="py-5"
            >
              <summary className="cursor-pointer py-2 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
                {group}
              </summary>
              <fieldset
                disabled={pending}
                className="mt-5 space-y-6 border-0 p-0"
              >
                <legend className="sr-only">{group} 수정</legend>
                {matches.map((field) => {
                  const value = draft[field.id];
                  const id = `field-${field.id}`;
                  return (
                    <div key={field.id}>
                      <div className="flex justify-between gap-4">
                        <label htmlFor={id} className="font-medium">
                          {field.label}
                        </label>
                        <span
                          id={`${id}-count`}
                          className={`text-sm tabular-nums ${value.length > field.maxLength ? "text-red-700 dark:text-red-300" : "text-stone-600 dark:text-stone-400"}`}
                        >
                          {value.length}/{field.maxLength}자
                        </span>
                      </div>
                      <textarea
                        id={id}
                        rows={
                          field.multiline ? 5 : field.maxLength > 150 ? 3 : 2
                        }
                        value={value}
                        aria-describedby={`${id}-count`}
                        aria-invalid={
                          !value.trim() || value.trim().length > field.maxLength
                        }
                        onChange={(event) => {
                          setDraft((previous) => ({
                            ...previous,
                            [field.id]: event.target.value,
                          }));
                          setMessage("");
                        }}
                        className={inputClass}
                      />
                    </div>
                  );
                })}
              </fieldset>
            </details>
          );
        })}
        {fields.every(
          (field) =>
            !`${field.group} ${field.label} ${draft[field.id]}`.includes(query),
        ) && (
          <p className="py-8 text-stone-600 dark:text-stone-300">
            일치하는 항목이 없습니다. 다른 단어로 찾아보세요.
          </p>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white px-6 py-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p role="status" className="text-sm font-medium">
              {pending
                ? "저장 중…"
                : message ||
                  (dirty
                    ? `${changed.length}개 항목 수정 · 아직 저장하지 않았습니다.`
                    : "수정할 항목을 열어 글을 바꾸세요.")}
            </p>
            {(error || invalid || !canSave) && (
              <p
                role="alert"
                className="mt-1 text-sm text-red-700 dark:text-red-300"
              >
                {error ||
                  (!canSave
                    ? "저장 폴더가 설정되지 않았습니다."
                    : `${invalid?.label}: 1~${invalid?.maxLength}자로 입력해 주세요.`)}
              </p>
            )}
          </div>
          <button
            type="button"
            disabled={!dirty || pending}
            onClick={() => {
              if (window.confirm("저장하지 않은 수정 내용을 취소할까요?")) {
                setDraft(saved);
                setError("");
                setMessage("");
              }
            }}
            className="min-h-11 rounded-md border border-stone-300 px-4 font-semibold hover:bg-stone-100 disabled:opacity-40 dark:border-stone-700 dark:hover:bg-stone-800"
          >
            수정 취소
          </button>
          <button
            type="button"
            disabled={!dirty || pending || Boolean(invalid) || !canSave}
            onClick={submit}
            className="min-h-11 rounded-md bg-teal-700 px-6 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>
    </section>
  );
}
