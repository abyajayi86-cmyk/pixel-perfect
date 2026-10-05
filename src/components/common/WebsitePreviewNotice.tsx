import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

/**
 * Single discreet top-strip banner shown globally during the Phase 1 client
 * preview.
 *
 * Mounted in SiteLayout after the skip link and immediately ABOVE the site
 * header, in normal document flow. It occupies the full width of the viewport
 * and sits as the very first visible element on every page so that reviewers
 * always see the "under school review" context before reading the site copy.
 *
 * Style is deliberately restrained — honey-soft background, no animation, no
 * dismiss button — so it reads as a professional review status rather than a
 * dismissible marketing announcement.
 *
 * Copy matches the approved Phase 1 wording exactly.
 */
export function WebsitePreviewNotice() {
  return (
    <div role="note" className="bg-honey-soft/60 border-b border-honey/30">
      <Alert className="rounded-none border-x-0 border-t-0 border-b border-honey/30 bg-honey-soft/70 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="container-page flex items-start gap-3">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy-deep" />
          <div className="min-w-0 flex-1 text-left">
            <AlertTitle className="text-sm font-bold text-navy-deep">Website Preview</AlertTitle>
            <AlertDescription className="mt-0.5 text-xs leading-relaxed text-navy-deep/85 sm:text-sm">
              This Phase 1 website is currently being reviewed with Honeytots School. Some
              school-specific information, photographs and documents are still awaiting confirmation
              and will be finalized before public launch.
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
