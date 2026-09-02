import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/content/article.module.css";

const faqs = [
  { question: "What is the Sally Face 2 release date?", answer: "Portable Moose lists the release date as TBD. No year or launch day has been confirmed." },
  { question: "When is Sally Face 2 coming out?", answer: "There is no confirmed date. The official plan is to launch through Steam Early Access first." },
  { question: "Is there a Sally Face 2 trailer?", answer: "Yes. Portable Moose released an official teaser and links it from the Sally Face 2 Press Kit." },
  { question: "What platforms will Sally Face 2 be on?", answer: "Steam Early Access is first. The official Press Kit says consoles and mobile will follow." },
  { question: "Who is developing Sally Face 2?", answer: "Portable Moose is developing the sequel. The team expanded from a solo operation to four people during 2025–2026." },
];

export default function SallyFace2Page() {
  const path = "/sally-face-2";
  const title = "Sally Face 2 — Release Status, Trailer & Confirmed Details";
  const description = "Confirmed Sally Face 2 release status, official teaser, story premise, platforms, Early Access plan and development timeline.";
  return (
    <main id="main-content">
      <JsonLd data={[articleSchema({ title, description, path, image: "/images/sally-face-2/sally-face-2-screenshot-3.webp" }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sally Face 2", path }]), faqSchema(faqs)]} />
      <header className={styles.hero}><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sally Face 2" }]} /><div className={styles.heroGrid}><div><p className={styles.eyebrow}>Last reviewed September 2, 2026</p><h1>Sally Face 2 <span>Release Status, Trailer & Confirmed Details</span></h1><p className={styles.lead}>Sally Face 2 is in production at Portable Moose. The release date remains TBD, with Steam Early Access planned before console and mobile versions.</p><a className={`${primitives.button} ${primitives.buttonPurple}`} href={siteConfig.official.steamSequel} target="_blank" rel="noreferrer">Wishlist on Steam ↗</a></div><div className={styles.heroImage}><Image src="/images/sally-face-2/sally-face-2-screenshot-3.webp" alt="Official Sally Face 2 screenshot from Portable Moose" fill loading="eager" sizes="(max-width: 768px) 100vw, 440px" /></div></div></div></header>
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          <section className={styles.quickAnswer}><strong>Release Status</strong><p>Release date: TBD. First platform: Steam Early Access. Consoles and mobile are planned to follow. Developer: Portable Moose.</p></section>
          <section className={styles.section} id="overview"><h2>Sally Face 2 Overview</h2><p>Portable Moose describes the sequel as a side-scrolling, narrative-driven adventure with challenging puzzles and an optional hint system. The game remains inspired by 1990s cartoons and personal nightmares, with artwork and production handled by a small human team.</p></section>
          <section className={styles.section} id="release"><h2>Sally Face 2 Release Date</h2><p>The official release date is TBD. Any page claiming a confirmed year, month or day is speculating unless Portable Moose updates the Press Kit or Steam listing. Wishlist status is not a release window.</p></section>
          <section className={styles.section} id="status"><h2>Current Development Status</h2><div className={styles.timeline}><div className={styles.timelineItem}><strong>2021–2023</strong><span>Steve Gabry wrote the sequel outline while porting the original game and working on other projects.</span></div><div className={styles.timelineItem}><strong>2024</strong><span>Pre-production began.</span></div><div className={styles.timelineItem}><strong>2025–2026</strong><span>Portable Moose made its first three hires and expanded to a four-person production team focused on Sally Face 2.</span></div><div className={styles.timelineItem}><strong>Current</strong><span>Production continues, with a Steam wishlist page and official teaser available.</span></div></div></section>
          <section className={styles.section} id="trailer"><h2>Sally Face 2 Trailer</h2><p>An official teaser is available through Portable Moose. It establishes a broken, darker world after the first game's climax without giving away a complete plot or launch date.</p><a className={primitives.button} href="https://www.youtube.com/portablemoose" target="_blank" rel="noreferrer">Watch on Portable Moose YouTube ↗</a></section>
          <section className={styles.section} id="story"><h2>Story, Characters & What Is Confirmed</h2><p>The confirmed premise follows a group of friends struggling to find meaning in a world broken by darkness. Official screenshots show returning visual motifs and new character designs, but Portable Moose has not published a complete cast list. Treat unofficial character rosters and plot summaries as speculation.</p></section>
          <section className={styles.section} id="gameplay"><h2>Platforms & Early Access Plan</h2><p>Sally Face 2 remains a single-player adventure built around side-scrolling exploration, narrative choices, puzzles and a hint system. Steam Early Access is the first announced platform stage; consoles and mobile are intended to follow.</p></section>
          <section className={styles.section} id="gallery"><h2>Official Preview Gallery</h2><div className={styles.gallery}>{[1, 3, 5].map((number) => <div className={styles.galleryItem} key={number}><Image src={`/images/sally-face-2/sally-face-2-screenshot-${number}.webp`} alt={`Official Sally Face 2 preview screenshot ${number}`} fill sizes="(max-width: 768px) 100vw, 300px" /></div>)}</div></section>
          <section className={styles.section} id="faq"><h2>Questions Players Ask</h2><FaqList faqs={faqs} /></section>
        </article>
        <aside className={styles.sidebar}><section className={styles.sidePanel}><h2>On This Page</h2><nav><a href="#overview">Overview</a><a href="#release">Release date</a><a href="#status">Development status</a><a href="#trailer">Official teaser</a><a href="#story">Story & characters</a><a href="#gameplay">Gameplay & platforms</a><a href="#gallery">Preview gallery</a><a href="#faq">FAQ</a></nav></section><section className={styles.sidePanel}><h2>Quick Facts</h2><p><strong>Release:</strong> TBD</p><p><strong>Players:</strong> Single-player</p><p><strong>First platform:</strong> Steam Early Access</p><p><strong>Developer:</strong> Portable Moose</p></section><section className={styles.sidePanel}><h2>Catch Up</h2><nav><Link href="/chapters">Original five chapters →</Link><Link href="/characters">Character profiles →</Link><Link href="/achievements">Achievement checklist →</Link></nav></section></aside>
      </div>
    </main>
  );
}
