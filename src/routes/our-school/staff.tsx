import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/staff")({
  head: () => pageMeta("/our-school/staff"),
  component: () => <ContentPage path="/our-school/staff" />,
});
