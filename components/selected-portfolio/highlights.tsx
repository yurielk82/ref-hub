"use client";

import { EditableCopy, useCopyEditing } from "./editable-copy";

export function Highlights({
  title,
  items,
  field,
}: {
  title: string;
  items: string[];
  field: string;
}) {
  const editing = useCopyEditing()?.editing;
  if (!items.length && !editing) return null;
  return (
    <div className="highlights">
      <h3>{title}</h3>
      {editing ? (
        <EditableCopy field={field} as="p" multiline>
          {items.join("\n")}
        </EditableCopy>
      ) : (
        <ul>
          {items.map((item, index) => {
            const [heading, ...detail] = item.split(" — ");
            return (
              <li key={index}>
                <strong>{heading}</strong>
                {detail.length > 0 && <span>{detail.join(" — ")}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
