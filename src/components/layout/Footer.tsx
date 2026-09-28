import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { footerLegalLinks, mainNav, parentQuickLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  const sections = mainNav.filter((section) => section.children);

  return (
    <footer className="border-t border-border bg-cream">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{siteConfig.description}</p>
          <address className="mt-4 space-y-1 text-sm not-italic">
            <p>{siteConfig.address}</p>
            <p>{siteConfig.location}</p>
            <p>Tel: {siteConfig.phone}</p>
            <p>WhatsApp: {siteConfig.whatsapp}</p>
            <p>Email: {siteConfig.email}</p>
          </address>
        </div>

        <div>
          <h2 className="text-base font-bold uppercase tracking-[0.12em]">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {parentQuickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold uppercase tracking-[0.12em]">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.to}>
                <Link to={section.to} className="hover:underline">
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/news" className="hover:underline">
                News
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold uppercase tracking-[0.12em]">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLegalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container-page flex flex-col gap-2 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.developerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
