import { chapterSlugFor } from "@/lib/data/chapter-slugs";

export type CharacterTimelineEntry = {
  chapterSlug: string;
  kind: "Playable" | "On-screen" | "Memory / vision" | "Mentioned";
  detail: string;
};

export type CharacterPlayerNote = {
  href: string;
  eyebrow: string;
  title: string;
  detail: string;
};

export type CharacterChapterInfluence = {
  chapterSlug: string;
  impact: string;
  ifMissed: string;
  /** True when this person locks an achievement, tool, or later code if skipped. */
  missable?: boolean;
};

type CharacterProfileDetails = {
  timeline: CharacterTimelineEntry[];
  playerNotes: CharacterPlayerNote[];
  chapterInfluence: CharacterChapterInfluence[];
};

const chapter = chapterSlugFor;

export const characterProfileDetails: Record<string, CharacterProfileDetails> = {
  "sal-fisher": {
    timeline: [1, 2, 3, 4, 5].map((number) => ({ chapterSlug: chapter(number), kind: "Playable", detail: number === 1 ? "Sal’s arrival at Addison Apartments begins the central investigation." : "Primary player viewpoint for this stage of the story." })),
    playerNotes: [
      { href: "/characters/sal-fisher#mask", eyebrow: "Spoiler-aware profile", title: "Sal Fisher's mask and face", detail: "Read the story context behind Sal’s prosthetic face." },
      { href: "/chapters/chapter-1-strange-neighbors#walkthrough", eyebrow: "Chapter One", title: "Dream code and Gear Boy route", detail: "Follow the 5364 route that introduces Sal’s key investigation tool." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "Playable lead. The dream keypad and Gear Boy route start with him.", ifMissed: "Skip 5364 here and the Chapter 5 shed code is harder to reconstruct.", missable: true },
      { chapterSlug: chapter(2), impact: "Playable lead through the apartment curse with Larry.", ifMissed: "Rushing past extra dialogue after discoveries hides later apartment clues." },
      { chapterSlug: chapter(3), impact: "Playable lead at Nockfell High and in the optional Travis talk.", ifMissed: "Walking past the bathroom conversation loses Atonement." },
      { chapterSlug: chapter(4), impact: "Playable lead in the trial and the last Addison raid.", ifMissed: "Late collectibles (teeth, tapes, guitar) fail if you enter the assault unprepared.", missable: true },
      { chapterSlug: chapter(5), impact: "Playable lead across memory and the shed route.", ifMissed: "4035364 is room 403 plus the Chapter 1 dream code, entered as one number.", missable: true },
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
    playerNotes: [
      { href: "/chapters/chapter-1-strange-neighbors", eyebrow: "Chapter One", title: "Meet Larry and investigate 403", detail: "The chapter route tracks the conversations and evidence that establish Larry’s role." },
      { href: "/chapters/chapter-2-the-wretched", eyebrow: "Chapter Two", title: "Larry’s family mystery", detail: "Follow the puzzle-box and Super Gear Boy investigation in context." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "First ally in Addison Apartments and partner on the Mansfield case.", ifMissed: "Thin dialogue with Larry here makes later friendship and apartment access feel incomplete.", missable: true },
      { chapterSlug: chapter(2), impact: "Leads the family-history investigation inside the building.", ifMissed: "Talk to him more than once or Best Buds and several clues sit behind the first hello.", missable: true },
      { chapterSlug: chapter(3), impact: "School investigation partner with Sal, Ash, and Todd.", ifMissed: "Skipping group conversations cuts context for the basement operation." },
      { chapterSlug: chapter(4), impact: "Central to the last Addison Apartments raid.", ifMissed: "Late-building conversations still hide collectible and story beats." },
      { chapterSlug: chapter(5), impact: "Playable in the final supernatural sequence.", ifMissed: "His viewpoint is part of the last resistance route, not a cameo." },
    ],
  },
  "ashley-campbell": {
    timeline: [
      { chapterSlug: chapter(2), kind: "On-screen", detail: "First meets Sal during the Super Gear Boy investigation." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "Joins the Nockfell High investigation as a core member of the group." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Helps pursue the evidence behind Sal’s account." },
      { chapterSlug: chapter(5), kind: "Playable", detail: "Carries major sections of the final resistance route." },
    ],
    playerNotes: [
      { href: "/chapters/chapter-3-the-bologna-incident#puzzles", eyebrow: "Chapter Three", title: "School investigation codes", detail: "Use the school puzzle answers alongside Ash’s bologna investigation." },
      { href: "/chapters/chapter-5-memories-and-dreams", eyebrow: "Chapter Five", title: "Final resistance route", detail: "See Ash’s playable role in the final chapter walkthrough." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(2), impact: "Joins during the Super Gear Boy investigation as a practical counterweight.", ifMissed: "Treat her as flavor here and her later playable role has no setup." },
      { chapterSlug: chapter(3), impact: "Active partner in the Nockfell High and bologna investigation.", ifMissed: "School conversations with Ash sit next to the codes, not after the cutoff." },
      { chapterSlug: chapter(4), impact: "Helps pursue the evidence behind Sal’s public account.", ifMissed: "Skipping her scenes leaves the trial aftermath without the group’s follow-up." },
      { chapterSlug: chapter(5), impact: "Playable viewpoint for major resistance sections.", ifMissed: "Her route is required work in the final chapter, not optional color." },
    ],
  },
  "travis-phelps": {
    timeline: [
      { chapterSlug: chapter(3), kind: "On-screen", detail: "A private school-bathroom conversation reveals the pressure behind his public hostility." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "His family’s connection to the wider conflict gains narrative weight." },
      { chapterSlug: chapter(5), kind: "On-screen", detail: "Appears in the final confrontation with the cult." },
    ],
    playerNotes: [
      { href: "/chapters/chapter-3-the-bologna-incident#walkthrough", eyebrow: "Chapter Three", title: "Atonement dialogue route", detail: "Use the 3–2–3–2 answer order during Travis’s optional conversation." },
      { href: "/chapters/chapter-3-the-bologna-incident", eyebrow: "Chapter Three", title: "Nockfell High investigation", detail: "Read the surrounding school route before following the optional dialogue." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(3), impact: "Optional bathroom conversation that shows the pressure behind his hostility.", ifMissed: "Easy to walk past. Atonement uses the 3–2–3–2 answer order.", missable: true },
      { chapterSlug: chapter(4), impact: "Family ties to the wider conflict gain narrative weight.", ifMissed: "Skipping later Phelps context makes the school scenes look like a one-off bully beat." },
      { chapterSlug: chapter(5), impact: "Appears in the final confrontation with the cult.", ifMissed: "His last scenes sit on the cult route, not a separate side quest." },
    ],
  },
  "todd-morrison": {
    timeline: [
      { chapterSlug: chapter(2), kind: "On-screen", detail: "First appears while helping modify the Gear Boy into the Super Gear Boy." },
      { chapterSlug: chapter(3), kind: "On-screen", detail: "Analyzes evidence from the school investigation." },
      { chapterSlug: chapter(4), kind: "On-screen", detail: "Supports the group’s final preparation and research." },
      { chapterSlug: chapter(5), kind: "On-screen", detail: "His research and condition remain central to the final plan." },
    ],
    playerNotes: [
      { href: "/chapters/chapter-2-the-wretched", eyebrow: "Chapter Two", title: "Super Gear Boy upgrade", detail: "Follow the route that introduces Todd’s technical role." },
      { href: "/chapters/chapter-2-the-wretched#route-checks", eyebrow: "Chapter Two", title: "Gear Boy route checks", detail: "Track the device, its upgrades, and optional supernatural chapters in the apartment investigation." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(2), impact: "Turns the Gear Boy into the Super Gear Boy the later Chapters assume you have.", ifMissed: "Rushing the apartment can skip the upgrade the rest of the investigation uses.", missable: true },
      { chapterSlug: chapter(3), impact: "Reads school evidence and helps turn suspicion into a plan.", ifMissed: "His analysis sits with the journal and basement route, not after it." },
      { chapterSlug: chapter(4), impact: "Supports the group’s last preparation and research.", ifMissed: "Late-prep conversations with Todd still hide context for the raid." },
      { chapterSlug: chapter(5), impact: "His research remains part of the final plan even when he is not leading the action.", ifMissed: "Treat him as a Chapter 2-only tech NPC and the ending plan loses its setup." },
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
    playerNotes: [
      { href: "/chapters/chapter-3-the-bologna-incident#puzzles", eyebrow: "Chapter Three", title: "Henry’s computer password", detail: "The DIANE alphabet-position code is 491145." },
      { href: "/characters/sal-fisher#mask", eyebrow: "Family context", title: "Sal’s mask and childhood history", detail: "Read the spoiler-aware Sal Fisher profile for the family context." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "Moves into room 402 with Sal and Gizmo and sets the household the investigation leaves from.", ifMissed: "He is not a puzzle NPC here — the home scenes explain why they moved." },
      { chapterSlug: chapter(2), impact: "Stays in the Fisher home while the apartment curse expands.", ifMissed: "Home conversations still change after discoveries." },
      { chapterSlug: chapter(3), impact: "His computer holds the DIANE family-history password.", ifMissed: "Use 491145. Do not enter the school desk code 3141 there.", missable: true },
      { chapterSlug: chapter(4), impact: "Appears in later family context around the trial.", ifMissed: "Family scenes here are context, not a separate collectible hunt." },
      { chapterSlug: chapter(5), impact: "Returns through memory-focused material.", ifMissed: "His last appearances are memories, not a new investigation NPC." },
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
    playerNotes: [
      { href: "/chapters/chapter-1-strange-neighbors", eyebrow: "Chapter One", title: "Basement access and A Dark Secret", detail: "Lisa’s dialogue opens an important early route." },
      { href: "/chapters/chapter-2-the-wretched", eyebrow: "Chapter Two", title: "Johnson family context", detail: "Follow the chapter’s investigation of Larry’s family history." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "Caretaker dialogue that opens basement access for A Dark Secret.", ifMissed: "Skipping the caretaker conversations misses an early route.", missable: true },
      { chapterSlug: chapter(2), impact: "Gives Johnson family context as the building mystery expands.", ifMissed: "Her later talks sit next to Larry’s family investigation, not as flavor." },
      { chapterSlug: chapter(3), impact: "Remains part of the Addison Apartments household thread.", ifMissed: "Apartment check-ins with Lisa still change after the school case." },
      { chapterSlug: chapter(4), impact: "Appears in the later family and apartment context.", ifMissed: "Late caretaker conversations still hide building access and story beats." },
      { chapterSlug: chapter(5), impact: "Referenced in later-story material rather than a full active scene.", ifMissed: "Do not expect a new playable Lisa route in the finale." },
    ],
  },
  "megan-holmes": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "A ghost encounter confirms that Sal’s supernatural experiences are real." },
      { chapterSlug: chapter(2), kind: "On-screen", detail: "Her family history becomes part of the building investigation." },
      { chapterSlug: chapter(3), kind: "Mentioned", detail: "Her story remains part of the broader investigation and journal material." },
    ],
    playerNotes: [
      { href: "/chapters/chapter-2-the-wretched#route-checks", eyebrow: "Chapter Two", title: "Gear Boy supernatural route", detail: "Use the device route checks to locate optional spirit content." },
      { href: "/chapters/chapter-2-the-wretched", eyebrow: "Chapter Two", title: "Holmes family investigation", detail: "The chapter adds context to Megan’s connection with the apartments." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "A ghost encounter that proves Sal’s supernatural experiences are real.", ifMissed: "Treat her as a one-off scare and the later Holmes thread has no first proof." },
      { chapterSlug: chapter(2), impact: "Holmes family history becomes part of the apartment investigation.", ifMissed: "Follow her through the Gear Boy route rather than leaving her in Chapter 1.", missable: true },
      { chapterSlug: chapter(3), impact: "Remains in journal and investigation material rather than a new scene.", ifMissed: "Her name in notes is context, not a separate collectible hunt." },
    ],
  },
  "charley-mansfield": {
    timeline: [
      { chapterSlug: chapter(1), kind: "On-screen", detail: "The central suspect in the Sanderson murder investigation." },
      { chapterSlug: chapter(2), kind: "Memory / vision", detail: "Returns through the chapter’s nightmare and aftermath material." },
    ],
    playerNotes: [
      { href: "/chapters/chapter-1-strange-neighbors", eyebrow: "Chapter One", title: "Charley’s tea and evidence route", detail: "Compare the two tea outcomes and recover the decisive evidence." },
      { href: "/achievements#chapter-1-achievements", eyebrow: "Achievements", title: "Alternate tea outcomes", detail: "Go to Sleep and Irritable Bowels require separate outcomes." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "The opening murder case. Tea choice locks one of two achievements.", ifMissed: "One playthrough cannot unlock both Go to Sleep and Irritable Bowels.", missable: true },
      { chapterSlug: chapter(2), impact: "Returns through nightmare and aftermath material.", ifMissed: "The case is closed, but the building’s larger danger is not." },
    ],
  },
  gizmo: {
    timeline: [1, 2, 3, 4].map((number) => ({ chapterSlug: chapter(number), kind: "On-screen" as const, detail: "Appears in the Fisher home across the apartment-era chapters." })).concat({ chapterSlug: chapter(5), kind: "On-screen", detail: "Returns in the final chapter’s story material." }),
    playerNotes: [
      { href: "/chapters/chapter-1-strange-neighbors", eyebrow: "Chapter One", title: "The Fisher home in room 402", detail: "Begin with Sal, Henry, and Gizmo’s move to Addison Apartments." },
      { href: "/characters/sal-fisher", eyebrow: "Related profile", title: "Sal Fisher", detail: "Read the main character profile for Gizmo’s place in the Fisher household." },
    ],
    chapterInfluence: [
      { chapterSlug: chapter(1), impact: "Household constant in room 402 while the first investigation starts.", ifMissed: "He is comfort and home context, not a missable puzzle." },
      { chapterSlug: chapter(2), impact: "Stays in the Fisher home through the apartment-era chapters.", ifMissed: "No Gear Boy or achievement route depends on chasing him." },
      { chapterSlug: chapter(3), impact: "Still part of the household while the school case unfolds.", ifMissed: "Home scenes with Gizmo are continuity, not a collectible." },
      { chapterSlug: chapter(4), impact: "Remains in the Fisher home during the trial period.", ifMissed: "Do not treat him as a VHS or teeth check." },
      { chapterSlug: chapter(5), impact: "Returns in the final chapter’s story material.", ifMissed: "His last appearance is memory and home, not a new hunt." },
    ],
  },
};

export function getCharacterProfileDetails(slug: string): CharacterProfileDetails {
  return characterProfileDetails[slug] ?? { timeline: [], playerNotes: [], chapterInfluence: [] };
}

export function getInfluenceForChapter(characterSlug: string, chapterSlug: string) {
  return getCharacterProfileDetails(characterSlug).chapterInfluence.find((entry) => entry.chapterSlug === chapterSlug);
}

export function isMissableForChapter(characterSlug: string, chapterSlug: string) {
  return Boolean(getInfluenceForChapter(characterSlug, chapterSlug)?.missable);
}
