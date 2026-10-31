"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { Download, PencilLine, Save, X } from "lucide-react";

import {
  saveResumeVersion,
  type SaveInput,
} from "@/app/(portfolio)/resume/actions";
import type { ResumePlatform } from "@/lib/resume/types";
import { SITE_NAMES, resumeHref } from "@/lib/resume/platforms";

import { BUTTON, PRIMARY_BUTTON, type FieldContext } from "./fields";

const DOWNLOADS = [
  ["resume", "이력서"],
  ["career", "경력기술서"],
  ["cover", "자기소개서"],
] as const;

function downloadHref(platform: ResumePlatform, id: string, kind: string) {
  const params = new URLSearchParams({ kind, v: id });
  if (platform !== "saramin") params.set("p", platform);
  return `/resume/download?${params}`;
}

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
  version,
  versions,
  previousLabel,
  changed,
  resume,
  children,
}: {
  platform: ResumePlatform;
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
            onChange={(event) =>
              router.push(resumeHref(platform, event.target.value))
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
                    platform,
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
      <div
        className="mt-3 flex flex-col gap-2 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:flex-row sm:items-center sm:justify-between"
        data-print-hide
      >
        <p className="text-xs leading-5 text-stone-600 dark:text-stone-400">
          사람인 &lsquo;파일로 이력서 만들기&rsquo;에 올릴 워드 파일입니다.
          저장된 이 버전을 내려받습니다
          {editing ? "(고치는 중인 내용은 저장해야 들어갑니다)" : ""}.
        </p>
        <div className="flex flex-wrap gap-2">
          {DOWNLOADS.map(([kind, name]) => (
            <a
              key={kind}
              href={downloadHref(platform, version.id, kind)}
              download
              className={BUTTON}
            >
              <Download className="h-4 w-4" />
              {name}
            </a>
          ))}
        </div>
      </div>
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
