import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/admissions/how-to-apply")({
  head: () => pageMeta("/admissions/how-to-apply"),
  component: () => <ContentPage path="/admissions/how-to-apply" />,
});
