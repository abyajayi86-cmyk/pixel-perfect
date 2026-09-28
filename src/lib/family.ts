export type ColourFamily = "plum" | "sky" | "honey" | "leaf" | "coral";

type FamilyStyle = {
  soft: string;
  text: string;
  bar: string;
  ring: string;
};

/** Static class strings so Tailwind can see them at build time. */
export const familyStyles: Record<ColourFamily, FamilyStyle> = {
  plum: { soft: "bg-plum-soft", text: "text-plum", bar: "bg-plum", ring: "ring-plum/25" },
  sky: { soft: "bg-sky-soft", text: "text-sky", bar: "bg-sky", ring: "ring-sky/25" },
  honey: { soft: "bg-honey-soft", text: "text-primary", bar: "bg-honey", ring: "ring-honey/30" },
  leaf: { soft: "bg-leaf-soft", text: "text-leaf", bar: "bg-leaf", ring: "ring-leaf/25" },
  coral: { soft: "bg-coral-soft", text: "text-coral", bar: "bg-coral", ring: "ring-coral/25" },
};
