import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/game";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { getEpisodeBySlug } from "@/lib/data/episodes";
import { getCharacterProfileDetails } from "@/data/game/character-profile-details";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import styles from "@/style/page/characters/character-detail.module.css";

export default function CharacterDetailPage({ character }: { character: Character }) {
  const profileDetails = getCharacterProfileDetails(character.slug);
  const path = `/characters/${character.slug}`;
  const lastChapter = getEpisodeBySlug(character.episodes[character.episodes.length - 1]);

  return (
    <main id="main-content">
      <JsonLd data={[
        articleSchema({ title: character.seo.title, description: character.seo.description, path, image: character.image }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Characters", path: "/characters" }, { name: character.name, path }]),
        faqSchema(character.faqs),
      ]} />
      <header className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Characters", href: "/characters" }, { label: character.name }]} />
          <div className={styles.heroGrid}>
            <div className={styles.portrait}><Image src={character.image} alt={character.imageAlt} fill loading="eager" sizes="(max-width: 768px) 100vw, 360px" /></div>
            <div>
              <p className={styles.eyebrow}>{character.role}</p>
              <h1>{character.name}</h1>
              <p className={styles.lead}>{character.summary}</p>
              <div className={styles.facts}>
                <div className={styles.fact}><span>Known as</span><strong>{character.alias}</strong></div>
                <div className={styles.fact}><span>First appearance</span><strong>{character.firstAppearance}</strong></div>
                <div className={styles.fact}><span>Connection to Sal</span><strong>{character.relationship}</strong></div>
                <div className={styles.fact}><span>Profile spoilers</span><strong>Through Chapter {lastChapter?.number ?? "Five"}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          <section className={styles.section} id="who"><h2>Who Is {character.name}?</h2><p>{character.summary}</p></section>
          <section className={styles.section} id="appearance"><h2>What Does {character.name} Look Like?</h2><p>{character.appearance}</p></section>
          <section className={styles.section} id="personality"><h2>{character.name}'s Personality</h2><p>{character.personality}</p></section>
          <section className={styles.section} id="role"><h2>{character.name}'s Role in Sally Face</h2><p>{character.storyRole}</p></section>
          <section className={styles.section} id="chapters">
            <h2>{character.name}'s Chapter Appearances</h2>
            <div className={styles.timeline}>
              {profileDetails.timeline.map((entry) => {
                const chapter = getEpisodeBySlug(entry.chapterSlug);
                return chapter ? <Link className={styles.timelineEntry} href={`/chapters/${chapter.slug}`} key={`${entry.chapterSlug}-${entry.kind}`}><span className={styles.timelineChapter}>Chapter {chapter.ordinal}</span><span className={styles.timelineKind}>{entry.kind}</span><div><h3>{chapter.title}</h3><p>{entry.detail}</p></div></Link> : null;
              })}
            </div>
          </section>
          <section className={styles.section} id="relationships">
            <h2>{character.name}'s Relationships</h2>
            <div className={styles.relationshipGrid}>
              {character.relationships.map((relationship) => <Link className={styles.relationship} href={`/characters/${relationship.slug}`} key={relationship.slug}><h3>{relationship.name}</h3><p>{relationship.detail}</p><span>View profile →</span></Link>)}
            </div>
          </section>
          <section className={styles.section} id="trivia"><h2>{character.name} Facts & Story Details</h2><ul className={styles.trivia}>{character.trivia.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className={styles.section} id="faq"><h2>Questions About {character.name}</h2><FaqList faqs={character.faqs} /></section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidePanel}><h2>On This Page</h2><nav><a href="#who">Who is {character.name}?</a><a href="#appearance">Appearance</a><a href="#personality">Personality</a><a href="#role">Story role</a><a href="#chapters">Chapter timeline</a><a href="#relationships">Relationships</a><a href="#trivia">Trivia</a><a href="#faq">FAQ</a></nav></section>
          {character.slug === "sal-fisher" ? <section className={`${styles.sidePanel} ${styles.maskPromo}`}><h2>Without the Mask</h2><p>Read the spoiler-aware explanation of Sal's prosthetic face.</p><Link href="/characters/sal-fisher/without-mask">Open the face & mask guide →</Link></section> : null}
          <section className={styles.sidePanel}><h2>Keep Exploring</h2><nav><Link href="/characters">All characters →</Link><Link href="/chapters">All Chapters →</Link><Link href="/achievements">Achievement checklist →</Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
