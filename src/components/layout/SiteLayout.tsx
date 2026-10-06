import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { WebsitePreviewNotice } from "@/components/common/WebsitePreviewNotice";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Public page shell: skip link → website preview notice → site header → main
 * landmark → footer.
 *
 * Two layout branches based on current route:
 *
 * 1. HOME (`/`) — hero-friendly layout
 *    - Preview notice in normal flow at the very top
 *    - Header is sticky and immediately below the preview, rendering on top
 *      of the hero (transparent overlay at scroll top, solid once scrolled).
 *    - Children are rendered inside main so the hero carousel visually sits
 *      behind the transparent header at the top of the viewport, but below
 *      the preview notice in document order.
 *
 * 2. ALL OTHER ROUTES — inner pages
 *    - Preview notice in normal flow
 *    - Header always solid / sticky, separated from content with a border
 *    - Main content pushed below as usual
 *
 * Book a Visit / Parent Portal remain intentionally outside the global desktop
 * header (kept via mobile drawer, mega-menu items, Parent Links, and their
 * dedicated routes).
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      <WebsitePreviewNotice />

      {isHome ? (
        <div className="relative">
          <Header variant="home" />
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      ) : (
        <>
          <Header variant="inner" />
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
