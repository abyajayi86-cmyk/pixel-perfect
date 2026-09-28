import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ImageTextSplitProps = {
  image: string;
  alt: string;
  caption?: string;
  reverse?: boolean;
  children: ReactNode;
  width?: number;
  height?: number;
};

export function ImageTextSplit({
  image,
  alt,
  caption,
  reverse,
  children,
  width = 1024,
  height = 768,
}: ImageTextSplitProps) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <figure className={cn("m-0", reverse && "md:order-2")}>
        <img
          src={image}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
        />
        {caption ? (
          <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
        ) : null}
      </figure>
      <div className="max-w-xl">{children}</div>
    </div>
  );
}
