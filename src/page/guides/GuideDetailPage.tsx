import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import type { Guide } from "@/types/game";
import { getChapterSlug, getEpisodeBySlug } from "@/lib/data/episodes";
import { getAchievementsByEpisode } from "@/lib/data/achievements";
import styles from "@/style/page/guides/guides.module.css";

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const path = `/guides/${guide.slug}`;
  const chapter = getEpisodeBySlug(guide.chapterSlug);
  const chapterAchievements = chapter ? getAchievementsByEpisode(chapter.number) : [];
  const routeMistakes = [...new Set([...guide.mistakes, ...(chapter?.walkthroughMistakes ?? [])])];
  return <main id="main-content">
    <JsonLd data={[articleSchema({ title: guide.seo.title, description: guide.seo.description, path, image: guide.image }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: guide.title, path }]), faqSchema(guide.faqs)]} />
    <header className={styles.detailHero}><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} /><div className={styles.detailHeroGrid}><div><p className={styles.eyebrow}>{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.summary}</p></div><div className={styles.detailImage}><Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 440px" /></div></div></div></header>
    <div className={`container ${styles.detailLayout}`}>
      <article className={styles.article}>
        <section className={styles.quickAnswer} id="quick-answer"><strong>Quick answer</strong><p>{guide.quickAnswer}</p>{chapter ? <p className={styles.inlineContext}>If you still need the story beat that leads here, pick it up again in <Link href={`/chapters/${getChapterSlug(chapter)}`}>Chapter {chapter.number}: {chapter.title}</Link>.</p> : null}</section>
        <section className={styles.factGrid}>{guide.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section>
        {chapterAchievements.length ? <section className={styles.panel} id="achievements"><h2>Chapter {chapter?.number} Achievement Checklist</h2><p className={styles.panelLead}>Use this list before a late sequence. The Chapter route explains the normal story order; this guide keeps the missable timing and replay risks in one place.</p><div className={styles.guideAchievements}>{chapterAchievements.map((achievement) => <article key={achievement.name}><div><h3>{achievement.name}</h3><p>{achievement.description}</p></div><p><strong>{achievement.missable ? "Missable:" : "Story:"}</strong> {achievement.unlock}</p></article>)}</div></section> : null}
        <section className={styles.panel} id="visual-clues"><h2>Visual Clues</h2><div className={styles.gallery}>{guide.gallery.map((item) => <figure key={item.image}><div><Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" /></div><figcaption>{item.caption}</figcaption></figure>)}</div></section>
        <section className={styles.panel} id="stuck-points"><h2>Where Players Get Stuck</h2><div className={styles.steps}>{guide.steps.map((step, index) => <article key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></section>
        <section className={styles.panel} id="missables"><h2>{chapter ? `Before You Finish Chapter ${chapter.number}` : "Before You Finish the Game"}</h2><ul className={styles.mistakes}>{routeMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}<li>If an achievement fails to appear after a clean run, compare the condition against the <Link href="/achievements">full achievement checklist</Link> before replaying.</li></ul></section>
        <section className={styles.panel} id="faq"><h2>Questions Players Ask</h2><FaqList faqs={guide.faqs} /></section>
      </article>
      <aside className={styles.sidebar}><section><h2>On This Guide</h2><nav aria-label="On this guide"><a href="#quick-answer">Quick Answer</a><a href="#visual-clues">Visual Clues</a><a href="#stuck-points">Where Players Get Stuck</a>{chapterAchievements.length ? <a href="#achievements">Achievement Checklist</a> : null}<a href="#missables">Before You Finish</a><a href="#faq">Questions Players Ask</a></nav></section></aside>
    </div>
  </main>;
}
