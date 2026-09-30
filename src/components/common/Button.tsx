import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "honey" | "onNavy" | "ghost" | "onImage";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-navy-deep",
  secondary: "border-2 border-navy/20 bg-card text-navy hover:border-navy/40 hover:bg-cream-deep",
  honey: "bg-honey text-navy-deep hover:bg-honey/85",
  onNavy: "bg-cream text-navy hover:bg-honey",
  ghost: "text-navy hover:bg-cream-deep",
  onImage:
    "border-2 border-cream/70 bg-cream/10 text-cream backdrop-blur-sm hover:bg-cream hover:text-navy-deep",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ to, variant, size, className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}
