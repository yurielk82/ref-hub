"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreen } from "@/data/project-types";
import { cn } from "@/lib/utils";

/**
 * 사례 상세 "주요 화면" — 첫 장은 넓게, 나머지는 두 칸. 누르면 큰 화면으로 열고 ←/→로 넘긴다.
 * 큰 화면은 네이티브 <dialog>라 Esc·포커스 가두기를 브라우저가 맡는다.
 */
export function ScreenGallery({
  screens,
  note,
  title = "주요 화면",
}: {
  screens: ProjectScreen[];
  note?: string;
  title?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const open = (index: number) => {
    setActive(index);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) =>
      setActive((i) =>
        i === null ? i : (i + delta + screens.length) % screens.length,
      ),
    [screens.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setActive(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  // 모달 dialog는 뒤 페이지 스크롤을 막지 않으므로 열려 있는 동안만 막는다
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const current = active === null ? null : screens[active];

  return (
    <section className="mt-16" aria-labelledby="screens-heading">
      <h2
        id="screens-heading"
        className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
      >
        {title}
      </h2>
      {note && (
        <p className="mt-2 max-w-2xl text-sm text-stone-500 dark:text-stone-400">
          {note}
        </p>
      )}

      <ul className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {screens.map((screen, i) => (
          <li key={screen.src} className={cn(i === 0 && "md:col-span-2")}>
            <figure>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`${screen.title} 크게 보기`}
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-[0_8px_24px_-12px_rgba(28,25,23,0.25)] transition-shadow hover:shadow-[0_14px_32px_-12px_rgba(28,25,23,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] dark:border-stone-800 dark:bg-stone-900"
              >
                <Image
                  src={screen.src}
                  alt={`${screen.title} 화면`}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 1024px) 100vw, 1024px"
                      : "(max-width: 768px) 100vw, 512px"
                  }
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />
              </button>
              <figcaption className="mt-4">
                <p className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {screen.title}
                </p>
                <p className="mt-1.5 max-w-[65ch] text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {screen.caption}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? `${current.title} 크게 보기` : "화면 크게 보기"}
        className="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-stone-950/85 backdrop:backdrop-blur-sm"
      >
        {current && active !== null && (
          <div
            className="flex h-full flex-col items-center justify-center gap-4 px-4 py-6 sm:px-16"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="relative aspect-[16/10] max-h-[78dvh] w-full max-w-6xl">
              <Image
                src={current.src}
                alt={`${current.title} 화면`}
                fill
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="rounded-lg object-contain"
              />
            </div>
            <div className="w-full max-w-6xl text-stone-100">
              <p className="text-sm tabular-nums text-stone-400">
                {active + 1} / {screens.length}
              </p>
              <p className="mt-1 text-base font-semibold">{current.title}</p>
              <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-stone-300">
                {current.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="absolute right-4 top-4 rounded-full bg-stone-900/70 p-2 text-stone-100 transition-colors hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <X className="h-5 w-5" />
            </button>
            {screens.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="이전 화면"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-stone-900/70 p-2 text-stone-100 transition-colors hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-[var(--accent)] sm:left-4"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="다음 화면"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-stone-900/70 p-2 text-stone-100 transition-colors hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-[var(--accent)] sm:right-4"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
