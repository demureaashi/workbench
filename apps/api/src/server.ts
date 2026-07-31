import { createServer } from "node:http";
import { URL } from "node:url";
import { createWorkspace, getBootstrap, listWorkspaces, openTalentDb, updateWorkspace } from "@talent/db";
import type { Workspace } from "@talent/shared";
import { readJson, sendJson, sendNoContent } from "./http";

const port = Number(process.env.PORT || 4175);
const host = process.env.HOST || "127.0.0.1";
const db = openTalentDb();

const server = createServer(async (request, response) => {
  try {
    if (!request.url) {
      sendJson(response, 400, { error: "Missing URL" });
      return;
    }

    if (request.method === "OPTIONS") {
      sendNoContent(response);
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, { ok: true, service: "talent-api" });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/bootstrap") {
      sendJson(response, 200, getBootstrap(db, url.searchParams.get("workspaceId") || undefined));
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/workspaces") {
      sendJson(response, 200, { workspaces: listWorkspaces(db) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/workspaces") {
      const body = await readJson(request);
      const workspace = createWorkspace(db, body as Partial<Workspace>);
      sendJson(response, 201, { workspace });
      return;
    }

    const workspacePatch = url.pathname.match(/^\/api\/workspaces\/([^/]+)$/);
    if (request.method === "PATCH" && workspacePatch) {
      const workspaceId = workspacePatch[1];
      if (!workspaceId) {
        sendJson(response, 400, { error: "Missing workspace id" });
        return;
      }
      const body = await readJson(request);
      const workspace = updateWorkspace(db, decodeURIComponent(workspaceId), body as Partial<Workspace>);
      if (!workspace) {
        sendJson(response, 404, { error: "Workspace not found" });
        return;
      }
      sendJson(response, 200, { workspace });
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    sendJson(response, 500, { error: message });
  }
});

server.listen(port, host, () => {
  console.log(`Talent Workbench API listening on http://${host}:${port}`);
});
