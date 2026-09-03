import { siteConfig } from "@/config/site";
import styles from "@/style/common/author-byline.module.css";

function updatedMonth(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(`${isoDate}T00:00:00`));
}

export function AuthorByline() {
  return (
    <p className={styles.byline}>
      <span>作者：{siteConfig.author.name}</span>
      <span>Updated {updatedMonth(siteConfig.contentUpdated)}</span>
    </p>
  );
}
