import characterRecords from "@/data/game/characters.json";
import type { Character, CharacterGroup } from "@/types/game";
import { chapterSlugFor } from "@/lib/data/chapter-slugs";

export const characters = characterRecords as Character[];

export const characterFilters = [
  { id: "all", label: "All Characters" },
  { id: "core-cast", label: "Core Cast" },
  { id: "family", label: "Family" },
  { id: "supernatural", label: "Supernatural" },
  { id: "chapter-1", label: "Chapter One" },
] as const;

export type CharacterFilterId = (typeof characterFilters)[number]["id"];

export function getCharacterBySlug(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getCharactersBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getCharacterBySlug(slug))
    .filter((character): character is Character => Boolean(character));
}

export function isCharacterFilterId(value: string | null): value is CharacterFilterId {
  return characterFilters.some((filter) => filter.id === value);
}

export function filterCharacters(list: Character[], filter: CharacterFilterId, query: string) {
  const needle = query.trim().toLowerCase();
  return list.filter((character) => {
    const haystack = `${character.name} ${character.alias} ${character.role} ${character.playerNote}`.toLowerCase();
    if (needle && !haystack.includes(needle)) return false;
    if (filter === "all") return true;
    if (filter === "chapter-1") return character.chapters.includes(chapterSlugFor(1));
    return character.groups.includes(filter as CharacterGroup);
  });
}
