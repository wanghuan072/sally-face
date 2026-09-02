import achievementRecords from "@/data/game/achievements.json";
import type { Achievement } from "@/types/game";

export const achievements = achievementRecords as Achievement[];

export function getAchievementsByEpisode(episode: number) {
  return achievements.filter((achievement) => achievement.episode === episode);
}

const episodeSlugs = ["episode-1-strange-neighbors", "episode-2-the-wretched", "episode-3-the-bologna-incident", "episode-4-the-trial", "episode-5-memories-and-dreams"];

const focusedRoutes: Record<string, { href: string; label: string }> = {
  "House of the Wretched": { href: "/chapters/episode-1-strange-neighbors#walkthrough", label: "Open Chapter One route" },
  "Premonition": { href: "/chapters/episode-3-the-bologna-incident#puzzles", label: "Open Chapter Three codes" },
  "Teeth": { href: "/chapters/episode-4-the-trial#puzzles", label: "Open bird cage route" },
  "Memorized": { href: "/chapters/episode-5-memories-and-dreams#puzzles", label: "Open shed code" },
};

export function getAchievementId(achievement: Achievement) {
  return `achievement-${achievement.episode}-${achievement.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function getAchievementIcon(achievement: Achievement) {
  const assetSlug = achievement.name === "Charley's Pony" ? "charleys-pony" : achievement.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `/images/achievements/${assetSlug}.jpg`;
}

export function getAchievementEpisodeHref(achievement: Achievement) {
  return `/chapters/${episodeSlugs[achievement.episode - 1]}#achievements`;
}

export function getAchievementRoute(achievement: Achievement) {
  return focusedRoutes[achievement.name] ?? { href: `/chapters/${episodeSlugs[achievement.episode - 1]}#walkthrough`, label: "Open Chapter route" };
}
