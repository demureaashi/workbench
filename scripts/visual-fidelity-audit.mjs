import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = "/Users/aaships/superteam-talent-workbench/test-results/spacing-interaction-audit-fixed";
const sourceUrl = "http://127.0.0.1:4180/Talent%20Workbench.html";
const currentUrl = "http://127.0.0.1:4174/?seed=1&v=39";
const tabs = [
  ["dashboard", "Dashboard"],
  ["profiles", "Profiles"],
  ["roles", "Roles"],
  ["followups", "Follow-ups"],
  ["archive", "Archive"],
  ["templates", "Templates"],
  ["capture", "Capture"]
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openPage(browser, url) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await wait(300);
  return { context, page };
}

async function clickTab(page, label) {
  await page.locator(".tw-nav, .nav-item").filter({ hasText: label }).first().click();
  await wait(220);
}

async function metrics(page) {
  return page.evaluate(() => {
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    const style = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        font: s.fontFamily,
        fontSize: s.fontSize,
        padding: `${s.paddingTop}/${s.paddingRight}/${s.paddingBottom}/${s.paddingLeft}`,
        gap: s.gap,
        borderRadius: s.borderRadius,
        border: s.borderTopWidth + " " + s.borderTopColor
      };
    };
    const firstRow = document.querySelector("tbody tr, .capture-row, .template-card");
    return {
      title: document.title,
      url: location.href,
      activeNav: document.querySelector(".tw-nav.active, .nav-item.active")?.textContent?.replace(/\s+/g, " ").trim() || "",
      bodyBg: getComputedStyle(document.body).backgroundColor,
      rail: rect(document.querySelector(".rail, .tw-rail")),
      topbar: rect(document.querySelector(".topbar, .tw-topbar")),
      h1: rect(document.querySelector("h1")),
      filters: rect(document.querySelector(".filterbar, .filters, .template-cats")),
      firstRow: rect(firstRow),
      firstRowStyle: style(firstRow),
      drawer: rect(document.querySelector(".drawer, .tw-drawer")),
      roleDrawer: rect(document.querySelector(".role-drawer")),
      dialog: rect(document.querySelector(".dialog, .tw-dialog")),
      workspaceMenu: rect(document.querySelector(".workspace-menu")),
      templateSurfaceFirstChild: document.querySelector(".template-surface")?.firstElementChild?.className || "",
      templateSurfaceNewButtons: document.querySelectorAll('.template-surface [data-action="new-template"]').length,
      drawerHeaderH2: document.querySelectorAll(".drawer-header h2").length,
      controls: [...document.querySelectorAll("button, input, select, textarea")].slice(0, 18).map((el) => ({
        tag: el.tagName,
        text: (el.textContent || el.getAttribute("placeholder") || el.getAttribute("value") || "").replace(/\s+/g, " ").trim(),
        type: el.getAttribute("type") || "",
        rect: rect(el),
        style: style(el)
      }))
    };
  });
}

async function captureTab(browser, key, label) {
  const src = await openPage(browser, sourceUrl);
  const cur = await openPage(browser, currentUrl);
  if (key !== "dashboard") {
    await clickTab(src.page, label);
    await clickTab(cur.page, label);
  }
  const sourceShot = join(outDir, `tab-${key}-source.png`);
  const currentShot = join(outDir, `tab-${key}-current.png`);
  await src.page.screenshot({ path: sourceShot, fullPage: true });
  await cur.page.screenshot({ path: currentShot, fullPage: true });
  const result = { type: "tab", key, label, sourceShot, currentShot, source: await metrics(src.page), current: await metrics(cur.page) };
  await src.context.close();
  await cur.context.close();
  return result;
}

async function captureInteraction(browser, key, setupSource, setupCurrent) {
  const src = await openPage(browser, sourceUrl);
  const cur = await openPage(browser, currentUrl);
  await setupSource(src.page);
  await setupCurrent(cur.page);
  const sourceShot = join(outDir, `interaction-${key}-source.png`);
  const currentShot = join(outDir, `interaction-${key}-current.png`);
  await src.page.screenshot({ path: sourceShot, fullPage: true });
  await cur.page.screenshot({ path: currentShot, fullPage: true });
  const result = { type: "interaction", key, sourceShot, currentShot, source: await metrics(src.page), current: await metrics(cur.page) };
  await src.context.close();
  await cur.context.close();
  return result;
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];

for (const [key, label] of tabs) results.push(await captureTab(browser, key, label));

results.push(await captureInteraction(
  browser,
  "candidate-drawer",
  async (page) => { await clickTab(page, "Profiles"); await page.getByRole("button", { name: /Add candidate|New candidate/ }).click(); await wait(250); },
  async (page) => { await clickTab(page, "Profiles"); await page.locator('header button[data-action="new-candidate"]').click(); await wait(250); }
));

results.push(await captureInteraction(
  browser,
  "role-drawer",
  async (page) => { await clickTab(page, "Roles"); await page.getByRole("button", { name: /Add role|New role/ }).first().click(); await wait(250); },
  async (page) => { await clickTab(page, "Roles"); await page.locator('header button[data-action="new-role"]').click(); await wait(250); }
));

results.push(await captureInteraction(
  browser,
  "template-dialog",
  async (page) => { await clickTab(page, "Templates"); await page.getByRole("button", { name: "Edit" }).first().click(); await wait(250); },
  async (page) => { await clickTab(page, "Templates"); await page.getByRole("button", { name: "Edit" }).first().click(); await wait(250); }
));

results.push(await captureInteraction(
  browser,
  "workspace-menu",
  async (page) => { await page.getByRole("button", { name: /Superteam Talent/ }).last().click(); await wait(250); },
  async (page) => { await page.getByRole("button", { name: /Superteam Talent/ }).last().click(); await wait(250); }
));

await browser.close();

const md = [
  "# Fixed Spacing and Interaction Audit",
  "",
  `Source: ${sourceUrl}`,
  `Current: ${currentUrl}`,
  "",
  "| State | Source | Current | Valid measurements |",
  "| --- | --- | --- | --- |",
  ...results.map((r) => {
    const notes = [];
    if (r.current?.rail?.w) notes.push(`rail ${r.current.rail.w}px`);
    if (r.current?.topbar?.h) notes.push(`topbar ${r.current.topbar.h}px`);
    if (r.current?.firstRow?.h) notes.push(`first row/card ${r.current.firstRow.h}px`);
    if (r.current?.drawer?.w) notes.push(`drawer ${r.current.drawer.w}px`);
    if (r.current?.roleDrawer?.w) notes.push(`role drawer ${r.current.roleDrawer.w}px`);
    if (r.current?.dialog?.w) notes.push(`dialog ${r.current.dialog.w}px`);
    if (r.key === "templates") notes.push(`template first child ${r.current.templateSurfaceFirstChild || "none"}`, `surface new buttons ${r.current.templateSurfaceNewButtons}`);
    if (r.key.includes("drawer")) notes.push(`blank drawer h2 count ${r.current.drawerHeaderH2}`);
    return `| ${r.label || r.key} | ${r.sourceShot} | ${r.currentShot} | ${notes.join("<br>")} |`;
  })
].join("\n");

await writeFile(join(outDir, "audit.json"), JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
await writeFile(join(outDir, "audit.md"), md);
console.log(join(outDir, "audit.md"));
