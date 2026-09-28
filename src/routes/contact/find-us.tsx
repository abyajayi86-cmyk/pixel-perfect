import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/contact/find-us")({
  head: () => pageMeta("/contact/find-us"),
  component: () => <ContentPage path="/contact/find-us" />,
});
