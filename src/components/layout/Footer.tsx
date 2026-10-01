import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Music2, TwitterIcon as XIcon, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { isPlaceholder, placeholderLabel, sanitizeDigits } from "@/lib/placeholder";
import {
  footerLegalLinks,
  mainNav,
  parentLinks,
  schoolDirectionsUrl,
  siteConfig,
} from "@/lib/site-config";
import { Logo } from "./Logo";

type ContactLine = {
  label: string;
  value: string;
  /** Optional href; when undefined we render plain text only. */
  href?: string | undefined;
  external?: boolean | undefined;
};

/**
 * Footer contact lines. Links are only produced once confirmed real values
 * are supplied to siteConfig. Placeholders always stay as plain text labels
 * and never become `tel:`, `wa.me` or `mailto:` destinations.
 */
function buildContactLines(): ContactLine[] {
  const phoneDigits = sanitizeDigits(siteConfig.phone);
  const waDigits = sanitizeDigits(siteConfig.whatsapp);

  const phoneHref =
    phoneDigits && !isPlaceholder(siteConfig.phone) ? `tel:${phoneDigits}` : undefined;
  const waHref =
    waDigits && !isPlaceholder(siteConfig.whatsapp)
      ? `https://wa.me/${waDigits.startsWith("+") ? waDigits.slice(1) : waDigits}`
      : undefined;
  const emailHref =
    !isPlaceholder(siteConfig.email) && siteConfig.email.trim()
      ? `mailto:${siteConfig.email.trim()}`
      : undefined;

  return [
    { label: "Address", value: siteConfig.address, href: schoolDirectionsUrl, external: true },
    { label: "Location", value: siteConfig.location },
    { label: "Telephone", value: siteConfig.phone, href: phoneHref },
    { label: "WhatsApp", value: siteConfig.whatsapp, href: waHref, external: true },
    { label: "Email", value: siteConfig.email, href: emailHref },
  ];
}

type SocialEntry = { key: string; label: string; url: string; icon: LucideIcon };

/**
 * Social channels from siteConfig — filtered at render time so that when
 * every URL is empty (the Phase 1 default) the icons wrapper is omitted
 * entirely and no layout gap appears.
 */
function buildSocialEntries(): SocialEntry[] {
  const all: SocialEntry[] = [
    { key: "facebook", label: "Facebook", url: siteConfig.social.facebook, icon: Facebook },
    { key: "instagram", label: "Instagram", url: siteConfig.social.instagram, icon: Instagram },
    { key: "x", label: "X", url: siteConfig.social.x, icon: XIcon },
    { key: "youtube", label: "YouTube", url: siteConfig.social.youtube, icon: Youtube },
    { key: "tiktok", label: "TikTok", url: siteConfig.social.tiktok, icon: Music2 },
    { key: "linkedin", label: "LinkedIn", url: siteConfig.social.linkedin, icon: Linkedin },
  ];
  return all.filter((entry) => entry.url.trim().length > 0);
}

export function Footer() {
  const sections = mainNav.filter((section) => section.children);
  const year = new Date().getFullYear();
  const contactLines = buildContactLines();
  const socialEntries = buildSocialEntries();

  return (
    <footer className="on-navy bg-navy text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
            {siteConfig.description}
          </p>
          <address className="mt-6 space-y-1.5 text-sm not-italic text-cream/70">
            {contactLines.map(({ label, value, href, external }) => {
              const pending = isPlaceholder(value);
              const display = pending ? placeholderLabel(value) : value;
              const valueClass = pending ? "" : "hover:text-honey";
              return (
                <p key={label}>
                  <span className="font-semibold text-cream/90">{label}: </span>
                  {href ? (
                    <a
                      href={href}
                      className={`${valueClass} ${external ? "" : ""} underline-offset-2 hover:underline`}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {display}
                    </a>
                  ) : (
                    <span className={valueClass}>{display}</span>
                  )}
                </p>
              );
            })}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-honey">
            Parent links
          </h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {parentLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to} className="py-1 text-cream/80 hover:text-honey hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-honey">Explore</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {sections.map((section) => (
              <li key={section.to}>
                <Link
                  to={section.to}
                  className="py-1 text-cream/80 hover:text-honey hover:underline"
                >
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/news" className="py-1 text-cream/80 hover:text-honey hover:underline">
                News
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="py-1 text-cream/80 hover:text-honey hover:underline">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-honey">Legal</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {footerLegalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="py-1 text-cream/80 hover:text-honey hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            {socialEntries.length > 0 ? (
              <ul className="flex items-center gap-2.5" aria-label="Social media links">
                {socialEntries.map(({ key, label, url, icon: Icon }) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition hover:border-honey/60 hover:bg-honey/10 hover:text-honey"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <p>{siteConfig.developerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
