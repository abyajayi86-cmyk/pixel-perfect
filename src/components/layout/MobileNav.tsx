import { Link } from "@tanstack/react-router";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/common/Button";
import { mainNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-background shadow-[var(--shadow-lift)]"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-lg font-bold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-cream"
            aria-label="Close menu"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {mainNav.map((section) => (
              <li key={section.label} className="border-b border-border/70 last:border-0">
                {section.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={expanded === section.label}
                      onClick={() => setExpanded(expanded === section.label ? null : section.label)}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3 text-left font-display text-base font-bold hover:bg-cream"
                    >
                      {section.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-5 transition-transform duration-200",
                          expanded === section.label && "rotate-180",
                        )}
                      />
                    </button>
                    {expanded === section.label ? (
                      <ul className="mb-2 space-y-0.5 pl-3">
                        {section.children.map((child) => (
                          <li key={child.to + child.label}>
                            <Link
                              to={child.to}
                              onClick={onClose}
                              className="flex min-h-11 items-center rounded-xl px-3 text-[0.95rem] text-muted-foreground hover:bg-cream hover:text-foreground"
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
                    className="flex min-h-12 items-center rounded-xl px-3 font-display text-base font-bold hover:bg-cream"
                  >
                    {section.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 border-t border-border px-5 py-4">
          <ButtonLink to="/book-a-visit" size="lg">
            Book a Visit
          </ButtonLink>
          <ButtonLink to="/parent-portal" variant="secondary" size="lg">
            Parent Portal
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
