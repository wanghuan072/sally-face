import Image from "next/image";
import Link from "next/link";
import { achievements, getAchievementsByEpisode } from "@/lib/data/achievements";
import { getEpisodeBySlug } from "@/lib/data/episodes";
import { AchievementTable } from "@/components/content/AchievementTable";
import { FaqList } from "@/components/common/FaqList";
import { SectionTitle } from "@/components/common/SectionTitle";
import { JsonLd } from "@/seo/JsonLd";
import { faqSchema } from "@/seo/schema";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/hubs/hubs.module.css";

const faqs = [
  { question: "How many achievements are in Sally Face?", answer: "The Steam version has 35 achievements, with seven associated with each Chapter." },
  { question: "Are there hidden achievements?", answer: "Yes. The table marks story-sensitive or concealed objectives with a hidden status." },
  { question: "Can I get all achievements in one playthrough?", answer: "No. Chapter One has two alternate tea outcomes, and several collectibles or skill challenges can require a Chapter replay." },
  { question: "What is the hardest Sally Face achievement?", answer: "Escaping Death, Dark Melodies and Destroyer are common difficulty spikes because they require clean performance over long sequences." },
];

const chapterNotes = {
  1: "Choose one tea outcome per save; the other achievement needs its own replay.",
  2: "Clear the Super Gear Boy seals and return to room 403 before the investigation closes.",
  3: "Keep the timed journal route, Travis dialogue, and all eleven pages in the same run.",
  4: "Finish the tape, teeth, and guitar checks before entering room 103.",
  5: "A game over ends an Escaping Death attempt, so start a fresh clean Chapter run before trying again.",
} as const;

export default function AchievementsPage() {
  return (
    <main id="main-content">
      <JsonLd data={faqSchema(faqs)} />
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/walkthrough/episode-two-bathroom-surge.webp" alt="Official Chapter Two screenshot of Sal and Larry during a supernatural surge" fill loading="eager" sizes="100vw" />
        <div className={`container ${styles.heroInner}`}><div><h1>Sally Face Achievements <span>All 35 Unlock Conditions</span></h1><p>Check every unlock in one place, then open the right Chapter for missable conversations, collectibles, codes and performance challenges.</p><div className={styles.heroActions}><a className={`${primitives.button} ${primitives.buttonPrimary}`} href="#master-table">Open master checklist ↓</a><Link className={primitives.button} href="/chapters">Chapter routes →</Link></div></div><aside className={styles.heroMeta} aria-label="Achievement guide highlights"><div><strong>35</strong><span>Steam achievements</span></div><div><strong>7</strong><span>Per Chapter</span></div><div><strong>!</strong><span>Hidden & missable</span></div></aside></div>
      </section>
      <div className={`container ${styles.content}`}>
        <section className={styles.notice}><strong>Before you replay:</strong> Only the first achievement listed for each Chapter is unmissable. Make saves before Chapter One's tea choice and Chapter Four's guitar sequences; for Escaping Death, treat any Chapter Five game over as a failed clean attempt.</section>
        <section className={styles.notice}><strong>Steam achievement missing in-game?</strong> Open the in-game Achievements menu and select <em>Sync</em> in its top-right corner. It refreshes the game’s achievement list against the same Steam account; then revisit the affected Chapter route only if the requirement still shows incomplete.</section>
        <section className={primitives.section} id="master-table"><SectionTitle title="All 35 Achievements & Unlock Conditions" /><AchievementTable achievements={achievements} anchorRows /></section>
        <section className={primitives.section}>
          <SectionTitle title="Missable Achievement Notes by Chapter" />
          <div className={styles.chapterNotes}>
          {[1, 2, 3, 4, 5].map((number) => {
          const episode = getEpisodeBySlug(`episode-${number}-${["strange-neighbors", "the-wretched", "the-bologna-incident", "the-trial", "memories-and-dreams"][number - 1]}`);
          return <article className={styles.chapterNote} id={`episode-${number}-achievements`} key={number}><h3>{episode ? <Link href={`/chapters/${episode.slug}#achievements`}>Chapter {number}: {episode.title}</Link> : `Chapter ${number}`}</h3><p><strong>{getAchievementsByEpisode(number).length} achievements.</strong> {chapterNotes[number as keyof typeof chapterNotes]}</p></article>;
          })}
          </div>
        </section>
        <section className={primitives.section}><SectionTitle title="Achievement Questions Players Ask" /><FaqList faqs={faqs} /></section>
      </div>
    </main>
  );
}
