import characterRecords from "@/data/game/characters.json";
import type { Character } from "@/types/game";

export const characters = characterRecords as Character[];

export function getCharacterBySlug(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getCharactersBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getCharacterBySlug(slug))
    .filter((character): character is Character => Boolean(character));
}
