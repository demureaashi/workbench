# Master Plan

## Product Intent

This project is meant to become a personal recruiting operating system for Superteam Talent sourcing work. The core goal is to keep every role, profile, sourcing note, follow-up, shortlist, rejected candidate, template, capture, and client-ready submission in one fast workspace that works offline and stays under the user's control.

The user does not want a passive browser extension that follows activity across every site. The preferred model is command-based: when the user chooses to capture a webpage, LinkedIn profile, resume clue, or selected text, that snapshot should be sent into the workbench. Everything else should happen inside the dashboard.

The eventual product should be standalone and deployable for personal use, with a real local database instead of editing candidate data into static HTML or JavaScript. SQLite is the preferred storage layer so data can be uploaded, searched, filtered, exported, backed up, and migrated without asking AI to rewrite source files.

## What We Have Been Building

We built a local-first Talent Workbench that currently runs as a static web app. It started as an offline dashboard for three sourcing roles and has grown into a recruiting workspace with these major capabilities:

- Role tracking for weekly sourcing priorities, targets, status, priority, notes, and job boards.
- Candidate/profile tracking with stage, role assignment, contact information, LinkedIn, resume, source URL, notes, remarks, dropped-out notes, next follow-up, and archive behavior.
- Imported longlists from the original Numbers files, converted for auditability.
- Search and filtering across saved/imported/captured candidates.
- JD-aware ranking for candidates against a selected role.
- Capture workflow using a bookmarklet that sends selected webpage information into the workbench only when commanded.
- Templates for outreach, follow-ups, submission notes, screening, availability checks, and dropout closeout.
- Sequence grouping for candidates who should be worked later in a repeated outreach flow.
- Archive handling for filled/closed roles and closed/dropped-out candidates.
- Export/import JSON backups for browser-local data safety.

The UI direction has also moved from a large card-based dashboard into a denser recruiting platform style: cleaner left rail, compact tables, top filters, minimal tabs, and operational views.

## Current Architecture

The current version is a static app:

- `index.html`: app shell and forms.
- `app.js`: all state, rendering, filtering, scoring, capture, import/export, and UI actions.
- `roleData.js`: canonical seeded roles, candidates, and templates.
- `styles.css`: full visual system and responsive layout.
- `sw.js`: service worker and offline cache.
- `capture-setup.html`: standalone bookmarklet setup page.
- `tools/install-chrome-bookmark.mjs`: local helper for installing/updating Chrome bookmarklet.
- `converted/`: converted Excel versions of original longlists.
- `extracted-previews/`: extracted previews/source audit artifacts.

Current data storage is browser `localStorage`. This is good for an offline prototype, but it should be replaced with SQLite for a proper personal product.

## Desired Product Principles

- Local-first and private by default.
- Fast enough to use while sourcing live.
- Command-based capture only, never silent tracking.
- No dependency on AI for everyday data entry.
- Data should be queryable, exportable, and backed up.
- The dashboard should be compact, clean, and table-led.
- The app should keep active work separate from archive/history.
- Every role should have a clear pipeline view, candidate list, shortlist/reject flow, follow-up queue, and template support.
- Scoring should be explainable: each ranking should show why a candidate surfaced.
- The system should support weekly sourcing operations and longer-term candidate reuse.

## Core Data Model For SQLite

Recommended initial tables:

- `roles`
  - `id`, `title`, `client`, `week`, `target`, `priority`, `status`, `job_board_url`, `salary`, `location`, `requirements`, `notes`, `created_at`, `updated_at`, `archived_at`

- `candidates`
  - `id`, `name`, `title`, `company`, `location`, `linkedin_url`, `email`, `phone`, `source_url`, `resume_file_id`, `skills`, `notes`, `remarks`, `created_at`, `updated_at`

- `candidate_roles`
  - `id`, `candidate_id`, `role_id`, `stage`, `priority`, `fit_score`, `fit_reasons_json`, `dropout_notes`, `last_contact`, `next_follow_up`, `submitted_at`, `archived_at`, `created_at`, `updated_at`

- `captures`
  - `id`, `title`, `url`, `selected_text`, `email`, `linkedin_url`, `review_notes`, `role_id`, `candidate_id`, `status`, `created_at`, `dismissed_at`

- `templates`
  - `id`, `title`, `type`, `body`, `created_at`, `updated_at`

- `sequences`
  - `id`, `title`, `role_id`, `steps_json`, `created_at`, `updated_at`

- `sequence_members`
  - `id`, `sequence_id`, `candidate_id`, `current_step`, `status`, `created_at`, `updated_at`

- `files`
  - `id`, `candidate_id`, `filename`, `mime_type`, `size_bytes`, `storage_path`, `created_at`

- `activity_log`
  - `id`, `entity_type`, `entity_id`, `action`, `details_json`, `created_at`

This schema separates a person from their role-specific pipeline state. That matters because the same candidate may later be reused for another role.

## Tab-By-Tab Functional Plan

### Dashboard

Purpose: Give a fast weekly overview without clutter.

Current/desired functions:

- Show active role count.
- Show sourced vs target profile count.
- Show submitted profiles.
- Show due follow-ups.
- Show open roles in a wide table.
- Allow quick actions: add role, view all roles, open job board, edit role, archive role.
- Keep priority label and dot inline.
- Avoid showing candidate rows here unless specifically requested.

Future improvements:

- Add date/week selector.
- Add per-role progress bars based on target vs sourced.
- Add weekly activity summary from `activity_log`.
- Add client-ready progress export.

### Profiles

Purpose: Main candidate search and working list.

Current/desired functions:

- Show Contacts and Sequences only.
- Use top filters, not a left rail.
- Keep filters limited to Role, Stage, Location, and Follow-up.
- Include Archived inside the Follow-up filter.
- Search globally by name, role, company, skill, notes, and source text.
- Show candidate rows with score, candidate, role, stage, location, follow-up, and actions.
- Actions: Edit, Shortlist, Sequence, Reject, Archive, LinkedIn/Resume where available.
- Editing a candidate should allow changing role, stage, contact details, resume, notes, remarks, dropout notes, and follow-up date.
- If stage is Closed or Dropped Out, candidate should appear in Archive automatically.

Future improvements:

- Inline stage dropdown in the table.
- Multi-select candidates for batch shortlist, reject, sequence, archive, or export.
- Saved views per role.
- Candidate deduplication by LinkedIn/email.
- Advanced candidate detail page with timeline.

### Roles

Purpose: Manage all active job searches.

Current/desired functions:

- List active roles in a wide table.
- Show title, client, priority, status, profile count, and actions.
- Allow priority changes.
- Allow edit role.
- Allow archive/fill/close role.
- Preserve job board links.
- Keep priority label beside the color dot.

Future improvements:

- Role detail page with JD, target companies, search strategy, saved searches, shortlist, submissions, and weekly notes.
- Role-level import for new longlists.
- Role-level shortlist ranking.
- Role-level archived candidate history.

### Follow-ups

Purpose: Daily working queue for people who need a touchpoint.

Current/desired functions:

- Show candidates with next follow-up date.
- Sort due/overdue follow-ups first.
- Exclude Closed and Dropped Out by default.
- Allow copy queue for daily work.
- Explain that it is driven by the profile's Next follow-up field.

Future improvements:

- Snooze follow-up.
- Mark contacted today.
- Create follow-up task from template.
- Calendar export or local reminders.

### Archive

Purpose: Keep closed work searchable without polluting active workflows.

Current/desired functions:

- Show archived roles: Filled and Closed.
- Show archived candidates: Closed and Dropped Out.
- Allow restore role.
- Allow edit archived role or candidate.
- Avoid excess empty right-side space.

Future improvements:

- Archive filters by role, close reason, date, and client.
- Restore candidate to active stage.
- Archive report by week/client.

### Templates

Purpose: Store reusable copy for sourcing and client communication.

Current/desired functions:

- List templates.
- Copy template.
- Edit existing templates.
- Create new templates.
- Include outreach, first follow-up, profile submission note, screening checklist, availability check, dropout closeout, and weekly client update.

Future improvements:

- Template variables preview.
- Role-specific template variants.
- Candidate-specific merge preview.
- Template usage history.

### Capture

Purpose: Command-based page capture from LinkedIn, Notion, GitHub, resumes, or other sourcing pages.

Current/desired functions:

- Provide bookmarklet.
- Bookmarklet should not open a new dashboard tab each time.
- Bookmarklet should send title, URL, selected text, email clues, and LinkedIn URL into the existing dashboard tab.
- Captured pages should remain in an inbox until converted into a candidate.
- Capture should not track browsing passively.

Future improvements:

- Capture API endpoint in the standalone app.
- Browser extension only if it remains command-based.
- Parse common profile formats into suggested fields.
- Assign captured item to a role before creating candidate.

## Ranking And Scoring Plan

Current ranking uses:

- Role title.
- Role requirements/JD.
- Role sourcing notes.
- Role location.
- Role client.
- Role job board URL.
- Candidate title.
- Candidate company.
- Candidate location.
- Candidate skills.
- Candidate notes.
- Candidate remarks.
- Candidate stage.

Desired scoring behavior:

- If a role filter is selected, score candidates against that role's JD and job board context.
- Show the score and a short list of reasons.
- Prefer explainable ranking over black-box ranking.
- Weight must-haves higher than generic profile completeness.
- Respect role-specific location preferences.
- Penalize or exclude Closed/Dropped Out candidates unless Archive is selected.

Future scoring improvements:

- Store fit score and fit reasons per `candidate_roles` record.
- Add role-specific must-have tags.
- Add manual override priority.
- Add "client submitted", "interviewing", and "rejected by client" outcomes.
- Add review notes explaining why a candidate was shortlisted or rejected.

## Standalone SQLite Product Roadmap

### Phase 1: Stabilize Current Static App

- Keep static app working offline.
- Keep export/import JSON backup.
- Keep current bookmarklet flow.
- Keep all current candidate data safe.
- Document current behavior and product goals.

### Phase 2: Add Local Backend

Recommended stack:

- Node.js + Express or Fastify.
- SQLite via `better-sqlite3`.
- Drizzle ORM or direct SQL migrations.
- Local file storage for resumes.
- Static frontend served by the same local server.

Backend endpoints:

- `GET /api/roles`
- `POST /api/roles`
- `PATCH /api/roles/:id`
- `GET /api/candidates`
- `POST /api/candidates`
- `PATCH /api/candidates/:id`
- `GET /api/captures`
- `POST /api/captures`
- `POST /api/import`
- `GET /api/export`
- `GET /api/templates`
- `POST /api/templates`
- `PATCH /api/templates/:id`
- `GET /api/sequences`
- `POST /api/sequences`

### Phase 3: Data Migration

- Export current localStorage JSON.
- Build migration script that reads the JSON and inserts into SQLite.
- Preserve all candidate IDs, role IDs, templates, captures, sequences, and timestamps.
- Store old JSON backup before migration.
- Verify counts before and after migration.

Required checks:

- Role count matches.
- Candidate count matches.
- Template count matches.
- Capture count matches.
- Candidate-role associations match.
- Closed/Dropped Out candidates show in Archive.

### Phase 4: Deployable Personal App

Options:

- Local desktop-style app using Tauri or Electron.
- Local web app launched with one command.
- Private deployment with an encrypted SQLite volume.

For personal use, the simplest reliable version is:

- Local Node server.
- SQLite file in an app data directory.
- Browser UI at `http://127.0.0.1:<port>`.
- Backup/export button.
- Optional password for local/private deployment.

### Phase 5: Product Polish

- Add a real navigation structure for role detail, profile detail, and sequence detail.
- Add bulk actions.
- Add import mapping for CSV/XLSX.
- Add resume upload and text extraction.
- Add safer bookmarklet setup.
- Add automated tests for filters, archive behavior, import/export, and scoring.

## Non-Goals For The First Standalone Version

- No open-web people database.
- No scraping LinkedIn automatically.
- No passive browser tracking.
- No multi-user permissions unless needed later.
- No AI dependency for ordinary create/edit/search workflows.
- No replacing the recruiter's judgment with opaque scoring.

## Verification Checklist

Before calling the product ready for personal use:

- Dashboard has only overview and open roles.
- Profiles has top filters only.
- Profiles actions fit on screen at desktop width.
- Search works globally.
- Role filter ranks candidates against the selected JD.
- Closed and Dropped Out candidates appear in Archive.
- Templates can be created, edited, and copied.
- Capture works without opening repeated dashboard tabs.
- Export/import preserves all data.
- SQLite migration preserves all counts and associations.
- Resume and LinkedIn fields remain available.
- The app can run without internet.
- The app can be backed up by copying the SQLite database and file storage folder.

## Final Re-Review

This plan includes the user's stated priorities from the full session:

- A proper recruiting platform, not just a dashboard.
- Offline/local-first behavior.
- Command-based capture.
- Role-level weekly sourcing management.
- Candidate database with search, filters, stage changes, archive, shortlisting, rejecting, sequencing, notes, LinkedIn, and resumes.
- JD-aware ranking and top-to-bottom candidate preference.
- Follow-up queue.
- Templates.
- Archive.
- Cleaner, compact UI.
- Future SQLite-backed standalone product where data is uploaded and managed through the app rather than embedded in source code.

The missing piece for the next build is not more UI iteration. It is the backend/data layer. The next major milestone should be converting the current localStorage data model into a SQLite-backed local app while preserving the existing frontend workflows.
