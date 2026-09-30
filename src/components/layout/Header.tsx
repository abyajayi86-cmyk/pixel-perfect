import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/common/Button";
import { familyStyles } from "@/lib/family";
import { mainNav, parentLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

/**
 * Site header.
 *
 * Two behaviours:
 *  - `sticky` (default): an opaque cream bar that sticks to the top.
 *  - `overlay`: a transparent bar sitting on top of the home hero, with cream
 *    text, so the hero runs edge to edge behind the navigation.
 *
 * Desktop navigation opens a wide inline mega menu. Every top-level item is also
 * a link, so nothing depends on opening a panel.
 */
export function Header({ overlay = false }: { overlay?: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Never leave a panel open across a route change.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

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

  return (
    <header
      className={cn(
        overlay
          ? "on-navy absolute inset-x-0 top-0 z-40 border-b border-cream/15"
          : "sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur",
      )}
    >
      <div ref={navRef} className="container-page relative">
        <div className={cn("flex items-center justify-between gap-4", overlay ? "py-3" : "py-3.5")}>
          <Logo onDark={overlay} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((section) => {
                const styles = familyStyles[section.family];
                const isOpen = openMenu === section.label;

                if (!section.children) {
                  return (
                    <li key={section.label}>
                      <Link
                        to={section.to}
                        className={cn(
                          "nav-underline inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-bold transition-colors duration-200",
                          overlay
                            ? "text-cream hover:bg-cream/15"
                            : "text-navy hover:bg-cream-deep",
                        )}
                        activeProps={{
                          className: overlay ? "bg-cream/20 text-cream" : "bg-cream-deep text-navy",
                        }}
                        activeOptions={{ exact: true }}
                      >
                        {section.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={section.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : section.label)}
                      className={cn(
                        "nav-underline inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-[0.95rem] font-bold transition-colors duration-200",
                        overlay ? "text-cream hover:bg-cream/15" : "text-navy hover:bg-cream-deep",
                        isOpen && !overlay && styles.soft,
                        isOpen && overlay && "bg-cream/20",
                      )}
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
                overlay ? "text-cream hover:bg-cream/15" : "text-navy hover:bg-cream-deep",
              )}
            >
              <Search aria-hidden="true" className="size-5" />
            </Link>

            <ButtonLink
              to="/book-a-visit"
              variant={overlay ? "onNavy" : "primary"}
              className="hidden sm:inline-flex"
            >
              Book a Visit
            </ButtonLink>
            <ButtonLink to="/parent-portal" variant="secondary" className="hidden xl:inline-flex">
              Parent Portal
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border-2 transition-colors duration-200 lg:hidden",
                overlay
                  ? "border-cream/50 text-cream hover:bg-cream/15"
                  : "border-navy/20 text-navy hover:bg-cream-deep",
              )}
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        {mainNav.map((section) =>
          openMenu === section.label ? (
            <MegaMenu
              key={section.label}
              section={section}
              parentLinks={parentLinks}
              onNavigate={() => setOpenMenu(null)}
            />
          ) : null,
        )}
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
