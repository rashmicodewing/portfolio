import { experience } from '../data/site'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      heading="Professional Experience"
      lede="Where the work has been, and what it actually involved."
    >
      <ol className="relative space-y-12">
        {/* The spine. Sits behind the markers, stops at the last one. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent/50 via-border-strong to-transparent sm:left-[9px]"
        />

        {experience.map((role, i) => (
          <li key={role.org} className="relative pl-8 sm:pl-12">
            <Reveal delay={i * 80}>
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 grid size-4 place-items-center rounded-full border border-accent/60 bg-bg sm:size-5"
              >
                <span className="size-1.5 rounded-full bg-accent" />
              </span>

              <p className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase [font-family:var(--font-mono)]">
                {role.kind}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {role.title}
                <span className="text-accent"> — {role.org}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                {role.summary}
              </p>

              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[14px] leading-snug text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/70"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
