/**
 * Small, dependency-free request helpers used by the public server functions.
 *
 * Everything here is in-memory and per server process: it is a genuine,
 * enforced throttle for a single instance, but it is NOT a distributed rate
 * limiter. Behind a load balancer or serverless platform each instance keeps
 * its own counters.
 */

type Window = { hits: number[] };

const windows = new Map<string, Window>();
const MAX_TRACKED_KEYS = 5000;

function prune(now: number, windowMs: number) {
  if (windows.size <= MAX_TRACKED_KEYS) return;
  for (const [key, entry] of windows) {
    entry.hits = entry.hits.filter((t) => now - t < windowMs);
    if (entry.hits.length === 0) windows.delete(key);
  }
}

/** Returns true (and records the hit) when the key is still inside its quota. */
export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = windows.get(key) ?? { hits: [] };
  entry.hits = entry.hits.filter((t) => now - t < windowMs);
  if (entry.hits.length >= limit) {
    windows.set(key, entry);
    return false;
  }
  entry.hits.push(now);
  windows.set(key, entry);
  prune(now, windowMs);
  return true;
}

/** True when this key was recorded within the window. Records nothing. */
export function seenRecently(key: string, windowMs: number): boolean {
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry) return false;
  entry.hits = entry.hits.filter((t) => now - t < windowMs);
  if (entry.hits.length === 0) windows.delete(key);
  return entry.hits.length > 0;
}

/** Records a key so a repeat within the window can be detected. */
export function remember(key: string, windowMs: number): void {
  const now = Date.now();
  const entry = windows.get(key) ?? { hits: [] };
  entry.hits.push(now);
  windows.set(key, entry);
}

/** Short stable hash so payload keys never store raw personal data. */
export function hashKey(value: string): string {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) hash = ((hash * 33) ^ value.charCodeAt(i)) >>> 0;
  return hash.toString(36);
}

/** Best-effort caller IP. Returns "unknown" when no proxy header is present. */
export async function clientIp(): Promise<string> {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const headers = request?.headers;
    if (!headers) return "unknown";
    const forwarded = headers.get("x-forwarded-for");
    const first = forwarded?.split(",")[0]?.trim();
    return first || headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Origin of the current request as seen by the browser (falls back to the
 * configured site origin). Used only for Supabase email redirect targets,
 * never echoed back to the client.
 */
export async function requestOrigin(): Promise<string> {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const origin = request?.headers.get("origin") ?? request?.headers.get("referer");
    if (origin) return new URL(origin).origin;
  } catch {
    /* fall through to the configured origin */
  }
  const { siteOrigin } = await import("@/lib/site-config");
  return siteOrigin;
}
