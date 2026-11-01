"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectRow } from "./project-row";
import type { AxCaseStudy } from "@/data/ax-types";
import type { Track } from "./track";

/** 끌고 있는 카드는 반투명하게, 다른 카드 위에 그린다 */
const DRAGGING_OPACITY = 0.5;
const DRAGGING_Z_INDEX = 50;

function SortableCard({
  project,
  study,
  rows,
  featured,
  track,
}: {
  project: Project;
  study?: AxCaseStudy;
  rows?: boolean;
  featured?: boolean;
  track: Track;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.slug,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? DRAGGING_OPACITY : 1,
    zIndex: isDragging ? DRAGGING_Z_INDEX : ("auto" as const),
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <button
        {...attributes}
        {...listeners}
        className="folio-drag-handle"
        aria-label="드래그하여 순서 변경"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      {rows ? (
        <ProjectRow
          project={project}
          study={study}
          featured={featured}
          track={track}
        />
      ) : (
        <ProjectCard project={project} track={track} />
      )}
    </div>
  );
}

/** storageKey — 묶음마다 따로 둬야 한 묶음의 순서 저장이 다른 묶음을 덮지 않는다 */
export function SortableGrid({
  projects,
  storageKey,
  rows = false,
  studies = [],
  track = "sales",
}: {
  projects: readonly Project[];
  storageKey: string;
  rows?: boolean;
  studies?: readonly AxCaseStudy[];
  track?: Track;
}) {
  const [ordered, setOrdered] = useState<readonly Project[]>(projects);
  const [isCustomOrder, setIsCustomOrder] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const slugOrder: string[] = JSON.parse(saved);
      const map = new Map(projects.map((p) => [p.slug, p]));
      const reordered = slugOrder
        .map((slug) => map.get(slug))
        .filter((p): p is Project => p !== undefined);
      const remaining = projects.filter((p) => !slugOrder.includes(p.slug));
      if (reordered.length > 0) {
        setOrdered([...reordered, ...remaining]);
        setIsCustomOrder(true);
      }
    } catch {
      /* 손상된 데이터 무시 */
    }
  }, [projects, storageKey]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrdered((prev) => {
      const oldIdx = prev.findIndex((p) => p.slug === active.id);
      const newIdx = prev.findIndex((p) => p.slug === over.id);
      const next = arrayMove([...prev], oldIdx, newIdx);
      localStorage.setItem(storageKey, JSON.stringify(next.map((p) => p.slug)));
      setIsCustomOrder(true);
      return next;
    });
  }

  function handleReset() {
    localStorage.removeItem(storageKey);
    setOrdered(projects);
    setIsCustomOrder(false);
  }

  return (
    <div>
      {isCustomOrder && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleReset}
            className="text-xs text-stone-500 transition-colors hover:text-stone-300"
          >
            순서 초기화
          </button>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={ordered.map((p) => p.slug)}
          strategy={rectSortingStrategy}
        >
          <div
            className={rows ? "folio-case-list" : "grid gap-6 sm:grid-cols-2"}
          >
            {ordered.map((project, index) => (
              <SortableCard
                key={project.slug}
                project={project}
                study={studies.find(
                  (study) => study.projectSlug === project.slug,
                )}
                rows={rows}
                featured={index < 3}
                track={track}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
