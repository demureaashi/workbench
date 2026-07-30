import { canonicalCandidates, canonicalRoles, canonicalTemplates } from "./roleData.js?v=3";

const DB_KEY = "superteamTalentWorkbench.v1";
const BACKUP_KEY = "superteamTalentWorkbench.v1.prePlatformBackup";
const WORKBENCH_WINDOW_NAME = "superteamTalentWorkbenchCapture";

const stages = [
  "Sourced",
  "Reached Out",
  "Replied",
  "Screened",
  "Submitted",
  "Follow-up",
  "Dropped Out",
  "Closed"
];

const advanceStages = stages.filter((stage) => stage !== "Dropped Out");

const profileSignals = [
  {
    id: "soroban-testnet-mainnet",
    label: "Soroban on testnet/mainnet",
    match: (text) => text.includes("soroban") && (text.includes("testnet") || text.includes("mainnet") || text.includes("deployed"))
  },
  {
    id: "rust-smart-contracts",
    label: "Rust smart contracts",
    match: (text) => text.includes("rust") && (text.includes("smart contract") || text.includes("contracts") || text.includes("contract"))
  },
  {
    id: "stellar-ecosystem",
    label: "Stellar ecosystem",
    match: (text) => text.includes("stellar") || text.includes("soroban")
  },
  {
    id: "defi-lending",
    label: "DeFi / lending",
    match: (text) => text.includes("defi") || text.includes("lending") || text.includes("receivables")
  },
  {
    id: "security-audit",
    label: "Security / audit readiness",
    match: (text) => text.includes("security") || text.includes("audit") || text.includes("monitoring") || text.includes("testing")
  }
];

const defaultTemplates = [
  {
    id: "template-linkedin-connection",
    title: "LinkedIn connection",
    type: "Outreach",
    body: "Hi {{firstName}}, I am sourcing for {{roleTitle}} with Superteam Talent. Your work around {{signal}} stood out. Open to a quick chat this week?"
  },
  {
    id: "template-first-follow-up",
    title: "First follow-up",
    type: "Follow-up",
    body: "Hi {{firstName}}, wanted to gently follow up on {{roleTitle}}. If timing is not right, happy to reconnect later. If you are open, I can share a crisp brief."
  },
  {
    id: "template-profile-submission",
    title: "Profile submission note",
    type: "Submission",
    body: "{{name}} is currently {{title}} at {{company}}. Strong fit because {{fitReason}}. Notes from conversation: {{conversationNotes}}. Risks or questions: {{risks}}."
  },
  {
    id: "template-screening-checklist",
    title: "Screening checklist",
    type: "Call",
    body: "Motivation:\nAvailability:\nComp expectations:\nLocation / remote preference:\nRelevant projects:\nNotice period:\nConcerns:\nNext step:"
  },
  {
    id: "template-availability-check",
    title: "Availability check",
    type: "Follow-up",
    body: "Hi {{firstName}}, quick check-in on availability for {{roleTitle}}. Are you open to a short screening call this week or next?"
  },
  {
    id: "template-dropout-closeout",
    title: "Dropout closeout",
    type: "Pipeline",
    body: "Thanks for letting me know, {{firstName}}. I will close the loop for now and note that timing/context was not right. Happy to reconnect if things change."
  }
];

const seedState = {
  roles: canonicalRoles,
  candidates: canonicalCandidates,
  templates: [...defaultTemplates, ...canonicalTemplates],
  captures: [],
  savedSearches: [],
  cohorts: [],
  sequences: []
};

let state = mergeCanonical(loadState());
let activeView = "dashboard";
let editingId = null;
let pendingCapture = readCaptureFromUrl();
let selectedCandidateId = "";
let selectedTemplateId = "";
let activeSearchTab = "contacts";
let selectedCohortId = "";
let selectedSequenceId = "";
const defaultSequenceSteps = ["Connect", "First message", "Follow-up", "Review outcome"];
const defaultSearchFilters = {
  roleId: "",
  stage: "",
  location: "",
  followupStatus: ""
};
const searchFilters = { ...defaultSearchFilters };
const profileFilters = {
  roleId: "",
  stage: "",
  location: "",
  signal: "",
  skills: "",
  rankRoleId: ""
};

const viewRoot = document.querySelector("#viewRoot");
const viewTitle = document.querySelector("#viewTitle");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const searchInput = document.querySelector("#globalSearch");
const captureNotice = document.querySelector("#captureNotice");
const captureSummary = document.querySelector("#captureSummary");
const appShell = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", init);

function init() {
  window.name = WORKBENCH_WINDOW_NAME;
  registerServiceWorker();
  wireChrome();
  backupExistingState();
  saveState();
  if (pendingCapture) {
    addCapture(pendingCapture);
    history.replaceState({}, "", location.pathname);
  }
  window.addEventListener("storage", syncStateFromStorage);
  window.addEventListener("message", handleBookmarkletMessage);
  render();
}

function wireChrome() {
  document.querySelectorAll(".nav-item, .rail-button, .rail-icon[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      appShell.classList.add("drawer-collapsed");
      render();
    });
  });

  document.querySelector("#quickAddRole").addEventListener("click", () => openRoleModal());
  document.querySelector("#newCandidate").addEventListener("click", () => openCandidateModal());
  document.querySelector("#exportData").addEventListener("click", exportData);
  document.querySelector("#importData").addEventListener("change", importData);
  document.querySelector("#reviewCapture").addEventListener("click", () => {
    activeView = "capture";
    render();
  });

  searchInput.addEventListener("input", render);

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.matches("[data-close-modal]")) closeModal();
  });
}

function render() {
  document.querySelectorAll(".nav-item, .rail-icon[data-view], .rail-button[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === activeView);
  });

  const titles = {
    search: "Profiles",
    dashboard: "Dashboard",
    roles: "Roles",
    people: "Profiles",
    followups: "Follow-ups",
    archive: "Archive",
    templates: "Templates",
    capture: "Capture"
  };
  viewTitle.textContent = titles[activeView];
  renderWeekFocus();

  if (activeView === "dashboard") renderDashboard();
  if (activeView === "search") renderSearch();
  if (activeView === "roles") renderRoles();
  if (activeView === "people") renderSearch();
  if (activeView === "followups") renderFollowups();
  if (activeView === "archive") renderArchive();
  if (activeView === "templates") renderTemplates();
  if (activeView === "capture") renderCapture();
}

function renderDashboard() {
  const activeRoles = state.roles.filter((role) => role.status === "Active");
  const due = dueFollowups(state.candidates);
  const submitted = state.candidates.filter((candidate) => candidate.stage === "Submitted");
  const sourcedForActive = state.candidates.filter((candidate) => activeRoles.some((role) => role.id === candidate.roleId)).length;
  const targetTotal = activeRoles.reduce((sum, role) => sum + (Number(role.target) || 0), 0);
  const progress = targetTotal ? Math.round((sourcedForActive / targetTotal) * 100) : 0;

  viewRoot.innerHTML = `
    <section class="overview-layout dashboard-simple">
      <div class="overview-main">
        <div class="section-header dashboard-heading">
          <h2 class="section-title">Overview</h2>
          <div class="row-actions">
            <button class="chip-button" type="button">This month</button>
            <button class="chip-button" type="button">All roles</button>
          </div>
        </div>
        <div class="overview-grid">
          ${metric("Open roles", activeRoles.length, "blue")}
          ${metric("Sourced / target", `${sourcedForActive}/${targetTotal || "-"}`, "green")}
          ${metric("Submitted", submitted.length, "red")}
          ${metric("Follow-ups", due.length, "gold")}
        </div>
      </div>
    </section>

    <section class="dashboard-tables dashboard-simple">
      <div class="table-card">
        <div class="section-header">
          <div>
            <h2 class="section-title">Open roles</h2>
            <p class="section-subtitle">${progress}% of active sourcing targets covered.</p>
          </div>
          <div class="row-actions">
            <button class="icon-button add-button" data-action="add-role" type="button" aria-label="Add role">+</button>
            <button class="primary-button" data-action="view-roles" type="button">View all</button>
          </div>
        </div>
        ${renderRoleTable(activeRoles.slice(0, 6), { compact: true })}
      </div>
    </section>
  `;
  wireContentActions();
}

function renderRoles() {
  const activeRoles = state.roles.filter((role) => !["Closed", "Filled"].includes(role.status));
  viewRoot.innerHTML = `
    <section class="table-card">
      <div class="section-header">
        <div>
          <h2 class="section-title">Job positions</h2>
          <p class="section-subtitle">Set priority manually, close or archive filled searches, and keep active roles clean.</p>
        </div>
        <button class="primary-button" data-action="add-role" type="button">New role</button>
      </div>
      ${renderRoleTable(activeRoles, { controls: true })}
    </section>
  `;
  wireContentActions();
}

function renderSearch() {
  if (activeSearchTab === "cohorts") activeSearchTab = "contacts";
  const role = state.roles.find((item) => item.id === searchFilters.roleId) || null;
  const people = prepareSearchRows(filteredCandidatesForSearch(), role);
  const selected = people.find((candidate) => candidate.id === selectedCandidateId) || people[0] || null;
  if (selected?.id !== selectedCandidateId) selectedCandidateId = selected?.id || "";
  const saved = savedSearchesForRole(searchFilters.roleId);
  viewRoot.innerHTML = `
    <section class="search-workspace">
      ${renderSearchTabs()}
      ${activeSearchTab === "contacts" ? renderContactSearch(people, role, selected, saved) : ""}
      ${activeSearchTab === "sequences" ? renderSequences(people) : ""}
    </section>
  `;
  wireContentActions();
  if (activeSearchTab === "contacts") wireSearchFilters();
}

function renderSearchTabs() {
  const tabs = [
    ["contacts", "Contacts", state.candidates.length],
    ["sequences", "Sequences", state.sequences?.length || 0]
  ];
  return `
    <div class="workspace-tabs" role="tablist" aria-label="Search workspace">
      ${tabs.map(([id, label, count]) => `
        <button class="tab-button ${activeSearchTab === id ? "active" : ""}" data-action="set-search-tab" data-tab="${id}" type="button" role="tab" aria-selected="${activeSearchTab === id}">
          <span>${label}</span>
          <strong>${count}</strong>
        </button>
      `).join("")}
    </div>
  `;
}

function renderContactSearch(people, role, selected, saved) {
  return `
    <div class="profiles-workspace">
      <section class="filters-topbar">
        <div>
          <h2 class="section-title">Filters</h2>
          <p class="section-subtitle">${people.length} matches</p>
        </div>
        ${renderSearchFilters()}
      </section>

      <section class="saved-search-strip compact horizontal">
        <div>
          <strong>Saved searches</strong>
          <span>${saved.length ? `${saved.length} saved` : "Presets for repeat searches"}</span>
        </div>
        <button class="secondary-button" data-action="save-search" type="button">Save</button>
        ${saved.length ? `
          <div class="saved-search-list inline">
            ${saved.map((item) => `
              <button class="saved-search" data-action="apply-saved-search" data-id="${item.id}" type="button">
                <span>${escapeHtml(item.title)}</span>
                <small>${formatSavedSearchMeta(item)}</small>
              </button>
              <button class="icon-button compact-danger" data-action="delete-saved-search" data-id="${item.id}" type="button" aria-label="Delete ${escapeAttr(item.title)}">x</button>
            `).join("")}
          </div>
        ` : ""}
      </section>

      <section class="profiles-results">
        <div class="section-header">
          <div>
            <h2 class="section-title">${role ? `Ranked for ${escapeHtml(role.title)}` : "Contacts"}</h2>
            <p class="section-subtitle">${searchResultSubtitle(people.length, role)}</p>
          </div>
          <button class="primary-button" data-action="add-candidate" type="button">New profile</button>
        </div>
        ${role ? renderShortlistSummary(people, role) : ""}
        ${renderCandidateTable(people, { searchMode: true, ranked: true })}
      </section>
    </div>
  `;
}

function renderCohorts(people) {
  const cohorts = state.cohorts || [];
  const selected = cohorts.find((cohort) => cohort.id === selectedCohortId) || cohorts[0] || null;
  if (selected?.id !== selectedCohortId) selectedCohortId = selected?.id || "";
  const selectedPeople = selected ? candidatesByIds(selected.candidateIds || []) : [];
  return `
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Cohorts</h2>
          <p class="section-subtitle">Reusable groups for shortlists, client sends, communities, and later follow-up.</p>
        </div>
        <button class="primary-button" data-action="create-cohort" type="button">New cohort</button>
      </div>
      <div class="group-workspace">
        <aside class="group-list">
          ${cohorts.map((cohort) => renderGroupCard(cohort, "cohort")).join("") || empty("Create your first cohort, then add the selected Contact from Search.")}
        </aside>
        <section class="group-detail">
          ${selected ? `
            <div class="section-header">
              <div>
                <h2 class="section-title">${escapeHtml(selected.title)}</h2>
                <p class="section-subtitle">${groupMeta(selected, selectedPeople.length)}</p>
              </div>
              <div class="row-actions">
                <button class="secondary-button" data-action="add-selected-to-cohort" data-id="${selected.id}" type="button">Add selected</button>
                <button class="chip-button" data-action="delete-cohort" data-id="${selected.id}" type="button">Delete</button>
              </div>
            </div>
            ${selected.description ? `<p class="group-description">${escapeHtml(selected.description)}</p>` : ""}
            ${renderCohortTable(selected, selectedPeople)}
          ` : `
            <div class="empty">No cohorts yet. Create one for a client shortlist, sourcing angle, or batch you want to revisit.</div>
          `}
        </section>
      </div>
    </section>
  `;
}

function renderSequences(people) {
  const sequences = state.sequences || [];
  const selected = sequences.find((sequence) => sequence.id === selectedSequenceId) || sequences[0] || null;
  if (selected?.id !== selectedSequenceId) selectedSequenceId = selected?.id || "";
  const selectedPeople = selected ? candidatesByIds(selected.candidateIds || []) : [];
  return `
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Sequences</h2>
          <p class="section-subtitle">Group candidates into outreach batches and track their next sequence step.</p>
        </div>
        <button class="primary-button" data-action="create-sequence" type="button">New sequence</button>
      </div>
      <div class="group-workspace">
        <aside class="group-list">
          ${sequences.map((sequence) => renderGroupCard(sequence, "sequence")).join("") || empty("Create a sequence for a weekly outreach batch or role-specific follow-up list.")}
        </aside>
        <section class="group-detail">
          ${selected ? `
            <div class="section-header">
              <div>
                <h2 class="section-title">${escapeHtml(selected.title)}</h2>
                <p class="section-subtitle">${groupMeta(selected, selectedPeople.length)}</p>
              </div>
              <div class="row-actions">
                <button class="secondary-button" data-action="add-selected-to-sequence" data-id="${selected.id}" type="button">Add selected</button>
                <button class="chip-button" data-action="delete-sequence" data-id="${selected.id}" type="button">Delete</button>
              </div>
            </div>
            ${renderSequenceSteps(selected)}
            ${renderSequenceTable(selected, selectedPeople)}
          ` : `
            <div class="empty">No sequences yet. Create one for the next outreach batch you want to work through.</div>
          `}
        </section>
      </div>
    </section>
  `;
}

function renderGroupCard(group, type) {
  const role = state.roles.find((item) => item.id === group.roleId);
  const count = group.candidateIds?.length || 0;
  const selected = type === "cohort" ? selectedCohortId === group.id : selectedSequenceId === group.id;
  return `
    <button class="group-card ${selected ? "active" : ""}" data-action="${type === "cohort" ? "select-cohort" : "select-sequence"}" data-id="${group.id}" type="button">
      <span>${escapeHtml(group.title)}</span>
      <small>${count} profile${count === 1 ? "" : "s"}${role ? ` · ${escapeHtml(role.client || role.title)}` : ""}</small>
    </button>
  `;
}

function renderSequenceSteps(sequence) {
  const steps = sequence.steps?.length ? sequence.steps : defaultSequenceSteps;
  return `
    <div class="sequence-steps">
      ${steps.map((step, index) => `
        <span class="sequence-step">
          <strong>${index + 1}</strong>
          ${escapeHtml(step)}
        </span>
      `).join("")}
    </div>
  `;
}

function renderSequenceTable(sequence, people) {
  if (!people.length) return empty("No profiles in this sequence yet. Add a selected Contact when you are ready to batch outreach.");
  const steps = sequence.steps?.length ? sequence.steps : defaultSequenceSteps;
  return `
    <div class="table-shell">
      <table class="profile-table compact-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Current step</th>
            <th>Stage</th>
            <th>Role</th>
            <th>Next follow-up</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${people.map((candidate) => {
            const role = state.roles.find((item) => item.id === candidate.roleId);
            const stepIndex = sequence.candidateSteps?.[candidate.id] || 0;
            return `
              <tr>
                <td><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml([candidate.title, candidate.company].filter(Boolean).join(" at ") || "Details pending")}</span></td>
                <td><span class="pill sequence-pill">${escapeHtml(steps[Math.min(stepIndex, steps.length - 1)] || "Review")}</span></td>
                <td><span class="pill ${stageClass(candidate.stage)}">${escapeHtml(candidate.stage)}</span></td>
                <td>${escapeHtml(role?.title || "No role")}</td>
                <td>${escapeHtml(candidate.nextFollowUp ? formatDate(candidate.nextFollowUp) : "Not set")}</td>
                <td>
                  <div class="row-actions">
                    <button class="chip-button" data-action="advance-sequence-candidate" data-id="${sequence.id}" data-candidate-id="${candidate.id}" type="button">Next step</button>
                    <button class="chip-button" data-action="remove-from-sequence" data-id="${sequence.id}" data-candidate-id="${candidate.id}" type="button">Remove</button>
                  </div>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCohortTable(cohort, people) {
  if (!people.length) return empty("No profiles in this cohort yet. Go to Contacts, select a profile, then add it here.");
  return `
    <div class="table-shell">
      <table class="profile-table compact-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Stage</th>
            <th>Role</th>
            <th>Company</th>
            <th>Location</th>
            <th>Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${people.map((candidate) => {
            const role = state.roles.find((item) => item.id === candidate.roleId);
            return `
              <tr>
                <td><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml([candidate.title, candidate.company].filter(Boolean).join(" at ") || "Details pending")}</span></td>
                <td><span class="pill ${stageClass(candidate.stage)}">${escapeHtml(candidate.stage)}</span></td>
                <td>${escapeHtml(role?.title || "No role")}</td>
                <td>${escapeHtml(candidate.company || "-")}</td>
                <td>${escapeHtml(candidate.location || "-")}</td>
                <td>
                  <div class="table-links">
                    ${candidate.linkedin ? `<a href="${escapeAttr(candidate.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a>` : ""}
                    ${candidate.resume?.dataUrl ? `<a href="${candidate.resume.dataUrl}" download="${escapeAttr(candidate.resume.name)}">Resume</a>` : ""}
                    ${candidate.email ? `<a href="mailto:${escapeAttr(candidate.email)}">Email</a>` : ""}
                  </div>
                </td>
                <td>
                  <div class="row-actions">
                    <button class="chip-button" data-action="edit-candidate" data-id="${candidate.id}" type="button">Edit</button>
                    <button class="chip-button" data-action="copy-summary" data-id="${candidate.id}" type="button">Copy</button>
                    <button class="chip-button" data-action="remove-from-cohort" data-id="${cohort.id}" data-candidate-id="${candidate.id}" type="button">Remove</button>
                  </div>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderPeople() {
  const allPeople = filteredCandidates({ profileFilters: false });
  const rankRole = state.roles.find((role) => role.id === profileFilters.rankRoleId);
  const people = prepareProfileRows(filteredCandidates({ profileFilters: true }), rankRole);
  viewRoot.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">${people.length} profiles</h2>
          <p class="section-subtitle">${profileListSubtitle(people.length, rankRole)}</p>
        </div>
        <button class="primary-button" data-action="add-candidate" type="button">New profile</button>
      </div>
      ${renderProfileFilters(allPeople)}
      ${rankRole ? renderShortlistSummary(people, rankRole) : ""}
      ${renderCandidateTable(people, { ranked: Boolean(rankRole) })}
    </section>
  `;
  wireContentActions();
  wireProfileFilters();
}

function renderFollowups() {
  const followups = dueFollowups(filteredCandidates({ profileFilters: false }), true);
  viewRoot.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Follow-up queue</h2>
          <p class="section-subtitle">${followups.length ? `${followups.length} dated follow-ups, sorted oldest first` : "No profile has a next follow-up date yet"}</p>
        </div>
        <button class="secondary-button" data-action="copy-followups" type="button">Copy queue</button>
      </div>
      <div class="followup-guide">
        <strong>How it works</strong>
      <p>Open any profile, set <b>Last contact</b> and <b>Next follow-up</b>, then save. This queue lists every profile with a next follow-up date, with overdue and today's items at the top. Use <b>Copy queue</b> for a daily working list.</p>
      </div>
      ${renderCandidateTable(followups, { emptyText: "No follow-ups are scheduled yet. Edit a profile and set Next follow-up to place it here." })}
    </section>
  `;
  wireContentActions();
}

function renderTemplates() {
  const selected = state.templates.find((template) => template.id === selectedTemplateId) || state.templates[0] || null;
  selectedTemplateId = selected?.id || "";
  viewRoot.innerHTML = `
    <section class="template-layout">
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">Templates</h2>
          <button class="primary-button" data-action="add-template" type="button">New</button>
        </div>
        <div class="list">
          ${state.templates.map((template) => `
            <button class="chip-button template-list-button ${template.id === selectedTemplateId ? "active" : ""}" data-action="select-template" data-id="${template.id}" type="button">${escapeHtml(template.title)}</button>
          `).join("")}
        </div>
      </div>
      <div class="section template-detail">
        ${selected ? renderTemplateCard(selected) : empty("No templates yet.")}
      </div>
    </section>
  `;
  wireContentActions();
}

function renderCapture() {
  const bookmarklet = buildBookmarklet();
  const pending = state.captures.filter((capture) => !capture.dismissedAt);
  viewRoot.innerHTML = `
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Command capture</h2>
        <button class="secondary-button" data-action="copy-bookmarklet" type="button">Copy bookmarklet</button>
      </div>
      <div class="capture-setup-panel">
        <p>Create a browser bookmark, paste this as the URL, and click it only when you want to capture the current page. It sends the page title, URL, selected text, and any visible email/LinkedIn clues into this offline workbench.</p>
        <div class="capture-actions">
          <a class="primary-button link-button bookmarklet-link" href="${escapeAttr(bookmarklet)}">Drag to bookmarks bar</a>
          <a class="secondary-button link-button" href="./capture-setup.html" target="_blank" rel="noreferrer">Open setup page</a>
        </div>
        <div class="command-box"><code>${escapeHtml(bookmarklet)}</code></div>
      </div>
      <div class="section-header">
        <h2 class="section-title">Captured pages</h2>
      </div>
      <div class="list">
        ${pending.map(renderCaptureCard).join("") || empty("No captured pages yet. Use the bookmarklet from any profile page when you want to collect it.")}
      </div>
    </section>
  `;
  wireContentActions();
}

function renderArchive() {
  const archivedRoles = state.roles.filter((role) => ["Closed", "Filled"].includes(role.status));
  const archivedCandidates = state.candidates.filter((candidate) => ["Closed", "Dropped Out"].includes(candidate.stage));
  viewRoot.innerHTML = `
    <section class="archive-layout">
      <div class="table-card">
        <div class="section-header">
          <div>
            <h2 class="section-title">Archived roles</h2>
            <p class="section-subtitle">Filled and closed jobs stay here for reference.</p>
          </div>
          <button class="primary-button" data-action="add-role" type="button">New role</button>
        </div>
        ${renderRoleTable(archivedRoles, { archived: true })}
      </div>
      <div class="table-card">
        <div class="section-header">
          <div>
            <h2 class="section-title">Archived candidates</h2>
            <p class="section-subtitle">Closed and dropped-out profiles remain searchable and editable.</p>
          </div>
          <button class="secondary-button" data-action="view-profiles" type="button">Profiles</button>
        </div>
        ${renderCandidateTable(archivedCandidates, { compact: true, emptyText: "No archived candidates yet." })}
      </div>
    </section>
  `;
  wireContentActions();
}

function renderRoleTable(roles, options = {}) {
  if (!roles.length) return empty(options.archived ? "No archived roles yet." : "No open roles match this view.");
  return `
    <div class="table-shell role-table-shell">
      <table class="role-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Client</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Profiles</th>
            ${options.controls ? "<th>Set priority</th>" : ""}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${roles.map((role) => renderRoleRow(role, options)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderRoleRow(role, options = {}) {
  const candidates = state.candidates.filter((candidate) => candidate.roleId === role.id);
  const submitted = candidates.filter((candidate) => candidate.stage === "Submitted").length;
  return `
    <tr>
      <td><strong>${escapeHtml(role.title)}</strong><span>${escapeHtml(role.location || role.week || "No location set")}</span></td>
      <td>${escapeHtml(role.client || "-")}</td>
      <td><span class="priority-inline"><i class="priority-dot ${String(role.priority || "Medium").toLowerCase()}"></i><span>${escapeHtml(role.priority || "Medium")}</span></span></td>
      <td><span class="pill ${stageClass(role.status)}">${escapeHtml(role.status || "Active")}</span></td>
      <td>${candidates.length}${submitted ? ` / ${submitted} submitted` : ""}</td>
      ${options.controls ? `
        <td>
          <div class="priority-controls">
            ${["High", "Medium", "Low"].map((priority) => `<button class="mini-button ${role.priority === priority ? "active" : ""}" data-action="set-role-priority" data-id="${role.id}" data-priority="${priority}" type="button">${priority[0]}</button>`).join("")}
          </div>
        </td>
      ` : ""}
      <td>
        <div class="row-actions">
          ${role.jobBoard ? `<a class="chip-button link-button" href="${escapeAttr(role.jobBoard)}" target="_blank" rel="noreferrer">Board</a>` : ""}
          <button class="chip-button" data-action="edit-role" data-id="${role.id}" type="button">Edit</button>
          ${options.archived ? `<button class="chip-button" data-action="restore-role" data-id="${role.id}" type="button">Restore</button>` : `<button class="chip-button" data-action="archive-role" data-id="${role.id}" type="button">Archive</button>`}
        </div>
      </td>
    </tr>
  `;
}

function renderProfileDonut() {
  const buckets = profileStatusBuckets();
  const total = state.candidates.length || 1;
  let cursor = 0;
  const stops = buckets.map((bucket) => {
    const start = cursor;
    cursor += (bucket.count / total) * 100;
    return `${bucket.color} ${start}% ${cursor}%`;
  }).join(", ");
  return `
    <aside class="donut-panel">
      <div class="profile-donut" style="--profile-stops:${stops}">
        <div><strong>${state.candidates.length}</strong><span>Total</span></div>
      </div>
      <div class="donut-legend">
        <h2 class="section-title">Profiles</h2>
        ${buckets.map((bucket) => `
          <span><i style="--legend-color:${bucket.color}"></i>${bucket.label}<b>${bucket.count}</b></span>
        `).join("")}
      </div>
    </aside>
  `;
}

function renderRecentTable(people) {
  if (!people.length) return empty("No recent profiles yet.");
  return `
    <div class="table-shell recents-table-shell">
      <table class="recents-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${people.map((candidate) => {
            const role = state.roles.find((item) => item.id === candidate.roleId);
            return `
              <tr>
                <td><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml(candidate.company || candidate.location || "No company")}</span></td>
                <td>${escapeHtml(role?.title || "No role")}</td>
                <td><span class="status-label ${stageClass(candidate.stage)}">${escapeHtml(candidate.stage || "Sourced")}</span></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderRoleCard(role) {
  const candidates = state.candidates.filter((candidate) => candidate.roleId === role.id);
  const submitted = candidates.filter((candidate) => candidate.stage === "Submitted").length;
  const reached = candidates.filter((candidate) => ["Reached Out", "Replied", "Screened", "Submitted", "Follow-up"].includes(candidate.stage)).length;
  const progress = Math.min(100, Math.round((candidates.length / Math.max(Number(role.target) || 1, 1)) * 100));
  return `
    <article class="row-card">
      <div class="row-main">
        <div>
          <h3 class="row-title">${escapeHtml(role.title)}</h3>
          <p class="subtle">${escapeHtml(role.client || "No client")} · ${escapeHtml(role.week || "No week")} · ${candidates.length}/${role.target || 0} sourced</p>
        </div>
        <div class="pill-row">
          <span class="pill ${role.priority.toLowerCase()}">${escapeHtml(role.priority)}</span>
          <span class="pill">${escapeHtml(role.status)}</span>
        </div>
      </div>
      <div class="progress-bar" aria-label="${progress}% sourced"><span style="--value:${progress}%"></span></div>
      <div class="pill-row">
        <span class="pill">Reached ${reached}</span>
        <span class="pill submitted">Submitted ${submitted}</span>
        <span class="pill">Target ${role.target || 0}</span>
        ${role.salary ? `<span class="pill">${escapeHtml(role.salary)}</span>` : ""}
        ${role.location ? `<span class="pill">${escapeHtml(role.location)}</span>` : ""}
      </div>
      ${role.requirements ? `<p class="subtle">${escapeHtml(role.requirements)}</p>` : ""}
      ${role.notes ? `<p class="subtle">${escapeHtml(role.notes.slice(0, 360))}${role.notes.length > 360 ? "..." : ""}</p>` : ""}
      <div class="pill-row">
        ${role.jobBoard ? `<a class="chip-button link-button" href="${escapeAttr(role.jobBoard)}" target="_blank" rel="noreferrer">Job board</a>` : ""}
        <button class="chip-button" data-action="edit-role" data-id="${role.id}" type="button">Edit</button>
        <button class="chip-button" data-action="add-candidate-for-role" data-id="${role.id}" type="button">Add profile</button>
      </div>
    </article>
  `;
}

function renderCandidateCard(candidate) {
  const role = state.roles.find((item) => item.id === candidate.roleId);
  const next = candidate.nextFollowUp ? formatDate(candidate.nextFollowUp) : "No follow-up";
  const lateClass = candidate.nextFollowUp && new Date(candidate.nextFollowUp) <= startOfToday() ? "late" : "";
  return `
    <article class="candidate-card">
      <header>
        <div>
          <h3 class="candidate-name">${escapeHtml(candidate.name)}</h3>
          <p class="subtle">${escapeHtml([candidate.title, candidate.company].filter(Boolean).join(" at ") || "Profile details pending")}</p>
        </div>
        <span class="pill ${stageClass(candidate.stage)}">${escapeHtml(candidate.stage)}</span>
      </header>
      <div class="pill-row">
        <span class="pill">${escapeHtml(role?.title || "No role")}</span>
        ${candidate.location ? `<span class="pill">${escapeHtml(candidate.location)}</span>` : ""}
        <span class="pill ${lateClass}">Next: ${escapeHtml(next)}</span>
      </div>
      ${candidate.skills ? `<p class="subtle">${escapeHtml(candidate.skills)}</p>` : ""}
      ${candidate.dropoutNotes ? `<p class="dropout-note"><strong>Dropped out:</strong> ${escapeHtml(candidate.dropoutNotes)}</p>` : ""}
      ${candidate.remarks ? `<p>${escapeHtml(candidate.remarks)}</p>` : ""}
      <div class="candidate-links">
        ${candidate.linkedin ? `<a href="${escapeAttr(candidate.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a>` : ""}
        ${candidate.sourceUrl ? `<a href="${escapeAttr(candidate.sourceUrl)}" target="_blank" rel="noreferrer">Source</a>` : ""}
        ${candidate.resume?.dataUrl ? `<a href="${candidate.resume.dataUrl}" download="${escapeAttr(candidate.resume.name)}">Resume</a>` : ""}
        ${candidate.email ? `<a href="mailto:${escapeAttr(candidate.email)}">Email</a>` : ""}
      </div>
      <div class="pill-row">
        <button class="chip-button" data-action="edit-candidate" data-id="${candidate.id}" type="button">Edit</button>
        <button class="chip-button" data-action="advance-candidate" data-id="${candidate.id}" type="button">Advance</button>
        <button class="chip-button" data-action="copy-summary" data-id="${candidate.id}" type="button">Copy summary</button>
      </div>
    </article>
  `;
}

function renderProfileFilters(people) {
  const locationCount = uniqueLocations(people).length;
  return `
    <div class="filter-panel">
      <label>Role
        <select data-profile-filter="roleId">
          <option value="">All roles</option>
          ${state.roles.map((role) => `<option value="${role.id}" ${profileFilters.roleId === role.id ? "selected" : ""}>${escapeHtml(role.title)}</option>`).join("")}
        </select>
      </label>
      <label>Stage
        <select data-profile-filter="stage">
          <option value="">All stages</option>
          ${stages.map((stage) => `<option value="${stage}" ${profileFilters.stage === stage ? "selected" : ""}>${stage}</option>`).join("")}
        </select>
      </label>
      <label>Location
        <input data-profile-filter="location" value="${escapeAttr(profileFilters.location)}" placeholder="${locationCount} known locations">
      </label>
      <label>Signal
        <select data-profile-filter="signal">
          <option value="">Any signal</option>
          ${profileSignals.map((signal) => `<option value="${signal.id}" ${profileFilters.signal === signal.id ? "selected" : ""}>${escapeHtml(signal.label)}</option>`).join("")}
        </select>
      </label>
      <label>Skills / notes
        <input data-profile-filter="skills" value="${escapeAttr(profileFilters.skills)}" placeholder="Soroban, Rust, Stellar, testnet/mainnet">
      </label>
      <label>Rank against JD
        <select data-profile-filter="rankRoleId">
          <option value="">Off</option>
          ${state.roles.map((role) => `<option value="${role.id}" ${profileFilters.rankRoleId === role.id ? "selected" : ""}>${escapeHtml(role.title)}</option>`).join("")}
        </select>
      </label>
      <button class="secondary-button" data-action="clear-profile-filters" type="button">Clear</button>
    </div>
  `;
}

function renderSearchFilters() {
  return `
    <div class="platform-filter-panel">
      <label>Role
        <select data-search-filter="roleId">
          <option value="">All roles</option>
          ${state.roles.map((role) => `<option value="${role.id}" ${searchFilters.roleId === role.id ? "selected" : ""}>${escapeHtml(role.title)}</option>`).join("")}
        </select>
      </label>
      <label>Stage
        <select data-search-filter="stage">
          <option value="">All stages</option>
          ${stages.map((stage) => `<option value="${stage}" ${searchFilters.stage === stage ? "selected" : ""}>${stage}</option>`).join("")}
        </select>
      </label>
      <label>Location
        <input data-search-filter="location" value="${escapeAttr(searchFilters.location)}" placeholder="NYC, London, Dubai">
      </label>
      <label>Follow-up
        <select data-search-filter="followupStatus">
          <option value="">Active profiles</option>
          <option value="due" ${searchFilters.followupStatus === "due" ? "selected" : ""}>Due now</option>
          <option value="scheduled" ${searchFilters.followupStatus === "scheduled" ? "selected" : ""}>Scheduled</option>
          <option value="none" ${searchFilters.followupStatus === "none" ? "selected" : ""}>No follow-up</option>
          <option value="archived" ${searchFilters.followupStatus === "archived" ? "selected" : ""}>Archived</option>
        </select>
      </label>
      <button class="secondary-button" data-action="clear-search-filters" type="button">Clear</button>
    </div>
  `;
}

function renderCandidateTable(people, options = {}) {
  if (!people.length) return empty(options.emptyText || "No profiles match this view. Adjust the search or filters.");
  const includeMatch = options.ranked || options.searchMode;
  return `
    <div class="candidate-list ${includeMatch ? "" : "no-score"}">
      <div class="candidate-list-head">
        ${includeMatch ? "<span>Score</span>" : ""}
        <span>Candidate</span>
        <span>Role</span>
        <span>Stage</span>
        <span>Location</span>
        <span>Follow-up</span>
        <span>Actions</span>
      </div>
      ${people.map((candidate, index) => renderCandidateRow(candidate, { ...options, index })).join("")}
    </div>
  `;
}

function renderCandidateRow(candidate, options = {}) {
  const role = state.roles.find((item) => item.id === candidate.roleId);
  const lateClass = candidate.nextFollowUp && new Date(candidate.nextFollowUp) <= startOfToday() ? "late" : "";
  const current = [candidate.title, candidate.company].filter(Boolean).join(" at ") || "Details pending";
  const match = candidate.match || null;
  const includeMatch = options.ranked || options.searchMode;
  return `
    <article class="candidate-list-row ${selectedCandidateId === candidate.id ? "selected-row" : ""}">
      ${includeMatch ? `
        <div class="match-cell">
          <strong>${match?.score || 0}%</strong>
          <span>#${options.index + 1}</span>
        </div>
      ` : ""}
      <div class="candidate-cell">
        <strong>${escapeHtml(candidate.name)}</strong>
        <span>${escapeHtml(current)}</span>
      </div>
      <div class="role-cell">${escapeHtml(role?.title || "No role")}</div>
      <div><span class="pill ${stageClass(candidate.stage)}">${escapeHtml(candidate.stage)}</span></div>
      <div class="location-cell">${escapeHtml(candidate.location || "-")}</div>
      <div><span class="pill ${lateClass}">${escapeHtml(candidate.nextFollowUp ? formatDate(candidate.nextFollowUp) : "Not set")}</span></div>
      <div class="row-actions">
        <button class="chip-button" data-action="edit-candidate" data-id="${candidate.id}" type="button">Edit</button>
        ${["Closed", "Dropped Out"].includes(candidate.stage) ? "" : `
          <button class="chip-button positive" data-action="shortlist-candidate" data-id="${candidate.id}" type="button">Shortlist</button>
          <button class="chip-button" data-action="sequence-candidate" data-id="${candidate.id}" type="button">Seq</button>
          <button class="chip-button danger" data-action="reject-candidate" data-id="${candidate.id}" type="button">Reject</button>
          <button class="chip-button" data-action="archive-candidate" data-id="${candidate.id}" type="button">Archive</button>
        `}
        ${candidate.linkedin ? `<a class="chip-button link-button" href="${escapeAttr(candidate.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a>` : ""}
        ${candidate.resume?.dataUrl ? `<a class="chip-button link-button" href="${candidate.resume.dataUrl}" download="${escapeAttr(candidate.resume.name)}">Resume</a>` : ""}
      </div>
    </article>
  `;
}

function renderEvidence(candidate) {
  const chips = candidate.evidence?.length ? candidate.evidence : candidate.match?.reasons || [];
  return `
    <div class="evidence-stack">
      ${chips.slice(0, 5).map((item) => `<span>${escapeHtml(item)}</span>`).join("") || "<span>Review profile details</span>"}
    </div>
  `;
}

function renderCandidatePreview(candidate, rankRole) {
  if (!candidate) {
    return `
      <aside class="preview-drawer">
        <div class="empty">Select a profile to review details, evidence, notes, links, and next steps.</div>
      </aside>
    `;
  }
  const role = state.roles.find((item) => item.id === candidate.roleId);
  const match = candidate.match || (rankRole ? scoreCandidateForRole(candidate, rankRole) : scoreCandidateForSearch(candidate, searchFilters));
  return `
    <aside class="preview-drawer">
      <div class="preview-header">
        <div>
          <p class="eyebrow">Candidate preview</p>
          <h2>${escapeHtml(candidate.name)}</h2>
          <span>${escapeHtml([candidate.title, candidate.company].filter(Boolean).join(" at ") || "Details pending")}</span>
        </div>
        <strong>${match.score || 0}%</strong>
      </div>
      <div class="pill-row">
        <span class="pill ${stageClass(candidate.stage)}">${escapeHtml(candidate.stage || "Sourced")}</span>
        <span class="pill">${escapeHtml(role?.title || "No role")}</span>
        ${candidate.location ? `<span class="pill">${escapeHtml(candidate.location)}</span>` : ""}
      </div>
      <div class="preview-section">
        <strong>Why this surfaced</strong>
        <div class="evidence-stack">
          ${(candidate.evidence?.length ? candidate.evidence : match.reasons || []).slice(0, 8).map((item) => `<span>${escapeHtml(item)}</span>`).join("") || "<span>Matched current filters</span>"}
        </div>
      </div>
      <div class="preview-section">
        <strong>Notes</strong>
        <p>${escapeHtml(candidate.notes || candidate.remarks || "No notes yet.")}</p>
        ${candidate.dropoutNotes ? `<p><b>Dropped out:</b> ${escapeHtml(candidate.dropoutNotes)}</p>` : ""}
      </div>
      <div class="preview-section">
        <strong>Follow-up</strong>
        <p>${escapeHtml(candidate.nextFollowUp ? `Next follow-up ${formatDate(candidate.nextFollowUp)}` : "No follow-up scheduled")}</p>
      </div>
      <div class="candidate-links">
        ${candidate.linkedin ? `<a href="${escapeAttr(candidate.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a>` : ""}
        ${candidate.sourceUrl ? `<a href="${escapeAttr(candidate.sourceUrl)}" target="_blank" rel="noreferrer">Source</a>` : ""}
        ${candidate.resume?.dataUrl ? `<a href="${candidate.resume.dataUrl}" download="${escapeAttr(candidate.resume.name)}">Resume</a>` : ""}
        ${candidate.email ? `<a href="mailto:${escapeAttr(candidate.email)}">Email</a>` : ""}
      </div>
      <div class="preview-actions">
        <button class="primary-button" data-action="edit-candidate" data-id="${candidate.id}" type="button">Edit profile</button>
        <button class="secondary-button" data-action="add-preview-to-sequence" data-id="${candidate.id}" type="button">Add to sequence</button>
        <button class="secondary-button" data-action="copy-summary" data-id="${candidate.id}" type="button">Copy summary</button>
        <button class="secondary-button" data-action="advance-candidate" data-id="${candidate.id}" type="button">Advance</button>
      </div>
    </aside>
  `;
}

function renderKanban(people, limit = Infinity) {
  return `
    <div class="kanban">
      ${stages.map((stage) => {
        const items = people.filter((candidate) => candidate.stage === stage);
        const visibleItems = items.slice(0, limit);
        return `
          <div class="kanban-column">
            <h3>${stage} · ${items.length}</h3>
            ${visibleItems.map(renderCandidateCard).join("") || ""}
            ${items.length > visibleItems.length ? `<div class="empty">${items.length - visibleItems.length} more in Profiles</div>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderTemplateCard(template) {
  return `
    <article class="template-card" id="template-${template.id}">
      <div class="row-main">
        <div>
          <h3 class="row-title">${escapeHtml(template.title)}</h3>
          <p class="subtle">${escapeHtml(template.type)}</p>
        </div>
        <div class="row-actions">
          <button class="chip-button" data-action="edit-template" data-id="${template.id}" type="button">Edit</button>
          <button class="chip-button" data-action="copy-template" data-id="${template.id}" type="button">Copy</button>
        </div>
      </div>
      <pre>${escapeHtml(template.body)}</pre>
    </article>
  `;
}

function renderCaptureCard(capture) {
  return `
    <article class="row-card capture-card">
      <div class="row-main">
        <div>
          <h3 class="row-title">${escapeHtml(capture.title || "Untitled page")}</h3>
          <p class="subtle">${escapeHtml(capture.url || "No URL")} · ${formatDateTime(capture.createdAt)}</p>
        </div>
        <div class="row-actions">
          <button class="primary-button" data-action="profile-from-capture" data-id="${capture.id}" type="button">Create profile</button>
        </div>
      </div>
      ${capture.selection ? `<p>${escapeHtml(capture.selection.slice(0, 500))}</p>` : ""}
      <div class="pill-row">
        ${capture.email ? `<span class="pill">${escapeHtml(capture.email)}</span>` : ""}
        ${capture.linkedin ? `<span class="pill">LinkedIn found</span>` : ""}
      </div>
    </article>
  `;
}

function metric(label, value, tone = "") {
  return `<article class="metric ${tone}"><strong>${value}</strong><span>${label}</span></article>`;
}

function empty(text) {
  return `<div class="empty">${escapeHtml(text)}</div>`;
}

function renderShortlistSummary(people, role) {
  const top = people.slice(0, 5);
  return `
    <div class="shortlist-summary">
      <div>
        <strong>Shortlist ranking</strong>
        <span>Scored against ${escapeHtml(role.title)} using JD requirements, sourcing notes, location preference, title, company, and profile notes.</span>
      </div>
      <ol>
        ${top.map((candidate) => `<li><b>${escapeHtml(candidate.name)}</b> <span>${candidate.match?.score || 0}% - ${escapeHtml(candidate.match?.reasons?.slice(0, 2).join(", ") || "manual review")}</span></li>`).join("")}
      </ol>
    </div>
  `;
}

function profileListSubtitle(count, rankRole) {
  const base = count === state.candidates.length ? "All tracked profiles" : `${count} of ${state.candidates.length} match your filters`;
  return rankRole ? `${base}; ranked against ${rankRole.title}` : base;
}

function searchResultSubtitle(count, role) {
  const source = role ? `ranked against ${role.title}` : "scored against current filters";
  const active = searchFilters.followupStatus === "archived" ? "Archived pipeline only" : "Active pipeline only";
  return `${count} profiles ${source}. ${active}.`;
}

function renderSearchSummary(people, total) {
  const query = searchInput.value.trim();
  if (!query) return "";
  return `<div class="search-result-banner"><strong>${people.length}</strong> of ${total} profiles match "${escapeHtml(query)}". Use Profiles for role, stage, location, and skill filters.</div>`;
}

function profileStatusBuckets() {
  const unscheduled = state.candidates.filter((candidate) => !candidate.nextFollowUp && !["Closed", "Dropped Out"].includes(candidate.stage)).length;
  const scheduled = state.candidates.filter((candidate) => candidate.nextFollowUp && !["Closed", "Dropped Out"].includes(candidate.stage)).length;
  const review = state.candidates.filter((candidate) => ["Replied", "Screened", "Submitted", "Follow-up"].includes(candidate.stage)).length;
  const archived = state.candidates.filter((candidate) => ["Closed", "Dropped Out"].includes(candidate.stage)).length;
  return [
    { label: "Unscheduled", count: unscheduled, color: "oklch(62% 0.18 250)" },
    { label: "Scheduled", count: scheduled, color: "oklch(61% 0.17 275)" },
    { label: "In review", count: review, color: "oklch(38% 0.14 260)" },
    { label: "Archived", count: archived, color: "oklch(80% 0.08 235)" }
  ];
}

function recentCandidates(limit = 5) {
  return [...state.candidates]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, limit);
}

function wireContentActions() {
  viewRoot.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", handleAction);
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  const candidateId = event.currentTarget.dataset.candidateId;
  const priority = event.currentTarget.dataset.priority;
  if (action === "add-role") openRoleModal();
  if (action === "edit-role") openRoleModal(id);
  if (action === "view-roles") {
    activeView = "roles";
    render();
  }
  if (action === "view-profiles") {
    activeView = "search";
    render();
  }
  if (action === "view-archive") {
    activeView = "archive";
    render();
  }
  if (action === "set-role-priority") setRolePriority(id, priority);
  if (action === "archive-role") archiveRole(id);
  if (action === "restore-role") restoreRole(id);
  if (action === "add-candidate") openCandidateModal();
  if (action === "add-candidate-for-role") openCandidateModal(null, { roleId: id });
  if (action === "edit-candidate") openCandidateModal(id);
  if (action === "archive-candidate") archiveCandidate(id);
  if (action === "shortlist-candidate") shortlistCandidate(id);
  if (action === "reject-candidate") rejectCandidate(id);
  if (action === "sequence-candidate") addCandidateToSequence(id);
  if (action === "set-search-tab") {
    activeSearchTab = event.currentTarget.dataset.tab || "contacts";
    render();
  }
  if (action === "preview-candidate") {
    selectedCandidateId = id;
    openCandidateModal(id);
  }
  if (action === "create-cohort") createCohort();
  if (action === "create-sequence") createSequence();
  if (action === "select-cohort") {
    selectedCohortId = id;
    render();
  }
  if (action === "select-sequence") {
    selectedSequenceId = id;
    render();
  }
  if (action === "add-selected-to-cohort") addCandidateToCohort(selectedCandidateId, id);
  if (action === "add-selected-to-sequence") addCandidateToSequence(selectedCandidateId, id);
  if (action === "add-preview-to-cohort") addCandidateToCohort(id);
  if (action === "add-preview-to-sequence") addCandidateToSequence(id);
  if (action === "delete-cohort") deleteCohort(id);
  if (action === "delete-sequence") deleteSequence(id);
  if (action === "remove-from-cohort") removeFromCohort(id, candidateId);
  if (action === "remove-from-sequence") removeFromSequence(id, candidateId);
  if (action === "advance-sequence-candidate") advanceSequenceCandidate(id, candidateId);
  if (action === "advance-candidate") advanceCandidate(id);
  if (action === "copy-summary") copyCandidateSummary(id);
  if (action === "copy-followups") copyFollowupQueue();
  if (action === "copy-template") copyTemplate(id);
  if (action === "copy-bookmarklet") copyText(buildBookmarklet());
  if (action === "profile-from-capture") profileFromCapture(id);
  if (action === "add-template") openTemplateModal();
  if (action === "edit-template") openTemplateModal(id);
  if (action === "save-search") saveSearchPreset();
  if (action === "apply-saved-search") applySavedSearch(id);
  if (action === "delete-saved-search") deleteSavedSearch(id);
  if (action === "clear-search-filters") clearSearchFilters();
  if (action === "dismiss-capture") dismissCapture(id);
  if (action === "clear-profile-filters") clearProfileFilters();
  if (action === "select-template") {
    selectedTemplateId = id;
    render();
  }
}

function wireSearchFilters() {
  viewRoot.querySelectorAll("[data-search-filter]").forEach((input) => {
    const eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      const filterName = input.dataset.searchFilter;
      const cursor = typeof input.selectionStart === "number" ? input.selectionStart : null;
      searchFilters[filterName] = input.value;
      if (filterName === "roleId" && !searchFilters.roleId) selectedCandidateId = "";
      render();
      const nextInput = viewRoot.querySelector(`[data-search-filter="${filterName}"]`);
      nextInput?.focus();
      if (cursor !== null && typeof nextInput?.setSelectionRange === "function") {
        nextInput.setSelectionRange(cursor, cursor);
      }
    });
  });
}

function wireCaptureInbox() {
  viewRoot.querySelectorAll("[data-capture-field]").forEach((input) => {
    const eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      const id = input.dataset.id;
      const field = input.dataset.captureField;
      state.captures = state.captures.map((capture) => capture.id === id ? { ...capture, [field]: input.value, updatedAt: new Date().toISOString() } : capture);
      saveState();
    });
  });
}

function wireProfileFilters() {
  viewRoot.querySelectorAll("[data-profile-filter]").forEach((input) => {
    const eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      const filterName = input.dataset.profileFilter;
      const cursor = typeof input.selectionStart === "number" ? input.selectionStart : null;
      profileFilters[input.dataset.profileFilter] = input.value;
      render();
      const nextInput = viewRoot.querySelector(`[data-profile-filter="${filterName}"]`);
      nextInput?.focus();
      if (cursor !== null && typeof nextInput?.setSelectionRange === "function") {
        nextInput.setSelectionRange(cursor, cursor);
      }
    });
  });
}

function clearProfileFilters() {
  Object.keys(profileFilters).forEach((key) => {
    profileFilters[key] = "";
  });
  render();
}

function clearSearchFilters() {
  Object.assign(searchFilters, defaultSearchFilters);
  selectedCandidateId = "";
  render();
}

function saveSearchPreset() {
  const role = state.roles.find((item) => item.id === searchFilters.roleId);
  const fallback = role ? `${role.client || "Role"} search` : "Workspace search";
  const title = prompt("Name this saved search", fallback);
  if (!title) return;
  state.savedSearches.unshift({
    id: crypto.randomUUID(),
    title: title.trim(),
    roleId: searchFilters.roleId || "",
    filters: { ...searchFilters },
    createdAt: new Date().toISOString()
  });
  saveState();
  render();
}

function applySavedSearch(id) {
  const preset = state.savedSearches.find((item) => item.id === id);
  if (!preset) return;
  Object.assign(searchFilters, defaultSearchFilters, preset.filters || {});
  selectedCandidateId = "";
  render();
}

function deleteSavedSearch(id) {
  state.savedSearches = state.savedSearches.filter((item) => item.id !== id);
  saveState();
  render();
}

function setRolePriority(id, priority) {
  if (!priority) return;
  state.roles = state.roles.map((role) => role.id === id ? { ...role, priority, updatedAt: new Date().toISOString() } : role);
  saveState();
  render();
}

function archiveRole(id) {
  const role = state.roles.find((item) => item.id === id);
  if (!role) return;
  const status = confirm(`Mark "${role.title}" as Filled? Choose Cancel to close it instead.`) ? "Filled" : "Closed";
  state.roles = state.roles.map((item) => item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item);
  saveState();
  render();
}

function restoreRole(id) {
  state.roles = state.roles.map((role) => role.id === id ? { ...role, status: "Active", updatedAt: new Date().toISOString() } : role);
  saveState();
  render();
}

function archiveCandidate(id) {
  state.candidates = state.candidates.map((candidate) => candidate.id === id ? { ...candidate, stage: "Closed", updatedAt: new Date().toISOString() } : candidate);
  saveState();
  render();
}

function shortlistCandidate(id) {
  state.candidates = state.candidates.map((candidate) => candidate.id === id ? { ...candidate, stage: "Screened", updatedAt: new Date().toISOString() } : candidate);
  saveState();
  render();
}

function rejectCandidate(id) {
  const candidate = state.candidates.find((item) => item.id === id);
  if (!candidate) return;
  const note = prompt("Reason for rejecting or dropping this profile", candidate.dropoutNotes || "Not a fit for this role");
  if (note === null) return;
  state.candidates = state.candidates.map((item) => item.id === id ? {
    ...item,
    stage: "Dropped Out",
    dropoutNotes: note.trim(),
    updatedAt: new Date().toISOString()
  } : item);
  saveState();
  render();
}

function savedSearchesForRole(roleId) {
  return (state.savedSearches || []).filter((item) => (item.roleId || "") === (roleId || "")).slice(0, 8);
}

function formatSavedSearchMeta(item) {
  const filters = Object.entries(item.filters || {}).filter(([, value]) => value && value !== "active").length;
  return `${filters || 1} filter${filters === 1 ? "" : "s"}`;
}

function createCohort() {
  const role = state.roles.find((item) => item.id === searchFilters.roleId);
  const title = prompt("Cohort name", role ? `${role.client || role.title} shortlist` : "New shortlist");
  if (!title?.trim()) return;
  const description = prompt("Notes for this cohort", "Profiles grouped for later review") || "";
  const cohort = {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
    roleId: searchFilters.roleId || "",
    candidateIds: [],
    createdAt: new Date().toISOString()
  };
  state.cohorts.unshift(cohort);
  selectedCohortId = cohort.id;
  activeSearchTab = "cohorts";
  saveState();
  render();
}

function createSequence() {
  const role = state.roles.find((item) => item.id === searchFilters.roleId);
  const title = prompt("Sequence name", role ? `${role.client || role.title} outreach` : "New outreach sequence");
  if (!title?.trim()) return;
  const stepsText = prompt("Steps, separated by commas", defaultSequenceSteps.join(", "));
  const steps = (stepsText || defaultSequenceSteps.join(",")).split(",").map((step) => step.trim()).filter(Boolean);
  const sequence = {
    id: crypto.randomUUID(),
    title: title.trim(),
    roleId: searchFilters.roleId || "",
    candidateIds: [],
    candidateSteps: {},
    steps: steps.length ? steps : defaultSequenceSteps,
    createdAt: new Date().toISOString()
  };
  state.sequences.unshift(sequence);
  selectedSequenceId = sequence.id;
  activeSearchTab = "sequences";
  saveState();
  render();
}

function addCandidateToCohort(candidateId, cohortId = "") {
  const candidate = state.candidates.find((item) => item.id === candidateId);
  if (!candidate) {
    alert("Select a candidate in Contacts first, then add them to a cohort.");
    return;
  }
  let cohort = cohortId ? state.cohorts.find((item) => item.id === cohortId) : null;
  if (!cohort) cohort = findOrCreateGroupByName("cohort", candidate);
  if (!cohort) return;
  state.cohorts = state.cohorts.map((item) => {
    if (item.id !== cohort.id) return item;
    return {
      ...item,
      candidateIds: [...new Set([...(item.candidateIds || []), candidate.id])],
      updatedAt: new Date().toISOString()
    };
  });
  selectedCohortId = cohort.id;
  activeSearchTab = "cohorts";
  saveState();
  render();
}

function addCandidateToSequence(candidateId, sequenceId = "") {
  const candidate = state.candidates.find((item) => item.id === candidateId);
  if (!candidate) {
    alert("Select a candidate in Contacts first, then add them to a sequence.");
    return;
  }
  let sequence = sequenceId ? state.sequences.find((item) => item.id === sequenceId) : null;
  if (!sequence) sequence = findOrCreateGroupByName("sequence", candidate);
  if (!sequence) return;
  state.sequences = state.sequences.map((item) => {
    if (item.id !== sequence.id) return item;
    return {
      ...item,
      candidateIds: [...new Set([...(item.candidateIds || []), candidate.id])],
      candidateSteps: { ...(item.candidateSteps || {}), [candidate.id]: item.candidateSteps?.[candidate.id] || 0 },
      updatedAt: new Date().toISOString()
    };
  });
  selectedSequenceId = sequence.id;
  activeSearchTab = "sequences";
  saveState();
  render();
}

function findOrCreateGroupByName(type, candidate) {
  const list = type === "cohort" ? state.cohorts : state.sequences;
  const role = state.roles.find((item) => item.id === (searchFilters.roleId || candidate.roleId));
  const fallback = role ? `${role.client || role.title} ${type === "cohort" ? "shortlist" : "outreach"}` : type === "cohort" ? "Shortlist" : "Outreach sequence";
  const title = prompt(`Add ${candidate.name} to ${type}`, fallback);
  if (!title?.trim()) return null;
  const existing = list.find((item) => item.title.toLowerCase() === title.trim().toLowerCase());
  if (existing) return existing;
  const group = {
    id: crypto.randomUUID(),
    title: title.trim(),
    roleId: searchFilters.roleId || candidate.roleId || "",
    candidateIds: [],
    createdAt: new Date().toISOString()
  };
  if (type === "cohort") {
    group.description = "Profiles grouped for later review";
    state.cohorts.unshift(group);
  } else {
    group.steps = defaultSequenceSteps;
    group.candidateSteps = {};
    state.sequences.unshift(group);
  }
  return group;
}

function deleteCohort(id) {
  const cohort = state.cohorts.find((item) => item.id === id);
  if (!cohort || !confirm(`Delete cohort "${cohort.title}"? Candidate profiles will stay intact.`)) return;
  state.cohorts = state.cohorts.filter((item) => item.id !== id);
  selectedCohortId = state.cohorts[0]?.id || "";
  saveState();
  render();
}

function deleteSequence(id) {
  const sequence = state.sequences.find((item) => item.id === id);
  if (!sequence || !confirm(`Delete sequence "${sequence.title}"? Candidate profiles will stay intact.`)) return;
  state.sequences = state.sequences.filter((item) => item.id !== id);
  selectedSequenceId = state.sequences[0]?.id || "";
  saveState();
  render();
}

function removeFromCohort(cohortId, candidateId) {
  state.cohorts = state.cohorts.map((cohort) => cohort.id === cohortId
    ? { ...cohort, candidateIds: (cohort.candidateIds || []).filter((id) => id !== candidateId), updatedAt: new Date().toISOString() }
    : cohort);
  saveState();
  render();
}

function removeFromSequence(sequenceId, candidateId) {
  state.sequences = state.sequences.map((sequence) => {
    if (sequence.id !== sequenceId) return sequence;
    const candidateSteps = { ...(sequence.candidateSteps || {}) };
    delete candidateSteps[candidateId];
    return {
      ...sequence,
      candidateIds: (sequence.candidateIds || []).filter((id) => id !== candidateId),
      candidateSteps,
      updatedAt: new Date().toISOString()
    };
  });
  saveState();
  render();
}

function advanceSequenceCandidate(sequenceId, candidateId) {
  state.sequences = state.sequences.map((sequence) => {
    if (sequence.id !== sequenceId) return sequence;
    const steps = sequence.steps?.length ? sequence.steps : defaultSequenceSteps;
    const current = sequence.candidateSteps?.[candidateId] || 0;
    return {
      ...sequence,
      candidateSteps: { ...(sequence.candidateSteps || {}), [candidateId]: Math.min(current + 1, steps.length - 1) },
      updatedAt: new Date().toISOString()
    };
  });
  saveState();
  render();
}

function candidatesByIds(ids) {
  const wanted = new Set(ids || []);
  return state.candidates.filter((candidate) => wanted.has(candidate.id));
}

function groupMeta(group, count) {
  const role = state.roles.find((item) => item.id === group.roleId);
  const bits = [`${count} profile${count === 1 ? "" : "s"}`];
  if (role) bits.push(role.title);
  if (group.createdAt) bits.push(`created ${formatDate(group.createdAt.slice(0, 10))}`);
  return bits.join(" · ");
}

function openRoleModal(id) {
  editingId = id || null;
  const role = state.roles.find((item) => item.id === id) || {};
  const form = document.querySelector("#roleFormTemplate").content.cloneNode(true);
  modalTitle.textContent = id ? "Edit role" : "New role";
  modalBody.replaceChildren(form);
  const formEl = modalBody.querySelector("form");
  fillForm(formEl, {
    title: role.title || "",
    client: role.client || "Superteam Talent",
    week: role.week || currentWeek(),
    target: role.target || 12,
    priority: role.priority || "Medium",
    status: role.status || "Active",
    requirements: role.requirements || "",
    notes: role.notes || ""
  });
  formEl.addEventListener("submit", saveRole);
  openModal();
}

function openCandidateModal(id, defaults = {}) {
  editingId = id || null;
  const candidate = state.candidates.find((item) => item.id === id) || {};
  const form = document.querySelector("#candidateFormTemplate").content.cloneNode(true);
  modalTitle.textContent = id ? "Edit profile" : "New profile";
  modalBody.replaceChildren(form);

  const roleSelect = modalBody.querySelector("select[name='roleId']");
  roleSelect.innerHTML = `<option value="">No role</option>${state.roles.map((role) => `<option value="${role.id}">${escapeHtml(role.title)}</option>`).join("")}`;
  const stageSelect = modalBody.querySelector("select[name='stage']");
  stageSelect.innerHTML = stages.map((stage) => `<option>${stage}</option>`).join("");

  const formEl = modalBody.querySelector("form");
  fillForm(formEl, {
    name: candidate.name || defaults.name || "",
    roleId: candidate.roleId || defaults.roleId || "",
    title: candidate.title || defaults.title || "",
    company: candidate.company || defaults.company || "",
    location: candidate.location || "",
    stage: candidate.stage || "Sourced",
    linkedin: candidate.linkedin || defaults.linkedin || "",
    email: candidate.email || defaults.email || "",
    phone: candidate.phone || "",
    sourceUrl: candidate.sourceUrl || defaults.sourceUrl || "",
    lastContact: candidate.lastContact || "",
    nextFollowUp: candidate.nextFollowUp || "",
    skills: candidate.skills || "",
    notes: candidate.notes || defaults.notes || "",
    dropoutNotes: candidate.dropoutNotes || "",
    remarks: candidate.remarks || ""
  });
  formEl.addEventListener("submit", saveCandidate);
  openModal();
}

function openTemplateModal(id = "") {
  editingId = id || null;
  const template = state.templates.find((item) => item.id === id) || {};
  modalTitle.textContent = id ? "Edit template" : "New template";
  modalBody.innerHTML = `
    <form class="form-stack">
      <div class="form-grid">
        <label>Title<input name="title" required></label>
        <label>Type<input name="type" value="Outreach"></label>
      </div>
      <label>Body<textarea name="body" rows="8" required></textarea></label>
      <div class="form-actions">
        <button class="secondary-button" data-close-modal type="button">Cancel</button>
        <button class="primary-button" type="submit">Save template</button>
      </div>
    </form>
  `;
  const formEl = modalBody.querySelector("form");
  fillForm(formEl, {
    title: template.title || "",
    type: template.type || "Outreach",
    body: template.body || ""
  });
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (editingId) {
      state.templates = state.templates.map((item) => item.id === editingId ? { ...item, ...data, updatedAt: new Date().toISOString() } : item);
      selectedTemplateId = editingId;
    } else {
      const templateId = crypto.randomUUID();
      state.templates.push({ id: templateId, ...data, createdAt: new Date().toISOString() });
      selectedTemplateId = templateId;
    }
    saveState();
    closeModal();
    render();
  });
  openModal();
}

function saveRole(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  data.target = Number(data.target) || 0;
  if (editingId) {
    state.roles = state.roles.map((role) => role.id === editingId ? { ...role, ...data } : role);
  } else {
    state.roles.push({ id: crypto.randomUUID(), ...data });
  }
  saveState();
  closeModal();
  render();
}

async function saveCandidate(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const resumeFile = formData.get("resume");
  const existing = state.candidates.find((item) => item.id === editingId);
  const candidate = {
    id: editingId || crypto.randomUUID(),
    name: formData.get("name"),
    roleId: formData.get("roleId"),
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    stage: formData.get("stage"),
    linkedin: formData.get("linkedin"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    sourceUrl: formData.get("sourceUrl"),
    lastContact: formData.get("lastContact"),
    nextFollowUp: formData.get("nextFollowUp"),
    skills: formData.get("skills"),
    notes: formData.get("notes"),
    dropoutNotes: formData.get("dropoutNotes"),
    remarks: formData.get("remarks"),
    resume: existing?.resume || null,
    updatedAt: new Date().toISOString()
  };

  if (resumeFile && resumeFile.size) {
    candidate.resume = {
      name: resumeFile.name,
      type: resumeFile.type,
      size: resumeFile.size,
      dataUrl: await fileToDataUrl(resumeFile)
    };
  }

  if (editingId) {
    state.candidates = state.candidates.map((item) => item.id === editingId ? candidate : item);
  } else {
    candidate.createdAt = new Date().toISOString();
    state.candidates.unshift(candidate);
  }

  saveState();
  closeModal();
  render();
}

function advanceCandidate(id) {
  state.candidates = state.candidates.map((candidate) => {
    if (candidate.id !== id) return candidate;
    const index = advanceStages.indexOf(candidate.stage);
    if (index < 0) return candidate;
    return { ...candidate, stage: advanceStages[Math.min(index + 1, advanceStages.length - 1)], updatedAt: new Date().toISOString() };
  });
  saveState();
  render();
}

function profileFromCapture(id) {
  const capture = state.captures.find((item) => item.id === id);
  if (!capture) return;
  openCandidateModal(null, {
    name: inferName(capture.title),
    roleId: capture.roleId || "",
    linkedin: capture.linkedin || (capture.url.includes("linkedin.com") ? capture.url : ""),
    email: capture.email || "",
    sourceUrl: capture.url,
    notes: [capture.reviewNotes, capture.selection || capture.title].filter(Boolean).join("\n\n")
  });
}

function dismissCapture(id) {
  state.captures = state.captures.map((capture) => capture.id === id ? { ...capture, dismissedAt: new Date().toISOString() } : capture);
  saveState();
  render();
}

function copyCandidateSummary(id) {
  const candidate = state.candidates.find((item) => item.id === id);
  const role = state.roles.find((item) => item.id === candidate?.roleId);
  if (!candidate) return;
  copyText(`Name: ${candidate.name}
Role: ${role?.title || ""}
Current: ${[candidate.title, candidate.company].filter(Boolean).join(" at ")}
Stage: ${candidate.stage}
LinkedIn: ${candidate.linkedin || ""}
Resume: ${candidate.resume?.name || ""}
Notes: ${candidate.notes || ""}
Dropped out notes: ${candidate.dropoutNotes || ""}
Remarks: ${candidate.remarks || ""}`);
}

function copyFollowupQueue() {
  const lines = dueFollowups(state.candidates, true).map((candidate) => {
    const role = state.roles.find((item) => item.id === candidate.roleId);
    return `${candidate.name} | ${role?.title || "No role"} | ${candidate.nextFollowUp || "No date"} | ${candidate.stage} | ${candidate.linkedin || candidate.email || ""}`;
  });
  copyText(lines.join("\n"));
}

function copyTemplate(id) {
  const template = state.templates.find((item) => item.id === id);
  if (template) copyText(template.body);
}

function copyText(text) {
  navigator.clipboard?.writeText(text).catch(() => {
    const box = document.createElement("textarea");
    box.value = text;
    document.body.append(box);
    box.select();
    document.execCommand("copy");
    box.remove();
  });
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `superteam-talent-workbench-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = {
        roles: imported.roles || [],
        candidates: imported.candidates || [],
        templates: imported.templates || defaultTemplates,
        captures: imported.captures || [],
        savedSearches: imported.savedSearches || [],
        cohorts: imported.cohorts || [],
        sequences: imported.sequences || []
      };
      saveState();
      render();
    } catch {
      alert("That file was not valid workbench JSON.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function renderWeekFocus() {
  const active = state.roles.filter((role) => role.status === "Active");
  const top = active.slice(0, 4).map((role) => role.title).join(", ");
  document.querySelector("#weekFocus").textContent = top || "No active roles yet.";
}

function filteredCandidates(options = {}) {
  const useProfileFilters = options.profileFilters ?? activeView === "people";
  const query = searchInput.value.trim().toLowerCase();
  return state.candidates.filter((candidate) => {
    const role = state.roles.find((item) => item.id === candidate.roleId);
    const searchable = [
      candidate.name,
      candidate.title,
      candidate.company,
      candidate.location,
      candidate.linkedin,
      candidate.skills,
      candidate.notes,
      candidate.dropoutNotes,
      candidate.remarks,
      role?.title,
      role?.client,
      role?.requirements,
      role?.notes
    ].filter(Boolean).join(" ").toLowerCase();
    const profileSearchable = [
      candidate.title,
      candidate.company,
      candidate.location,
      candidate.skills,
      candidate.notes,
      candidate.dropoutNotes,
      candidate.remarks
    ].filter(Boolean).join(" ").toLowerCase();
    const selectedSignal = profileSignals.find((signal) => signal.id === profileFilters.signal);

    if (query && !searchable.includes(query)) return false;
    if (!useProfileFilters) return true;
    if (profileFilters.roleId && candidate.roleId !== profileFilters.roleId) return false;
    if (profileFilters.stage && candidate.stage !== profileFilters.stage) return false;
    if (profileFilters.location && !String(candidate.location || "").toLowerCase().includes(profileFilters.location.toLowerCase())) return false;
    if (selectedSignal && !selectedSignal.match(profileSearchable)) return false;
    if (profileFilters.skills && !profileSearchable.includes(profileFilters.skills.toLowerCase())) return false;
    return true;
  });
}

function filteredCandidatesForSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const today = startOfToday();
  return state.candidates.filter((candidate) => {
    const role = state.roles.find((item) => item.id === candidate.roleId);
    const searchable = normalizeText([
      candidate.name,
      candidate.title,
      candidate.company,
      candidate.location,
      candidate.linkedin,
      candidate.email,
      candidate.sourceUrl,
      candidate.skills,
      candidate.notes,
      candidate.dropoutNotes,
      candidate.remarks,
      role?.title,
      role?.client,
      role?.requirements,
      role?.notes
    ].filter(Boolean).join(" "));

    if (query && !searchable.includes(query)) return false;
    if (searchFilters.roleId && candidate.roleId !== searchFilters.roleId) return false;
    if (searchFilters.stage && candidate.stage !== searchFilters.stage) return false;
    if (searchFilters.followupStatus === "archived" && !["Closed", "Dropped Out"].includes(candidate.stage)) return false;
    if (searchFilters.followupStatus !== "archived" && ["Closed", "Dropped Out"].includes(candidate.stage)) return false;
    if (searchFilters.location && !normalizeText(candidate.location).includes(normalizeText(searchFilters.location))) return false;
    if (searchFilters.followupStatus === "due" && (!candidate.nextFollowUp || new Date(candidate.nextFollowUp) > today)) return false;
    if (searchFilters.followupStatus === "scheduled" && !candidate.nextFollowUp) return false;
    if (searchFilters.followupStatus === "none" && candidate.nextFollowUp) return false;
    return true;
  });
}

function prepareSearchRows(candidates, rankRole) {
  return candidates
    .map((candidate) => {
      const match = rankRole ? scoreCandidateForRole(candidate, rankRole) : scoreCandidateForSearch(candidate, searchFilters);
      return { ...candidate, match, evidence: buildSearchEvidence(candidate, match, searchFilters, rankRole) };
    })
    .sort((a, b) => b.match.score - a.match.score || candidateStrengthTieBreaker(b) - candidateStrengthTieBreaker(a));
}

function prepareProfileRows(candidates, rankRole) {
  if (!rankRole) return candidates;
  return candidates
    .map((candidate) => ({ ...candidate, match: scoreCandidateForRole(candidate, rankRole) }))
    .sort((a, b) => b.match.score - a.match.score || candidateStrengthTieBreaker(b) - candidateStrengthTieBreaker(a));
}

function scoreCandidateForRole(candidate, role) {
  const roleText = normalizeText([role.title, role.requirements, role.notes, role.location, role.client, role.jobBoard].join(" "));
  const candidateText = normalizeText([
    candidate.name,
    candidate.title,
    candidate.company,
    candidate.location,
    candidate.skills,
    candidate.notes,
    candidate.dropoutNotes,
    candidate.remarks
  ].join(" "));
  const roleKeywords = extractKeywords(roleText);
  const matchedKeywords = roleKeywords.filter((keyword) => candidateText.includes(keyword));
  const titleScore = Math.min(22, keywordHits(candidateText, titleSignals(role.title)) * 4);
  const requirementScore = Math.min(30, matchedKeywords.length * 3);
  const locationScore = scoreLocation(candidate, role);
  const seniorityScore = scoreSeniority(candidateText, roleText);
  const companyScore = scoreCompanySignal(candidateText, roleText);
  const stageScore = ["Screened", "Submitted", "Replied"].includes(candidate.stage) ? 4 : 0;
  const score = Math.min(100, Math.round(requirementScore + titleScore + locationScore + seniorityScore + companyScore + stageScore));
  const reasons = buildMatchReasons({ matchedKeywords, titleScore, locationScore, seniorityScore, companyScore, stageScore, candidate, role });

  return { score, reasons, keywords: matchedKeywords.slice(0, 12) };
}

function scoreCandidateForSearch(candidate, filters) {
  const text = normalizeText([
    candidate.name,
    candidate.title,
    candidate.company,
    candidate.location,
    candidate.skills,
    candidate.notes,
    candidate.dropoutNotes,
    candidate.remarks,
    candidate.linkedin,
    candidate.sourceUrl
  ].join(" "));
  const terms = [
    filters.location,
    searchInput.value
  ].filter(Boolean).flatMap((value) => normalizeText(value).split(/\s+/).filter((word) => word.length > 2));
  const hits = [...new Set(terms.filter((term) => text.includes(term)))];
  const completeness = [
    candidate.linkedin,
    candidate.sourceUrl,
    candidate.location,
    candidate.company,
    candidate.skills,
    candidate.notes,
    candidate.resume?.dataUrl
  ].filter(Boolean).length;
  const engaged = ["Replied", "Screened", "Submitted", "Follow-up"].includes(candidate.stage) ? 8 : 0;
  const score = Math.min(100, hits.length * 12 + completeness * 5 + engaged);
  return {
    score,
    reasons: hits.slice(0, 6).length ? hits.slice(0, 6) : ["profile completeness"],
    keywords: hits.slice(0, 10)
  };
}

function buildSearchEvidence(candidate, match, filters, role) {
  const evidence = [];
  if (role) evidence.push(...(match.reasons || []).slice(0, 4));
  if (filters.location && normalizeText(candidate.location).includes(normalizeText(filters.location))) evidence.push(`location: ${candidate.location}`);
  if (filters.followupStatus === "due") evidence.push("follow-up due");
  if (filters.followupStatus === "archived") evidence.push("archived profile");
  if (!evidence.length) evidence.push(...(match.reasons || []).slice(0, 4));
  return [...new Set(evidence)].slice(0, 8);
}

function extractKeywords(text) {
  const stop = new Set(["and", "for", "the", "with", "from", "that", "this", "role", "they", "into", "where", "source", "notes", "team", "based", "open", "focus", "strong", "experience", "candidate", "candidates", "looking", "company", "platform", "remote", "senior", "full", "stack", "engineer", "developer", "software", "building", "build", "using", "tools", "daily", "years", "production", "applications", "preferred", "only", "plus", "huge", "established", "ideal", "profile"]);
  return [...new Set(text
    .split(/[^a-z0-9+#.]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stop.has(word)))].slice(0, 42);
}

function titleSignals(title) {
  const lower = normalizeText(title);
  const signals = [];
  if (lower.includes("full")) signals.push("fullstack", "full stack", "frontend", "typescript", "react", "backend");
  if (lower.includes("sales")) signals.push("sales", "institutional", "business development", "bd", "gtm", "enterprise", "partnership", "asset managers", "banks");
  if (lower.includes("frontend")) signals.push("frontend", "front end", "react", "typescript", "ux");
  if (lower.includes("veryai")) signals.push("go", "golang", "typescript", "backend", "ai", "cloud", "cursor", "claude", "codex", "identity", "security");
  if (lower.includes("designer")) signals.push("designer", "design", "ux", "product design", "web design", "brand", "portfolio", "motion", "animation", "figma", "marketing", "visual");
  if (lower.includes("soroban") || lower.includes("rust") || lower.includes("janus")) signals.push("soroban", "stellar", "rust", "smart contract", "smart contracts", "testnet", "mainnet", "lending", "defi", "audit", "security");
  return signals;
}

function keywordHits(text, signals) {
  return signals.reduce((count, signal) => count + (text.includes(signal) ? 1 : 0), 0);
}

function scoreLocation(candidate, role) {
  const location = normalizeText(candidate.location);
  const roleLocation = normalizeText(role.location + " " + role.notes);
  if (!location) return 0;
  if (roleLocation.includes("lisbon") && location.includes("lisbon")) return 14;
  if (roleLocation.includes("london") && location.includes("london")) return 14;
  if (roleLocation.includes("munich") && location.includes("munich")) return 14;
  if (roleLocation.includes("nyc") && (location.includes("new york") || location.includes("nyc"))) return 14;
  if (roleLocation.includes("east coast") && (location.includes("new york") || location.includes("boston") || location.includes("washington"))) return 10;
  if (roleLocation.includes("us-based") && (location.includes("united states") || location.includes("california") || location.includes("new york") || location.includes("miami"))) return 12;
  if (roleLocation.includes("europe") && (location.includes("united kingdom") || location.includes("germany") || location.includes("portugal") || location.includes("europe"))) return 8;
  return 0;
}

function scoreSeniority(candidateText, roleText) {
  if (!roleText.includes("senior") && !roleText.includes("head")) return 0;
  if (candidateText.includes("head") || candidateText.includes("vp") || candidateText.includes("director") || candidateText.includes("senior") || candidateText.includes("lead")) return 12;
  return 0;
}

function scoreCompanySignal(candidateText, roleText) {
  const signals = ["coinbase", "anchorage", "fireblocks", "bitgo", "circle", "chainalysis", "trm", "elliptic", "mastercard", "visa", "brex", "ramp", "snowflake", "oracle", "tesla", "google", "twilio", "shopify", "solana", "stellar", "soroban", "rust", "testnet", "mainnet", "smart contract", "defi", "lending", "audit", "crypto", "fintech"];
  const hits = signals.filter((signal) => candidateText.includes(signal) && roleText.includes(signal));
  const broadHits = signals.filter((signal) => candidateText.includes(signal) && ["crypto", "fintech", "solana", "stellar", "soroban", "rust"].includes(signal));
  return Math.min(12, hits.length * 5 + broadHits.length * 4);
}

function buildMatchReasons(parts) {
  const reasons = [];
  if (parts.locationScore) reasons.push("location fit");
  if (parts.titleScore) reasons.push("title fit");
  if (parts.seniorityScore) reasons.push("seniority fit");
  if (parts.companyScore) reasons.push("company/domain signal");
  if (parts.stageScore) reasons.push("already engaged");
  parts.matchedKeywords.slice(0, 4).forEach((keyword) => reasons.push(keyword));
  return reasons.slice(0, 6);
}

function candidateStrengthTieBreaker(candidate) {
  return [candidate.title, candidate.company, candidate.location, candidate.notes].filter(Boolean).join(" ").length;
}

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/typescript/g, "typescript").replace(/type script/g, "typescript");
}

function uniqueLocations(people) {
  return [...new Set(people.map((candidate) => candidate.location).filter(Boolean))].sort();
}

function dueFollowups(candidates, includeFuture = false) {
  const today = startOfToday();
  return candidates
    .filter((candidate) => !["Closed", "Dropped Out"].includes(candidate.stage))
    .filter((candidate) => candidate.nextFollowUp && (includeFuture || new Date(candidate.nextFollowUp) <= today))
    .sort((a, b) => new Date(a.nextFollowUp) - new Date(b.nextFollowUp));
}

function fillForm(form, values) {
  Object.entries(values).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input && input.type !== "file") input.value = value;
  });
}

function openModal() {
  modal.hidden = false;
  modalBody.querySelector("input, textarea, select, button")?.focus();
}

function closeModal() {
  modal.hidden = true;
  editingId = null;
}

function loadState() {
  const saved = localStorage.getItem(DB_KEY);
  if (!saved) return seedState;
  try {
    const parsed = JSON.parse(saved);
    return {
      roles: parsed.roles || seedState.roles,
      candidates: parsed.candidates || [],
      templates: parsed.templates?.length ? parsed.templates : defaultTemplates,
      captures: parsed.captures || [],
      savedSearches: parsed.savedSearches || [],
      cohorts: parsed.cohorts || [],
      sequences: parsed.sequences || []
    };
  } catch {
    return seedState;
  }
}

function mergeCanonical(input) {
  const placeholderTitles = new Set(["Role 1: add brief", "Role 2: add brief", "Role 3: add brief"]);
  const next = {
    roles: (input.roles || []).filter((role) => !placeholderTitles.has(role.title)),
    candidates: input.candidates || [],
    templates: input.templates?.length ? input.templates : defaultTemplates,
    captures: input.captures || [],
    savedSearches: input.savedSearches || [],
    cohorts: input.cohorts || [],
    sequences: input.sequences || []
  };

  canonicalRoles.forEach((role) => {
    const index = next.roles.findIndex((item) => item.id === role.id);
    if (index >= 0) {
      next.roles[index] = { ...next.roles[index], ...role, status: next.roles[index].status || role.status };
    } else {
      next.roles.push(role);
    }
  });

  canonicalCandidates.forEach((candidate) => {
    const normalizedLinkedIn = normalizeUrl(candidate.linkedin);
    const index = next.candidates.findIndex((item) => item.id === candidate.id || (normalizedLinkedIn && normalizeUrl(item.linkedin) === normalizedLinkedIn));
    if (index >= 0) {
      next.candidates[index] = {
        ...candidate,
        ...next.candidates[index],
        roleId: next.candidates[index].roleId || candidate.roleId,
        linkedin: next.candidates[index].linkedin || candidate.linkedin,
        sourceUrl: next.candidates[index].sourceUrl || candidate.sourceUrl
      };
    } else {
      next.candidates.push(candidate);
    }
  });

  [...defaultTemplates, ...canonicalTemplates].forEach((template) => {
    if (!next.templates.some((item) => item.id === template.id)) next.templates.push(template);
  });

  return next;
}

function saveState() {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
}

function backupExistingState() {
  if (localStorage.getItem(BACKUP_KEY)) return;
  const saved = localStorage.getItem(DB_KEY);
  if (saved) localStorage.setItem(BACKUP_KEY, saved);
}

function syncStateFromStorage(event) {
  if (event.key !== DB_KEY || !event.newValue) return;
  state = mergeCanonical(loadState());
  renderWeekFocus();
  render();
}

function handleBookmarkletMessage(event) {
  const payload = event.data || {};
  if (payload.type !== "superteam:capture") return;
  addCapture(createCapturePayload(payload));
  activeView = "capture";
  render();
}

function readCaptureFromUrl() {
  const params = new URLSearchParams(location.search);
  if (!params.has("capture")) return null;
  return createCapturePayload({
    title: params.get("title") || "",
    url: params.get("url") || "",
    text: params.get("text") || ""
  });
}

function createCapturePayload(payload) {
  const url = payload.url || "";
  const selection = payload.text || payload.selection || "";
  const title = payload.title || "";
  const email = `${selection} ${title}`.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const linkedin = url.includes("linkedin.com") ? url : "";
  return {
    id: crypto.randomUUID(),
    title,
    url,
    selection,
    email,
    linkedin,
    createdAt: new Date().toISOString()
  };
}

function addCapture(capture) {
  const duplicate = state.captures.find((item) => item.url === capture.url && item.title === capture.title && !item.dismissedAt);
  state.captures.unshift(duplicate ? { ...capture, id: duplicate.id } : capture);
  if (duplicate) state.captures = state.captures.filter((item, index) => index === 0 || item.id !== duplicate.id);
  saveState();
  showCaptureNotice(capture);
}

function showCaptureNotice(capture) {
  captureSummary.textContent = `${capture.title || "Untitled page"} was added to Capture.`;
  captureNotice.hidden = false;
}

function buildBookmarklet() {
  const appUrl = new URL("./index.html", location.href).href;
  const origin = new URL(appUrl).origin;
  const script = `(function(){var s=String(window.getSelection&&window.getSelection()||'').slice(0,4000);var p={type:'superteam:capture',title:document.title,url:location.href,text:s};var w=window.open('','${WORKBENCH_WINDOW_NAME}');if(!w){alert('Open Talent Workbench once, then use Add to Workbench again.');return;}try{if(w.location.href==='about:blank'){w.close();alert('Open Talent Workbench once, then use Add to Workbench again.');return;}}catch(e){}w.postMessage(p,'${origin}');})();`;
  return `javascript:${script}`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function currentWeek() {
  const now = new Date();
  const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDate(value) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function inferName(title) {
  return (title || "").split("|")[0].split("-")[0].replace(/LinkedIn/i, "").trim();
}

function stageClass(stage) {
  return String(stage || "").toLowerCase().replace(/\s+/g, "-");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function normalizeUrl(value) {
  return String(value || "").trim().replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "").toLowerCase();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}
