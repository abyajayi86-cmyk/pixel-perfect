import { Clock, FileText, GraduationCap, Phone, Shirt, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Homepage "Useful Links" — the seven destinations a parent needs within one
 * or two clicks (AGENTS.md §7). Each entry maps to a route that exists in
 * `src/routes`, verified against the nav in `site-config.ts`; no new routes
 * were created for this section.
 *
 * The model is image-first so confirmed photography can drop in later
 * (`image` + `alt`). Until the school supplies pictures of these specific
 * pages, the card renders the icon in a circular chip instead of a stand-in
 * photograph, so nothing suggests an image we do not have.
 */

export type UsefulLink = {
  title: string;
  href: string;
  /** Optional confirmed photograph of the destination. */
  image?: string;
  alt?: string;
  description?: string;
  icon: LucideIcon;
};

export const usefulLinks: UsefulLink[] = [
  {
    title: "Admissions",
    href: "/admissions",
    description: "Entry requirements, how to apply and fees.",
    icon: GraduationCap,
  },
  {
    title: "School Day",
    href: "/parents/school-day",
    description: "Times, drop-off and the daily routine.",
    icon: Clock,
  },
  {
    title: "Uniform",
    href: "/parents/uniform",
    description: "What children wear and where from.",
    icon: Shirt,
  },
  {
    title: "Parent Information",
    href: "/parents",
    description: "Everyday information for families.",
    icon: Users,
  },
  {
    title: "Policies",
    href: "/policies",
    description: "School documents to read or download.",
    icon: FileText,
  },
  {
    title: "Fees",
    href: "/admissions/fees",
    description: "Fee information and enquiries.",
    icon: Wallet,
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Speak with the school office.",
    icon: Phone,
  },
];
