/* Ad-hoc: reproduce a stuck first load — console + page errors + staged screenshots. */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const OUT = new URL("../.shots/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const logs = [];
page.on("pageerror", (e) => logs.push(`PAGEERROR: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") logs.push(`${m.type().toUpperCase()}: ${m.text().slice(0, 300)}`);
});
page.on("requestfailed", (r) => logs.push(`REQFAIL: ${r.url().slice(0, 120)} — ${r.failure()?.errorText}`));

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}dbg-1-initial.png` });

await page.waitForTimeout(5000); // boot should auto-finish at ~4.65s
await page.screenshot({ path: `${OUT}dbg-2-after-boot.png` });

const heroText = await page.locator("#hero").count();
const aboutText = await page.locator("#about").count();
const sections = await page.evaluate(() =>
  Array.from(document.querySelectorAll("section")).map((s) => `${s.id}:${Math.round(s.getBoundingClientRect().height)}`)
);
console.log("SECTIONS:", JSON.stringify(sections));
console.log("HERO PRESENT:", heroText, "ABOUT PRESENT:", aboutText);

await page.mouse.wheel(0, 2000);
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}dbg-3-scrolled.png` });

console.log("\n=== LOGS (" + logs.length + ") ===");
logs.slice(0, 30).forEach((l) => console.log(l));
await browser.close();
