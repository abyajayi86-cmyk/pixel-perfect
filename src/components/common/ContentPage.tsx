import { Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CircularFeature } from "./CircularFeature";
import { FAQAccordion } from "./FAQAccordion";
import { JourneyLine } from "./JourneyLine";
import type { JourneyLineTone } from "./JourneyLine";
import { JourneySteps } from "./JourneySteps";
import type { JourneyStepsTone } from "./JourneySteps";
import { PageHero } from "./PageHero";
import { QuickLinkGrid } from "./QuickLinkGrid";
import { RelatedPages } from "./RelatedPages";
import { CallToAction } from "./CallToAction";
import { BRAND_VALUES, LEARNING_STAGES } from "@/content/brand";
import type { FAQItem, JourneyStep } from "@/content/brand";
import { pageContent, pageAwaitingConfirmation } from "@/content/pages";
import { findNavSection, siteUrl, type NavLink } from "@/lib/site-config";
import type { ColourFamily } from "@/lib/family";
import type { Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/utils";

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
      { property: "og:url", content: siteUrl(path) },
      { property: "og:image", content: "/og-image-placeholder.svg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl(path) }],
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

      {content.heroJourneyLine ? (
        <div className="container-page">
          <JourneyLine tone={family as JourneyLineTone} density={16} depth={0.28} />
        </div>
      ) : null}

      <div className="container-page py-12 md:py-16">
        {pageAwaitingConfirmation(content) ? (
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
            {content.image ? (
              <figure>
                <img
                  src={content.image.src}
                  alt={content.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full max-w-3xl rounded-[2rem] object-cover shadow-[var(--shadow-lift)]"
                />
              </figure>
            ) : null}

            {content.learningStageCards ? (
              <section>
                <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                  {LEARNING_STAGES.map((stage) => (
                    <CircularFeature
                      key={stage.title}
                      image={stage.image}
                      alt=""
                      title={stage.title}
                      text={stage.text}
                      to={stage.to}
                      shape={stage.shape}
                      mediaHeight="aspect-[3/4]"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {content.brandValuesTiles ? (
              <section>
                {pageAwaitingConfirmation(content) ? (
                  <div
                    role="note"
                    className="mb-6 flex items-start gap-3 rounded-2xl border border-honey/40 bg-honey-soft px-4 py-3 text-sm text-navy-deep sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-display font-extrabold tracking-wide"
                    >
                      DRAFT
                    </span>
                    <p>
                      These six values are taken from the Honeytots brand board. The school will
                      review and confirm the final wording before the website is published publicly.
                    </p>
                  </div>
                ) : null}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {BRAND_VALUES.map((value) => {
                    const Icon = value.icon;
                    return (
                      <article
                        key={value.label}
                        className="group relative flex min-h-32 items-start gap-4 rounded-[1.75rem] border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[var(--shadow-lift)]"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-soft text-navy transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        >
                          <Icon className="size-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-bold tracking-tight text-navy">
                              {value.label}
                            </h3>
                            {pageAwaitingConfirmation(content) ? (
                              <span
                                aria-label={`${value.label} — draft wording awaiting school confirmation`}
                                className="rounded-full border border-honey/40 bg-honey-soft px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-navy-deep"
                              >
                                Draft
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1.5 leading-relaxed text-muted-foreground">
                            {value.tagline}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}

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

            {content.journeySteps && content.journeySteps.length > 0 ? (
              <section aria-label={`${content.title} journey`}>
                <JourneySteps
                  steps={content.journeySteps}
                  tone={(family as JourneyStepsTone) ?? "navy"}
                />
              </section>
            ) : null}

            {content.faqItems && content.faqItems.length > 0 ? (
              <section aria-label="Frequently asked questions">
                <h2 className="text-2xl md:text-3xl">Questions & answers</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Tap or click any question to open the answer.
                </p>
                <div className="mt-8">
                  <FAQAccordion
                    items={content.faqItems}
                    draftAwaitingSchool={pageAwaitingConfirmation(content)}
                  />
                </div>
              </section>
            ) : null}

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

      {content.related && content.related.length > 0 ? (
        <RelatedPages title="Related pages" items={content.related.slice(0, 8)} />
      ) : !isLanding && childLinks.length > 0 ? (
        <RelatedPages
          title={`More in ${section?.label ?? "this section"}`}
          items={childLinks.slice(0, 8)}
        />
      ) : null}
    </>
  );
}
