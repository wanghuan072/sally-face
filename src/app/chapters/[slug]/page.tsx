import { notFound } from "next/navigation";
import EpisodeDetailPage from "@/page/episodes/EpisodeDetailPage";
import { episodes, getEpisodeBySlug } from "@/lib/data/episodes";
import { createMetadata } from "@/seo/metadata";

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const episode = getEpisodeBySlug(slug);
    if (!episode) return {};
    return createMetadata({ title: episode.seo.title, description: episode.seo.description, path: `/chapters/${slug}`, image: episode.image });
  });
}

export default async function ChapterRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();
  return <EpisodeDetailPage episode={episode} />;
}
