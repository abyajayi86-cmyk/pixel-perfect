/**
 * Image type detection for CMS uploads.
 *
 * The browser-reported `File.type` and the file extension are both attacker
 * controlled, so the only trustworthy signal is the file's own header bytes.
 * Pure and dependency-free so it can be unit tested in plain Node.
 */

export type SniffedImage = {
  ext: "jpg" | "png" | "gif" | "webp" | "avif";
  mime: string;
  label: string;
};

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

/** Value for an <input type="file"> accept attribute. */
export const IMAGE_ACCEPT_ATTRIBUTE =
  "image/jpeg,image/png,image/webp,image/gif,image/avif,.jpg,.jpeg,.png,.webp,.gif,.avif";

const MIN_HEADER_BYTES = 16;

function ascii(bytes: Uint8Array, offset: number, length: number): string {
  let out = "";
  for (let i = offset; i < offset + length; i++) out += String.fromCharCode(bytes[i] ?? 0);
  return out;
}

function startsWithBytes(bytes: Uint8Array, signature: readonly number[], offset = 0): boolean {
  if (bytes.length < offset + signature.length) return false;
  return signature.every((byte, i) => bytes[offset + i] === byte);
}

const signatures: readonly { type: SniffedImage; test: (b: Uint8Array) => boolean }[] = [
  {
    type: { ext: "jpg", mime: "image/jpeg", label: "JPEG" },
    test: (b) => startsWithBytes(b, [0xff, 0xd8, 0xff]),
  },
  {
    type: { ext: "png", mime: "image/png", label: "PNG" },
    test: (b) => startsWithBytes(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  },
  {
    type: { ext: "gif", mime: "image/gif", label: "GIF" },
    test: (b) => ascii(b, 0, 6) === "GIF87a" || ascii(b, 0, 6) === "GIF89a",
  },
  {
    type: { ext: "webp", mime: "image/webp", label: "WebP" },
    test: (b) => ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP",
  },
  {
    type: { ext: "avif", mime: "image/avif", label: "AVIF" },
    test: (b) => ascii(b, 4, 4) === "ftyp" && ["avif", "avis"].includes(ascii(b, 8, 4)),
  },
];

/** Returns the detected image type, or null when the header bytes are not a known image. */
export function sniffImageType(bytes: Uint8Array): SniffedImage | null {
  if (bytes.length < MIN_HEADER_BYTES) return null;
  for (const { type, test } of signatures) if (test(bytes)) return type;
  return null;
}

/** Message shown to staff when a file is not an allowed image. */
export const UNSUPPORTED_IMAGE_MESSAGE =
  "That file is not a supported image. Please upload a JPEG, PNG, WebP, GIF or AVIF photo.";

/** Default upload ceiling: 5 MB. Kept in step with the storage bucket limit in migration 0002. */
export const DEFAULT_MAX_IMAGE_KB = 5120;

function envValue(name: string, fallbackName: string): string | undefined {
  const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
  const fromVite = meta.env?.[name];
  if (fromVite) return fromVite;
  if (typeof process !== "undefined" && process.env) return process.env[fallbackName];
  return undefined;
}

/** Configurable upload ceiling (set VITE_CMS_MAX_IMAGE_KB to change it). */
export function maxImageKb(): number {
  const parsed = Number(envValue("VITE_CMS_MAX_IMAGE_KB", "CMS_MAX_IMAGE_KB"));
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : DEFAULT_MAX_IMAGE_KB;
}

export function maxImageBytes(): number {
  return maxImageKb() * 1024;
}

export function maxImageLabel(): string {
  const kb = maxImageKb();
  return kb % 1024 === 0 ? `${kb / 1024} MB` : `${kb} KB`;
}

export function imageTooLargeMessage(): string {
  return `That photo is too large. Please upload an image smaller than ${maxImageLabel()}.`;
}
