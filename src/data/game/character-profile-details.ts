export type CharacterTimelineEntry = {
  chapterSlug: string;
  kind: "Playable" | "On-screen" | "Memory / vision" | "Mentioned";
  detail: string;
};

export type CharacterGuideLink = {
  href: string;
  eyebrow: string;
  title: string;
  detail: string;
};

type CharacterProfileDetails = {
  timeline: CharacterTimelineEntry[];
  guides: CharacterGuideLink[];
};

const chapter = (number: number) => `episode-${number}-${["strange-neighbors", "the-wretched", "the-bologna-incident", "the-trial", "memories-and-dreams"][number - 1]}`;

export const characterProfileDetails: Record<string, CharacterProfileDetails> = {
  "sal-fisher": {
    timeline: [1, 2, 3, 4, 5].map((number) => ({ chapterSlug: chapter(number), kind: "Playable", detail: number === 1 ? "Sal’s arrival at Addison Apartments begins the central investigation." : "Primary player viewpoint for this stage of the story." })),
    guides: [
      { href: "/characters/sal-fisher/without-mask", eyebrow: "Spoiler-aware profile", title: "Sal Fisher without the mask", detail: "Read the verified narrative context behind Sal’s prosthetic face." },
      { href: "/walkthrough/episode-1-code", eyebrow: "Chapter One", title: "Dream code and Gear Boy route", detail: "Follow the 5364 route that introduces Sal’s key investigation tool." },
    ],
  },
  "larry-johnson": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "Sal’s first ally in Addison Apartments and partner in the Mansfield investigation." },
      { chapterSlug: chapter(2), kind: "On-screen", detail: "Leads the investigation into his family history and the building’s curse." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "Part of the school investigation with Sal, Ash, and Todd." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Central to the final Addison Apartments investigation." },
      { chapterSlug: chapter(5), kind: "Playable", detail: "Appears in the final chapter’s supernatural sequence." },
    ],
    guides: [
      { href: "/chapters/episode-1-strange-neighbors", eyebrow: "Chapter One", title: "Meet Larry and investigate 403", detail: "The chapter route tracks the conversations and evidence that establish Larry’s role." },
      { href: "/chapters/episode-2-the-wretched", eyebrow: "Chapter Two", title: "Larry’s family mystery", detail: "Follow the puzzle-box and Super Gear Boy investigation in context." },
    ],
  },
  "ashley-campbell": {
    timeline: [
      { chapterSlug: chapter(2), kind: "On-screen", detail: "First meets Sal during the Super Gear Boy investigation." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "Joins the Nockfell High investigation as a core member of the group." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Helps pursue the evidence behind Sal’s account." },
      { chapterSlug: chapter(5), kind: "Playable", detail: "Carries major sections of the final resistance route." },
    ],
    guides: [
      { href: "/walkthrough/episode-3-code", eyebrow: "Chapter Three", title: "School investigation codes", detail: "Use the school puzzle guide alongside Ash’s bologna investigation." },
      { href: "/chapters/episode-5-memories-and-dreams", eyebrow: "Chapter Five", title: "Final resistance route", detail: "See Ash’s playable role in the final chapter walkthrough." },
    ],
  },
  "travis-phelps": {
    timeline: [
      { chapterSlug: chapter(3), kind: "On-screen", detail: "A private school-bathroom conversation reveals the pressure behind his public hostility." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "His family’s connection to the wider conflict gains narrative weight." },
      { chapterSlug: chapter(5), kind: "On-screen", detail: "Appears in the final confrontation with the cult." },
    ],
    guides: [
      { href: "/walkthrough/episode-3-code", eyebrow: "Chapter Three", title: "Atonement dialogue route", detail: "Use the 3–2–3–2 answer order during Travis’s optional conversation." },
      { href: "/chapters/episode-3-the-bologna-incident", eyebrow: "Chapter Three", title: "Nockfell High investigation", detail: "Read the surrounding school route before following the optional dialogue." },
    ],
  },
  "todd-morrison": {
    timeline: [
      { chapterSlug: chapter(2), kind: "On-screen", detail: "First appears while helping modify the Gear Boy into the Super Gear Boy." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "Analyzes evidence from the school investigation." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Supports the group’s final preparation and research." },
      { chapterSlug: chapter(5), kind: "On-screen", detail: "His research and condition remain central to the final plan." },
    ],
    guides: [
      { href: "/chapters/episode-2-the-wretched", eyebrow: "Chapter Two", title: "Super Gear Boy upgrade", detail: "Follow the route that introduces Todd’s technical role." },
      { href: "/walkthrough/chapter-4-gear-boy", eyebrow: "Related guide", title: "Gear Boy checklist", detail: "Track the device, batteries, and optional supernatural chapters." },
    ],
  },
  "henry-fisher": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "Moves into room 402 with Sal and Gizmo." },
      { chapterSlug: chapter(2), kind: "On-screen", detail: "Remains part of the Fisher home scenes." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "His computer contains a family-history clue." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Appears in the story’s later family context." },
      { chapterSlug: chapter(5), kind: "Memory / vision", detail: "Returns through the final chapter’s memory-focused material." },
    ],
    guides: [
      { href: "/walkthrough/episode-3-code", eyebrow: "Chapter Three", title: "Henry’s computer password", detail: "The DIANE alphabet-position code is 491145." },
      { href: "/characters/sal-fisher/without-mask", eyebrow: "Family context", title: "Sal’s mask and childhood history", detail: "Read the spoiler-aware guide for the Fisher family context." },
    ],
  },
  "lisa-johnson": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "Caretaker of Addison Apartments and Larry’s mother." },
      { chapterSlug: chapter(2), kind: "On-screen", detail: "Provides family context as the building mystery expands." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "Remains part of the group’s Addison Apartments storyline." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Appears in the later family and apartment context." },
      { chapterSlug: chapter(5), kind: "Mentioned", detail: "Referenced in the final chapter’s later-story material rather than given a full active scene." },
    ],
    guides: [
      { href: "/chapters/episode-1-strange-neighbors", eyebrow: "Chapter One", title: "Basement access and A Dark Secret", detail: "Lisa’s dialogue opens an important early route." },
      { href: "/chapters/episode-2-the-wretched", eyebrow: "Chapter Two", title: "Johnson family context", detail: "Follow the chapter’s investigation of Larry’s family history." },
    ],
  },
  "megan-holmes": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "A ghost encounter confirms that Sal’s supernatural experiences are real." },
      { chapterSlug: chapter(2), kind: "On-screen", detail: "Her family history becomes part of the building investigation." },
      { chapterSlug: chapter(3), kind: "Mentioned", detail: "Her story remains part of the broader investigation and journal material." },
    ],
    guides: [
      { href: "/walkthrough/chapter-4-gear-boy", eyebrow: "Related guide", title: "Gear Boy supernatural route", detail: "Use the device checklist to locate optional spirit content." },
      { href: "/chapters/episode-2-the-wretched", eyebrow: "Chapter Two", title: "Holmes family investigation", detail: "The chapter adds context to Megan’s connection with the apartments." },
    ],
  },
  "charley-mansfield": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "The central suspect in the Sanderson murder investigation." },
      { chapterSlug: chapter(2), kind: "Memory / vision", detail: "Returns through the chapter’s nightmare and aftermath material." },
    ],
    guides: [
      { href: "/chapters/episode-1-strange-neighbors", eyebrow: "Chapter One", title: "Charley’s tea and evidence route", detail: "Compare the two tea outcomes and recover the decisive evidence." },
      { href: "/achievements#episode-1-achievements", eyebrow: "Achievements", title: "Alternate tea outcomes", detail: "Go to Sleep and Irritable Bowels require separate outcomes." },
    ],
  },
  gizmo: {
    timeline: [1, 2, 3, 4].map((number) => ({ chapterSlug: chapter(number), kind: "On-screen" as const, detail: "Appears in the Fisher home across the apartment-era chapters." })).concat({ chapterSlug: chapter(5), kind: "On-screen", detail: "Returns in the final chapter’s story material." }),
    guides: [
      { href: "/chapters/episode-1-strange-neighbors", eyebrow: "Chapter One", title: "The Fisher home in room 402", detail: "Begin with Sal, Henry, and Gizmo’s move to Addison Apartments." },
      { href: "/characters/sal-fisher", eyebrow: "Related profile", title: "Sal Fisher", detail: "Read the main character profile for Gizmo’s place in the Fisher household." },
    ],
  },
};

export function getCharacterProfileDetails(slug: string): CharacterProfileDetails {
  return characterProfileDetails[slug] ?? { timeline: [], guides: [] };
}
