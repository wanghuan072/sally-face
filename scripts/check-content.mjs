import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const errors = [];

const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const unique = (values, label) => {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) errors.push(`${label}: duplicate "${value}"`);
    seen.add(value);
  }
};

const chapters = await readJson("src/data/game/episodes.json");
const characters = await readJson("src/data/game/characters.json");
const achievements = await readJson("src/data/game/achievements.json");
const guides = await readJson("src/data/guides/guides.json");

if (chapters.length !== 5) errors.push(`Expected 5 chapters, found ${chapters.length}`);
if (characters.length !== 10) errors.push(`Expected 10 characters, found ${characters.length}`);
if (achievements.length !== 35) errors.push(`Expected 35 achievements, found ${achievements.length}`);
if (guides.length !== 5) errors.push(`Expected 5 guides, found ${guides.length}`);

unique(chapters.map((chapter) => chapter.slug), "chapter slug");
unique(characters.map((character) => character.slug), "character slug");
unique(guides.map((guide) => guide.slug), "guide slug");

const chapterSlugs = new Set(chapters.map((chapter) => chapter.slug));
const characterSlugs = new Set(characters.map((character) => character.slug));

for (const chapter of chapters) {
  if (!/^chapter-\d-/.test(chapter.slug)) errors.push(`Chapter slug should use chapter- prefix: ${chapter.slug}`);
  if (!chapter.playerNote) errors.push(`Chapter ${chapter.slug} is missing playerNote`);
  for (const slug of chapter.characters ?? []) {
    if (!characterSlugs.has(slug)) errors.push(`Chapter ${chapter.slug} references missing character ${slug}`);
  }
}

for (const character of characters) {
  if (!Array.isArray(character.chapters) || character.chapters.length === 0) errors.push(`Character ${character.slug} is missing chapters`);
  if (!Array.isArray(character.groups)) errors.push(`Character ${character.slug} is missing groups`);
  if (!character.playerNote) errors.push(`Character ${character.slug} is missing playerNote`);
  for (const slug of character.chapters ?? []) {
    if (!chapterSlugs.has(slug)) errors.push(`Character ${character.slug} references missing chapter ${slug}`);
  }
  for (const related of character.relationships ?? []) {
    if (!characterSlugs.has(related.slug)) errors.push(`Character ${character.slug} relationship points to missing ${related.slug}`);
  }
}

for (const achievement of achievements) {
  if (!Number.isInteger(achievement.chapter) || achievement.chapter < 1 || achievement.chapter > 5) {
    errors.push(`Achievement "${achievement.name}" has invalid chapter ${achievement.chapter}`);
  }
}

for (const guide of guides) {
  if (!chapterSlugs.has(guide.chapterSlug)) errors.push(`Guide ${guide.slug} references missing chapter ${guide.chapterSlug}`);
  if (!guide.kind || !guide.category) errors.push(`Guide ${guide.slug} is missing kind or category`);
}

const imagePattern = /\/images\/[A-Za-z0-9._/-]+\.(?:webp|png|jpg|jpeg|svg)/g;
const sources = [
  "src/data/game/episodes.json",
  "src/data/game/characters.json",
  "src/data/guides/guides.json",
  "src/config/site.ts",
];
const pageFiles = [
  "src/page/home/HomePage.tsx",
  "src/page/episodes/EpisodesPage.tsx",
  "src/page/guides/GuidesPage.tsx",
  "src/page/achievements/AchievementsPage.tsx",
  "src/page/characters/CharactersPage.tsx",
  "src/components/layout/SiteHeader.tsx",
];

const checkedImages = new Set();
for (const relativePath of [...sources, ...pageFiles]) {
  const contents = await readFile(path.join(root, relativePath), "utf8");
  for (const image of contents.match(imagePattern) ?? []) {
    if (checkedImages.has(image)) continue;
    checkedImages.add(image);
    if (!existsSync(path.join(root, "public", image))) errors.push(`Missing image ${image} (referenced in ${relativePath})`);
  }
}

if (errors.length) {
  console.error(`Content check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content check passed: ${chapters.length} chapters, ${characters.length} characters, ${achievements.length} achievements, ${guides.length} guides, ${checkedImages.size} images.`);
