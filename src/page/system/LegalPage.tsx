import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqList } from "@/components/common/FaqList";
import { legalPages } from "@/data/legal/pages";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { faqSchema } from "@/seo/schema";
import styles from "@/style/page/system/system.module.css";

function anchorId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function LegalPage({ slug }: { slug: string }) {
  const page = legalPages[slug];
  if (!page) notFound();
  const effective = formatDate(siteConfig.contentUpdated);

  return (
    <main id="main-content">
      {page.faqs?.length ? <JsonLd data={faqSchema(page.faqs)} /> : null}
      <header className={styles.sourcesHero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: page.title }]} />
          <p className={styles.sourcesEyebrow}>Sally Face Guide · Legal</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <dl className={styles.legalFacts}>
            {page.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.legalUpdated}>Effective {effective} · {page.sections.length} sections{page.faqs?.length ? ` · ${page.faqs.length} questions` : ""}</p>
        </div>
      </header>
      <article className={`container ${styles.legalLayout}`}>
        <nav className={styles.legalToc} aria-label={`${page.title} sections`}>
          <p>In this document</p>
          <ol>
            {page.sections.map((section, index) => (
              <li key={section.heading}>
                <a href={`#${anchorId(section.heading)}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </a>
              </li>
            ))}
            {page.faqs?.length ? (
              <li>
                <a href="#questions">
                  <span>{String(page.sections.length + 1).padStart(2, "0")}</span>
                  Questions about this page
                </a>
              </li>
            ) : null}
          </ol>
        </nav>
        <div className={styles.legalBody}>
          {page.sections.map((section) => (
            <section id={anchorId(section.heading)} key={section.heading} className={styles.legalSection}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list ? (
                <div className={styles.legalList}>
                  {section.list.title ? <p className={styles.legalListTitle}>{section.list.title}</p> : null}
                  <ul>{section.list.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ) : null}
              {section.examples ? (
                <div className={styles.legalExamples}>
                  {section.examples.map((example) => (
                    <article key={example.label}>
                      <h3>{example.label}</h3>
                      <p>{example.detail}</p>
                    </article>
                  ))}
                </div>
              ) : null}
              {section.note ? (
                <aside className={styles.legalNote}>
                  <p className={styles.legalNoteLabel}>{section.note.label}</p>
                  <p>{section.note.text}</p>
                </aside>
              ) : null}
            </section>
          ))}
          {page.faqs?.length ? (
            <section className={styles.legalSection} id="questions">
              <h2>Questions about this page</h2>
              <FaqList faqs={page.faqs} />
            </section>
          ) : null}
          <section className={styles.legalClose}>
            <p>Questions that still need a person: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
            <div className={styles.legalRelated}>
              {page.related.map((item) => (
                <Link href={item.href} key={item.href}>
                  <span>{item.label}</span>
                  <p>{item.blurb}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
