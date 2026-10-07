import { ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { buttonClass } from "@/components/common/Button";
import { siteConfig } from "@/lib/site-config";

/**
 * Homepage social call-to-action that sits with Latest News.
 *
 * Links use confirmed profile URLs from siteConfig. Unconfigured channels
 * remain unlinked; no feeds are embedded and no profile address is invented.
 */
export function SocialFollow() {
  const instagramUrl = siteConfig.social.instagram.trim();
  const facebookUrl = siteConfig.social.facebook.trim();

  return (
    <div className="mt-10 flex flex-col gap-6 rounded-[2rem] border border-honey/40 bg-honey-soft p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="max-w-xl">
        <h3 className="font-display text-2xl font-bold text-navy">Follow Honeytots School</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-deep md:text-base">
          School life, reminders and small updates shared alongside our news posts.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "md")}
          >
            <Instagram aria-hidden="true" className="size-4.5" />
            Follow on Instagram
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
        {facebookUrl ? (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "md")}
          >
            <Facebook aria-hidden="true" className="size-4.5" />
            Follow on Facebook
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <p className="text-sm text-navy">
            <span className="font-bold text-navy-deep">Facebook:</span>{" "}
            {siteConfig.socialHandles.facebook}
          </p>
        )}
      </div>
    </div>
  );
}
