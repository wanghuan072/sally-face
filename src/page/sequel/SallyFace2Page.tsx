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
  { question: "What is the Sally Face 2 release date?", answer: "Portable Moose lists the date as TBD on the Press Kit and Steam page. The sequel was announced on August 16, 2026. Adding it to a wishlist is not a launch window." },
  { question: "When is Sally Face 2 coming out?", answer: "There is no confirmed year, month or day. The official first step is Steam Early Access on Windows, macOS and Linux." },
  { question: "Will Early Access start with Episode Six?", answer: "Yes. Steam’s Early Access FAQ says the first drop is Sally Face 2, Episode Six — a direct continuation of the original story. Later episodes are planned one at a time under the same purchase. The full sequel episode count has not been published." },
  { question: "Is Sally Face 2 a Season Pass like the original?", answer: "No. Portable Moose is using Early Access so the sequel can stay episodic under one purchase, instead of a base game plus separate Season Pass builds." },
  { question: "How long will Sally Face 2 stay in Early Access?", answer: "No timeframe is set in stone. Steam currently quotes a hope of less than one year, with more detail closer to launch. That hope is not a confirmed window." },
  { question: "Will the price go up after Early Access?", answer: "Yes. Steam says the price is planned to be lower during Early Access and to increase afterward. No dollar amount has been published." },
  { question: "Is there a Sally Face 2 trailer?", answer: "Yes. The official teaser sits inside Portable Moose’s 10th-anniversary YouTube stream, and the Press Kit hosts the same teaser." },
  { question: "What platforms will Sally Face 2 be on?", answer: "Steam Early Access is first (Windows, macOS and Linux). The Press Kit says consoles and mobile will follow. No console SKUs or mobile store pages exist yet." },
  { question: "Who is developing Sally Face 2?", answer: "Portable Moose. Steve Gabry wrote the outline, then hired Michael Thomas (programming), Emily Zahn (backgrounds) and Katie Tealwen (character art and animation), expanding from a solo studio to a four-person team." },
  { question: "Does Sally Face 2 use AI-generated content?", answer: "No. The Press Kit, Steam page and Portable Moose press release all say the game is hand-crafted by humans, with no AI-generated content." },
];

const features = [
  "A side-scrolling, narrative-driven adventure",
  "Challenging puzzles, with a hint system if you need help",
  "Inspired by 1990s cartoons and personal nightmares",
  "Hand-crafted by humans — no AI-generated content",
];

const timeline = [
  { when: "2021–2023", detail: "Steve Gabry wrote the sequel outline while porting the original game to consoles and working on other projects." },
  { when: "2024", detail: "Pre-production on Sally Face 2 began." },
  { when: "2025", detail: "Portable Moose made its first hire, programmer Michael Thomas, then brought on artists Emily Zahn and Katie Tealwen after more than 10,000 applications." },
  { when: "2025–2026", detail: "The studio expanded from a solo operation to a four-person team focused on producing the sequel." },
  { when: "16 Aug 2026", detail: "Sally Face 2 was announced on the tenth anniversary of Episode One, with an official teaser and a Steam wishlist page. The original game also launched on iOS and Android the same day." },
  { when: "Current", detail: "Production continues. The release date is still TBD. Wishlisting on Steam is the only official next step." },
];

export default function SallyFace2Page() {
  const path = "/sally-face-2";
  const title = "Sally Face 2 — Release Status, Trailer & Confirmed Details";
  const description = "Confirmed Sally Face 2 facts from Portable Moose: announced 16 August 2026, release date TBD, Steam Early Access first with Episode Six, official teaser, platforms and the Early Access plan.";

  return (
    <main id="main-content">
      <JsonLd data={[articleSchema({ title, description, path, image: "/images/sally-face-2/sally-face-2-screenshot-3.webp" }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sally Face 2", path }]), faqSchema(faqs)]} />
      <header className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sally Face 2" }]} />
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Last reviewed September 3, 2026</p>
              <h1>Sally Face 2 <span>Release Status, Trailer & Confirmed Details</span></h1>
              <p className={styles.lead}>Sally Face 2 was announced on August 16, 2026, the tenth anniversary of Episode One. The release date is still TBD. Steam Early Access comes first, starting with Episode Six.</p>
              <AuthorByline />
              <div className={styles.heroActions}>
                <a className={`${primitives.button} ${primitives.buttonPurple}`} href={siteConfig.official.steamSequel} target="_blank" rel="noreferrer">Wishlist on Steam ↗</a>
                <a className={primitives.button} href={siteConfig.official.sequelTeaser} target="_blank" rel="noreferrer">Watch the teaser ↗</a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image src="/images/sally-face-2/sally-face-2-screenshot-3.webp" alt="Official Sally Face 2 screenshot from Portable Moose" fill loading="eager" sizes="(max-width: 768px) 100vw, 440px" />
            </div>
          </div>
        </div>
      </header>
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          <section className={styles.quickAnswer}>
            <strong>Release Status</strong>
            <p>Release date: TBD. Announced: 16 August 2026. First platform: Steam Early Access on Windows, macOS and Linux. First content: Episode Six. Later: consoles and mobile. Developer: Portable Moose.</p>
          </section>

          <section className={styles.section} id="overview">
            <h2>Sally Face 2 Overview</h2>
            <p>Portable Moose describes the sequel as a single-player, side-scrolling, narrative-driven adventure. After the climax of the original game, a group of friends try to find meaning in a world broken by darkness. The official press release asks players to guide Sal and his three friends through that setting. The teaser is only a small taste of what is coming.</p>
            <blockquote className={styles.quote}>
              “Sally Face 2 is much more ambitious than the original, pushing the boundaries on art and tech beyond what was possible with the first game. The teaser is only a small taste of what’s to come.”
              <cite>Steve Gabry, Portable Moose press release, 16 August 2026</cite>
            </blockquote>
            <ul className={styles.features}>
              {features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </section>

          <section className={styles.section} id="release">
            <h2>Sally Face 2 Release Date</h2>
            <p>The official release date is TBD on both the Press Kit and the Steam listing. Portable Moose said in the anniversary stream that a date is not ready to announce yet, and that wishlisting on Steam is the helpful next step. Any page claiming a confirmed year, month or Early Access day is speculating unless those two sources change.</p>
            <p>Steam’s Early Access FAQ also quotes a hope of staying in Early Access for less than one year. That is a hope, not a launch window, and it is not a calendar for Episode Six.</p>
          </section>

          <section className={styles.section} id="status">
            <h2>Current Development Status</h2>
            <div className={styles.timeline}>
              {timeline.map((item) => (
                <div className={styles.timelineItem} key={item.when}>
                  <strong>{item.when}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} id="trailer">
            <h2>Sally Face 2 Trailer</h2>
            <p>The official teaser sits inside Portable Moose’s 10th-anniversary YouTube stream, published the same day as the announcement. It shows a darker, broken world after the first game’s climax without giving away a full plot or a launch date. The Press Kit hosts the teaser as well.</p>
            <div className={styles.heroActions}>
              <a className={primitives.button} href={siteConfig.official.sequelTeaser} target="_blank" rel="noreferrer">Watch the anniversary stream ↗</a>
              <a className={primitives.button} href={siteConfig.official.sequelPressKit} target="_blank" rel="noreferrer">Open the Press Kit ↗</a>
            </div>
          </section>

          <section className={styles.section} id="story">
            <h2>Story, Characters & What Is Confirmed</h2>
            <p>The confirmed premise: after the haunting climax of Sally Face, the sequel continues with a group of friends struggling to find meaning in a world broken by darkness. “When everything falls apart… When even death holds no solace… What’s left to hold on to?” Steam’s Early Access FAQ adds that Episode Six is a direct continuation of the original story.</p>
            <p>Official screenshots show returning visual motifs and new character designs. Portable Moose has not published a complete cast list. Treat unofficial teaser identifications and plot recaps as speculation.</p>
          </section>

          <section className={styles.section} id="early-access">
            <h2>Early Access Plan</h2>
            <p>Steam Early Access is the first announced stage. Portable Moose wants the sequel to stay episodic under one purchase, after the original’s base game plus Season Pass created extra builds and player confusion. The plan is to launch one episode at a time and fix bugs between episodes.</p>
            <ul className={styles.features}>
              <li>The first Early Access drop is Sally Face 2, Episode Six.</li>
              <li>Later episodes are added over time; the finished game is planned to contain all sequel episodes.</li>
              <li>The price is planned to be lower during Early Access and to increase afterward. No price has been listed yet.</li>
              <li>The story and structure are set in stone. Community feedback is for difficulty and bugs, through the Steam forums.</li>
            </ul>
          </section>

          <section className={styles.section} id="gameplay">
            <h2>Platforms & System Requirements</h2>
            <p>Steam lists Windows, macOS and Linux for Early Access. Consoles and mobile are planned later; those store pages do not exist yet. Steam currently lists English for interface and subtitles, and a content warning of strong language, violence, blood and gore, which the Press Kit marks as subject to change.</p>
            <div className={styles.reqGrid}>
              <article>
                <h3>Windows</h3>
                <ul>
                  <li>Windows 10</li>
                  <li>x64 processor with SSE2</li>
                  <li>4 GB RAM</li>
                  <li>DirectX 11-capable GPU</li>
                  <li>4 GB available storage</li>
                </ul>
              </article>
              <article>
                <h3>macOS</h3>
                <ul>
                  <li>macOS X 10.8</li>
                  <li>Apple Silicon or x64 with SSE2</li>
                  <li>4 GB RAM</li>
                  <li>Metal-capable Intel or AMD GPU</li>
                  <li>4 GB available storage</li>
                </ul>
              </article>
              <article>
                <h3>Linux</h3>
                <ul>
                  <li>Ubuntu 14.04.5 LTS</li>
                  <li>2 GHz processor</li>
                  <li>4 GB RAM</li>
                  <li>4 GB available storage</li>
                </ul>
              </article>
            </div>
            <p>Figures above are Steam’s current minimums for the sequel listing. They can change before launch.</p>
          </section>

          <section className={styles.section} id="gallery">
            <h2>Official Preview Gallery</h2>
            <div className={styles.gallery}>
              {[1, 3, 5].map((number) => (
                <div className={styles.galleryItem} key={number}>
                  <Image src={`/images/sally-face-2/sally-face-2-screenshot-${number}.webp`} alt={`Official Sally Face 2 preview screenshot ${number}`} fill sizes="(max-width: 768px) 100vw, 300px" />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} id="faq">
            <h2>Questions Players Ask</h2>
            <FaqList faqs={faqs} />
          </section>
        </article>

        <aside className={styles.sidebar}>
          <section className={styles.sidePanel}>
            <h2>On This Page</h2>
            <nav>
              <a href="#overview">Overview</a>
              <a href="#release">Release date</a>
              <a href="#status">Development status</a>
              <a href="#trailer">Official teaser</a>
              <a href="#story">Story & characters</a>
              <a href="#early-access">Early Access plan</a>
              <a href="#gameplay">Platforms & specs</a>
              <a href="#gallery">Preview gallery</a>
              <a href="#faq">FAQ</a>
            </nav>
          </section>
          <section className={styles.sidePanel}>
            <h2>Quick Facts</h2>
            <p><strong>Announced:</strong> 16 Aug 2026</p>
            <p><strong>Release:</strong> TBD</p>
            <p><strong>First drop:</strong> Episode Six</p>
            <p><strong>First platform:</strong> Steam Early Access</p>
            <p><strong>Players:</strong> Single-player</p>
            <p><strong>Languages listed:</strong> English</p>
            <p><strong>Developer:</strong> Portable Moose</p>
          </section>
          <section className={styles.sidePanel}>
            <h2>Official Links</h2>
            <nav>
              <a href={siteConfig.official.steamSequel} target="_blank" rel="noreferrer">Steam wishlist ↗</a>
              <a href={siteConfig.official.sequelPressKit} target="_blank" rel="noreferrer">Sally Face 2 Press Kit ↗</a>
              <a href={siteConfig.official.sequelTeaser} target="_blank" rel="noreferrer">Anniversary teaser ↗</a>
              <a href={siteConfig.official.youtube} target="_blank" rel="noreferrer">YouTube channel ↗</a>
            </nav>
          </section>
          <section className={styles.sidePanel}>
            <h2>Catch Up</h2>
            <nav>
              <Link href="/download">Original game stores →</Link>
              <Link href="/chapters">Original five chapters →</Link>
              <Link href="/characters">Character profiles →</Link>
              <Link href="/achievements">Achievement checklist →</Link>
            </nav>
          </section>
        </aside>
      </div>
    </main>
  );
}
