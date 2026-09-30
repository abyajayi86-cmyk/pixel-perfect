import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

/**
 * Public page shell: skip link, announcement, header, main landmark, footer.
 *
 * On the home route the header and announcement overlay the hero so the carousel
 * runs full-bleed behind the navigation. Everywhere else they are sticky and the
 * main content is pushed down normally.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const overlay = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      {overlay ? (
        <div className="absolute inset-x-0 top-0 z-40">
          <AnnouncementBar overlay />
          <Header overlay />
        </div>
      ) : (
        <>
          <AnnouncementBar />
          <Header />
        </>
      )}

      <main id="main-content" className={cn("flex-1", !overlay && "pt-0")}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
