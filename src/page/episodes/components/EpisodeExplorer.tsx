import type { Episode } from "@/types/game";
import { EpisodeCard } from "@/components/content/EpisodeCard";
import styles from "@/style/page/episodes/episodes.module.css";

export function EpisodeExplorer({ episodes }: { episodes: Episode[] }) {
  return (
    <div className={styles.episodeList}>
      {episodes.map((episode) => <EpisodeCard key={episode.slug} episode={episode} showMeta variant="row" />)}
    </div>
  );
}
