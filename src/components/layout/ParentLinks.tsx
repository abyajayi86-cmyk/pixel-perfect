import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  GraduationCap,
  Phone,
  Shirt,
  UserRound,
  Wallet,
} from "lucide-react";
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
 * The rail is tucked by default: only a slim handle is visible against the hero
 * edge, and the panel of links is parked off-canvas to the right. It slides into
 * view on `:hover` of the handle and on `:focus-within`, so the links are
 * reachable by keyboard and by touch, not by mouse alone.
 *
 * The reveal is a single `translateX` plus an opacity crossfade, so nothing
 * reflows and there is no layout shift. Under `prefers-reduced-motion` the
 * transform is dropped and the panel is simply always open, which is also the
 * state keyboard users get for free once they tab into it.
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
        </ul>{" "}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Parent links"
      className={cn(
        // `group` drives the reveal: the panel reacts to the whole rail, so
        // hovering the open panel itself keeps it open.
        "on-navy group absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 xl:block",
        className,
      )}
    >
      {/*
        Handle: the only part visible while tucked, and therefore the hover
        target. It is decorative and deliberately not focusable, so keyboard
        users tab straight into the real links, which reveals the panel.
      */}
      <span
        aria-hidden="true"
        className="flex h-40 w-11 items-center justify-center rounded-l-[2rem] border border-r-0 border-cream/25 bg-navy-deep/90 text-cream/85 backdrop-blur-md transition-colors duration-200 ease-out group-hover:bg-cream group-hover:text-navy-deep"
      >
        <ChevronLeft className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
      </span>

      {/*
        Panel: parked fully off-canvas to the right and slid back to `right-0`
        on hover or focus-within. `z-10` keeps it above the handle once open,
        so no link is ever covered. Width comes from its own content, so
        `translate-x-full` moves it by exactly its own width.
      */}
      <div className="absolute right-0 top-1/2 z-10 w-max -translate-y-1/2 translate-x-full rounded-l-[2rem] border border-r-0 border-cream/25 bg-navy-deep/90 p-2.5 opacity-0 backdrop-blur-md transition-[transform,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none">
        <p className="eyebrow px-2 pb-2 pt-1 text-cream/70">Parent links</p>
        <ul className="flex flex-col gap-1">
          {parentLinks.map((link) => {
            const Icon = icons[link.icon];
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group/link flex min-h-11 items-center gap-2.5 rounded-2xl px-3 text-sm font-semibold text-cream/85 transition-colors duration-200 hover:bg-cream hover:text-navy-deep"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/link:scale-110 motion-reduce:transition-none motion-reduce:group-hover/link:scale-100"
                  />
                  <span className="whitespace-nowrap">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function Pill({ link }: { link: ParentLink }) {
  const Icon = icons[link.icon];
  return (
    <Link
      to={link.to}
      className="interactive group inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-card px-4 py-2 text-sm font-semibold text-navy hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-cream"
    >
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {link.label}
    </Link>
  );
}
