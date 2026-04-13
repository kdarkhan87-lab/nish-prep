import { redirect } from "next/navigation";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string; topicId: string }>;
}) {
  const { slug, topicId } = await params;
  redirect(`/subjects/${slug}/${topicId}/theory`);
}
