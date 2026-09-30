import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { familyStyles, type ColourFamily } from "@/lib/family";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  family?: ColourFamily;
  crumbs: Crumb[];
};

/**
 * Inner-page hero. A cream band with soft circular decoration that resolves
 * into the page body through a curved edge, so inner pages share the home
 * page's visual language without needing a full-bleed image.
 */
export function PageHero({ eyebrow, title, intro, family = "honey", crumbs }: PageHeroProps) {
  const styles = familyStyles[family];

  return (
    <header className="relative overflow-hidden bg-cream-deep">
      {/* Decorative circles — aria-hidden via empty spans with no text. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-28 -top-40 hidden size-[30rem] rounded-full opacity-70 md:block",
          styles.soft,
        )}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-[8%] hidden size-56 rounded-full border-[2.5rem] opacity-60 lg:block"
        style={{ borderColor: "color-mix(in oklab, var(--color-honey) 40%, transparent)" }}
      />

      <div className="container-page relative py-10 md:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-7 max-w-3xl">
          {eyebrow ? <p className={cn("eyebrow", styles.text)}>{eyebrow}</p> : null}
          <h1 className="mt-3 text-3xl leading-tight md:text-5xl">{title}</h1>
          {intro ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
          ) : null}
          <div className={cn("mt-8 h-1.5 w-24 rounded-full", styles.bar)} />
        </div>
      </div>

      {/* Curve from the hero band into the page body. */}
      <div aria-hidden="true" className="relative h-8 leading-[0] md:h-12">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-full w-full">
          <path
            d="M0 100V46c180-26 380-40 600-40s420 14 600 40 240 26 240 26V100Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>
    </header>
  );
}
