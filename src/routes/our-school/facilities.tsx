import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/facilities")({
  head: () => pageMeta("/our-school/facilities"),
  component: () => <ContentPage path="/our-school/facilities" />,
});
