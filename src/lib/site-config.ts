/**
 * Central configuration for Honeytots School.
 *
 * Phase One: the identity, address, contact, hours, social handles and domain
 * below are CLIENT-CONFIRMED. Nothing wrapped in square brackets should remain
 * here; any future placeholder belongs in `src/lib/placeholder.ts` consumers.
 * Phase Two moves this object behind a `site_settings` table edited from
 * /admin — keep all reads going through `siteConfig` so the swap is a single
 * change.
 *
 * Navigation below lists ONLY routes that exist in `src/routes`. Do not add an
 * entry here without adding the matching route file, or the mega menu will link
 * to a 404.
 */

export type NavLink = {
  label: string;
  to: string;
  description?: string;
};

export type NavSection = {
  label: string;
  to: string;
  /** Short line shown beside the section title inside the mega menu. */
  blurb?: string;
  /** Colour family used for the mega-menu panel and page hero. */
  family: "plum" | "sky" | "honey" | "leaf" | "coral";
  children?: NavLink[];
};

export type ParentLinkIcon =
  | "portal" | "calendar" | "clock" | "shirt" | "wallet" | "admissions" | "phone" | "file";

export type ParentLink = {
  label: string;
  to: string;
  icon: ParentLinkIcon;
};

/**
 * The one place the school address is defined.
 *
 * Every surface that prints, maps or links to the address reads from here, so the
 * Footer, ContactCard and the shared LocationSection can never disagree. The map
 * is driven by a free-text query rather than a pin, because we must not claim a
 * marker has been independently verified.
 *
 * Phase One: `provisional` is false. The address below was confirmed by the
 * school, so live surfaces show it without any provisional wording. Set the
 * flag back to true only if a future address has to be treated as unconfirmed,
 * which restores the provisional notice from `provisionalAddressNote`.
 */
export const schoolLocation = {
  address: "11 Alakija Street, Watching Roundabout, Fadeyi, Lagos, Nigeria",
  city: "Fadeyi",
  state: "Lagos",
  /** Free-text query used for the embedded map and the directions link. */
  mapQuery: "11 Alakija Street, Watching Roundabout, Fadeyi, Lagos, Nigeria",
  provisional: false,
};

/** Keyless Google Maps embed for `schoolLocation`. */
export const schoolMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  schoolLocation.mapQuery,
)}&output=embed`;

/** Opens Google Maps directions to `schoolLocation`. */
export const schoolDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  schoolLocation.mapQuery,
)}`;

/** Copy for the provisional-address notice, kept beside the flag it depends on. */
export const provisionalAddressNote =
  "Temporary address shown for website review only. Honeytots School has not yet confirmed its permanent location.";

export const siteConfig = {
  name: "Honeytots School",
  shortName: "Honeytots",
  abbreviation: "HS",
  strapline: "Creche · Playgroup · Nursery · Primary",
  motto: "Nurturing Excellent Leaders",
  tagline: "Rooted in Values. Focused on Excellence. Committed to Leadership.",
  yearEstablished: 2006,
  /** The only levels the school offers. Do not extend without client approval. */
  levels: ["Creche", "Playgroup", "Nursery", "Primary"],
  description:
    "Honeytots School is a Nigerian nursery and primary school established in 2006, offering Creche, Playgroup, Nursery and Primary education in Fadeyi, Lagos.",
  location: `${schoolLocation.city}, ${schoolLocation.state}`,
  address: schoolLocation.address,
  phone: "08090999248",
  /** Second school office number shown alongside the primary line. */
  phoneSecondary: "08091230777",
  whatsapp: "+2348028822661",
  /** Second WhatsApp number supplied by the school. */
  whatsappSecondary: "08091230777",
  email: "honeytotsschool@gmail.com",
  openingHours: "Monday–Friday, 7:30 AM – 5:30 PM",
  /** Client-confirmed domain. Not a claim that the deployment is live. */
  domain: "honeytotsschool.com",
  mapUrl: "",
  /** Set to an external portal address when the school has one. */
  parentPortalUrl: "",
  /**
   * Reserved for a future announcements feature (Phase Two content management).
   * Not rendered anywhere in the current design, and the announcement bar that
   * previously sat above the header has been removed.
   */
  announcement: {
    enabled: false,
    message: "Admissions enquiries are welcome — book a school visit today.",
    linkLabel: "Book a Visit",
    linkTo: "/book-a-visit",
  },
  /** Email address used specifically for admissions enquiries. */
  admissionsEmail: "honeytotsschool@gmail.com",
  /**
   * Social profile URLs. Empty string = no verified URL yet, and the surface
   * must hide the link rather than inventing one. Handles live in
   * `socialHandles` so the label text never depends on a URL existing.
   */
  social: {
    /*
     * Facebook URL intentionally left empty: the official page address has not
     * been confirmed by the school, and the label ("Honeytots School" in
     * `socialHandles`) is shown on its own. To restore a verified page, put the
     * exact URL here — nothing else needs to change.
     */
    facebook: "https://www.facebook.com/honeytotsschoollagos",
    instagram: "https://www.instagram.com/honeytotsschool/",
    x: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
  },
  /** Client-confirmed handles, rendered as text whether or not a URL exists. */
  socialHandles: {
    instagram: "honeytotsschool",
    facebook: "Honeytots School",
  },
  developerCredit: "Website by HOST MEDIA LIMITED",
  analyticsId: "",
};

/**
 * Absolute origin for canonical and Open Graph URLs.
 *
 * `siteConfig.domain` is the client-confirmed domain. Publishing it in meta
 * tags records where the site belongs; it is not a claim that the deployment
 * has already been pointed there.
 */
export const siteOrigin = `https://${siteConfig.domain}`;

/** Absolute URL for a route path — used for `rel=canonical` and `og:url`. */
export function siteUrl(path: string): string {
  return path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`;
}

/**
 * Main navigation — exactly five destinations (Phase 1 IA consolidation).
 *
 * Our School, Admissions and Contact are single consolidated pages; Parents is
 * a landing page with three supporting subpages. The former Learning section
 * was merged into Our School. Supporting destinations (News & Events, Gallery,
 * Policies, Book a Visit, Ask Honeytots, Parent Portal) are reached through
 * page content, the footer and parent links, never the primary menu.
 */
export const mainNav: NavSection[] = [
  { label: "Home", to: "/", family: "honey" },
  {
    label: "Our School",
    to: "/our-school",
    family: "plum",
    blurb: "Who we are, what we teach and how we keep every child safe.",
  },
  {
    label: "Admissions",
    to: "/admissions",
    family: "honey",
    blurb: "Classes, the application process, requirements and fees.",
  },
  {
    label: "Parents",
    to: "/parents",
    family: "leaf",
    blurb: "The everyday information families need most often.",
    children: [
      { label: "School Day", to: "/parents/school-day", description: "Times, routines and meals." },
      { label: "Uniform", to: "/parents/uniform", description: "What children wear." },
      {
        label: "Attendance & Wellbeing",
        to: "/parents/attendance-wellbeing",
        description: "Absence, health and homework.",
      },
    ],
  },
  {
    label: "Contact",
    to: "/contact",
    family: "coral",
    blurb: "Speak with the school office, or arrange a visit.",
  },
];

/** Persistent parent-focused shortcuts. Rendered as a side tab and in the footer. */
export const parentLinks: ParentLink[] = [
  { label: "Parent Portal", to: "/parent-portal", icon: "portal" },
  { label: "News & Events", to: "/news", icon: "calendar" },
  { label: "School Day", to: "/parents/school-day", icon: "clock" },
  { label: "Uniform", to: "/parents/uniform", icon: "shirt" },
  { label: "Attendance & Wellbeing", to: "/parents/attendance-wellbeing", icon: "clock" },
  { label: "Policies & Downloads", to: "/policies", icon: "file" },
  { label: "School Fees", to: "/admissions", icon: "wallet" },
  { label: "Admissions", to: "/admissions", icon: "admissions" },
  { label: "Contact Us", to: "/contact", icon: "phone" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Accessibility", to: "/accessibility" },
  { label: "Sitemap", to: "/sitemap" },
];

/** Returns the nav section a path belongs to, or undefined for utility pages. */
export function findNavSection(path: string): NavSection | undefined {
  return (
    mainNav.find((section) => section.children?.some((child) => child.to === path)) ??
    mainNav.find((section) => section.to !== "/" && path.startsWith(`${section.to}/`))
  );
}
