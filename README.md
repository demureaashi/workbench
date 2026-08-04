# Talent Workbench

Offline-first personal recruiting OS for `workbench.akankshaps.com`.

The shipped app starts with a single empty `Superteam Talent` workspace and stores records, workspace data, and resume blobs in IndexedDB. UI state such as the active workspace, tab, and filters is stored in `localStorage`.

## Run locally

```sh
python3 -m http.server 4174
```

Open `http://127.0.0.1:4174/`.

## Monorepo migration

The dynamic React/Node/SQLite migration has started alongside the current static app:

```sh
npm install
npm run dev:api
npm run dev:web
```

- React app: `http://127.0.0.1:5173/`
- Node API: `http://127.0.0.1:4175/`
- SQLite file: `data/talent.db` by default, or set `TALENT_DB_PATH`

The React app imports the existing root `styles.css`, so the static app remains the visual reference while features move over.

## Demo seed

No candidate or role mock data is loaded by default. Use the empty-state button or open `http://127.0.0.1:4174/?seed=1` to load demo data into the browser.

## Capture from webpages

Open the `Capture` tab and copy the bookmarklet. Keep Talent Workbench open once. On any profile page, select useful text and click the bookmarklet; the open Workbench tab receives the page title, URL, selected text, email clues, and LinkedIn URL without opening a new dashboard tab.

## Data

Use the topbar `Export` menu to download the active workspace in one of three formats:

- `Export as JSON` downloads the complete Workbench workspace backup, including roles, candidates, templates, captures and resume files encoded in JSON.
- `Export as CSV` downloads the active workspace's candidate table after showing the spreadsheet columns and a preview.
- `Export as XLSX` downloads the same candidate table as an Excel workbook.

Use the matching `Import` menu for restores or spreadsheet ingestion:

- `Import JSON` restores or replaces a complete Workbench workspace in IndexedDB.
- `Import CSV` and `Import XLS/XLSX` open the HelloCSV review flow for candidate rows, including upload, column mapping, validation, preview and confirmation before records are saved. Legacy `.xls` files are accepted on import and normalized into the same candidate mapping flow.
