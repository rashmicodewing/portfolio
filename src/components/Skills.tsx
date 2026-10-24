import { skills } from '../data/site'
import { iconFor } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      heading="Technical Skills"
      lede="Grouped by what they are actually used for, rather than listed as badges."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = iconFor[group.icon]
          return (
            <Reveal key={group.title} delay={(i % 2) * 70}>
              <div className="h-full rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-xl border border-border-subtle bg-accent-soft text-accent"
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[14px] text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[10px] text-accent/70 [font-family:var(--font-mono)]"
                      >
                        ▹
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
