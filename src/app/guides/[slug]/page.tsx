import { notFound } from "next/navigation";
import GuideDetailPage from "@/page/guides/GuideDetailPage";
import { getGuideBySlug, guides } from "@/lib/data/guides";
import { createMetadata } from "@/seo/metadata";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const guide = getGuideBySlug(slug);
    return guide ? createMetadata({ ...guide.seo, path: `/guides/${slug}`, image: guide.image }) : {};
  });
}

export default async function GuideRoute({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuideBySlug((await params).slug);
  if (!guide) notFound();
  return <GuideDetailPage guide={guide} />;
}
