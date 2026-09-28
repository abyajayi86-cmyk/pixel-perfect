import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/forms/EnquiryForms";
import { ContactCard } from "@/components/common/ContactCard";
import { SimplePage, meta } from "@/lib/simple-page";

export const Route = createFileRoute("/contact/enquiry")({
  head: () => meta("Send an Enquiry", "Send a message to the Honeytots School office."),
  component: () => (
    <SimplePage title="Send an Enquiry" eyebrow="Contact" intro="We are happy to answer your questions. Send us a message or reach us directly." family="sky">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]"><ContactForm /><ContactCard /></div>
    </SimplePage>
  ),
});
