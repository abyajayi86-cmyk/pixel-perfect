/**
 * Section colour families.
 *
 * Each top-level navigation section keeps its own identity, but every accent is
 * deep enough to read on cream and every soft tint sits close to cream, so navy
 * and cream stay dominant across the whole site.
 *
 * The class strings are written out in full (rather than composed at runtime) so
 * Tailwind can see them at build time.
 */

export type ColourFamily = "plum" | "sky" | "honey" | "leaf" | "coral";

type FamilyStyle = {
  /** Near-cream tint for panels, sidebars and section bands. */
  soft: string;
  /** Text colour that meets contrast on cream and on `soft`. */
  text: string;
  /** Solid accent, for rules, icon fills and small highlights. */
  bar: string;
  /** Focus/selection ring at low alpha. */
  ring: string;
};

export const familyStyles: Record<ColourFamily, FamilyStyle> = {
  plum: { soft: "bg-plum-soft", text: "text-plum", bar: "bg-plum", ring: "ring-plum/25" },
  sky: { soft: "bg-sky-soft", text: "text-sky", bar: "bg-sky", ring: "ring-sky/25" },
  honey: { soft: "bg-honey-soft", text: "text-honey-deep", bar: "bg-honey", ring: "ring-honey/35" },
  leaf: { soft: "bg-leaf-soft", text: "text-leaf", bar: "bg-leaf", ring: "ring-leaf/25" },
  coral: { soft: "bg-coral-soft", text: "text-coral", bar: "bg-coral", ring: "ring-coral/25" },
};

/** Ordered list for rendering or iterating families. */
export const colourFamilies: ColourFamily[] = ["honey", "plum", "sky", "leaf", "coral"];
