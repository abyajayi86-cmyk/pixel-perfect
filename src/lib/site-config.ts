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
  "portal" | "calendar" | "clock" | "shirt" | "wallet" | "admissions" | "phone";

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

export const mainNav: NavSection[] = [
  { label: "Home", to: "/", family: "honey" },
  {
    label: "Our School",
    to: "/our-school",
    family: "plum",
    blurb: "Who we are, what we value and how we keep every child safe.",
    children: [
      {
        label: "Welcome",
        to: "/our-school/welcome",
        description: "A word from our school leadership.",
      },
      {
        label: "About Honeytots",
        to: "/our-school/about",
        description: "Who we are and how we work.",
      },
      {
        label: "Our Vision & Values",
        to: "/our-school/vision-values",
        description: "What guides us every day.",
      },
      {
        label: "Our Teachers & Leadership",
        to: "/our-school/staff",
        description: "The team caring for your child.",
      },
      {
        label: "Our Facilities",
        to: "/our-school/facilities",
        description: "Spaces for learning and play.",
      },
      {
        label: "Safeguarding",
        to: "/our-school/safeguarding",
        description: "Keeping every child safe.",
      },
      {
        label: "School Policies",
        to: "/our-school/policies",
        description: "How the school is run.",
      },
      { label: "Photo Gallery", to: "/gallery", description: "Life at Honeytots in pictures." },
    ],
  },
  {
    label: "Learning",
    to: "/learning",
    family: "sky",
    blurb: "From first steps in Early Years through to Primary 6.",
    children: [
      { label: "Learning at Honeytots", to: "/learning", description: "Our approach to teaching." },
      {
        label: "Early Years & Nursery",
        to: "/learning/early-years",
        description: "Play-based early learning.",
      },
      { label: "Primary School", to: "/learning/primary", description: "Primary 1 to Primary 6." },
      {
        label: "Curriculum",
        to: "/learning/curriculum",
        description: "How learning is organised.",
      },
      {
        label: "Subjects We Teach",
        to: "/learning/subjects",
        description: "Subject areas across the school.",
      },
      { label: "Assessment", to: "/learning/assessment", description: "How progress is followed." },
      {
        label: "ICT & Digital Learning",
        to: "/learning/digital-learning",
        description: "Digital skills for today.",
      },
      {
        label: "Enrichment & Activities",
        to: "/learning/enrichment",
        description: "Beyond the classroom.",
      },
      {
        label: "Culture & Values",
        to: "/learning/culture-values",
        description: "Heritage, language and citizenship.",
      },
    ],
  },
  {
    label: "Admissions",
    to: "/admissions",
    family: "honey",
    blurb: "Entry requirements, the application process and fees.",
    children: [
      {
        label: "Admissions Overview",
        to: "/admissions",
        description: "Start your Honeytots journey.",
      },
      {
        label: "How to Apply",
        to: "/admissions/how-to-apply",
        description: "The steps, simply explained.",
      },
      {
        label: "Entry Classes & Ages",
        to: "/admissions/entry-guide",
        description: "Which class suits your child.",
      },
      {
        label: "Admission Requirements",
        to: "/admissions/requirements",
        description: "What we will need from you.",
      },
      {
        label: "School Fees",
        to: "/admissions/fees",
        description: "Fee information and enquiries.",
      },
      {
        label: "Frequently Asked Questions",
        to: "/admissions/faqs",
        description: "Answers for families.",
      },
      { label: "Book a Visit", to: "/book-a-visit", description: "See the school for yourself." },
    ],
  },
  {
    label: "Parents",
    to: "/parents",
    family: "leaf",
    blurb: "The everyday information families need most often.",
    children: [
      { label: "Parent Information", to: "/parents", description: "Everyday school information." },
      { label: "School Day", to: "/parents/school-day", description: "Times and daily routines." },
      { label: "Term Dates", to: "/parents/term-dates", description: "Session and holiday dates." },
      { label: "School Calendar", to: "/calendar", description: "What is coming up." },
      { label: "Uniform", to: "/parents/uniform", description: "What children wear." },
      {
        label: "School Fees",
        to: "/admissions/fees",
        description: "Fee information and enquiries.",
      },
      {
        label: "Attendance & Punctuality",
        to: "/parents/attendance",
        description: "Being in school, on time.",
      },
      {
        label: "Homework & Reading",
        to: "/parents/homework-reading",
        description: "Learning at home.",
      },
      {
        label: "Health & Wellbeing",
        to: "/parents/health-wellbeing",
        description: "Care for the whole child.",
      },
      { label: "School Meals", to: "/parents/meals", description: "Food and snack arrangements." },
      { label: "Policies & Downloads", to: "/policies", description: "Documents for families." },
      { label: "School News", to: "/news", description: "Updates from the school." },
      { label: "Parent Portal", to: "/parent-portal", description: "Coming soon." },
    ],
  },
  {
    label: "Contact",
    to: "/contact",
    family: "coral",
    blurb: "Speak with the school office, or arrange a visit.",
    children: [
      { label: "Contact Us", to: "/contact", description: "Speak with our school team." },
      {
        label: "Send an Enquiry",
        to: "/contact/enquiry",
        description: "Message the school office.",
      },
      { label: "Find Us", to: "/contact/find-us", description: "Directions to the school." },
      { label: "Book a Visit", to: "/book-a-visit", description: "Arrange a school tour." },
    ],
  },
];

/** Persistent parent-focused shortcuts. Rendered as a side tab and in the footer. */
export const parentLinks: ParentLink[] = [
  { label: "Parent Portal", to: "/parent-portal", icon: "portal" },
  { label: "School Calendar", to: "/calendar", icon: "calendar" },
  { label: "School Day", to: "/parents/school-day", icon: "clock" },
  { label: "Uniform", to: "/parents/uniform", icon: "shirt" },
  { label: "School Fees", to: "/admissions/fees", icon: "wallet" },
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
