import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";
import { NewsList } from "@/components/common/NewsList";

export const Route = createFileRoute("/news")({
  head: () => pageMeta("/news"),
  component: () => <ContentPage path="/news" appendBody={<NewsList />} />,
});
