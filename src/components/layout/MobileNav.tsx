import { Link } from "@tanstack/react-router";
import { ChevronDown, GraduationCap, Info, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/common/Button";
import { familyStyles } from "@/lib/family";
import { mainNav, parentLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation drawer.
 *
 * Opens as: persistent actions, the four shortcut cards required by AGENTS.md
 * (Admissions, School Day, Parent Information, Contact Us), then the full
 * section tree. Parent links sit at the end.
 *
 * Focus is moved into the panel on open and Escape closes it.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [panelRef, setPanelRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, panelRef]);

  if (!open) return null;

  const shortcuts = [
    { label: "Admissions", to: "/admissions", icon: GraduationCap },
    { label: "School Day", to: "/parents/school-day", icon: Info },
    { label: "Parent Information", to: "/parents", icon: Info },
    { label: "Contact Us", to: "/contact", icon: Phone },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-navy-deep/70"
      />
      <div
        ref={setPanelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-[var(--shadow-float)] outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-lg font-extrabold text-navy">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-cream-deep"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-2.5">
            <ButtonLink to="/book-a-visit" size="lg">
              Book a Visit
            </ButtonLink>
            <ButtonLink to="/parent-portal" variant="secondary" size="lg">
              Parent Portal
            </ButtonLink>
          </div>

          <p className="eyebrow mt-7">Quick access</p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {shortcuts.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="group flex min-h-20 flex-col justify-between gap-2 rounded-[1.25rem] bg-cream-deep p-3.5 text-sm font-bold text-navy transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-honey-soft active:translate-y-0 active:bg-honey-soft motion-reduce:transition-[background-color] motion-reduce:hover:translate-y-0"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-5 text-navy-tint transition-transform duration-200 ease-out group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <nav aria-label="All sections" className="mt-7">
            <ul>
              {mainNav.map((section) => {
                const styles = familyStyles[section.family];
                return (
                  <li key={section.label} className="border-b border-border/70 last:border-0">
                    {section.children ? (
                      <>
                        <div className="flex items-stretch">
                          <Link
                            to={section.to}
                            onClick={onClose}
                            className="flex min-h-14 flex-1 items-center px-1 font-display text-base font-extrabold text-navy"
                          >
                            {section.label}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={expanded === section.label}
                            aria-label={`${expanded === section.label ? "Collapse" : "Expand"} ${section.label}`}
                            onClick={() =>
                              setExpanded(expanded === section.label ? null : section.label)
                            }
                            className={cn(
                              "inline-flex w-14 items-center justify-center text-navy",
                              expanded === section.label && styles.soft,
                            )}
                          >
                            <ChevronDown
                              aria-hidden="true"
                              className={cn(
                                "size-5 transition-transform duration-200",
                                expanded === section.label && "rotate-180",
                              )}
                            />
                          </button>
                        </div>
                        {expanded === section.label ? (
                          <ul className="mb-3 space-y-0.5 pl-2">
                            {section.children.map((child) => (
                              <li key={child.to + child.label}>
                                <Link
                                  to={child.to}
                                  onClick={onClose}
                                  className="flex min-h-12 items-center rounded-xl px-3 text-[0.95rem] font-semibold text-navy/80 hover:bg-cream-deep"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        to={section.to}
                        onClick={onClose}
                        className="flex min-h-14 items-center px-1 font-display text-base font-extrabold text-navy"
                      >
                        {section.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className="eyebrow mt-7">Parent links</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {parentLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center rounded-full border border-navy/15 bg-card px-4 text-sm font-semibold text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
