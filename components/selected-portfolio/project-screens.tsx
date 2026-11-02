"use client";

import { useRef, useState } from "react";
import type { ProjectScreen } from "@/lib/selected-portfolio/types";
import { sitePath } from "@/lib/selected-portfolio/content";

const VARIANT_WIDTH = 1600;
export const srcSet = (screen: ProjectScreen) =>
  screen.width > VARIANT_WIDTH
    ? `${sitePath(screen.src.replace(/\.webp$/, `.w${VARIANT_WIDTH}.webp`))} ${VARIANT_WIDTH}w, ${sitePath(screen.src)} ${screen.width}w`
    : undefined;
import { EditableCopy } from "./editable-copy";

export function ProjectScreens({
  screens,
  copyFields,
}: {
  screens: ProjectScreen[];
  copyFields?: { title: string; caption: string }[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<ProjectScreen | null>(null);
  const [originalSize, setOriginalSize] = useState(false);
  const open = (screen: ProjectScreen) => {
    setOriginalSize(false);
    setActive(screen);
    dialog.current?.showModal();
    close.current?.focus();
    if (dialog.current) dialog.current.scrollTop = 0;
  };
  return (
    <div className="project-evidence">
      {screens.map((screen, index) => (
        <figure key={screen.src}>
          <button
            type="button"
            className="evidence-open"
            onClick={() => open(screen)}
            aria-label={`${screen.title} 화면 확대`}
          >
            <img
              src={sitePath(screen.src)}
              srcSet={srcSet(screen)}
              sizes="(max-width: 900px) calc(100vw - 40px), 1040px"
              alt={screen.title}
              width={screen.width}
              height={screen.height}
              loading="lazy"
            />
            <span>화면 확대 ↗</span>
          </button>
          <figcaption>
            <b>
              <EditableCopy field={copyFields?.[index]?.title ?? ""}>
                {screen.title}
              </EditableCopy>
            </b>
            <EditableCopy
              field={copyFields?.[index]?.caption ?? ""}
              as="p"
              multiline
            >
              {screen.caption}
            </EditableCopy>
            {screen.note && <p className="evidence-note">{screen.note}</p>}
          </figcaption>
        </figure>
      ))}
      <dialog
        className="evidence-dialog"
        ref={dialog}
        aria-label={active ? `${active.title} 확대 화면` : "화면 확대"}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="evidence-dialog-head">
          <strong>{active?.title}</strong>
          <div className="evidence-dialog-actions">
            <button
              type="button"
              aria-pressed={originalSize}
              onClick={() => setOriginalSize((value) => !value)}
            >
              {originalSize ? "화면에 맞춤" : "원본 크기"}
            </button>
            <button
              type="button"
              ref={close}
              onClick={() => dialog.current?.close()}
            >
              닫기 ×
            </button>
          </div>
        </div>
        {active && (
          <>
            <div
              className="evidence-image-viewport"
              data-original={originalSize || undefined}
              tabIndex={originalSize ? 0 : undefined}
              role={originalSize ? "region" : undefined}
              aria-label={originalSize ? "원본 화면 스크롤 영역" : undefined}
            >
              <img
                src={sitePath(active.src)}
                alt={active.title}
                width={active.width}
                height={active.height}
              />
            </div>
            <p>{active.caption}</p>
            {active.note && <p className="evidence-note">{active.note}</p>}
          </>
        )}
      </dialog>
    </div>
  );
}
