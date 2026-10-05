import type { ReactNode } from "react";
import { PageHero } from "@/components/common/PageHero";
import type { ColourFamily } from "@/lib/family";

export function meta(title: string, description: string) {
  const t = `${title} | Honeytots School`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image-placeholder.svg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function SimplePage({
  title,
  intro,
  eyebrow,
  family = "honey",
  children,
}: {
  title: string;
  intro: string;
  eyebrow?: string;
  family?: ColourFamily;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        {...(eyebrow ? { eyebrow } : {})}
        title={title}
        intro={intro}
        family={family}
        crumbs={[{ label: title }]}
      />
      <div className="container-page py-12 md:py-16">{children}</div>
    </>
  );
}
