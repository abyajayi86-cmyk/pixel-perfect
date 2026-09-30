import { Link } from "@tanstack/react-router";
import { placeholderLabel, isPlaceholder } from "@/lib/placeholder";
import { footerLegalLinks, mainNav, parentLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "./Logo";

export function Footer() {
  const sections = mainNav.filter((section) => section.children);
  const year = new Date().getFullYear();

  const contactLines = [
    { label: "Address", value: siteConfig.address },
    { label: "Location", value: siteConfig.location },
    { label: "Telephone", value: siteConfig.phone },
    { label: "WhatsApp", value: siteConfig.whatsapp },
    { label: "Email", value: siteConfig.email },
  ];

  return (
    <footer className="on-navy bg-navy text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
            {siteConfig.description}
          </p>
          <address className="mt-6 space-y-1.5 text-sm not-italic text-cream/70">
            {contactLines.map(({ label, value }) => (
              <p key={label}>
                <span className="font-semibold text-cream/90">{label}: </span>
                {isPlaceholder(value) ? placeholderLabel(value) : value}
              </p>
            ))}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-honey">
            Parent links
          </h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {parentLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to} className="py-1 text-cream/80 hover:text-honey hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-honey">Explore</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {sections.map((section) => (
              <li key={section.to}>
                <Link
                  to={section.to}
                  className="py-1 text-cream/80 hover:text-honey hover:underline"
                >
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/news" className="py-1 text-cream/80 hover:text-honey hover:underline">
                News
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="py-1 text-cream/80 hover:text-honey hover:underline">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-honey">Legal</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {footerLegalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="py-1 text-cream/80 hover:text-honey hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.developerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
