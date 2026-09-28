import { Info } from "lucide-react";
import { PageHero } from "./PageHero";
import { QuickLinkGrid } from "./QuickLinkGrid";
import { RelatedPages } from "./RelatedPages";
import { CallToAction } from "./CallToAction";
import { pageContent } from "@/content/pages";
import { mainNav, type NavLink } from "@/lib/site-config";
import type { ColourFamily } from "@/lib/family";
import type { Crumb } from "./Breadcrumbs";

function findSection(path: string) {
  return (
    mainNav.find((section) => section.children?.some((child) => child.to === path)) ??
    mainNav.find((section) => section.to !== "/" && path.startsWith(section.to))
  );
}

export function pageMeta(path: string) {
  const content = pageContent[path];
  if (!content) return { title: "Honeytots School", description: "" };
  const title = `${content.title} | Honeytots School`;
  const description = content.intro;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function ContentPage({ path }: { path: string }) {
  const content = pageContent[path];
  if (!content) return null;

  const section = findSection(path);
  const family = (section?.family ?? "honey") as ColourFamily;
  const isLanding = section?.to === path;

  const crumbs: Crumb[] = [];
  if (section && section.to !== path) crumbs.push({ label: section.label, to: section.to });
  crumbs.push({ label: content.title });

  const childLinks: NavLink[] = section?.children?.filter((child) => child.to !== path) ?? [];

  return (
    <>
      <PageHero
        {...(content.eyebrow ? { eyebrow: content.eyebrow } : {})}
        title={content.title}
        intro={content.intro}
        family={family}
        crumbs={crumbs}
      />

      <div className="container-page py-12 md:py-16">
        {content.awaitingConfirmation ? (
          <p className="mb-8 flex items-start gap-3 rounded-2xl bg-honey-soft px-5 py-4 text-sm">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              This page contains draft placeholder text. Final wording will be provided by Honeytots School.
            </span>
          </p>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-3xl space-y-10">
            {content.sections.map((block) => (
              <section key={block.heading}>
                <h2 className="text-2xl md:text-3xl">{block.heading}</h2>
                {block.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {paragraph}
                  </p>
                ))}
                {block.list ? (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {block.list.map((item) => (
                      <li key={item} className="rounded-2xl bg-surface-muted px-4 py-3 text-sm font-semibold">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {childLinks.length > 0 ? (
            <aside className="card-surface h-fit p-5">
              <h2 className="text-lg">In this section</h2>
              <ul className="mt-4 space-y-1">
                {childLinks.map((child) => (
                  <li key={child.to + child.label}>
                    <a
                      href={child.to}
                      className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold hover:bg-cream"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        {isLanding && childLinks.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl">Explore {content.title}</h2>
            <div className="mt-6">
              <QuickLinkGrid items={childLinks.map((c) => ({ ...c, family }))} columns={3} />
            </div>
          </div>
        ) : null}
      </div>

      <CallToAction
        title="Come and see Honeytots for yourself"
        intro="The best way to understand our school is to visit. We would be glad to welcome you."
        primary={{ label: "Book a Visit", to: "/book-a-visit" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />

      {!isLanding && childLinks.length > 0 ? (
        <RelatedPages title={`More in ${section?.label ?? "this section"}`} items={childLinks.slice(0, 6)} />
      ) : null}
    </>
  );
}
