import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Ctx = { supabase: { rpc: (fn: "has_role", args: { _user_id: string; _role: "admin" }) => PromiseLike<{ data: boolean | null }> }; userId: string };

async function assertAdmin(context: Ctx) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!data) throw new Error("Only the website admin can manage the team.");
}

export type TeamMember = { userId: string; email: string; roles: string[] };

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    const map = new Map<string, string[]>();
    for (const r of roles ?? []) map.set(r.user_id, [...(map.get(r.user_id) ?? []), r.role]);
    return (users?.users ?? [])
      .map((u) => ({ userId: u.id, email: u.email ?? "", roles: map.get(u.id) ?? [] }))
      .sort((a, b) => b.roles.length - a.roles.length);
  });

export const setEditorAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ email: z.string().trim().email().max(255), grant: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    const user = users?.users.find((u) => u.email?.toLowerCase() === data.email.toLowerCase());
    if (!user) return { error: "No account with that email yet. Ask them to create one on the sign-in page first." };
    if (data.grant) {
      const { error } = await supabaseAdmin.from("user_roles").upsert({ user_id: user.id, role: "editor" }, { onConflict: "user_id,role" });
      if (error) return { error: error.message };
    } else {
      if (user.id === context.userId) return { error: "You cannot remove yourself." };
      await supabaseAdmin.from("user_roles").delete().eq("user_id", user.id).eq("role", "editor");
    }
    return { ok: true };
  });
