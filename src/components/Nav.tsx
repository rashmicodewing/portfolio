import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/site'
import { useActiveSection } from '../lib/useActiveSection'
import { useTheme } from '../lib/useTheme'

const SECTION_IDS = nav.map((item) => item.href.slice(1))

export function Nav() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the mobile panel; the trigger keeps its own focus.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-border-subtle bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      ].join(' ')}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg border border-border-subtle bg-surface font-mono text-[11px] font-bold text-accent transition-colors group-hover:border-accent/50"
          >
            {profile.monogram}
          </span>
          <span className="text-ink">
            {profile.wordmark}
            <span className="text-accent">.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'relative rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
                  isActive
                    ? 'text-ink'
                    : 'text-muted hover:text-ink',
                ].join(' ')}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="grid size-9 place-items-center rounded-lg border border-border-subtle bg-surface text-muted transition-colors hover:border-border-strong hover:text-ink"
          >
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] transition-colors hover:bg-accent-hover sm:inline-block"
          >
            Let&rsquo;s Talk
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-9 place-items-center rounded-lg border border-border-subtle bg-surface text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border-subtle bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Let&rsquo;s Talk
          </a>
        </nav>
      </div>
    </header>
  )
}
