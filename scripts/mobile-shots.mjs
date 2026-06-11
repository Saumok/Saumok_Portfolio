/* Mobile-viewport smoke screenshots (390x844, iPhone-ish). Run: node scripts/mobile-shots.mjs */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const OUT = new URL("../.shots/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const page = await ctx.newPage();
await page.addInitScript(() => sessionStorage.setItem("saumok-os-booted", "1"));
await page.goto(process.env.BASE_URL || "http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const sections = ["hero", "about", "skills", "experience", "projects", "challenge", "contact"];
for (const id of sections) {
  await page.evaluate((s) => {
    const lenis = window.__lenis;
    const el = document.getElementById(s);
    if (el && lenis) lenis.scrollTo(el, { immediate: true, force: true });
    else el?.scrollIntoView();
  }, id);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}${id}.png` });
}

// Mobile nav open
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.tap('button[aria-label="Open menu"]');
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}nav-open.png` });
await page.tap('button[aria-label="Close menu"]');

// Open a project card -> HackerOS, then open a window
await page.evaluate(() => {
  const lenis = window.__lenis;
  const el = document.getElementById("projects");
  if (el && lenis) lenis.scrollTo(el, { immediate: true, force: true });
});
await page.waitForTimeout(1500);
const card = page.locator('#projects button[aria-label^="Open "]').first();
await card.tap();
// per-project gateway plays first (~2.7s)
await page.waitForTimeout(1400);
await page.screenshot({ path: `${OUT}gateway.png` });
await page.waitForTimeout(2700);
await page.screenshot({ path: `${OUT}hackeros.png` });
// close the auto-opened dossier so the icons are reachable on a small screen
const closeBtn = page.locator('button[aria-label="Close window"]').first();
if (await closeBtn.count()) {
  await closeBtn.tap();
  await page.waitForTimeout(400);
}
const icon = page.locator('div[role="dialog"][aria-label*="operating system"] button[aria-label^="Open "]').first();
await icon.tap();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}hackeros-window.png` });

// Horizontal overflow check across the page
const overflow = await page.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const bad = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > docW + 2 || r.left < -2)) {
      const cs = getComputedStyle(el);
      if (cs.position === "fixed" || cs.position === "absolute") return;
      bad.push(`${el.tagName}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
    }
  });
  return { docW, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 20) };
});
console.log(JSON.stringify(overflow, null, 2));

await browser.close();
console.log("DONE");
