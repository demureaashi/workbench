import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const tabs = [
  ["dashboard", "Dashboard"],
  ["profiles", "Profiles"],
  ["roles", "Roles"],
  ["followups", "Follow-ups"],
  ["archive", "Archive"],
  ["templates", "Templates"],
  ["capture", "Capture"]
];

const outDir = process.argv[2] || join(process.cwd(), "test-results", "visual-tab-compare");
const sourceUrl = "file:///Users/aaships/Downloads/Talent%20Workbench.html";
const currentUrl = "http://127.0.0.1:4174/?seed=1";

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const source = await browser.newPage({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });
const current = await browser.newPage({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });

await source.goto(sourceUrl);
await source.waitForTimeout(3000);

await current.goto("http://127.0.0.1:4174/");
await current.evaluate(async () => {
  localStorage.clear();
  const registrations = await navigator.serviceWorker?.getRegistrations?.() || [];
  await Promise.all(registrations.map((registration) => registration.unregister()));
  await new Promise((resolve) => {
    const request = indexedDB.deleteDatabase("talentWorkbench");
    request.onsuccess = resolve;
    request.onerror = resolve;
    request.onblocked = resolve;
  });
});
await current.goto(currentUrl);
await current.waitForSelector(".app-shell");

const rows = [];

for (const [key, label] of tabs) {
  await source.getByRole("button", { name: new RegExp(`^${escapeRegExp(label)}\\b`) }).first().click();
  await source.waitForTimeout(500);
  await current.locator(`button.tw-nav[data-tab="${key}"]`).click();
  await current.waitForTimeout(500);

  const sourcePath = join(outDir, `${key}-source.png`);
  const currentPath = join(outDir, `${key}-current.png`);
  const diffPath = join(outDir, `${key}-diff.png`);
  const sourceShot = await source.screenshot({ path: sourcePath, fullPage: false });
  const currentShot = await current.screenshot({ path: currentPath, fullPage: false });
  const diff = await comparePngs(sourceShot, currentShot);
  writeFileSync(diffPath, Buffer.from(diff.diffDataUrl.split(",")[1], "base64"));

  rows.push({
    tab: label,
    source: sourcePath,
    current: currentPath,
    diff: diffPath,
    mismatchPercent: diff.mismatchPercent,
    changedPixels: diff.changedPixels,
    totalPixels: diff.totalPixels
  });
}

await browser.close();

const report = [
  "# Talent Workbench Visual Tab Compare",
  "",
  `Source: ${sourceUrl}`,
  `Current: ${currentUrl}`,
  "",
  "| Tab | Mismatch | Source | Current | Diff |",
  "| --- | ---: | --- | --- | --- |",
  ...rows.map((row) => `| ${row.tab} | ${row.mismatchPercent.toFixed(2)}% | ${row.source} | ${row.current} | ${row.diff} |`)
].join("\n");

writeFileSync(join(outDir, "report.md"), report);
console.log(report);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function comparePngs(sourcePng, currentPng) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });
  const result = await page.evaluate(async ({ left, right }) => {
    function loadImage(src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });
    }

    const leftImage = await loadImage(`data:image/png;base64,${left}`);
    const rightImage = await loadImage(`data:image/png;base64,${right}`);
    const width = Math.min(leftImage.width, rightImage.width);
    const height = Math.min(leftImage.height, rightImage.height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.drawImage(leftImage, 0, 0);
    const leftData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(rightImage, 0, 0);
    const rightData = ctx.getImageData(0, 0, width, height);
    const diffImage = ctx.createImageData(width, height);

    let changedPixels = 0;
    const threshold = 34;
    for (let i = 0; i < leftData.data.length; i += 4) {
      const dr = Math.abs(leftData.data[i] - rightData.data[i]);
      const dg = Math.abs(leftData.data[i + 1] - rightData.data[i + 1]);
      const db = Math.abs(leftData.data[i + 2] - rightData.data[i + 2]);
      const da = Math.abs(leftData.data[i + 3] - rightData.data[i + 3]);
      const delta = dr + dg + db + da;
      if (delta > threshold) {
        changedPixels += 1;
        diffImage.data[i] = 179;
        diffImage.data[i + 1] = 64;
        diffImage.data[i + 2] = 43;
        diffImage.data[i + 3] = 255;
      } else {
        const gray = Math.round((leftData.data[i] + leftData.data[i + 1] + leftData.data[i + 2]) / 3);
        diffImage.data[i] = gray;
        diffImage.data[i + 1] = gray;
        diffImage.data[i + 2] = gray;
        diffImage.data[i + 3] = 40;
      }
    }

    ctx.putImageData(diffImage, 0, 0);
    const totalPixels = width * height;
    return {
      changedPixels,
      totalPixels,
      mismatchPercent: changedPixels / totalPixels * 100,
      diffDataUrl: canvas.toDataURL("image/png")
    };
  }, {
    left: sourcePng.toString("base64"),
    right: currentPng.toString("base64")
  });
  await page.close();
  return result;
}
