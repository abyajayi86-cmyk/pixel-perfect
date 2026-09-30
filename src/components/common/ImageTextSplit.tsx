import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The workhorse media + text block used across the home page and inner pages.
 *
 * Extends the original component rather than duplicating it: callers pick the
 * crop shape, the section background, and whether the copy sits on a floating
 * card. This is what keeps the site off a grid of identical boxes.
 */

export type MediaShape = "rounded" | "circle" | "arch" | "blob";

const shapeClass: Record<MediaShape, string> = {
  rounded: "shape-rounded",
  circle: "shape-circle",
  arch: "shape-arch",
  blob: "shape-blob",
};

type ImageTextSplitProps = {
  image: string;
  alt: string;
  caption?: string;
  /** Flip so the media sits on the right at md and up. */
  reverse?: boolean;
  /** Aspect ratio of the media box. */
  ratio?: "4/3" | "1/1" | "3/4" | "16/9" | "5/4";
  shape?: MediaShape;
  /** Render the copy on a raised card that overlaps the media. */
  overlap?: boolean;
  /** Background for the whole band. */
  tone?: "cream" | "deep" | "muted" | "navy";
  width?: number;
  height?: number;
  /** Marks a stand-in image so a visible note can be shown. */
  imagePlaceholder?: boolean;
  children: ReactNode;
  className?: string;
};

const ratioClass: Record<NonNullable<ImageTextSplitProps["ratio"]>, string> = {
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
  "5/4": "aspect-[5/4]",
};

const toneClass: Record<NonNullable<ImageTextSplitProps["tone"]>, string> = {
  cream: "bg-cream",
  deep: "bg-cream-deep",
  muted: "bg-surface-muted",
  navy: "bg-navy text-cream",
};

export function ImageTextSplit({
  image,
  alt,
  caption,
  reverse,
  ratio = "4/3",
  shape = "rounded",
  overlap = false,
  tone = "cream",
  width = 1024,
  height = 768,
  imagePlaceholder = false,
  children,
  className,
}: ImageTextSplitProps) {
  const isNavy = tone === "navy";

  return (
    <div className={cn("overflow-hidden", toneClass[tone], className)}>
      <div
        className={cn(
          "container-page grid items-center gap-10 py-14 md:py-20 lg:gap-16",
          "md:grid-cols-2",
          overlap && "md:gap-0",
        )}
      >
        <figure
          className={cn(
            "m-0",
            reverse && "md:order-2",
            overlap && "md:-mr-16 lg:-mr-24",
            shape === "circle" && "px-4 sm:px-8",
          )}
        >
          <div className="relative">
            <img
              src={image}
              alt={alt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className={cn(
                "w-full object-cover shadow-[var(--shadow-lift)]",
                ratioClass[ratio],
                shapeClass[shape],
              )}
            />
            {imagePlaceholder ? (
              <p
                className={cn(
                  "mt-3 text-center text-xs font-semibold tracking-wide",
                  isNavy ? "text-cream/70" : "text-muted-foreground",
                )}
              >
                Placeholder &mdash; photograph to follow
              </p>
            ) : null}
          </div>
          {caption ? (
            <figcaption
              className={cn("mt-3 text-sm", isNavy ? "text-cream/70" : "text-muted-foreground")}
            >
              {caption}
            </figcaption>
          ) : null}
        </figure>

        <div
          className={cn(
            overlap && "relative z-10",
            overlap &&
              cn(
                "md:-ml-16 lg:-ml-24",
                "md:rounded-[2.75rem] md:border md:border-border/60 md:p-10",
                isNavy
                  ? "md:bg-navy-deep md:text-cream"
                  : "md:bg-card md:shadow-[var(--shadow-float)]",
              ),
          )}
        >
          <div className={cn(overlap ? "max-w-xl" : "max-w-xl", isNavy && "on-navy")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
