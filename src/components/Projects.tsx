import { ArrowUpRight, Lock } from 'lucide-react'
import { projects, type Project } from '../data/site'
import { Reveal } from './Reveal'
import { Section } from './Section'

function Card({ project, featured }: { project: Project; featured: boolean }) {
  return (
    /* Column span lives on the Reveal wrapper below - that is the grid item. */
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface p-6 transition-colors duration-300 hover:border-border-strong sm:p-7">
      {/* Accent wash on hover - decorative only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase [font-family:var(--font-mono)]">
        {project.category}
      </p>

      <h3
        className={`mt-3 font-semibold tracking-tight ${featured ? 'text-2xl' : 'text-lg'}`}
      >
        {project.title}
      </h3>

      <p className="mt-3 text-[14px] leading-relaxed text-muted">
        {project.description}
      </p>

      <ul
        className={`mt-5 grid gap-2.5 ${featured ? 'sm:grid-cols-2' : ''}`}
      >
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-[13px] leading-snug text-ink">
            <span
              aria-hidden="true"
              className="mt-[6px] size-1 shrink-0 rounded-full bg-accent/70"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border-subtle bg-bg px-2 py-1 text-[11px] text-muted [font-family:var(--font-mono)]"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-border-subtle pt-4">
          {project.link?.url ? (
            <a
              href={project.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover"
            >
              {project.link.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ) : (
            /* No public link: a plain label, not a button that goes nowhere. */
            <p className="inline-flex items-center gap-1.5 text-[12px] text-faint">
              <Lock className="size-3.5" aria-hidden="true" />
              {project.status ?? 'Details Available on Request'}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      heading="Featured Projects"
      lede="Selected work across payment integration and WordPress product engineering."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 70}
            className={i === 0 ? 'sm:col-span-2' : ''}
          >
            <Card project={project} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
