/**
 * Security checks for the CMS / forms hardening.
 *
 * Run with:  node scripts/check-security.mjs
 *
 * These are static checks (no database, no network): they catch the mistakes we
 * actually made — an insecure first-admin trigger, over-long signed links,
 * browser writes straight to the content table, unchecked env vars and payloads
 * that reach the database without a schema.
 *
 * The behavioural unit tests for the upload header sniffer live in
 * scripts/check-image-safety.mjs (needs --experimental-strip-types).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const src = join(root, "src");
const read = (...parts) => readFileSync(join(root, ...parts), "utf8");

const fail = [];
const ok = [];

const check = (condition, passText, failText) => {
  if (condition) ok.push(passText);
  else fail.push(failText);
};

const contains = (haystack, needle) => haystack.includes(needle);

// --- 1. migrations ----------------------------------------------------------
const migration0000 = read("drizzle", "migrations", "0000_migration.sql");
const migration0001 = read("drizzle", "migrations", "0001_migration.sql");
const migration0002 = read("drizzle", "migrations", "0002_security_hardening.sql");

check(
  contains(migration0000, "contact_enquiries") && contains(migration0001, "assign_first_admin"),
  "migrations: 0000 and 0001 are present and unchanged in shape",
  "migrations: 0000/0001 do not look like the reviewed files — do not rewrite them, add a new migration",
);

const migration0002Lower = migration0002.toLowerCase();
check(
  contains(migration0002Lower, "drop trigger if exists on_auth_user_created_first_admin") &&
    contains(migration0002Lower, "drop function public.assign_first_admin"),
  "migrations: 0002 removes the insecure first-user-becomes-admin trigger",
  "migrations: 0002 does not remove the assign_first_admin trigger/function",
);

check(
  contains(migration0002, "bootstrap_first_admin"),
  "migrations: 0002 provides the service-role-only bootstrap_first_admin(uuid)",
  "migrations: 0002 is missing bootstrap_first_admin",
);

check(
  /revoke all on function public\.(is_staff|has_role)[\s\S]{0,160}?from public, anon/i.test(
    migration0002,
  ),
  "migrations: 0002 revokes PUBLIC/anon EXECUTE on has_role/is_staff",
  "migrations: 0002 does not revoke EXECUTE on has_role/is_staff",
);

check(
  contains(migration0002, "cms_entries_staff_validate") ||
    contains(migration0002, "validate_cms_entry"),
  "migrations: 0002 adds a database-level CMS payload validation trigger",
  "migrations: 0002 is missing the CMS validation trigger",
);

check(
  contains(migration0002, "'cms-media'") && contains(migration0002, "file_size_limit"),
  "migrations: 0002 creates/limits the public cms-media bucket",
  "migrations: 0002 does not configure the cms-media bucket",
);

check(
  contains(migration0002, "lower(name) ~ '\\.(jpg|jpeg|png|webp|gif|avif)$'"),
  "migrations: 0002 restricts uploads to real image extensions (no '.jpg' LIKE shortcut)",
  "migrations: 0002 image extension rule has drifted from the reviewed pattern",
);

check(
  !/lower\(name\) like '%\.jpg'/i.test(migration0002),
  "migrations: 0002 has no single-extension LIKE filter left over",
  "migrations: 0002 still contains a LIKE '%.jpg' filter that only allows JPEG files",
);

const journal = JSON.parse(read("drizzle", "migrations", "meta", "_journal.json"));
check(
  journal.entries.some((entry) => entry.tag === "0002_security_hardening"),
  "migrations: journal lists 0002_security_hardening",
  "migrations: meta/_journal.json does not list 0002_security_hardening",
);

// --- 2. no expiring/long-lived media links ----------------------------------
const cmsUi = read("src", "components", "admin", "cms-ui.tsx");
check(
  !contains(cmsUi, "createSignedUrl") && !contains(cmsUi, "365 * 10"),
  "uploads: cms-ui uses permanent public URLs (no 10-year signed URL)",
  "uploads: cms-ui still requests a long-lived signed URL",
);
check(
  contains(cmsUi, "sniffImageType") && contains(cmsUi, "maxImageBytes"),
  "uploads: cms-ui checks the file header and the size limit before uploading",
  "uploads: cms-ui uploads without sniffing the file header or checking the size",
);
check(
  contains(cmsUi, "upsert: false"),
  "uploads: cms-ui never overwrites an existing object",
  "uploads: cms-ui upload may overwrite an existing object",
);

// --- 3. browser must not write content directly -----------------------------
check(
  !contains(cmsUi, '.from("cms_entries")'),
  "cms: the editor no longer writes to cms_entries from the browser",
  "cms: the editor still writes to cms_entries from the browser",
);

const cmsFunctions = read("src", "lib", "cms.functions.ts");
check(
  contains(cmsFunctions, "saveCmsEntry") &&
    contains(cmsFunctions, "resetCmsEntry") &&
    contains(cmsFunctions, 'rpc("is_staff"') &&
    contains(cmsFunctions, "validateCmsEntry"),
  "cms: writes go through server functions that re-check is_staff and validate the payload",
  "cms: server functions are missing the staff check or payload validation",
);
check(
  contains(cmsFunctions, 'validateCmsEntry(row.key, row.data, "read")') ||
    contains(cmsFunctions, "validateCmsEntry(row.key, row.data, 'read')"),
  "cms: reads are normalised and fall back to built-in copy",
  "cms: reads are returned straight from the database without normalising",
);

const cmsValidation = read("src", "lib", "cms.validation.ts");
check(
  contains(cmsValidation, "siteOrigin") && contains(cmsValidation, "supabaseOrigin"),
  "cms: image links are limited to this site and our own storage",
  "cms: image link rules do not pin the allowed origins",
);
check(
  contains(cmsValidation, ".strict()"),
  "cms: the school-details payload rejects unknown keys (cannot overwrite domain/social settings)",
  "cms: the site payload does not reject unknown keys",
);
check(
  contains(cmsValidation, "MAX_ENTRY_BYTES = 262144") && contains(migration0002, "262144"),
  "cms: the server-side size limit matches the database trigger",
  "cms: the server-side size limit has drifted from the database trigger",
);

// --- 4. public forms --------------------------------------------------------
const forms = read("src", "lib", "forms.functions.ts");
check(
  !contains(forms, 'process.env["SUPABASE_URL"]!') &&
    !contains(forms, 'process.env["SUPABASE_PUBLISHABLE_KEY"]!'),
  "forms: missing configuration fails with a friendly message instead of a crash",
  "forms: forms.functions.ts still asserts its env vars with a non-null assertion",
);
check(
  contains(forms, ".strict()"),
  "forms: form payloads use strict schemas",
  "forms: form payloads are not strict",
);
check(
  contains(forms, "clientIp") && contains(forms, "allow(") && contains(forms, "seenRecently"),
  "forms: submissions are throttled per IP and de-duplicated",
  "forms: submissions are not throttled or de-duplicated",
);
check(
  contains(forms, "honeypot") && !contains(forms, "z.string().max(0)"),
  "forms: the honeypot returns a silent success and never reaches the database",
  "forms: the honeypot still relies on a max(0) validation error",
);

// --- 5. assistant ----------------------------------------------------------
const ask = read("src", "lib", "ask.functions.ts");
check(
  contains(ask, "clientIp") && contains(ask, "allow("),
  "assistant: the LLM endpoint is throttled per IP",
  "assistant: the LLM endpoint is unthrottled",
);

// --- 6. team management -----------------------------------------------------
const team = read("src", "lib", "team.functions.ts");
check(
  !contains(team, "error: error.message"),
  "team: database error text is not returned to the browser",
  "team: raw database error messages are still returned to the browser",
);
check(
  contains(team, "inviteUserByEmail") && contains(team, "assertAdmin"),
  "team: invites are admin-only and grant the editor role explicitly",
  "team: invite flow is missing or does not check for admin",
);

// --- 7. no service-role key in the client bundle ----------------------------
const sourceFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(entry)) sourceFiles.push(full);
  }
})(src);

const serviceRoleOffenders = sourceFiles
  .filter((file) => !file.endsWith("client.server.ts"))
  .filter((file) => /SUPABASE_SERVICE_ROLE_KEY|service_role/.test(readFileSync(file, "utf8")))
  .map((file) => relative(root, file));

check(
  serviceRoleOffenders.length === 0,
  "secrets: the service-role key is referenced only in client.server.ts",
  `secrets: service-role key referenced outside client.server.ts → ${serviceRoleOffenders.join(", ")}`,
);

const serverImports = sourceFiles
  .filter((file) => !file.endsWith("client.server.ts"))
  .filter((file) =>
    /import\(\s*["'][^"']*client\.server["']|from\s+["'][^"']*client\.server["']/.test(
      readFileSync(file, "utf8")
        .split("\n")
        .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
        .join("\n"),
    ),
  )
  .map((file) => relative(root, file));
const badServerImports = serverImports.filter((file) => !file.endsWith("team.functions.ts"));
check(
  badServerImports.length === 0,
  "secrets: the service-role client is imported only from the admin-only team functions",
  `secrets: the service-role client is imported from unexpected files → ${badServerImports.join(", ")}`,
);

// --- 8. .env must not carry secrets ----------------------------------------
let envNames = [];
try {
  envNames = read(".env")
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .map((line) => line.split("=")[0].trim());
} catch {
  // .env is not committed in every checkout.
}
const secretishEnv = envNames.filter((name) => /SERVICE_ROLE|SECRET|PRIVATE|PASSWORD/i.test(name));
check(
  secretishEnv.length === 0,
  "secrets: .env contains publishable keys only",
  `secrets: .env appears to contain secret variables → ${secretishEnv.join(", ")}`,
);

// --- 9. site details stay in step with the schema ---------------------------
const siteConfig = read("src", "lib", "site-config.ts");
check(
  siteConfig.includes('facebook: "https://www.facebook.com/honeytotsschoollagos"'),
  "content: the school-confirmed Facebook page URL is published",
  "content: the school-confirmed Facebook page URL is missing or changed",
);

const cms = read("src", "lib", "cms.ts");
const editableKeys = [...cms.matchAll(/\{\s*key:\s*"([A-Za-z]+)"/g)].map((m) => m[1]).sort();
const schemaKeys = [...cmsValidation.matchAll(/^\s{2}"([A-Za-z]+)",$/gm)].map((m) => m[1]).sort();
check(
  editableKeys.length > 0 && editableKeys.join(",") === schemaKeys.join(","),
  "cms: the editable site fields and the validation schema list the same keys",
  `cms: editable fields (${editableKeys.join(",")}) and schema keys (${schemaKeys.join(",")}) disagree`,
);

// --- report -----------------------------------------------------------------
for (const line of ok) console.log(`  PASS  ${line}`);
if (fail.length) {
  for (const line of fail) console.error(`  FAIL  ${line}`);
  console.error(`\n${fail.length} security check(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${ok.length} security checks passed.`);
