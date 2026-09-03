"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Character } from "@/types/game";
import { CharacterCard } from "@/components/content/CharacterCard";
import { characterFilters, filterCharacters, isCharacterFilterId, type CharacterFilterId } from "@/lib/data/characters";
import styles from "@/style/page/characters/characters.module.css";

const legacyFilterIds: Record<string, CharacterFilterId> = {
  "All Characters": "all",
  "Core Cast": "core-cast",
  Family: "family",
  Supernatural: "supernatural",
  "Episode One": "chapter-1",
  "Chapter One": "chapter-1",
};

export function CharacterExplorer({ characters }: { characters: Character[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("filter");
  const filter: CharacterFilterId = isCharacterFilterId(requestedFilter)
    ? requestedFilter
    : legacyFilterIds[requestedFilter ?? ""] ?? "all";
  const query = searchParams.get("q") ?? "";

  const filterHref = (nextFilter: CharacterFilterId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextFilter === "all") params.delete("filter");
    else params.set("filter", nextFilter);
    const queryString = params.toString();
    return queryString ? `/characters?${queryString}` : "/characters";
  };

  const updateQuery = (nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQuery) params.set("q", nextQuery); else params.delete("q");
    const queryString = params.toString();
    router.replace(queryString ? `/characters?${queryString}` : "/characters", { scroll: false });
  };

  const results = useMemo(() => filterCharacters(characters, filter, query), [characters, filter, query]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Filter characters">
          {characterFilters.map((item) => <Link className={styles.filter} key={item.id} href={filterHref(item.id)} aria-current={filter === item.id ? "page" : undefined}>{item.label}</Link>)}
        </div>
        <label aria-label="Search characters"><input className={styles.search} type="search" name="character-search" autoComplete="off" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search characters…" /></label>
      </div>
      <div className={styles.characterGrid}>
        {results.length ? results.map((character) => <CharacterCard character={character} variant="row" key={character.slug} />) : <p className={styles.empty}>No profiles match that search.</p>}
      </div>
    </>
  );
}
