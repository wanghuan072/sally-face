import Image from "next/image";
import Link from "next/link";
import type { Episode } from "@/types/game";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { getCharactersBySlugs } from "@/lib/data/characters";
import { getChapterSlug, getNextEpisode } from "@/lib/data/episodes";
import { getChapterGuide } from "@/lib/data/guides";
import { getAchievementIcon, getAchievementId, getAchievementsByEpisode } from "@/lib/data/achievements";
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
              <p className={styles.lead}>{episode.summary} Use this route for required steps, codes, missable items, achievements and the spoiler-marked ending.</p>
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

      <div className={`container ${styles.pageGrid}`}>
        <article className={styles.article}>
          <section className={`${styles.sectionPanel} ${styles.overview}`}>
            <NumberedHeading number={1} title={`Chapter ${episode.number} Route Overview`} id="overview" />
            {episode.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={2} title={`Chapter ${episode.number} Walkthrough: Steps, Codes & Choices`} id="walkthrough" />
            <div className={styles.steps}>
              {episode.walkthrough.map((step, index) => (
                <section className={styles.step} key={step.title} id={`step-${index + 1}`}>
                  <div className={styles.stepImage}><Image src={step.image} alt={step.imageAlt} fill sizes="(max-width: 768px) 100vw, 360px" /></div>
                  <div className={styles.stepBody}>
                    <h3>Step {index + 1} – {step.title}</h3>
                    <p>{step.body}</p>
                    <p className={styles.tip}>◉ Tip: {step.tip}</p>
                    {chapterGuide && index === episode.walkthrough.length - 1 ? <p className={styles.stepLink}>Before you finish this Chapter, <Link href={`/guides/${chapterGuide.slug}`}>check the missable conversations, optional triggers, and replay-only achievements in the Chapter {episode.number} Walkthrough Guide</Link>.</p> : null}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className={styles.sectionPanel} id="route-checks">
            <NumberedHeading number={3} title={`Chapter ${episode.number} Route Checks`} id="route-checks-heading" />
            <p className={styles.sectionLead}>Use this as you move between areas. It highlights the interactions worth finishing before the story points you somewhere new.</p>
            <div className={styles.routeChecks}>
              {episode.routeChecks.map((routeCheck) => <article className={styles.routeCheck} key={routeCheck.area}>
                <p className={styles.routeArea}>{routeCheck.area}</p>
                <h3>{routeCheck.goal}</h3>
                <p>{routeCheck.check}</p>
                {routeCheck.risk ? <p className={styles.routeRisk}>◉ {routeCheck.risk}</p> : null}
              </article>)}
            </div>
            <div className={styles.achievementPointers}>
              <h3>Plan Chapter {episode.number} Achievements Before You Continue</h3>
              {episode.achievementPointers.map((pointer) => <article key={pointer.name}><h4>{pointer.name}</h4><p><strong>Best time:</strong> {pointer.when}</p><p><strong>Watch out:</strong> {pointer.risk}</p></article>)}
            </div>
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={4} title={`Chapter ${episode.number} Characters & Key Interactions`} id="characters" />
            <p className={styles.sectionLead}>Meet these characters as the route unfolds. Their profile pages add background and later-story context without interrupting the chapter steps; use the <Link href="/characters">full character roster</Link> when you want to follow a relationship beyond this Chapter.</p>
            <div className={styles.characterGrid}>
              {episodeCharacters.map((character) => (
                <Link className={styles.character} href={`/characters/${character.slug}`} key={character.slug}>
                  <span className={styles.characterImage}><Image src={character.image} alt="" fill sizes="74px" /></span>
                  <span><h3>{character.name}</h3><span>View profile →</span></span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={5} title={`Chapter ${episode.number} Achievements`} id="achievements" />
            <p className={styles.sectionLead}>All {episodeAchievements.length} chapter achievements are here. The story award comes naturally; mark the missable ones before you move into a late sequence, then use the <Link href={`/achievements#episode-${episode.number}-achievements`}>full achievement checklist</Link> for an exact trigger{chapterGuide ? <> or the <Link href={`/guides/${chapterGuide.slug}`}>Chapter {episode.number} Walkthrough Guide</Link> when the timing is what matters.</> : "."}</p>
            <div className={styles.achievementGrid}>
              {episodeAchievements.map((achievement) => (
                <article className={styles.achievementCard} key={achievement.name}>
                  <span className={styles.achievementIcon}>
                    <Image src={getAchievementIcon(achievement)} alt="" fill sizes="56px" />
                  </span>
                  <div>
                    <h3><Link href={`/achievements#${getAchievementId(achievement)}`}>{achievement.name}</Link></h3>
                    <p>{achievement.description}</p>
                    <p className={styles.unlock}>How to unlock: {achievement.unlock}</p>
                    <div className={styles.achievementMeta}>
                      <span>{achievement.type}</span>
                      <span className={achievement.missable ? styles.missable : styles.story}>{achievement.missable ? "Missable" : "Story"}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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

          <section className={styles.sectionPanel}>
            <NumberedHeading number={7} title={`Chapter ${episode.number} Puzzle Solutions & Codes`} id="puzzles" />
            {chapterGuide ? <p className={styles.sectionLead}>These are the direct answers. If a code is right but the route still will not move, the <Link href={`/guides/${chapterGuide.slug}`}>Chapter {episode.number} Walkthrough Guide</Link> explains the missing setup or interaction.</p> : null}
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
                <h3>{reference.title}</h3>
                <dl><dt>Clue</dt><dd>{reference.clue}</dd><dt>Answer</dt><dd className={styles.referenceAnswer}>{reference.solution}</dd></dl>
                {reference.caution ? <p className={styles.referenceCaution}>◉ {reference.caution}</p> : null}
                {reference.checklist?.length ? <ul>{reference.checklist.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </article>)}
            </div>
          </section> : null}

          <section className={styles.sectionPanel} id="checkpoints">
            <NumberedHeading number={episode.quickReferences ? 9 : 8} title={`Chapter ${episode.number} Missables & Final Checks`} id="checkpoints-heading" />
            <p className={styles.sectionLead}>Use these checkpoints before a late route, a chapter close, or a replay. They are the things most worth confirming while this save is still open.</p>
            <ul className={styles.checkpointList}>
              {episode.checkpoints.map((checkpoint) => <li key={checkpoint}>{checkpoint}</li>)}
            </ul>
          </section>

          <section className={styles.sectionPanel} id="ending">
            <NumberedHeading number={episode.quickReferences ? 10 : 9} title={`Chapter ${episode.number} Ending Explained`} id="ending-heading" />
            <details className={styles.spoiler}>
              <summary>Major spoilers — reveal the ending</summary>
              <p>{episode.ending}</p>
            </details>
          </section>

          <section className={styles.sectionPanel}>
            <NumberedHeading number={episode.quickReferences ? 11 : 10} title="Frequently Asked Questions" id="faq" />
            <FaqList faqs={episode.faqs} />
          </section>

          <nav className={styles.related} aria-label="Related guides">
            <Link href="/chapters">All chapter routes →</Link>
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
              <li><a href="#checkpoints">Before you continue</a></li>
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
              <div><dt>Release date</dt><dd>{episode.releaseDate}</dd></div>
            </dl>
          </section>
          <section className={styles.sidePanel}>
            <h2>Helpful Tip</h2>
            <p>Talk to characters again after every discovery. Sally Face often hides achievement dialogue behind a changed story state.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
