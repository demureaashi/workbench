import { useEffect, useMemo, useState } from "react";
import { DEFAULT_WORKSPACE, PALETTES, PRIORITY_COLOR, displayDate } from "@talent/shared";
import type { BootstrapPayload, Role, Workspace } from "@talent/shared";
import { fetchBootstrap } from "./api";

type Tab = "dashboard" | "profiles" | "roles" | "followups" | "archive" | "templates" | "capture";

const UI_KEY = "talentWorkbench.react.ui.v1";

const NAV: Array<[Tab, string, keyof typeof ICONS]> = [
  ["dashboard", "Dashboard", "dashboard"],
  ["profiles", "Profiles", "profiles"],
  ["roles", "Roles", "roles"],
  ["followups", "Follow-ups", "followups"],
  ["archive", "Archive", "archive"],
  ["templates", "Templates", "templates"],
  ["capture", "Capture", "capture"]
];

const ICONS = {
  dashboard: <><path d="M3 3h8v8H3z" /><path d="M13 3h8v5h-8z" /><path d="M13 12h8v9h-8z" /><path d="M3 15h8v6H3z" /></>,
  profiles: <><path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" /><path d="M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" /><path d="M21 20v-1a4 4 0 0 0-3-3.8" /></>,
  roles: <><path d="M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>,
  followups: <><path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" /><path d="M10.5 20a2 2 0 0 0 3 0" /></>,
  archive: <><path d="M3 5h18v4H3z" /><path d="M5 9v10h14V9" /><path d="M10 13h4" /></>,
  templates: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h6" /></>,
  capture: <><path d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" /><path d="M8 10l4 4 4-4" /><path d="M12 3v11" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4 4" /></>,
  download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  upload: <><path d="M12 21V9" /><path d="m7 14 5-5 5 5" /><path d="M5 3h14" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  chevrons: <><path d="m7 8 5-5 5 5" /><path d="m7 16 5 5 5-5" /></>
};

const titles: Record<Tab, string> = {
  dashboard: "Overview",
  profiles: "Profiles",
  roles: "Roles",
  followups: "Follow-ups",
  archive: "Archive",
  templates: "Templates",
  capture: "Capture"
};

interface UiState {
  tab: Tab;
  workspaceId: string;
  query: string;
}

const emptyBootstrap: BootstrapPayload = {
  workspaces: [DEFAULT_WORKSPACE],
  activeWorkspace: DEFAULT_WORKSPACE,
  roles: [],
  candidates: [],
  templates: [],
  captures: []
};

export function App() {
  const [ui, setUi] = useState<UiState>(() => loadUi());
  const [data, setData] = useState<BootstrapPayload>(emptyBootstrap);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(UI_KEY, JSON.stringify(ui));
  }, [ui]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchBootstrap(ui.workspaceId)
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setError("");
        if (payload.activeWorkspace.id !== ui.workspaceId) {
          setUi((current) => ({ ...current, workspaceId: payload.activeWorkspace.id }));
        }
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        setError(reason instanceof Error ? reason.message : "Unable to load Talent Workbench API");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [ui.workspaceId]);

  useEffect(() => {
    applyTheme(data.activeWorkspace);
  }, [data.activeWorkspace]);

  const counts = useMemo(() => ({
    dashboard: "",
    profiles: data.candidates.filter((candidate) => !candidate.archived).length,
    roles: data.roles.filter((role) => !isRoleArchived(role)).length,
    followups: data.candidates.filter((candidate) => candidate.followUp && !candidate.archived).length,
    archive: data.roles.filter(isRoleArchived).length + data.candidates.filter((candidate) => candidate.archived).length,
    templates: data.templates.length,
    capture: data.captures.length
  }), [data]);

  return (
    <div className="app-shell">
      <div className="app-body">
        <aside className="rail">
          <div className="rail-brand">
            <div className="rail-brand-main">
              <span className="brand-tile">TW</span>
              <strong>Talent Workbench</strong>
            </div>
            <div className="rail-url">talent.akankshaps.com</div>
          </div>
          <nav className="nav tw-scroll">
            {NAV.map(([key, label, iconName]) => (
              <button className={`tw-nav ${ui.tab === key ? "active" : ""}`} key={key} type="button" onClick={() => setUi((current) => ({ ...current, tab: key }))}>
                <span className="nav-icon">{icon(iconName, 15, 1.5)}</span>
                <span>{label}</span>
                <span className="nav-count">{counts[key] || ""}</span>
              </button>
            ))}
          </nav>
          <div className="workspace-switcher">
            <button className="workspace-pill" type="button">
              <span className="workspace-mark">{data.activeWorkspace.mark}</span>
              <span><b>{data.activeWorkspace.name}</b><small>{data.activeWorkspace.type}</small></span>
              <span className="muted">{icon("chevrons", 14, 1.5)}</span>
            </button>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div className="topbar-title">
              <div className="kicker">{data.activeWorkspace.name} · active scope</div>
              <h1>{titles[ui.tab]}</h1>
            </div>
            <div className="topbar-actions">
              <label className="search-wrap">
                <span>{icon("search", 14, 1.6)}</span>
                <input className="input" value={ui.query} onChange={(event) => setUi((current) => ({ ...current, query: event.target.value }))} placeholder="Search candidates, roles, notes..." />
              </label>
              <button className="btn btn-secondary" type="button">{icon("download", 14, 1.6)}Export</button>
              <label className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {icon("upload", 14, 1.6)}Import
                <input className="sr-only" type="file" accept="application/json" />
              </label>
              <button className="btn btn-primary" type="button">{primaryLabel(ui.tab)}</button>
            </div>
          </header>
          <div className="content tw-scroll">
            {loading ? <EmptyBlock title="Loading workspace" body="Reading from the SQLite-backed API." /> : null}
            {!loading && error ? <EmptyBlock title="API unavailable" body={error} /> : null}
            {!loading && !error ? renderView(ui.tab, data) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

function renderView(tab: Tab, data: BootstrapPayload) {
  if (tab === "dashboard") return <Dashboard data={data} />;
  if (tab === "roles") return <Roles roles={data.roles} />;
  if (tab === "profiles") return <EmptyBlock title="Profiles are next" body="The React shell is connected; candidate table and drawer porting comes after roles." />;
  if (tab === "followups") return <EmptyBlock title="Follow-ups are next" body="Queue, snoozed, and contacted-again behavior will reuse the shared date helpers." />;
  if (tab === "archive") return <EmptyBlock title="Archive is next" body="Restorable roles and candidates will stay scoped to this workspace." />;
  if (tab === "templates") return <EmptyBlock title="Templates are next" body="Merge-token templates will move behind the API after core records." />;
  return <EmptyBlock title="Capture is next" body="The bookmarklet receiver will continue to post into the open Workbench tab." />;
}

function Dashboard({ data }: { data: BootstrapPayload }) {
  const activeRoles = data.roles.filter((role) => !isRoleArchived(role) && role.status === "Active");
  const candidates = data.candidates.filter((candidate) => !candidate.archived);
  const target = activeRoles.reduce((sum, role) => sum + role.target, 0);
  const submitted = candidates.filter((candidate) => candidate.stage === "Submitted").length;
  const due = candidates.filter((candidate) => candidate.followUp).length;

  return (
    <>
      <div className="metrics">
        <Metric label="Open roles" value={activeRoles.length} note={`${activeRoles.filter((role) => role.priority === "High").length} high`} valueWidth="100%" />
        <Metric label="Sourced / target" value={candidates.length} note={`of ${target || 0}`} valueWidth={target ? `${Math.min(100, Math.round(candidates.length / target * 100))}%` : "0%"} />
        <Metric label="Submitted" value={submitted} note="to clients" valueWidth="45%" color="#6f8f6a" />
        <Metric label="Follow-ups due" value={due} note="dated records" valueWidth="30%" color={PRIORITY_COLOR.High} />
      </div>
      <div className="section-line">
        <h2>Open roles</h2>
        <div className="muted" style={{ fontSize: 11.5 }}>
          <span>Week of {displayDate(new Date().toISOString().slice(0, 10))}</span>
        </div>
      </div>
      {activeRoles.length ? <Roles roles={activeRoles.slice(0, 8)} compact /> : <EmptyBlock title="This workspace is empty" body="Add a first role, import a workspace, or load demo seed data." />}
    </>
  );
}

function Roles({ roles, compact = false }: { roles: Role[]; compact?: boolean }) {
  if (!roles.length) {
    return <EmptyBlock title="No active roles" body="Create a role for this workspace. Priority and status edit directly in the table." />;
  }

  return (
    <div className="table-wrap">
      <table className="tw-t">
        <thead>
          <tr>
            <th>Role</th>
            <th>Client</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Location</th>
            {!compact ? <th>Due</th> : null}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td><strong>{role.title}</strong></td>
              <td>{role.client}</td>
              <td><span className="dot-label"><span className="status-dot" style={{ background: PRIORITY_COLOR[role.priority] }} />{role.priority}</span></td>
              <td><span className="dot-label"><span className="status-dot" style={{ background: statusColor(role.status) }} />{role.status}</span></td>
              <td>{role.location}</td>
              {!compact ? <td className="num">{displayDate(role.due)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Metric({ label, value, note, valueWidth, color }: { label: string; value: number; note: string; valueWidth: string; color?: string | undefined }) {
  return (
    <div className="metric">
      <div className="label-upper">{label}</div>
      <div className="metric-value"><strong>{value}</strong><span>{note}</span></div>
      <div className="tiny-bar"><span style={{ "--value": valueWidth, "--bar-color": color || "var(--color-accent)" } as React.CSSProperties} /></div>
    </div>
  );
}

function EmptyBlock({ title, body }: { title: string; body: string }) {
  return <div className="empty"><strong>{title}</strong><span>{body}</span></div>;
}

function icon(name: keyof typeof ICONS, size = 14, strokeWidth = 1.6) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function primaryLabel(tab: Tab): string {
  if (tab === "roles") return "New role";
  if (tab === "profiles") return "New candidate";
  if (tab === "templates") return "New";
  if (tab === "capture") return "Copy bookmarklet";
  return "Add role";
}

function statusColor(status: Role["status"]): string {
  if (status === "Active") return "#4f7f52";
  if (status === "Paused") return "#c28d41";
  if (status === "Filled") return "#2b6b3f";
  return "#7d7979";
}

function isRoleArchived(role: Role): boolean {
  return role.archived || role.status === "Filled" || role.status === "Closed";
}

function applyTheme(workspace: Workspace): void {
  const palette = PALETTES[workspace.palette] || PALETTES.house;
  const root = document.documentElement;
  root.style.setProperty("--color-text", palette.ink);
  root.style.setProperty("--color-accent", palette.accent);
  root.style.setProperty("--color-accent-100", palette.a100);
  root.style.setProperty("--color-accent-600", palette.a600);
  root.style.setProperty("--color-accent-700", palette.a700);
  root.style.setProperty("--color-accent-800", palette.a800);
  root.style.setProperty("--color-divider", `color-mix(in srgb, ${palette.ink} 14%, transparent)`);
}

function loadUi(): UiState {
  try {
    const parsed = JSON.parse(localStorage.getItem(UI_KEY) || "{}") as Partial<UiState>;
    return {
      tab: parsed.tab || "dashboard",
      workspaceId: parsed.workspaceId || DEFAULT_WORKSPACE.id,
      query: parsed.query || ""
    };
  } catch {
    return { tab: "dashboard", workspaceId: DEFAULT_WORKSPACE.id, query: "" };
  }
}
