/**
 * Refresh README screenshots.
 * Prerequisite: npm run dev (frontend on http://localhost:5173)
 * Run: node scripts/capture-screenshots.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "docs", "screenshots");
const BASE_URL = "http://localhost:5173";

const pages = [
  { path: "/", name: "home" },
  { path: "/login", name: "login" },
  { path: "/signup", name: "signup" },
  { path: "/demo", name: "chat" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  for (const { path: route, name } of pages) {
    await page.goto(`${BASE_URL}${route}`);
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(OUT_DIR, `${name}.png`),
    });
    console.log(`Saved ${name}.png`);
  }

  await browser.close();
  console.log("Done — screenshots saved to docs/screenshots/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
