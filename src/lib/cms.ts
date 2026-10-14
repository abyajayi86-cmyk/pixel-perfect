import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getCmsEntries } from "./cms.functions";
import { siteConfig } from "./site-config";
import { heroSlides, type HeroSlide } from "@/content/hero-slides";
import { pageContent, type PageContent, type PageSection } from "@/content/pages";

/**
 * Website content editor (CMS) layer.
 *
 * Built-in copy lives in site-config.ts, hero-slides.ts and pages.ts. Staff edits
 * are stored as overrides keyed by:
 *   "site"         → partial school details (EditableSiteFields)
 *   "hero"         → full list of homepage slides
 *   "home"         → homepage welcome section
 *   "page:<path>"  → title, intro, image, sections for one page
 * Readers merge the override on top of the built-in value, so an empty database
 * shows the original site.
 */

export const cmsQuery = queryOptions({
  queryKey: ["cms"],
  queryFn: () => getCmsEntries(),
  staleTime: 60_000,
});

export type SiteConfig = typeof siteConfig;

export const editableSiteFields = [
  { key: "name", label: "School name" },
  { key: "strapline", label: "Levels line under the logo" },
  { key: "motto", label: "Motto" },
  { key: "tagline", label: "Tagline" },
  { key: "description", label: "Short description (used by search engines)", long: true },
  { key: "address", label: "Address" },
  { key: "phone", label: "Main phone" },
  { key: "phoneSecondary", label: "Second phone" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "whatsappSecondary", label: "Second WhatsApp" },
  { key: "email", label: "Email" },
  { key: "openingHours", label: "Office hours" },
] as const;

export type EditableSiteKey = (typeof editableSiteFields)[number]["key"];
export type SiteOverride = Partial<Record<EditableSiteKey, string>>;

export type HomeContent = { heading: string; paragraphs: string[]; image: string; alt: string };

export type PageOverride = Partial<Pick<PageContent, "title" | "intro" | "image">> & {
  sections?: PageSection[];
};

export function useCms(): Record<string, unknown> {
  return useSuspenseQuery(cmsQuery).data;
}

export function mergeSite(cms: Record<string, unknown>): SiteConfig {
  const o = (cms["site"] ?? {}) as SiteOverride;
  const clean = Object.fromEntries(Object.entries(o).filter(([, v]) => typeof v === "string"));
  return { ...siteConfig, ...clean };
}

export function useSiteConfig(): SiteConfig {
  return mergeSite(useCms());
}

export function useHeroSlides(): HeroSlide[] {
  const o = useCms()["hero"];
  return Array.isArray(o) && o.length > 0 ? (o as HeroSlide[]) : heroSlides;
}

export function mergePage(cms: Record<string, unknown>, path: string): PageContent | undefined {
  const base = pageContent[path];
  if (!base) return undefined;
  const o = (cms[`page:${path}`] ?? {}) as PageOverride;
  return { ...base, ...o };
}

export function usePageContent(path: string): PageContent | undefined {
  return mergePage(useCms(), path);
}

export const defaultHome: Omit<HomeContent, "image"> = {
  heading: "A warm welcome to Honeytots",
  paragraphs: [
    "We are a small, caring community where children feel happy, safe and ready to learn.",
    "From Nursery through to Primary 6, every child is known by name, nurtured and encouraged to do their best.",
  ],
  alt: "A woman wearing glasses and a wide-brimmed hat at a Honeytots event",
};

export function useHomeContent(defaultImage: string): HomeContent {
  const o = (useCms()["home"] ?? {}) as Partial<HomeContent>;
  return { ...defaultHome, image: defaultImage, ...o };
}
