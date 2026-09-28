import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/homework-reading")({
  head: () => pageMeta("/parents/homework-reading"),
  component: () => <ContentPage path="/parents/homework-reading" />,
});
