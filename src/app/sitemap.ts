import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { episodes } from "@/lib/data/episodes";
import { characters } from "@/lib/data/characters";
import { guides } from "@/lib/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedPaths = [
    { path: "", lastModified: "2026-09-01", priority: 1 },
    { path: "/chapters", lastModified: "2026-09-02", priority: 0.9 }, { path: "/guides", lastModified: "2026-09-02", priority: 0.9 },
    { path: "/characters", lastModified: "2026-09-02", priority: 0.9 }, { path: "/achievements", lastModified: "2026-09-02", priority: 0.9 },
    { path: "/download", lastModified: "2026-09-02", priority: 0.9 }, { path: "/download/android", lastModified: "2026-09-01", priority: 0.75 },
    { path: "/sally-face-2", lastModified: "2026-09-02", priority: 0.8 },
    { path: "/characters/sal-fisher/without-mask", lastModified: "2026-09-01", priority: 0.75 },
    { path: "/legal/privacy-policy", lastModified: "2026-09-01", priority: 0.3 }, { path: "/legal/terms-of-service", lastModified: "2026-09-01", priority: 0.3 },
    { path: "/legal/copyright", lastModified: "2026-09-01", priority: 0.3 }, { path: "/legal/about-us", lastModified: "2026-09-01", priority: 0.3 },
    { path: "/legal/contact-us", lastModified: "2026-09-01", priority: 0.3 },
  ];
  const dynamicPaths = [
    ...episodes.map((episode) => ({ path: `/chapters/${episode.slug}`, lastModified: "2026-09-02", priority: 0.75 })),
    ...characters.map((character) => ({ path: `/characters/${character.slug}`, lastModified: "2026-09-02", priority: 0.7 })),
    ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, lastModified: "2026-09-02", priority: 0.75 })),
  ];
  return [...fixedPaths, ...dynamicPaths].map(({ path, lastModified, priority }) => ({ url: new URL(path || "/", siteConfig.url).toString(), lastModified, changeFrequency: path === "" ? "weekly" : "monthly", priority }));
}
