import Image from "next/image";
import Link from "next/link";
import type { Achievement } from "@/types/game";
import { getAchievementEpisodeHref, getAchievementIcon, getAchievementId, getAchievementRoute } from "@/lib/data/achievements";
import styles from "@/style/common/primitives.module.css";

export function AchievementTable({ achievements, compact = false, anchorRows = false }: { achievements: Achievement[]; compact?: boolean; anchorRows?: boolean }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Achievement</th>
            {!compact ? <th>Chapter</th> : null}
            <th>Description</th>
            <th>Class</th>
            {!compact ? <th>Missable</th> : null}
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement) => (
            <tr id={anchorRows ? getAchievementId(achievement) : undefined} key={`${achievement.chapter}-${achievement.name}`}>
              <td>
                <div className={styles.achievementNameCell}>
                  <span className={styles.achievementArt}><Image src={getAchievementIcon(achievement)} alt={`Steam achievement icon for ${achievement.name}`} width={56} height={56} sizes="56px" /></span>
                  <span><Link className={styles.achievementName} href={`/achievements#${getAchievementId(achievement)}`}>{achievement.name}</Link><span className={styles.achievementMeta}>{achievement.hidden ? "Hidden achievement" : "Visible achievement"}</span>{compact ? <Link className={styles.achievementEpisodeLink} href={getAchievementEpisodeHref(achievement)}>Chapter {achievement.chapter} route →</Link> : null}</span>
                </div>
              </td>
              {!compact ? <td><Link className={styles.episodeTableLink} href={getAchievementEpisodeHref(achievement)}>Chapter {achievement.chapter} →</Link></td> : null}
              <td>{achievement.description}</td>
              <td><span className={styles.typeBadge}>{achievement.type}</span></td>
              {!compact ? <td>{achievement.missable ? "Yes" : "No"}</td> : null}
              <td><p className={styles.unlockText}>{achievement.unlock}</p><Link className={styles.routeLink} href={getAchievementRoute(achievement).href}>{getAchievementRoute(achievement).label} →</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
