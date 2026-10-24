import { useId, useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { contact, profile, socials } from '../data/site'
import { brandMark } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' }

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }
  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  if (values.message.trim().length < 10) {
    errors.message = 'Please write at least 10 characters.'
  }
  return errors
}

export function Contact() {
  const id = useId()
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  /**
   * There is no server behind this site, so rather than fake a send, the form
   * validates and then hands a pre-filled draft to the visitor's mail client.
   */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`${id}-${Object.keys(found)[0]}`)
      first?.focus()
      return
    }

    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    window.location.href =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(values.subject)}` +
      `&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field =
    'w-full rounded-xl border border-border-subtle bg-bg px-4 py-3 text-[14px] text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none'

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      heading={contact.heading}
      lede={contact.lede}
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal className="space-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-5 transition-colors hover:border-border-strong"
          >
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"
            >
              <Mail className="size-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] tracking-[0.14em] text-faint uppercase [font-family:var(--font-mono)]">
                Email
              </span>
              <span className="block truncate text-[14px] font-medium text-ink group-hover:text-accent">
                {profile.email}
              </span>
            </span>
          </a>

          {socials
            .filter((s) => s.url)
            .map((s) => {
              const Mark = brandMark[s.label]
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-5 transition-colors hover:border-border-strong"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"
                  >
                    {Mark ? <Mark className="size-[18px]" /> : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] tracking-[0.14em] text-faint uppercase [font-family:var(--font-mono)]">
                      Profile
                    </span>
                    <span className="block truncate text-[14px] font-medium text-ink group-hover:text-accent">
                      {s.label}
                    </span>
                  </span>
                </a>
              )
            })}
        </Reveal>

        <Reveal delay={90}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id={`${id}-name`}
                label="Name"
                error={errors.name}
                className={field}
                value={values.name}
                onChange={update('name')}
                autoComplete="name"
              />
              <Field
                id={`${id}-email`}
                label="Email"
                type="email"
                error={errors.email}
                className={field}
                value={values.email}
                onChange={update('email')}
                autoComplete="email"
              />
            </div>

            <div className="mt-4">
              <Field
                id={`${id}-subject`}
                label="Subject"
                error={errors.subject}
                className={field}
                value={values.subject}
                onChange={update('subject')}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor={`${id}-message`}
                className="mb-2 block text-[12px] font-medium text-muted"
              >
                Message
              </label>
              <textarea
                id={`${id}-message`}
                rows={5}
                value={values.message}
                onChange={update('message')}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${id}-message-error` : undefined}
                className={`${field} resize-y`}
              />
              {errors.message && (
                <p
                  id={`${id}-message-error`}
                  role="alert"
                  className="mt-2 text-[12px] text-red-500 dark:text-red-400"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:w-auto sm:px-7"
            >
              {contact.cta}
            </button>

            <p className="mt-4 text-[12px] leading-relaxed text-faint">
              {sent
                ? 'Your email client should have opened with the message ready to send.'
                : `This form opens a pre-filled draft in your email client — nothing is sent from this page. You can also write to ${profile.email} directly.`}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

type FieldProps = {
  id: string
  label: string
  error?: string
  className: string
  value: string
  onChange: (e: { target: { value: string } }) => void
  type?: string
  autoComplete?: string
}

function Field({ id, label, error, className, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[12px] font-medium text-muted">
        {label}
      </label>
      <input
        id={id}
        className={className}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[12px] text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}
