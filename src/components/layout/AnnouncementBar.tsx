import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Announcement strip.
 *
 * Sits above the header. On the home page the header overlays the hero, so the
 * bar is pushed up with it and switches to a translucent navy treatment.
 */
export function AnnouncementBar({ overlay = false }: { overlay?: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  if (!siteConfig.announcement.enabled || dismissed) return null;

  return (
    <div
      className={cn(
        overlay
          ? "on-navy border-b border-cream/15 bg-navy-deep/70 text-cream backdrop-blur-md"
          : "bg-honey text-navy-deep",
      )}
    >
      <div className="container-page flex items-center justify-between gap-4 py-2.5 text-sm">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold">{siteConfig.announcement.message}</span>
          <Link
            to={siteConfig.announcement.linkTo}
            className="font-extrabold underline underline-offset-4"
          >
            {siteConfig.announcement.linkLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-navy/10"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}
