import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/game";
import styles from "@/style/content/cards.module.css";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className={styles.characterCard}>
      <Link className={styles.imageWrap} href={`/characters/${character.slug}`} tabIndex={-1} aria-hidden="true">
        <Image className={styles.image} src={character.image} alt="" fill sizes="(max-width: 768px) 50vw, 250px" />
      </Link>
      <div className={styles.body}>
        <span className={styles.eyebrow}>{character.role}</span>
        <h3 className={styles.title}>{character.name}</h3>
        <p className={styles.summary}>{character.summary}</p>
        <Link className={styles.action} href={`/characters/${character.slug}`}>View profile →</Link>
      </div>
    </article>
  );
}
