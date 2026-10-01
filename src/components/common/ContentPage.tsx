import { Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { QuickLinkGrid } from "./QuickLinkGrid";
import { RelatedPages } from "./RelatedPages";
import { CallToAction } from "./CallToAction";
import { pageContent } from "@/content/pages";
import { findNavSection, type NavLink } from "@/lib/site-config";
import type { ColourFamily } from "@/lib/family";
import type { Crumb } from "./Breadcrumbs";

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

/**
 * Renders any page described in `src/content/pages.ts`. Every content page in
 * Phase One uses this, so restyling happens here rather than page by page.
 *
 * `appendBody` is rendered at the end of the main content column, after the
 * sections defined in pages.ts. It is used by pages that want to keep the
 * standard hero/awaiting-banner/CTA chrome but inject shared data-driven
 * components (e.g. the policy list on /policies).
 */
export function ContentPage({
  path,
  appendBody,
}: {
  path: string;
  appendBody?: ReactNode | undefined;
}) {
  const content = pageContent[path];
  if (!content) return null;

  const section = findNavSection(path);
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
          <p className="mb-8 flex items-start gap-3 rounded-[1.5rem] bg-honey-soft px-5 py-4 text-sm text-navy-deep">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              This page contains draft placeholder text. Final wording will be provided by Honeytots
              School.
            </span>
          </p>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="max-w-3xl space-y-12">
            {content.sections.map((block) => (
              <section key={block.heading}>
                <h2 className="text-2xl md:text-3xl">{block.heading}</h2>
                {block.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
                {block.list ? (
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {block.list.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-cream-deep px-4 py-2 text-sm font-semibold text-navy"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            {appendBody}
          </div>

          {childLinks.length > 0 ? (
            <aside className="h-fit rounded-[2rem] bg-cream-deep p-6 lg:sticky lg:top-28">
              <h2 className="text-lg">In this section</h2>
              <ul className="mt-4 space-y-1">
                {childLinks.map((child) => (
                  <li key={child.to + child.label}>
                    <Link
                      to={child.to}
                      className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-navy transition-colors hover:bg-card"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        {isLanding && childLinks.length > 0 ? (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl">Explore {content.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Jump straight to the information parents ask for most.
            </p>
            <div className="mt-7">
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
        <RelatedPages
          title={`More in ${section?.label ?? "this section"}`}
          items={childLinks.slice(0, 8)}
        />
      ) : null}
    </>
  );
}
