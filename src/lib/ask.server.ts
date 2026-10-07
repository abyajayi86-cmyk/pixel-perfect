import { pageContent } from "@/content/pages";
import { siteConfig } from "@/lib/site-config";

let cached: string | null = null;

/** Flattens the website copy into a plain-text knowledge base for the assistant. */
export function websiteKnowledge(): string {
  if (cached) return cached;
  const parts: string[] = [
    `School: ${siteConfig.name}. Phone: ${siteConfig.phone}. Email: ${siteConfig.email}.`,
  ];
  for (const [path, page] of Object.entries(pageContent)) {
    const body = page.sections
      .map((s) => [`## ${s.heading}`, ...s.body, ...(s.list ?? []).map((l) => `- ${l}`)].join("\n"))
      .join("\n");
    parts.push(`# ${page.title} (page: ${path})\n${page.intro}\n${body}`);
  }
  cached = parts.join("\n\n").slice(0, 60000);
  return cached;
}
