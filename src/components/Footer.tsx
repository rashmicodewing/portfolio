import { nav, profile, socials } from '../data/site'
import { brandMark } from './icons'

export function Footer() {
  const year = new Date().getFullYear()
  const linked = socials.filter((s) => s.url)

  return (
    <footer className="border-t border-border-subtle bg-bg-elevated">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#home"
              className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
            >
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-lg border border-border-subtle bg-surface font-mono text-[11px] font-bold text-accent"
              >
                {profile.monogram}
              </span>
              <span className="text-ink">
                {profile.wordmark}
                <span className="text-accent">.</span>
              </span>
            </a>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              {profile.footerLine}
            </p>
          </div>

          <div className="flex gap-12 sm:gap-20">
            <nav aria-label="Footer">
              <h2 className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase [font-family:var(--font-mono)]">
                Navigate
              </h2>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[13px] text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase [font-family:var(--font-mono)]">
                Elsewhere
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[13px] text-muted transition-colors hover:text-ink"
                  >
                    Email
                  </a>
                </li>
                {linked.map((s) => {
                  const Mark = brandMark[s.label]
                  return (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
                      >
                        {Mark ? <Mark className="size-3.5" /> : null}
                        {s.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-subtle pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>Designed with purpose. Built with code.</p>
        </div>
      </div>
    </footer>
  )
}
