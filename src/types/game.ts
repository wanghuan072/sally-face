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
  checkpoints: string[];
  puzzles: EpisodePuzzle[];
  quickReferences?: ChapterReference[];
  quickAnswersTitle?: string;
  items: EpisodeItem[];
  ending: string;
  faqs: Faq[];
  seo: SeoRecord;
};

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
  episodes: string[];
  relationships: { name: string; slug: string; detail: string }[];
  trivia: string[];
  faqs: Faq[];
  seo: SeoRecord;
};

export type Achievement = {
  name: string;
  episode: number;
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
  episodeSlug: string;
  kind: "chapter" | "completion";
  category: "Chapter Walkthroughs" | "100% Completion";
  steps: { title: string; body: string }[];
  mistakes: string[];
  faqs: Faq[];
  seo: SeoRecord;
  facts: { label: string; value: string }[];
  relatedChapters: { label: string; href: string }[];
  gallery: { image: string; alt: string; caption: string }[];
};
