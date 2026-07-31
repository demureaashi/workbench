import type { BootstrapPayload, Workspace } from "@talent/shared";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchBootstrap(workspaceId?: string): Promise<BootstrapPayload> {
  const params = new URLSearchParams();
  if (workspaceId) params.set("workspaceId", workspaceId);
  const response = await fetch(`${API_BASE}/api/bootstrap${params.size ? `?${params}` : ""}`);
  if (!response.ok) throw new Error(`Bootstrap failed: ${response.status}`);
  return response.json() as Promise<BootstrapPayload>;
}

export async function createWorkspace(input: Partial<Workspace>): Promise<Workspace> {
  const response = await fetch(`${API_BASE}/api/workspaces`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!response.ok) throw new Error(`Workspace create failed: ${response.status}`);
  const payload = await response.json() as { workspace: Workspace };
  return payload.workspace;
}
