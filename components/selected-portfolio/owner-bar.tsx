"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  ownerHref,
  type OwnerSection,
  type PortfolioHome,
} from "@/lib/selected-portfolio/workspace";
import { useCopyEditing } from "./editable-copy";

export function OwnerBar({
  home,
  section,
}: {
  home: PortfolioHome;
  section: OwnerSection | null;
}) {
  const editing = useCopyEditing();
  const router = useRouter();
  const bar = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = bar.current;
    if (!element) return;
    const sync = () =>
      element.parentElement?.style.setProperty(
        "--ownerbar-height",
        `${element.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    sync();
    return () => observer.disconnect();
  }, []);
  if (!editing) return null;
  return (
    <header ref={bar} className="owner-bar" data-print-hide>
      <nav aria-label="오너 관리 메뉴">
        {section ? (
          <Link
            href={`${home}?edit=1`}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              event.preventDefault();
              if (editing.pending) return;
              router.push(`${home}${window.location.hash}`, { scroll: false });
              editing.begin();
            }}
            scroll={false}
          >
            문구 편집
          </Link>
        ) : (
          <button
            type="button"
            aria-pressed={editing.editing}
            disabled={editing.pending}
            onClick={() => {
              editing.begin();
            }}
          >
            문구 편집
          </button>
        )}
        <Link
          href={ownerHref(home, "resume")}
          onClick={(event) => {
            if (editing.pending) event.preventDefault();
            else editing.suspend();
          }}
          aria-current={section === "resume" ? "page" : undefined}
          scroll={false}
        >
          이력서·제출 파일
        </Link>
        <Link
          href={ownerHref(home, "jobs")}
          onClick={(event) => {
            if (editing.pending) event.preventDefault();
            else editing.suspend();
          }}
          aria-current={section === "jobs" ? "page" : undefined}
          scroll={false}
        >
          공고
        </Link>
        <form
          action="/auth/logout"
          method="post"
          onSubmit={(event) => {
            if (!editing.canLeave()) event.preventDefault();
          }}
        >
          <input type="hidden" name="next" value={home} />
          <button type="submit" disabled={editing.pending}>
            로그아웃
          </button>
        </form>
      </nav>
      {editing.editing && !section && (
        <div className="owner-edit-actions">
          <span>
            {editing.invalid
              ? `${editing.invalid.label}을 확인해 주세요.`
              : editing.dirty
                ? "저장하지 않은 수정 내용이 있습니다."
                : "본문에서 수정할 문구를 선택하세요."}
          </span>
          <button
            type="button"
            disabled={
              !editing.dirty ||
              Boolean(editing.invalid) ||
              editing.pending ||
              !editing.canSave
            }
            onClick={editing.save}
          >
            {editing.pending ? "저장 중" : "저장"}
          </button>
          <button
            type="button"
            disabled={editing.pending}
            onClick={editing.cancel}
          >
            수정 취소
          </button>
        </div>
      )}
      {editing.error && <p role="alert">{editing.error}</p>}
      {editing.message && <p role="status">{editing.message}</p>}
    </header>
  );
}
