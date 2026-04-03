'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectCard } from './project-card'

const STORAGE_KEY = 'ref-hub-project-order'

function SortableCard({ project }: { project: Project }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.slug })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto' as const,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <button
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 z-10 rounded-md bg-zinc-800/80 p-1 text-zinc-500 opacity-0 backdrop-blur-sm transition-opacity hover:text-zinc-300 group-hover:opacity-100 [div:hover>&]:opacity-100"
        aria-label="드래그하여 순서 변경"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <ProjectCard project={project} />
    </div>
  )
}

export function SortableGrid({ projects }: { projects: Project[] }) {
  const [ordered, setOrdered] = useState(projects)
  const [isCustomOrder, setIsCustomOrder] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const slugOrder: string[] = JSON.parse(saved)
      const map = new Map(projects.map((p) => [p.slug, p]))
      const reordered = slugOrder
        .map((slug) => map.get(slug))
        .filter((p): p is Project => p !== undefined)
      const remaining = projects.filter((p) => !slugOrder.includes(p.slug))
      if (reordered.length > 0) {
        setOrdered([...reordered, ...remaining])
        setIsCustomOrder(true)
      }
    } catch {
      /* 손상된 데이터 무시 */
    }
  }, [projects])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setOrdered((prev) => {
      const oldIdx = prev.findIndex((p) => p.slug === active.id)
      const newIdx = prev.findIndex((p) => p.slug === over.id)
      const next = arrayMove(prev, oldIdx, newIdx)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.map((p) => p.slug)))
      setIsCustomOrder(true)
      return next
    })
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY)
    setOrdered(projects)
    setIsCustomOrder(false)
  }

  return (
    <div>
      {isCustomOrder && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleReset}
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
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
          <div className="grid gap-6 sm:grid-cols-2">
            {ordered.map((project) => (
              <SortableCard key={project.slug} project={project} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
