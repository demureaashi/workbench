# Superteam Talent Workbench

Offline-first sourcing dashboard for weekly roles, profiles, outreach, follow-ups, submissions, remarks, resumes, and capture-from-page workflow.

The current workspace is preloaded with:
- Range Senior Full-Stack Developer (Frontend Focus): 42 longlist profiles + 3 already-in-interview profiles.
- Range Head of Institutional Sales: 58 longlist profiles + 4 already-in-interview profiles.
- VeryAI Fullstack Engineer: 150 longlist profiles.

## Run locally

```sh
python3 -m http.server 4174
```

Open `http://127.0.0.1:4174/`.

## Capture from webpages

Open the `Capture` tab, copy the bookmarklet, create a browser bookmark, and paste the bookmarklet as the bookmark URL. Keep the Workbench open once. On any profile page, select useful text and click that bookmark. The existing Workbench tab receives the page title, URL, selected text, and visible email clues without opening a new dashboard tab.

## Data

Data is stored in the browser on this computer. Use `Export` regularly to keep a backup JSON file. `Import` restores the same workspace later.

The original Numbers longlists were converted to `.xlsx` in `converted/` for auditability.
