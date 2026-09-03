import type { Episode } from "@/types/game";

/** Cutoff, replay, and achievement-hunting notes. These belong on Guides, not Chapter routes. */
export function isPitfallTip(tip: string) {
  return /replay|miss|skip|do not|don't|fail|required|locks|alternate|achievement|optional|mutually|point of no return|game-over|game over|sighting/i.test(tip);
}

export function getWalkthroughPitfallTips(episode: Episode) {
  return [...new Set(episode.walkthrough.filter((step) => isPitfallTip(step.tip)).map((step) => step.tip))];
}
