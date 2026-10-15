import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database, Json } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { validateCmsEntry } from "@/lib/cms.validation";

/**
 * Content editing overrides.
 *
 * Reads are public and never throw. Writes go through a server function so the
 * staff role is checked on the server (`is_staff`) and the payload is validated
 * against `cms.validation.ts` before it reaches the database. The database
 * enforces the same rule again with a trigger (migration 0002).
 */

type AuthContext = { supabase: SupabaseClient<Database>; userId: string };

async function assertStaff(context: AuthContext): Promise<void> {
  const { data, error } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
  if (error || !data)
    throw new Error(
      "You don't have permission to edit the website. Ask the website admin for editing access.",
    );
}

/** Public read of all website content overrides. Never throws: the site falls back to built-in copy. */
export const getCmsEntries = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, Json>> => {
    try {
      const url = process.env["SUPABASE_URL"];
      const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
      if (!url || !key) return {};
      const client = createClient<Database>(url, key, {
        auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        global: {
          fetch: (input, init) => {
            const h = new Headers(init?.headers);
            if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
              h.delete("Authorization");
            h.set("apikey", key);
            return fetch(input, { ...init, headers: h });
          },
        },
      });
      const { data, error } = await client.from("cms_entries").select("key, data");
      if (error || !data) return {};
      const out: Record<string, Json> = {};
      for (const row of data) {
        try {
          out[row.key] = validateCmsEntry(row.key, row.data, "read") as Json;
        } catch {
          // Stored value no longer matches the expected shape: keep the built-in copy.
        }
      }
      return out;
    } catch {
      return {};
    }
  },
);

/** Saves one content entry. Staff only. */
export const saveCmsEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ key: z.string().trim().min(1).max(120), data: z.unknown() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertStaff(context);
    let entry: unknown;
    try {
      entry = validateCmsEntry(data.key, data.data, "write");
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new Error(
          "Some of those details are not in the expected format, so nothing was saved. Please check the fields and try again.",
        );
      }
      throw err;
    }
    const { error } = await context.supabase.from("cms_entries").upsert({
      key: data.key,
      data: entry as Json,
      updated_at: new Date().toISOString(),
      updated_by: context.userId,
    });
    if (error) {
      console.error("cms save failed", error.message);
      throw new Error("We couldn't save that change. Please try again.");
    }
    return { ok: true };
  });

/** Removes one content entry, restoring the built-in copy. Staff only. */
export const resetCmsEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ key: z.string().trim().min(1).max(120) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertStaff(context);
    const { error } = await context.supabase.from("cms_entries").delete().eq("key", data.key);
    if (error) {
      console.error("cms reset failed", error.message);
      throw new Error("We couldn't restore the original content. Please try again.");
    }
    return { ok: true };
  });
