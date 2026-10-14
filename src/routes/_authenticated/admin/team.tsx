import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { inputCls } from "@/components/admin/cms-ui";
import { listTeam, setEditorAccess } from "@/lib/team.functions";

export const Route = createFileRoute("/_authenticated/admin/team")({ component: Team });

function Team() {
  const list = useServerFn(listTeam);
  const setAccess = useServerFn(setEditorAccess);
  const qc = useQueryClient();
  const { data, error } = useQuery({ queryKey: ["team"], queryFn: () => list() });
  const [email, setEmail] = useState("");

  async function change(target: string, grant: boolean) {
    const res = await setAccess({ data: { email: target, grant } });
    if ("error" in res) return toast.error(res.error);
    toast.success(grant ? "Editing access given." : "Editing access removed.");
    setEmail("");
    qc.invalidateQueries({ queryKey: ["team"] });
  }

  if (error) return <p className="text-destructive">{error.message}</p>;
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl">Team</h2>
      <p className="text-muted-foreground">
        Staff first create an account on the sign-in page. Then enter their email here to let them edit the website.
      </p>
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); change(email, true); }} className="flex flex-wrap items-end gap-3">
        <label className="flex-1 text-sm font-semibold">Staff email
          <input type="email" required className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className="min-h-11 rounded-full bg-navy px-6 font-semibold text-cream">Give editing access</button>
      </form>
      <ul className="divide-y rounded-2xl border">
        {(data ?? []).map((m) => (
          <li key={m.userId} className="flex flex-wrap items-center justify-between gap-2 p-4">
            <div>
              <div className="font-semibold">{m.email}</div>
              <div className="text-sm text-muted-foreground">
                {m.roles.includes("admin") ? "Admin" : m.roles.includes("editor") ? "Editor" : "No access"}
              </div>
            </div>
            {!m.roles.includes("admin") ? (
              m.roles.includes("editor") ? (
                <button onClick={() => change(m.email, false)} className="rounded-full border px-4 py-2 text-sm">Remove access</button>
              ) : (
                <button onClick={() => change(m.email, true)} className="rounded-full border px-4 py-2 text-sm">Give access</button>
              )
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
