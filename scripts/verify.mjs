import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const OUT = process.argv[2]
const URL = 'http://localhost:4173/'
mkdirSync(OUT, { recursive: true })

const problems = []
const browser = await chromium.launch({ channel: 'msedge' })

async function newPage(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      problems.push(`[${width}px console.${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => problems.push(`[${width}px pageerror] ${e.message}`))
  page.on('requestfailed', (r) =>
    problems.push(`[${width}px requestfailed] ${r.url()} ${r.failure()?.errorText}`),
  )
  return { ctx, page }
}

const scrollThrough = (page) =>
  page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 160))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })

const overflowOf = (page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )

// ---------------------------------------------------------------- desktop
{
  const { ctx, page } = await newPage(1440, 900)
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)

  console.log('title:', await page.title())
  console.log('h1:', (await page.locator('h1').first().innerText()).replace(/\n/g, ' '))
  console.log(
    'sections:',
    (await page.$$eval('main section[id]', (els) => els.map((e) => e.id))).join(', '),
  )

  const overflow = await overflowOf(page)
  if (overflow > 1) problems.push(`[1440px] horizontal overflow: ${overflow}px`)

  await page.screenshot({ path: `${OUT}/desktop-top.png` })

  await scrollThrough(page)
  await page.waitForTimeout(700)

  const reveal = await page.evaluate(() => {
    const els = [...document.querySelectorAll('[data-reveal]')]
    return {
      total: els.length,
      stuck: els.filter((e) => e.dataset.reveal !== 'shown').length,
    }
  })
  console.log(`reveal: ${reveal.total - reveal.stuck}/${reveal.total} shown`)
  if (reveal.stuck > 0)
    problems.push(`[1440px] ${reveal.stuck}/${reveal.total} element(s) stuck un-revealed`)

  await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true })

  await page.click('a[href="#projects"]:visible')
  await page.waitForTimeout(1100)
  const atProjects = await page.evaluate(() => {
    const el = document.getElementById('projects')
    return el ? Math.round(el.getBoundingClientRect().top) : null
  })
  const headerH = await page.evaluate(
    () => Math.round(document.querySelector('header').getBoundingClientRect().height),
  )
  console.log(`#projects anchor top = ${atProjects}px (header is ${headerH}px)`)
  if (atProjects === null || atProjects < headerH - 4 || atProjects > headerH + 48)
    problems.push(`[1440px] #projects anchor landed at ${atProjects}px, header is ${headerH}px`)

  console.log(
    'nav aria-current:',
    JSON.stringify(
      await page.$$eval('header nav a[aria-current]', (els) => els.map((e) => e.textContent)),
    ),
  )

  const before = await page.evaluate(() => document.documentElement.className)
  await page.click('header button[aria-label*="mode"]')
  await page.waitForTimeout(500)
  const after = await page.evaluate(() => document.documentElement.className)
  console.log('theme class:', JSON.stringify(before), '->', JSON.stringify(after))
  if (before === after) problems.push('theme toggle did not change the root class')

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/desktop-light.png` })
  await scrollThrough(page)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/desktop-light-full.png`, fullPage: true })

  await page.reload({ waitUntil: 'networkidle' })
  const persisted = await page.evaluate(() => document.documentElement.className)
  if (persisted !== after) problems.push(`theme not persisted: "${persisted}" !== "${after}"`)
  await ctx.close()
}

// ----------------------------------------------------------------- tablet
{
  const { ctx, page } = await newPage(768, 1024)
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const overflow = await overflowOf(page)
  if (overflow > 1) problems.push(`[768px] horizontal overflow: ${overflow}px`)
  await page.screenshot({ path: `${OUT}/tablet-top.png` })
  await scrollThrough(page)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/tablet-full.png`, fullPage: true })
  await ctx.close()
}

// ----------------------------------------------------------------- mobile
{
  const { ctx, page } = await newPage(390, 844)
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const overflow = await overflowOf(page)
  if (overflow > 1) problems.push(`[390px] horizontal overflow: ${overflow}px`)
  await page.screenshot({ path: `${OUT}/mobile-top.png` })

  const panel = page.locator('#mobile-nav')
  await page.click('header button[aria-label="Open menu"]')
  await page.waitForTimeout(400)
  if (!(await panel.isVisible())) problems.push('[390px] mobile menu did not open')
  await page.screenshot({ path: `${OUT}/mobile-menu.png` })

  await page.click('#mobile-nav a[href="#skills"]')
  await page.waitForTimeout(1000)
  if (await panel.isVisible()) problems.push('[390px] mobile menu stayed open after a link click')
  await page.screenshot({ path: `${OUT}/mobile-skills.png` })

  await scrollThrough(page)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true })
  await ctx.close()
}

// ------------------------------------------------------- reduced motion
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => problems.push(`[reduced-motion pageerror] ${e.message}`))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const invisible = await page.evaluate(() => {
    const els = [...document.querySelectorAll('h2, h3, p, article')]
    return els.filter((e) => getComputedStyle(e).opacity === '0').length
  })
  console.log('reduced-motion invisible elements:', invisible)
  if (invisible > 0)
    problems.push(`[reduced-motion] ${invisible} element(s) invisible with motion off`)
  await page.screenshot({ path: `${OUT}/reduced-motion.png`, fullPage: true })
  await ctx.close()
}

// ------------------------------------------------------------ form + a11y
{
  const { ctx, page } = await newPage(1440, 900)
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.waitForTimeout(700)
  await page.click('form button[type="submit"]')
  await page.waitForTimeout(400)
  const alerts = await page.$$eval('form [role="alert"]', (els) => els.map((e) => e.textContent))
  console.log('validation errors shown:', alerts.length, JSON.stringify(alerts))
  if (alerts.length !== 4) problems.push(`expected 4 validation errors, got ${alerts.length}`)

  const invalid = await page.$$eval('form [aria-invalid="true"]', (e) => e.length)
  if (invalid !== 4) problems.push(`expected 4 aria-invalid fields, got ${invalid}`)

  const focused = await page.evaluate(() => document.activeElement?.id || null)
  console.log('focus moved to first invalid field:', focused)
  if (!focused) problems.push('submit with errors did not move focus to a field')

  await page.screenshot({ path: `${OUT}/form-errors.png` })

  await page.fill('form input[autocomplete="name"]', 'Test Person')
  await page.fill('form input[type="email"]', 'nope')
  await page.click('form button[type="submit"]')
  await page.waitForTimeout(300)
  const emailErr = await page
    .locator('form [role="alert"]')
    .filter({ hasText: 'valid email' })
    .count()
  if (emailErr !== 1) problems.push('email format validation did not fire')

  const imgNoAlt = await page.$$eval('img', (els) => els.filter((e) => !e.hasAttribute('alt')).length)
  if (imgNoAlt > 0) problems.push(`${imgNoAlt} <img> without alt`)

  const h1s = await page.$$eval('h1', (e) => e.length)
  console.log('h1 count:', h1s)
  if (h1s !== 1) problems.push(`expected exactly one h1, found ${h1s}`)

  const noName = await page.$$eval('a[href], button', (els) =>
    els.filter((e) => !e.textContent.trim() && !e.getAttribute('aria-label')).length,
  )
  if (noName > 0) problems.push(`${noName} link(s)/button(s) with no accessible name`)

  await ctx.close()
}

await browser.close()

console.log('\n================ PROBLEMS ================')
if (problems.length === 0) console.log('none')
else problems.forEach((p) => console.log('- ' + p))
