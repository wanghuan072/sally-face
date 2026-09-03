import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/game";
import { getEpisodeBySlug } from "@/lib/data/episodes";
import styles from "@/style/content/cards.module.css";

export function CharacterCard({ character, variant = "stacked" }: { character: Character; variant?: "stacked" | "row" }) {
  const firstChapter = getEpisodeBySlug(character.chapters[0]);

  return (
    <article className={`${styles.characterCard} ${variant === "row" ? styles.characterCardRow : ""}`}>
      <Link className={styles.imageWrap} href={`/characters/${character.slug}`} tabIndex={-1} aria-hidden="true">
        <Image className={styles.image} src={character.image} alt="" fill sizes={variant === "row" ? "160px" : "(max-width: 768px) 50vw, 250px"} />
      </Link>
      <div className={styles.body}>
        <span className={styles.eyebrow}>{character.role}</span>
        <h3 className={styles.title}>{character.name}</h3>
        <p className={styles.note}>{character.playerNote}</p>
        <div className={styles.cardActions}>
          <Link className={styles.action} href={`/characters/${character.slug}`}>Open profile →</Link>
          {firstChapter ? <Link className={styles.secondaryAction} href={`/chapters/${firstChapter.slug}`}>Chapter {firstChapter.number}</Link> : null}
        </div>
      </div>
    </article>
  );
}
