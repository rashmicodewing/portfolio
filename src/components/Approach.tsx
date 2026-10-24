import { approach } from '../data/site'
import { iconFor } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Approach() {
  return (
    <Section
      id="approach"
      eyebrow="Method"
      heading={approach.heading}
      lede={approach.lede}
      className="border-y border-border-subtle bg-bg-elevated"
    >
      <ol className="grid gap-5 md:grid-cols-3">
        {approach.principles.map((principle, i) => {
          const Icon = iconFor[principle.icon]
          return (
            <Reveal
              key={principle.title}
              as="li"
              delay={i * 80}
              className="h-full rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-xl border border-border-subtle bg-accent-soft text-accent"
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-semibold text-faint/40 [font-family:var(--font-mono)]"
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
