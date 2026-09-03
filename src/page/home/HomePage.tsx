import Image from "next/image";
import Link from "next/link";
import { EpisodeCard } from "@/components/content/EpisodeCard";
import { CharacterCard } from "@/components/content/CharacterCard";
import { AchievementTable } from "@/components/content/AchievementTable";
import { FaqList } from "@/components/common/FaqList";
import { SectionTitle } from "@/components/common/SectionTitle";
import { episodes } from "@/lib/data/episodes";
import { characters } from "@/lib/data/characters";
import { achievements } from "@/lib/data/achievements";
import { guides } from "@/lib/data/guides";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { faqSchema, websiteSchema } from "@/seo/schema";
import primitives from "@/style/common/primitives.module.css";
import cards from "@/style/content/cards.module.css";
import styles from "@/style/page/home/home.module.css";

const downloads = [
  { icon: "PC", title: "PC / Steam", text: "Windows, macOS and Linux from the official store.", href: siteConfig.official.steam },
  { icon: "M", title: "Mobile", text: "Android on Google Play and iPhone or iPad on the App Store.", href: "/download/android" },
  { icon: "PS", title: "Consoles", text: "PlayStation, Xbox and Nintendo Switch store pages in one place.", href: "/download" },
];

const faqs = [
  { question: "What is Sally Face about?", answer: "Sally Face is a single-player narrative adventure about Sal Fisher, a boy with a prosthetic face who investigates murders and supernatural events with his friends." },
  { question: "How many Sally Face Chapters are there?", answer: "The original game tells one continuous story across five Chapters, from Strange Neighbors through Memories and Dreams." },
  { question: "Do I need to play Sally Face in order?", answer: "Yes. Later Chapters assume you know earlier relationships, clues and supernatural events, so a first playthrough works best in order." },
  { question: "Can I play Sally Face on mobile?", answer: "Yes. Portable Moose released the official iOS and Android versions on August 16, 2026." },
  { question: "Is Sally Face multiplayer?", answer: "No. Sally Face is a single-player episodic adventure." },
  { question: "Is Sally Face 2 released yet?", answer: "No. Sally Face 2 was announced on August 16, 2026. The release date is TBD. Steam Early Access comes first, starting with Episode Six." },
];

export default function HomePage() {
  const featuredCharacters = characters.slice(0, 5);

  return (
    <main id="main-content">
      <JsonLd data={[websiteSchema(), faqSchema(faqs)]} />
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/home/sally-face-detective-board-editorial.webp" alt="Editorial Sally Face artwork with Sal Fisher standing before a dark investigation board" fill loading="eager" sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Independent player guide</p>
            <h1 className={styles.title}><span className={styles.titleMain}>Sally Face —</span><span className={styles.titleAccent}>Chapters, Codes & Achievements</span></h1>
            <p className={styles.heroText}>Stuck on a code, cleaning up a missed achievement, or starting a replay? Find the Chapter route, character page or checklist that fits where you are.</p>
            <div className={styles.heroActions}>
              <Link className={`${primitives.button} ${primitives.buttonPrimary}`} href="/chapters">Explore chapters →</Link>
              <Link className={`${primitives.button} ${primitives.buttonPurple}`} href="/characters">Meet the characters</Link>
            </div>
          </div>
        </div>
      </section>

      <div className={`container ${styles.main}`}>
        <section className={primitives.section}>
          <SectionTitle title="Find Help for Your Current Chapter" />
          <div className={styles.aboutGrid}>
            <article><h3>Stuck on a code?</h3><p>Open the relevant Chapter for puzzle clues, codes, required conversations and the next step in the story.</p><Link href="/chapters">Browse Chapter routes →</Link></article>
            <article><h3>Catching a missable?</h3><p>Use the achievement list and focused guides before a choice, collectible or performance challenge can slip past you.</p><Link href="/achievements">Open achievement checklist →</Link></article>
            <article><h3>Following a character?</h3><p>Character pages connect names, relationships and important scenes back to the Chapters where they happen.</p><Link href="/characters">Meet the characters →</Link></article>
          </div>
        </section>

        <section className={primitives.section}>
          <SectionTitle title="Sally Face Chapter Walkthroughs" href="/chapters" linkLabel="View all chapters" />
          <div className={styles.chapterList}>{episodes.map((episode) => <EpisodeCard key={episode.slug} episode={episode} variant="row" />)}</div>
        </section>

        <section className={primitives.section}>
          <SectionTitle title="Missables, Achievements & Puzzle Help" href="/guides" linkLabel="View all guides" />
          <div className={styles.featuredGuidesGrid}>
            {guides.map((guide) => <Link className={styles.guideCard} href={`/guides/${guide.slug}`} key={guide.slug}><span className={styles.guideGlyph}>{guide.facts[0]?.value ?? "Guide"}</span><h3>{guide.title}</h3><p>{guide.summary}</p><span>Open guide →</span></Link>)}
          </div>
        </section>

        <section className={primitives.section}>
          <SectionTitle title="Characters & Story Connections" href="/characters" linkLabel="View all characters" />
          <div className={cards.characterGrid}>{featuredCharacters.map((character) => <CharacterCard key={character.slug} character={character} />)}</div>
        </section>

        <section className={primitives.section}>
          <SectionTitle title="All 35 Achievement Unlocks" href="/achievements" linkLabel="View all 35 achievements" />
          <p className={styles.achievementTotal}>Some are hidden… <strong>35 total</strong></p>
          <AchievementTable achievements={achievements.slice(0, 5)} compact />
        </section>

        <section className={primitives.section}>
          <SectionTitle title="Official Download Options" href="/download" linkLabel="Compare every platform" />
          <div className={styles.downloads}>
            {downloads.map((download) => (
              <article className={styles.downloadCard} key={download.title}>
                <span className={styles.downloadIcon}>{download.icon}</span>
                <h3>{download.title}</h3>
                <p>{download.text}</p>
                {download.href.startsWith("/") ? <Link href={download.href}>See platforms →</Link> : <a href={download.href} target="_blank" rel="noreferrer">Official store →</a>}
              </article>
            ))}
          </div>
        </section>

        <section className={primitives.section}>
          <div className={styles.sequel}>
            <Image className={styles.sequelImage} src="/images/sally-face-2/sally-face-2-screenshot-3.webp" alt="Official Sally Face 2 preview screenshot" fill sizes="(max-width: 768px) 100vw, 1400px" />
            <div className={styles.sequelCopy}>
              <h2>Sally Face 2 — Release Status</h2>
              <p>Announced August 16, 2026. The release date is still TBD. Steam Early Access comes first, starting with Episode Six, before console and mobile versions.</p>
              <div className={styles.sequelActions}>
                <a className={`${primitives.button} ${primitives.buttonPurple}`} href={siteConfig.official.steamSequel} target="_blank" rel="noreferrer">Wishlist on Steam ↗</a>
                <Link className={primitives.button} href="/sally-face-2">See confirmed details →</Link>
              </div>
            </div>
            <div className={styles.sequelFacts}>
              <div className={styles.fact}><span>Announced</span><strong>16 Aug 2026</strong></div>
              <div className={styles.fact}><span>Release date</span><strong>TBD</strong></div>
              <div className={styles.fact}><span>First drop</span><strong>Episode Six</strong></div>
              <div className={styles.fact}><span>First platform</span><strong>Steam Early Access</strong></div>
            </div>
          </div>
        </section>

        <section className={primitives.section}>
          <SectionTitle title="Questions New Players Ask" />
          <FaqList faqs={faqs} />
        </section>
      </div>
    </main>
  );
}
