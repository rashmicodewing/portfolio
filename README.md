# portfolio

Static site for Rashmi Pokharel. Plain HTML/CSS/JS — no build step, no
dependencies. GitHub Pages serves it directly from the `main` branch.

## Local preview

```bash
npx serve .
# or
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Files

| Path                | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `index.html`        | The homepage                                         |
| `404.html`          | Served by GitHub Pages for unknown paths             |
| `assets/style.css`  | All styling; theme tokens live at the top            |
| `assets/main.js`    | Theme toggle + footer year                           |
| `.nojekyll`         | Tells Pages to skip Jekyll processing                |

All asset paths are **relative** (`assets/style.css`, not `/assets/style.css`).
That is deliberate — it keeps the site working whether it is served from a
subdomain root or from a `/portfolio` subdirectory. Keep it that way.

## Deploying

Nothing is pushed yet. When ready:

```bash
gh repo create portfolio --public --source=. --remote=origin --push
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch →
`main` / `/ (root)`**. The site goes live at
`https://rashmicodewing.github.io/portfolio`.

## Custom domain

`rashmipokharel247.com.np` currently resolves to `185.27.134.229`, which is
not GitHub Pages — the apex is served by other hosting. So a GitHub project
site **cannot** appear at `rashmipokharel247.com.np/portfolio` while that
remains true. Two ways forward:

**A. Subdomain** (leaves the existing apex site alone)

1. Create the file `CNAME` in this repo containing one line:
   `portfolio.rashmipokharel247.com.np`
2. At register.com.np → Manage DNS, add:
   `CNAME` · host `portfolio` · value `rashmicodewing.github.io.` · TTL 3600
3. Settings → Pages → Custom domain → same hostname → tick **Enforce HTTPS**
   once DNS resolves.

**B. Move the apex to GitHub Pages** (replaces the current site)

1. Create a repo named exactly `rashmicodewing.github.io` and put the apex
   site in it, with a `CNAME` file containing `rashmipokharel247.com.np`.
2. At register.com.np, replace the `A` record for `@` with the four GitHub
   Pages addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`. Point `www` at `rashmicodewing.github.io.` via CNAME.
3. This repo then becomes reachable at `rashmipokharel247.com.np/portfolio`
   automatically — no CNAME file needed here.
