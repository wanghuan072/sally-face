export type SeoRecord = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type WalkthroughStep = {
  title: string;
  body: string;
  tip: string;
  image: string;
  imageAlt: string;
};

export type EpisodePuzzle = {
  title: string;
  answer: string;
  href: string;
};

export type EpisodeItem = {
  name: string;
  type: string;
  location: string;
  use: string;
};

export type ChapterReference = {
  title: string;
  searchIntent: string;
  clue: string;
  solution: string;
  caution?: string;
  checklist?: string[];
};

export type RouteCheck = {
  area: string;
  goal: string;
  check: string;
  risk?: string;
};

export type AchievementPointer = {
  name: string;
  when: string;
  risk: string;
};

export type Episode = {
  slug: string;
  number: number;
  ordinal: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  releaseDate: string;
  location: string;
  length: string;
  achievementCount: number;
  characters: string[];
  overview: string[];
  walkthrough: WalkthroughStep[];
  walkthroughMistakes?: string[];
  routeChecks: RouteCheck[];
  achievementPointers: AchievementPointer[];
  checkpoints: string[];
  puzzles: EpisodePuzzle[];
  quickReferences?: ChapterReference[];
  quickAnswersTitle?: string;
  items: EpisodeItem[];
  ending: string;
  faqs: Faq[];
  seo: SeoRecord;
};

export type Chapter = Episode;

export type CharacterGroup = "core-cast" | "family" | "supernatural";

export type Character = {
  slug: string;
  name: string;
  alias: string;
  role: string;
  firstAppearance: string;
  relationship: string;
  image: string;
  imageAlt: string;
  summary: string;
  appearance: string;
  personality: string;
  storyRole: string;
  chapters: string[];
  groups: CharacterGroup[];
  relationships: { name: string; slug: string; detail: string }[];
  trivia: string[];
  faqs: Faq[];
  seo: SeoRecord;
};

export type Achievement = {
  name: string;
  chapter: number;
  type: "Story" | "Exploration" | "Collectible" | "Puzzle" | "Skill";
  hidden: boolean;
  missable: boolean;
  description: string;
  unlock: string;
};

export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  quickAnswer: string;
  image: string;
  imageAlt: string;
  chapterSlug: string;
  kind: string;
  category: string;
  steps: { title: string; body: string }[];
  mistakes: string[];
  faqs: Faq[];
  seo: SeoRecord;
  facts: { label: string; value: string }[];
  relatedChapters: { label: string; href: string }[];
  gallery: { image: string; alt: string; caption: string }[];
};
