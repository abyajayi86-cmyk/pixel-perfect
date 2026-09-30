/**
 * Central configuration for Honeytots School.
 *
 * Phase One: these values are placeholders held in code so the site can be
 * reviewed before the school supplies confirmed details. Phase Two moves this
 * object behind a `site_settings` table edited from /admin — keep all reads
 * going through `siteConfig` so the swap is a single change.
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

export const siteConfig = {
  name: "Honeytots School",
  shortName: "Honeytots",
  strapline: "Nursery & Primary · Nigeria",
  motto: "[School Motto Awaiting Confirmation]",
  description:
    "A Nigerian Nursery and Primary school where children learn with confidence, kindness and curiosity.",
  location: "[City, State, Nigeria]",
  address: "[School Address]",
  phone: "[School Phone Number]",
  whatsapp: "[School WhatsApp Number]",
  email: "[School Email Address]",
  openingHours: "[School Opening Hours Awaiting Confirmation]",
  mapUrl: "",
  /** Set to an external portal address when the school has one. */
  parentPortalUrl: "",
  announcement: {
    enabled: true,
    message: "Admissions enquiries are welcome — book a school visit today.",
    linkLabel: "Book a Visit",
    linkTo: "/book-a-visit",
  },
  social: {
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
  },
  developerCredit: "Website by HOST MEDIA LIMITED",
  analyticsId: "",
};

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
