import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/game";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { getChapterSlug, getEpisodeBySlug } from "@/lib/data/episodes";
import { getCharacterProfileDetails } from "@/data/game/character-profile-details";
import { getCharacterStoryDetail } from "@/data/game/character-story-details";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import styles from "@/style/page/characters/character-detail.module.css";

export default function CharacterDetailPage({ character }: { character: Character }) {
  const profileDetails = getCharacterProfileDetails(character.slug);
  const storyDetail = getCharacterStoryDetail(character.slug);
  const path = `/characters/${character.slug}`;
  const lastChapter = getEpisodeBySlug(character.chapters[character.chapters.length - 1]);

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
          {character.slug === "sal-fisher" ? <section className={`${styles.section} ${styles.maskSection}`} id="mask"><h2>Sal Fisher's Mask and Face Explained</h2><p className={styles.warning}>Major Chapter Five spoilers appear in this section.</p><h3>Why Sal wears a mask</h3><p>Sal’s pale face is a prosthetic, not a costume. It protects damaged areas after a childhood attack and becomes the image strangers notice before they know him. The game treats it as part of his daily life and identity, rather than a spectacle.</p><h3>What happened to Sal's face</h3><p>Late-game memories connect Sal’s injuries to Kenneth Phelps, Diane Fisher’s death, and the cult’s influence. The story reveals those events in fragments, so the important point is the human consequence: Sal survives a traumatic attack and grows up under other people’s curiosity, pity, and judgment.</p><h3>Where the story explains it</h3><p><Link href="/chapters/chapter-1-strange-neighbors">Chapter One</Link> establishes the prosthetic and the DOG dream clues. <Link href="/chapters/chapter-4-the-trial">Chapter Four</Link> puts Sal’s appearance under public scrutiny. <Link href="/chapters/chapter-5-memories-and-dreams">Chapter Five</Link> connects the childhood memory to the full story.</p></section> : null}
          {storyDetail.arc.length ? <section className={`${styles.section} ${styles.storyStart}`} id="arc"><h2>{character.name}'s Story Arc</h2>{storyDetail.arc.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section> : null}
          {storyDetail.moments.length ? <section className={styles.section} id="moments"><h2>Key {character.name} Story Moments</h2><p className={styles.sectionLead}>Open a Chapter when you want the scene in context. Codes, item routes, and achievement steps stay in the Chapter guide where they belong.</p><div className={styles.playerNotes}>{storyDetail.moments.map((moment) => <Link className={styles.playerNote} href={moment.href} key={moment.title}><span>{moment.spoiler} · Chapter {getEpisodeBySlug(moment.chapterSlug)?.number}</span><h3>{moment.title}</h3><p>{moment.detail}</p></Link>)}</div></section> : null}
          <section className={styles.section} id="appearance"><h2>What Does {character.name} Look Like?</h2><p>{character.appearance}</p></section>
          <section className={styles.section} id="personality"><h2>{character.name}'s Personality</h2><p>{character.personality}</p></section>
          <section className={styles.section} id="role"><h2>{character.name}'s Role in Sally Face</h2><p>{character.storyRole}</p></section>
          <section className={styles.section} id="chapters">
            <h2>{character.name}'s Chapter Appearances</h2>
            <div className={styles.timeline}>
              {profileDetails.timeline.map((entry) => {
                const chapter = getEpisodeBySlug(entry.chapterSlug);
                return chapter ? <Link className={styles.timelineEntry} href={`/chapters/${getChapterSlug(chapter)}`} key={`${entry.chapterSlug}-${entry.kind}`}><span className={styles.timelineChapter}>Chapter {chapter.ordinal}</span><span className={styles.timelineKind}>{entry.kind}</span><div><h3>{chapter.title}</h3><p>{entry.detail}</p></div></Link> : null;
              })}
            </div>
          </section>
          <section className={styles.section} id="relationships">
            <h2>{character.name}'s Relationships</h2>
            <div className={styles.relationshipGrid}>
              {character.relationships.map((relationship) => <Link className={styles.relationship} href={`/characters/${relationship.slug}`} key={relationship.slug}><h3>{relationship.name}</h3><p>{relationship.detail}</p><span>View profile →</span></Link>)}
            </div>
          </section>
          <section className={styles.section} id="trivia"><h2>{character.name} Details Players Often Miss</h2><ul className={styles.trivia}>{character.trivia.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className={styles.section} id="faq"><h2>Questions About {character.name}</h2><FaqList faqs={character.faqs} /></section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidePanel}><h2>On This Page</h2><nav>{character.slug === "sal-fisher" ? <a href="#mask">Mask & face explained</a> : null}{storyDetail.arc.length ? <a href="#arc">Story arc</a> : null}{storyDetail.moments.length ? <a href="#moments">Key moments</a> : null}<a href="#appearance">Appearance</a><a href="#personality">Personality</a><a href="#role">Story role</a><a href="#chapters">Chapter timeline</a><a href="#relationships">Relationships</a><a href="#trivia">Player details</a><a href="#faq">FAQ</a></nav></section>
          <section className={styles.sidePanel}><h2>Keep Exploring</h2><nav><Link href="/characters">All characters →</Link><Link href="/chapters">All Chapters →</Link><Link href="/achievements">Achievement checklist →</Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
