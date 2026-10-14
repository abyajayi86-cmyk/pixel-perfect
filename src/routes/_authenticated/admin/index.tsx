import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Overview });

const cards = [
  { to: "/admin/site", title: "School details", text: "Name, motto, phone numbers, email, address and office hours." },
  { to: "/admin/home", title: "Homepage", text: "Slideshow photos and words, and the welcome section." },
  { to: "/admin/pages", title: "Pages", text: "Titles, introductions, photos and text on every inside page." },
] as const;

function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <Link key={c.to} to={c.to} className="card-surface block p-6 hover:shadow-lg">
          <h2 className="text-xl">{c.title}</h2>
          <p className="mt-2 text-muted-foreground">{c.text}</p>
        </Link>
      ))}
      <p className="text-sm text-muted-foreground md:col-span-3">
        Changes appear on the website as soon as you press Save. “Restore original” undoes your edits for that item.
      </p>
    </div>
  );
}
