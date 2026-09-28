import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/policies")({
  head: () => pageMeta("/policies"),
  component: () => <ContentPage path="/policies" />,
});
