import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/** Public read of all website content overrides. Never throws: the site falls back to built-in copy. */
export const getCmsEntries = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, unknown>> => {
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
      return Object.fromEntries(data.map((r) => [r.key, r.data]));
    } catch {
      return {};
    }
  },
);
