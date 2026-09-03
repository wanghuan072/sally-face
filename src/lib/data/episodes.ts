import episodeRecords from "@/data/game/episodes.json";
import type { Episode } from "@/types/game";
import { CHAPTER_SLUGS, chapterSlugFor } from "@/lib/data/chapter-slugs";

export { CHAPTER_SLUGS, chapterSlugFor };

export const episodes = episodeRecords as Episode[];
export const chapters = episodes;

export function getChapterBySlug(slug: string) {
  const dataSlug = slug.replace(/^episode-/, "chapter-");
  return episodes.find((episode) => episode.slug === dataSlug);
}

export function getEpisodeBySlug(slug: string) {
  return getChapterBySlug(slug);
}

export function getChapterSlug(episodeOrSlug: Pick<Episode, "slug"> | string) {
  const slug = typeof episodeOrSlug === "string" ? episodeOrSlug : episodeOrSlug.slug;
  return slug.replace(/^episode-/, "chapter-");
}

export function getNextEpisode(number: number) {
  return episodes.find((episode) => episode.number === number + 1);
}

export function getPreviousEpisode(number: number) {
  return episodes.find((episode) => episode.number === number - 1);
}

export function getNextChapter(number: number) {
  return getNextEpisode(number);
}
