import { createFileRoute, Link } from "@tanstack/react-router";
import { mainNav } from "@/lib/site-config";
import { SimplePage, meta } from "@/lib/simple-page";

export const Route = createFileRoute("/sitemap")({
  head: () => meta("Sitemap", "Every page on the Honeytots School website."),
  component: () => (
    <SimplePage title="Sitemap" intro="Every page on our website in one place.">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {mainNav.map((s) => (
          <section key={s.label}>
            <h2 className="text-xl">
              <Link to={s.to} className="hover:underline">
                {s.label}
              </Link>
            </h2>
            <ul className="mt-3 space-y-2">
              {s.children?.map((c) => (
                <li key={c.to + c.label}>
                  <Link to={c.to} className="text-muted-foreground hover:underline">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SimplePage>
  ),
});
