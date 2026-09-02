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
  { label: "PC / Steam", note: "Windows, macOS and Linux", detail: "The complete five-episode game with Steam achievements and controller support.", href: siteConfig.official.steam },
  { label: "Android / Google Play", note: "Official mobile release", detail: "Portable Moose's official Android edition launched August 16, 2026.", href: siteConfig.official.android },
  { label: "iPhone & iPad", note: "Official App Store release", detail: "The native iOS edition launched with the tenth-anniversary mobile release.", href: siteConfig.official.ios },
  { label: "PlayStation", note: "Official console edition", detail: "Buy from PlayStation Store; released alongside the Xbox edition in 2022.", href: siteConfig.official.playstation },
  { label: "Xbox", note: "Official console edition", detail: "Available through the Xbox store for compatible consoles.", href: siteConfig.official.xbox },
  { label: "Nintendo Switch", note: "Portable console edition", detail: "The first console port, suitable for handheld or docked play.", href: siteConfig.official.switch },
];

const faqs = [
  { question: "Is Sally Face free?", answer: "No. The complete game is paid software. Store prices and discounts vary; use an official storefront." },
  { question: "Can I download Sally Face on Android?", answer: "Yes. An official Android version is available from Google Play as of August 16, 2026." },
  { question: "Is there a Sally Face APK?", answer: "Google Play installs an Android application package internally, but Portable Moose does not offer a separate official APK download on the Press Kit. Avoid third-party cracked packages." },
  { question: "Does Sally Face run on Mac or Linux?", answer: "The official Press Kit lists Windows, Mac and Linux support for the PC edition." },
];

export default function DownloadPage() {
  return (
    <main id="main-content">
      <JsonLd data={faqSchema(faqs)} />
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/characters/sal-fisher-official.webp" alt="Official close-up of Sal Fisher for the download platform guide" fill loading="eager" sizes="100vw" />
        <div className={`container ${styles.heroInner}`}><div><h1>Sally Face Download — <span>Official PC, Mobile & Console Links</span></h1><p>Choose the version you play on and go straight to its official store page. Looking for a Sally Face APK? The official Android edition is delivered through Google Play.</p><div className={styles.heroActions}><a className={`${primitives.button} ${primitives.buttonPrimary}`} href={siteConfig.official.steam} target="_blank" rel="noreferrer">Open Steam ↗</a><Link className={primitives.button} href="/download/android">Android & APK guide →</Link></div></div><aside className={styles.heroMeta} aria-label="Download guide highlights"><div><strong>6</strong><span>Storefronts</span></div><div><strong>PC</strong><span>Windows, Mac & Linux</span></div><div><strong>APK</strong><span>Android on Google Play</span></div></aside></div>
      </section>
      <div className={`container ${styles.content}`}>
        <section className={styles.notice}><strong>About APK searches:</strong> This site links to official storefronts only. It does not host game files, cracked releases or standalone APK packages.</section>
        <section className={primitives.section}><SectionTitle title="Official Download Links for Every Platform" /><div className={styles.platformGrid}>{platforms.map((platform) => <article className={styles.platformCard} key={platform.label}><span className={styles.eyebrow}>{platform.note}</span><h3>{platform.label}</h3><p>{platform.detail}</p><a href={platform.href} target="_blank" rel="noreferrer">Official store →</a></article>)}</div></section>
        <section className={primitives.section}><SectionTitle title="Sally Face System Requirements" /><div className={styles.requirements}><article className={styles.requirement}><h3>Windows minimum</h3><ul><li>Windows 10</li><li>x64 processor with SSE2 support</li><li>4 GB RAM</li><li>DirectX 11-capable graphics</li><li>600 MB available storage</li></ul></article><article className={styles.requirement}><h3>Mac & Linux minimum</h3><ul><li>macOS X 10.8, or Ubuntu 14.04.5 LTS</li><li>Apple Silicon / x64 SSE2 on Mac; 2 GHz on Linux</li><li>4 GB RAM</li><li>Metal-capable graphics on Mac</li><li>600 MB available storage</li></ul></article></div></section>
        <section className={primitives.section}><SectionTitle title="Start Playing With the Right Page" /><div className={styles.guideGrid}><Link className={styles.guideCard} href="/chapters"><span className={styles.eyebrow}>Story order</span><h3>Start Chapter One</h3><p>Follow every Chapter with codes, items and missable moments in context.</p><span>Open Chapter routes →</span></Link><Link className={styles.guideCard} href="/achievements"><span className={styles.eyebrow}>Completion route</span><h3>Track all 35 achievements</h3><p>Use the checklist before beginning a Chapter replay.</p><span>Open achievement checklist →</span></Link><Link className={styles.guideCard} href="/characters"><span className={styles.eyebrow}>Character profiles</span><h3>Meet the characters</h3><p>Read character profiles and connect their appearances to the Chapters where they matter.</p><span>Open character profiles →</span></Link></div></section>
        <section className={primitives.section}><SectionTitle title="Frequently Asked Questions" /><FaqList faqs={faqs} /></section>
      </div>
    </main>
  );
}
