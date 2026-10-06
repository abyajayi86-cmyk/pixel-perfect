import type { ReactNode } from "react";

const control =
  "min-h-12 w-full rounded-2xl border-2 border-border bg-background px-4 py-2.5 text-base outline-none focus:border-primary";

export function Field({
  label,
  name,
  children,
  required,
  hint,
}: {
  label: string;
  name: string;
  children?: ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold">
        {label}
        {required ? <span className="text-coral"> *</span> : null}
      </label>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const controlClass = control;
