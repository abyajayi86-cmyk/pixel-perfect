import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/attendance")({
  head: () => pageMeta("/parents/attendance"),
  component: () => <ContentPage path="/parents/attendance" />,
});
