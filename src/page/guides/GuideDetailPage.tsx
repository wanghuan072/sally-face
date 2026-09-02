import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import type { Guide } from "@/types/game";
import { getEpisodeBySlug } from "@/lib/data/episodes";
import styles from "@/style/page/guides/guides.module.css";

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const path = `/guides/${guide.slug}`;
  const chapter = getEpisodeBySlug(guide.episodeSlug);
  const routeMistakes = [...new Set([...guide.mistakes, ...(chapter?.walkthroughMistakes ?? [])])];
  const spoilerScope = guide.kind === "completion" ? "all five Chapters" : `Chapter ${chapter?.number ?? ""}`;
  return <main id="main-content">
    <JsonLd data={[articleSchema({ title: guide.seo.title, description: guide.seo.description, path, image: guide.image }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: guide.title, path }]), faqSchema(guide.faqs)]} />
    <header className={styles.detailHero}><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} /><div className={styles.detailHeroGrid}><div><p className={styles.eyebrow}>{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.summary}</p></div><div className={styles.detailImage}><Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 440px" /></div></div></div></header>
    <div className={`container ${styles.detailLayout}`}><article className={styles.article}><section className={styles.quickAnswer}><strong>Quick answer</strong><p>{guide.quickAnswer}</p>{chapter ? <p className={styles.inlineContext}>If you still need the story beat that leads here, pick it up again in <Link href={`/chapters/${chapter.slug}`}>Chapter {chapter.number}: {chapter.title}</Link>.</p> : null}</section><section className={styles.factGrid}>{guide.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section><section className={styles.panel}><h2>Visual Clues</h2><div className={styles.gallery}>{guide.gallery.map((item) => <figure key={item.image}><div><Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" /></div><figcaption>{item.caption}</figcaption></figure>)}</div></section><section className={styles.panel}><h2>Where Players Get Stuck</h2><div className={styles.steps}>{guide.steps.map((step, index) => <article key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></section><section className={styles.panel} id="missables"><h2>{chapter ? `Before You Finish Chapter ${chapter.number}` : "Before You Finish the Game"}</h2><ul className={styles.mistakes}>{routeMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}<li>If an achievement fails to appear after a clean run, compare the condition against the <Link href="/achievements">full achievement checklist</Link> before replaying.</li></ul></section><section className={styles.panel}><h2>Questions Players Ask</h2><FaqList faqs={guide.faqs} /></section></article><aside className={styles.sidebar}><section><h2>How to Use This Guide</h2><p>This guide covers {spoilerScope} and can spoil route details, achievements, and ending setup. It is written around the Steam version; menus can differ on other platforms.</p><p>Use it when a code, optional conversation, collectible, or achievement timing is holding up your save. The Chapter route remains the place to follow the story in order.</p></section></aside></div>
  </main>;
}
