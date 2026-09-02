"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Character } from "@/types/game";
import { CharacterCard } from "@/components/content/CharacterCard";
import styles from "@/style/page/characters/characters.module.css";

const filters = ["All Characters", "Core Cast", "Family", "Supernatural", "Episode One"] as const;

export function CharacterExplorer({ characters }: { characters: Character[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("filter");
  const filter = filters.includes(requestedFilter as (typeof filters)[number]) ? requestedFilter as (typeof filters)[number] : "All Characters";
  const query = searchParams.get("q") ?? "";

  const filterHref = (nextFilter: (typeof filters)[number]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextFilter === "All Characters") params.delete("filter"); else params.set("filter", nextFilter);
    const queryString = params.toString();
    return queryString ? `/characters?${queryString}` : "/characters";
  };

  const updateQuery = (nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQuery) params.set("q", nextQuery); else params.delete("q");
    const queryString = params.toString();
    router.replace(queryString ? `/characters?${queryString}` : "/characters", { scroll: false });
  };

  const results = useMemo(() => {
    let filtered = characters.filter((character) => `${character.name} ${character.alias} ${character.role}`.toLowerCase().includes(query.trim().toLowerCase()));
    if (filter === "Core Cast") filtered = filtered.filter((character) => ["sal-fisher", "larry-johnson", "ashley-campbell", "travis-phelps", "todd-morrison"].includes(character.slug));
    if (filter === "Family") filtered = filtered.filter((character) => ["henry-fisher", "lisa-johnson", "gizmo"].includes(character.slug));
    if (filter === "Supernatural") filtered = filtered.filter((character) => character.slug === "megan-holmes");
    if (filter === "Episode One") filtered = filtered.filter((character) => character.episodes.includes("episode-1-strange-neighbors"));
    return filtered;
  }, [characters, filter, query]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Filter characters">
          {filters.map((name) => <Link className={styles.filter} key={name} href={filterHref(name)} aria-current={filter === name ? "page" : undefined}>{name}</Link>)}
        </div>
        <label aria-label="Search characters"><input className={styles.search} type="search" name="character-search" autoComplete="off" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search characters…" /></label>
      </div>
      <div className={styles.characterGrid}>
        {results.length ? results.map((character) => <CharacterCard character={character} key={character.slug} />) : <p className={styles.empty}>No profiles match that search.</p>}
      </div>
    </>
  );
}
