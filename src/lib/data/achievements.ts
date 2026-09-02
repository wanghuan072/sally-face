import achievementRecords from "@/data/game/achievements.json";
import type { Achievement } from "@/types/game";
import { chapterSlugFor } from "@/lib/data/chapter-slugs";

export const achievements = achievementRecords as Achievement[];

export function getAchievementsByChapter(chapter: number) {
  return achievements.filter((achievement) => achievement.chapter === chapter);
}

export function getAchievementsByEpisode(episode: number) {
  return getAchievementsByChapter(episode);
}

const focusedRoutes: Record<string, { href: string; label: string }> = {
  "House of the Wretched": { href: "/chapters/chapter-1-strange-neighbors#walkthrough", label: "Open Chapter One route" },
  "Premonition": { href: "/chapters/chapter-3-the-bologna-incident#puzzles", label: "Open Chapter Three codes" },
  "Teeth": { href: "/chapters/chapter-4-the-trial#puzzles", label: "Open bird cage route" },
  "Memorized": { href: "/chapters/chapter-5-memories-and-dreams#puzzles", label: "Open shed code" },
};

export function getAchievementId(achievement: Achievement) {
  return `achievement-${achievement.chapter}-${achievement.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function getAchievementIcon(achievement: Achievement) {
  const assetSlug = achievement.name === "Charley's Pony" ? "charleys-pony" : achievement.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `/images/achievements/${assetSlug}.jpg`;
}

export function getAchievementEpisodeHref(achievement: Achievement) {
  return `/chapters/${chapterSlugFor(achievement.chapter)}#achievements`;
}

export function getAchievementRoute(achievement: Achievement) {
  return focusedRoutes[achievement.name] ?? { href: `/chapters/${chapterSlugFor(achievement.chapter)}#walkthrough`, label: "Open Chapter route" };
}
