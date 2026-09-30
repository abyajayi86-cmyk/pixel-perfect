import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, GraduationCap, Phone, Shirt, UserRound, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { parentLinks, type ParentLink, type ParentLinkIcon } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const icons: Record<ParentLinkIcon, LucideIcon> = {
  portal: UserRound,
  calendar: CalendarDays,
  clock: Clock,
  shirt: Shirt,
  wallet: Wallet,
  admissions: GraduationCap,
  phone: Phone,
};

/**
 * Persistent parent shortcuts.
 *
 * `rail` is the vertical strip down the right-hand edge of the desktop hero.
 * `inline` is the compact horizontal version used on smaller screens, where a
 * fixed edge strip would be cramped and easy to hit by accident.
 *
 * These links are deliberately high-frequency items from AGENTS.md section 7:
 * parents must reach Fees, School Day, Calendar, Uniform, Policies and Contact
 * within two clicks.
 */
export function ParentLinks({
  variant = "rail",
  className,
}: {
  variant?: "rail" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <nav aria-label="Parent links" className={cn("container-page py-10", className)}>
        <p className="eyebrow">Parent links</p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {parentLinks.map((link) => (
            <li key={link.to}>
              <Pill link={link} />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Parent links"
      className={cn(
        "on-navy absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-l-[2rem] border border-r-0 border-cream/25 bg-navy-deep/85 p-2.5 backdrop-blur-md xl:block",
        className,
      )}
    >
      <p className="eyebrow px-2 pb-2 pt-1 text-cream/70">Parent links</p>
      <ul className="flex flex-col gap-1">
        {parentLinks.map((link) => {
          const Icon = icons[link.icon];
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className="group flex min-h-11 items-center gap-2.5 rounded-2xl px-3 text-sm font-semibold text-cream/85 transition-colors duration-200 hover:bg-cream hover:text-navy-deep"
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <span className="whitespace-nowrap">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Pill({ link }: { link: ParentLink }) {
  const Icon = icons[link.icon];
  return (
    <Link
      to={link.to}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-card px-4 py-2 text-sm font-semibold text-navy transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-cream"
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      {link.label}
    </Link>
  );
}
