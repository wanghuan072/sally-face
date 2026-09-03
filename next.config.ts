import type { NextConfig } from "next";
import { CHAPTER_SLUGS } from "./src/lib/data/chapter-slugs";

const chapterRedirects = CHAPTER_SLUGS.flatMap((chapterSlug) => {
  const episodeSlug = chapterSlug.replace(/^chapter-/, "episode-");
  return [
    { source: `/episodes/${episodeSlug}`, destination: `/chapters/${chapterSlug}`, permanent: true },
    { source: `/episodes/${chapterSlug}`, destination: `/chapters/${chapterSlug}`, permanent: true },
    { source: `/chapters/${episodeSlug}`, destination: `/chapters/${chapterSlug}`, permanent: true },
  ];
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sources", destination: "/legal/about-us", permanent: true },
      { source: "/characters/sal-fisher/without-mask", destination: "/characters/sal-fisher#mask", permanent: true },
      { source: "/episodes", destination: "/chapters", permanent: true },
      ...chapterRedirects,
    ];
  },
};

export default nextConfig;
