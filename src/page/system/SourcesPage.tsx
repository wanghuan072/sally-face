import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import sourceData from "@/data/content-sources.json";
import styles from "@/style/page/system/system.module.css";

export default function SourcesPage() {
  return (
    <main id="main-content">
      <header className={styles.sourcesHero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About this guide" }]} />
          <p className={styles.sourcesEyebrow}>Independent fan guide · Last reviewed {sourceData.verifiedOn}</p>
          <h1>About This <span>Sally Face Guide</span></h1>
          <p>{sourceData.methodology}</p>
        </div>
      </header>

      <div className={`container ${styles.sourcesContent}`}>
        <section>
          <h2>How Game Details Are Checked</h2>
          <div className={styles.sourceGrid}>
            {sourceData.factSources.map((source) => (
              <article className={styles.sourceCard} key={source.name}>
                <span>{source.authority}</span>
                <h3><a href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a></h3>
                <p><strong>What it covers:</strong> {source.usedFor}</p>
                <p>{source.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>Artwork on This Site</h2>
          <div className={styles.imageSourceList}>
            {sourceData.imageSources.map((source) => (
              <article key={source.group}>
                <h3>{source.group}</h3>
                <p>{source.status}</p>
                <a href={source.url} target="_blank" rel="noreferrer">View the original page ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.correctionNote}>
          <h2>Corrections and Updates</h2>
          <ul>
            <li>Replaced generated character likenesses with canonical in-game sprites.</li>
            <li>Kept the original investigation-board hero as clearly labeled editorial site artwork.</li>
            <li>Corrected Travis, Henry, Lisa, Megan, Charley, Ashley, and Gizmo appearance descriptions.</li>
            <li>Replaced the misassigned Chapter Five image with its official promotional artwork.</li>
            <li>Renamed and reassigned three official screenshots whose earlier labels described the wrong scene or Chapter.</li>
            <li>Replaced generic achievement-category symbols with the 35 matching original Steam achievement icons.</li>
            <li>Corrected PC storage and operating-system requirements to match Steam.</li>
            <li>Replaced inflated playtime claims with community-tracked 9 / 11 / 16-hour estimates.</li>
            <li>Removed unsupported difficulty and puzzle-count labels from Chapter facts.</li>
          </ul>
          <p><Link href="/chapters">Browse the Chapter routes →</Link></p>
        </section>
      </div>
    </main>
  );
}
