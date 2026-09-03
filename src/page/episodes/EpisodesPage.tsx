import Image from "next/image";
import Link from "next/link";
import { episodes, getChapterSlug } from "@/lib/data/episodes";
import { characters } from "@/lib/data/characters";
import { EpisodeExplorer } from "@/page/episodes/components/EpisodeExplorer";
import { FaqList } from "@/components/common/FaqList";
import { SectionTitle } from "@/components/common/SectionTitle";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema, faqSchema } from "@/seo/schema";
import styles from "@/style/page/episodes/episodes.module.css";

const faqs = [
  { question: "Do I need to play the Chapters in order?", answer: "Yes. Sally Face tells one continuous story, and later Chapters assume you know earlier clues and relationships." },
  { question: "Are there collectible items in every Chapter?", answer: "Yes. Gear Boy chapters, journal pages, VHS tapes, teeth, notes and other secrets appear across the five Chapters." },
  { question: "How many Sally Face endings are there?", answer: "The original game follows one core narrative, with completion-dependent scenes and an Epilogue achievement rather than a menu of unrelated endings." },
];

export default function EpisodesPage() {
  return (
    <main id="main-content">
      <JsonLd data={[collectionSchema("Sally Face Chapters", "Five Sally Face Chapter routes with choices, collectibles and achievements.", "/chapters", episodes.map((episode) => ({ name: episode.title, path: `/chapters/${getChapterSlug(episode)}` }))), faqSchema(faqs)]} />
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/episodes/episode-4-the-trial.webp" alt="Sally Face story scene introducing the five Chapter routes" fill loading="eager" sizes="100vw" />
        <div className={`container ${styles.heroInner}`}>
          <div>
            <h1>Sally Face Chapters <span>Routes, Codes & Missables</span></h1>
            <p>Play the five Chapters in order. Open a route for the next step, or the missables check before a cutoff.</p>
          </div>
          <aside className={styles.heroMeta} aria-label="Chapter guide highlights"><div><strong>5</strong><span>Chapters</span></div><div><strong>35</strong><span>Steam achievements</span></div><div><strong>1</strong><span>Continuous story</span></div></aside>
        </div>
      </section>

      <div className={`container ${styles.explorer}`}>
        <div className={styles.layout}>
          <EpisodeExplorer episodes={episodes} />
          <aside className={styles.sidebar} aria-label="Episode resources">
            <section className={styles.sidePanel}>
              <h2>Popular Character Profiles</h2>
              {characters.slice(0, 5).map((character) => (
                <Link className={styles.characterRow} href={`/characters/${character.slug}`} key={character.slug}>
                  <span className={styles.characterImage}><Image src={character.image} alt="" fill sizes="72px" /></span>
                  <span><h3>{character.name}</h3><p>{character.role}</p><span>View profile →</span></span>
                </Link>
              ))}
            </section>
            <Link className={styles.promo} href="/sally-face-2">
              <Image src="/images/sally-face-2/sally-face-2-screenshot-3.webp" alt="Official Sally Face 2 preview" fill sizes="340px" />
              <span className={styles.promoCopy}><h2>Sally Face 2</h2><span>Announced 16 Aug 2026 · date TBD →</span></span>
            </Link>
          </aside>
        </div>
        <section className={styles.faqSection}>
          <SectionTitle title="Frequently Asked Questions" />
          <FaqList faqs={faqs} />
        </section>
      </div>
    </main>
  );
}
