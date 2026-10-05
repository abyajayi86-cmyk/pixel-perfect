import { SectionHeading } from "./SectionHeading";
import { BRAND_VALUES } from "@/content/brand";

type ValueTile = (typeof BRAND_VALUES)[number];

const VALUES: ValueTile[] = BRAND_VALUES;

/**
 * Brand values placeholder section.
 *
 * Introduces the 6 Honeytots brand-board values as visual quick-info tiles on
 * the homepage. Each tile is deliberately short: a single tagline, no long
 * paragraphs.
 *
 * An amber notice is shown *above* the heading because the values-list
 * discrepancy (Phase 1 audit finding) between the draft copy on
 * /our-school/vision-values and the Honeytots brand board is being resolved
 * deliberately in Phase 8 Content + Brand Reconciliation. Until then, we
 * show the brand-board set clearly marked as DRAFT so no visitor can mistake
 * this for the final, school-confirmed version. The on-page banner itself
 * stays short and high-signal rather than explaining the divergence in
 * detail; the individual value tiles carry a soft "draft" badge too.
 */
export function ValuesPlaceholderSection() {
  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="container-page">
        <div
          role="note"
          className="mb-8 flex items-start gap-3 rounded-2xl border border-honey/40 bg-honey-soft px-4 py-3 text-sm text-navy-deep sm:text-base"
        >
          <span aria-hidden="true" className="mt-0.5 font-display font-extrabold tracking-wide">
            DRAFT
          </span>
          <p>
            These six values are taken from the Honeytots brand board. The school will review and
            confirm the final wording before the website is published publicly.
          </p>
        </div>

        <SectionHeading
          eyebrow="Our Values"
          title="Six principles that shape every day"
          intro="Small, consistent things build a happy school. These are the values we return to whenever we plan lessons, speak with children, or work alongside families."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.label}
                className="group relative flex min-h-36 items-start gap-4 rounded-[1.75rem] border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-navy/25 hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-soft text-navy transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-bold tracking-tight text-navy">
                      {value.label}
                    </h3>
                    <span
                      aria-label={`${value.label} — draft wording awaiting school confirmation`}
                      className="rounded-full border border-honey/40 bg-honey-soft px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy-deep"
                    >
                      Draft
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{value.tagline}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
