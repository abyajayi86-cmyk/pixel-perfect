import type { NavLink } from "@/lib/site-config";

import graduation from "@/assets/honeytots-graduation.jpg.asset.json";
import sports from "@/assets/honeytots-sports.jpg.asset.json";
import music from "@/assets/honeytots-music.jpg.asset.json";
import culture from "@/assets/honeytots-cultural-performance.jpg.asset.json";

/**
 * Home hero carousel content.
 *
 * Kept in `src/content` alongside `pages.ts` so the whole Phase One content set
 * lives in one place and can move behind a CMS in Phase Two.
 *
 * All slides use school-supplied pupil photographs served through asset pointers.
 * Portraits are reserved for Welcome and About, not this carousel.
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
    image: graduation.url,
    alt: "Honeytots pupils holding graduation certificates",
    family: "honey",
    primaryAction: { label: "Enquire / Apply Now", to: "/admissions" },
    secondaryAction: { label: "Book a School Visit", to: "/book-a-visit" },
  },
  {
    eyebrow: "Learning",
    title: "Early Years & Nursery",
    body: "Play-based learning that builds curiosity and confidence from a child's very first days.",
    image: culture.url,
    alt: "Honeytots pupils performing a cultural dance",
    family: "sky",
    primaryAction: { label: "Early Years & Nursery", to: "/learning/early-years" },
  },
  {
    eyebrow: "Learning",
    title: "Primary School",
    body: "Strong foundations from Primary 1 through to Primary 6, in classrooms set up to help every child thrive.",
    image: music.url,
    alt: "Honeytots pupils playing violins on stage",
    family: "leaf",
    primaryAction: { label: "Primary School", to: "/learning/primary" },
  },
  {
    eyebrow: "Visit us",
    title: "Come and see Honeytots for yourself",
    body: "The best way to understand our school is to walk through it. We would be glad to welcome you and your child.",
    image: graduation.url,
    alt: "Honeytots pupils celebrating their graduation",
    family: "coral",
    primaryAction: { label: "Book a Visit", to: "/book-a-visit" },
    secondaryAction: { label: "Contact Us", to: "/contact" },
  },
  {
    eyebrow: "Our School",
    title: "Music at Honeytots",
    body: "A moment from our pupils’ violin performance.",
    image: music.url,
    alt: "Five Honeytots pupils performing together on violins",
    family: "plum",
    primaryAction: { label: "Explore Enrichment", to: "/learning/enrichment" },
  },
  {
    eyebrow: "Our School",
    title: "A community built around each child",
    body: "Our team works closely with families so that a child's learning continues happily at home.",
    image: culture.url,
    alt: "Honeytots pupils performing in traditional clothing",
    family: "honey",
    primaryAction: { label: "Our Teachers & Leadership", to: "/our-school/staff" },
  },
  {
    eyebrow: "Our School",
    title: "Sport at Honeytots",
    body: "Our pupils taking part in a martial arts display at a school sports event.",
    image: sports.url,
    alt: "Honeytots pupils performing a martial arts display on an athletics track",
    family: "leaf",
    primaryAction: { label: "Explore Enrichment", to: "/learning/enrichment" },
    secondaryAction: { label: "Find Us", to: "/contact/find-us" },
  },
];
