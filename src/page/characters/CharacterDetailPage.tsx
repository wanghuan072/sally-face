import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/game";
import { AuthorByline } from "@/components/common/AuthorByline";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { getChapterSlug, getEpisodeBySlug } from "@/lib/data/episodes";
import { CharacterRelationshipMap } from "@/components/content/CharacterRelationshipMap";
import { getCharacterProfileDetails } from "@/data/game/character-profile-details";
import { getCharacterStoryDetail } from "@/data/game/character-story-details";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, characterPersonSchema, faqSchema } from "@/seo/schema";
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
        characterPersonSchema(character),
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
              <p className={styles.heroNote}>{character.playerNote}</p>
              <AuthorByline />
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
          {profileDetails.playerNotes.length ? <section className={styles.section} id="player-routes"><h2>Where to Follow {character.name} in the Game</h2><p className={styles.sectionLead}>These links go to the profile section or Chapter route that answers the question players usually have next.</p><div className={styles.playerNotes}>{profileDetails.playerNotes.map((note) => <Link className={styles.playerNote} href={note.href} key={`${note.href}-${note.title}`}><span>{note.eyebrow}</span><h3>{note.title}</h3><p>{note.detail}</p></Link>)}</div></section> : null}
          <section className={styles.section} id="appearance"><h2>What Does {character.name} Look Like?</h2><p>{character.appearance}</p></section>
          <section className={styles.section} id="personality"><h2>{character.name}'s Personality</h2><p>{character.personality}</p></section>
          <section className={styles.section} id="role"><h2>{character.name}'s Role in Sally Face</h2><p>{character.storyRole}</p></section>
          <CharacterRelationshipMap character={character} />
          <section className={`${styles.section} ${styles.reelSection}`} id="chapters">
            <h2>How {character.name} Changes Each Chapter</h2>
            <p className={styles.sectionLead}>Read it in story order. The yellow note is what you lose if you treat them as flavor.</p>
            <ol className={styles.reel}>
              {profileDetails.chapterInfluence.map((entry) => {
                const chapter = getEpisodeBySlug(entry.chapterSlug);
                const timeline = profileDetails.timeline.find((item) => item.chapterSlug === entry.chapterSlug);
                return chapter ? (
                  <li key={entry.chapterSlug}>
                    <Link className={styles.frame} href={`/chapters/${getChapterSlug(chapter)}`}>
                      <p className={styles.frameMeta}>
                        <span className={styles.frameNum}>{String(chapter.number).padStart(2, "0")}</span>
                        <span>{timeline?.kind ?? "On-screen"}</span>
                        Chapter {chapter.number}
                      </p>
                      <h3>{chapter.title}</h3>
                      <p className={styles.frameImpact}>{entry.impact}</p>
                      <p className={styles.sticky}><strong>If missed</strong>{entry.ifMissed}</p>
                    </Link>
                  </li>
                ) : null;
              })}
            </ol>
          </section>
          <section className={styles.section} id="trivia"><h2>{character.name} Details Players Often Miss</h2><ul className={styles.trivia}>{character.trivia.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className={styles.section} id="faq"><h2>Questions About {character.name}</h2><FaqList faqs={character.faqs} /></section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidePanel}><h2>On This Page</h2><nav>{character.slug === "sal-fisher" ? <a href="#mask">Mask & face explained</a> : null}{storyDetail.arc.length ? <a href="#arc">Story arc</a> : null}{storyDetail.moments.length ? <a href="#moments">Key moments</a> : null}{profileDetails.playerNotes.length ? <a href="#player-routes">Player routes</a> : null}<a href="#appearance">Appearance</a><a href="#personality">Personality</a><a href="#role">Story role</a><a href="#relationships">Relationship map</a><a href="#chapters">Chapter influence</a><a href="#trivia">Player details</a><a href="#faq">FAQ</a></nav></section>
          <section className={styles.sidePanel}><h2>Keep Exploring</h2><nav><Link href="/characters">All characters →</Link><Link href="/chapters">All Chapters →</Link><Link href="/achievements">Achievement checklist →</Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
