/**
 * Asset Position Matrix — Phase 7 reconciliation
 *
 * Complete inventory of every image position across the site.
 * Used by Phase 12 audit to programmatically verify asset status.
 *
 * DO NOT invent/copyright/download imagery.
 * All entries must reflect actual files in src/assets/ or public/.
 */

export type AssetType = "jpg" | "jpeg" | "png" | "svg" | "webp";
export type AssetSource = "client-supplied" | "placeholder-svg" | "og-placeholder" | "logo";
export type AssetStatus =
  | "confirmed" // Real JPG from client, matches slot intent
  | "placeholder" // SVG placeholder with visible "photograph pending" notice
  | "og-placeholder" // og-image-placeholder.svg (never presented as final)
  | "logo" // Logo file
  | "missing"; // Referenced but no file exists

export type AssetPosition = {
  /** Unique key for this position */
  key: string;
  /** Page route where the asset appears */
  page: string;
  /** Visual position / component name */
  position: string;
  /** Current file path (relative to src/assets or public) */
  currentFile: string;
  /** File type */
  type: AssetType;
  /** Source category */
  source: AssetSource;
  /** Current status */
  status: AssetStatus;
  /** Expected real asset name from client (if placeholder) */
  expectedAsset?: string;
  /** Alt text currently in use */
  altText: string;
  /** Whether a placeholder notice is shown at this position */
  hasPlaceholderNotice: boolean;
  /** Notes for Phase 7/8 reconciliation */
  notes?: string;
};

/** All real JPG/JPEG assets supplied so far (4 confirmed by client) */
const REAL_ASSETS = {
  "hero-honeytots.jpg": "Main hero photograph (slide 1)",
  "stage-early-years.jpg": "Early Years classroom/children",
  "stage-primary.jpg": "Primary classroom/children",
  "welcome-head.jpg": "Welcome/visit photograph (slide 4 + homepage welcome)",
} as const;

/** All placeholder SVGs (3 created for Phase 1) */
const PLACEHOLDER_SVGS = {
  "placeholder-facilities.svg": "Facilities photograph (hero slide 7)",
  "placeholder-learning.svg": "Learning environment (hero slide 5)",
  "placeholder-community.svg": "School community (hero slide 6)",
} as const;

/** Logo asset */
const LOGO_ASSET = {
  "logo.png": "Honeytots logo (header)",
} as const;

/** OG image placeholder */
const OG_PLACEHOLDER = {
  "og-image-placeholder.svg": "Open Graph fallback image (all pages)",
} as const;

export const assetMatrix: AssetPosition[] = [
  // ============================================================
  // HERO CAROUSEL (7 slides) — / (homepage)
  // ============================================================
  {
    key: "hero-slide-1",
    page: "/",
    position: "HeroCarousel slide 1 — main hero",
    currentFile: "hero-honeytots.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "Children learning together at Honeytots School",
    hasPlaceholderNotice: false,
    notes: "Primary hero image. Confirmed real JPG from client.",
  },
  {
    key: "hero-slide-2",
    page: "/",
    position: "HeroCarousel slide 2 — Early Years",
    currentFile: "stage-early-years.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "Children taking part in a supervised play activity",
    hasPlaceholderNotice: false,
    notes: "Also used in LEARNING_STAGES[0] and the homepage Learning cards.",
  },
  {
    key: "hero-slide-3",
    page: "/",
    position: "HeroCarousel slide 3 — Primary",
    currentFile: "stage-primary.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "Pupils working together in a primary classroom",
    hasPlaceholderNotice: false,
    notes: "Also used in LEARNING_STAGES[1] and the homepage Learning cards.",
  },
  {
    key: "hero-slide-4",
    page: "/",
    position: "HeroCarousel slide 4 — Visit/Welcome",
    currentFile: "welcome-head.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "A member of the Honeytots School team welcoming visitors",
    hasPlaceholderNotice: false,
    notes: "Also used in homepage ImageTextSplit welcome section.",
  },
  {
    key: "hero-slide-5",
    page: "/",
    position: "HeroCarousel slide 5 — Learning environment",
    currentFile: "placeholder-learning.svg",
    type: "svg",
    source: "placeholder-svg",
    status: "placeholder",
    expectedAsset: "learning-environment.jpg (or similar)",
    altText: "Placeholder illustration for a Honeytots classroom photograph",
    hasPlaceholderNotice: true,
    notes:
      "SVG placeholder with visible 'Placeholder image — photograph to follow' notice rendered by HeroCarousel.",
  },
  {
    key: "hero-slide-6",
    page: "/",
    position: "HeroCarousel slide 6 — School community",
    currentFile: "placeholder-community.svg",
    type: "svg",
    source: "placeholder-svg",
    status: "placeholder",
    expectedAsset: "school-community.jpg (or similar)",
    altText: "Placeholder illustration for a Honeytots school community photograph",
    hasPlaceholderNotice: true,
    notes:
      "SVG placeholder with visible 'Placeholder image — photograph to follow' notice rendered by HeroCarousel.",
  },
  {
    key: "hero-slide-7",
    page: "/",
    position: "HeroCarousel slide 7 — Facilities",
    currentFile: "placeholder-facilities.svg",
    type: "svg",
    source: "placeholder-svg",
    status: "placeholder",
    expectedAsset: "facilities-exterior-or-interior.jpg (or similar)",
    altText: "Placeholder illustration for a Honeytots facilities photograph",
    hasPlaceholderNotice: true,
    notes:
      "SVG placeholder with visible 'Placeholder image — photograph to follow' notice rendered by HeroCarousel.",
  },

  // ============================================================
  // HOMEPAGE — / (additional positions beyond carousel)
  // ============================================================
  {
    key: "home-learning-stage-early-years",
    page: "/",
    position: "Homepage Learning card: Early Years & Nursery",
    currentFile: "stage-early-years.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "",
    hasPlaceholderNotice: false,
    notes: "Reuses stage-early-years.jpg via CircularFeature component.",
  },
  {
    key: "home-learning-stage-primary",
    page: "/",
    position: "Homepage Learning card: Primary School",
    currentFile: "stage-primary.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "",
    hasPlaceholderNotice: false,
    notes: "Reuses stage-primary.jpg via CircularFeature component.",
  },
  {
    key: "home-welcome-image",
    page: "/",
    position: "Welcome ImageTextSplit — arch variant",
    currentFile: "welcome-head.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "A member of the Honeytots School team",
    hasPlaceholderNotice: false,
    notes: "Reuses welcome-head.jpg in the homepage Welcome section.",
  },

  // ============================================================
  // LEARNING PAGES — /learning/early-years, /learning/primary
  // ============================================================
  {
    key: "learning-early-years-card",
    page: "/learning/early-years",
    position: "CircularFeature card (via LEARNING_STAGES)",
    currentFile: "stage-early-years.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "",
    hasPlaceholderNotice: false,
    notes: "Rendered by ContentPage when learningStageCards=true.",
  },
  {
    key: "learning-primary-card",
    page: "/learning/primary",
    position: "CircularFeature card (via LEARNING_STAGES)",
    currentFile: "stage-primary.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "",
    hasPlaceholderNotice: false,
    notes: "Rendered by ContentPage when learningStageCards=true.",
  },

  // ============================================================
  // INNER PAGE LEAD IMAGES — optional `image` on PageContent
  // ============================================================
  {
    key: "page-welcome-image",
    page: "/our-school/welcome",
    position: "ContentPage lead image",
    currentFile: "welcome-head.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "A member of the Honeytots School team welcoming visitors",
    hasPlaceholderNotice: false,
    notes: "Optional lead image from PageContent.image.",
  },
  {
    key: "page-about-image",
    page: "/our-school/about",
    position: "ContentPage lead image",
    currentFile: "hero-honeytots.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "Children learning together at Honeytots School",
    hasPlaceholderNotice: false,
    notes: "Optional lead image from PageContent.image.",
  },
  {
    key: "page-early-years-image",
    page: "/learning/early-years",
    position: "ContentPage lead image",
    currentFile: "stage-early-years.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "Children taking part in a supervised play activity",
    hasPlaceholderNotice: false,
    notes: "Optional lead image from PageContent.image.",
  },
  {
    key: "page-primary-image",
    page: "/learning/primary",
    position: "ContentPage lead image",
    currentFile: "stage-primary.jpg",
    type: "jpg",
    source: "client-supplied",
    status: "confirmed",
    altText: "Pupils working together in a primary classroom",
    hasPlaceholderNotice: false,
    notes: "Optional lead image from PageContent.image.",
  },

  // ============================================================
  // GLOBAL — Logo (all pages via Header)
  // ============================================================
  {
    key: "global-logo",
    page: "all",
    position: "Header logo (top-left)",
    currentFile: "logo.png",
    type: "png",
    source: "logo",
    status: "logo",
    altText: "Honeytots School logo",
    hasPlaceholderNotice: false,
    notes: "Used in Header component on every page.",
  },

  // ============================================================
  // OPEN GRAPH — All pages (og:image meta tag)
  // ============================================================
  {
    key: "global-og-image",
    page: "all",
    position: "Open Graph meta tag (og:image)",
    currentFile: "og-image-placeholder.svg",
    type: "svg",
    source: "og-placeholder",
    status: "og-placeholder",
    altText: "",
    hasPlaceholderNotice: false,
    notes:
      "Set in simple-page.tsx, ContentPage.tsx, and __root.tsx. Must stay labelled as placeholder, never presented as final asset.",
  },
];

/** Helper: get all positions for a given page */
export function getAssetsForPage(page: string): AssetPosition[] {
  return assetMatrix.filter((a) => a.page === page || a.page === "all");
}

/** Helper: get all placeholder positions needing client photos */
export function getPlaceholderPositions(): AssetPosition[] {
  return assetMatrix.filter((a) => a.status === "placeholder");
}

/** Helper: get all confirmed real assets */
export function getConfirmedAssets(): AssetPosition[] {
  return assetMatrix.filter((a) => a.status === "confirmed");
}

/** Helper: verify all real assets are accounted for */
export function verifyRealAssetsAccounted(): { accounted: string[]; missing: string[] } {
  const accounted = assetMatrix.filter((a) => a.status === "confirmed").map((a) => a.currentFile);
  const allReal = Object.keys(REAL_ASSETS);
  const missing = allReal.filter((f) => !accounted.includes(f));
  return { accounted, missing };
}

/** Summary counts for Phase 12 audit */
export const assetSummary = {
  totalPositions: assetMatrix.length,
  confirmedReal: assetMatrix.filter((a) => a.status === "confirmed").length,
  placeholders: assetMatrix.filter((a) => a.status === "placeholder").length,
  ogPlaceholder: assetMatrix.filter((a) => a.status === "og-placeholder").length,
  logo: assetMatrix.filter((a) => a.status === "logo").length,
  uniqueRealFiles: Object.keys(REAL_ASSETS).length,
  uniquePlaceholderFiles: Object.keys(PLACEHOLDER_SVGS).length,
};
