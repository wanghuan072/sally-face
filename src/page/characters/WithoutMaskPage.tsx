import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { JsonLd } from "@/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import styles from "@/style/page/characters/character-detail.module.css";

const faqs = [
  { question: "What does Sally Face look like without his mask?", answer: "Sal has extensive facial scarring and damage from the childhood attack shown through late-game memories. The game uses brief, emotionally framed reveals rather than treating his face as a spectacle." },
  { question: "Why does Sally Face wear a mask?", answer: "The white prosthetic replaces and protects damaged parts of Sal's face after a traumatic childhood incident." },
  { question: "When is Sal's face revealed?", answer: "The clearest context arrives in late-game memories, especially Episode Five. Earlier episodes show partial glimpses and visual clues." },
  { question: "Is Sally Face based on a real person?", answer: "No. Sal Fisher is a fictional character created by Steve Gabry for Sally Face." },
];

export default function WithoutMaskPage() {
  const path = "/characters/sal-fisher/without-mask";
  const title = "Sally Face Without His Mask – Sal Fisher's Face Explained";
  const description = "Spoiler-aware guide to Sal Fisher's face, prosthetic mask, childhood injury and the episodes that reveal what happened.";

  return (
    <main id="main-content">
      <JsonLd data={[
        articleSchema({ title, description, path, image: "/images/characters/sal-fisher-official.webp" }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Characters", path: "/characters" }, { name: "Sal Fisher", path: "/characters/sal-fisher" }, { name: "Without Mask", path }]),
        faqSchema(faqs),
      ]} />
      <header className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Characters", href: "/characters" }, { label: "Sal Fisher", href: "/characters/sal-fisher" }, { label: "Without Mask" }]} />
          <div className={styles.heroGrid}>
            <div className={styles.portrait}><Image src="/images/characters/sal-fisher-official.webp" alt="Official close-up of Sal Fisher's prosthetic mask" fill loading="eager" sizes="(max-width: 768px) 100vw, 360px" /></div>
            <div><p className={styles.eyebrow}>Spoiler-aware character guide</p><h1>Sal Fisher Without His Mask</h1><p className={styles.lead}>Sal's prosthetic face is central to his identity, trauma and empathy. This guide explains what the game reveals without using graphic imagery as clickbait.</p><p className={styles.warning}>Major story spoilers begin below. Play through Chapter Five first if you want the reveal in its intended order.</p></div>
          </div>
        </div>
      </header>
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          <section className={styles.section} id="look"><h2>What Does Sally Face Look Like Without His Mask?</h2><p>Sal has severe scarring and facial damage, including the loss of part of his lower face. The game presents the reveal through memory, shadow, and stylized viewpoints. The important detail is not a precise anatomy chart—it is how Sal lives with other people's curiosity while refusing to let the injury define his character.</p></section>
          <section className={styles.section} id="why"><h2>Why Does Sally Face Wear a Mask?</h2><p>The white face is a prosthetic device, not a costume. It protects damaged areas and gives Sal a stable everyday appearance after reconstructive treatment. Straps and hinged sections visible in official art make its practical construction clear.</p><div className={styles.revealImage}><Image src="/images/characters/sal-fisher-canonical.webp" alt="Canonical in-game sprite of Sal Fisher wearing his pale prosthetic face" fill sizes="(max-width: 768px) 100vw, 800px" /></div></section>
          <section className={styles.section} id="happened"><h2>What Happened to Sal Fisher's Face?</h2><p>Late-game memories reveal that the childhood incident involved Kenneth Phelps, a shotgun, and the supernatural influence surrounding the cult. Diane Fisher dies during the attack, and Sal survives with life-changing injuries. Episode One's DOG dream and Episode Five's color-piece route connect the fragmented memories.</p></section>
          <section className={styles.section} id="revealed"><h2>When Is Sal's Face Revealed?</h2><p>Partial views appear earlier, but Chapter Five gives the clearest narrative explanation. Completing the DOG route by collecting the color pieces and opening room five in the void provides the central memory sequence.</p></section>
          <section className={styles.section} id="mask"><h2>Sally Face Mask Explained</h2><p>The prosthetic is pale with dark eye openings, a mauve-toned left section, visible side hardware, and straps around the head. Sal wears it consistently, although the shape and detail vary slightly with age, animation style and memory sequence.</p></section>
          <section className={styles.section} id="episodes"><h2>Sal Fisher's Face Throughout the Chapters</h2><p><Link href="/chapters/episode-1-strange-neighbors">Chapter One</Link> establishes the prosthetic and dream clues. <Link href="/chapters/episode-4-the-trial">Chapter Four</Link> places Sal's appearance under public scrutiny during the trial. <Link href="/chapters/episode-5-memories-and-dreams">Chapter Five</Link> connects the childhood attack, Diane's death and the DOG memory.</p></section>
          <section className={styles.section} id="real"><h2>Is Sally Face Based on a Real Person?</h2><p>No. Sal Fisher is fictional. Portable Moose describes the wider game as inspired by life, depression, nightmares and 1990s cartoons, but Sal is not presented as a portrait of a specific real person.</p></section>
          <section className={styles.section} id="faq"><h2>Frequently Asked Questions</h2><FaqList faqs={faqs} /></section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidePanel}><h2>On This Page</h2><nav><a href="#look">What does Sal look like?</a><a href="#why">Why the mask?</a><a href="#happened">What happened?</a><a href="#revealed">When is it revealed?</a><a href="#mask">Mask explained</a><a href="#episodes">Across the episodes</a><a href="#real">Based on a real person?</a><a href="#faq">FAQ</a></nav></section>
          <section className={styles.sidePanel}><h2>Related Pages</h2><nav><Link href="/characters/sal-fisher">Sal Fisher profile →</Link><Link href="/chapters/episode-1-strange-neighbors#puzzles">Chapter 1 DOG code →</Link><Link href="/chapters/episode-5-memories-and-dreams">Chapter 5 route →</Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
