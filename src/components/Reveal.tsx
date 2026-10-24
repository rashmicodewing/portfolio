import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger, in ms, applied via the --reveal-delay custom property. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Fades content up as it scrolls into view.
 *
 * The `data-reveal` attribute (which is what hides the element) is added from
 * JavaScript in a layout effect, not in the rendered markup. If the script
 * fails or is blocked, the content is simply visible - it never gets stuck
 * invisible. prefers-reduced-motion is handled in CSS.
 */
export function Reveal({ children, delay = 0, className, as }: Props) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    el.dataset.reveal = ''
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.reveal = 'shown'
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
