import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * The site is light by default; dark is something the visitor opts into with
 * the header toggle. Only an explicit stored choice overrides the default.
 * Mirrors the pre-paint script in index.html, so the two can't disagree.
 *
 * To follow the OS instead, return
 *   matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
 * here and make the same change in index.html.
 */
function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Private mode or blocked storage - fall through to the default.
  }
  return 'light'
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveTheme)

  useEffect(() => {
    apply(theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* nothing to persist to; the toggle still works for this visit */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
