import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";
import { PolicyList } from "@/components/common/PolicyList";

export const Route = createFileRoute("/policies")({
  head: () => pageMeta("/policies"),
  component: () => <ContentPage path="/policies" appendBody={<PolicyList />} />,
});
