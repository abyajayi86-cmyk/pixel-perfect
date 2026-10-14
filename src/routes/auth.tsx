import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff sign in | Honeytots School" },
      { name: "description", content: "Sign in for Honeytots staff who edit the school website." },
      { property: "og:title", content: "Staff sign in | Honeytots School" },
      { property: "og:description", content: "Sign in for Honeytots website editors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const input = "mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-base";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        setMsg({ ok: true, text: "Check your email to confirm your account, then sign in. The website admin must give you editing access." });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        setMsg({ ok: true, text: "If that email has an account, a reset link is on its way." });
      }
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-page flex justify-center py-16">
      <form onSubmit={submit} className="card-surface w-full max-w-md space-y-4 p-8">
        <h1 className="text-3xl">
          {mode === "in" ? "Staff sign in" : mode === "up" ? "Create staff account" : "Reset password"}
        </h1>
        <p className="text-sm text-muted-foreground">For Honeytots staff who edit the website.</p>
        <label className="block text-sm font-semibold">
          Email
          <input className={input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        {mode !== "forgot" ? (
          <label className="block text-sm font-semibold">
            Password
            <input className={input} type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "in" ? "current-password" : "new-password"} />
          </label>
        ) : null}
        {msg ? (
          <p role={msg.ok ? "status" : "alert"} className={msg.ok ? "rounded-xl bg-leaf-soft p-3 text-sm" : "rounded-xl bg-coral-soft p-3 text-sm"}>
            {msg.text}
          </p>
        ) : null}
        <button disabled={busy} className="min-h-11 w-full rounded-full bg-navy px-6 py-3 font-semibold text-cream disabled:opacity-60">
          {busy ? "Please wait…" : mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Send reset link"}
        </button>
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          {mode !== "in" ? <button type="button" className="underline" onClick={() => setMode("in")}>Back to sign in</button> : (
            <>
              <button type="button" className="underline" onClick={() => setMode("up")}>Create an account</button>
              <button type="button" className="underline" onClick={() => setMode("forgot")}>Forgot password?</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
