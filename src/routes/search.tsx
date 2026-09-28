import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { mainNav } from "@/lib/site-config";
import { controlClass } from "@/components/common/FormField";
import { SimplePage, meta } from "@/lib/simple-page";

const pages = mainNav.flatMap((s) => [{ label: s.label, to: s.to, description: "" }, ...(s.children ?? []).map((c) => ({ label: c.label, to: c.to, description: c.description ?? "" }))]);

export const Route = createFileRoute("/search")({
  head: () => meta("Search", "Search the Honeytots School website."),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const results = term ? pages.filter((p) => (p.label + " " + p.description).toLowerCase().includes(term)) : [];
  return (
    <SimplePage title="Search" intro="Find information quickly across our website.">
      <label htmlFor="site-search" className="font-semibold">Search for a page</label>
      <input id="site-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. fees, uniform, term dates" className={`${controlClass} mt-2 max-w-xl`} />
      <ul className="mt-8 max-w-2xl space-y-3">
        {results.map((r) => (
          <li key={r.to + r.label} className="card-surface p-4">
            <Link to={r.to} className="font-semibold hover:underline">{r.label}</Link>
            {r.description ? <p className="text-sm text-muted-foreground">{r.description}</p> : null}
          </li>
        ))}
        {term && results.length === 0 ? <li className="text-muted-foreground">No pages matched "{q}".</li> : null}
      </ul>
    </SimplePage>
  );
}
