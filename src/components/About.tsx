import { Check } from 'lucide-react'
import { about } from '../data/site'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" heading={about.heading}>
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="space-y-5">
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 32)} className="text-[15px] leading-[1.75] text-muted">
              {text}
            </p>
          ))}
        </Reveal>

        <Reveal delay={90}>
          <div className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7">
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-faint uppercase [font-family:var(--font-mono)]">
              What I work on
            </h3>
            <ul className="mt-5 space-y-3.5">
              {about.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-snug text-ink">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
