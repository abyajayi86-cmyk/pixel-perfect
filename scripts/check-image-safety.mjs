/**
 * Unit tests for the upload header sniffer.
 *
 * Run with:  node --experimental-strip-types scripts/check-image-safety.mjs
 *
 * `image-safety.ts` is deliberately dependency-free so it can be imported here
 * without a bundler. Only the first bytes of a file are ever trusted, so these
 * cases cover real headers and the obvious disguises.
 */
import { sniffImageType, maxImageKb } from "../src/lib/image-safety.ts";

const fail = [];
let passed = 0;

const bytes = (...values) => Uint8Array.from([...values, ...new Array(32).fill(0)]);

function expect(name, buffer, expected) {
  const got = sniffImageType(buffer);
  const gotExt = got ? got.ext : null;
  if (gotExt === expected) {
    passed += 1;
  } else {
    fail.push(`${name}: expected ${expected ?? "null"}, got ${gotExt ?? "null"}`);
  }
}

// Real headers.
expect("jpeg", bytes(0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10), "jpg");
expect("png", bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a), "png");
expect("gif87a", new Uint8Array([...Buffer.from("GIF87a"), ...new Array(32).fill(0)]), "gif");
expect("gif89a", new Uint8Array([...Buffer.from("GIF89a"), ...new Array(32).fill(0)]), "gif");
expect(
  "webp",
  new Uint8Array([
    ...Buffer.from("RIFF"),
    0,
    0,
    0,
    0,
    ...Buffer.from("WEBP"),
    ...new Array(32).fill(0),
  ]),
  "webp",
);
expect(
  "avif",
  new Uint8Array([0, 0, 0, 0, ...Buffer.from("ftypavif"), ...new Array(32).fill(0)]),
  "avif",
);

// Disguised or disallowed content.
expect(
  "html page",
  new Uint8Array([...Buffer.from("<!DOCTYPE html><html>"), ...new Array(32).fill(0)]),
  null,
);
expect(
  "svg (scriptable)",
  new Uint8Array([...Buffer.from("<svg xmlns="), ...new Array(32).fill(0)]),
  null,
);
expect("pdf", new Uint8Array([...Buffer.from("%PDF-1.7"), ...new Array(32).fill(0)]), null);
expect("zip", new Uint8Array([0x50, 0x4b, 0x03, 0x04, ...new Array(32).fill(0)]), null);
expect("empty", new Uint8Array(0), null);
expect("too short", new Uint8Array([0xff, 0xd8, 0xff]), null);
expect(
  "text named .jpg",
  new Uint8Array([...Buffer.from("not really an image"), ...new Array(32).fill(0)]),
  null,
);

// The size limit must be a sane, positive number of KB.
const kb = maxImageKb();
if (Number.isFinite(kb) && kb > 0) passed += 1;
else fail.push(`maxImageKb: expected a positive number, got ${kb}`);

if (fail.length) {
  for (const line of fail) console.error(`  FAIL  ${line}`);
  console.error(`\n${fail.length} upload check(s) failed.`);
  process.exit(1);
}
console.log(
  `  PASS  upload sniffer: ${passed} checks (jpeg/png/gif/webp/avif accepted, html/svg/pdf/zip rejected)`,
);
console.log(`\nAll ${passed} upload checks passed.`);
