"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import { PencilLine, Save, X } from "lucide-react";

import {
  saveResumeVersion,
  type SaveInput,
} from "@/app/(legacy)/(portfolio)/resume/actions";
import type { ResumePlatform } from "@/lib/resume/types";
import { SITE_NAMES, resumeHref } from "@/lib/resume/platforms";

import { ResumeDownloads } from "./downloads";
import type { ShareSummary } from "@/lib/resume/shares";

import { BUTTON, PRIMARY_BUTTON, type FieldContext } from "./fields";

export interface VersionOption {
  id: string;
  label: string;
  savedLabel: string;
}

/**
 * 이력서 작업 틀 — 버전 고르기, 고쳐서 새 버전으로 저장, 이전 버전과 달라진 칸 표시.
 * 칸 배치는 사이트마다 달라 children으로 받는다. 편집한 내용은 새 버전으로만 저장한다.
 */
export function ResumeShell<R extends object>({
  platform,
  home,
  shares,
  version,
  versions,
  previousLabel,
  changed,
  resume,
  children,
}: {
  platform: ResumePlatform;
  home?: "/" | "/ax";
  shares: ShareSummary[];
  version: VersionOption;
  versions: VersionOption[];
  previousLabel: string | null;
  changed: string[];
  resume: R;
  children: (state: {
    draft: R;
    update: (mutate: (next: R) => void) => void;
    ctx: FieldContext;
  }) => ReactNode;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(resume);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const dirty = editing && JSON.stringify(draft) !== JSON.stringify(resume);
  const canLeave = () =>
    !dirty ||
    window.confirm("저장하지 않은 이력서 수정 내용이 있습니다. 이동할까요?");
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    const leave = (event: MouseEvent | SubmitEvent) => {
      if (event.defaultPrevented) return;
      if (event instanceof MouseEvent) {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const link =
          event.target instanceof Element
            ? event.target.closest("a[href]")
            : null;
        if (
          !(link instanceof HTMLAnchorElement) ||
          link.target === "_blank" ||
          link.hasAttribute("download")
        )
          return;
      }
      if (
        !window.confirm(
          "저장하지 않은 이력서 수정 내용이 있습니다. 이동할까요?",
        )
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", leave, true);
    document.addEventListener("submit", leave, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", leave, true);
      document.removeEventListener("submit", leave, true);
    };
  }, [dirty]);

  const changedSet = new Set(changed);
  const isChanged = (path: string) =>
    [...changedSet].some(
      (item) => item === path || item.startsWith(`${path}.`),
    );

  const update = (mutate: (next: R) => void) =>
    setDraft((current) => {
      const next = structuredClone(current);
      mutate(next);
      return next;
    });

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
            onChange={(event) => {
              if (canLeave())
                router.push(resumeHref(platform, event.target.value, home));
            }}
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
                    platform,
                    home,
                    resume: draft,
                    label,
                  } as SaveInput);
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
          ? `'${previousLabel}' 버전과 달라진 칸에 '변경' 표시가 붙습니다. ${SITE_NAMES[platform]}에서는 그 칸만 고치면 됩니다.`
          : "처음 저장한 버전이라 비교할 이전 버전이 없습니다."}
      </p>
      <ResumeDownloads
        platform={platform}
        versionId={version.id}
        editing={editing}
        initialShares={shares}
      />
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
        >
          {error}
        </p>
      )}

      {children({ draft, update, ctx })}
    </div>
  );
}
