export const CHAPTER_SLUGS = [
  "chapter-1-strange-neighbors",
  "chapter-2-the-wretched",
  "chapter-3-the-bologna-incident",
  "chapter-4-the-trial",
  "chapter-5-memories-and-dreams",
] as const;

export function chapterSlugFor(number: number) {
  const slug = CHAPTER_SLUGS[number - 1];
  if (!slug) throw new Error(`Unknown chapter number: ${number}`);
  return slug;
}
