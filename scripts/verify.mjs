/* Runtime smoke test: load the site in Edge, walk every chapter, capture errors + screenshots. */
import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3100";
mkdirSync("verify-shots", { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`CONSOLE: ${m.text()}`);
});

await page.goto(BASE, { waitUntil: "networkidle" });
await page.screenshot({ path: "verify-shots/01-boot.png" });

// Skip boot with a non-scrolling key
await page.keyboard.press("q");
await page.waitForTimeout(3200);
await page.screenshot({ path: "verify-shots/02-hero.png" });
const hero = await page.textContent("#hero");
console.log("HERO NAME:", hero.includes("SAUMOK") ? "OK" : "MISSING");

for (const id of ["about", "skills", "experience"]) {
  await page.click(`nav button:has-text("${id[0].toUpperCase() + id.slice(1)}")`);
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `verify-shots/03-${id}.png` });
}

// Projects hallway
await page.click(`nav button:has-text("Projects")`);
await page.waitForTimeout(2600);
// wiggle mouse so aim/raycast activate
await page.mouse.move(720, 450, { steps: 5 });
await page.waitForTimeout(1200);
await page.screenshot({ path: "verify-shots/04-hallway-start.png" });

// walk forward a bit
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(1800);

// sweep the right half of the screen hunting for a door hover
let doorPos = null;
outer: for (const x of [1000, 1100, 1200, 1300, 900]) {
  for (const y of [420, 480, 540, 360]) {
    await page.mouse.move(x, y, { steps: 4 });
    await page.waitForTimeout(350);
    if ((await page.locator("text=CLICK TO ENTER").count()) > 0) {
      doorPos = { x, y };
      break outer;
    }
  }
}
await page.screenshot({ path: "verify-shots/05-hallway-door.png" });
console.log("DOOR HOVER:", doorPos ? `DETECTED @ ${doorPos.x},${doorPos.y}` : "not found in sweep");
if (doorPos) {
  await page.mouse.click(doorPos.x, doorPos.y);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: "verify-shots/06-hacker-os.png" });
  const osOpen = await page.locator("text=EXIT [ESC]").count();
  console.log("HACKER OS:", osOpen > 0 ? "OPENED" : "FAILED TO OPEN");
  if (osOpen > 0) {
    // open terminal + a feature window
    await page.dblclick('[aria-label="Open terminal"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: "verify-shots/06b-os-terminal.png" });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
  }
}

await page.click(`nav button:has-text("Contact")`);
await page.waitForTimeout(2600);
await page.screenshot({ path: "verify-shots/07-challenge.png" });

const skip = page.locator("text=skip the challenge");
if (await skip.count()) {
  await skip.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await skip.click({ force: true });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: "verify-shots/08-contact-unlocked.png" });
  console.log("CHALLENGE SKIP: done");
}

console.log("\n=== ERRORS (" + errors.length + ") ===");
errors.slice(0, 20).forEach((e) => console.log(e));
await browser.close();
