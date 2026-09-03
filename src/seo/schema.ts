import type { Character, Faq } from "@/types/game";
import { siteConfig } from "@/config/site";

export function authorUrl() {
  return new URL(siteConfig.author.path, siteConfig.url).toString();
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    description: siteConfig.author.bio,
    url: authorUrl(),
    email: siteConfig.email,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    editor: { "@type": "Person", name: siteConfig.author.name, url: authorUrl() },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    author: { "@type": "Person", name: siteConfig.author.name, url: authorUrl() },
  };
}

export function collectionSchema(name: string, description: string, path: string, items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "CollectionPage", name, description, url: new URL(path, siteConfig.url).toString(), author: { "@type": "Person", name: siteConfig.author.name, url: authorUrl() }, mainEntity: { "@type": "ItemList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: new URL(item.path, siteConfig.url).toString() })) } };
}

export function articleSchema(input: { title: string; description: string; path: string; image: string; datePublished?: string; dateModified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: new URL(input.image, siteConfig.url).toString(),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? siteConfig.contentUpdated,
    author: { "@type": "Person", name: siteConfig.author.name, url: authorUrl() },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: new URL(input.path, siteConfig.url).toString(),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function characterPersonSchema(character: Character) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: character.name,
    alternateName: character.alias !== character.name ? character.alias : undefined,
    description: character.playerNote,
    image: new URL(character.image, siteConfig.url).toString(),
    url: new URL(`/characters/${character.slug}`, siteConfig.url).toString(),
    knowsAbout: character.chapters.map((slug) => {
      const number = slug.match(/chapter-(\d)/)?.[1];
      return {
        "@type": "CreativeWork",
        name: number ? `Sally Face Chapter ${number}` : slug,
        url: new URL(`/chapters/${slug}`, siteConfig.url).toString(),
      };
    }),
    knows: character.relationships.map((relationship) => ({
      "@type": "Person",
      name: relationship.name,
      url: new URL(`/characters/${relationship.slug}`, siteConfig.url).toString(),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
