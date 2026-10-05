import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { familyStyles } from "@/lib/family";
import { mainNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

/**
 * Scroll threshold before the home header switches from transparent overlay to
 * solid sticky scrolled styling. Approximately the height of the preview strip (~48px) so the
 * transition lines up with the user starting to actually read content.
 */
const SCROLLED_THRESHOLD = 40;

/**
 * Site header with two usage modes driven by `variant`:
 *
 *  - "home" — the homepage header. It starts TRANSPARENT over the top of the
 *    hero (overlay), with cream text against the hero imagery. After the page is
 *    the user has scrolled past SCROLLED_THRESHOLD it becomes a solid
 *    cream sticky bar with navy, with a subtle bottom border and soft shadow.
 *    This gives the "blended-in hero → separated sticky" relationship with the navigation
 *    hero region.
 *
 *  - "inner" — all other routes. Always solid cream, sticky, separated from
 *    content. This keeps inner pages never show a full-width hero.
 *
 * Desktop layout (left → right, both variants once scrolled or inner):
 *   Logo / School Name  ·  Main Navigation  ·  (flex gap)  ·  Search
 *
 * Book a Visit and Parent Portal are intentionally omitted from the desktop
 * global header (kept accessible through: the mobile drawer, the mega-menu
 * panels, Parents Links, and the dedicated /book-a-visit and
 * /parent-portal routes.
 */
export function Header({ variant = "inner" }: { variant?: "home" | "inner" }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setScrolled(false);
  }, [pathname]);

  useEffect(() => {
    if (variant !== "home") return;
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onClickAway = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, []);

  const onDark = variant === "home" && !scrolled;
  const solid = variant === "inner" || scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-200 motion-reduce:transition-none",
        solid
          ? "border-b border-border bg-cream/95 shadow-[var(--shadow-card)] backdrop-blur"
          : "border-b border-cream/15 bg-transparent",
      )}
    >
      <div ref={navRef} className="container-page relative">
        <div
          className={cn("flex items-center justify-between gap-4", scrolled ? "py-3" : "py-3.5")}
        >
          <Logo onDark={onDark} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((section) => {
                const styles = familyStyles[section.family];
                const isOpen = openMenu === section.label;

                const navBase =
                  "nav-underline inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-bold tracking-tight whitespace-nowrap transition-colors duration-200";
                const navIdle = onDark
                  ? cn(navBase, "text-cream hover:bg-cream/15")
                  : cn(navBase, "text-navy hover:bg-cream-deep");
                const navActive = onDark ? "bg-cream/20 text-cream" : "bg-cream-deep text-navy";
                const navOpen = onDark ? "bg-cream/20" : styles.soft;

                if (!section.children) {
                  return (
                    <li key={section.label} className="relative">
                      <Link
                        to={section.to}
                        className={navIdle}
                        activeProps={{ className: navActive }}
                        activeOptions={{ exact: true }}
                      >
                        {section.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={section.label} className="relative">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : section.label)}
                      className={cn(navIdle, "gap-1", isOpen && navOpen)}
                    >
                      {section.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {isOpen ? (
                      <MegaMenu section={section} onNavigate={() => setOpenMenu(null)} />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/search"
              aria-label="Search the website"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200",
                onDark ? "text-cream hover:bg-cream/15" : "text-navy hover:bg-cream-deep",
              )}
            >
              <Search aria-hidden="true" className="size-5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border-2 transition-colors duration-200 lg:hidden",
                onDark
                  ? "border-cream/50 text-cream hover:bg-cream/15"
                  : "border-navy/20 text-navy hover:bg-cream-deep",
              )}
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
