import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/common/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { familyStyles } from "@/lib/family";
import { mainNav, parentQuickLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setQuickOpen(false);
      }
    };
    const onClickAway = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setQuickOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div ref={navRef} className="container-page">
        <div className="flex items-center justify-between gap-4 py-3">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((section) => {
                const styles = familyStyles[section.family];
                const isOpen = openMenu === section.label;
                if (!section.children) {
                  return (
                    <li key={section.label}>
                      <Link
                        to={section.to}
                        className="inline-flex min-h-11 items-center rounded-full px-4 font-semibold hover:bg-cream"
                        activeProps={{ className: "bg-cream" }}
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
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 font-semibold hover:bg-cream",
                        isOpen && styles.soft,
                      )}
                    >
                      {section.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
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
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-cream"
            >
              <Search aria-hidden="true" className="size-5" />
            </Link>
            <ButtonLink to="/book-a-visit" className="hidden sm:inline-flex">
              Book a Visit
            </ButtonLink>
            <ButtonLink to="/parent-portal" variant="secondary" className="hidden lg:inline-flex">
              Parent Portal
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-border lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        {mainNav.map((section) => {
          if (!section.children || openMenu !== section.label) return null;
          const styles = familyStyles[section.family];
          return (
            <div
              key={section.label}
              className={cn("hidden pb-5 lg:block")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className={cn("rounded-3xl p-6 ring-1", styles.soft, styles.ring)}>
                <p className={cn("text-sm font-bold uppercase tracking-[0.14em]", styles.text)}>
                  {section.label}
                </p>
                <ul className="mt-4 grid grid-cols-3 gap-2">
                  {section.children.map((child) => (
                    <li key={child.to + child.label}>
                      <Link
                        to={child.to}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-2xl bg-background/80 px-4 py-3 transition-colors hover:bg-background"
                      >
                        <span className="block font-semibold">{child.label}</span>
                        {child.description ? (
                          <span className="mt-0.5 block text-sm text-muted-foreground">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Parent quick links */}
        <div className="hidden justify-end pb-2 lg:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={quickOpen}
              onClick={() => setQuickOpen(!quickOpen)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-leaf-soft px-4 text-sm font-semibold text-leaf"
            >
              Parent Quick Links
              <ChevronDown aria-hidden="true" className={cn("size-4", quickOpen && "rotate-180")} />
            </button>
            {quickOpen ? (
              <ul className="card-surface absolute right-0 z-50 mt-2 w-64 p-2">
                {parentQuickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setQuickOpen(false)}
                      className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold hover:bg-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
