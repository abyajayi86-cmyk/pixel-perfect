import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requestOrigin } from "@/lib/server-request";

/**
 * Team management. Every function here requires a signed-in admin and uses the
 * service-role client (imported lazily inside the handler) for the admin API.
 */

type Ctx = {
  supabase: {
    rpc: (
      fn: "has_role",
      args: { _user_id: string; _role: "admin" },
    ) => PromiseLike<{ data: boolean | null }>;
  };
  userId: string;
};

async function assertAdmin(context: Ctx) {
  const { data } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!data) throw new Error("Only the website admin can manage the team.");
}

export type TeamMember = { userId: string; email: string; roles: string[] };

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");
    const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 200,
    });
    if (rolesError || usersError || !users) {
      console.error("team list failed", rolesError?.message ?? usersError?.message ?? "no users");
      throw new Error("We couldn't load the team list. Please refresh and try again.");
    }
    const map = new Map<string, string[]>();
    for (const r of roles ?? []) map.set(r.user_id, [...(map.get(r.user_id) ?? []), r.role]);
    return users.users
      .map((u) => ({ userId: u.id, email: u.email ?? "", roles: map.get(u.id) ?? [] }))
      .sort((a, b) => b.roles.length - a.roles.length);
  });

const emailSchema = z.string().trim().toLowerCase().email().max(255);

export const setEditorAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ email: emailSchema, grant: z.boolean() }).strict().parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    const user = users?.users.find((u) => u.email?.toLowerCase() === data.email);
    if (!user)
      return {
        error: "No account with that email yet. Ask them to create one on the sign-in page first.",
      };
    if (data.grant) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: user.id, role: "editor" }, { onConflict: "user_id,role" });
      if (error) {
        console.error("grant editor failed", error.message);
        return { error: "We couldn't give editing access. Please try again." };
      }
    } else {
      if (user.id === context.userId) return { error: "You cannot remove yourself." };
      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", user.id)
        .eq("role", "editor");
      if (error) {
        console.error("remove editor failed", error.message);
        return { error: "We couldn't remove editing access. Please try again." };
      }
    }
    return { ok: true };
  });

/**
 * Invites a staff member by email and grants editing access in one step.
 *
 * The invite link sends them to the password page so they can choose a password
 * before signing in. A brand new account can never become an admin this way.
 */
export const inviteStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ email: emailSchema }).strict().parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    if (existing?.users.some((u) => u.email?.toLowerCase() === data.email))
      return {
        error:
          "That email already has an account. Use “Give editing access” in the list below instead.",
      };

    const origin = await requestOrigin();
    const { data: invited, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(data.email, {
      redirectTo: `${origin}/reset-password`,
    });
    if (error || !invited?.user) {
      console.error("invite failed", error?.message);
      return {
        error: "We couldn't send the invite. Please check the email address and try again.",
      };
    }

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: invited.user.id, role: "editor" }, { onConflict: "user_id,role" });
    if (roleError) {
      console.error("invite role failed", roleError.message);
      return {
        error:
          "The invite was sent, but editing access could not be set up. Please use “Give access” below.",
      };
    }
    return { ok: true };
  });
