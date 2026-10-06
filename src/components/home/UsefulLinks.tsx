import { Link } from "@tanstack/react-router";
import { CarouselItem } from "@/components/ui/carousel";
import { ButtonLink } from "@/components/common/Button";
import { CarouselRail } from "@/components/common/CarouselRail";
import { SectionHeading } from "@/components/common/SectionHeading";
import { usefulLinks } from "@/content/useful-links";
import { colourFamilies, familyStyles } from "@/lib/family";
import { cn } from "@/lib/utils";

/**
 * Homepage "Useful Links" — the seven one-or-two-click destinations from
 * AGENTS.md §7, presented as circular links on a horizontal rail.
 *
 * Routes come from `content/useful-links.ts`, which is mapped against the real
 * route map; nothing here invents a page. Confirmed photography can drop into
 * the data model later (`image` + `alt`); until then the circle shows the
 * link's icon on a family tint, so no stand-in photograph is ever implied.
 *
 * The rail swipes on touch, scrolls several abreast on desktop and exposes
 * labelled previous/next controls through `CarouselRail`. Each card keeps a
 * fixed circle size, so hover zoom and scroll states never shift the layout,
 * and the even/odd vertical stagger only applies from `lg` where the rail is
 * calm enough to carry it.
 */
export function UsefulLinks() {
  return (
    <section aria-label="Useful links" className="bg-cream-deep py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="For parents"
          title="Useful Links"
          intro="The pages families reach for most — each one is only a click or two away."
          action={
            <ButtonLink to="/parents" variant="secondary">
              Parent information
            </ButtonLink>
          }
        />

        <CarouselRail label="useful links" className="mt-9">
          {usefulLinks.map((link, index) => {
            const family = colourFamilies[index % colourFamilies.length] ?? "honey";
            const styles = familyStyles[family];
            const Icon = link.icon;
            return (
              <CarouselItem
                key={link.href}
                className="basis-[70%] even:lg:mt-10 sm:basis-[44%] md:basis-[31%] lg:basis-[21.5%]"
              >
                <Link
                  to={link.href}
                  className="interactive group flex h-full flex-col items-center rounded-[1.75rem] border border-border bg-card p-6 text-center hover:border-navy/25"
                >
                  <span
                    className={cn(
                      "flex size-28 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transition-none md:size-32",
                      styles.soft,
                      styles.text,
                    )}
                  >
                    {link.image ? (
                      <img
                        src={link.image}
                        alt={link.alt ?? ""}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <Icon aria-hidden="true" className="size-10" />
                    )}
                  </span>
                  <span className="mt-4 font-display text-lg font-bold text-navy">
                    {link.title}
                  </span>
                  {link.description ? (
                    <span className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {link.description}
                    </span>
                  ) : null}
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselRail>
      </div>
    </section>
  );
}
