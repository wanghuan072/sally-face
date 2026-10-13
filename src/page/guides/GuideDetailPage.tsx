import Image from "next/image";
import Link from "next/link";
import { AuthorByline } from "@/components/common/AuthorByline";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import type { Guide } from "@/types/game";
import { getCharactersBySlugs } from "@/lib/data/characters";
import { getChapterSlug, getEpisodeBySlug } from "@/lib/data/episodes";
import { getInfluenceForChapter, isMissableForChapter } from "@/data/game/character-profile-details";
import { getWalkthroughPitfallTips } from "@/lib/content/route-notes";
import { getAchievementsByEpisode } from "@/lib/data/achievements";
import styles from "@/style/page/guides/guides.module.css";

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const path = `/guides/${guide.slug}`;
  const chapter = getEpisodeBySlug(guide.chapterSlug);
  const chapterAchievements = chapter ? getAchievementsByEpisode(chapter.number) : [];
  const routeMistakes = [...new Set([...guide.mistakes, ...(chapter?.walkthroughMistakes ?? [])])];
  const chapterCast = chapter ? getCharactersBySlugs(chapter.characters) : [];
  const missableCast = chapter ? chapterCast.filter((character) => isMissableForChapter(character.slug, chapter.slug)) : [];
  const pitfallTips = chapter ? getWalkthroughPitfallTips(chapter) : [];
  return <main id="main-content">
    <JsonLd data={[articleSchema({ title: guide.seo.title, description: guide.seo.description, path, image: guide.image }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: guide.title, path }]), faqSchema(guide.faqs)]} />
          <header className={styles.detailHero}><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} /><div className={styles.detailHeroGrid}><div><p className={styles.eyebrow}>{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.summary}</p><AuthorByline /></div><div className={styles.detailImage}><Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 440px" /></div></div></div></header>
    {/* 内页广告位 1：Hero 下方。 */}
    <div className="container"><AdSlot format="responsive" /></div>
    <div className={`container ${styles.detailLayout}`}>
      <article className={styles.article}>
        <section className={styles.quickAnswer} id="quick-answer"><strong>Quick answer</strong><p>{guide.quickAnswer}</p>{chapter ? <p className={styles.inlineContext}>This guide is the no-miss layer. For the story order that finishes the Chapter, use <Link href={`/chapters/${getChapterSlug(chapter)}`}>Chapter {chapter.number}: {chapter.title}</Link>.</p> : null}</section>
        <section className={styles.factGrid}>{guide.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section>
        <section className={`${styles.panel} ${styles.pitfallPanel}`} id="missables"><h2>{chapter ? `Don't Miss These in Chapter ${chapter.number}` : "Don't Miss These"}</h2><p className={styles.panelLead}>Replay cuts, mutually exclusive awards, and the conversations that look optional. The Chapter route still has the story order if you only need to finish.</p>{pitfallTips.map((tip) => <p className={styles.missCallout} key={tip}>◉ Don't miss this: {tip}</p>)}<ul className={styles.mistakes}>{routeMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}<li>If an achievement fails to appear after a clean run, compare the condition against the <Link href="/achievements">full achievement checklist</Link> before replaying.</li></ul></section>
        {/* 内页广告位 1：夹在完整信息面板之间，不紧贴标题。 */}
        <AdSlot format="responsive" />
        {chapter ? <section className={`${styles.panel} ${styles.castPanel}`} id="cast"><h2>Who Causes a Miss in Chapter {chapter.number}</h2><p className={styles.panelLead}>{missableCast.length ? <>Skip these conversations or choices and you lock an achievement, a tool, or a later code. The rest of the people on this route are on the <Link href={`/chapters/${getChapterSlug(chapter)}#characters`}>Chapter {chapter.number} roster</Link>.</> : <>No optional conversation on this route locks an achievement. Meet the Chapter {chapter.number} people on the <Link href={`/chapters/${getChapterSlug(chapter)}#characters`}>Chapter roster</Link>.</>}</p>{missableCast.length ? <div className={styles.castBoard}>{missableCast.map((character) => {
          const influence = getInfluenceForChapter(character.slug, chapter.slug);
          return <Link className={styles.castPolaroid} href={`/characters/${character.slug}`} key={character.slug}><span className={styles.castShot}><Image src={character.image} alt="" fill sizes="180px" /></span><strong>{character.name}</strong><p>{influence?.impact ?? character.playerNote}</p>{influence ? <span className={styles.castSticky}>{influence.ifMissed}</span> : null}</Link>;
        })}</div> : null}</section> : null}
        {chapterAchievements.length ? <section className={styles.panel} id="achievements"><h2>{chapter ? `How to Unlock Every Chapter ${chapter.number} Achievement` : "How to Unlock Every Achievement"}</h2><p className={styles.panelLead}>Story awards follow the Chapter route. Use the timing notes and unlock steps here when you want the complete set, including replay-only outcomes.</p>{chapter?.achievementPointers.length ? <div className={styles.pointerGrid}>{chapter.achievementPointers.map((pointer) => <article key={pointer.name}><h3>{pointer.name}</h3><p><strong>Best time:</strong> {pointer.when}</p><p><strong>Watch out:</strong> {pointer.risk}</p></article>)}</div> : null}<div className={styles.guideAchievements}>{chapterAchievements.map((achievement) => <article key={achievement.name}><div><h3>{achievement.name}</h3><p>{achievement.description}</p></div><p><strong>{achievement.missable ? "Missable:" : "Story:"}</strong> {achievement.unlock}</p></article>)}</div>{chapter ? <p className={styles.sectionFollow}><Link href={`/chapters/${getChapterSlug(chapter)}#achievements`}>See these awards on the Chapter {chapter.number} route →</Link></p> : <p className={styles.sectionFollow}><Link href="/achievements">Full achievement checklist →</Link></p>}</section> : null}
        {chapter?.checkpoints.length ? <section className={styles.panel} id="checkpoints"><h2>Final Checks Before You Close Chapter {chapter.number}</h2><p className={styles.panelLead}>Confirm these while this save is still open. They are the last things that fail after a late sequence.</p><ul className={styles.checkpointList}>{chapter.checkpoints.map((checkpoint) => <li key={checkpoint}>{checkpoint}</li>)}</ul></section> : null}
        <section className={styles.panel} id="stuck-points"><h2>Where Players Get Stuck</h2><div className={styles.steps}>{guide.steps.map((step, index) => <article key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></section>
        {/* 内页广告位 2：与上一广告位之间隔开多个完整阅读区块。 */}
        <AdSlot format="native" />
        <section className={styles.panel} id="visual-clues"><h2>Visual Clues</h2><p className={styles.panelLead}>Official Steam screenshots. Use the caption to find the interaction.{chapter ? <> Codes that let the Chapter continue stay on the <Link href={`/chapters/${getChapterSlug(chapter)}#puzzles`}>Chapter {chapter.number} puzzle list</Link>.</> : null}</p><div className={styles.gallery}>{guide.gallery.map((item) => <figure key={item.image}><div><Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" /></div><figcaption>{item.caption}</figcaption></figure>)}</div></section>
        <section className={styles.panel} id="faq"><h2>Questions Players Ask</h2><FaqList faqs={guide.faqs} /></section>
      </article>
      <aside className={styles.sidebar}>
        <section>
          <h2>On This Guide</h2>
          <nav aria-label="On this guide">
            <a href="#quick-answer">Quick Answer</a>
            <a href="#missables">Don't Miss These</a>
            {chapter ? <a href="#cast">Who Causes a Miss</a> : null}
            {chapterAchievements.length ? <a href="#achievements">How to Unlock Every Achievement</a> : null}
            {chapter?.checkpoints.length ? <a href="#checkpoints">Final Checks</a> : null}
            <a href="#stuck-points">Where Players Get Stuck</a>
            <a href="#visual-clues">Visual Clues</a>
            <a href="#faq">Questions Players Ask</a>
          </nav>
        </section>
        {guide.relatedChapters.length ? (
          <section>
            <h2>Related Pages</h2>
            <nav aria-label="Related pages">
              {guide.relatedChapters.map((item) => <Link href={item.href} key={`${item.href}-${item.label}`}>{item.label} →</Link>)}
            </nav>
          </section>
        ) : null}
      </aside>
    </div>
  </main>;
}
