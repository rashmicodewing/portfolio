# portfolio

Personal site for Rashmi Pokharel — <https://rashmipokharel247.com.np>

React + TypeScript + Vite, styled with Tailwind CSS v4. Built and deployed to
GitHub Pages by GitHub Actions on every push to `main`.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run build`     | Typecheck, then build to `dist/`             |
| `npm run preview`   | Serve the built `dist/` locally              |
| `npm run typecheck` | Types only, no build                         |
| `npm run verify`    | Browser checks against a running preview     |

### Verifying a change

`npm run verify` drives the built site through a real browser and reports
problems: console errors, failed requests, horizontal overflow at 1440 / 768 /
390px, anchor navigation, the theme toggle and its persistence, the mobile
menu, contact-form validation, and that nothing stays invisible when
`prefers-reduced-motion` is on. Screenshots land in `.verify-shots/`.

It needs a preview server already running, and it drives the Microsoft Edge
installed on the machine (no browser download):

```bash
npm run build
npm run preview        # leave running in one terminal
npm run verify         # in another
```

## Editing the content

**Everything you'd want to change lives in [`src/data/site.ts`](src/data/site.ts)** —
name, headline, about copy, experience, projects, skills, contact details.
The components read from it; you shouldn't need to touch them to update text.

A few conventions in that file:

- **Links you don't have yet.** Leave the `url` as an empty string and the link
  is not rendered at all. Fill it in and it appears. That's how the LinkedIn
  entry in `socials` is set up — add your profile URL and it shows up in both
  the contact section and the footer.
- **Projects without a public link** show their `status` label (for example
  `Private Project`) instead of a button that leads nowhere.

## Structure

| Path                      | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `index.html`              | Document head: SEO, Open Graph, pre-paint theme  |
| `src/data/site.ts`        | All content and personal details                 |
| `src/components/`         | One component per section                        |
| `src/lib/`                | Theme and scroll-spy hooks                       |
| `src/index.css`           | Design tokens, utilities, animation              |
| `public/`                 | `CNAME`, `favicon.svg`, `og.png`, `404.html`     |
| `design/og.svg`           | Source for the social preview image              |

### Theme

Light is the default; dark is opt-in via the header toggle and remembered in
`localStorage`. The default is set in **two** places that must agree — the
pre-paint script in `index.html` and `resolveTheme()` in `src/lib/useTheme.ts`.
Both carry a comment showing how to follow the OS preference instead.

### Colour and type

Design tokens are CSS custom properties at the top of `src/index.css`, defined
once for light and again under `.dark`. Change a colour there and it updates
everywhere. Fonts are Inter and JetBrains Mono, loaded from Google Fonts.

### Social preview image

`public/og.png` (1200×630) is generated from `design/og.svg`. To regenerate
after editing the SVG:

```bash
npm i -D sharp
node -e "require('sharp')('design/og.svg').png().toFile('public/og.png')"
npm uninstall sharp
```

## Deploying

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
installs, typechecks, builds, and publishes `dist/` to Pages.

The custom domain is held by `public/CNAME`, which Vite copies into `dist/`
unchanged. `public/.nojekyll` stops Pages running the output through Jekyll.

Pages must be set to **Settings → Pages → Source: GitHub Actions** for the
workflow to deploy.
