import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/forms/EnquiryForms";
import { ContactCard } from "@/components/common/ContactCard";
import { LocationMap } from "@/components/common/LocationSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SimplePage, meta } from "@/lib/simple-page";

export const Route = createFileRoute("/contact/")({
  head: () => meta("Contact Us", "Get in touch with the Honeytots School office."),
  component: () => (
    <SimplePage
      title="Contact Us"
      eyebrow="Contact"
      intro="We are happy to answer your questions. Send us a message or reach us directly."
      family="sky"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <ContactForm />
        <ContactCard />
      </div>

      <div className="mt-14 md:mt-20">
        <SectionHeading
          eyebrow="Visit Honeytots"
          title="Where to find us"
          intro="The address above is where we are for now. Open the map for a wider view, or tap Get Directions to start a route."
        />
        <LocationMap className="mt-8" />
      </div>
    </SimplePage>
  ),
});
