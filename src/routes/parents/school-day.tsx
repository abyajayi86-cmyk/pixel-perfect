import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/school-day")({
  head: () => pageMeta("/parents/school-day"),
  component: () => <ContentPage path="/parents/school-day" />,
});
