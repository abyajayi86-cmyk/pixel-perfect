import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/**
 * Horizontal rail built on the existing Embla carousel (`ui/carousel`).
 *
 * Used by the homepage sections that hold more items than fit comfortably at
 * once — Useful Links, Latest News and Upcoming Events — so each of them
 * swipes on touch, scrolls several abreast on desktop and exposes the same
 * accessible controls.
 *
 * Controls sit inside the carousel region (not absolutely positioned over the
 * slides) so they never overlap content, cannot cause layout shift, and receive
 * the region's arrow-key handler. Both buttons disable at the ends, the region
 * is named for assistive technology, and the Embla animation is dropped to
 * `duration: 0` whenever the visitor prefers reduced motion — the global CSS
 * only governs CSS transitions, not the library's JavaScript animation.
 *
 * Fixed control sizes and `min-w-0` slides keep the rail from reflowing while
 * it initialises.
 */
export function CarouselRail({
  label,
  children,
  className,
}: {
  /** Accessible name for the carousel region, e.g. "useful links". */
  label: string;
  /** `CarouselItem` children; set each item's width with its own className. */
  children: ReactNode;
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: false, duration: reducedMotion ? 0 : 25 }}
      aria-label={label}
      className={cn("w-full", className)}
    >
      <CarouselContent>{children}</CarouselContent>

      <div className="mt-6 flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label={`Previous ${label}`}
          className="interactive inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-navy/20 bg-card text-navy hover:-translate-y-0.5 hover:border-navy/40 disabled:pointer-events-none disabled:opacity-45 disabled:hover:translate-y-0"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          aria-label={`Next ${label}`}
          className="interactive inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-navy/20 bg-card text-navy hover:-translate-y-0.5 hover:border-navy/40 disabled:pointer-events-none disabled:opacity-45 disabled:hover:translate-y-0"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </Carousel>
  );
}
