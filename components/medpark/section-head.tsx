import { T } from './tokens'

export function SectionHead({ n, kicker, title }: { n: string; kicker: string; title: string }) {
  return (
    <div className="mb-8 flex items-start gap-4 md:gap-5">
      <span
        className="select-none font-mono text-[40px] font-extrabold leading-none md:text-[52px]"
        style={{ color: '#C4CDD7' }}
        aria-hidden="true"
      >
        {n}
      </span>
      <div className="pt-1">
        <div
          className="mb-1 text-[13px] font-bold uppercase tracking-[0.18em]"
          style={{ color: T.teal }}
        >
          {kicker}
        </div>
        <h2
          className="text-[26px] font-extrabold leading-[1.3] md:text-[30px]"
          style={{ color: T.ink }}
        >
          {title}
        </h2>
      </div>
    </div>
  )
}
