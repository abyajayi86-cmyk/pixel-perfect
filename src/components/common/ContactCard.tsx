import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { isPlaceholder, placeholderLabel, sanitizeDigits } from "@/lib/placeholder";
import {
  provisionalAddressNote,
  schoolDirectionsUrl,
  schoolLocation,
  siteConfig,
} from "@/lib/site-config";

type Row = {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string | undefined;
  /** Link opens externally. */
  external?: boolean | undefined;
};

/**
 * Builds a `tel:` href only when the value is confirmed and has usable digits.
 */
function telHref(value: string): string | undefined {
  const digits = sanitizeDigits(value);
  if (!digits) return undefined;
  if (isPlaceholder(value)) return undefined;
  return `tel:${digits}`;
}

/**
 * Builds a `wa.me` href only when WhatsApp value is confirmed and has usable digits.
 */
function whatsappHref(value: string): string | undefined {
  const digits = sanitizeDigits(value);
  if (!digits) return undefined;
  if (isPlaceholder(value)) return undefined;
  const clean = digits.startsWith("+") ? digits.slice(1) : digits;
  return `https://wa.me/${clean}`;
}

/**
 * Builds a `mailto:` href only when the email is confirmed (not a placeholder).
 */
function mailtoHref(value: string, subject?: string): string | undefined {
  if (isPlaceholder(value)) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const base = `mailto:${trimmed}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

const rows: Row[] = [
  {
    icon: Phone,
    label: "Telephone",
    value: [siteConfig.phone, siteConfig.phoneSecondary].filter(Boolean).join(", "),
    href: telHref(siteConfig.phone),
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: [siteConfig.whatsapp, siteConfig.whatsappSecondary].filter(Boolean).join(", "),
    href: whatsappHref(siteConfig.whatsapp),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: mailtoHref(siteConfig.email, "Enquiry from the Honeytots website"),
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.openingHours,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
    href: schoolDirectionsUrl,
    external: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: siteConfig.socialHandles.instagram,
    href: siteConfig.social.instagram.trim() || undefined,
    external: true,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: siteConfig.socialHandles.facebook,
    href: siteConfig.social.facebook.trim() || undefined,
    external: true,
  },
];

/**
 * Renders the visible value inside a `<dd>`.
 *
 * - Placeholders render as their obvious "awaiting confirmation" label, never
 *   inside a clickable link (the `href` on a placeholder row is already
 *   undefined).
 * - Confirmed values with a valid `href` render wrapped in a semantic anchor.
 * - Confirmed values without a link render as plain text.
 */
function ValueDisplay({ row }: { row: Row }) {
  const pending = isPlaceholder(row.value);
  const display = pending ? placeholderLabel(row.value) : row.value;
  const textClass = pending
    ? "font-semibold text-navy-tint"
    : "break-words font-semibold text-navy";

  if (!row.href) {
    return <dd className={textClass}>{display}</dd>;
  }

  const anchorClass = `${textClass} hover:underline underline-offset-2`;

  if (row.external) {
    return (
      <dd>
        <a
          href={row.href}
          target="_blank"
          rel="noopener noreferrer"
          className={anchorClass}
          aria-label={`${row.label}: ${display} (opens in a new tab)`}
        >
          {display}
        </a>
      </dd>
    );
  }

  return (
    <dd>
      <a href={row.href} className={anchorClass} aria-label={`${row.label}: ${display}`}>
        {display}
      </a>
    </dd>
  );
}

/**
 * School contact details.
 *
 * All values are client-confirmed and read from `siteConfig`, so the card can
 * never disagree with the footer, contact page or location section. The
 * defensive placeholder handling is kept so a value returned to the awaiting
 * state later still renders as a label rather than a link.
 *
 * Conditional linking: `tel:`, `wa.me` and `mailto:` hrefs are never generated
 * for placeholder text — two layers of defence:
 *   1. `sanitizeDigits` / `mailtoHref` returns empty when `isPlaceholder`
 *   2. the wrapper component does not render `<a>` when `row.href` is undefined
 *
 * Social rows link only when a verified URL exists in `siteConfig.social`;
 * otherwise the handle renders as plain text so no URL is ever fabricated.
 */
export function ContactCard() {
  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
      <h2 className="text-xl">School contact details</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        All contact details below are confirmed by Honeytots School and match the details used
        across the website.
      </p>
      <dl className="mt-6 space-y-5">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-3.5">
            <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream-deep text-navy">
              <row.icon aria-hidden="true" className="size-4.5" />
            </span>
            <div className="min-w-0">
              <dt className="text-sm font-semibold text-muted-foreground">{row.label}</dt>
              <ValueDisplay row={row} />
            </div>
          </div>
        ))}
      </dl>
      {schoolLocation.provisional ? (
        <p className="mt-6 rounded-2xl bg-honey-soft px-4 py-3 text-sm leading-relaxed text-navy-deep">
          {provisionalAddressNote}
        </p>
      ) : null}
    </div>
  );
}
