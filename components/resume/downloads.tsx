"use client";

import { useState, useTransition } from "react";
import { Copy, Download, Link2Off } from "lucide-react";
import {
  shareResumeFile,
  stopResumeShare,
} from "@/app/(portfolio)/resume/actions";
import { PRODUCTION_ORIGIN } from "@/lib/auth/config";
import type { ShareSummary } from "@/lib/resume/shares";
import type { ResumePlatform } from "@/lib/resume/types";
import { BUTTON } from "./fields";

const DOCUMENTS = [
  ["resume", "이력서"],
  ["career", "경력기술서"],
  ["portfolio", "포트폴리오"],
  ["cover", "자기소개서"],
] as const;
const shareUrl = (token: string) =>
  `${PRODUCTION_ORIGIN}/resume/shared/${token}`;

export function ResumeDownloads({
  platform,
  versionId,
  editing,
  initialShares,
}: {
  platform: ResumePlatform;
  versionId: string;
  editing: boolean;
  initialShares: ShareSummary[];
}) {
  const [format, setFormat] = useState<"pdf" | "docx">("pdf");
  const [shares, setShares] = useState(initialShares);
  const [pending, startTransition] = useTransition();
  const [active, setActive] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [manualUrl, setManualUrl] = useState("");

  async function copy(url: string, name: string) {
    setManualUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setMessage(
        `${name} ${format.toUpperCase()} 다운로드 URL을 복사했습니다.`,
      );
      setManualUrl("");
    } catch {
      setMessage("주소가 준비되었습니다. 아래 주소를 선택해 복사해 주세요.");
    }
  }

  return (
    <section
      aria-label="제출용 파일"
      className="mt-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
      data-print-hide
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-stone-950 dark:text-stone-50">
            제출용 파일
          </h2>
          <p className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-400">
            PDF는 제출용, DOCX는 수정·파일 등록용입니다.
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-300">
          파일 형식
          <select
            aria-label="파일 형식"
            value={format}
            disabled={pending}
            onChange={(event) => {
              setFormat(event.target.value as "pdf" | "docx");
              setMessage("");
              setManualUrl("");
            }}
            className="min-h-11 rounded-md border border-stone-200 bg-white px-3 text-sm dark:border-stone-700 dark:bg-stone-950"
          >
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
          </select>
        </label>
      </div>
      <p className="mt-3 text-xs leading-5 text-stone-600 dark:text-stone-400">
        URL을 받은 사람은 로그인 없이 해당 파일을 받습니다. 공유 중단 전까지
        유효하며, 제출한 파일 내용은 바뀌지 않습니다.
      </p>
      {editing && (
        <p className="mt-2 text-xs text-amber-800 dark:text-amber-200">
          고치는 중인 내용은 새 버전으로 저장한 뒤 내려받거나 공유하세요.
        </p>
      )}
      <ul className="mt-3 divide-y divide-stone-200 dark:divide-stone-800">
        {DOCUMENTS.map(([kind, name]) => {
          const matching = shares.filter(
            (share) => share.kind === kind && share.format === format,
          );
          const existing = matching[0];
          const params = new URLSearchParams({
            p: platform,
            v: versionId,
            kind,
            format,
          });
          return (
            <li
              key={kind}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {name}
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  className={`${BUTTON} min-h-11`}
                  href={`/resume/download?${params}`}
                  download
                  aria-label={`${name} ${format.toUpperCase()} 다운로드`}
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  다운로드
                </a>
                <button
                  className={`${BUTTON} min-h-11`}
                  type="button"
                  disabled={pending}
                  aria-label={`${name} ${format.toUpperCase()} 다운로드 URL 복사`}
                  onClick={() => {
                    setActive(kind);
                    setError("");
                    setMessage("");
                    setManualUrl("");
                    if (existing) {
                      void copy(shareUrl(existing.token), name);
                      return;
                    }
                    startTransition(async () => {
                      try {
                        const result = await shareResumeFile({
                          platform,
                          versionId,
                          kind,
                          format,
                        });
                        if (result.error || !result.share) {
                          setError(result.error || "링크를 만들지 못했습니다.");
                          return;
                        }
                        const share = result.share;
                        setShares((current) => [...current, share]);
                        await copy(shareUrl(share.token), name);
                      } catch {
                        setError(
                          "링크를 만들지 못했습니다. 새로고침 후 다시 시도해 주세요.",
                        );
                      }
                    });
                  }}
                >
                  <Copy aria-hidden="true" className="h-4 w-4" />
                  {pending && active === kind ? "처리 중…" : "URL 복사"}
                </button>
                {existing && (
                  <button
                    className={`${BUTTON} min-h-11`}
                    type="button"
                    disabled={pending}
                    aria-label={`${name} ${format.toUpperCase()} 공유 중단`}
                    onClick={() => {
                      setActive(kind);
                      setError("");
                      setMessage("");
                      startTransition(async () => {
                        try {
                          for (const share of matching) {
                            const result = await stopResumeShare(share.token);
                            if (result.error) {
                              setError(result.error);
                              return;
                            }
                            setShares((current) =>
                              current.filter(
                                (item) => item.token !== share.token,
                              ),
                            );
                          }
                          setManualUrl("");
                          setMessage(
                            `${name} 공유를 중단했습니다. 제출했던 주소로는 더 이상 파일을 받을 수 없습니다.`,
                          );
                        } catch {
                          setError(
                            "공유를 중단하지 못했습니다. 새로고침 후 다시 시도해 주세요.",
                          );
                        }
                      });
                    }}
                  >
                    <Link2Off aria-hidden="true" className="h-4 w-4" />
                    공유 중단
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p
        role="status"
        className="text-xs leading-5 text-stone-600 dark:text-stone-300"
      >
        {message}
      </p>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
      {manualUrl && (
        <label className="mt-2 block text-xs font-semibold text-stone-600 dark:text-stone-300">
          제출용 다운로드 주소
          <input
            readOnly
            value={manualUrl}
            onFocus={(event) => event.target.select()}
            className="mt-1 min-h-11 w-full rounded-md border border-stone-300 bg-transparent px-3 text-sm"
          />
        </label>
      )}
    </section>
  );
}
