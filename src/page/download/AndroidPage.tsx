import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AuthorByline } from "@/components/common/AuthorByline";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import primitives from "@/style/common/primitives.module.css";
import styles from "@/style/page/content/article.module.css";

const faqs = [
  { question: "Is Sally Face available on Android?", answer: "Yes. The official Google Play version released on August 16, 2026 and includes all five chapters." },
  { question: "Is there an official standalone Sally Face APK?", answer: "Portable Moose links to Google Play rather than a separate downloadable APK file. The package name is com.portablemoose.sallyface." },
  { question: "Is Sally Face APK free?", answer: "No. Sally Face is a paid game. Claims of a free cracked APK are not official." },
  { question: "Does the Android version include every Chapter?", answer: "Yes. The mobile edition launched with the complete five-chapter story, not Episode One alone." },
  { question: "Is it safe to download a Sally Face APK from another site?", answer: "Third-party APK files can be modified or malicious. Use the official Google Play listing linked by Portable Moose." },
];

export default function AndroidPage() {
  const path = "/download/android";
  const title = "Sally Face APK – Android & Mobile Download Guide";
  const description = "Official Sally Face Android download guide with Google Play link, APK safety, mobile release status and common questions.";
  return (
    <main id="main-content">
      <JsonLd data={[articleSchema({ title, description, path, image: "/images/scenes/steam-00.webp" }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Download", path: "/download" }, { name: "Android", path }]), faqSchema(faqs)]} />
      <header className={styles.hero}><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Download", href: "/download" }, { label: "Android & APK" }]} /><div className={styles.heroGrid}><div><p className={styles.eyebrow}>Official mobile download guide</p><h1>Sally Face APK <span>Android & Mobile Download Guide</span></h1><p className={styles.lead}>Sally Face is officially available on Android. Use Google Play for the authentic mobile edition and avoid altered packages that promise a free or cracked copy.</p><AuthorByline /><a className={`${primitives.button} ${primitives.buttonPrimary}`} href={siteConfig.official.android} target="_blank" rel="noreferrer">Open official Google Play page ↗</a></div><div className={styles.heroImage}><Image src="/images/scenes/steam-00.webp" alt="Official Sally Face close-up used for the Android download guide" fill loading="eager" sizes="(max-width: 768px) 100vw, 420px" /></div></div></div></header>
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          <section className={styles.quickAnswer}><strong>Quick Answer</strong><p>The official Sally Face Android version launched August 16, 2026 and includes all five chapters. Download it through Google Play. There is no separate official APK file promoted by Portable Moose.</p></section>
          <section className={styles.section} id="available"><h2>Is Sally Face Available on Android?</h2><p>Yes. Portable Moose released Sally Face on iOS and Android on August 16, 2026 as part of the Episode One tenth-anniversary celebration. The Android listing is published by Portable Moose LLC and uses the package name <code>com.portablemoose.sallyface</code>. The matching iPhone and iPad app requires iOS or iPadOS 15.6 or later.</p></section>
          <section className={styles.section} id="download"><h2>How to Download Sally Face on Android</h2><div className={styles.steps}><section className={styles.step}><h3>Open the Google Play listing</h3><p>Use the Google Play link on this page. The official listing includes all five chapters.</p></section><section className={styles.step}><h3>Check the publisher</h3><p>Confirm that the listing identifies Portable Moose LLC and uses the package name <code>com.portablemoose.sallyface</code>.</p></section><section className={styles.step}><h3>Buy and install</h3><p>Complete the purchase through Google Play, then let the store handle installation and future updates. Do not sideload an APK from another site.</p></section></div></section>
          <section className={styles.section} id="apk"><h2>Sally Face APK vs Google Play</h2><p>APK is the package format used by Android apps, but users normally do not need to download that file manually. Google Play verifies delivery, manages compatible builds and supplies updates. A file uploaded to an unrelated download site may have been modified after leaving the developer.</p></section>
          <section className={styles.section} id="free"><h2>Is Sally Face APK Free?</h2><p>No. Sally Face is a commercial game. Search results advertising a free unlocked or modded APK are not official and may violate the developer's rights or expose your device to malware.</p></section>
          <section className={styles.section} id="safety"><h2>APK Safety Checklist</h2><ul className={styles.mistakes}><li>Prefer the Google Play listing linked by Portable Moose.</li><li>Do not disable Play Protect to install an unknown package.</li><li>Do not enter account credentials into a third-party installer.</li><li>Avoid packages promising unlimited content or a cracked purchase.</li></ul></section>
          <section className={styles.section} id="faq"><h2>Frequently Asked Questions</h2><FaqList faqs={faqs} /></section>
        </article>
        <aside className={styles.sidebar}><section className={styles.sidePanel}><h2>On This Page</h2><nav><a href="#available">Android availability</a><a href="#download">How to download</a><a href="#apk">APK vs Google Play</a><a href="#free">Is it free?</a><a href="#safety">Safety checklist</a><a href="#faq">FAQ</a></nav></section><section className={styles.sidePanel}><h2>Other Platforms</h2><nav><Link href="/download">All official downloads →</Link><a href={siteConfig.official.ios} target="_blank" rel="noreferrer">iPhone & iPad ↗</a><a href={siteConfig.official.steam} target="_blank" rel="noreferrer">PC / Steam ↗</a></nav></section></aside>
      </div>
    </main>
  );
}
