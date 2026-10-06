import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/common/Button";
import { heroSlides, type HeroSlide } from "@/content/hero-slides";
import { familyStyles, type ColourFamily } from "@/lib/family";
import { cn } from "@/lib/utils";

/** Milliseconds between automatic advances. */
const AUTOPLAY_MS = 7000;

const controlButton =
  "inline-flex size-12 items-center justify-center rounded-full border-2 border-cream/45 text-cream transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-cream hover:text-navy-deep active:translate-y-0 active:bg-cream/80 motion-reduce:transform-none motion-reduce:transition-none";

/**
 * Full-width home hero carousel.
 *
 * Behaviour:
 *  - seven slides, looping
 *  - autoplay, with an always-available pause/play control (WCAG 2.2.2)
 *  - autoplay also stops on hover and while focus is inside the carousel, so it
 *    can never swap a slide out from under someone who is reading it
 *  - previous / next buttons, touch drag
 *  - left and right arrow keys when the carousel has focus
 *  - honours `prefers-reduced-motion`: no automatic movement, no transitions
 *  - only the first two images load eagerly; the rest lazy-load
 *
 * There are deliberately no numbered slide indicators. Previous/next, the
 * pause/play control, swipe and the arrow keys all still work, and each slide
 * announces its own position to assistive technology.
 *
 * Non-selected slides are marked `inert`, which keeps their links out of the tab
 * order and out of the accessibility tree without hiding them visually during the
 * transition.
 */
export function HeroCarousel({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(slides.length);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  /**
   * Calm first paint: the hero renders statically (no slide transition, no
   * autoplay) until the second animation frame after the carousel is ready, so
   * slide one never swivels in on mount or races straight into slide two.
   */
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const readyFrameRef = useRef<number>(0);

  // Respect the operating-system reduced-motion preference.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const frameOne = window.requestAnimationFrame(() => {
      const frameTwo = window.requestAnimationFrame(() => setReady(true));
      readyFrameRef.current = frameTwo;
    });
    readyFrameRef.current = frameOne;
    return () => window.cancelAnimationFrame(readyFrameRef.current);
  }, [emblaApi]);

  const autoplay = !paused && !reducedMotion && !engaged;
  const runAutoplay = ready && autoplay;

  useEffect(() => {
    if (!emblaApi || !runAutoplay) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [emblaApi, runAutoplay]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  const total = slides.length;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Welcome to Honeytots School"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setEngaged(false);
      }}
      className="on-navy relative isolate overflow-hidden bg-navy-deep"
    >
      <div ref={emblaRef} className="overflow-hidden" tabIndex={0} onKeyDown={onKeyDown}>
        <div className="flex">
          {slides.map((slide, index) => (
            <Slide
              key={slide.title}
              slide={slide}
              index={index}
              total={total}
              isSelected={index === selected}
              ready={ready}
            />
          ))}
        </div>
      </div>

      {/*
        Controls sit inside the hero, along its bottom edge.
        Deliberately no numbered indicators: the slide position is conveyed
        through the previous/next/pause controls and the content itself. All
        carousel behaviour (autoplay, loop, swipe, keyboard, reduced motion) is
        unchanged.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="container-page flex items-center justify-between gap-4 pb-5 md:pb-7">
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className={controlButton}
              aria-label="Previous slide"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className={controlButton}
              aria-label="Next slide"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className={controlButton}
              aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={!autoplay}
            >
              {autoplay ? (
                <Pause aria-hidden="true" className="size-5" />
              ) : (
                <Play aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({
  slide,
  index,
  total,
  isSelected,
  ready,
}: {
  slide: HeroSlide;
  index: number;
  total: number;
  isSelected: boolean;
  ready: boolean;
}) {
  const styles = familyStyles[slide.family as ColourFamily];
  /*
   * Only the first slide carries the page's <h1>. The remaining slides use <h2>
   * so the document has a single top-level heading, even though the carousel can
   * be navigated. `inert` keeps the hidden slides out of the accessibility tree
   * and the tab order until their turn.
   */
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      className="relative min-w-0 flex-[0_0_100%]"
    >
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.alt}
          loading={index < 2 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover object-[50%_32%] sm:object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/75 to-navy-deep/30 sm:from-navy-deep/90 sm:via-navy-deep/65"
          aria-hidden="true"
        />
      </div>

      <div className="container-page relative flex min-h-[560px] items-center pb-24 pt-32 sm:min-h-[640px] lg:min-h-[720px]">
        <div
          inert={isSelected ? undefined : true}
          className={cn(
            "max-w-2xl",
            ready
              ? "transition-all duration-500 ease-out motion-reduce:transition-none"
              : "transition-none",
            isSelected ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <p className={cn("eyebrow", styles.text)}>{slide.eyebrow}</p>
          <Heading className="mt-4 text-4xl leading-[1.06] text-cream sm:text-5xl lg:text-6xl">
            {slide.title}
          </Heading>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{slide.body}</p>

          {slide.imagePlaceholder ? (
            <p className="mt-4 inline-block rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-cream/75">
              Placeholder image &mdash; photograph to follow
            </p>
          ) : null}

          {slide.primaryAction || slide.secondaryAction ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {slide.primaryAction ? (
                <ButtonLink to={slide.primaryAction.to} variant="onNavy" size="lg">
                  {slide.primaryAction.label}
                </ButtonLink>
              ) : null}
              {slide.secondaryAction ? (
                <ButtonLink
                  to={slide.secondaryAction.to}
                  size="lg"
                  className="border-2 border-cream/40 text-cream hover:bg-cream/10"
                >
                  {slide.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
