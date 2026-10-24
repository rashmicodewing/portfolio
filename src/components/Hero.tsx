import { ArrowRight } from 'lucide-react'
import { profile } from '../data/site'
import { PaymentFlow } from './PaymentFlow'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        <div
          className="absolute -top-40 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--glow-a), transparent 65%)',
          }}
        />
        <div
          className="absolute top-20 right-0 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, var(--glow-b), transparent 70%)',
          }}
        />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/70 px-3 py-1.5 text-[11px] font-medium tracking-wide text-muted backdrop-blur">
              <span
                aria-hidden="true"
                className="flow-node size-1.5 rounded-full bg-accent"
              />
              {profile.kicker}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-6 text-[2.1rem] leading-[1.1] font-semibold tracking-[-0.025em] text-balance sm:text-5xl lg:text-[3.4rem]">
              <span className="text-gradient">{profile.headline}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {profile.lede}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Explore My Work
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-hover"
              >
                Get In Touch
              </a>
            </div>
          </Reveal>
        </div>

        {/* No justify-self here: it would shrink the grid item to fit its
            contents and squash the diagram. Let it stretch to the column. */}
        <Reveal delay={260}>
          <div className="rounded-2xl border border-border-subtle bg-bg-elevated/70 p-4 backdrop-blur-sm sm:p-6">
            <PaymentFlow />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
