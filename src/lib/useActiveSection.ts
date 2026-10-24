import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the nav can mark it.
 * Uses a band near the top of the viewport rather than the whole screen,
 * which keeps the highlight in step with what the visitor is reading.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
