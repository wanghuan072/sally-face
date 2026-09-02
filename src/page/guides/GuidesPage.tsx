import Image from "next/image";
import Link from "next/link";
import { getGuideCategories, getGuidesByCategoryParam, guideCategoryParam, guides } from "@/lib/data/guides";
import { SectionTitle } from "@/components/common/SectionTitle";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/guides/guides.module.css";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import type { Guide } from "@/types/game";

function GuideCard({ guide }: { guide: Guide }) {
  return <article className={styles.card}>
    <Link className={styles.cardImage} href={`/guides/${guide.slug}`} tabIndex={-1} aria-hidden="true"><Image src={guide.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" /></Link>
    <div className={styles.cardBody}><p>{guide.category}</p><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><span className={styles.factLine}>{guide.facts.map((fact) => `${fact.value} ${fact.label}`).join(" · ")}</span><p>{guide.summary}</p><Link className={styles.cardAction} href={`/guides/${guide.slug}`}>Read this guide →</Link></div>
  </article>;
}

export default function GuidesPage({ category }: { category?: string }) {
  const categories = getGuideCategories();
  const visibleGuides = getGuidesByCategoryParam(category);
  const activeLabel = category
    ? categories.find((name) => guideCategoryParam(name) === category || (category === "chapters" && name === "Chapter Walkthroughs")) ?? "Filtered Guides"
    : "All Guides";

  return <main id="main-content">
    <JsonLd data={collectionSchema("Sally Face Guides", "Focused completion, missable and puzzle guides for Sally Face.", "/guides", guides.map((guide) => ({ name: guide.title, path: `/guides/${guide.slug}` })))} />
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/images/walkthrough/episode-four-vhs-archive.webp" alt="VHS archive from Sally Face Chapter Four" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroInner}`}><div className={styles.heroCopy}><p className={styles.eyebrow}>Player-focused chapter walkthroughs</p><h1>Sally Face Walkthrough Guides <span>Chapter Help When You Need It</span></h1><p>Choose the Chapter that matches your save for missables, achievement timing, codes, and route-specific help without losing your place in the story.</p></div><aside className={styles.heroMeta} aria-label="Guide highlights"><div><strong>{categories.length}</strong><span>{categories.length === 1 ? "Guide category" : "Guide categories"}</span></div><div><strong>35</strong><span>Steam achievements</span></div><div><strong>5</strong><span>Story Chapters</span></div></aside></div>
    </section>
    <div className={`container ${styles.content}`}>
      <section className={styles.categoryIntro} aria-labelledby="guide-categories"><h2 id="guide-categories">Browse by Chapter or Goal</h2><nav className={styles.guideFilters} aria-label="Guide categories"><Link className={!category ? styles.activeFilter : undefined} href="/guides" aria-current={!category ? "page" : undefined}>All Guides</Link>{categories.map((name) => {
        const href = `/guides?category=${guideCategoryParam(name)}`;
        const isActive = activeLabel === name;
        return <Link className={isActive ? styles.activeFilter : undefined} href={href} aria-current={isActive ? "page" : undefined} key={name}>{name}</Link>;
      })}</nav></section>
      <section className={primitives.section}><SectionTitle title={activeLabel === "All Guides" ? "Sally Face Walkthrough Guides by Chapter" : activeLabel} /><p className={styles.categoryLead}>Five Chapter guides for routes, codes, missables, collectibles, and the points where it is safest to pause.</p><div className={styles.grid}>{visibleGuides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}</div></section>
      <section className={styles.routeStrip}><div><p className={styles.eyebrow}>Playing for the first time?</p><h2>Start With the Chapter You’re Playing</h2><p>These guides solve one job at a time. For the story in order, begin with the Chapter route that matches your save.</p></div><Link className={primitives.button} href="/chapters">Browse all Chapters →</Link></section>
    </div>
  </main>;
}
