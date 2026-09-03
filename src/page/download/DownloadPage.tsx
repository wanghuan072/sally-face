import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaqList } from "@/components/common/FaqList";
import { SectionTitle } from "@/components/common/SectionTitle";
import { JsonLd } from "@/seo/JsonLd";
import { faqSchema } from "@/seo/schema";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/hubs/hubs.module.css";

const platforms = [
  { label: "PC / Steam", note: "Windows, macOS and Linux", detail: "The Steam page is Episode One (Chapter 1). The Season Pass or Complete Game bundle adds Chapters 2–5, the soundtrack, and the 35 Steam achievements.", href: siteConfig.official.steam },
  { label: "PC / GOG", note: "DRM-free complete game", detail: "GOG sells the full five-chapter game as a DRM-free Windows, macOS and Linux download. Galaxy is optional.", href: siteConfig.official.gog },
  { label: "PC / itch.io", note: "Direct from Portable Moose", detail: "The developer page sells Episode One, with the Season Pass (Chapters 2–5 and the soundtrack) as a separate purchase.", href: siteConfig.official.itch },
  { label: "PC / Game Jolt", note: "Listed in the Press Kit", detail: "Another official PC listing for Episode One and the Season Pass, alongside Steam and itch.io.", href: siteConfig.official.gameJolt },
  { label: "Android / Google Play", note: "Official mobile release · 16 Aug 2026", detail: "Portable Moose’s Android edition includes all five chapters. Install through Google Play; there is no separate official APK file.", href: siteConfig.official.android },
  { label: "iPhone & iPad", note: "Official App Store release · 16 Aug 2026", detail: "The native iOS edition launched with the tenth-anniversary mobile port. Requires iOS / iPadOS 15.6 or later and includes the full story.", href: siteConfig.official.ios },
  { label: "Nintendo Switch", note: "First console port · 21 Jan 2021", detail: "The complete game on Nintendo eShop for handheld or docked play.", href: siteConfig.official.switch },
  { label: "PlayStation", note: "PS4 · 15 Apr 2022", detail: "Official PlayStation Store edition of the complete game, released with the Xbox port.", href: siteConfig.official.playstation },
  { label: "Xbox", note: "Xbox One & Series X|S · 15 Apr 2022", detail: "Official Xbox store edition of the complete game. Compatible with Xbox One and Series X|S.", href: siteConfig.official.xbox },
];

const editions = [
  { title: "Episode One only", detail: "Steam, itch.io and Game Jolt start with Chapter 1: Strange Neighbors. That is a short opening chapter, not the full game." },
  { title: "Complete five chapters", detail: "Buy the Steam Season Pass or Complete Game bundle, GOG’s DRM-free listing, or the mobile and console editions. Those include the whole story." },
  { title: "Soundtrack", detail: "The Steam Complete Game bundle and the itch.io Season Pass include the official soundtrack. GOG lists soundtrack files as goodies." },
];

const faqs = [
  { question: "Is Sally Face free?", answer: "No. Every official listing is paid software. Store prices and discounts change; confirm the price on the storefront before you buy." },
  { question: "Does Steam Episode One include the whole game?", answer: "No. Episode One is Chapter 1. Chapters 2–5 are the Season Pass, also sold with Episode One as the Complete Game bundle." },
  { question: "Can I download Sally Face on Android?", answer: "Yes. The official Google Play version launched August 16, 2026 and includes all five chapters. Use the listing published by Portable Moose (com.portablemoose.sallyface)." },
  { question: "Is there a Sally Face APK?", answer: "Google Play installs an Android package internally. Portable Moose does not offer a separate official APK download. Avoid third-party cracked packages." },
  { question: "Is Sally Face on iPhone?", answer: "Yes. The App Store listing launched August 16, 2026 with the Android edition. It requires iOS or iPadOS 15.6 or later and includes all five chapters." },
  { question: "Does Sally Face run on Mac or Linux?", answer: "Yes. Steam, GOG and itch.io list Windows, macOS and Linux. Steam’s current minimums are Windows 10, macOS X 10.8 with Metal-capable graphics, and Ubuntu 14.04.5 LTS." },
  { question: "Is Sally Face on the Epic Games Store?", answer: "Portable Moose’s Press Kit lists Epic among the store pages, dated with the August 16, 2026 mobile release. Confirm the current Epic listing on that store before you buy; this page only links storefronts with a verified product URL." },
];

export default function DownloadPage() {
  return (
    <main id="main-content">
      <JsonLd data={faqSchema(faqs)} />
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/characters/sal-fisher-official.webp" alt="Official close-up of Sal Fisher for the download platform guide" fill loading="eager" sizes="100vw" />
        <div className={`container ${styles.heroInner}`}><div><h1>Sally Face Download — <span>Official PC, Mobile & Console Links</span></h1><p>Use Portable Moose’s store pages only. Steam Episode One is Chapter 1; the mobile, console and GOG listings are the complete five-chapter game. Looking for a Sally Face APK? The official Android edition is delivered through Google Play.</p><div className={styles.heroActions}><a className={`${primitives.button} ${primitives.buttonPrimary}`} href={siteConfig.official.steam} target="_blank" rel="noreferrer">Open Steam ↗</a><Link className={primitives.button} href="/download/android">Android & APK guide →</Link></div></div><aside className={styles.heroMeta} aria-label="Download guide highlights"><div><strong>9</strong><span>Verified storefronts</span></div><div><strong>PC</strong><span>Steam, GOG, itch, Game Jolt</span></div><div><strong>Mobile</strong><span>All five chapters</span></div></aside></div>
      </section>
      <div className={`container ${styles.content}`}>
        <section className={styles.notice}><strong>About APK searches:</strong> This site links to official storefronts only. It does not host game files, cracked releases or standalone APK packages.</section>
        <section className={primitives.section}><SectionTitle title="Official Download Links for Every Platform" /><p className={styles.categoryLead}>These URLs match Portable Moose’s Press Kit store list, minus Epic until a stable product page can be linked. ESRB rates the game M for Mature.</p><div className={styles.platformGrid}>{platforms.map((platform) => <article className={styles.platformCard} key={platform.label}><span className={styles.eyebrow}>{platform.note}</span><h3>{platform.label}</h3><p>{platform.detail}</p><a href={platform.href} target="_blank" rel="noreferrer">Official store →</a></article>)}</div></section>
        <section className={primitives.section}><SectionTitle title="What Each Edition Includes" /><div className={styles.editionGrid}>{editions.map((edition) => <article className={styles.requirement} key={edition.title}><h3>{edition.title}</h3><p>{edition.detail}</p></article>)}</div><p className={styles.categoryLead}><a href={siteConfig.official.steamComplete} target="_blank" rel="noreferrer">Steam Complete Game bundle ↗</a> · <a href={siteConfig.official.pressKit} target="_blank" rel="noreferrer">Portable Moose Press Kit ↗</a></p></section>
        <section className={primitives.section}><SectionTitle title="Sally Face System Requirements" /><div className={styles.requirements}><article className={styles.requirement}><h3>Windows minimum (Steam)</h3><ul><li>Windows 10</li><li>x64 processor with SSE2 support</li><li>4 GB RAM</li><li>DirectX 11-capable graphics</li><li>600 MB available storage</li></ul></article><article className={styles.requirement}><h3>Mac & Linux minimum (Steam)</h3><ul><li>macOS X 10.8, or Ubuntu 14.04.5 LTS</li><li>Apple Silicon / x64 SSE2 on Mac; 2 GHz on Linux</li><li>4 GB RAM</li><li>Metal-capable Intel or AMD graphics on Mac</li><li>600 MB available storage</li></ul></article></div><p className={styles.categoryLead}>Steam is the source for the figures above. GOG’s Windows listing currently asks for 4 GB of storage. iOS needs version 15.6 or later; set aside about 1 GB on iPhone or iPad.</p></section>
        <section className={primitives.section}><SectionTitle title="Start Playing With the Right Page" /><div className={styles.guideGrid}><Link className={styles.guideCard} href="/chapters"><span className={styles.eyebrow}>Story order</span><h3>Start Chapter One</h3><p>Follow every Chapter with codes, items and missable moments in context.</p><span>Open Chapter routes →</span></Link><Link className={styles.guideCard} href="/achievements"><span className={styles.eyebrow}>Completion route</span><h3>Track all 35 achievements</h3><p>Steam’s 35-achievement list is documented here. Console and mobile trophy sets can differ.</p><span>Open achievement checklist →</span></Link><Link className={styles.guideCard} href="/sally-face-2"><span className={styles.eyebrow}>Sequel</span><h3>Sally Face 2 status</h3><p>Announced 16 Aug 2026. Steam Early Access first, starting with Episode Six. Release date TBD.</p><span>Open Sally Face 2 →</span></Link></div></section>
        <section className={primitives.section}><SectionTitle title="Frequently Asked Questions" /><FaqList faqs={faqs} /></section>
      </div>
    </main>
  );
}
