import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { characters } from "@/lib/data/characters";
import { CharacterCard } from "@/components/content/CharacterCard";
import { CharacterExplorer } from "@/page/characters/components/CharacterExplorer";
import { SectionTitle } from "@/components/common/SectionTitle";
import { AdSlot } from "@/components/ads/AdSlot";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/characters/characters.module.css";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";

export default function CharactersPage() {
  return (
    <main id="main-content">
      <JsonLd data={collectionSchema("Sally Face Characters", "Character profiles and Chapter connections for the Sally Face cast.", "/characters", characters.map((character) => ({ name: character.name, path: `/characters/${character.slug}` })))} />
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/scenes/steam-25.webp" alt="Sal Fisher and Larry Johnson in an official Sally Face story scene" fill loading="eager" sizes="100vw" />
        <div className={`container ${styles.heroInner}`}>
          <div><h1>Sally Face Characters <span>Who They Are & Where They Matter</span></h1><p>Find out who someone is, what you can miss around them, and which Chapter to open for their important scenes.</p></div>
          <aside className={styles.heroMeta} aria-label="Character guide highlights"><div><strong>10</strong><span>Character profiles</span></div><div><strong>5</strong><span>Story Chapters</span></div><div><strong>↗</strong><span>Linked timelines</span></div></aside>
        </div>
      </section>
      {/* 内页广告位 1：Hero 下方。 */}
      <div className="container"><AdSlot format="responsive" /></div>
      <div className={`container ${styles.content}`}>
        <Suspense fallback={<div className={styles.characterGrid}>{characters.map((character) => <CharacterCard character={character} variant="row" key={character.slug} />)}</div>}>
          <CharacterExplorer characters={characters} />
        </Suspense>
        {/* 内页广告位 2：角色列表之后。 */}
        <AdSlot format="responsive" />
        <section className={primitives.section}>
          <SectionTitle title="Character Guides & Chapter Connections" />
          <div className={styles.linksStrip}>
            <Link className={styles.linkCard} href="/characters/sal-fisher#mask"><h3>Sal Fisher's Mask Explained</h3><p>See what happened to Sal's face, why he wears a prosthetic, and when the story explains it.</p><span>Open Sal's profile →</span></Link>
            <Link className={styles.linkCard} href="/chapters"><h3>Chapter Appearances</h3><p>Follow each character through all five chapters in story order.</p><span>View chapters →</span></Link>
            <Link className={styles.linkCard} href="/chapters"><h3>Chapter Puzzles & Choices</h3><p>Find conversations, codes and optional choices in their story context.</p><span>Open chapters →</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
