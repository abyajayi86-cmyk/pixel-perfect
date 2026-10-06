import type { ReactNode } from "react";
import { PageHero } from "@/components/common/PageHero";
import type { ColourFamily } from "@/lib/family";
import { siteUrl } from "@/lib/site-config";

/**
 * Head tags for a simple (non `pages.ts`) route.
 *
 * Pass `path` so the page can emit an accurate `rel=canonical` and `og:url`
 * on the client-confirmed domain; without a path those two tags are omitted
 * rather than guessed.
 */
export function meta(title: string, description: string, path?: string) {
  const t = `${title} | Honeytots School`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      ...(path ? [{ property: "og:url", content: siteUrl(path) }] : []),
      { property: "og:image", content: "/og-image-placeholder.svg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...(path ? { links: [{ rel: "canonical" as const, href: siteUrl(path) }] } : {}),
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
