"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreen } from "@/data/project-types";

/** 본문과 주소를 유지한 채 확대하고, 닫으면 누른 버튼으로 돌아간다. */
export function ScreenGallery({
  screens,
  note,
  title = "주요 화면",
  inline = false,
}: {
  screens: ProjectScreen[];
  note?: string;
  title?: string;
  inline?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [originalSize, setOriginalSize] = useState(false);
  const headingId = useId();
  const isOpen = active !== null;
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    if (isOpen) {
      root.style.overflow = "hidden";
      dialogRef.current?.showModal();
    }
    return () => {
      if (isOpen) root.style.overflow = previous;
    };
  }, [isOpen]);
  const current = active === null ? undefined : screens[active];
  /** 확대창 안에서 순환하며 다음 또는 이전 화면을 선택한다. */
  const move = (delta: number) =>
    setActive((index) =>
      index === null
        ? index
        : (index + delta + screens.length) % screens.length,
    );
  return (
    <div className={inline ? "folio-screen-inline" : "folio-screen-gallery"}>
      {!inline && <h2>{title}</h2>}
      {note && <p className="folio-screen-note">{note}</p>}
      {screens.map((screen, index) => (
        <figure className="folio-screen" key={screen.src}>
          <Image
            src={screen.src}
            alt={`${screen.title} 화면`}
            width={1440}
            height={900}
            sizes="(max-width: 800px) 100vw, 1120px"
            className="folio-screen-image"
          />
          <figcaption>
            <span>{screen.title}</span>
            <button
              type="button"
              className="folio-expand"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setOriginalSize(false);
                setActive(index);
              }}
              aria-label={`${screen.title} 원본 확대`}
            >
              원본 확대 <ArrowUpRight size={16} aria-hidden />
            </button>
          </figcaption>
          {!inline && <p className="folio-screen-note">{screen.caption}</p>}
        </figure>
      ))}
      <dialog
        ref={dialogRef}
        className="folio-dialog"
        aria-labelledby={headingId}
        onClose={() => {
          setActive(null);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onKeyDown={(event) => {
          // 원본 크기에서는 방향키가 스크롤 영역을 이동한다.
          if (originalSize || screens.length < 2) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="folio-dialog-toolbar">
          <h2 id={headingId}>{current?.title ?? "화면 확대"}</h2>
          <button
            type="button"
            className="folio-button"
            aria-pressed={originalSize}
            onClick={() => setOriginalSize((value) => !value)}
          >
            {originalSize ? "화면에 맞추기" : "원본 크기"}
          </button>
          <button
            type="button"
            className="folio-button"
            onClick={() => dialogRef.current?.close()}
            aria-label="확대 닫기"
          >
            <X size={18} aria-hidden />
            닫기
          </button>
        </div>
        {current && (
          <>
            <div
              className="folio-dialog-image"
              tabIndex={0}
              role="region"
              aria-label="확대 화면, 원본 크기에서는 좌우로 이동할 수 있습니다"
            >
              <Image
                key={current.src}
                src={current.src}
                alt={`${current.title} 확대 화면`}
                width={1440}
                height={900}
                unoptimized
                className={originalSize ? "is-original" : ""}
              />
            </div>
            <p className="folio-dialog-caption">{current.caption}</p>
          </>
        )}
        {screens.length > 1 && (
          <div className="folio-dialog-navigation">
            <button
              className="folio-button"
              type="button"
              onClick={() => move(-1)}
            >
              <ChevronLeft size={18} aria-hidden />
              이전 화면
            </button>
            <span>
              {(active ?? 0) + 1} / {screens.length}
            </span>
            <button
              className="folio-button"
              type="button"
              onClick={() => move(1)}
            >
              다음 화면
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
