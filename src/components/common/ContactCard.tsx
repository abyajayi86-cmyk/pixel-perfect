import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const rows = [
  { icon: Phone, label: "Telephone", value: siteConfig.phone },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsapp },
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: MapPin, label: "Address", value: siteConfig.address },
];

export function ContactCard() {
  return (
    <div className="card-surface p-6">
      <h2 className="text-xl">School contact details</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Details in brackets are placeholders awaiting confirmation from the school.
      </p>
      <dl className="mt-6 space-y-4">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-3">
            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-cream text-primary">
              <Icon aria-hidden="true" className="size-4" />
            </span>
            <div>
              <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
