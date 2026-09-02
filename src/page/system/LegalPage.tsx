import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site";
import styles from "@/style/page/system/system.module.css";

type LegalSection = { heading: string; body: string[] };

const pages: Record<string, { title: string; intro: string; sections: LegalSection[] }> = {
  "privacy-policy": { title: "Privacy Policy", intro: "This policy explains the limited information handled when you visit Sally Face Guide, an independent fan site.", sections: [
    { heading: "Information we receive", body: ["This site does not ask visitors to create accounts, submit comments, or provide payment details. Standard server logs may record technical details such as an IP address, browser type, pages requested and approximate visit time. These records are used only to keep the site reliable and understand broad traffic patterns.", "If you write to the contact email, your email address and the details you choose to include are used only to read and respond to that message."] },
    { heading: "Cookies and third parties", body: ["The site may use essential technical storage needed for normal delivery. Links to official stores, game developers and social platforms lead to services with their own privacy policies. We do not control how those services collect or use information after you leave this site."] },
    { heading: "Your choices", body: ["You can disable or clear cookies through your browser settings. For a question about a message you sent us or this policy, contact us at wyong@sallyface.org."] },
  ] },
  "terms-of-service": { title: "Terms of Service", intro: "These terms describe the reasonable use of Sally Face Guide and its player-focused content.", sections: [
    { heading: "Using the site", body: ["You may read, share links to and use this site for personal, non-commercial game-reference purposes. Do not interfere with the site, attempt to bypass its security, automate disruptive requests, or present the site as an official Portable Moose service."] },
    { heading: "Guide content", body: ["Routes, puzzle notes and gameplay explanations are provided for general reference. Game versions, storefront availability and player experience can change. Check the official game or store page before making a purchase or relying on time-sensitive information."] },
    { heading: "External links and liability", body: ["External links are included for convenience. We do not control third-party content, availability or policies. To the extent permitted by law, this fan site is provided as-is without warranties about uninterrupted availability or complete accuracy."] },
  ] },
  copyright: { title: "Copyright Notice", intro: "Sally Face Guide respects the rights of Portable Moose and other rights holders.", sections: [
    { heading: "Game rights", body: ["Sally Face, related names, characters, screenshots and official artwork belong to their respective owners, including Portable Moose where applicable. Their appearance here is for commentary, identification and player-reference purposes. This site is not affiliated with, endorsed by or sponsored by Portable Moose."] },
    { heading: "Site content", body: ["Original written guides, page design and original site assets on this website are protected by applicable copyright law. You may quote short excerpts with clear attribution and a link back to the relevant page. Do not reproduce substantial portions of the site as your own work."] },
    { heading: "Copyright concerns", body: ["If you own rights to material on this site and believe its use is inappropriate, email wyong@sallyface.org with the page URL, a description of the material and your contact details. We will review good-faith notices promptly."] },
  ] },
  "about-us": { title: "About Us", intro: "Sally Face Guide is an independent fan-made site built for players who want clear routes without losing the story context.", sections: [
    { heading: "What we cover", body: ["The site brings together Chapter routes, character profiles, achievement conditions, puzzle explanations and links to official stores. It is designed for first-time players who need a nudge and returning players cleaning up a specific missed objective."] },
    { heading: "How we approach updates", body: ["We aim to keep gameplay details practical and distinguish fan-guide commentary from official announcements. When a release, platform or game detail changes, the relevant page is updated rather than silently presenting an old claim as current."] },
    { heading: "Independent fan status", body: ["This is a fan project. It does not represent Portable Moose, sell the game, distribute game files or provide official support for Sally Face."] },
  ] },
  "contact-us": { title: "Contact Us", intro: "For corrections, copyright questions, broken links or site feedback, contact Sally Face Guide by email.", sections: [
    { heading: "Email", body: ["Write to wyong@sallyface.org. Please include the page URL when reporting an incorrect walkthrough step, unavailable store link or other site issue so it can be checked in context."] },
    { heading: "What to expect", body: ["Messages are reviewed by the fan-site team. We cannot provide official game support, account recovery, refunds, technical support for store purchases or help with unofficial game files. For those matters, use the appropriate official store or developer support channel."] },
    { heading: "Copyright requests", body: ["For a copyright request, include the work you represent, the precise page URL and a way to contact you. See the Copyright Notice for additional details."] },
  ] },
};

export default function LegalPage({ slug }: { slug: string }) {
  const page = pages[slug];
  return <main id="main-content"><header className={styles.sourcesHero}><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: page.title }]} /><p className={styles.sourcesEyebrow}>Sally Face Guide · Legal</p><h1>{page.title}</h1><p>{page.intro}</p></div></header><article className={`container ${styles.sourcesContent}`}>{page.sections.map((section) => <section key={section.heading} className={styles.correctionNote}><h2>{section.heading}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<section className={styles.correctionNote}><p>Questions? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p><p><Link href="/legal/privacy-policy">Privacy Policy</Link> · <Link href="/legal/terms-of-service">Terms of Service</Link> · <Link href="/legal/copyright">Copyright</Link></p></section></article></main>;
}
