import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const chromeRoot = "/Users/aaships/Library/Application Support/Google/Chrome";
const profileName = process.argv[2] || "Default";
const bookmarksPath = path.join(chromeRoot, profileName, "Bookmarks");
const appUrl = process.env.WORKBENCH_URL || "http://127.0.0.1:4174/index.html";
const bookmarkName = "Add to Workbench";
const appOrigin = new URL(appUrl).origin;

const bookmarklet =
  "javascript:(function(){var s=String(window.getSelection&&window.getSelection()||'').slice(0,4000);var p={type:'superteam:capture',title:document.title,url:location.href,text:s};var w=window.open('','superteamTalentWorkbenchCapture');if(!w){alert('Open Talent Workbench once, then use Add to Workbench again.');return;}try{if(w.location.href==='about:blank'){w.close();alert('Open Talent Workbench once, then use Add to Workbench again.');return;}}catch(e){}w.postMessage(p,'" +
  appOrigin +
  "');})();";

function chromeTimestamp() {
  const windowsEpochOffsetMicros = 11644473600000000n;
  return String(BigInt(Date.now()) * 1000n + windowsEpochOffsetMicros);
}

function findMaxId(node) {
  let max = Number(node?.id || 0);
  for (const child of node?.children || []) {
    max = Math.max(max, findMaxId(child));
  }
  return max;
}

if (!fs.existsSync(bookmarksPath)) {
  throw new Error(`Could not find Chrome bookmarks at ${bookmarksPath}`);
}

const raw = fs.readFileSync(bookmarksPath, "utf8");
const bookmarks = JSON.parse(raw);
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = `${bookmarksPath}.codex-backup-${stamp}`;
fs.writeFileSync(backupPath, raw);

const bar = bookmarks?.roots?.bookmark_bar;
if (!bar || !Array.isArray(bar.children)) {
  throw new Error("Chrome bookmark bar structure was not found.");
}

const existing = bar.children.filter(
  (item) =>
    item?.type === "url" &&
    (item.name === bookmarkName ||
      item.name === "Drag this to bookmarks bar" ||
      item.name === "Drag to bookmarks bar" ||
      item.name === "Drag this to book..." ||
      String(item.url || "").includes("capture=1&title="))
);

if (existing.length) {
  existing.forEach((item) => {
    item.name = bookmarkName;
    item.type = "url";
    item.url = bookmarklet;
    item.date_modified = chromeTimestamp();
  });
} else {
  const nextId = String(findMaxId(bookmarks.roots) + 1);
  bar.children.push({
    date_added: chromeTimestamp(),
    guid: crypto.randomUUID(),
    id: nextId,
    name: bookmarkName,
    type: "url",
    url: bookmarklet
  });
}

fs.writeFileSync(bookmarksPath, `${JSON.stringify(bookmarks, null, 3)}\n`);

console.log(`Installed "${bookmarkName}" into Chrome profile "${profileName}". Updated ${existing.length || 1} bookmark${(existing.length || 1) === 1 ? "" : "s"}.`);
console.log(`Backup: ${backupPath}`);
