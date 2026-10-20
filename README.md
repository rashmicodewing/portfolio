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
| `CNAME`             | Claims the custom domain for this repo               |

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

This repo serves the apex domain **rashmipokharel247.com.np** — the `CNAME`
file in the repo root claims it. A project repo is allowed to hold an apex
domain; it then serves at the domain root rather than at `/portfolio`.

### Migration plan

The domain currently points at ByetHost (`ns1.byet.org` / `ns2.byet.org`,
apex `A` = `185.27.134.229`). GitHub Pages does not provide nameservers, so
the zone has to move to a DNS host and GitHub's `A` records go in there.

1. **Back up the old ByetHost site** — files and database — before anything
   else. Do not delete the account yet.
2. Add the domain at Cloudflare (free). It assigns two nameservers of the
   form `<word>.ns.cloudflare.com`.
3. In Cloudflare, create the records below, all set to **DNS only** (grey
   cloud — a proxied record blocks GitHub's certificate issuance):

   ```
   A      @     185.199.108.153
   A      @     185.199.109.153
   A      @     185.199.110.153
   A      @     185.199.111.153
   CNAME  www   rashmicodewing.github.io.
   ```

4. Push this repo and enable Pages (`main` / `/ (root)`). Settings → Pages
   → Custom domain should already read `rashmipokharel247.com.np` from the
   `CNAME` file.
5. At register.com.np, replace the two nameservers with the Cloudflare pair.
   `.np` NS changes can take 24-48 hours and are sometimes processed by hand.

   Check progress with:

   ```bash
   nslookup -type=ns rashmipokharel247.com.np 8.8.8.8
   ```

6. Once it resolves to GitHub, tick **Enforce HTTPS** in Pages settings.
7. Only now delete the old site and close the ByetHost account.

### Notes

- The domain has no `MX` or `TXT` records today, so no email breaks in the
  move. If email is added later it must be recreated at the new DNS host.
- Keep the ByetHost account alive until step 6 passes, so a rollback is
  possible if the nameserver change is rejected or delayed.
