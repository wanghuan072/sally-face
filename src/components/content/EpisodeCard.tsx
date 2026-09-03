import Image from "next/image";
import Link from "next/link";
import type { Episode } from "@/types/game";
import { AchievementIcon } from "@/components/content/AchievementIcon";
import { getChapterSlug } from "@/lib/data/episodes";
import styles from "@/style/content/cards.module.css";

export function EpisodeCard({ episode, variant = "stacked" }: { episode: Episode; variant?: "stacked" | "row" }) {
  const chapterSlug = getChapterSlug(episode);
  return (
    <article className={`${styles.episodeCard} ${variant === "row" ? styles.episodeCardRow : ""}`}>
      <Link className={styles.imageWrap} href={`/chapters/${chapterSlug}`} tabIndex={-1} aria-hidden="true">
        <Image className={styles.image} src={episode.image} alt="" fill sizes={variant === "row" ? "(max-width: 700px) 100vw, (max-width: 1050px) 58vw, 580px" : "(max-width: 768px) 100vw, 50vw"} />
      </Link>
      <div className={styles.body}>
        <span className={styles.eyebrow}>Chapter {episode.number}</span>
        <h3 className={styles.title}>{episode.title}</h3>
        <p className={styles.note}>{episode.playerNote}</p>
        <div className={styles.meta}>
          <span>{episode.length.replace("≈", "About ")}</span>
          <Link className={styles.achievementCount} href={`/chapters/${chapterSlug}#achievements`}>
            <AchievementIcon kind="trophy" size="small" />
            {episode.achievementCount} achievements
          </Link>
        </div>
        <div className={styles.cardActions}>
          <Link className={styles.action} href={`/chapters/${chapterSlug}`}>Open Chapter route →</Link>
          <Link className={styles.secondaryAction} href={`/chapters/${chapterSlug}#checkpoints`}>Missables & codes</Link>
        </div>
      </div>
    </article>
  );
}
