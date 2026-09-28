import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/gallery")({
  head: () => pageMeta("/gallery"),
  component: () => <ContentPage path="/gallery" />,
});
