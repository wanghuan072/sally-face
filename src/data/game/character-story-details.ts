import { chapterSlugFor } from "@/lib/data/chapter-slugs";
import { getChapterSlug, getEpisodeBySlug } from "@/lib/data/episodes";

type StoryMoment = {
  chapterSlug: string;
  spoiler: "Early story" | "Mid-game spoilers" | "Full-story spoilers";
  title: string;
  detail: string;
};

type CharacterStoryDetail = {
  arc: string[];
  moments: StoryMoment[];
};

const chapter = chapterSlugFor;

export const characterStoryDetails: Record<string, CharacterStoryDetail> = {
  "sal-fisher": {
    arc: [
      "Sal begins as a new tenant trying to make sense of a murder next door. His instinct is to listen—to frightened neighbors, to ghosts, and to people other characters would dismiss—which turns a local case into a much wider investigation.",
      "Across the later Chapters, that quiet curiosity becomes responsibility. Sal remains the group’s emotional center even as the evidence grows harder to explain and the consequences of acting on it become public and irreversible.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "A new home, an active case", detail: "The move into Addison Apartments establishes Sal’s habit of treating every resident and every strange detail as worth hearing out." },
      { chapterSlug: chapter(3), spoiler: "Mid-game spoilers", title: "The investigation becomes personal", detail: "The school case turns Sal’s curiosity into a shared responsibility with Larry, Ash, and Todd." },
      { chapterSlug: chapter(5), spoiler: "Full-story spoilers", title: "Memory and consequence", detail: "The final chapter places Sal’s childhood trauma and the group’s long investigation in the same larger conflict." },
    ],
  },
  "larry-johnson": {
    arc: [
      "Larry is the first person to treat Sal as a friend rather than a mystery. His humor and confidence make the apartment investigation feel survivable, but his connection to its history means he carries more fear than he initially shows.",
      "His story grows from local folklore and family hurt into one of the game’s most personal accounts of loyalty. The important thread is not that he knows supernatural facts first; it is that he keeps choosing to face them with Sal.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "The first ally at Addison", detail: "Larry gives Sal a way into the Mansfield investigation and introduces the building’s paranormal side without demanding blind trust." },
      { chapterSlug: chapter(2), spoiler: "Mid-game spoilers", title: "Family history surfaces", detail: "The apartment investigation brings Larry’s family history and the building’s curse into direct contact." },
      { chapterSlug: chapter(5), spoiler: "Full-story spoilers", title: "Loyalty beyond the apartments", detail: "Later events reframe Larry’s role as part of the group’s last attempt to resist the darkness around Nockfell." },
    ],
  },
  "ashley-campbell": {
    arc: [
      "Ash enters the story as the most practical member of the group: skeptical when the evidence is thin, decisive once it is not. That balance keeps her from reading as a passive witness to Sal and Larry’s discoveries.",
      "Her later role is defined by persistence. When the group’s earlier investigation is challenged in public, Ash keeps looking for proof and acts on the information the others left behind.",
    ],
    moments: [
      { chapterSlug: chapter(2), spoiler: "Early story", title: "Joining the investigation", detail: "Ash first meets the group during the apartment mystery and becomes a grounded counterweight to its stranger claims." },
      { chapterSlug: chapter(3), spoiler: "Mid-game spoilers", title: "A partner at Nockfell High", detail: "The school investigation shows Ash as an active participant rather than simply someone who follows Sal’s lead." },
      { chapterSlug: chapter(5), spoiler: "Full-story spoilers", title: "Carrying the resistance forward", detail: "The final chapter gives Ash a major viewpoint and places her choices at the center of the group’s plan." },
    ],
  },
  "travis-phelps": {
    arc: [
      "Travis is introduced through hostility, but the game gradually shows that his behavior is shaped by fear, pressure, and a family environment he cannot safely challenge. That context explains him without excusing what he does to other people.",
      "His strongest material is deliberately private. The contrast between public aggression and vulnerable scenes is what turns him from a simple school antagonist into evidence of how the cult damages families from inside.",
    ],
    moments: [
      { chapterSlug: chapter(3), spoiler: "Mid-game spoilers", title: "A private conversation at school", detail: "An optional encounter gives Sal a chance to respond with empathy and reveals the conflict beneath Travis’s public behavior." },
      { chapterSlug: chapter(4), spoiler: "Full-story spoilers", title: "The Phelps connection gains weight", detail: "Later context makes clear why Travis’s home life and the wider conflict cannot be separated." },
    ],
  },
  "todd-morrison": {
    arc: [
      "Todd approaches the impossible as something that can be observed, tested, and built around. His technical curiosity gives the group a way to turn scattered clues into practical next steps.",
      "That confidence is not presented as a solution to everything. The later Chapters show the cost of being one of the people most willing to look closely at the cult’s systems and records.",
    ],
    moments: [
      { chapterSlug: chapter(2), spoiler: "Early story", title: "Making the unseen usable", detail: "Todd’s work with the Gear Boy gives Sal and Larry a tool for following supernatural evidence through the apartments." },
      { chapterSlug: chapter(3), spoiler: "Mid-game spoilers", title: "Turning evidence into a lead", detail: "At Nockfell High, Todd’s analysis helps the group move from suspicion to a concrete investigation." },
      { chapterSlug: chapter(5), spoiler: "Full-story spoilers", title: "Research that outlives its author", detail: "The final plan relies on Todd’s preparation and makes his contribution central even when he is not leading the action." },
    ],
  },
  "henry-fisher": {
    arc: [
      "Henry is defined by grief and by the practical work of trying to give Sal a stable home after the loss of Diane. He is not equipped to understand every supernatural claim, but his presence explains why Sal’s home life feels both caring and fragile.",
      "Later family context links the Fishers to the Johnsons and gives the story’s larger horror a domestic cost. His most meaningful scenes are usually quiet ones rather than investigation set pieces.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "Starting over in room 402", detail: "Henry’s move with Sal establishes the family situation behind the opening chapter." },
      { chapterSlug: chapter(3), spoiler: "Mid-game spoilers", title: "A family clue at home", detail: "A home-computer clue ties Henry’s everyday space back to Sal’s past and the wider investigation." },
    ],
  },
  "lisa-johnson": {
    arc: [
      "Lisa is the adult who makes Addison Apartments feel lived in rather than merely haunted. Her patience with Sal and her protectiveness toward Larry make her a bridge between the boys’ investigation and the building’s older history.",
      "Her caution is meaningful: she knows enough to be afraid of what Larry faces, but she still creates room for the group to ask questions and eventually become a family around one another.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "An adult who opens the building up", detail: "Lisa’s conversations give Sal access to more of the apartments and hint that Larry’s situation has a history." },
      { chapterSlug: chapter(2), spoiler: "Mid-game spoilers", title: "The Johnson history broadens", detail: "The second chapter adds family context without reducing Lisa to a source of exposition." },
    ],
  },
  "megan-holmes": {
    arc: [
      "Megan is one of the first spirits who makes it impossible to read Sal’s experiences as ordinary nightmares. Her brief scenes work because she is cautious and specific, not simply a generic ghost delivering lore.",
      "Her family history also gives the apartment mystery a human cost. The later investigation connects her story to the building’s pattern of harm without turning her into a mere collectible.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "A ghost who asks to be heard", detail: "Megan’s encounter confirms that Sal can communicate with the people the building has failed." },
      { chapterSlug: chapter(2), spoiler: "Mid-game spoilers", title: "A family story inside the larger mystery", detail: "The apartment investigation adds context to Megan’s connection with the Holmes family and Addison Apartments." },
    ],
  },
  "charley-mansfield": {
    arc: [
      "Charley represents the human horror at the center of the opening case. His fixation on his collection makes the investigation uncomfortable long before Sal and Larry find the evidence that resolves it.",
      "He should not be treated as the explanation for everything wrong with the apartments. His case closes one immediate crime while revealing that the building’s supernatural danger is much older and larger.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "The first case in room 204", detail: "Charley’s behavior, collection, and connection to the Sanderson case set the stakes for Sal and Larry’s first investigation." },
      { chapterSlug: chapter(2), spoiler: "Mid-game spoilers", title: "A case with an aftermath", detail: "Later nightmare material keeps the effects of the opening case present after its immediate mystery is solved." },
    ],
  },
  gizmo: {
    arc: [
      "Gizmo is not a puzzle device or a lore dispenser. He gives the Fisher home continuity across a story that repeatedly makes home unsafe, which is why his small appearances matter to players more than a long biography would.",
    ],
    moments: [
      { chapterSlug: chapter(1), spoiler: "Early story", title: "A quiet constant in room 402", detail: "Gizmo helps establish the ordinary domestic space Sal and Henry are trying to rebuild." },
      { chapterSlug: chapter(5), spoiler: "Full-story spoilers", title: "Home remembered in the final chapter", detail: "His later appearance reinforces the emotional connection between Sal’s memories and the people he tried to protect." },
    ],
  },
};

export function getCharacterStoryDetail(slug: string) {
  const detail = characterStoryDetails[slug] ?? { arc: [], moments: [] };
  return {
    ...detail,
    moments: detail.moments.map((moment) => {
      const episode = getEpisodeBySlug(moment.chapterSlug);
      return { ...moment, href: episode ? `/chapters/${getChapterSlug(episode)}` : "/chapters" };
    }),
  };
}
