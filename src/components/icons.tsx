import {
  Code,
  CreditCard,
  Layers,
  Map,
  Search,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '../data/site'
import type { SVGProps } from 'react'

export const iconFor: Record<IconName, LucideIcon> = {
  code: Code,
  layers: Layers,
  card: CreditCard,
  terminal: Terminal,
  map: Map,
  search: Search,
  shield: ShieldCheck,
}

/* Lucide v1 no longer ships brand marks, so these two are inline. */

export function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.9 5.48.9 11.95c0 5.06 3.29 9.35 7.86 10.86.57.11.78-.26.78-.57v-2.2c-3.2.72-3.87-1.42-3.87-1.42-.53-1.37-1.29-1.74-1.29-1.74-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.23 1.77 1.23 1.03 1.82 2.7 1.3 3.36.99.1-.77.4-1.3.73-1.6-2.55-.3-5.24-1.32-5.24-5.85 0-1.29.44-2.35 1.18-3.18-.12-.3-.51-1.5.11-3.14 0 0 .96-.32 3.15 1.21a10.6 10.6 0 0 1 5.74 0c2.18-1.53 3.14-1.21 3.14-1.21.63 1.64.23 2.85.12 3.14.74.83 1.17 1.89 1.17 3.18 0 4.55-2.69 5.55-5.26 5.84.42.37.78 1.09.78 2.2v3.26c0 .31.21.68.79.57 4.56-1.51 7.85-5.8 7.85-10.86C23.1 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export const brandMark: Record<string, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  GitHub: GithubMark,
  LinkedIn: LinkedinMark,
}
