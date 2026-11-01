"use client";

import { useRef, useState } from "react";
import type { ProjectScreen } from "@/lib/selected-portfolio/types";
import { sitePath } from "@/lib/selected-portfolio/content";

export function ProjectScreens({ screens }: { screens: ProjectScreen[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<ProjectScreen | null>(null);
  const open = (screen: ProjectScreen) => {
    setActive(screen);
    dialog.current?.showModal();
  };
  return (
    <div className="project-evidence">
      {screens.map((screen) => (
        <figure key={screen.src}>
          <button
            type="button"
            className="evidence-open"
            onClick={() => open(screen)}
            aria-label={`${screen.title} 화면 확대`}
          >
            <img
              src={sitePath(screen.src)}
              alt={screen.title}
              width={screen.width}
              height={screen.height}
              loading="lazy"
            />
            <span>화면 확대 ↗</span>
          </button>
          <figcaption>
            <b>{screen.title}</b>
            <p>{screen.caption}</p>
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
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            닫기 ×
          </button>
        </div>
        {active && (
          <>
            <img
              src={sitePath(active.src)}
              alt={active.title}
              width={active.width}
              height={active.height}
            />
            <p>{active.caption}</p>
            {active.note && <p className="evidence-note">{active.note}</p>}
          </>
        )}
      </dialog>
    </div>
  );
}
