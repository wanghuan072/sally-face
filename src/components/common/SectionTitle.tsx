import Link from "next/link";
import styles from "@/style/common/primitives.module.css";

export function SectionTitle({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {href && linkLabel ? <Link className={styles.sectionLink} href={href}>{linkLabel} →</Link> : null}
    </div>
  );
}
