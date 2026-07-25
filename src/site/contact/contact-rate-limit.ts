/**
 * Limitation des envois du formulaire de contact.
 *
 * Production fiable : configurez UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 * Sans Redis distribué en production, aucune limite n'est appliquée (voir README contact).
 * En développement et tests : fenêtre glissante en mémoire (processus local uniquement).
 */

export const CONTACT_RATE_LIMIT_MESSAGE =
  "Trop de messages envoyés depuis cette adresse. Veuillez réessayer dans une heure.";

const DEFAULT_MAX = 5;
const DEFAULT_WINDOW_SEC = 3600;

type MemoryEntry = { count: number; resetAt: number };

const memoryStore = new Map<string, MemoryEntry>();

function readLimitConfig(): { max: number; windowSec: number } {
  const max = Number.parseInt(process.env.CONTACT_RATE_LIMIT_MAX ?? "", 10);
  const windowSec = Number.parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_SEC ?? "", 10);
  return {
    max: Number.isFinite(max) && max > 0 ? max : DEFAULT_MAX,
    windowSec: Number.isFinite(windowSec) && windowSec > 0 ? windowSec : DEFAULT_WINDOW_SEC,
  };
}

function hasUpstashConfig(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

export function getContactRateLimitClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

function checkMemoryRateLimit(key: string, max: number, windowSec: number): boolean {
  const now = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || entry.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return true;
  }
  if (entry.count >= max) {
    return false;
  }
  entry.count += 1;
  return true;
}

async function upstashCommand<T>(command: (string | number)[]): Promise<T> {
  const url = process.env.UPSTASH_REDIS_REST_URL!.trim().replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!.trim();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!response.ok) {
    throw new Error(`Upstash HTTP ${response.status}`);
  }
  const payload = (await response.json()) as { result: T };
  return payload.result;
}

async function checkUpstashRateLimit(
  key: string,
  max: number,
  windowSec: number,
): Promise<boolean> {
  const redisKey = `contact:rate:${key}`;
  const count = await upstashCommand<number>(["INCR", redisKey]);
  if (count === 1) {
    await upstashCommand<number>(["EXPIRE", redisKey, windowSec]);
  }
  return count <= max;
}

export type ContactRateLimitMode = "upstash" | "memory" | "disabled";

export function getContactRateLimitMode(): ContactRateLimitMode {
  if (hasUpstashConfig()) return "upstash";
  if (process.env.NODE_ENV !== "production") return "memory";
  return "disabled";
}

/**
 * @returns true si la requête peut continuer, false si la limite est dépassée.
 */
export async function isContactRateLimitAllowed(request: Request): Promise<boolean> {
  const { max, windowSec } = readLimitConfig();
  const clientKey = getContactRateLimitClientKey(request);
  const mode = getContactRateLimitMode();

  if (mode === "disabled") {
    return true;
  }

  if (mode === "upstash") {
    try {
      return await checkUpstashRateLimit(clientKey, max, windowSec);
    } catch {
      // Dégradé : autoriser l'envoi plutôt que bloquer le contact si Redis est indisponible.
      return true;
    }
  }

  return checkMemoryRateLimit(clientKey, max, windowSec);
}

/** Tests uniquement : réinitialise le store mémoire. */
export function resetContactRateLimitStoreForTests(): void {
  memoryStore.clear();
}
