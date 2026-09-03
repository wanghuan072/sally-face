import Image from "next/image";
import Link from "next/link";
import type { Achievement } from "@/types/game";
import { getAchievementIcon, getAchievementId, getAchievementRoute } from "@/lib/data/achievements";
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
          {achievements.map((achievement) => {
            const route = getAchievementRoute(achievement);
            return (
              <tr id={anchorRows ? getAchievementId(achievement) : undefined} key={`${achievement.chapter}-${achievement.name}`}>
                <td>
                  <div className={styles.achievementNameCell}>
                    <span className={styles.achievementArt}><Image src={getAchievementIcon(achievement)} alt={`Steam achievement icon for ${achievement.name}`} width={56} height={56} sizes="56px" /></span>
                    <span>
                      <span className={styles.achievementName}>{achievement.name}</span>
                      <span className={styles.achievementMeta}>{achievement.hidden ? "Hidden achievement" : "Visible achievement"}{compact ? ` · Chapter ${achievement.chapter}` : ""}</span>
                    </span>
                  </div>
                </td>
                {!compact ? <td>Chapter {achievement.chapter}</td> : null}
                <td>{achievement.description}</td>
                <td><span className={styles.typeBadge}>{achievement.type}</span></td>
                {!compact ? <td>{achievement.missable ? "Yes" : "No"}</td> : null}
                <td><p className={styles.unlockText}>{achievement.unlock}</p><Link className={styles.routeLink} href={route.href}>{route.label} →</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
