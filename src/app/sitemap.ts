import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { episodes, getChapterSlug } from "@/lib/data/episodes";
import { characters } from "@/lib/data/characters";
import { guides } from "@/lib/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = siteConfig.contentUpdated;
  const fixedPaths = [
    { path: "", lastModified: updated, priority: 1 },
    { path: "/chapters", lastModified: updated, priority: 0.9 },
    { path: "/guides", lastModified: updated, priority: 0.9 },
    { path: "/characters", lastModified: updated, priority: 0.9 },
    { path: "/achievements", lastModified: updated, priority: 0.9 },
    { path: "/download", lastModified: updated, priority: 0.9 },
    { path: "/download/android", lastModified: updated, priority: 0.75 },
    { path: "/sally-face-2", lastModified: updated, priority: 0.8 },
    { path: "/legal/privacy-policy", lastModified: updated, priority: 0.3 },
    { path: "/legal/terms-of-service", lastModified: updated, priority: 0.3 },
    { path: "/legal/copyright", lastModified: updated, priority: 0.3 },
    { path: "/legal/about-us", lastModified: updated, priority: 0.3 },
    { path: "/legal/contact-us", lastModified: updated, priority: 0.3 },
  ];
  const dynamicPaths = [
    ...episodes.map((episode) => ({ path: `/chapters/${getChapterSlug(episode)}`, lastModified: updated, priority: 0.75 })),
    ...characters.map((character) => ({ path: `/characters/${character.slug}`, lastModified: updated, priority: 0.7 })),
    ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, lastModified: updated, priority: 0.75 })),
  ];
  return [...fixedPaths, ...dynamicPaths].map(({ path, lastModified, priority }) => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
