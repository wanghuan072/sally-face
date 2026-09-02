import Link from "next/link";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/system/system.module.css";

export default function NotFoundPage() {
  return <main id="main-content" className={styles.notFound}><div className="container"><div className={styles.code}>404</div><h1>This Page Is Missing</h1><p>The hall is real, but this door is not. Return home or open the Chapter routes.</p><p><Link className={`${primitives.button} ${primitives.buttonPrimary}`} href="/">Return home →</Link> <Link className={primitives.button} href="/chapters">Open Chapters</Link></p></div></main>;
}
