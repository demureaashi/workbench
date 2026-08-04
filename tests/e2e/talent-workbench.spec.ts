import { expect, test, type Locator, type Page } from "@playwright/test";
import * as XLSX from "@e965/xlsx";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DESIGN_FILE = "/Users/aaships/Downloads/Talent Workbench.html";
const today = new Date().toISOString().slice(0, 10);
const KNOWN_ACTIONS = [
  "add-link",
  "archive-role",
  "candidate-files",
  "clear-follow-filters",
  "clear-profile-filters",
  "close-drawers",
  "close-template",
  "close-transfer",
  "close-workspace",
  "contacted",
  "convert-capture",
  "copy-bookmarklet",
  "copy-follow-section",
  "copy-template",
  "delete-template",
  "dismiss-capture",
  "download-file",
  "download-first-file",
  "download-transfer",
  "duplicate-role",
  "duplicate-template",
  "edit-candidate",
  "edit-role",
  "edit-template",
  "export-json",
  "file-drop",
  "follow-tab",
  "import-workspace",
  "load-demo",
  "new-candidate",
  "new-role",
  "new-template",
  "new-workspace",
  "open-export",
  "open-import",
  "pick-palette",
  "rank-role",
  "remove-file",
  "remove-link",
  "restore-candidate",
  "restore-role",
  "select-capture",
  "select-role-detail",
  "select-template",
  "snooze",
  "switch-workspace",
  "tab",
  "template-cat",
  "toggle-transfer-menu",
  "toggle-cross-search",
  "workspace-menu"
];

test.beforeEach(async ({ page }) => {
  await resetApp(page);
});

test("visual system matches the design contract", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium-desktop", "Pixel-exact design contract is desktop-only; responsiveness is covered separately.");
  await page.goto("/?seed=1");
  await page.waitForSelector(".app-shell");

  const appTokens = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    const rail = getComputedStyle(document.querySelector(".rail") as HTMLElement);
    const table = getComputedStyle(document.querySelector(".tw-t") as HTMLElement);
    const row = getComputedStyle(document.querySelector(".tw-t tbody td") as HTMLElement);
    return {
      bg: root.getPropertyValue("--color-bg").trim(),
      heading: root.getPropertyValue("--font-heading").trim(),
      body: root.getPropertyValue("--font-body").trim(),
      bodyFont: body.fontFamily,
      railWidth: rail.width,
      tableFont: table.fontSize,
      rowPaddingTop: row.paddingTop,
      rowPaddingBottom: row.paddingBottom
    };
  });

  expect(appTokens.bg).toBe("#faf7f3");
  expect(appTokens.heading).toContain("Playfair Display");
  expect(appTokens.body).toContain("Figtree");
  expect(appTokens.bodyFont).toContain("Figtree");
  expect(appTokens.railWidth).toBe("216px");
  expect(appTokens.tableFont).toBe("13px");
  expect(appTokens.rowPaddingTop).toBe("7px");
  expect(appTokens.rowPaddingBottom).toBe("7px");

  await page.getByRole("button", { name: /Profiles/ }).click();
  await page.getByRole("button", { name: "New candidate" }).click();
  await expect(page.locator(".drawer")).toHaveCSS("width", "496px");
  await expect(page.locator(".drawer-header h2")).toHaveCount(0);
  await page.locator('button[data-action="close-drawers"]').first().click();
  await page.getByRole("button", { name: /Roles/ }).click();
  await page.locator('header button[data-action="new-role"]').click();
  await expect(page.locator(".role-drawer")).toHaveCSS("width", "540px");
  await expect(page.locator(".drawer-header h2")).toHaveCount(0);
  await page.locator('button[data-action="close-drawers"]').first().click();

  await page.getByRole("button", { name: /Roles/ }).click();
  await expect(page.locator(".roles-layout")).toBeVisible();
  await expect(page.locator(".role-detail")).toBeVisible();

  await page.getByRole("button", { name: /Follow-ups/ }).click();
  await expect(page.locator(".follow-toolbar")).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy this section" })).toBeVisible();

  await page.getByRole("button", { name: /Archive/ }).click();
  await expect(page.locator(".archive-stack")).toBeVisible();

  await page.getByRole("button", { name: /Templates/ }).click();
  await expect(page.locator(".template-card-grid")).toBeVisible();
  await expect(page.locator(".template-card").first()).toBeVisible();
  await expect(page.locator(".template-surface > .section-line")).toHaveCount(0);
  await expect(page.locator(".template-surface").locator('button[data-action="new-template"]')).toHaveCount(0);

  const designHtml = readFileSync(DESIGN_FILE, "utf8");
  expect(designHtml).toContain("--color-bg:#faf7f3");
  expect(designHtml).toContain("Playfair Display");
  expect(designHtml).toContain("Figtree");

  const iconAudit = await page.evaluate(() => ({
    navSvgCount: document.querySelectorAll(".tw-nav .nav-icon svg").length,
    oldGlyphButtons: Array.from(document.querySelectorAll("button")).filter((button) => /[▦◎▤↷□✎＋⧉◷⇅⌕●▧↓✕↗]/.test(button.textContent || "")).length,
    statusRowsUseLabel: Array.from(document.querySelectorAll(".dot-label")).every((node) => (node.textContent || "").trim().length > 0)
  }));
  expect(iconAudit.navSvgCount).toBe(7);
  expect(iconAudit.oldGlyphButtons).toBe(0);
  expect(iconAudit.statusRowsUseLabel).toBe(true);
});

test("all primary tabs render their expected workspace-scoped surfaces", async ({ page }) => {
  await page.goto("/?seed=1");
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();

  const checks = [
    ["Profiles", "New candidate"],
    ["Roles", "New role"],
    ["Follow-ups", "Queue"],
    ["Archive", "Archived roles"],
    ["Templates", "New"],
    ["Capture", "Copy bookmarklet"]
  ] as const;

  for (const [tab, expectedText] of checks) {
    await page.getByRole("button", { name: new RegExp(tab) }).click();
    await expect(page.getByText(expectedText, { exact: false }).first()).toBeVisible();
  }
});

test("workspace dropdown and palette picker show the selected theme", async ({ page }) => {
  await page.goto("/?seed=1");
  await page.locator(".workspace-pill").click();

  const activeSuperteam = page.locator('.workspace-menu button[data-id="st"]');
  await expect(activeSuperteam).toHaveAttribute("data-active", "true");
  await expect(activeSuperteam).toHaveAttribute("data-palette", "superteam");
  await expect(activeSuperteam).toHaveCSS("background-color", "rgb(253, 234, 232)");

  await page.locator('.workspace-menu button[data-id="ln"]').click();
  await expect(page.locator(".topbar .kicker")).toContainText("Lumen Networks");
  await expect(page.locator(".workspace-pill .workspace-mark")).toHaveCSS("color", "rgb(63, 115, 80)");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim())).toBe("#3f7350");

  await page.locator(".workspace-pill").click();
  const activeLumen = page.locator('.workspace-menu button[data-id="ln"]');
  await expect(activeLumen).toHaveAttribute("data-active", "true");
  await expect(activeLumen).toHaveCSS("background-color", "rgb(232, 241, 234)");

  await page.getByRole("button", { name: /Add workspace/ }).click();
  await page.locator('button[data-palette="forest"]').click();
  const forestButton = page.locator('button[data-palette="forest"]');
  await expect(forestButton).toHaveAttribute("data-active", "true");
  await expect(forestButton).toHaveAttribute("aria-pressed", "true");
  await expect(forestButton).toHaveCSS("background-color", "rgb(232, 241, 234)");
});

test("individual filters are themed and wired in each scoped view", async ({ page }) => {
  await page.goto("/?seed=1");

  await page.locator('button.tw-nav[data-tab="profiles"]').click();
  const profileRole = page.locator('select[data-filter="roleId"]');
  const rustRoleValue = await page.locator('select[data-filter="roleId"] option', { hasText: "Rust Protocol Engineer" }).first().getAttribute("value");
  expect(rustRoleValue).toBeTruthy();
  await profileRole.selectOption(rustRoleValue as string);
  await expect(profileRole).toHaveAttribute("data-active", "true");
  await expect(profileRole).toHaveCSS("border-color", "rgb(229, 69, 58)");
  await expect(page.locator(".result-note")).toContainText("Ranked against Rust Protocol Engineer");

  const profileStage = page.locator('select[data-filter="stage"]');
  await profileStage.selectOption("Screening");
  await expect(profileStage).toHaveAttribute("data-active", "true");
  await expect(candidateTitle(page, "Mei-Ling Chua")).toBeVisible();
  await expect(candidateTitle(page, "Aditya Raghunath")).toHaveCount(0);

  const profileLocation = page.locator('input[data-filter="location"]');
  await profileLocation.fill("Singapore");
  await expect(profileLocation).toHaveAttribute("data-active", "true");
  await expect(profileLocation).toHaveCSS("border-color", "rgb(229, 69, 58)");
  await expect(candidateTitle(page, "Mei-Ling Chua")).toBeVisible();

  const profileFollow = page.locator('select[data-filter="follow"]');
  await profileFollow.selectOption("snoozed");
  await expect(profileFollow).toHaveAttribute("data-active", "true");
  await page.locator('button[data-action="clear-profile-filters"]').click();
  await expect(page.locator('select[data-filter="roleId"]')).toHaveAttribute("data-active", "false");
  await expect(page.locator('select[data-filter="stage"]')).toHaveAttribute("data-active", "false");
  await expect(page.locator('input[data-filter="location"]')).toHaveAttribute("data-active", "false");
  await expect(page.locator('select[data-filter="follow"]')).toHaveAttribute("data-active", "false");

  await page.locator('button.tw-nav[data-tab="followups"]').click();
  const followPriority = page.locator('select[data-follow-filter="priority"]');
  await followPriority.selectOption("High");
  await expect(followPriority).toHaveAttribute("data-active", "true");
  await expect(followPriority).toHaveCSS("border-color", "rgb(229, 69, 58)");

  const followWindow = page.locator('select[data-follow-filter="window"]');
  await followWindow.selectOption("today");
  await expect(followWindow).toHaveAttribute("data-active", "true");

  const followCity = page.locator('input[data-follow-filter="city"]');
  await followCity.fill("Bengaluru");
  await expect(followCity).toHaveAttribute("data-active", "true");
  await page.locator('button[data-action="clear-follow-filters"]').click();
  await expect(page.locator('select[data-follow-filter="priority"]')).toHaveAttribute("data-active", "false");
  await expect(page.locator('select[data-follow-filter="window"]')).toHaveAttribute("data-active", "false");
  await expect(page.locator('input[data-follow-filter="city"]')).toHaveAttribute("data-active", "false");

  await page.locator('button.tw-nav[data-tab="templates"]').click();
  const outreachCat = page.locator('.template-cats button[data-cat="Outreach"]');
  await outreachCat.click();
  await expect(outreachCat).toHaveAttribute("data-active", "true");
  await expect(outreachCat).toHaveCSS("border-color", "rgb(229, 69, 58)");
  await expect(page.locator(".template-card", { hasText: "First outreach - engineering" })).toBeVisible();
  await expect(page.locator(".template-card", { hasText: "Profile submission note" })).toHaveCount(0);
});

test("rendered action controls are registered and key buttons respond", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium-desktop", "Action coverage with drawers and file inputs is desktop-only.");
  await page.goto("/?seed=1");
  const seen = new Set<string>();
  const collectActions = async () => {
    const actions = await page.evaluate(() => Array.from(document.querySelectorAll<HTMLElement>("[data-action]")).map((node) => node.dataset.action || ""));
    actions.filter(Boolean).forEach((action) => seen.add(action));
  };

  await collectActions();
  for (const tab of ["profiles", "roles", "followups", "archive", "templates", "capture"]) {
    await page.locator(`button.tw-nav[data-tab="${tab}"]`).click();
    await collectActions();
  }

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="export"]').click();
  await collectActions();
  await expect(page.getByRole("button", { name: "Export as JSON" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Export as CSV" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Export as XLSX" })).toBeVisible();
  await page.locator('button[data-action="open-export"][data-format="csv"]').click();
  await collectActions();
  await expect(page.locator(".transfer-dialog")).toContainText("Export CSV");
  await page.locator('button[data-action="close-transfer"]').click();

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="import"]').click();
  await collectActions();
  await expect(page.getByText("Import JSON")).toBeVisible();
  await expect(page.getByRole("button", { name: "Import CSV" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Import XLS/XLSX" })).toBeVisible();
  await page.locator('button[data-action="open-import"][data-format="csv"]').click();
  await collectActions();
  await expect(page.locator(".transfer-dialog")).toContainText("Import CSV");
  await expect(page.locator(".hello-csv-frame")).toBeVisible();
  await page.locator('button[data-action="close-transfer"]').click();

  await page.locator(".workspace-pill").click();
  await collectActions();
  await page.getByRole("button", { name: /Search all workspaces/ }).click();
  await expect(page.locator(".topbar .kicker")).toContainText("active scope");
  await page.locator(".workspace-pill").click();
  await page.getByRole("button", { name: /Add workspace/ }).click();
  await collectActions();
  await page.locator('button[data-action="close-workspace"]').click();

  await page.locator('button.tw-nav[data-tab="roles"]').click();
  await page.locator('button[data-action="duplicate-role"]').first().click();
  await expect(page.getByText(/created/)).toBeVisible();
  await expect(page.locator(".role-detail h3")).toContainText("(copy)");
  await page.locator('button[data-action="rank-role"]').click();
  await expect(page.locator('select[data-filter="roleId"]')).not.toHaveValue("");
  await page.locator('button.tw-nav[data-tab="roles"]').click();
  await page.locator('button[data-action="edit-role"]').first().click();
  await collectActions();
  await expect(page.locator(".role-drawer")).toBeVisible();
  await page.locator('button[data-action="close-drawers"]').first().click();

  await page.locator('button.tw-nav[data-tab="profiles"]').click();
  await page.locator('button[data-action="clear-profile-filters"]').click();
  await expect(page.locator('button[data-action="edit-candidate"]').first()).toBeVisible();
  await page.locator('button[data-action="edit-candidate"]').first().click();
  await collectActions();
  await expect(page.locator(".drawer")).toBeVisible();
  await page.locator('button[data-action="close-drawers"]').first().click();

  await page.locator('button.tw-nav[data-tab="followups"]').click();
  await page.locator('button[data-action="copy-follow-section"]').click();
  await expect(page.getByText(/Copied/)).toBeVisible();
  await page.locator('button[data-action="clear-follow-filters"]').click();

  await page.locator('button.tw-nav[data-tab="templates"]').click();
  await page.locator('button[data-action="copy-template"]').first().click();
  await expect(page.getByText("Template copied")).toBeVisible();
  await page.locator('button[data-action="duplicate-template"]').first().click();
  await expect(page.getByText("Template duplicated")).toBeVisible();
  await page.locator('button[data-action="edit-template"]').first().click();
  await collectActions();
  await expect(page.locator(".dialog")).toBeVisible();
  await page.locator('button[data-action="close-template"]').click();

  await page.locator('button.tw-nav[data-tab="capture"]').click();
  await page.getByRole("button", { name: "Copy bookmarklet" }).click();
  await expect(page.getByText("Bookmarklet copied")).toBeVisible();

  const unknown = [...seen].filter((action) => !KNOWN_ACTIONS.includes(action)).sort();
  expect(unknown).toEqual([]);
  expect([...seen]).toEqual(expect.arrayContaining(["workspace-menu", "switch-workspace", "pick-palette", "toggle-transfer-menu", "open-export", "open-import", "download-transfer", "duplicate-role", "rank-role", "edit-candidate", "copy-follow-section", "copy-template", "duplicate-template", "copy-bookmarklet"]));
});

test("role, candidate, follow-up, archive, template, capture, workspace and import/export flow", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium-desktop", "Full CRUD flow is covered on desktop; viewport coverage is separated.");
  await page.goto("/");
  await expect(page.getByText("This workspace is empty")).toBeVisible();

  await createRole(page, "QA Protocol Lead");
  await expect(page.locator(".role-detail").getByRole("heading", { name: "QA Protocol Lead" })).toBeVisible();

  await createCandidate(page, "Riya Test");
  await expect(candidateTitle(page, "Riya Test")).toBeVisible();
  await expect(page.getByText("Rust").first()).toBeVisible();

  await page.getByRole("button", { name: /Profiles/ }).click();
  await page.getByPlaceholder("Search candidates, roles, notes...").fill("Riya");
  await expect(candidateTitle(page, "Riya Test")).toBeVisible();

  await page.getByRole("button", { name: /Follow-ups/ }).click();
  await expect(candidateTitle(page, "Riya Test")).toBeVisible();
  await page.locator('button[data-action="contacted"]').first().click();
  await expect(page.getByText("logged as contacted")).toBeVisible();
  await page.getByRole("button", { name: "Contacted again" }).click();
  await expect(candidateTitle(page, "Riya Test")).toBeVisible();
  await page.locator('button[data-action="snooze"]').first().click();
  await page.getByRole("button", { name: "Snoozed" }).click();
  await expect(candidateTitle(page, "Riya Test")).toBeVisible();

  await page.getByRole("button", { name: /Roles/ }).click();
  await page.locator('select[data-role-patch][data-field="status"]').first().selectOption("Closed");
  await page.locator('button.tw-nav[data-tab="archive"]').click();
  await expect(page.locator(".archive-stack").getByText("QA Protocol Lead").first()).toBeVisible();
  await page.locator('button[data-action="restore-role"]').first().click();
  await page.getByRole("button", { name: /Roles/ }).click();
  await expect(page.locator(".role-detail").getByRole("heading", { name: "QA Protocol Lead" })).toBeVisible();

  await page.getByRole("button", { name: /Templates/ }).click();
  await page.locator('header button[data-action="new-template"]').click();
  await page.locator('form[data-form="template"] input[name="title"]').fill("QA Outreach");
  await page.locator('form[data-form="template"] input[name="type"]').fill("Outreach");
  await page.locator('form[data-form="template"] textarea[name="body"]').fill("Hi {name}, I am reaching out about {role} at {client}.");
  await page.locator('form[data-form="template"] button[type="submit"]').click();
  await expect(page.locator(".template-card", { hasText: "QA Outreach" })).toBeVisible();

  await page.getByRole("button", { name: /Capture/ }).click();
  await expect(page.getByText("Command-based capture")).toBeVisible();
  await expect(page.getByRole("button", { name: "⌘ Send to Workbench" })).toBeVisible();
  await expect(page.locator(".code-box")).toHaveCount(0);
  await page.evaluate(() => {
    window.postMessage({
      type: "talent:capture",
      source: "LinkedIn",
      title: "Maya Capture - Staff Engineer at Tensor",
      url: "https://linkedin.com/in/maya-capture",
      selection: "Maya Capture, Staff Engineer, Tensor, Bengaluru, India, maya@example.com",
      emailClues: ["maya@example.com"],
      linkedinUrl: "https://linkedin.com/in/maya-capture"
    }, window.location.origin);
  });
  await expect(page.locator(".capture-row-title", { hasText: "Maya Capture" })).toBeVisible();
  await expect(page.locator('input[data-capture-patch][data-field="name"]')).toHaveValue("Maya Capture");
  await expect(page.locator('input[data-capture-patch][data-field="parsedTitle"]')).toHaveValue("Staff Engineer");
  await expect(page.locator('input[data-capture-patch][data-field="company"]')).toHaveValue("Tensor");
  await expect(page.locator('input[data-capture-patch][data-field="email"]')).toHaveValue("maya@example.com");
  await page.locator('button[data-action="convert-capture"]').click();
  await expect(page.getByText("created as a candidate")).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    exportByMenu(page, "Export as JSON")
  ]);
  expect(download.suggestedFilename()).toMatch(/talent-workbench-.*\.json/);

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="export"]').click();
  await page.locator('button[data-action="open-export"][data-format="csv"]').click();
  await expect(page.locator(".transfer-dialog")).toContainText("Export CSV");
  await expect(page.locator(".transfer-columns")).toContainText("Name");
  await expect(page.locator(".transfer-columns")).toContainText("Follow-up");
  const [csvDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.locator('button[data-action="download-transfer"][data-format="csv"]').click()
  ]);
  expect(csvDownload.suggestedFilename()).toMatch(/talent-workbench-.*-candidates-.*\.csv/);

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="export"]').click();
  await page.locator('button[data-action="open-export"][data-format="xlsx"]').click();
  await expect(page.locator(".transfer-dialog")).toContainText("Export XLSX");
  const [xlsxDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.locator('button[data-action="download-transfer"][data-format="xlsx"]').click()
  ]);
  expect(xlsxDownload.suggestedFilename()).toMatch(/talent-workbench-.*-candidates-.*\.xlsx/);

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="import"]').click();
  await page.locator('button[data-action="open-import"][data-format="csv"]').click();
  await expect(page.locator(".transfer-dialog")).toContainText("Import CSV");
  await expect(page.locator(".hello-csv-frame")).toBeVisible();
  await page.locator('button[data-action="close-transfer"]').click();

  const exportPath = join(test.info().outputDir, "workspace-export.json");
  await download.saveAs(exportPath);
  const exported = JSON.parse(readFileSync(exportPath, "utf8")) as { workspace: { name: string } };
  exported.workspace.name = "Imported QA Workspace";
  writeFileSync(exportPath, JSON.stringify(exported));
  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="import"]').click();
  await page.locator('input[data-action="import-workspace"]').setInputFiles(exportPath);
  await expect(page.locator(".topbar .kicker")).toContainText("Imported QA Workspace");

  await page.getByRole("button", { name: /Imported QA Workspace/ }).click();
  await page.getByRole("button", { name: /Add workspace/ }).click();
  await page.locator('form[data-form="workspace"] input[name="name"]').fill("Palette QA");
  await page.locator('form[data-form="workspace"] input[name="mark"]').fill("PQ");
  await page.locator('button[data-palette="forest"]').click();
  await page.locator('form[data-form="workspace"] button[type="submit"]').click();
  await expect(page.locator(".topbar .kicker")).toContainText("Palette QA");
  await expect(page.locator(".workspace-mark").last()).toHaveText("PQ");
});

test("CSV import uses HelloCSV mapping and saves candidates", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium-desktop", "Importer walkthrough is covered once on desktop; responsive shell coverage is separated.");
  await page.goto("/");

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="import"]').click();
  await page.locator('button[data-action="open-import"][data-format="csv"]').click();
  await expect(page.locator(".transfer-dialog")).toContainText("Import CSV");
  await expect(page.locator(".hello-csv-frame")).toBeVisible();

  const csv = [
    "Candidate Name,Current Title,Employer,City Country,Email Address,Pipeline Stage,Skill List",
    'HelloCSV Import,Recruiting Engineer,Column Labs,"Toronto, Canada",hellocsv@example.com,Sourced,"Rust, Search"'
  ].join("\n");
  await page.locator(".hello-csv-frame input[type=file]").setInputFiles({
    name: "candidate-import.csv",
    mimeType: "text/csv",
    buffer: Buffer.from(csv)
  });

  await expect(page.locator(".hello-csv-frame")).toContainText("Review and confirm each mapping");
  await expect(page.locator(".hello-csv-frame")).toContainText("Candidate Name");
  await expect(page.locator(".hello-csv-frame")).toContainText("Name");
  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(page.locator(".hello-csv-frame")).toContainText("Valid (1)");
  await expect(page.locator(".hello-csv-frame")).toContainText("HelloCSV Import");
  await page.getByRole("button", { name: "Upload" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator(".transfer-dialog")).toHaveCount(0);
  await expect(page.getByText("1 candidate imported")).toBeVisible();

  await page.getByRole("button", { name: /Profiles/ }).click();
  await expect(candidateTitle(page, "HelloCSV Import")).toBeVisible();
  await expect(page.getByText("Recruiting Engineer · Column Labs")).toBeVisible();
  await expect(page.getByText("Toronto, Canada")).toBeVisible();
});

test("legacy XLS import skips metadata rows and exports imported candidates", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium-desktop", "Legacy Excel walkthrough is covered once on desktop; responsive shell coverage is separated.");
  await page.goto("/");

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["5bd3d376-346b-423f-8587-b73fd9b39015"],
    ["id", "full_name", "url", "occupation", "company", "position", "location", "email", "experience", "about"],
    [241943070, "Legacy XLS Import", "https://linkedin.com/in/legacy-xls", "Systems Engineer at Staking Facilities", "Staking Facilities", "Systems Engineer", "Berlin, Germany", "legacy@example.com", "Linux, Kubernetes and validator operations", "Open to infrastructure roles"]
  ]);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xls" });

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="import"]').click();
  await page.locator('button[data-action="open-import"][data-format="xlsx"]').click();
  await expect(page.locator(".transfer-dialog")).toContainText("Import XLS/XLSX");
  await page.locator(".hello-csv-frame input[type=file]").setInputFiles({
    name: "legacy-candidates.xls",
    mimeType: "application/vnd.ms-excel",
    buffer
  });

  await expect(page.locator(".hello-csv-frame")).toContainText("Review and confirm each mapping");
  await expect(page.locator(".hello-csv-frame")).toContainText("full_name");
  await expect(page.locator(".hello-csv-frame")).not.toContainText("5bd3d376");
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.locator(".hello-csv-frame")).toContainText("Valid (1)");
  await expect(page.locator(".hello-csv-frame")).toContainText("Legacy XLS Import");
  await page.getByRole("button", { name: "Upload" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: /Profiles/ }).click();
  await expect(candidateTitle(page, "Legacy XLS Import")).toBeVisible();
  await expect(page.getByText("Systems Engineer at Staking Facilities · Staking Facilities")).toBeVisible();
  await expect(page.getByText("Berlin, Germany")).toBeVisible();
  await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="export"]').click();
  await page.locator('button[data-action="open-export"][data-format="csv"]').click();
  const [csvDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.locator('button[data-action="download-transfer"][data-format="csv"]').click()
  ]);
  const csvPath = join(test.info().outputDir, "legacy-export.csv");
  await csvDownload.saveAs(csvPath);
  expect(readFileSync(csvPath, "utf8")).toContain("Legacy XLS Import");

  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="export"]').click();
  await page.locator('button[data-action="open-export"][data-format="xlsx"]').click();
  const [xlsxDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.locator('button[data-action="download-transfer"][data-format="xlsx"]').click()
  ]);
  expect(xlsxDownload.suggestedFilename()).toMatch(/talent-workbench-.*-candidates-.*\.xlsx/);
});

test("native date inputs and resume/link handling stay wired in drawers", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium-desktop", "Drawer width and file chooser assertions are desktop-only.");
  await page.goto("/");
  await createRole(page, "Resume QA Role");
  await page.getByRole("button", { name: /Profiles/ }).click();
  await page.locator('header button[data-action="new-candidate"]').click();

  const drawer = page.locator('[data-drawer]');
  await expect(drawer).toHaveCSS("width", "496px");
  await expect(drawer.locator('input[type="date"]')).toHaveCount(4);

  await drawer.locator('input[name="name"]').fill("File QA");
  await drawer.locator('input[name="title"]').fill("Frontend Engineer");
  await drawer.locator('input[name="company"]').fill("Portfolio Labs");
  await drawer.locator('input[name="location"]').fill("Toronto, Canada");
  await drawer.locator('input[name="followUp"]').fill(today);
  await drawer.locator('input[data-action="candidate-files"]').setInputFiles({
    name: "resume-qa.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4\n% test resume\n")
  });
  await expect(page.getByText("resume-qa.pdf")).toBeVisible();
  await page.getByPlaceholder("portfolio, GitHub, personal site...").fill("https://example.com/portfolio");
  await page.getByRole("button", { name: "Add link" }).click();
  await expect(page.getByText("https://example.com/portfolio")).toBeVisible();
  await drawer.locator('button[type="submit"]').click();
  await expect(page.getByText("File QA")).toBeVisible();
});

test("responsive layouts avoid incoherent overflow across desktop, tablet and mobile", async ({ page }, testInfo) => {
  await page.goto("/?seed=1");
  await page.waitForSelector(".app-shell");
  await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-dashboard.png`), fullPage: true });

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const rail = document.querySelector(".rail") as HTMLElement;
    const topbar = document.querySelector(".topbar") as HTMLElement;
    const search = document.querySelector(".search-wrap .input") as HTMLElement;
    return {
      viewportWidth: window.innerWidth,
      scrollWidth: doc.scrollWidth,
      bodyOverflowX: getComputedStyle(document.body).overflowX,
      railDisplay: getComputedStyle(rail).display,
      railWidth: rail.getBoundingClientRect().width,
      topbarHeight: topbar.getBoundingClientRect().height,
      searchWidth: search.getBoundingClientRect().width
    };
  });

  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
  expect(layout.topbarHeight).toBeGreaterThan(0);
  expect(layout.searchWidth).toBeGreaterThan(0);

  if (layout.viewportWidth <= 700) {
    expect(layout.railWidth).toBeGreaterThan(0);
    await expect(page.getByRole("button", { name: /Dashboard/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Profiles/ })).toBeVisible();
  }

  await page.locator(".workspace-pill").click();
  await expect(page.locator(".workspace-menu")).toBeVisible();
  if (layout.viewportWidth <= 1100) {
    await expect(page.locator(".workspace-menu")).toHaveCSS("position", "static");
  }
  await page.locator('.workspace-menu button[data-id="ln"]').click();
  await expect(page.locator(".topbar .kicker")).toContainText("Lumen Networks");
});

async function resetApp(page: Page) {
  await page.goto("/");
  await page.evaluate(async () => {
    localStorage.clear();
    const registrations = await navigator.serviceWorker?.getRegistrations?.() || [];
    await Promise.all(registrations.map((registration) => registration.unregister()));
    if ("databases" in indexedDB) {
      const databases = await indexedDB.databases();
      await Promise.all(databases.map((database) => database.name && new Promise<void>((resolve, reject) => {
        const request = indexedDB.deleteDatabase(database.name as string);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        request.onblocked = () => resolve();
      })));
    } else {
      await new Promise<void>((resolve) => {
        const request = indexedDB.deleteDatabase("talentWorkbench");
        request.onsuccess = () => resolve();
        request.onerror = () => resolve();
        request.onblocked = () => resolve();
      });
    }
  });
}

async function createRole(page: Page, title: string) {
  await page.getByRole("button", { name: /Roles/ }).click();
  await page.locator('header button[data-action="new-role"]').click();
  const form = page.locator('form[data-form="role"]');
  await expect(page.locator(".role-drawer")).toHaveCSS("width", "540px");
  await form.locator('input[name="title"]').fill(title);
  await form.locator('input[name="client"]').fill("Superteam QA");
  await form.locator('input[name="location"]').fill("Bengaluru, India");
  await form.locator('select[name="priority"]').selectOption("High");
  await form.locator('select[name="status"]').selectOption("Active");
  await form.locator('input[name="target"]').fill("4");
  await form.locator('input[name="opened"]').fill(today);
  await form.locator('input[name="due"]').fill(today);
  await form.locator('input[name="must"]').fill("Rust, Solana, Protocol");
  await form.locator('textarea[name="brief"]').fill("Protocol role requiring Rust and Solana production work.");
  await form.locator('button[type="submit"]').click();
  await expect(page.getByText("Role saved")).toBeVisible();
}

async function createCandidate(page: Page, name: string) {
  await page.getByRole("button", { name: /Profiles/ }).click();
  await page.locator('header button[data-action="new-candidate"]').click();
  const form = page.locator('form[data-form="candidate"]');
  await form.locator('input[name="name"]').fill(name);
  await form.locator('input[name="title"]').fill("Rust Protocol Engineer");
  await form.locator('input[name="company"]').fill("Tensor Labs");
  await form.locator('input[name="location"]').fill("Bengaluru, India");
  await form.locator('select[name="roleId"]').selectOption({ label: "QA Protocol Lead" });
  await form.locator('select[name="stage"]').selectOption("Shortlisted");
  await form.locator('input[name="email"]').fill("riya@example.com");
  await form.locator('input[name="lastContact"]').fill(today);
  await form.locator('input[name="followUp"]').fill(today);
  await form.locator('input[name="skills"]').fill("Rust, Solana, Protocol, Anchor");
  await form.locator('textarea[name="notes"]').fill("Strong Solana protocol match and Bengaluru location fit.");
  await form.locator('button[type="submit"]').click();
  await expect(page.getByText("Candidate saved")).toBeVisible();
}

function candidateTitle(page: Page, name: string): Locator {
  return page.locator(".candidate-title", { hasText: name }).first();
}

async function exportByMenu(page: Page, label: string) {
  await page.locator('button[data-action="toggle-transfer-menu"][data-menu="export"]').click();
  await page.getByRole("button", { name: label }).click();
}
