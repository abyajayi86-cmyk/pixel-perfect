import { createFileRoute } from "@tanstack/react-router";
import { BookVisitForm } from "@/components/forms/EnquiryForms";
import { ContactCard } from "@/components/common/ContactCard";
import { SimplePage, meta } from "@/lib/simple-page";

export const Route = createFileRoute("/book-a-visit")({
  head: () => meta("Book a Visit", "Arrange a tour of Honeytots School and meet our team."),
  component: () => (
    <SimplePage title="Book a Visit" eyebrow="Admissions" intro="Choose a preferred date and we will confirm your school tour." family="leaf">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]"><BookVisitForm /><ContactCard /></div>
    </SimplePage>
  ),
});
