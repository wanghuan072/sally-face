import guideRecords from "@/data/guides/guides.json";
import type { Guide } from "@/types/game";

export const guides = guideRecords as Guide[];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getChapterGuide(chapterSlug: string) {
  const dataSlug = chapterSlug.replace(/^episode-/, "chapter-");
  return guides.find((guide) => guide.chapterSlug === dataSlug);
}

export function getChapterGuideByEpisodeSlug(episodeSlug: string) {
  return getChapterGuide(episodeSlug);
}

export function guideCategoryParam(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getGuideCategories() {
  return [...new Set(guides.map((guide) => guide.category))];
}

export function getGuidesByCategoryParam(category?: string) {
  if (!category) return guides;
  if (category === "chapters") return guides.filter((guide) => guide.kind === "chapter");
  return guides.filter((guide) => guideCategoryParam(guide.category) === category);
}
