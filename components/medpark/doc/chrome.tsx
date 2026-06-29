import type { ReactNode } from 'react'

export function Sheet({ children }: { children: ReactNode }) {
  return <div className="sheet">{children}</div>
}

export function SecHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="sechd">
      <div className="n">{n}</div>
      <h2>{title}</h2>
    </div>
  )
}

export function Section({
  id,
  n,
  title,
  children,
}: {
  id: string
  n: string
  title: string
  children: ReactNode
}) {
  return (
    <Sheet>
      <section id={id} className="sec">
        <SecHead n={n} title={title} />
        {children}
      </section>
    </Sheet>
  )
}

// 본문 표는 모두 같은 모양 - 첫 열은 키(굵게), 나머지는 값.
export function DocTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table className="doc">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>
            {r.map((c, j) => (
              <td key={j === 0 ? 'k' : c} className={j === 0 ? 'k' : undefined}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
