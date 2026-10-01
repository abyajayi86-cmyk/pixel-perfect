import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { WebsitePreviewNotice } from "@/components/common/WebsitePreviewNotice";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Public page shell: skip link, header, main landmark, footer.
 *
 * On the home route the header overlays the hero so the carousel runs full-bleed
 * behind the navigation. Everywhere else it is sticky and the main content is
 * pushed down normally.
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

      <WebsitePreviewNotice />

      {overlay ? (
        <div className="absolute inset-x-0 top-0 z-40">
          <Header overlay />
        </div>
      ) : (
        <Header />
      )}

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
