"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { savePortfolio } from "@/app/(legacy)/(portfolio)/edit/actions";
import type { CopyField } from "@/lib/portfolio/store";
import type { PortfolioTrack } from "@/lib/portfolio/content";
import type { projectCopyFields } from "@/lib/selected-portfolio/adapter";

export type ProjectCopyKeys = ReturnType<typeof projectCopyFields>;
export type OwnerEditing = {
  fields: CopyField[];
  revision: string;
  canSave: boolean;
  projectFields: Record<string, ProjectCopyKeys>;
};
type EditingContext = {
  track: PortfolioTrack;
  fields: Map<string, CopyField>;
  draft: Record<string, string>;
  editing: boolean;
  pending: boolean;
  dirty: boolean;
  invalid: CopyField | undefined;
  message: string;
  error: string;
  canSave: boolean;
  projectFields: Record<string, ProjectCopyKeys>;
  update: (id: string, value: string) => void;
  begin: () => void;
  suspend: () => void;
  cancel: () => void;
  save: () => void;
  canLeave: () => boolean;
};

const CopyContext = createContext<EditingContext | null>(null);
export const useCopyEditing = () => useContext(CopyContext);
export const useProjectCopy = (projectId: string) =>
  useCopyEditing()?.projectFields[projectId];
const stringRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function InlineEditingProvider({
  owner,
  track,
  children,
  initialEditing = false,
}: {
  owner: OwnerEditing | null;
  track: PortfolioTrack;
  children: ReactNode;
  initialEditing?: boolean;
}) {
  const router = useRouter();
  const definitions = useMemo(
    () => new Map((owner?.fields ?? []).map((field) => [field.id, field])),
    [owner?.fields],
  );
  const [saved, setSaved] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (owner?.fields ?? []).map((field) => [field.id, field.value]),
    ),
  );
  const [draft, setDraft] = useState(saved);
  const [revision, setRevision] = useState(owner?.revision ?? "initial");
  const [editing, setEditing] = useState(Boolean(owner) && initialEditing);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startSaving] = useTransition();
  const saving = useRef(false);
  const restored = useRef(false);
  const draftKey = `ref-hub-portfolio-draft-${track}`;
  const changed = [...definitions.values()].filter(
    (field) =>
      draft[field.id] !== undefined && draft[field.id] !== saved[field.id],
  );
  const dirty = changed.length > 0;
  const invalid = changed.find(
    (field) =>
      !draft[field.id].trim() ||
      draft[field.id].trim().length > field.maxLength,
  );
  const canLeave = () =>
    !editing ||
    !dirty ||
    window.confirm("저장하지 않은 수정 내용이 있습니다. 이동할까요?");

  useEffect(() => {
    if (!owner || restored.current) return;
    restored.current = true;
    try {
      const raw = sessionStorage.getItem(draftKey);
      const previous: unknown = raw ? JSON.parse(raw) : null;
      if (
        !stringRecord(previous) ||
        typeof previous.revision !== "string" ||
        !stringRecord(previous.changes)
      )
        return;
      const changes = previous.changes;
      const recovered = Object.fromEntries(
        [...definitions.values()].flatMap((field) =>
          typeof changes[field.id] === "string" &&
          changes[field.id] !== field.value
            ? [[field.id, changes[field.id]]]
            : [],
        ),
      );
      if (Object.keys(recovered).length) {
        setDraft((current) => ({ ...current, ...recovered }));
        setRevision(previous.revision);
        setEditing(true);
        setMessage("이 창에서 저장하지 않은 수정 내용을 복구했습니다.");
      }
    } catch {
      /* 브라우저 임시 저장이 차단돼도 서버 저장은 가능하다. */
    }
  }, [owner, definitions, draftKey]);
  useEffect(() => {
    if (!owner || !restored.current) return;
    try {
      if (dirty)
        sessionStorage.setItem(
          draftKey,
          JSON.stringify({
            revision,
            changes: Object.fromEntries(
              changed.map((field) => [field.id, draft[field.id]]),
            ),
          }),
        );
      else sessionStorage.removeItem(draftKey);
    } catch {
      /* 브라우저 임시 저장이 차단돼도 서버 저장은 가능하다. */
    }
  }, [owner, draftKey, revision, dirty, draft, changed]);
  useEffect(() => {
    if (!dirty || !editing) return;
    const beforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    const navigate = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      )
        return;
      const url = new URL(link.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.search === location.search
      )
        return;
      if (!window.confirm("저장하지 않은 수정 내용이 있습니다. 이동할까요?")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", navigate, true);
    };
  }, [dirty, editing]);

  function save() {
    if (!owner?.canSave || saving.current || !dirty || invalid) return;
    saving.current = true;
    setError("");
    setMessage("");
    const changes = Object.fromEntries(
      changed.map((field) => [field.id, draft[field.id]]),
    );
    startSaving(async () => {
      try {
        const result = await savePortfolio({ revision, changes });
        if (result.error) {
          setError(result.error);
          return;
        }
        if (!result.revision) {
          setError("저장 결과를 확인하지 못했습니다. 다시 저장해 주세요.");
          return;
        }
        const normalized = Object.fromEntries(
          Object.entries(changes).map(([key, value]) => [key, value.trim()]),
        );
        setSaved((current) => ({ ...current, ...normalized }));
        setDraft((current) => ({ ...current, ...normalized }));
        setRevision(result.revision);
        setEditing(false);
        setMessage("저장했습니다. 공개 홈페이지에 반영됐습니다.");
        router.refresh();
      } catch {
        setError(
          "연결이 끊겨 저장 결과를 확인하지 못했습니다. 입력한 글은 유지됩니다. 다시 저장해 주세요.",
        );
      } finally {
        saving.current = false;
      }
    });
  }
  const value: EditingContext | null = owner
    ? {
        track,
        fields: definitions,
        draft,
        editing,
        pending,
        dirty,
        invalid,
        message,
        error,
        canSave: owner.canSave,
        projectFields: owner.projectFields,
        update: (id, value) =>
          setDraft((current) => ({ ...current, [id]: value })),
        begin: () => {
          setEditing(true);
          setMessage("");
          setError("");
        },
        suspend: () => setEditing(false),
        cancel: () => {
          if (!dirty || window.confirm("수정한 내용을 취소할까요?")) {
            setDraft(saved);
            setEditing(false);
            setError("");
            setMessage("");
          }
        },
        save,
        canLeave,
      }
    : null;
  return <CopyContext.Provider value={value}>{children}</CopyContext.Provider>;
}

export function EditableCopy({
  field,
  children,
  as: Tag = "span",
  className,
  multiline = false,
}: {
  field: string;
  children: string;
  as?: "span" | "p" | "h2" | "h3" | "h4";
  className?: string;
  multiline?: boolean;
}) {
  const context = useCopyEditing();
  const id = context ? `${context.track}.${field}` : "";
  const keys =
    field === "hero.summary"
      ? [
          `${context?.track}.hero.title`,
          `${context?.track}.hero.subhead`,
          id,
        ].filter((key) => context?.fields.has(key))
      : [id];
  if (!context?.editing || !context.fields.has(id))
    return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={`${className ?? ""} inline-copy`}>
      {keys.map((key) => {
        const definition = context.fields.get(key);
        if (!definition) return null;
        const value = context.draft[key] ?? definition.value;
        const common = {
          "aria-label": definition.label,
          "data-copy-field": key,
          value,
          disabled: context.pending,
          maxLength: definition.maxLength,
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => context.update(key, event.target.value),
        };
        return multiline || definition.multiline ? (
          <textarea
            key={key}
            {...common}
            rows={Math.min(
              12,
              Math.max(
                2,
                value.split("\n").length,
                Math.ceil(value.length / 42),
              ),
            )}
          />
        ) : (
          <input key={key} {...common} />
        );
      })}
    </Tag>
  );
}
