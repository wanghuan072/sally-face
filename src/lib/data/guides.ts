import guideRecords from "@/data/guides/guides.json";
import type { Guide } from "@/types/game";

export const guides = guideRecords as Guide[];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getChapterGuideByEpisodeSlug(episodeSlug: string) {
  return guides.find((guide) => guide.kind === "chapter" && guide.episodeSlug === episodeSlug);
}
