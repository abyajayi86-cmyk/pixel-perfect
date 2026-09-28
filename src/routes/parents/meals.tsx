import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/meals")({
  head: () => pageMeta("/parents/meals"),
  component: () => <ContentPage path="/parents/meals" />,
});
