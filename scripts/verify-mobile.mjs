/* Mobile smoke test at 375×812. */
import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

mkdirSync("verify-shots", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  hasTouch: true,
});
const errors = [];
page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(`CONSOLE: ${m.text()}`));

await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.keyboard.press("q");
await page.tap("body").catch(() => {});
await page.waitForTimeout(2500);
await page.screenshot({ path: "verify-shots/m1-hero.png" });

// horizontal scroll check
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth
);
console.log("HORIZONTAL OVERFLOW:", overflow ? "FAIL" : "OK");

await page.evaluate(() => document.getElementById("projects")?.scrollIntoView());
await page.waitForTimeout(1500);
await page.screenshot({ path: "verify-shots/m2-projects.png" });

await page.evaluate(() => document.getElementById("challenge")?.scrollIntoView());
await page.waitForTimeout(1500);
await page.screenshot({ path: "verify-shots/m3-challenge.png" });

console.log("ERRORS:", errors.length);
errors.slice(0, 10).forEach((e) => console.log(e));
await browser.close();
