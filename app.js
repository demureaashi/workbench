const DB_NAME = "talentWorkbench";
const DB_VERSION = 1;
const STATE_KEY = "main";
const UI_KEY = "talentWorkbench.ui.v1";
const WINDOW_NAME = "talentWorkbenchCapture";

const STAGES = ["Sourced", "Contacted", "Replied", "Screening", "Shortlisted", "Submitted", "Interviewing", "Offered", "Hired", "Rejected", "Dropped Out", "Closed"];
const ARCHIVED_STAGES = ["Hired", "Dropped Out", "Closed"];
const ROLE_STATUSES = ["Active", "Paused", "Filled", "Closed"];
const PRIORITIES = ["High", "Medium", "Low"];
const PRI = { High: "#b3402b", Medium: "#c28d41", Low: "#6f8f6a" };
const STAGE_COLOR = {
  Sourced: "#9b9797",
  Contacted: "#c28d41",
  Replied: "#a06f24",
  Screening: "#7d5411",
  Shortlisted: "#6f8f6a",
  Submitted: "#4f7f52",
  Interviewing: "#4f7f52",
  Offered: "#2f6f8f",
  Hired: "#2b6b3f",
  Rejected: "#b3402b",
  "Dropped Out": "#b3402b",
  Closed: "#7d7979"
};

const PALETTES = {
  house: { label: "House - navy & terracotta", accent: "#c0764a", a100: "#f7ebe1", a600: "#a45f37", a700: "#874a28", a800: "#5f331b", ink: "#17334f" },
  superteam: { label: "Superteam - black & red", accent: "#e5453a", a100: "#fdeae8", a600: "#c3372c", a700: "#9c2b22", a800: "#6f1e17", ink: "#101010" },
  ink: { label: "Ink & graphite", accent: "#3f4a55", a100: "#ecedef", a600: "#313a43", a700: "#242b32", a800: "#171c21", ink: "#171c21" },
  forest: { label: "Forest", accent: "#3f7350", a100: "#e8f1ea", a600: "#2f5c3f", a700: "#234730", a800: "#173021", ink: "#16211a" },
  navy: { label: "Navy", accent: "#2c4a7c", a100: "#e8eef7", a600: "#233c66", a700: "#1a2e50", a800: "#121f36", ink: "#141c2b" },
  plum: { label: "Plum", accent: "#6f3b63", a100: "#f5eaf2", a600: "#5a2f50", a700: "#45243d", a800: "#2f1829", ink: "#1f1620" }
};

const NAV = [
  ["dashboard", "Dashboard", "dashboard"],
  ["profiles", "Profiles", "profiles"],
  ["roles", "Roles", "roles"],
  ["followups", "Follow-ups", "followups"],
  ["archive", "Archive", "archive"],
  ["templates", "Templates", "templates"],
  ["capture", "Capture", "capture"]
];

const ICONS = {
  dashboard: '<path d="M3 3h8v8H3z"></path><path d="M13 3h8v5h-8z"></path><path d="M13 12h8v9h-8z"></path><path d="M3 15h8v6H3z"></path>',
  profiles: '<path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"></path><path d="M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path><path d="M21 20v-1a4 4 0 0 0-3-3.8"></path>',
  roles: '<path d="M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>',
  followups: '<path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"></path><path d="M10.5 20a2 2 0 0 0 3 0"></path>',
  archive: '<path d="M3 5h18v4H3z"></path><path d="M5 9v10h14V9"></path><path d="M10 13h4"></path>',
  templates: '<path d="M6 3h8l4 4v14H6z"></path><path d="M14 3v4h4"></path><path d="M9 12h6M9 16h6"></path>',
  capture: '<path d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"></path><path d="M8 10l4 4 4-4"></path><path d="M12 3v11"></path>',
  edit: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>',
  archiveBox: '<rect x="3" y="4" width="18" height="4" rx="1"></rect><path d="M5 8v11h14V8"></path><path d="M10 12h4"></path>',
  duplicate: '<rect x="8" y="8" width="11" height="11" rx="1.5"></rect><path d="M5 15H4a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v1"></path>',
  contacted: '<path d="M4 4v6h6"></path><path d="M20 20v-6h-6"></path><path d="M20 9a8 8 0 0 0-13.5-3.5L4 8"></path><path d="M4 15a8 8 0 0 0 13.5 3.5L20 16"></path>',
  snooze: '<circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path>',
  external: '<path d="M14 3h7v7"></path><path d="M10 14 21 3"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>',
  download: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>',
  close: '<path d="m18 6-12 12"></path><path d="m6 6 12 12"></path>',
  file: '<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7Z"></path><path d="M14 3v4h4"></path>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"></path><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"></path>',
  search: '<circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4 4"></path>',
  plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
  chevrons: '<path d="m7 8 5-5 5 5"></path><path d="m7 16 5 5 5-5"></path>',
  check: '<path d="m5 12 4 4L19 6"></path>',
  upload: '<path d="M12 21V9"></path><path d="m7 14 5-5 5 5"></path><path d="M5 3h14"></path>'
};

const defaultWorkspace = { id: "st", name: "Superteam Talent", mark: "ST", type: "Talent collective", palette: "superteam" };
const today = () => new Date().toISOString().slice(0, 10);

const emptyState = () => ({
  version: 1,
  workspaces: [defaultWorkspace],
  roles: [],
  candidates: [],
  templates: [],
  captures: []
});

const demoSeed = () => ({
  workspaces: [
    defaultWorkspace,
    { id: "ln", name: "Lumen Networks", mark: "LN", type: "Client - infrastructure", palette: "forest" },
    { id: "ay", name: "Akanksha Advisory", mark: "AY", type: "Personal research", palette: "house" }
  ],
  roles: [
    roleSeed("r1", "st", "Rust Protocol Engineer", "Superteam - Solana Foundation", "Remote - India and Southeast Asia", "High", "Active", 25, 4, "W31", "Wellfound", ["Rust", "Solana", "Anchor", "Protocol"], "Open-source protocol contributions", "Ankit Rao", "$130k-$180k + tokens", "2026-06-22", "2026-08-21", "Core protocol work on a high-throughput Solana program.", "What have you shipped on-chain?\nWalk me through an Anchor program.", "Client will move fast for a strong profile."),
    roleSeed("r2", "st", "Senior Product Designer", "Superteam - Drip", "Remote - India Standard Time plus or minus 3 hours", "Medium", "Active", 20, 3, "W31", "Read.cv", ["Design systems", "Product design", "Consumer", "Figma"], "Crypto-native product experience", "Neha Suri", "$90k-$120k", "2026-06-30", "2026-08-28", "Owns the consumer surface end to end alongside one other designer.", "Show one system you built and how it was adopted.", "Portfolio quality is the gate."),
    roleSeed("r3", "st", "Growth Lead, India", "Superteam Build", "Bengaluru, India", "High", "Active", 15, 2, "W30", "LinkedIn Jobs", ["Growth", "Community", "DeFi", "India"], "Existing builder network", "Ravi Menon", "INR 60-80 LPA", "2026-06-15", "2026-08-14", "Own India growth across community, events and partnerships.", "Which India growth loop have you personally built?", "Client prefers operators over marketers."),
    roleSeed("r4", "st", "DevRel Engineer", "Superteam Foundation", "Remote - worldwide", "Medium", "Filled", 18, 5, "W26", "LinkedIn", ["DevRel", "Rust", "Content"], "", "Ankit Rao", "$110k-$140k", "2026-04-20", "2026-06-30", "Filled internally after a four-week search.", "", "Closed - hire started 1 Jul.", true, "2026-06-30"),
    roleSeed("r5", "ln", "Platform Engineer", "Lumen Networks", "Berlin, Germany", "High", "Active", 14, 1, "W31", "Otta", ["Kubernetes", "Go", "Platform"], "Terraform, internal developer platforms", "Sabine Kruger", "EUR 95k-EUR 120k", "2026-07-06", "2026-09-15", "First platform hire.", "What does a good developer platform look like?", "Two days a week in Berlin is non-negotiable.")
  ],
  candidates: [
    candSeed("c1", "st", "Aditya Raghunath", "Protocol Engineer", "Helius", "Bengaluru, India", "r1", "Shortlisted", addDays(today(), 1), addDays(today(), -6), ["Rust", "Solana", "Anchor", "SVM"], "Two Anchor programs in production; gave the SVM indexer talk.", "Wants protocol-level scope, not app work.", { links: ["github.com/adityaraghunath"] }),
    candSeed("c2", "st", "Mei-Ling Chua", "Senior Blockchain Engineer", "Kraken", "Singapore, Singapore", "r1", "Screening", today(), addDays(today(), -8), ["Rust", "Protocol", "Cryptography"], "Ex-Kraken core; deep Rust, learning the Solana runtime.", "Notice period two months."),
    candSeed("c3", "st", "Ishita Menon", "Product Designer", "Cred", "Bengaluru, India", "r2", "Shortlisted", addDays(today(), 2), addDays(today(), -3), ["Product design", "Design systems", "Figma", "Consumer"], "Owned the Cred design system v2; consumer fintech surfaces.", "Portfolio is strong on systems work.", { links: ["ishitamenon.design", "read.cv/ishitamenon"] }),
    candSeed("c4", "st", "Devika Nair", "Growth Lead", "CoinDCX", "Bengaluru, India", "r3", "Offered", addDays(today(), 7), addDays(today(), -2), ["Growth", "Community", "DeFi", "India"], "Ran India growth for a top exchange; strong builder network.", "Offer out - decision expected soon."),
    candSeed("c5", "st", "Priya Venkatesan", "Senior Engineer", "Zerodha", "Chennai, India", "r1", "Submitted", addDays(today(), 4), addDays(today(), -3), ["TypeScript", "React", "Node", "Web3"], "Built internal tooling; contributed to an Earn clone.", "Submitted to client.", { contactedOn: addDays(today(), -2), touches: 3 }),
    candSeed("c6", "st", "Aarav Sethi", "Growth Manager", "Onmeta", "Bengaluru, India", "r3", "Contacted", addDays(today(), 5), addDays(today(), -5), ["Growth", "DeFi"], "Ramping quickly, smaller scope so far.", "", { snoozedUntil: addDays(today(), 8), snoozedOn: addDays(today(), -1) }),
    candSeed("c7", "st", "Karan Malhotra", "Engineering Manager", "Freshworks", "Chennai, India", "r1", "Dropped Out", "", addDays(today(), -10), ["TypeScript", "Node"], "Wanted IC scope only after the first call.", "Counter-offer accepted.", { archivedAt: addDays(today(), -9), closeReason: "Counter-offer accepted." }),
    candSeed("c8", "ln", "Jonas Weber", "Platform Engineer", "SAP", "Berlin, Germany", "r5", "Contacted", addDays(today(), 3), addDays(today(), -4), ["Kubernetes", "Go", "Platform"], "Runs the SAP internal platform team.", "")
  ],
  templates: [
    tplSeed("t1", "st", "First outreach - engineering", "Outreach", "Hi {name} - I source for {client}. We are hiring a {role} and your work at {company} lines up closely with what the team needs. Worth a 15-minute call this week?"),
    tplSeed("t2", "st", "First follow-up", "Follow-up", "Hi {name}, following up on my note about the {role} role at {client}. Happy to send the JD and comp band if useful."),
    tplSeed("t3", "st", "Profile submission note", "Submission", "{name} - {company}, {location}. Why they fit {role}: [3 bullets]. Availability: [notice]. Comp expectation: [range]. Links: LinkedIn, resume, portfolio.")
  ],
  captures: [
    { id: "p1", workspaceId: "st", source: "LinkedIn", title: "Anika Deshpande - Protocol Engineer at Tensor", url: "https://linkedin.com/in/anika-deshpande", when: new Date().toISOString(), snippet: "Protocol engineer, four years of Rust, previously at Tensor working on the NFT AMM. Bengaluru. Open to remote.", name: "Anika Deshpande", parsedTitle: "Protocol Engineer", company: "Tensor", location: "Bengaluru, India", email: "", link: "", roleId: "r1" }
  ]
});

let db;
let state = emptyState();
let ui = loadUi();
let draftCandidate = null;
let draftRole = null;
let draftTemplate = null;
let draftWorkspace = null;
let selectedCaptureId = "";
let toastTimer = null;

const app = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  window.name = WINDOW_NAME;
  db = await openDb();
  state = normalizeState(await readState() || emptyState());
  if (new URLSearchParams(location.search).get("seed") === "1" && isEmptyData(state)) {
    state = normalizeState(demoSeed());
    await saveState();
    history.replaceState({}, "", location.pathname);
  }
  await ingestUrlCapture();
  applyTheme();
  registerServiceWorker();
  window.addEventListener("message", handleCaptureMessage);
  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);
  app.addEventListener("change", handleChange);
  document.addEventListener("submit", handleSubmit);
  app.addEventListener("dragover", handleDragOver);
  app.addEventListener("drop", handleDrop);
  render();
}

function render() {
  const ws = activeWorkspace();
  applyTheme();
  app.className = "app-shell";
  app.innerHTML = `
    <div class="app-body">
      ${renderRail(ws)}
      <main class="main">
        ${renderTopbar(ws)}
        <div class="content tw-scroll">
          ${renderView()}
        </div>
      </main>
    </div>
    ${renderCandidateDrawer()}
    ${renderRoleDrawer()}
    ${renderTemplateDialog()}
    ${renderWorkspaceDialog()}
    ${ui.toast ? `<div class="toast">${escapeHtml(ui.toast)}</div>` : ""}
  `;
}

function icon(name, size = 14, strokeWidth = 1.6) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

function renderRail(ws) {
  const counts = navCounts();
  return `
    <aside class="rail">
      <div class="rail-brand">
        <div class="rail-brand-main">
          <span class="brand-tile">TW</span>
          <strong>Talent Workbench</strong>
        </div>
        <div class="rail-url">talent.akankshaps.com</div>
      </div>
      <nav class="nav tw-scroll">
        ${NAV.map(([key, label, iconName]) => `
          <button class="tw-nav ${ui.tab === key ? "active" : ""}" data-action="tab" data-tab="${key}" type="button">
            <span class="nav-icon">${icon(iconName, 15, 1.5)}</span>
            <span>${label}</span>
            <span class="nav-count">${counts[key] || ""}</span>
          </button>
        `).join("")}
      </nav>
      <div class="workspace-switcher">
        <button class="workspace-pill" data-action="workspace-menu" type="button">
          <span class="workspace-mark">${escapeHtml(ws.mark)}</span>
          <span><b>${escapeHtml(ws.name)}</b><small>${escapeHtml(ws.type)}</small></span>
          <span class="muted">${icon("chevrons", 14, 1.5)}</span>
        </button>
        ${ui.workspaceMenu ? renderWorkspaceMenu() : ""}
      </div>
    </aside>
  `;
}

function renderWorkspaceMenu() {
  return `
    <div class="workspace-menu">
      <div class="label-upper" style="padding:6px 8px 4px">Workspaces</div>
      ${state.workspaces.filter((w) => !w.archived).map(renderWorkspaceMenuItem).join("")}
      <div style="height:1px;background:var(--color-divider);margin:6px 4px"></div>
      <button data-action="new-workspace" type="button"><span style="width:20px;display:flex;justify-content:center">${icon("plus", 13, 1.7)}</span><span>Add workspace</span></button>
      <button data-action="toggle-cross-search" type="button"><span style="width:20px;display:flex;justify-content:center">${icon("search", 13, 1.7)}</span><span>${ui.crossWorkspace ? "Search active workspace" : "Search all workspaces"}</span></button>
    </div>
  `;
}

function renderWorkspaceMenuItem(workspace) {
  const p = paletteFor(workspace);
  const active = workspace.id === ui.workspaceId;
  return `
    <button data-action="switch-workspace" data-id="${workspace.id}" data-palette="${workspace.palette || "house"}" data-active="${active}" type="button" style="${active ? `background:${p.a100};color:${p.ink}` : ""}">
      <span class="workspace-mark" style="width:20px;height:20px;color:${p.accent};border-color:${p.accent};background:${active ? p.a100 : "transparent"}">${escapeHtml(workspace.mark)}</span>
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(workspace.name)}</span>
      <span style="display:flex;color:${p.accent};width:14px">${active ? icon("check", 13, 1.7) : ""}</span>
    </button>
  `;
}

function renderTopbar(ws) {
  const titles = {
    dashboard: "Overview",
    profiles: "Profiles",
    roles: "Roles",
    followups: "Follow-ups",
    archive: "Archive",
    templates: "Templates",
    capture: "Capture"
  };
  const primary = primaryAction();
  return `
    <header class="topbar">
      <div class="topbar-title">
        <div class="kicker">${escapeHtml(ws.name)} · ${ui.crossWorkspace && ui.tab === "profiles" ? "all workspaces" : "active scope"}</div>
        <h1>${titles[ui.tab] || "Overview"}</h1>
      </div>
      <div class="topbar-actions">
        <label class="search-wrap">
          <span>${icon("search", 14, 1.6)}</span>
          <input class="input" data-ui="query" value="${escapeAttr(ui.query)}" placeholder="Search candidates, roles, notes...">
        </label>
        <button class="btn btn-secondary" data-action="export-workspace" type="button">${icon("download", 14, 1.6)}Export</button>
        <label class="btn btn-secondary" style="display:inline-flex;align-items:center;gap:6px">
          ${icon("upload", 14, 1.6)}Import
          <input class="sr-only" data-action="import-workspace" type="file" accept="application/json">
        </label>
        <button class="btn btn-primary" data-action="${primary.action}" type="button">${primary.label}</button>
      </div>
    </header>
  `;
}

function renderView() {
  if (ui.tab === "dashboard") return renderDashboard();
  if (ui.tab === "profiles") return renderProfiles();
  if (ui.tab === "roles") return renderRoles();
  if (ui.tab === "followups") return renderFollowups();
  if (ui.tab === "archive") return renderArchive();
  if (ui.tab === "templates") return renderTemplates();
  if (ui.tab === "capture") return renderCapture();
  return renderDashboard();
}

function renderDashboard() {
  const roles = rolesInScope().filter((r) => !isRoleArchived(r));
  const activeRoles = roles.filter((r) => r.status === "Active");
  const cands = candidatesInScope().filter((c) => !isCandidateArchived(c));
  const target = activeRoles.reduce((sum, role) => sum + Number(role.target || 0), 0);
  const sourced = cands.filter((c) => activeRoles.some((r) => r.id === c.roleId)).length;
  const submitted = cands.filter((c) => c.stage === "Submitted").length;
  const due = followupBase().filter((c) => c.followUp && !isFuture(c.snoozedUntil) && daysFromToday(c.followUp) <= 1);
  const dueSoon = followupBase().filter((c) => c.followUp && !isFuture(c.snoozedUntil) && daysFromToday(c.followUp) <= 7).sort((a, b) => dateSort(a.followUp, b.followUp)).slice(0, 5);
  return `
    <div class="metrics">
      ${metric("Open roles", activeRoles.length, `${activeRoles.filter((r) => r.priority === "High").length} high`, "100%")}
      ${metric("Sourced / target", sourced, `of ${target || 0}`, target ? `${Math.min(100, Math.round(sourced / target * 100))}%` : "0%")}
      ${metric("Submitted", submitted, "to clients", "45%", "#6f8f6a")}
      ${metric("Follow-ups due", due.length, "next 48 hours", "30%", PRI.High)}
    </div>
    <div class="section-line">
      <h2>Open roles</h2>
      <div class="muted" style="font-size:11.5px"><span>Week of ${formatDate(today())}</span> · <button class="btn btn-ghost" data-action="tab" data-tab="roles" type="button">View all roles →</button></div>
    </div>
    ${roles.length ? renderRoleTable(activeRoles.slice(0, 8), { dashboard: true }) : emptyBlock("This workspace is empty", "Add a first role, import a workspace, or load demo seed data.", `<button class="btn btn-primary" data-action="new-role" type="button">Add first role</button><button class="btn btn-secondary" data-action="load-demo" type="button">Load demo seed</button>`)}
    <div class="split" style="margin-top:22px">
      <section class="aside-pane" style="width:50%">
        <div class="label-upper" style="margin-bottom:8px">Due this week</div>
        <div class="aside-list">
          ${dueSoon.map((c) => miniCandidateRow(c)).join("") || `<div class="muted">No dated follow-ups this week.</div>`}
        </div>
      </section>
      <section class="aside-pane" style="width:50%">
        <div class="label-upper" style="margin-bottom:8px">Recent activity</div>
        <div class="aside-list">
          ${recentActivity().map((a) => `<div class="mini-row"><span class="num" style="width:64px;flex:none">${escapeHtml(a.when)}</span><span>${escapeHtml(a.text)}</span></div>`).join("") || `<div class="muted">New edits will appear here.</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderProfiles() {
  const rankRole = roleById(ui.filters.roleId);
  const rows = filteredCandidates().map((c) => rowWithScore(c, rankRole)).sort((a, b) => (b.match?.score || 0) - (a.match?.score || 0));
  return `
    ${renderProfileFilters()}
    <div class="result-note">
      <span class="dot" style="--dot-color:${rankRole ? "var(--color-accent)" : "var(--color-neutral-400)"}"></span>
      <span>${rankRole ? `Ranked against ${escapeHtml(rankRole.title)}. Row evidence shows the two strongest signals.` : `${rows.length} profile${rows.length === 1 ? "" : "s"} in this view. Select a role to rank candidates.`}</span>
    </div>
    ${rows.length ? renderCandidateTable(rows, { score: Boolean(rankRole) }) : emptyBlock("No profiles match", "Adjust filters or add the first candidate for this workspace.", `<button class="btn btn-primary" data-action="new-candidate" type="button">New candidate</button>`)}
  `;
}

function renderProfileFilters() {
  const roles = rolesInScope().filter((r) => !isRoleArchived(r));
  const locations = [...new Set(candidatesInScope({ includeArchived: true }).map((c) => c.location).filter(Boolean))].sort();
  return `
    <div class="filters">
      <select class="tw-sel" data-filter="roleId" data-active="${Boolean(ui.filters.roleId)}">
        <option value="">All roles - no ranking</option>
        ${roles.map((r) => `<option value="${r.id}" ${ui.filters.roleId === r.id ? "selected" : ""}>Rank against · ${escapeHtml(r.title)}</option>`).join("")}
      </select>
      <select class="tw-sel" data-filter="stage" data-active="${Boolean(ui.filters.stage)}">
        <option value="">All stages</option>
        ${STAGES.map((stage) => `<option value="${stage}" ${ui.filters.stage === stage ? "selected" : ""}>${stage}</option>`).join("")}
      </select>
      <input class="input" data-filter="location" data-active="${Boolean(ui.filters.location)}" list="city-list" value="${escapeAttr(ui.filters.location)}" placeholder="City, Country">
      <datalist id="city-list">${locations.map((l) => `<option value="${escapeAttr(l)}"></option>`).join("")}</datalist>
      <select class="tw-sel" data-filter="follow" data-active="${ui.filters.follow !== "active"}">
        ${[
          ["active", "Follow-up · any"],
          ["overdue", "Follow-up · overdue"],
          ["week", "Follow-up · this week"],
          ["snoozed", "Follow-up · snoozed"],
          ["none", "Follow-up · none set"],
          ["archived", "Archived candidates"]
        ].map(([id, label]) => `<option value="${id}" ${ui.filters.follow === id ? "selected" : ""}>${label}</option>`).join("")}
      </select>
      <button class="btn btn-secondary" data-action="clear-profile-filters" type="button">Reset</button>
    </div>
  `;
}

function renderCandidateTable(rows, options = {}) {
  return `
    <div class="tw-tw">
      <table class="tw-t" style="min-width:1180px">
        <thead>
          <tr>
            ${options.score ? "<th>Score</th>" : ""}
            <th>Candidate</th>
            <th>Role</th>
            <th>Stage</th>
            <th>Location</th>
            <th>Follow-up</th>
            <th>Last contact</th>
            <th style="text-align:right">Actions</th>
          </tr>
        </thead>
        <tbody>${rows.map((row, index) => renderCandidateRow(row, options, index)).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderCandidateRow(candidate, options, index) {
  const role = roleById(candidate.roleId);
  const roles = rolesInScope().filter((r) => !isRoleArchived(r));
  return `
    <tr>
      ${options.score ? `<td><span class="score" style="--score-color:${scoreColor(candidate.match.score)}">${candidate.match.score}</span><span class="muted num" style="font-size:10.5px;display:block">#${index + 1}</span></td>` : ""}
      <td style="max-width:260px">
        <span class="candidate-title">${escapeHtml(candidate.name || "Unnamed candidate")}</span>
        <span class="candidate-subtitle">${escapeHtml([candidate.title, candidate.company].filter(Boolean).join(" · ") || "Details pending")}</span>
        ${options.score ? `<span class="evidence">${escapeHtml(candidate.match.reasons.slice(0, 2).map((r) => r.label).join(" · ") || "Review manually")}</span>` : ""}
      </td>
      <td>
        <select class="tw-sel tw-mini" data-candidate-patch="${candidate.id}" data-field="roleId" title="Change role">
          <option value="">No role</option>
          ${roles.map((r) => `<option value="${r.id}" ${candidate.roleId === r.id ? "selected" : ""}>${escapeHtml(r.title)}</option>`).join("")}
        </select>
      </td>
      <td>
        <span class="dot-label"><span class="status-dot" style="background:${STAGE_COLOR[candidate.stage] || STAGE_COLOR.Sourced}"></span>
          <select class="tw-sel tw-mini" data-candidate-patch="${candidate.id}" data-field="stage" title="Change stage">
            ${STAGES.map((stage) => `<option value="${stage}" ${candidate.stage === stage ? "selected" : ""}>${stage}</option>`).join("")}
          </select>
        </span>
      </td>
      <td>${escapeHtml(candidate.location || "-")}</td>
      <td><input class="tw-date" type="date" value="${escapeAttr(candidate.followUp)}" data-candidate-patch="${candidate.id}" data-field="followUp" title="Next follow-up"></td>
      <td><input class="tw-date" type="date" value="${escapeAttr(candidate.lastContact)}" data-candidate-patch="${candidate.id}" data-field="lastContact" title="Last contact"></td>
      <td style="text-align:right">
        <span class="row-actions">
          <button class="tw-ib" data-action="edit-candidate" data-id="${candidate.id}" title="Edit candidate" type="button">${icon("edit")}</button>
          <button class="tw-ib" data-action="contacted" data-id="${candidate.id}" title="Contacted" type="button">${icon("contacted")}</button>
          <button class="tw-ib" data-action="snooze" data-id="${candidate.id}" title="Snooze" type="button">${icon("snooze")}</button>
          ${candidate.linkedin ? `<a class="tw-ib" href="${safeUrl(candidate.linkedin)}" target="_blank" rel="noreferrer" title="LinkedIn">${icon("external")}</a>` : ""}
          ${(candidate.files || []).length ? `<button class="tw-ib" data-action="download-first-file" data-id="${candidate.id}" title="Download first file" type="button">${icon("download")}</button>` : ""}
        </span>
      </td>
    </tr>
  `;
}

function renderRoles() {
  const active = rolesInScope().filter((r) => !isRoleArchived(r));
  const detail = active.find((r) => r.id === ui.detailRoleId) || active[0];
  if (detail && ui.detailRoleId !== detail.id) ui.detailRoleId = detail.id;
  return `
    <div class="roles-layout">
      <section class="roles-main">
        <div class="section-line">
          <h2>Job positions</h2>
          <button class="btn btn-primary" data-action="new-role" type="button">New role</button>
        </div>
        ${active.length ? renderRoleTable(active, { controls: true, detailId: detail?.id }) : emptyBlock("No active roles", "Create a role for this workspace. Priority and status edit directly in the table.", `<button class="btn btn-primary" data-action="new-role" type="button">New role</button>`)}
      </section>
      ${detail ? renderRoleDetail(detail) : ""}
    </div>
  `;
}

function renderRoleTable(roles, options = {}) {
  return `
    <div class="tw-tw">
      <table class="tw-t" style="min-width:920px">
        <thead>
          <tr>
            <th>Role</th>
            <th>Client</th>
            <th>Priority</th>
            <th>Sourced / target</th>
            <th style="text-align:right">Submitted</th>
            <th>Status</th>
            <th style="text-align:right">Actions</th>
          </tr>
        </thead>
        <tbody>${roles.map((role) => renderRoleRow(role, options)).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderRoleRow(role, options = {}) {
  const count = state.candidates.filter((c) => c.workspaceId === role.workspaceId && c.roleId === role.id && !isCandidateArchived(c)).length;
  const pct = Number(role.target) ? `${Math.min(100, Math.round(count / Number(role.target) * 100))}%` : "0%";
  return `
    <tr class="${options.detailId === role.id ? "is-selected" : ""}">
      <td><button class="table-link" data-action="select-role-detail" data-id="${role.id}" type="button"><span class="candidate-title">${escapeHtml(role.title)}</span><span class="candidate-subtitle">${escapeHtml(role.location || "Location pending")}</span></button></td>
      <td>${escapeHtml(role.client || "-")}</td>
      <td>
        <span class="dot-label"><span class="status-dot" style="background:${PRI[role.priority] || PRI.Medium}"></span>
          <select class="tw-sel tw-mini" data-role-patch="${role.id}" data-field="priority" title="Change priority">
            ${PRIORITIES.map((p) => `<option value="${p}" ${role.priority === p ? "selected" : ""}>${p}</option>`).join("")}
          </select>
        </span>
      </td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="tiny-bar" style="flex:1;min-width:52px;margin:0"><span style="--value:${pct};--bar-color:${count >= Number(role.target || 1) ? "#6f8f6a" : "var(--color-accent)"}"></span></div><span class="num" style="font-size:12px;white-space:nowrap">${count}/${role.target || 0}</span></div></td>
      <td class="num" style="text-align:right">${Number(role.submitted || 0)}</td>
      <td>
        <span class="dot-label"><span class="status-dot" style="background:${role.status === "Active" ? "#6f8f6a" : role.status === "Paused" ? "#c28d41" : "#7d7979"}"></span>
          <select class="tw-sel tw-mini" data-role-patch="${role.id}" data-field="status" title="Change status">
            ${ROLE_STATUSES.map((s) => `<option value="${s}" ${role.status === s ? "selected" : ""}>${s}</option>`).join("")}
          </select>
        </span>
      </td>
      <td style="text-align:right">
        <span class="row-actions">
          ${role.board && /^https?:/.test(role.board) ? `<a class="tw-ib" href="${escapeAttr(role.board)}" target="_blank" rel="noreferrer" title="Job board">${icon("external")}</a>` : ""}
          <button class="tw-ib" data-action="edit-role" data-id="${role.id}" title="Edit role" type="button">${icon("edit")}</button>
          <button class="tw-ib" data-action="duplicate-role" data-id="${role.id}" title="Duplicate role" type="button">${icon("duplicate")}</button>
          <button class="tw-ib" data-action="archive-role" data-id="${role.id}" title="Archive role" type="button">${icon("archiveBox")}</button>
        </span>
      </td>
    </tr>
  `;
}

function renderRoleDetail(role) {
  const activeCandidates = candidatesInScope().filter((c) => c.roleId === role.id && !isCandidateArchived(c));
  const shortlist = activeCandidates
    .map((c) => rowWithScore(c, role))
    .sort((a, b) => (b.match?.score || 0) - (a.match?.score || 0))
    .slice(0, 4);
  const rejected = state.candidates.filter((c) => c.workspaceId === role.workspaceId && c.roleId === role.id && ["Rejected", "Dropped Out", "Closed"].includes(c.stage));
  const facts = [
    ["Priority", role.priority || "-"],
    ["Status", role.status || "-"],
    ["Hiring manager", role.manager || "-"],
    ["Comp band", role.comp || "-"],
    ["Opened", formatDate(role.opened)],
    ["Target close", formatDate(role.due)],
    ["Job board", role.board || "-"]
  ];
  return `
    <aside class="role-detail" aria-label="Role detail">
      <div class="section-line role-detail-head">
        <div>
          <div class="label-upper">Role detail</div>
          <h3>${escapeHtml(role.title)}</h3>
          <p>${escapeHtml([role.client, role.location].filter(Boolean).join(" - ") || "Client and location pending")}</p>
        </div>
      </div>
      <div class="role-detail-stats">
        ${[
          [`${activeCandidates.length}/${role.target || 0}`, "Sourced"],
          [shortlist.length, "Shortlist"],
          [Number(role.submitted || 0), "Submitted"]
        ].map(([value, label]) => `<div><b class="num">${value}</b><span>${label}</span></div>`).join("")}
      </div>
      <div class="role-detail-facts">
        ${facts.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value || "-")}</b></div>`).join("")}
      </div>
      <div>
        <div class="label-upper" style="margin-bottom:8px">Must-have signals</div>
        <div class="tag-cloud">${(role.must || []).map((m) => `<span class="tag">${escapeHtml(m)}</span>`).join("") || `<span class="tag tag-neutral">No must-haves yet</span>`}</div>
      </div>
      <div class="role-detail-list">
        <div class="section-line"><h4>Shortlist</h4></div>
        ${shortlist.map((c) => miniCandidateRow(c)).join("") || `<div class="muted" style="font-size:12.5px">No mapped candidates yet.</div>`}
      </div>
      <div class="role-detail-list">
        <div class="section-line"><h4>Rejected</h4><span class="num muted">${rejected.length}</span></div>
        ${rejected.slice(0, 3).map((c) => miniCandidateRow(c)).join("") || `<div class="muted" style="font-size:12.5px">No rejected candidates.</div>`}
      </div>
      <div class="role-detail-actions">
        <button class="btn btn-primary" data-action="rank-role" data-id="${role.id}" type="button">Rank candidates</button>
        <button class="btn btn-secondary" data-action="edit-role" data-id="${role.id}" type="button">Edit role</button>
      </div>
    </aside>
  `;
}

function renderFollowups() {
  const tabs = [["queue", "Queue"], ["snoozed", "Snoozed"], ["contacted", "Contacted again"]];
  const base = filteredFollowups();
  const queue = base.filter((c) => !isFuture(c.snoozedUntil) && !c.contactedOn && c.followUp);
  const snoozed = base.filter((c) => isFuture(c.snoozedUntil));
  const contacted = base.filter((c) => c.contactedOn);
  const activeRows = ui.followTab === "snoozed" ? snoozed : ui.followTab === "contacted" ? contacted : queue;
  return `
    <div class="follow-toolbar">
      <div class="seg">${tabs.map(([id, label]) => `<button class="${ui.followTab === id ? "active" : ""}" data-action="follow-tab" data-tab="${id}" type="button">${label} <span class="num">${id === "queue" ? queue.length : id === "snoozed" ? snoozed.length : contacted.length}</span></button>`).join("")}</div>
      <button class="btn btn-secondary" data-action="copy-follow-section" type="button">Copy this section</button>
    </div>
    <div class="filters">
      <select class="tw-sel" data-follow-filter="roleId" data-active="${Boolean(ui.followFilters.roleId)}"><option value="">All roles</option>${rolesInScope().filter((r) => !isRoleArchived(r)).map((r) => `<option value="${r.id}" ${ui.followFilters.roleId === r.id ? "selected" : ""}>${escapeHtml(r.title)}</option>`).join("")}</select>
      <select class="tw-sel" data-follow-filter="stage" data-active="${Boolean(ui.followFilters.stage)}"><option value="">All stages</option>${STAGES.map((s) => `<option value="${s}" ${ui.followFilters.stage === s ? "selected" : ""}>${s}</option>`).join("")}</select>
      <select class="tw-sel" data-follow-filter="priority" data-active="${Boolean(ui.followFilters.priority)}"><option value="">Any role priority</option>${PRIORITIES.map((p) => `<option value="${p}" ${ui.followFilters.priority === p ? "selected" : ""}>${p} priority</option>`).join("")}</select>
      <select class="tw-sel" data-follow-filter="window" data-active="${Boolean(ui.followFilters.window)}"><option value="">Any date</option>${[["overdue", "Overdue"], ["today", "Today & tomorrow"], ["week", "Rest of week"], ["later", "Later"]].map(([id, label]) => `<option value="${id}" ${ui.followFilters.window === id ? "selected" : ""}>${label}</option>`).join("")}</select>
      <input class="input" data-follow-filter="city" data-active="${Boolean(ui.followFilters.city)}" value="${escapeAttr(ui.followFilters.city)}" placeholder="City, Country">
      <button class="btn btn-secondary" data-action="clear-follow-filters" type="button">Reset</button>
    </div>
    ${ui.followTab === "queue" ? renderQueueGroups(queue) : activeRows.length ? renderCandidateTable(activeRows.map((c) => rowWithScore(c)), {}) : emptyBlock("Nothing here", "This follow-up section has no matching candidates.", "")}
  `;
}

function renderQueueGroups(rows) {
  const groups = [
    ["Overdue", rows.filter((c) => daysFromToday(c.followUp) < 0)],
    ["Today & tomorrow", rows.filter((c) => daysFromToday(c.followUp) >= 0 && daysFromToday(c.followUp) <= 1)],
    ["Rest of week", rows.filter((c) => daysFromToday(c.followUp) > 1 && daysFromToday(c.followUp) <= 7)],
    ["Later", rows.filter((c) => daysFromToday(c.followUp) > 7)]
  ];
  return groups.map(([label, items]) => `
    <section class="follow-group">
      <h3>${label}</h3>
      ${items.length ? renderCandidateTable(items.map((c) => rowWithScore(c)), {}) : `<div class="muted" style="font-size:12.5px">No candidates.</div>`}
    </section>
  `).join("");
}

function renderArchive() {
  const roles = rolesInScope({ includeArchived: true }).filter(isRoleArchived);
  const cands = candidatesInScope({ includeArchived: true }).filter(isCandidateArchived);
  return `
    <div class="archive-stack">
      <section>
        <div class="section-line"><h2>Archived roles</h2></div>
        ${roles.length ? renderArchiveRoleTable(roles) : emptyBlock("No archived roles", "Filled and closed roles will appear here.", "")}
      </section>
      <section>
        <div class="section-line"><h2>Archived candidates</h2></div>
        ${cands.length ? renderArchiveCandidateTable(cands) : emptyBlock("No archived candidates", "Hired, Dropped Out and Closed candidates file here automatically.", "")}
      </section>
    </div>
  `;
}

function renderArchiveRoleTable(roles) {
  return `
    <div class="tw-tw"><table class="tw-t"><thead><tr><th>Role</th><th>Status</th><th>Closed</th><th>Reason / notes</th><th style="text-align:right">Actions</th></tr></thead><tbody>
      ${roles.map((r) => `<tr>
        <td><span class="candidate-title">${escapeHtml(r.title)}</span><span class="candidate-subtitle">${escapeHtml(r.client || "")}</span></td>
        <td><select class="tw-sel tw-mini" data-role-patch="${r.id}" data-field="status">${ROLE_STATUSES.map((s) => `<option value="${s}" ${r.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></td>
        <td><input class="tw-date" type="date" value="${escapeAttr(r.closed || r.archivedAt || "")}" data-role-patch="${r.id}" data-field="closed"></td>
        <td><input class="tw-date" style="width:220px" value="${escapeAttr(r.closeReason || r.notes || "")}" data-role-patch="${r.id}" data-field="closeReason"></td>
        <td style="text-align:right"><button class="btn btn-secondary" data-action="restore-role" data-id="${r.id}" type="button">Restore</button></td>
      </tr>`).join("")}
    </tbody></table></div>
  `;
}

function renderArchiveCandidateTable(cands) {
  return `
    <div class="tw-tw"><table class="tw-t"><thead><tr><th>Candidate</th><th>Stage</th><th>Archived</th><th>Close reason</th><th style="text-align:right">Actions</th></tr></thead><tbody>
      ${cands.map((c) => `<tr>
        <td><span class="candidate-title">${escapeHtml(c.name)}</span><span class="candidate-subtitle">${escapeHtml([c.title, c.company].filter(Boolean).join(" · "))}</span></td>
        <td><select class="tw-sel tw-mini" data-candidate-patch="${c.id}" data-field="stage">${STAGES.map((s) => `<option value="${s}" ${c.stage === s ? "selected" : ""}>${s}</option>`).join("")}</select></td>
        <td><input class="tw-date" type="date" value="${escapeAttr(c.archivedAt || "")}" data-candidate-patch="${c.id}" data-field="archivedAt"></td>
        <td><input class="tw-date" style="width:220px" value="${escapeAttr(c.closeReason || c.remarks || "")}" data-candidate-patch="${c.id}" data-field="closeReason"></td>
        <td style="text-align:right"><button class="btn btn-secondary" data-action="restore-candidate" data-id="${c.id}" type="button">Restore</button></td>
      </tr>`).join("")}
    </tbody></table></div>
  `;
}

function renderTemplates() {
  const templates = templatesInScope();
  const cats = ["All", ...new Set(templates.map((t) => t.type).filter(Boolean))];
  const visible = ui.templateCat && ui.templateCat !== "All" ? templates.filter((t) => t.type === ui.templateCat) : templates;
  return `
    <div class="template-surface">
      <div class="template-cats">
        ${cats.map((cat) => `<button class="${(ui.templateCat || "All") === cat ? "active" : ""}" data-active="${(ui.templateCat || "All") === cat}" data-action="template-cat" data-cat="${escapeAttr(cat)}" type="button">${escapeHtml(cat)}</button>`).join("")}
      </div>
      ${visible.length ? `<div class="template-card-grid">
        ${visible.map((t) => renderTemplateCard(t)).join("")}
      </div>` : emptyBlock("No templates", "Create reusable outreach and submission copy for this workspace.", "")}
    </div>
  `;
}

function renderTemplateCard(template) {
  return `
    <article class="template-card">
      <div class="template-card-top">
        <h3>${escapeHtml(template.title)}</h3>
        <span class="tag">${escapeHtml(template.type || "Template")}</span>
      </div>
      <div class="template-body">${escapeHtml(template.body)}</div>
      <div class="template-card-foot">
        <span class="label-upper">${escapeHtml(template.meta || "No usage yet")}</span>
        <span class="template-card-actions">
          <button class="btn btn-ghost" data-action="copy-template" data-id="${template.id}" type="button">Copy</button>
          <button class="btn btn-ghost" data-action="duplicate-template" data-id="${template.id}" type="button">Duplicate</button>
          <button class="btn btn-ghost" data-action="edit-template" data-id="${template.id}" type="button">Edit</button>
        </span>
      </div>
    </article>
  `;
}

function renderCapture() {
  const captures = capturesInScope().filter((c) => !c.dismissedAt);
  const selected = captures.find((c) => c.id === selectedCaptureId) || captures[0];
  if (selected && selectedCaptureId !== selected.id) selectedCaptureId = selected.id;
  return `
    <div>
      <div class="capture-setup">
        <div class="capture-setup-copy">
          <div class="capture-setup-title">Command-based capture</div>
          <div class="capture-setup-note">Nothing is recorded until you press the bookmarklet. It sends title, URL, selected text, email clues and LinkedIn URL into this tab - never a new one.</div>
        </div>
        <span class="tag tag-outline capture-tag">Drag to bookmarks bar</span>
        <button class="capture-bookmarklet" data-action="copy-bookmarklet" type="button">⌘ Send to Workbench</button>
      </div>
      <div class="capture-workbench">
        <section class="capture-inbox">
          <div class="capture-title-line"><h4>Inbox</h4><span>${captures.length} awaiting review</span></div>
          ${captures.map((c) => renderCaptureRow(c, selected)).join("") || emptyBlock("No captured pages", "Use the bookmarklet when you want to send a page into the open Workbench tab.", "")}
        </section>
        <aside class="capture-review">
          <div class="capture-review-label">Review · convert to candidate</div>
          ${selected ? renderCaptureReview(selected) : `<div class="capture-empty"><div>Nothing waiting</div><p>No captures in this workspace. Press the bookmarklet on a profile page and it lands here for review.</p></div>`}
        </aside>
      </div>
    </div>
  `;
}

function renderCaptureRow(c, selected) {
  return `
    <button class="capture-row ${selected?.id === c.id ? "active" : ""}" data-action="select-capture" data-id="${c.id}" type="button">
      <div class="capture-row-top">
        <span class="tag tag-neutral">${escapeHtml(c.source || "Web")}</span>
        <span class="capture-row-title">${escapeHtml(c.title || "Untitled page")}</span>
        <span class="capture-row-time">${escapeHtml(formatDateTime(c.when))}</span>
      </div>
      <div class="capture-row-url">${escapeHtml(c.url || "No URL")}</div>
      <div class="capture-row-snippet">${escapeHtml(c.snippet || c.selection || "No selected text was captured.")}</div>
    </button>
  `;
}

function renderCaptureReview(cap) {
  return `
    <div>
      <div class="capture-review-fields">
        ${fieldInput("Name", "capture", cap.id, "name", cap.name || "")}
        <div class="capture-pair">${fieldInput("Title", "capture", cap.id, "parsedTitle", cap.parsedTitle || "")}${fieldInput("Company", "capture", cap.id, "company", cap.company || "")}</div>
        <div class="capture-pair">${fieldInput("Location - full city name", "capture", cap.id, "location", cap.location || "")}${fieldInput("Email clue", "capture", cap.id, "email", cap.email || "")}</div>
        <div class="field"><label>Assign to role</label><select class="tw-sel" data-capture-patch="${cap.id}" data-field="roleId"><option value="">No role</option>${rolesInScope().filter((r) => !isRoleArchived(r)).map((r) => `<option value="${r.id}" ${cap.roleId === r.id ? "selected" : ""}>${escapeHtml(r.title)}</option>`).join("")}</select></div>
        <div class="field"><label>Portfolio / website link</label><input class="input" data-capture-patch="${cap.id}" data-field="link" value="${escapeAttr(cap.link || cap.linkedinUrl || cap.url || "")}" placeholder="https://"></div>
        <div class="field"><label>Review notes</label><textarea class="input" data-capture-patch="${cap.id}" data-field="notes">${escapeHtml(cap.notes || cap.snippet || "")}</textarea></div>
      </div>
      <div class="capture-actions">
        <button class="btn btn-primary" data-action="convert-capture" data-id="${cap.id}" type="button">Create candidate</button>
        <button class="btn btn-secondary" data-action="dismiss-capture" data-id="${cap.id}" type="button">Dismiss</button>
      </div>
    </div>
  `;
}

function renderCandidateDrawer() {
  if (!draftCandidate) return "";
  const role = roleById(draftCandidate.roleId);
  const score = role ? scoreCandidate(draftCandidate, role) : null;
  const subtitle = [draftCandidate.title || "New candidate", draftCandidate.company].filter(Boolean).join(" · ");
  return `
    <div class="drawer-backdrop" data-action="close-drawers">
      <section class="drawer tw-scroll" data-drawer>
        <div class="drawer-header">
          <div>
            <div class="label-upper" style="color:var(--color-accent)">Candidate</div>
            ${draftCandidate.name ? `<h2>${escapeHtml(draftCandidate.name)}</h2>` : ""}
            <div class="drawer-subtitle">${escapeHtml(subtitle)}</div>
          </div>
          <button class="tw-ib" data-action="close-drawers" title="Close" type="button">${icon("close")}</button>
        </div>
        ${score ? renderScoreCard(score, role) : ""}
        <form data-form="candidate">
          <div class="field-grid">
            ${formField("Name", "name", draftCandidate.name, "full")}
            ${formField("Current title", "title", draftCandidate.title)}
            ${formField("Company", "company", draftCandidate.company)}
            ${formField("Location - full city and country", "location", draftCandidate.location)}
            <div class="field"><label>Role</label><select class="tw-sel" name="roleId"><option value="">No role</option>${rolesInScope().filter((r) => !isRoleArchived(r)).map((r) => `<option value="${r.id}" ${draftCandidate.roleId === r.id ? "selected" : ""}>${escapeHtml(r.title)}</option>`).join("")}</select></div>
            <div class="field"><label>Stage</label><select class="tw-sel" name="stage">${STAGES.map((s) => `<option value="${s}" ${draftCandidate.stage === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>
            ${formField("LinkedIn", "linkedin", draftCandidate.linkedin)}
            ${formField("Email", "email", draftCandidate.email, "", "email")}
            ${formField("Last contact", "lastContact", draftCandidate.lastContact, "", "date")}
            ${formField("Next follow-up", "followUp", draftCandidate.followUp, "", "date")}
            ${formField("Snoozed until", "snoozedUntil", draftCandidate.snoozedUntil, "", "date")}
            ${formField("Contacted on", "contactedOn", draftCandidate.contactedOn, "", "date")}
          </div>
          <div class="field" style="margin-top:12px"><label>Skills - comma separated</label><input class="input" name="skills" value="${escapeAttr((draftCandidate.skills || []).join(", "))}"></div>
          ${renderFilesEditor()}
          <div class="field" style="margin-top:12px"><label>Notes</label><textarea class="input" name="notes" style="min-height:70px">${escapeHtml(draftCandidate.notes || "")}</textarea></div>
          <div class="field" style="margin-top:10px"><label>Remarks / close reason</label><textarea class="input" name="remarks" style="min-height:56px">${escapeHtml(draftCandidate.remarks || draftCandidate.closeReason || "")}</textarea></div>
          <div class="muted" style="margin-top:8px;font-size:11.5px">${ARCHIVED_STAGES.includes(draftCandidate.stage) ? `Stage is ${escapeHtml(draftCandidate.stage)} - saving files this candidate into the Archive.` : "Setting the stage to Hired, Dropped Out or Closed files the candidate into Archive on save."}</div>
          <div class="drawer-actions">
            <button class="btn btn-primary" type="submit">Save candidate</button>
            <button class="btn btn-secondary" data-action="close-drawers" type="button">Cancel</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderScoreCard(score, role) {
  return `
    <div class="score-card">
      <div class="score-card-top">
        <strong style="color:${scoreColor(score.score)}">${score.score}</strong>
        <div><div>Score for ${escapeHtml(role.title)}</div><div class="muted" style="font-size:10.5px">JD · must-have tags · location · role mapping</div></div>
      </div>
      ${score.reasons.map((r) => `<div class="reason-row"><span class="reason-meter"><span style="--value:${Math.min(100, Math.abs(r.weight) * 4)}%"></span></span><span>${escapeHtml(r.label)}</span><b>${r.weight > 0 ? "+" : ""}${r.weight}</b></div>`).join("")}
    </div>
  `;
}

function renderFilesEditor() {
  const files = draftCandidate.files || [];
  const links = draftCandidate.links || [];
  return `
    <div class="panel" style="margin-top:14px">
      <div class="section-line"><div class="label-upper" style="color:var(--color-accent)">Resume & links</div><span class="muted" style="font-size:10.5px">${files.length + links.length} attached</span></div>
      <label class="drop-zone" data-action="file-drop">
        <span>Drop resumes here, or <span style="color:var(--color-accent);border-bottom:1px solid var(--color-accent)">browse your laptop</span></span>
        <span class="muted" style="font-size:11px">PDF, DOCX, PNG - stored locally with the record</span>
        <input class="sr-only" data-action="candidate-files" type="file" multiple>
      </label>
      <div class="stack" style="gap:5px;margin-top:8px">${files.map((f) => `<div class="file-row"><span style="display:flex;color:var(--color-accent)">${icon("file")}</span><span>${escapeHtml(f.name)}</span><span class="muted num">${escapeHtml(formatSize(f.size))}</span><button class="tw-ib" data-action="download-file" data-file-id="${f.id}" title="Download file" type="button">${icon("download")}</button><button class="tw-ib" data-action="remove-file" data-file-id="${f.id}" title="Remove file" type="button">${icon("close")}</button></div>`).join("")}</div>
      <div class="label-upper" style="margin:14px 0 6px">Portfolio & website links</div>
      <div style="display:flex;gap:6px"><input class="input" data-ui="linkDraft" value="${escapeAttr(ui.linkDraft || "")}" placeholder="portfolio, GitHub, personal site..." style="flex:1;font-size:12.5px;min-height:32px"><button class="btn btn-secondary" data-action="add-link" type="button">Add link</button></div>
      <div class="stack" style="gap:5px;margin-top:8px">${links.map((url, index) => `<div class="link-row"><span style="display:flex;color:var(--color-accent)">${icon("link")}</span><a href="${safeUrl(url)}" target="_blank" rel="noreferrer">${escapeHtml(url)}</a><button class="tw-ib" data-action="remove-link" data-index="${index}" title="Remove link" type="button">${icon("close")}</button></div>`).join("")}</div>
    </div>
  `;
}

function renderRoleDrawer() {
  if (!draftRole) return "";
  const role = draftRole;
  return `
    <div class="drawer-backdrop" data-action="close-drawers">
      <section class="drawer role-drawer tw-scroll" data-drawer>
        <div class="drawer-header">
          <div>
            <div class="label-upper" style="color:var(--color-accent)">${role.id ? "Edit role" : "New role"}</div>
            ${role.title ? `<h2>${escapeHtml(role.title)}</h2>` : ""}
            <div class="drawer-subtitle">${escapeHtml([role.client || "Client", role.location, `${role.priority || "Medium"} priority`].filter(Boolean).join(" · "))}</div>
          </div>
          <button class="tw-ib" data-action="close-drawers" title="Close" type="button">${icon("close")}</button>
        </div>
        <form data-form="role">
          <div class="field-grid">
            ${formField("Role title", "title", role.title, "full")}
            ${formField("Client / team", "client", role.client)}
            ${formField("Location - full city name", "location", role.location)}
            <div class="field"><label>Priority</label><select class="tw-sel" name="priority">${PRIORITIES.map((p) => `<option value="${p}" ${role.priority === p ? "selected" : ""}>${p}</option>`).join("")}</select></div>
            <div class="field"><label>Status</label><select class="tw-sel" name="status">${ROLE_STATUSES.map((s) => `<option value="${s}" ${role.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>
            ${formField("Hiring manager", "manager", role.manager)}
            ${formField("Compensation band", "comp", role.comp)}
            ${formField("Sourcing target", "target", role.target, "", "number")}
            ${formField("Submitted to client", "submitted", role.submitted, "", "number")}
            ${formField("Opened on", "opened", role.opened, "", "date")}
            ${formField("Target close", "due", role.due, "", "date")}
            ${formField("Primary job board", "board", role.board)}
            ${formField("Working week", "week", role.week)}
          </div>
          <div class="field" style="margin-top:12px"><label>Must-haves - comma separated</label><input class="input" name="must" value="${escapeAttr((role.must || []).join(", "))}"></div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px">${(role.must || []).map((m) => `<span class="tag tag-outline">${escapeHtml(m)}</span>`).join("")}</div>
          <div class="field" style="margin-top:12px"><label>Nice-to-haves</label><input class="input" name="nice" value="${escapeAttr(role.nice || "")}"></div>
          <div class="field" style="margin-top:10px"><label>Role brief</label><textarea class="input" name="brief" style="min-height:86px">${escapeHtml(role.brief || "")}</textarea></div>
          <div class="field" style="margin-top:10px"><label>Screening questions</label><textarea class="input" name="screening" style="min-height:70px">${escapeHtml(role.screening || "")}</textarea></div>
          <div class="field" style="margin-top:10px"><label>Internal notes</label><textarea class="input" name="notes" style="min-height:60px">${escapeHtml(role.notes || "")}</textarea></div>
          <div class="drawer-actions">
            <button class="btn btn-primary" type="submit">${role.id ? "Save role" : "Create role"}</button>
            ${role.id ? `<button class="btn btn-secondary" data-action="duplicate-role" data-id="${role.id}" type="button">Duplicate</button><button class="btn btn-secondary" data-action="${isRoleArchived(role) ? "restore-role" : "archive-role"}" data-id="${role.id}" type="button">${isRoleArchived(role) ? "Restore" : "Archive"}</button>` : ""}
            <button class="btn btn-ghost" data-action="close-drawers" type="button">Cancel</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderTemplateDialog() {
  if (!draftTemplate) return "";
  return `
    <div class="dialog-backdrop" data-action="close-template">
      <section class="dialog" data-dialog>
        <div class="dialog-title">${draftTemplate.id ? "Edit template" : "New template"}</div>
        <form data-form="template" class="stack">
          <div class="field-grid">
            ${formField("Title", "title", draftTemplate.title)}
            ${formField("Category", "type", draftTemplate.type)}
          </div>
          <div class="field"><label>Body - {name}, {role}, {client}, {company}</label><textarea class="input" name="body" style="min-height:180px">${escapeHtml(draftTemplate.body || "")}</textarea></div>
          <div class="dialog-actions">
            ${draftTemplate.id ? `<button class="btn btn-ghost" data-action="delete-template" data-id="${draftTemplate.id}" type="button">Delete</button>` : ""}
            <button class="btn btn-secondary" data-action="close-template" type="button">Cancel</button>
            <button class="btn btn-primary" type="submit">Save template</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderWorkspaceDialog() {
  if (!draftWorkspace) return "";
  return `
    <div class="dialog-backdrop" data-action="close-workspace">
      <section class="dialog" style="width:min(480px,100%)" data-dialog>
        <div class="dialog-title">New workspace</div>
        <p class="muted" style="font-size:12.5px;margin-top:-4px">Roles, candidates, templates, captures and archive are scoped to a workspace. Nothing is shared until explicitly copied across.</p>
        <form data-form="workspace" class="stack">
          <div class="field-grid">
            ${formField("Workspace name", "name", draftWorkspace.name)}
            ${formField("Mark", "mark", draftWorkspace.mark)}
          </div>
          <div class="field"><label>Workspace palette</label><div class="palette-row">
            ${Object.entries(PALETTES).map(([key, p]) => {
              const active = draftWorkspace.palette === key;
              return `<button class="palette-button" data-action="pick-palette" data-palette="${key}" data-active="${active}" aria-pressed="${active}" type="button" style="border-color:${active ? p.accent : "var(--color-divider)"};background:${active ? p.a100 : "transparent"};color:${active ? p.ink : "color-mix(in srgb, var(--color-text) 75%, transparent)"}"><span class="swatches"><span style="background:${p.ink}"></span><span style="background:${p.accent}"></span></span><span>${escapeHtml(p.label)}</span><span style="display:flex;color:${p.accent};width:13px">${active ? icon("check", 12, 1.8) : ""}</span></button>`;
            }).join("")}
          </div></div>
          <div class="field"><label>Type</label><select class="tw-sel" name="type">${["Client", "Company", "Talent collective", "Personal research"].map((t) => `<option value="${t}" ${draftWorkspace.type === t ? "selected" : ""}>${t}</option>`).join("")}</select></div>
          <div class="dialog-actions">
            <button class="btn btn-secondary" data-action="close-workspace" type="button">Cancel</button>
            <button class="btn btn-primary" type="submit">Create workspace</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

async function handleClick(event) {
  const drawer = event.target.closest("[data-drawer], [data-dialog]");
  if (drawer) event.stopPropagation();
  const el = event.target.closest("[data-action]");
  if (!el) return;
  if (drawer && !drawer.contains(el)) return;
  const action = el.dataset.action;
  const id = el.dataset.id;
  if (action === "tab") setUi({ tab: el.dataset.tab, workspaceMenu: false });
  if (action === "workspace-menu") setUi({ workspaceMenu: !ui.workspaceMenu });
  if (action === "switch-workspace") setUi({ workspaceId: id, workspaceMenu: false, filters: defaultFilters(), followFilters: defaultFollowFilters() });
  if (action === "toggle-cross-search") setUi({ crossWorkspace: !ui.crossWorkspace, workspaceMenu: false });
  if (action === "new-workspace") {
    draftWorkspace = { name: "", mark: "", type: "Client", palette: "ink" };
    setUi({ workspaceMenu: false });
  }
  if (action === "close-workspace") {
    draftWorkspace = null;
    render();
  }
  if (action === "pick-palette") {
    draftWorkspace.palette = el.dataset.palette;
    render();
  }
  if (action === "new-role") {
    draftRole = newRole();
    render();
  }
  if (action === "edit-role") {
    draftRole = { ...roleById(id) };
    render();
  }
  if (action === "select-role-detail") setUi({ detailRoleId: id });
  if (action === "rank-role") setUi({ tab: "profiles", filters: { ...ui.filters, roleId: id } });
  if (action === "duplicate-role") await duplicateRole(id);
  if (action === "archive-role") await patchRole(id, { archived: true, status: "Closed", closed: today(), archivedAt: today() });
  if (action === "restore-role") await patchRole(id, { archived: false, status: "Active", archivedAt: "", closed: "" });
  if (action === "new-candidate") {
    draftCandidate = newCandidate();
    render();
  }
  if (action === "edit-candidate") {
    draftCandidate = cloneCandidate(candidateById(id));
    render();
  }
  if (action === "restore-candidate") await patchCandidate(id, { archived: false, archivedAt: "", stage: "Contacted" });
  if (action === "contacted") await contactCandidate(id);
  if (action === "snooze") await snoozeCandidate(id);
  if (action === "download-first-file") downloadFirstFile(id);
  if (action === "download-file") downloadDraftFile(el.dataset.fileId);
  if (action === "remove-file") {
    draftCandidate.files = (draftCandidate.files || []).filter((f) => f.id !== el.dataset.fileId);
    render();
  }
  if (action === "add-link") {
    const value = (ui.linkDraft || "").trim();
    if (value && draftCandidate) {
      draftCandidate.links = [...(draftCandidate.links || []), value];
      setUi({ linkDraft: "" }, false);
      render();
    }
  }
  if (action === "remove-link") {
    draftCandidate.links = (draftCandidate.links || []).filter((_, index) => index !== Number(el.dataset.index));
    render();
  }
  if (action === "close-drawers") {
    draftCandidate = null;
    draftRole = null;
    render();
  }
  if (action === "clear-profile-filters") setUi({ filters: defaultFilters() });
  if (action === "follow-tab") setUi({ followTab: el.dataset.tab });
  if (action === "clear-follow-filters") setUi({ followFilters: defaultFollowFilters() });
  if (action === "copy-follow-section") copyFollowSection();
  if (action === "new-template") {
    draftTemplate = { title: "", type: "Outreach", body: "" };
    render();
  }
  if (action === "edit-template") {
    draftTemplate = { ...templateById(id) };
    render();
  }
  if (action === "close-template") {
    draftTemplate = null;
    render();
  }
  if (action === "delete-template") await deleteTemplate(id);
  if (action === "template-cat") setUi({ templateCat: el.dataset.cat });
  if (action === "select-template") setUi({ templateId: id });
  if (action === "copy-template") copyTemplate(id);
  if (action === "duplicate-template") await duplicateTemplate(id);
  if (action === "select-capture") {
    selectedCaptureId = id;
    render();
  }
  if (action === "convert-capture") await convertCapture(id);
  if (action === "dismiss-capture") await patchCapture(id, { dismissedAt: new Date().toISOString() });
  if (action === "copy-bookmarklet") {
    copyText(buildBookmarklet());
    say("Bookmarklet copied");
  }
  if (action === "export-workspace") await exportWorkspace();
  if (action === "load-demo") await loadDemo();
}

function handleInput(event) {
  const el = event.target;
  const cursor = typeof el.selectionStart === "number" ? el.selectionStart : null;
  syncDraftField(el);
  if (el.dataset.ui === "query") {
    ui = { ...ui, query: el.value, tab: ui.tab === "dashboard" && el.value ? "profiles" : ui.tab };
    saveUi();
    renderAndRefocus('[data-ui="query"]', cursor);
    return;
  }
  if (el.dataset.ui === "linkDraft") setUi({ linkDraft: el.value }, false);
  if (el.tagName !== "SELECT" && updateFilterControl(el, cursor)) return;
}

function renderAndRefocus(selector, cursor) {
  render();
  const next = app.querySelector(selector);
  next?.focus();
  if (cursor !== null && typeof next?.setSelectionRange === "function") next.setSelectionRange(cursor, cursor);
}

async function handleChange(event) {
  const el = event.target;
  syncDraftField(el);
  if (updateFilterControl(el)) return;
  if (el.dataset.candidatePatch) await patchCandidate(el.dataset.candidatePatch, { [el.dataset.field]: normalizePatchValue(el.dataset.field, el.value) });
  if (el.dataset.rolePatch) await patchRole(el.dataset.rolePatch, { [el.dataset.field]: normalizePatchValue(el.dataset.field, el.value) });
  if (el.dataset.capturePatch) await patchCapture(el.dataset.capturePatch, { [el.dataset.field]: el.value });
  if (el.dataset.action === "candidate-files") await addDraftFiles(Array.from(el.files || []));
  if (el.dataset.action === "import-workspace") await importWorkspace(el.files?.[0]);
}

function updateFilterControl(el, cursor = null) {
  if (el.dataset.filter) {
    ui.filters[el.dataset.filter] = el.value;
    saveUi();
    renderAndRefocus(`[data-filter="${el.dataset.filter}"]`, cursor);
    return true;
  }
  if (el.dataset.followFilter) {
    ui.followFilters[el.dataset.followFilter] = el.value;
    saveUi();
    renderAndRefocus(`[data-follow-filter="${el.dataset.followFilter}"]`, cursor);
    return true;
  }
  return false;
}

function syncDraftField(el) {
  if (!el?.name) return;
  const form = el.closest("form[data-form]");
  if (!form) return;
  const value = normalizeDraftValue(el.name, el.value);
  if (form.dataset.form === "candidate" && draftCandidate) draftCandidate[el.name] = value;
  if (form.dataset.form === "role" && draftRole) draftRole[el.name] = value;
  if (form.dataset.form === "template" && draftTemplate) draftTemplate[el.name] = value;
  if (form.dataset.form === "workspace" && draftWorkspace) draftWorkspace[el.name] = value;
}

function normalizeDraftValue(name, value) {
  if (name === "skills" || name === "must") return splitList(value);
  if (name === "target" || name === "submitted") return Number(value || 0);
  return value;
}

function handleDragOver(event) {
  if (!event.target.closest(".drop-zone")) return;
  event.preventDefault();
}

async function handleDrop(event) {
  if (!event.target.closest(".drop-zone")) return;
  event.preventDefault();
  await addDraftFiles(Array.from(event.dataTransfer?.files || []));
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  if (form.dataset.form === "candidate") await saveCandidateForm(form);
  if (form.dataset.form === "role") await saveRoleForm(form);
  if (form.dataset.form === "template") await saveTemplateForm(form);
  if (form.dataset.form === "workspace") await saveWorkspaceForm(form);
}

async function saveCandidateForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const stage = data.stage || "Sourced";
  const rec = {
    ...draftCandidate,
    ...data,
    stage,
    skills: splitList(data.skills),
    remarks: data.remarks || "",
    closeReason: data.remarks || draftCandidate.closeReason || "",
    archived: ARCHIVED_STAGES.includes(stage) ? true : draftCandidate.archived || false,
    archivedAt: ARCHIVED_STAGES.includes(stage) ? draftCandidate.archivedAt || today() : draftCandidate.archivedAt || "",
    updatedAt: new Date().toISOString()
  };
  state.candidates = state.candidates.some((c) => c.id === rec.id) ? state.candidates.map((c) => c.id === rec.id ? rec : c) : [rec, ...state.candidates];
  draftCandidate = null;
  await saveState();
  say(ARCHIVED_STAGES.includes(stage) ? "Candidate saved to Archive" : "Candidate saved");
  render();
}

async function saveRoleForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const status = data.status || "Active";
  const rec = {
    ...draftRole,
    ...data,
    id: draftRole.id || uid("role"),
    must: splitList(data.must),
    target: Number(data.target || 0),
    submitted: Number(data.submitted || 0),
    archived: ["Filled", "Closed"].includes(status) ? true : draftRole.archived || false,
    closed: ["Filled", "Closed"].includes(status) ? draftRole.closed || today() : draftRole.closed || "",
    archivedAt: ["Filled", "Closed"].includes(status) ? draftRole.archivedAt || today() : draftRole.archivedAt || "",
    updatedAt: new Date().toISOString()
  };
  delete rec.mustText;
  state.roles = state.roles.some((r) => r.id === rec.id) ? state.roles.map((r) => r.id === rec.id ? rec : r) : [rec, ...state.roles];
  draftRole = null;
  await saveState();
  say("Role saved");
  render();
}

async function saveTemplateForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const rec = { ...draftTemplate, ...data, id: draftTemplate.id || uid("tpl"), workspaceId: activeWorkspace().id, meta: draftTemplate.meta || "No usage yet", updatedAt: new Date().toISOString() };
  state.templates = state.templates.some((t) => t.id === rec.id) ? state.templates.map((t) => t.id === rec.id ? rec : t) : [rec, ...state.templates];
  ui.templateId = rec.id;
  draftTemplate = null;
  await saveState();
  saveUi();
  say("Template saved");
  render();
}

async function saveWorkspaceForm(form) {
  const data = Object.fromEntries(new FormData(form));
  if (!data.name.trim()) {
    say("Give the workspace a name");
    return;
  }
  const id = uid("ws");
  const rec = { id, name: data.name.trim(), mark: (data.mark || data.name.slice(0, 2)).toUpperCase(), type: data.type || "Client", palette: draftWorkspace.palette || "ink" };
  state.workspaces = [...state.workspaces, rec];
  ui.workspaceId = id;
  ui.tab = "dashboard";
  draftWorkspace = null;
  await saveState();
  saveUi();
  say(`${rec.name} created`);
  render();
}

async function patchCandidate(id, patch) {
  state.candidates = state.candidates.map((c) => {
    if (c.id !== id) return c;
    const next = { ...c, ...patch, updatedAt: new Date().toISOString() };
    if (patch.stage && ARCHIVED_STAGES.includes(patch.stage)) {
      next.archived = true;
      next.archivedAt = next.archivedAt || today();
    }
    if (patch.stage && !ARCHIVED_STAGES.includes(patch.stage)) {
      next.archived = false;
    }
    return next;
  });
  await saveState();
  render();
}

async function patchRole(id, patch) {
  state.roles = state.roles.map((r) => {
    if (r.id !== id) return r;
    const next = { ...r, ...patch, updatedAt: new Date().toISOString() };
    if (patch.status && ["Filled", "Closed"].includes(patch.status)) {
      next.archived = true;
      next.closed = next.closed || today();
      next.archivedAt = next.archivedAt || today();
    }
    if (patch.status && !["Filled", "Closed"].includes(patch.status)) {
      next.archived = false;
    }
    return next;
  });
  await saveState();
  render();
}

async function patchCapture(id, patch) {
  state.captures = state.captures.map((c) => c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c);
  await saveState();
  render();
}

async function contactCandidate(id) {
  const c = candidateById(id);
  if (!c) return;
  await patchCandidate(id, { lastContact: today(), contactedOn: today(), touches: Number(c.touches || 0) + 1, followUp: addDays(today(), 4), snoozedUntil: "", snoozedOn: "" });
  say(`${c.name} logged as contacted`);
}

async function snoozeCandidate(id) {
  const c = candidateById(id);
  if (!c) return;
  const until = addDays(c.followUp || today(), 7);
  await patchCandidate(id, { snoozedUntil: until, snoozedOn: today(), followUp: until, contactedOn: "" });
  say(`Snoozed to ${formatDate(until)}`);
}

async function duplicateRole(id) {
  const role = roleById(id);
  if (!role) return;
  const copy = { ...role, id: uid("role"), title: `${role.title} (copy)`, status: "Active", archived: false, closed: "", archivedAt: "", submitted: 0, createdAt: new Date().toISOString() };
  state.roles = [copy, ...state.roles];
  ui.detailRoleId = copy.id;
  draftRole = null;
  await saveState();
  say(`${copy.title} created`);
  render();
}

async function duplicateTemplate(id) {
  const template = templateById(id);
  if (!template) return;
  const copy = { ...template, id: uid("tpl"), title: `${template.title} (copy)`, meta: "New - never used", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  state.templates = [...state.templates, copy];
  await saveState();
  say("Template duplicated");
  render();
}

async function deleteTemplate(id) {
  state.templates = state.templates.filter((t) => t.id !== id);
  draftTemplate = null;
  await saveState();
  render();
}

async function convertCapture(id) {
  const cap = state.captures.find((c) => c.id === id);
  if (!cap || !cap.name) {
    say("Add a name before converting");
    return;
  }
  const candidate = {
    id: uid("cand"),
    workspaceId: cap.workspaceId || activeWorkspace().id,
    name: cap.name,
    title: cap.parsedTitle || "",
    company: cap.company || "",
    location: cap.location || "",
    roleId: cap.roleId || "",
    stage: "Sourced",
    followUp: addDays(today(), 3),
    lastContact: "",
    snoozedUntil: "",
    snoozedOn: "",
    contactedOn: "",
    touches: 0,
    linkedin: cap.linkedinUrl || (String(cap.url || "").includes("linkedin.com") ? cap.url : ""),
    email: cap.email || "",
    files: [],
    links: cap.link ? [cap.link] : [],
    skills: [],
    notes: cap.notes || cap.snippet || cap.selection || "",
    remarks: "",
    sequence: "",
    archived: false,
    archivedAt: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  state.candidates = [candidate, ...state.candidates];
  state.captures = state.captures.filter((c) => c.id !== id);
  selectedCaptureId = "";
  await saveState();
  say(`${candidate.name} created as a candidate`);
  render();
}

async function addDraftFiles(files) {
  if (!draftCandidate || !files.length) return;
  const mapped = await Promise.all(files.map(async (file) => ({ id: uid("file"), name: file.name, size: file.size, type: file.type, blob: file })));
  draftCandidate.files = [...(draftCandidate.files || []), ...mapped];
  render();
}

function filteredCandidates() {
  const q = normalize(ui.query);
  return candidatesInScope({ includeArchived: ui.filters.follow === "archived" }).filter((c) => {
    const role = roleById(c.roleId);
    if (ui.filters.follow === "archived") {
      if (!isCandidateArchived(c)) return false;
    } else if (isCandidateArchived(c)) return false;
    if (q && !normalize(searchText(c, role)).includes(q)) return false;
    if (ui.filters.roleId && c.roleId !== ui.filters.roleId) return false;
    if (ui.filters.stage && c.stage !== ui.filters.stage) return false;
    if (ui.filters.location && !normalize(c.location).includes(normalize(ui.filters.location))) return false;
    if (ui.filters.follow === "overdue" && (!c.followUp || daysFromToday(c.followUp) >= 0)) return false;
    if (ui.filters.follow === "week" && (!c.followUp || daysFromToday(c.followUp) > 7)) return false;
    if (ui.filters.follow === "snoozed" && !isFuture(c.snoozedUntil)) return false;
    if (ui.filters.follow === "none" && c.followUp) return false;
    return true;
  });
}

function filteredFollowups() {
  return followupBase().filter((c) => {
    const role = roleById(c.roleId);
    if (ui.query && !normalize(searchText(c, role)).includes(normalize(ui.query))) return false;
    if (ui.followFilters.roleId && c.roleId !== ui.followFilters.roleId) return false;
    if (ui.followFilters.stage && c.stage !== ui.followFilters.stage) return false;
    if (ui.followFilters.priority && role?.priority !== ui.followFilters.priority) return false;
    if (ui.followFilters.city && !normalize(c.location).includes(normalize(ui.followFilters.city))) return false;
    if (ui.followFilters.window && !dateWindowMatch(c.followUp || c.snoozedUntil, ui.followFilters.window)) return false;
    return true;
  });
}

function followupBase() {
  return candidatesInScope().filter((c) => !isCandidateArchived(c));
}

function candidatesInScope(options = {}) {
  const ids = ui.crossWorkspace && ui.tab === "profiles" ? null : activeWorkspace().id;
  return state.candidates.filter((c) => (!ids || c.workspaceId === ids) && (options.includeArchived || !isCandidateArchived(c)));
}

function rolesInScope(options = {}) {
  return state.roles.filter((r) => r.workspaceId === activeWorkspace().id && (options.includeArchived || !isRoleArchived(r)));
}

function templatesInScope() {
  return state.templates.filter((t) => t.workspaceId === activeWorkspace().id);
}

function capturesInScope() {
  return state.captures.filter((c) => c.workspaceId === activeWorkspace().id);
}

function rowWithScore(candidate, rankRole = null) {
  return { ...candidate, match: rankRole ? scoreCandidate(candidate, rankRole) : { score: 0, reasons: [] } };
}

function scoreCandidate(candidate, role) {
  const text = normalize([candidate.name, candidate.title, candidate.company, candidate.location, candidate.notes, candidate.remarks, (candidate.skills || []).join(" ")].join(" "));
  const roleLoc = normalize(role.location);
  const reasons = [];
  let score = 4;
  (role.must || []).forEach((must) => {
    if (must && text.includes(normalize(must))) {
      score += 15;
      reasons.push({ label: must, weight: 15 });
    }
  });
  const city = roleLoc.split(",")[0]?.trim();
  if (city && normalize(candidate.location).includes(city)) {
    score += 10;
    reasons.push({ label: "location fit", weight: 10 });
  }
  if (candidate.roleId === role.id) {
    score += 8;
    reasons.push({ label: "mapped to role", weight: 8 });
  }
  const boost = stageBoost(candidate.stage);
  if (boost) {
    score += boost;
    reasons.push({ label: `${candidate.stage} stage`, weight: boost });
  }
  if (isCandidateArchived(candidate) || ["Rejected", "Dropped Out", "Closed"].includes(candidate.stage)) {
    score -= 30;
    reasons.push({ label: "closed out", weight: -30 });
  }
  const domainHits = splitList(`${role.title}, ${role.brief}, ${role.notes}, ${role.nice}`).filter((token) => token.length > 2 && text.includes(normalize(token))).slice(0, 3);
  domainHits.forEach((hit) => {
    if (!reasons.some((r) => normalize(r.label) === normalize(hit))) reasons.push({ label: hit, weight: 5 });
  });
  return { score: Math.max(4, Math.min(98, score)), reasons: reasons.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight)).slice(0, 8) };
}

function stageBoost(stage) {
  return { Contacted: 2, Replied: 6, Screening: 8, Shortlisted: 12, Submitted: 15, Interviewing: 18, Offered: 20, Hired: 22 }[stage] || 0;
}

function navCounts() {
  return {
    dashboard: rolesInScope().filter((r) => r.status === "Active").length,
    profiles: candidatesInScope().length,
    roles: rolesInScope().length,
    followups: followupBase().filter((c) => c.followUp && !isFuture(c.snoozedUntil) && !c.contactedOn).length,
    archive: rolesInScope({ includeArchived: true }).filter(isRoleArchived).length + candidatesInScope({ includeArchived: true }).filter(isCandidateArchived).length,
    templates: templatesInScope().length,
    capture: capturesInScope().filter((c) => !c.dismissedAt).length
  };
}

function primaryAction() {
  if (ui.tab === "dashboard") return { label: "Add role", action: "new-role" };
  if (ui.tab === "roles") return { label: "New role", action: "new-role" };
  if (ui.tab === "templates") return { label: "New template", action: "new-template" };
  if (ui.tab === "capture") return { label: "Copy bookmarklet", action: "copy-bookmarklet" };
  return { label: "New candidate", action: "new-candidate" };
}

function activeWorkspace() {
  let ws = state.workspaces.find((w) => w.id === ui.workspaceId && !w.archived) || state.workspaces.find((w) => !w.archived) || defaultWorkspace;
  if (!state.workspaces.some((w) => w.id === ws.id)) state.workspaces.unshift(ws);
  ui.workspaceId = ws.id;
  return ws;
}

function applyTheme() {
  const p = paletteFor(activeWorkspace());
  const s = document.documentElement.style;
  s.setProperty("--color-accent", p.accent);
  s.setProperty("--color-accent-100", p.a100);
  s.setProperty("--color-accent-600", p.a600);
  s.setProperty("--color-accent-700", p.a700);
  s.setProperty("--color-accent-800", p.a800);
  s.setProperty("--color-text", p.ink);
}

function paletteFor(workspace) {
  return PALETTES[workspace?.palette] || PALETTES.house;
}

function newRole() {
  return {
    id: "",
    workspaceId: activeWorkspace().id,
    title: "",
    client: "",
    location: "",
    priority: "Medium",
    status: "Active",
    target: 10,
    submitted: 0,
    week: "",
    board: "",
    must: [],
    nice: "",
    manager: "",
    comp: "",
    opened: today(),
    due: "",
    brief: "",
    screening: "",
    notes: "",
    archived: false,
    closed: "",
    createdAt: new Date().toISOString()
  };
}

function newCandidate() {
  return {
    id: uid("cand"),
    workspaceId: activeWorkspace().id,
    name: "",
    title: "",
    company: "",
    location: "",
    roleId: rolesInScope()[0]?.id || "",
    stage: "Sourced",
    followUp: "",
    lastContact: "",
    snoozedUntil: "",
    snoozedOn: "",
    contactedOn: "",
    touches: 0,
    linkedin: "",
    email: "",
    files: [],
    links: [],
    skills: [],
    notes: "",
    remarks: "",
    sequence: "",
    archived: false,
    archivedAt: "",
    createdAt: new Date().toISOString()
  };
}

function roleSeed(id, workspaceId, title, client, location, priority, status, target, submitted, week, board, must, nice, manager, comp, opened, due, brief, screening, notes, archived = false, closed = "") {
  return { id, workspaceId, title, client, location, priority, status, target, submitted, week, board, must, nice, manager, comp, opened, due, brief, screening, notes, archived, closed, archivedAt: archived ? closed : "", createdAt: new Date().toISOString() };
}

function candSeed(id, workspaceId, name, title, company, location, roleId, stage, followUp, lastContact, skills, notes, remarks, extra = {}) {
  return { id, workspaceId, name, title, company, location, roleId, stage, followUp, lastContact, snoozedUntil: "", snoozedOn: "", contactedOn: "", touches: 0, linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`, email: `${name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.+|\.+$/g, "")}@example.com`, files: [], links: [], skills, notes, remarks, sequence: "", archived: ARCHIVED_STAGES.includes(stage), archivedAt: ARCHIVED_STAGES.includes(stage) ? today() : "", createdAt: new Date().toISOString(), ...extra };
}

function tplSeed(id, workspaceId, title, type, body) {
  return { id, workspaceId, title, type, body, meta: "Demo seed", createdAt: new Date().toISOString() };
}

function normalizeState(input) {
  const next = { ...emptyState(), ...input };
  next.workspaces = (next.workspaces || []).map((w) => ({ ...defaultWorkspace, ...w, id: w.id || uid("ws"), palette: w.palette || "house" }));
  next.roles = (next.roles || []).map((r) => ({
    id: r.id || uid("role"),
    workspaceId: r.workspaceId || r.ws || activeWorkspaceSafe(next).id,
    title: r.title || "",
    client: r.client || "",
    location: r.location || "",
    priority: PRIORITIES.includes(r.priority) ? r.priority : "Medium",
    status: ROLE_STATUSES.includes(r.status) ? r.status : "Active",
    target: Number(r.target || 0),
    submitted: Number(r.submitted || 0),
    week: r.week || "",
    board: r.board || r.jobBoard || "",
    must: Array.isArray(r.must) ? r.must : splitList(r.requirements || ""),
    nice: r.nice || "",
    manager: r.manager || "",
    comp: r.comp || r.salary || "",
    opened: toDateValue(r.opened),
    due: toDateValue(r.due),
    brief: r.brief || "",
    screening: r.screening || "",
    notes: r.notes || "",
    archived: Boolean(r.archived || ["Filled", "Closed"].includes(r.status)),
    closed: toDateValue(r.closed),
    closeReason: r.closeReason || "",
    archivedAt: toDateValue(r.archivedAt),
    createdAt: r.createdAt || new Date().toISOString(),
    updatedAt: r.updatedAt || ""
  }));
  next.candidates = (next.candidates || []).map((c) => ({
    id: c.id || uid("cand"),
    workspaceId: c.workspaceId || c.ws || activeWorkspaceSafe(next).id,
    name: c.name || "",
    title: c.title || "",
    company: c.company || "",
    location: c.location || "",
    roleId: c.roleId || "",
    stage: STAGES.includes(c.stage) ? c.stage : "Sourced",
    followUp: toDateValue(c.followUp || c.nextFollowUp),
    lastContact: toDateValue(c.lastContact),
    snoozedUntil: toDateValue(c.snoozedUntil),
    snoozedOn: toDateValue(c.snoozedOn),
    contactedOn: toDateValue(c.contactedOn),
    touches: Number(c.touches || 0),
    linkedin: c.linkedin || "",
    email: c.email || "",
    files: (c.files || []).map((f) => ({ ...f, id: f.id || uid("file") })),
    links: c.links || [],
    skills: Array.isArray(c.skills) ? c.skills : splitList(c.skills || ""),
    notes: c.notes || "",
    remarks: c.remarks || c.dropoutNotes || "",
    closeReason: c.closeReason || c.dropoutNotes || "",
    sequence: c.sequence || "",
    archived: Boolean(c.archived || ARCHIVED_STAGES.includes(c.stage)),
    archivedAt: toDateValue(c.archivedAt),
    createdAt: c.createdAt || new Date().toISOString(),
    updatedAt: c.updatedAt || ""
  }));
  next.templates = (next.templates || []).map((t) => ({ id: t.id || uid("tpl"), workspaceId: t.workspaceId || t.ws || activeWorkspaceSafe(next).id, title: t.title || "Untitled template", type: t.type || "Outreach", body: t.body || "", meta: t.meta || "No usage yet" }));
  next.captures = (next.captures || []).map((c) => ({ id: c.id || uid("cap"), workspaceId: c.workspaceId || c.ws || activeWorkspaceSafe(next).id, source: c.source || sourceFromUrl(c.url), title: c.title || "", url: c.url || "", when: c.when || c.createdAt || new Date().toISOString(), snippet: c.snippet || c.selection || "", name: c.name || "", parsedTitle: c.parsedTitle || c.title2 || "", company: c.company || "", location: c.location || "", email: c.email || "", linkedinUrl: c.linkedinUrl || c.linkedin || "", link: c.link || "", roleId: c.roleId || "", notes: c.notes || "", dismissedAt: c.dismissedAt || "" }));
  return next;
}

function activeWorkspaceSafe(s) {
  return s.workspaces?.[0] || defaultWorkspace;
}

function loadUi() {
  try {
    const saved = JSON.parse(localStorage.getItem(UI_KEY)) || {};
    return {
      ...defaultUi(),
      ...saved,
      filters: { ...defaultFilters(), ...(saved.filters || {}) },
      followFilters: { ...defaultFollowFilters(), ...(saved.followFilters || {}) }
    };
  } catch {
    return defaultUi();
  }
}

function defaultUi() {
  return { tab: "dashboard", workspaceId: "st", workspaceMenu: false, query: "", crossWorkspace: false, filters: defaultFilters(), followTab: "queue", followFilters: defaultFollowFilters(), detailRoleId: "", templateCat: "All", templateId: "", linkDraft: "", toast: "" };
}

function defaultFilters() {
  return { roleId: "", stage: "", location: "", follow: "active" };
}

function defaultFollowFilters() {
  return { roleId: "", stage: "", priority: "", window: "", city: "" };
}

function setUi(patch, doRender = true) {
  ui = { ...ui, ...patch };
  saveUi();
  if (doRender) render();
}

function saveUi() {
  const { toast, linkDraft, ...persisted } = ui;
  localStorage.setItem(UI_KEY, JSON.stringify(persisted));
}

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => req.result.createObjectStore("kv");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function readState() {
  return tx("readonly", (store) => store.get(STATE_KEY));
}

function saveState() {
  return tx("readwrite", (store) => store.put(state, STATE_KEY));
}

function tx(mode, fn) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("kv", mode);
    const request = fn(transaction.objectStore("kv"));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function exportWorkspace() {
  const ws = activeWorkspace();
  const payload = {
    exportedAt: new Date().toISOString(),
    workspace: ws,
    roles: state.roles.filter((r) => r.workspaceId === ws.id),
    candidates: await Promise.all(state.candidates.filter((c) => c.workspaceId === ws.id).map(serializeCandidate)),
    templates: state.templates.filter((t) => t.workspaceId === ws.id),
    captures: state.captures.filter((c) => c.workspaceId === ws.id)
  };
  downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }), `talent-workbench-${slug(ws.name)}-${today()}.json`);
}

async function serializeCandidate(candidate) {
  return { ...candidate, files: await Promise.all((candidate.files || []).map(async (f) => ({ id: f.id, name: f.name, size: f.size, type: f.type, dataUrl: f.blob ? await blobToDataUrl(f.blob) : f.dataUrl || "" }))) };
}

async function importWorkspace(file) {
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    const workspace = imported.workspace || imported.workspaces?.[0];
    if (!workspace) throw new Error("No workspace found");
    const wsId = workspace.id || uid("ws");
    const normalized = normalizeState({
      workspaces: [{ ...workspace, id: wsId }],
      roles: (imported.roles || []).map((r) => ({ ...r, workspaceId: wsId })),
      candidates: await Promise.all((imported.candidates || []).map(async (c) => ({ ...c, workspaceId: wsId, files: await Promise.all((c.files || []).map(deserializeFile)) }))),
      templates: (imported.templates || []).map((t) => ({ ...t, workspaceId: wsId })),
      captures: (imported.captures || []).map((c) => ({ ...c, workspaceId: wsId }))
    });
    state.workspaces = [...state.workspaces.filter((w) => w.id !== wsId), ...normalized.workspaces];
    state.roles = [...state.roles.filter((r) => r.workspaceId !== wsId), ...normalized.roles];
    state.candidates = [...state.candidates.filter((c) => c.workspaceId !== wsId), ...normalized.candidates];
    state.templates = [...state.templates.filter((t) => t.workspaceId !== wsId), ...normalized.templates];
    state.captures = [...state.captures.filter((c) => c.workspaceId !== wsId), ...normalized.captures];
    ui.workspaceId = wsId;
    await saveState();
    saveUi();
    say("Workspace imported");
    render();
  } catch (error) {
    say("Import failed: invalid JSON");
  }
}

async function deserializeFile(file) {
  if (!file.dataUrl) return { ...file, id: file.id || uid("file") };
  return { id: file.id || uid("file"), name: file.name, size: file.size, type: file.type, blob: await dataUrlToBlob(file.dataUrl) };
}

async function loadDemo() {
  if (!isEmptyData(state) && !confirm("Load demo seed data into this browser? Your existing data will stay and demo records will be added.")) return;
  const seed = normalizeState(demoSeed());
  state.workspaces = mergeById(state.workspaces, seed.workspaces);
  state.roles = mergeById(state.roles, seed.roles);
  state.candidates = mergeById(state.candidates, seed.candidates);
  state.templates = mergeById(state.templates, seed.templates);
  state.captures = mergeById(state.captures, seed.captures);
  await saveState();
  say("Demo seed loaded");
  render();
}

function mergeById(existing, incoming) {
  const map = new Map(existing.map((item) => [item.id, item]));
  incoming.forEach((item) => map.set(item.id, map.get(item.id) || item));
  return [...map.values()];
}

function isEmptyData(s) {
  return !s.roles.length && !s.candidates.length && !s.templates.length && !s.captures.length;
}

function handleCaptureMessage(event) {
  const payload = event.data || {};
  if (payload.type !== "talent:capture" && payload.type !== "superteam:capture") return;
  addCapture(createCapture(payload));
}

async function ingestUrlCapture() {
  const params = new URLSearchParams(location.search);
  if (!params.has("capture")) return;
  await addCapture(createCapture({
    title: params.get("title") || "",
    url: params.get("url") || "",
    selection: params.get("text") || ""
  }));
  history.replaceState({}, "", location.pathname);
}

async function addCapture(capture) {
  state.captures = [capture, ...state.captures.filter((c) => !(c.url === capture.url && c.title === capture.title && !c.dismissedAt))];
  selectedCaptureId = capture.id;
  ui.tab = "capture";
  await saveState();
  saveUi();
  say("Capture added");
  render();
}

function createCapture(payload) {
  const text = payload.selection || payload.text || "";
  const emailText = [text, payload.emailClues, payload.title].filter(Boolean).join(" ");
  const email = String(emailText).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const url = payload.url || "";
  const parsed = parseCapturePayload(payload, text);
  return {
    id: uid("cap"),
    workspaceId: activeWorkspace().id,
    source: sourceFromUrl(url),
    title: payload.title || "Untitled page",
    url,
    when: new Date().toISOString(),
    snippet: text.slice(0, 1200),
    name: parsed.name,
    parsedTitle: parsed.title,
    company: parsed.company,
    location: parsed.location,
    email,
    linkedinUrl: payload.linkedinUrl || (url.includes("linkedin.com") ? url : ""),
    link: url,
    roleId: rolesInScope()[0]?.id || "",
    notes: text
  };
}

function parseCapturePayload(payload, text) {
  const title = String(payload.title || "");
  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const chunks = clean(text).split(",").map(clean).filter(Boolean);
  const titleParts = title.split(/\s[-–—|]\s/).map(clean).filter(Boolean);
  let name = chunks[0] || titleParts[0] || "";
  let parsedTitle = chunks[1] || "";
  let company = chunks[2] || "";
  let location = chunks[3] && chunks[4] ? `${chunks[3]}, ${chunks[4]}` : "";

  const roleCompany = titleParts.slice(1).join(" - ").match(/^(.+?)\s+(?:at|@)\s+(.+)$/i);
  if (roleCompany) {
    parsedTitle = parsedTitle || clean(roleCompany[1]);
    company = company || clean(roleCompany[2]);
  }

  const locationMatch = clean(text).match(/\b([A-Z][A-Za-z .'-]+,\s*[A-Z][A-Za-z .'-]+)\b/);
  if (!location && locationMatch) location = clean(locationMatch[1]);
  name = name.replace(/\s+-\s+.*$/, "");

  return { name, title: parsedTitle, company, location };
}

function buildBookmarklet() {
  const origin = location.origin;
  const code = `(function(){var s=String(window.getSelection&&window.getSelection()||'').slice(0,4000);var emails=Array.from(document.body.innerText.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\.[A-Z]{2,}/ig)).slice(0,5).map(function(m){return m[0]});var linked=location.href.indexOf('linkedin.com')>-1?location.href:'';var w=window.open('','${WINDOW_NAME}');if(!w||w.closed){alert('Open Talent Workbench once, then use Capture again.');return;}try{if(w.location.href==='about:blank'){w.close();alert('Open Talent Workbench once, then use Capture again.');return;}}catch(e){}w.postMessage({type:'talent:capture',title:document.title,url:location.href,selection:s,emailClues:emails,linkedinUrl:linked},'${origin}');})();`;
  return `javascript:${code}`;
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

function metric(label, value, delta, pct, color = "var(--color-accent)") {
  return `<article class="metric"><div class="label-upper">${escapeHtml(label)}</div><div class="metric-value"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(delta)}</span></div><div class="tiny-bar"><span style="--value:${pct};--bar-color:${color}"></span></div></article>`;
}

function miniCandidateRow(c) {
  const role = roleById(c.roleId);
  return `<div class="mini-row"><span class="dot" style="--dot-color:${followColor(c.followUp)}"></span><b style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(c.name)}</b><span class="muted">${escapeHtml(role?.title || "No role")}</span><span class="num" style="color:${followColor(c.followUp)}">${formatDate(c.followUp)}</span></div>`;
}

function recentActivity() {
  return [...state.roles, ...state.candidates]
    .filter((item) => item.workspaceId === activeWorkspace().id && item.updatedAt)
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .slice(0, 5)
    .map((item) => ({ when: formatDate(item.updatedAt.slice(0, 10)), text: item.title && item.client ? `${item.title} updated` : `${item.name} updated · ${item.stage || ""}` }));
}

function emptyBlock(title, body, actions) {
  return `<div class="empty"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span>${actions ? `<div style="display:flex;gap:8px;justify-content:center;margin-top:14px">${actions}</div>` : ""}</div>`;
}

function formField(label, name, value = "", className = "", type = "text") {
  return `<div class="field ${className}"><label>${escapeHtml(label)}</label><input class="input" name="${escapeAttr(name)}" type="${type}" value="${escapeAttr(value)}"></div>`;
}

function fieldInput(label, prefix, id, field, value) {
  return `<div class="field"><label>${escapeHtml(label)}</label><input class="input" data-${prefix}-patch="${escapeAttr(id)}" data-field="${escapeAttr(field)}" value="${escapeAttr(value)}"></div>`;
}

function candidateById(id) {
  return state.candidates.find((c) => c.id === id);
}

function roleById(id) {
  return state.roles.find((r) => r.id === id);
}

function templateById(id) {
  return state.templates.find((t) => t.id === id);
}

function isRoleArchived(role) {
  return Boolean(role?.archived || ["Filled", "Closed"].includes(role?.status));
}

function isCandidateArchived(candidate) {
  return Boolean(candidate?.archived || ARCHIVED_STAGES.includes(candidate?.stage));
}

function searchText(candidate, role) {
  return [candidate.name, candidate.title, candidate.company, candidate.location, candidate.email, candidate.linkedin, candidate.notes, candidate.remarks, (candidate.skills || []).join(" "), role?.title, role?.client, role?.notes, role?.brief].filter(Boolean).join(" ");
}

function dateWindowMatch(date, windowId) {
  if (!date) return false;
  const d = daysFromToday(date);
  if (windowId === "overdue") return d < 0;
  if (windowId === "today") return d >= 0 && d <= 1;
  if (windowId === "week") return d > 1 && d <= 7;
  if (windowId === "later") return d > 7;
  return true;
}

function normalizePatchValue(field, value) {
  if (["target", "submitted", "touches"].includes(field)) return Number(value || 0);
  return value;
}

function scoreColor(score) {
  if (score >= 70) return "var(--color-accent-700)";
  if (score >= 45) return "var(--color-accent-600)";
  return "color-mix(in srgb, var(--color-text) 45%, transparent)";
}

function followColor(date) {
  const d = daysFromToday(date);
  if (d < 0) return PRI.High;
  if (d <= 1) return "var(--color-accent)";
  return "color-mix(in srgb, var(--color-text) 50%, transparent)";
}

function daysFromToday(date) {
  if (!date) return 9999;
  return Math.round((new Date(`${date}T00:00:00`) - new Date(`${today()}T00:00:00`)) / 86400000);
}

function isFuture(date) {
  return date && daysFromToday(date) > 0;
}

function dateSort(a, b) {
  return new Date(`${a || "9999-12-31"}T00:00:00`) - new Date(`${b || "9999-12-31"}T00:00:00`);
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function addDays(date, amount) {
  const d = new Date(`${date || today()}T00:00:00`);
  d.setDate(d.getDate() + amount);
  return d.toISOString().slice(0, 10);
}

function toDateValue(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

function splitList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "").split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function safeUrl(url) {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? escapeAttr(url) : `https://${escapeAttr(url)}`;
}

function sourceFromUrl(url) {
  if (!url) return "Web";
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("notion.")) return "Notion";
  return "Web";
}

function slug(value) {
  return String(value || "workspace").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function uid(prefix) {
  return `${prefix}_${crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function cloneCandidate(candidate) {
  return { ...candidate, files: [...(candidate.files || [])], links: [...(candidate.links || [])], skills: [...(candidate.skills || [])] };
}

function formatSize(size) {
  if (typeof size === "string") return size;
  const n = Number(size || 0);
  return n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

function downloadFirstFile(candidateId) {
  const file = candidateById(candidateId)?.files?.[0];
  if (file) downloadStoredFile(file);
}

function downloadDraftFile(fileId) {
  const file = draftCandidate?.files?.find((f) => f.id === fileId);
  if (file) downloadStoredFile(file);
}

function downloadStoredFile(file) {
  if (!file.blob && !file.dataUrl) return;
  const url = file.blob ? URL.createObjectURL(file.blob) : file.dataUrl;
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name || "resume";
  link.click();
  if (file.blob) URL.revokeObjectURL(url);
}

function downloadBlob(blob, name) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function dataUrlToBlob(dataUrl) {
  return fetch(dataUrl).then((r) => r.blob());
}

function copyTemplate(id) {
  const template = templateById(id);
  if (!template) return;
  const sample = candidatesInScope()[0] || {};
  const role = roleById(sample.roleId) || rolesInScope()[0] || {};
  copyText(mergeTemplate(template.body, sample, role));
  say("Template copied");
}

function copyFollowSection() {
  const base = filteredFollowups();
  const queue = base.filter((c) => !isFuture(c.snoozedUntil) && !c.contactedOn && c.followUp);
  const snoozed = base.filter((c) => isFuture(c.snoozedUntil));
  const contacted = base.filter((c) => c.contactedOn);
  const rows = ui.followTab === "snoozed" ? snoozed : ui.followTab === "contacted" ? contacted : queue;
  const lines = rows.map((c) => {
    const role = roleById(c.roleId);
    return `${c.name || "Unnamed candidate"} - ${role?.title || "No role"} - ${c.followUp ? formatDate(c.followUp) : "No follow-up"}`;
  });
  copyText(lines.join("\n"));
  say(`Copied ${rows.length} candidate${rows.length === 1 ? "" : "s"}`);
}

function mergeTemplate(body, candidate, role) {
  return String(body || "")
    .replaceAll("{name}", candidate.name || "")
    .replaceAll("{role}", role.title || "")
    .replaceAll("{client}", role.client || "")
    .replaceAll("{company}", candidate.company || "");
}

function copyText(text) {
  navigator.clipboard?.writeText(text).catch(() => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  });
}

function say(message) {
  ui.toast = message;
  clearTimeout(toastTimer);
  render();
  toastTimer = setTimeout(() => {
    ui.toast = "";
    render();
  }, 1800);
}
