import type { IncomingMessage, ServerResponse } from "node:http";

export interface ApiRequest extends IncomingMessage {
  body?: unknown;
}

export function sendJson(response: ServerResponse, status: number, payload: unknown): void {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": process.env.CORS_ORIGIN || "http://localhost:5173",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  response.end(JSON.stringify(payload));
}

export function sendNoContent(response: ServerResponse): void {
  response.writeHead(204, {
    "access-control-allow-origin": process.env.CORS_ORIGIN || "http://localhost:5173",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  response.end();
}

export async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
