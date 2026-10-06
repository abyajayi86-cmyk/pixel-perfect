import type { NavLink } from "@/lib/site-config";

import facilityImage from "@/assets/placeholder-facilities.svg";
import learningImage from "@/assets/placeholder-learning.svg";
import communityImage from "@/assets/placeholder-community.svg";
import earlyYearsImage from "@/assets/stage-early-years.jpg";
import heroImage from "@/assets/hero-honeytots.jpg";
import primaryImage from "@/assets/stage-primary.jpg";
import welcomeImage from "@/assets/welcome-head.jpg";

/**
 * Home hero carousel content.
 *
 * Kept in `src/content` alongside `pages.ts` so the whole Phase One content set
 * lives in one place and can move behind a CMS in Phase Two.
 *
 * Four slides use the photography already supplied in `src/assets`. Three more
 * slides are needed to reach the seven-slide minimum, so they use clearly
 * labelled SVG placeholders. Those slides set `imagePlaceholder: true` and the
 * carousel renders a visible "photograph to follow" note, so no visitor is
 * ever shown a stand-in without being told.
 *
 * Slide copy describes what is visible, links to an existing route, or repeats
 * school facts the client has confirmed in the content brief (the motto and
 * subheadline on slide one). It must not state anything Honeytots has not
 * confirmed.
 */

export type HeroAction = NavLink;

export type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  /** Colour family used for the slide's small accents. */
  family: "honey" | "plum" | "sky" | "leaf" | "coral";
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  /** Set when `image` is a temporary stand-in rather than supplied photography. */
  imagePlaceholder?: boolean;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Nursery & Primary · Nigeria",
    title: "Nurturing Excellent Leaders",
    body: "Welcome to Honeytots School – A safe, inclusive, and inspiring environment where academic excellence, character development, and lifelong curiosity flourish together.",
    image: heroImage,
    alt: "Children learning together at Honeytots School",
    family: "honey",
    primaryAction: { label: "Enquire / Apply Now", to: "/admissions" },
    secondaryAction: { label: "Book a School Visit", to: "/book-a-visit" },
  },
  {
    eyebrow: "Learning",
    title: "Early Years & Nursery",
    body: "Play-based learning that builds curiosity and confidence from a child's very first days.",
    image: earlyYearsImage,
    alt: "Children taking part in a supervised play activity",
    family: "sky",
    primaryAction: { label: "Early Years & Nursery", to: "/learning/early-years" },
  },
  {
    eyebrow: "Learning",
    title: "Primary School",
    body: "Strong foundations from Primary 1 through to Primary 6, in classrooms set up to help every child thrive.",
    image: primaryImage,
    alt: "Pupils working together in a primary classroom",
    family: "leaf",
    primaryAction: { label: "Primary School", to: "/learning/primary" },
  },
  {
    eyebrow: "Visit us",
    title: "Come and see Honeytots for yourself",
    body: "The best way to understand our school is to walk through it. We would be glad to welcome you and your child.",
    image: welcomeImage,
    alt: "A member of the Honeytots School team welcoming visitors",
    family: "coral",
    primaryAction: { label: "Book a Visit", to: "/book-a-visit" },
    secondaryAction: { label: "Contact Us", to: "/contact" },
  },
  {
    eyebrow: "Our School",
    title: "A calm, welcoming place to learn",
    body: "Warm classrooms, kind staff and routines that help children feel settled enough to concentrate.",
    image: learningImage,
    alt: "Placeholder illustration for a Honeytots classroom photograph",
    family: "plum",
    imagePlaceholder: true,
    primaryAction: { label: "Our Facilities", to: "/our-school/facilities" },
  },
  {
    eyebrow: "Our School",
    title: "A community built around each child",
    body: "Our team works closely with families so that a child's learning continues happily at home.",
    image: communityImage,
    alt: "Placeholder illustration for a Honeytots school community photograph",
    family: "honey",
    imagePlaceholder: true,
    primaryAction: { label: "Our Teachers & Leadership", to: "/our-school/staff" },
  },
  {
    eyebrow: "Our School",
    title: "Spaces made for learning and play",
    body: "Take a look at the rooms and grounds we are able to show you today, and what is still to come.",
    image: facilityImage,
    alt: "Placeholder illustration for a Honeytots facilities photograph",
    family: "leaf",
    imagePlaceholder: true,
    primaryAction: { label: "Our Facilities", to: "/our-school/facilities" },
    secondaryAction: { label: "Find Us", to: "/contact/find-us" },
  },
];
