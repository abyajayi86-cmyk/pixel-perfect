import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { isPlaceholder, placeholderLabel } from "@/lib/placeholder";
import { siteConfig } from "@/lib/site-config";

const rows = [
  { icon: Phone, label: "Telephone", value: siteConfig.phone },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsapp },
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: MapPin, label: "Address", value: siteConfig.address },
];

/**
 * School contact details.
 *
 * Phase One has no confirmed contact information, so every bracketed value is
 * labelled as a placeholder instead of being presented as a real detail.
 */
export function ContactCard() {
  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
      <h2 className="text-xl">School contact details</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Items shown in brackets are placeholders awaiting confirmation from Honeytots School.
      </p>
      <dl className="mt-6 space-y-5">
        {rows.map(({ icon: Icon, label, value }) => {
          const pending = isPlaceholder(value);
          return (
            <div key={label} className="flex gap-3.5">
              <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream-deep text-navy">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
                <dd
                  className={
                    pending ? "font-semibold text-navy-tint" : "break-words font-semibold text-navy"
                  }
                >
                  {pending ? placeholderLabel(value) : value}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
