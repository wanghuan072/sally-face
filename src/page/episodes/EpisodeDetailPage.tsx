import Image from "next/image";
import Link from "next/link";
import type { Episode } from "@/types/game";
import { AuthorByline } from "@/components/common/AuthorByline";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { AdSlot } from "@/components/ads/AdSlot";
import { getCharactersBySlugs } from "@/lib/data/characters";
import { getChapterSlug, getNextEpisode, getPreviousEpisode } from "@/lib/data/episodes";
import { getChapterGuide } from "@/lib/data/guides";
import { isPitfallTip } from "@/lib/content/route-notes";
import { getInfluenceForChapter } from "@/data/game/character-profile-details";
import { getAchievementIcon, getAchievementsByEpisode } from "@/lib/data/achievements";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import styles from "@/style/page/episodes/episode-detail.module.css";

function NumberedHeading({ number, title, id }: { number: number; title: string; id: string }) {
  return <div className={styles.sectionHeading}><span className={styles.number}>{number}</span><h2 id={id}>{title}</h2></div>;
}

export default function EpisodeDetailPage({ episode }: { episode: Episode }) {
  const episodeCharacters = getCharactersBySlugs(episode.characters);
  const episodeAchievements = getAchievementsByEpisode(episode.number);
  const nextEpisode = getNextEpisode(episode.number);
  const previousEpisode = getPreviousEpisode(episode.number);
  const chapterGuide = getChapterGuide(episode.slug);
  const path = `/chapters/${getChapterSlug(episode)}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Chapters", path: "/chapters" },
    { name: `Chapter ${episode.ordinal}: ${episode.title}`, path },
  ];

  return (
    <main id="main-content">
      <JsonLd data={[
        articleSchema({ title: episode.seo.title, description: episode.seo.description, path, image: episode.image, datePublished: episode.releaseDate }),
        breadcrumbSchema(breadcrumbItems),
        faqSchema(episode.faqs),
      ]} />

      <header className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Chapters", href: "/chapters" }, { label: `Chapter ${episode.ordinal}: ${episode.title}` }]} />
          <div className={styles.heroGrid}>
            <div>
              <p>Sally Face · Chapter {episode.ordinal}</p>
              <h1>Sally Face Chapter {episode.number}: {episode.title}</h1>
              <p className={styles.lead}>{episode.summary} Use this route for the story order, required steps, codes, the people you meet, and the spoiler-marked ending.</p>
              <p className={styles.playerNote}>{episode.playerNote}</p>
              <AuthorByline />
            </div>
            <div className={styles.heroVisual}>
              <Image src={episode.image} alt={episode.imageAlt} fill loading="eager" sizes="(max-width: 768px) 100vw, 420px" />
              <span className={styles.paperLabel}>Chapter {episode.ordinal}<br />{episode.title}</span>
            </div>
          </div>
          <div className={styles.infoStrip}>
            <div className={styles.infoItem}><span>Chapter</span><strong>{episode.ordinal}</strong></div>
            <div className={styles.infoItem}><span>Main location</span><strong>{episode.location}</strong></div>
            <div className={styles.infoItem}><span>Main characters</span><strong>{episodeCharacters.slice(0, 3).map((character) => character.alias).join(", ")}</strong></div>
            <div className={styles.infoItem}><span>Achievements</span><Link href={`/achievements#episode-${episode.number}-achievements`}>{episode.achievementCount} total →</Link></div>
            <div className={styles.infoItem}><span>Community playtime estimate</span><strong>{episode.length}</strong></div>
          </div>
        </div>
      </header>

      {/* 内页广告位 1：Hero 下方。 */}
      <div className="container"><AdSlot format="responsive" /></div>

      <div className={`container ${styles.pageGrid}`}>
        <article className={styles.article}>
          <section className={`${styles.sectionPanel} ${styles.overview}`}>
            <NumberedHeading number={1} title={`Chapter ${episode.number} Route Overview`} id="overview" />
            {episode.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={2} title={`Chapter ${episode.number} Walkthrough: Steps, Codes & Choices`} id="walkthrough" />
            <p className={styles.sectionLead}>Follow this in story order to finish the Chapter. Cutoff mistakes, replay-only awards, and the full achievement hunt are in the {chapterGuide ? <Link href={`/guides/${chapterGuide.slug}#missables`}>Chapter {episode.number} Walkthrough Guide</Link> : <Link href="/guides">Walkthrough Guides</Link>}.</p>
            <div className={styles.steps}>
              {episode.walkthrough.map((step, index) => (
                <section className={styles.step} key={step.title} id={`step-${index + 1}`}>
                  <div className={styles.stepImage}><Image src={step.image} alt={step.imageAlt} fill sizes="(max-width: 768px) 100vw, 360px" /></div>
                  <div className={styles.stepBody}>
                    <h3>Step {index + 1} – {step.title}</h3>
                    <p>{step.body}</p>
                    {isPitfallTip(step.tip) ? null : <p className={styles.tip}>◉ Tip: {step.tip}</p>}
                    {chapterGuide && index === episode.walkthrough.length - 1 ? <p className={styles.stepLink}>Need every award from this Chapter? Use the <Link href={`/guides/${chapterGuide.slug}#missables`}>Chapter {episode.number} Walkthrough Guide</Link> for missables and replay cuts.</p> : null}
                  </div>
                </section>
              ))}
            </div>
          </section>

          {/* 内页广告位 1：放在完整攻略步骤之后，不夹在步骤与标题之间。 */}
          <AdSlot format="responsive" />

          <section className={styles.sectionPanel} id="route-checks">
            <NumberedHeading number={3} title={`Chapter ${episode.number} Route Checks`} id="route-checks-heading" />
            <p className={styles.sectionLead}>Use this as you move between areas. It is the work that lets the Chapter continue.</p>
            <div className={styles.routeChecks}>
              {episode.routeChecks.map((routeCheck) => <article className={styles.routeCheck} key={routeCheck.area}>
                <p className={styles.routeArea}>{routeCheck.area}</p>
                <h3>{routeCheck.goal}</h3>
                <p>{routeCheck.check}</p>
              </article>)}
            </div>
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={4} title={`Chapter ${episode.number} Characters & Key Interactions`} id="characters" />
            <p className={styles.sectionLead}>Who you meet in this Chapter, and what they do on this route. Profiles keep the full relationship map. If a conversation can lock an award, that warning is in the {chapterGuide ? <Link href={`/guides/${chapterGuide.slug}#cast`}>Chapter {episode.number} Walkthrough Guide</Link> : <Link href="/guides">Walkthrough Guides</Link>}.</p>
            <div className={styles.characterGrid}>
              {episodeCharacters.map((character) => {
                const influence = getInfluenceForChapter(character.slug, episode.slug);
                return (
                  <Link className={styles.character} href={`/characters/${character.slug}`} key={character.slug}>
                    <span className={styles.characterImage}><Image src={character.image} alt="" fill sizes="74px" /></span>
                    <span className={styles.characterMeta}>
                      <h3>{character.name}</h3>
                      <p className={styles.characterRole}>{influence?.impact ?? character.playerNote}</p>
                      <span className={styles.characterLink}>View profile →</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={5} title={`Chapter ${episode.number} Achievements`} id="achievements" />
            <p className={styles.sectionLead}>These {episodeAchievements.length} awards belong to this Chapter. Story ones follow the route above.</p>
            <div className={styles.achievementGrid}>
              {episodeAchievements.map((achievement) => (
                <article className={styles.achievementCard} key={achievement.name}>
                  <span className={styles.achievementIcon}>
                    <Image src={getAchievementIcon(achievement)} alt="" fill sizes="56px" />
                  </span>
                  <div>
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                    <div className={styles.achievementMeta}>
                      <span>{achievement.type}</span>
                      <span className={achievement.missable ? styles.missable : styles.story}>{achievement.missable ? "Missable" : "Story"}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {chapterGuide ? <p className={styles.sectionFollow}><Link href={`/guides/${chapterGuide.slug}#achievements`}>How to unlock every Chapter {episode.number} achievement →</Link></p> : <p className={styles.sectionFollow}><Link href={`/achievements#episode-${episode.number}-achievements`}>Full achievement checklist →</Link></p>}
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={6} title={`Chapter ${episode.number} Items, Collectibles & Locations`} id="items" />
            <p className={styles.sectionLead}>Pick these up as you go. They are the chapter items that open the route, support an investigation, or keep an optional path available.</p>
            <div className={styles.itemGrid}>
              {episode.items.map((item) => (
                <article className={styles.item} key={item.name}>
                  <h3>{item.name}</h3>
                  <dl><dt>Type</dt><dd>{item.type}</dd><dt>Location</dt><dd>{item.location}</dd><dt>Used for</dt><dd>{item.use}</dd></dl>
                </article>
              ))}
            </div>
          </section>

          {/* 内页广告位 2：与第一广告位由多个信息区块隔开。 */}
          <AdSlot format="native" />

          <section className={styles.sectionPanel}>
            <NumberedHeading number={7} title={`Chapter ${episode.number} Puzzle Solutions & Codes`} id="puzzles" />
            <p className={styles.sectionLead}>These are the answers that let the Chapter continue. If a number is right but the room will not move, the stuck-point notes are in the {chapterGuide ? <Link href={`/guides/${chapterGuide.slug}#stuck-points`}>Chapter {episode.number} Walkthrough Guide</Link> : <Link href="/guides">Walkthrough Guides</Link>}.</p>
            <div className={styles.puzzleGrid}>
              {episode.puzzles.map((puzzle) => (
                <article className={styles.puzzle} key={puzzle.title}>
                  <h3>{puzzle.title}</h3>
                  <p>{puzzle.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {episode.quickReferences?.length ? <section className={styles.sectionPanel}>
            <NumberedHeading number={8} title={episode.quickAnswersTitle ?? `Chapter ${episode.number} Quick Answers`} id="quick-answers" />
            <p className={styles.referenceLead}>Each card pairs the result with the clue that produces it, so you can solve a blocked route without losing the context behind it.</p>
            <div className={styles.referenceGrid}>
              {episode.quickReferences.map((reference) => <article className={styles.reference} key={reference.title}>
                {reference.searchIntent ? <p className={styles.searchIntent}>{reference.searchIntent}</p> : null}
                <h3>{reference.title}</h3>
                <dl><dt>Clue</dt><dd>{reference.clue}</dd><dt>Answer</dt><dd className={styles.referenceAnswer}>{reference.solution}</dd></dl>
                {reference.caution ? <p className={styles.referenceCaution}>◉ {reference.caution}</p> : null}
                {reference.checklist?.length ? <ul>{reference.checklist.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </article>)}
            </div>
          </section> : null}

          <section className={styles.sectionPanel} id="ending">
            <NumberedHeading number={episode.quickReferences ? 9 : 8} title={`Chapter ${episode.number} Ending Explained`} id="ending-heading" />
            <details className={styles.spoiler}>
              <summary>Major spoilers — reveal the ending</summary>
              <p>{episode.ending}</p>
            </details>
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={episode.quickReferences ? 10 : 9} title="Frequently Asked Questions" id="faq" />
            <FaqList faqs={episode.faqs} />
          </section>

          <nav className={styles.related} aria-label="Related guides">
            {previousEpisode ? <Link href={`/chapters/${getChapterSlug(previousEpisode)}`}>← Previous: {previousEpisode.title}</Link> : <Link href="/chapters">All chapter routes →</Link>}
            <Link href="/achievements">All 35 achievements →</Link>
            {nextEpisode ? <Link href={`/chapters/${getChapterSlug(nextEpisode)}`}>Next: {nextEpisode.title} →</Link> : <Link href="/sally-face-2">Continue to Sally Face 2 →</Link>}
          </nav>
        </article>

        <aside className={styles.sidebar}>
          <section className={styles.sidePanel}>
            <h2>On This Page</h2>
            <ol className={styles.toc}>
              <li><a href="#overview">Chapter overview</a></li>
              <li><a href="#walkthrough">Steps & route</a></li>
              {episode.walkthrough.map((step, index) => <li key={step.title}><a href={`#step-${index + 1}`}>Step {index + 1}: {step.title}</a></li>)}
              <li><a href="#route-checks">Route checks</a></li>
              <li><a href="#characters">Characters you'll meet</a></li>
              <li><a href="#achievements">Achievements</a></li>
              <li><a href="#items">Items & collectibles</a></li>
              <li><a href="#puzzles">Puzzle solutions</a></li>
              {episode.quickReferences?.length ? <li><a href="#quick-answers">Quick answers</a></li> : null}
              <li><a href="#ending">Ending explained</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ol>
          </section>
          <section className={styles.sidePanel}>
            <h2>Quick Facts</h2>
            <dl className={styles.quickFacts}>
              <div><dt>Chapter</dt><dd>{episode.ordinal}</dd></div>
              <div><dt>Location</dt><dd>{episode.location}</dd></div>
              <div><dt>Guide stages</dt><dd>{episode.walkthrough.length}</dd></div>
              <div><dt>Key solutions</dt><dd>{episode.puzzles.length}</dd></div>
              <div><dt>Achievements</dt><dd><Link href={`/achievements#episode-${episode.number}-achievements`}>{episode.achievementCount} total →</Link></dd></div>
              <div><dt>Playtime</dt><dd>{episode.length.replace("≈", "About ")}</dd></div>
            </dl>
          </section>
          <section className={styles.sidePanel}>
            <h2>Need every award?</h2>
            <p>This page finishes the Chapter. {chapterGuide ? <Link href={`/guides/${chapterGuide.slug}#missables`}>The Walkthrough Guide</Link> : <Link href="/guides">The Walkthrough Guides</Link>} covers cutoff mistakes, mutually exclusive outcomes, and the full achievement checklist.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
