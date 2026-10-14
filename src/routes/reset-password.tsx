import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password | Honeytots School" },
      { name: "description", content: "Choose a new password for your Honeytots staff account." },
      { property: "og:title", content: "Set a new password | Honeytots School" },
      { property: "og:description", content: "Choose a new password for your staff account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Reset,
});

function Reset() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setError(error.message);
    navigate({ to: "/admin" });
  }
  return (
    <div className="container-page flex justify-center py-16">
      <form onSubmit={submit} className="card-surface w-full max-w-md space-y-4 p-8">
        <h1 className="text-3xl">Set a new password</h1>
        <label className="block text-sm font-semibold">
          New password
          <input className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </label>
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <button className="min-h-11 w-full rounded-full bg-navy px-6 py-3 font-semibold text-cream">Save password</button>
      </form>
    </div>
  );
}
