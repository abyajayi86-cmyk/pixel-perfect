import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (!siteConfig.announcement.enabled || dismissed) return null;

  return (
    <div className="bg-foreground text-background">
      <div className="container-page flex items-center justify-between gap-4 py-2.5 text-sm">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{siteConfig.announcement.message}</span>
          <Link to={siteConfig.announcement.linkTo} className="font-bold underline underline-offset-4">
            {siteConfig.announcement.linkLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-background/15"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}
