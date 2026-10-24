import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id: string
  eyebrow: string
  heading: string
  lede?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, heading, lede, children, className }: Props) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      /* Offset for the fixed header comes from html{scroll-padding-top}
         in index.css. Adding scroll-margin here too would double-count it. */
      className={`py-20 sm:py-28 ${className ?? ''}`}
    >
      <div className="container-page">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-accent uppercase [font-family:var(--font-mono)]">
            <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-[2.5rem]"
          >
            {heading}
          </h2>
          {lede && (
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
              {lede}
            </p>
          )}
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}
