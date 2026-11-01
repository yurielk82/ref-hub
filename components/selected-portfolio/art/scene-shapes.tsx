import type { ReactNode } from "react";

type Point = { x: number; y: number };
type Space = Point & { z: number };
type Surface = Space & { width: number; depth: number };

export function projectPoint({ x, y, z }: Space): Point {
  return { x: 480 + (x - y) * 0.88, y: 235 + (x + y) * 0.42 - z };
}

function points(values: Space[]) {
  return values
    .map((value) => {
      const point = projectPoint(value);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export function Prism({
  x,
  y,
  z,
  width,
  depth,
  height = 8,
  tone = "paper",
}: Surface & { height?: number; tone?: "paper" | "muted" | "accent" }) {
  const a = { x, y, z: z + height };
  const b = { x: x + width, y, z: z + height };
  const c = { x: x + width, y: y + depth, z: z + height };
  const d = { x, y: y + depth, z: z + height };
  return (
    <g className={`scene-solid scene-${tone}`}>
      <polygon
        className="scene-solid-side"
        points={points([d, c, { ...c, z }, { ...d, z }])}
      />
      <polygon
        className="scene-solid-edge"
        points={points([b, c, { ...c, z }, { ...b, z }])}
      />
      <polygon className="scene-solid-top" points={points([a, b, c, d])} />
    </g>
  );
}

export function Plane({ x, y, z, children }: Space & { children: ReactNode }) {
  const point = projectPoint({ x, y, z });
  return (
    <g transform={`matrix(.88 .42 -.88 .42 ${point.x} ${point.y})`}>
      {children}
    </g>
  );
}

export function Ledger({
  x,
  y,
  z,
  width,
  depth,
  title,
  rows = 6,
  accent = false,
}: Surface & { title: string; rows?: number; accent?: boolean }) {
  return (
    <g className="scene-ledger">
      <Prism x={x} y={y} z={z} width={width} depth={depth} height={7} />
      <Plane x={x} y={y} z={z + 8}>
        <text className="scene-sheet-title" x={16} y={27}>
          {title}
        </text>
        <path className="scene-ink" d={`M16 40H${width - 16}`} />
        {Array.from({ length: rows }, (_, index) => {
          const lineY = 62 + index * ((depth - 78) / rows);
          return (
            <g
              key={index}
              className={
                accent && index === 2 ? "scene-row-accent" : "scene-row"
              }
            >
              <path d={`M16 ${lineY}H${width - 16}`} />
              <path
                className="scene-row-data"
                d={`M24 ${lineY - 8}h${width * (index % 2 === 0 ? 0.22 : 0.34)}m20 0h${width * 0.16}`}
              />
            </g>
          );
        })}
        <path className="scene-grid" d={`M${width * 0.57} 48V${depth - 16}`} />
      </Plane>
    </g>
  );
}

export function SceneLabel({
  x,
  y,
  children,
  anchor = "start",
  to,
}: Point & {
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  to?: Point;
}) {
  const start = { x: x + (anchor === "end" ? -24 : 24), y: y + 10 };
  const route = to
    ? (() => {
        const dx = to.x - start.x,
          dy = to.y - start.y;
        const diagonal = Math.min(Math.abs(dx), Math.abs(dy));
        const bend =
          Math.abs(dx) >= Math.abs(dy)
            ? { x: to.x - Math.sign(dx) * diagonal, y: start.y }
            : { x: start.x, y: to.y - Math.sign(dy) * diagonal };
        return `M${x} ${start.y}H${start.x}L${bend.x} ${bend.y}L${to.x} ${to.y}`;
      })()
    : undefined;
  return (
    <g className="scene-label-group">
      {route ? <path className="scene-leader" d={route} /> : null}
      <text className="scene-label" x={x} y={y} textAnchor={anchor}>
        {children}
      </text>
    </g>
  );
}

export function PaperLines({
  width,
  rows = 6,
}: {
  width: number;
  rows?: number;
}) {
  return (
    <g className="scene-document-lines">
      {Array.from({ length: rows }, (_, index) => (
        <path
          key={index}
          d={`M28 ${77 + index * 29}h${width - 56}m${-width + 56} -9h${width * (index % 2 === 0 ? 0.46 : 0.61)}`}
        />
      ))}
    </g>
  );
}

export function FoldedPaper({
  width,
  height,
  title,
  children,
}: {
  width: number;
  height: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <g className="scene-folded-paper">
      <path
        className="scene-paper-depth"
        d={`M0 ${height}h${width}V40l7 7V${height + 9}H7Z`}
      />
      <path
        className="scene-paper-face"
        d={`M0 0H${width - 37}l37 37V${height}H0Z`}
      />
      <path className="scene-paper-fold" d={`M${width - 37} 0v37h37Z`} />
      <text className="scene-sheet-title" x={28} y={42}>
        {title}
      </text>
      {children}
    </g>
  );
}
