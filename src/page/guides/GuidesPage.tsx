"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { guides } from "@/lib/data/guides";
import { SectionTitle } from "@/components/common/SectionTitle";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/guides/guides.module.css";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import type { Guide } from "@/types/game";

const guideCategories = [
  { label: "All Guides", href: "/guides" },
  { label: "Chapter Walkthroughs", href: "/guides?category=chapters" },
  { label: "100% Completion", href: "/guides?category=completion" },
] as const;
type GuideFilter = typeof guideCategories[number]["label"];

function GuideCard({ guide }: { guide: Guide }) {
  return <article className={styles.card}>
    <Link className={styles.cardImage} href={`/guides/${guide.slug}`} tabIndex={-1} aria-hidden="true"><Image src={guide.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" /></Link>
    <div className={styles.cardBody}><p>{guide.category}</p><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><span className={styles.factLine}>{guide.facts.map((fact) => `${fact.value} ${fact.label}`).join(" · ")}</span><p>{guide.summary}</p><Link className={styles.cardAction} href={`/guides/${guide.slug}`}>Read this guide →</Link></div>
  </article>;
}

function GuidesContent() {
  const searchParams = useSearchParams();
  const activeFilter: GuideFilter = searchParams.get("category") === "chapters" ? "Chapter Walkthroughs" : searchParams.get("category") === "completion" ? "100% Completion" : "All Guides";
  const visibleGuides = activeFilter === "All Guides" ? guides : guides.filter((guide) => guide.category === activeFilter);

  return <main id="main-content">
    <JsonLd data={collectionSchema("Sally Face Guides", "Focused completion, missable and puzzle guides for Sally Face.", "/guides", guides.map((guide) => ({ name: guide.title, path: `/guides/${guide.slug}` })))} />
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/images/walkthrough/episode-four-vhs-archive.webp" alt="VHS archive from Sally Face Chapter Four" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroInner}`}><div className={styles.heroCopy}><p className={styles.eyebrow}>Player-focused walkthrough guides</p><h1>Sally Face Guides <span>Find the Help You Need</span></h1><p>Choose a Chapter walkthrough for your current save, or use the completion guide when you are cleaning up the whole game.</p></div><aside className={styles.heroMeta} aria-label="Guide highlights"><div><strong>2</strong><span>Guide categories</span></div><div><strong>35</strong><span>Steam achievements</span></div><div><strong>5</strong><span>Story Chapters</span></div></aside></div>
    </section>
    <div className={`container ${styles.content}`}>
      <section className={styles.categoryIntro} aria-labelledby="guide-categories"><h2 id="guide-categories">Browse by Chapter or Goal</h2><nav className={styles.guideFilters} aria-label="Guide categories">{guideCategories.map((category) => <Link className={activeFilter === category.label ? styles.activeFilter : undefined} href={category.href} aria-current={activeFilter === category.label ? "page" : undefined} key={category.label}>{category.label}</Link>)}</nav></section>
      <section className={primitives.section}><SectionTitle title={activeFilter === "All Guides" ? "Sally Face Guides for Chapters & Completion" : activeFilter} /><p className={styles.categoryLead}>{activeFilter === "All Guides" ? "Chapter-specific help for problems that can interrupt a playthrough, plus one plan for full completion." : activeFilter === "Chapter Walkthroughs" ? "Five Chapter guides for routes, codes, missables, collectibles, and the points where it is safest to pause." : "A game-wide plan for all 35 Steam achievements, with the Chapter One replay and late-game checkpoints in the right order."}</p><div className={styles.grid}>{visibleGuides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}</div></section>
      <section className={styles.routeStrip}><div><p className={styles.eyebrow}>Playing for the first time?</p><h2>Start With the Chapter You’re Playing</h2><p>These guides solve one job at a time. For the story in order, begin with the Chapter route that matches your save.</p></div><Link className={primitives.button} href="/chapters">Browse all Chapters →</Link></section>
    </div>
  </main>;
}

export default function GuidesPage() {
  return <Suspense fallback={<main id="main-content" />}><GuidesContent /></Suspense>;
}
