import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Website editor | Honeytots School" },
      { name: "description", content: "Edit the Honeytots School website." },
      { property: "og:title", content: "Website editor | Honeytots School" },
      { property: "og:description", content: "Edit the Honeytots School website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

export function useMyRoles() {
  return useQuery({
    queryKey: ["my-roles"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user?.id ?? "");
      return { email: u.user?.email ?? "", roles: (data ?? []).map((r) => r.role as string) };
    },
  });
}

const tabs = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/site", label: "School details" },
  { to: "/admin/home", label: "Homepage" },
  { to: "/admin/pages", label: "Pages" },
  { to: "/admin/team", label: "Team" },
] as const;

function AdminLayout() {
  const { data, isLoading } = useMyRoles();
  const qc = useQueryClient();
  const navigate = useNavigate();
  async function signOut() {
    await qc.cancelQueries();
    qc.removeQueries({ queryKey: ["my-roles"] });
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  if (isLoading) return <p className="container-page py-16">Loading…</p>;
  const staff = data && data.roles.length > 0;
  const isAdmin = data?.roles.includes("admin");
  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Website editor</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{data?.email}</span>
          <button onClick={signOut} className="rounded-full border-2 border-navy/20 px-4 py-2 font-semibold">Sign out</button>
        </div>
      </div>
      {!staff ? (
        <p className="mt-8 rounded-2xl bg-honey-soft p-6">
          Your account does not have editing access yet. Ask the website admin to add your email on the Team page.
        </p>
      ) : (
        <>
          <nav aria-label="Editor sections" className="mt-6 flex flex-wrap gap-2 border-b pb-3">
            {tabs.filter((t) => t.to !== "/admin/team" || isAdmin).map((t) => (
              <Link key={t.to} to={t.to} activeOptions={{ exact: t.to === "/admin" }} className="rounded-full px-4 py-2 font-semibold" activeProps={{ className: "bg-navy text-cream" }}>
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8"><Outlet /></div>
        </>
      )}
    </div>
  );
}
