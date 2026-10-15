import { z } from "zod";
import { pageContent } from "@/content/pages";
import { siteOrigin } from "@/lib/site-config";

/**
 * Schema for everything staff can store in the `cms_entries` table.
 *
 * Two modes:
 *   - "write" → strict: images must come from this site or our own storage.
 *   - "read"  → lenient: only the URL *scheme* is checked, so an entry saved
 *               before this rule existed still renders instead of vanishing.
 *
 * Unknown object keys are stripped, which keeps a crafted payload from
 * overwriting settings the CMS does not expose (for example `domain` or
 * `social` in site-config.ts). The `site` schema is additionally strict so such
 * a payload is rejected outright instead of quietly ignored.
 */

export type CmsEntryMode = "read" | "write";

const MAX_URL_LENGTH = 500;

/** Total stored size ceiling, matching the database trigger in 0002. */
export const MAX_ENTRY_BYTES = 262144;

export const ENTRY_TOO_LARGE_MESSAGE =
  "This content is too large to save. Please shorten it and try again.";

function measuredBytes(value: unknown): number {
  try {
    return new TextEncoder().encode(JSON.stringify(value)).length;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

/** Keys of site-config.ts the "School details" editor is allowed to change. */
export const siteFieldKeys = [
  "name",
  "strapline",
  "motto",
  "tagline",
  "description",
  "address",
  "phone",
  "phoneSecondary",
  "whatsapp",
  "whatsappSecondary",
  "email",
  "openingHours",
] as const;

const pageKeyPattern = /^page:\/[a-z0-9][a-z0-9/-]*$/;

function supabaseOrigin(): string | null {
  let raw: string | undefined;
  if (typeof process !== "undefined" && process.env) raw = process.env["SUPABASE_URL"];
  if (!raw) {
    const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
    raw = meta.env?.["VITE_SUPABASE_URL"];
  }
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

/**
 * Allows: empty string, a site-relative path ("/photos/a.jpg"), or — in write
 * mode — an absolute https URL hosted by this site or our Supabase storage.
 * Rejects javascript:, data:, protocol-relative ("//evil.example/x.jpg") and
 * third-party hosts.
 */
export function isSafeImageUrl(value: string, mode: CmsEntryMode): boolean {
  if (value.length > MAX_URL_LENGTH) return false;
  if (value === "") return true;
  if (value.startsWith("//")) return false;
  if (value.startsWith("/")) return true;
  if (!/^https?:\/\//i.test(value)) return false;
  if (mode === "read") return true;
  try {
    const origin = new URL(value).origin;
    return origin === siteOrigin || origin === supabaseOrigin();
  } catch {
    return false;
  }
}

const familySchema = z.enum(["honey", "plum", "sky", "leaf", "coral"]);

const sitePathSchema = z
  .string()
  .max(200)
  .regex(/^\/[A-Za-z0-9\-/]*$/, { message: "Links must be a page path, for example /admissions." });

const actionSchema = z.object({ label: z.string().max(80), to: sitePathSchema });

function imageSchema(mode: CmsEntryMode) {
  return z
    .string()
    .max(MAX_URL_LENGTH)
    .refine((value) => isSafeImageUrl(value, mode), {
      message: "Use a photo uploaded here, or an address that starts with /.",
    });
}

const siteSchema = z
  .object(
    Object.fromEntries(siteFieldKeys.map((key) => [key, z.string().max(3000)])) as Record<
      (typeof siteFieldKeys)[number],
      z.ZodString
    >,
  )
  .partial()
  .strict();

function heroSchema(mode: CmsEntryMode) {
  return z.array(
    z.object({
      eyebrow: z.string().max(80),
      title: z.string().max(120),
      body: z.string().max(1200),
      image: imageSchema(mode),
      alt: z.string().max(300),
      family: familySchema,
      primaryAction: actionSchema.optional(),
      secondaryAction: actionSchema.optional(),
      imagePlaceholder: z.boolean().optional(),
    }),
  );
}

function homeSchema(mode: CmsEntryMode) {
  return z.object({
    heading: z.string().max(160),
    paragraphs: z.array(z.string().max(2000)).max(30),
    image: imageSchema(mode),
    alt: z.string().max(300),
  });
}

function pageSchema(mode: CmsEntryMode) {
  return z.object({
    title: z.string().max(160),
    intro: z.string().max(2000),
    sections: z
      .array(
        z.object({
          heading: z.string().max(200),
          body: z.array(z.string().max(4000)).max(40),
          list: z.array(z.string().max(300)).max(60).optional(),
        }),
      )
      .max(40),
    image: z.object({ src: imageSchema(mode), alt: z.string().max(300) }).optional(),
  });
}

function pagePath(key: string): string | null {
  return pageKeyPattern.test(key) ? key.slice("page:".length) : null;
}

/** True when the key is one the CMS understands. */
export function isKnownCmsKey(key: string): boolean {
  if (key === "site" || key === "home" || key === "hero") return true;
  const path = pagePath(key);
  return path !== null && Object.prototype.hasOwnProperty.call(pageContent, path);
}

/** Validates one entry. Throws a ZodError when the payload is not acceptable.
 * In write mode the key must also point at a page that still exists.
 */
export function validateCmsEntry(key: string, data: unknown, mode: CmsEntryMode): unknown {
  const entry = parseCmsEntry(key, data, mode);
  if (measuredBytes(entry) > MAX_ENTRY_BYTES) throw new Error(ENTRY_TOO_LARGE_MESSAGE);
  return entry;
}

function parseCmsEntry(key: string, data: unknown, mode: CmsEntryMode): unknown {
  if (key === "site") return siteSchema.parse(data);
  if (key === "home") return homeSchema(mode).parse(data);
  if (key === "hero") {
    const slides = heroSchema(mode).parse(data);
    if (slides.length === 0) throw new Error("A slideshow needs at least one slide.");
    return slides;
  }
  const path = pagePath(key);
  if (path === null) throw new Error("Unknown content key.");
  if (mode === "write" && !Object.prototype.hasOwnProperty.call(pageContent, path))
    throw new Error("Unknown page.");
  return pageSchema(mode).parse(data);
}
