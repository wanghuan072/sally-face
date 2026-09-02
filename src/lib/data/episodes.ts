import episodeRecords from "@/data/game/episodes.json";
import type { Episode } from "@/types/game";

export const episodes = episodeRecords as Episode[];

export function getEpisodeBySlug(slug: string) {
  return episodes.find((episode) => episode.slug === slug);
}

export function getNextEpisode(number: number) {
  return episodes.find((episode) => episode.number === number + 1);
}
