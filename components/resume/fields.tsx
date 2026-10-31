"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

/** 이력서 칸 부품 — 사람인·잡코리아 화면이 함께 쓴다. 칸마다 복사 버튼·글자 수·'변경' 표시를 둔다. */
export const BUTTON =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200";

export const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-60";

export interface FieldContext {
  editing: boolean;
  isChanged: (path: string) => boolean;
}

export function Section({
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

export function Line({
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

export function Block({
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

export function ChangedBadge() {
  return (
    <span className="ml-1.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
      변경
    </span>
  );
}

export function CopyButton({ text, label }: { text: string; label: string }) {
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
