import { siteConfig } from "@/config/site";

export type LegalList = {
  title?: string;
  items: string[];
};

export type LegalNote = {
  label: string;
  text: string;
};

export type LegalExample = {
  label: string;
  detail: string;
};

export type LegalFaq = {
  question: string;
  answer: string;
};

export type LegalSection = {
  heading: string;
  body: string[];
  list?: LegalList;
  note?: LegalNote;
  examples?: LegalExample[];
};

export type LegalDocument = {
  title: string;
  intro: string;
  facts: { label: string; value: string }[];
  sections: LegalSection[];
  faqs?: LegalFaq[];
  related: { href: string; label: string; blurb: string }[];
};

const email = siteConfig.email;
const updated = new Date(`${siteConfig.contentUpdated}T00:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const related = {
  privacy: { href: "/legal/privacy-policy", label: "Privacy Policy", blurb: "What this fan site does and does not collect." },
  terms: { href: "/legal/terms-of-service", label: "Terms of Service", blurb: "How the guides may be used, linked and quoted." },
  copyright: { href: "/legal/copyright", label: "Copyright", blurb: "Game rights, original writing and takedown requests." },
  about: { href: "/legal/about-us", label: "About Us", blurb: "Why the site exists and how the pages are arranged." },
  contact: { href: "/legal/contact-us", label: "Contact Us", blurb: "How to send a correction, rights notice or broken-link report." },
} as const;

export const legalPages: Record<string, LegalDocument> = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "Sally Face Guide is a public reference, not an account service. You can read Chapter routes, character pages and achievement lists without signing in. This policy describes the limited information that can appear when a page is requested, when you leave a public feedback note, or when you choose to email the site.",
    facts: [
      { label: "Accounts", value: "None" },
      { label: "Newsletter", value: "Not offered" },
      { label: "Contact", value: `${email} or a public feedback note` },
    ],
    sections: [
      {
        heading: "What this policy covers",
        body: [
          "This policy applies to sallyface.org, including Chapter routes, Guides, character profiles, the achievement checklist, download pages, the Sally Face 2 status page and these legal pages. It does not apply to Portable Moose, Steam, Google Play, the App Store, console stores or any other site reached through an outbound link.",
          "The site publishes player-reference material. It does not create accounts, take payments, host game files or keep a profile of how you play Sally Face. You may optionally leave a public feedback note with a display name, a one-to-five rating and a message.",
        ],
      },
      {
        heading: "The short version",
        body: [
          "Reading the site does not require a name, email address, save file or store login. There is no shopping cart, wishlist or membership. You can contact the editor by email, or leave an optional public feedback note without creating an account.",
          "The servers that deliver a page can still see ordinary connection data, the same way almost any website can. That information is used to serve the page, keep the site available and investigate abuse—not to follow you across the web or score you as a player.",
        ],
        list: {
          title: "This site does not ask for",
          items: [
            "A Sally Face Guide account, password or player profile",
            "Payment details, store logins or order numbers",
            "Your save files, achievement screenshots for a leaderboard, or a record of which Chapter you are on",
            "A newsletter signup or marketing preference centre",
          ],
        },
      },
      {
        heading: "Information created by a visit",
        body: [
          "When a browser requests a page, a host or security layer may receive an IP address, browser and device type, the page requested, a referring address, a rough location inferred from the IP address, and the time of the request. That is ordinary web-server information.",
          "It is used to deliver pages, diagnose errors, absorb abusive traffic and understand which routes are being read in aggregate. It is not used to identify you as a named person, to rebuild your playthrough, or to decide which guide you “should” see next.",
        ],
        note: {
          label: "Store clicks leave this site",
          text: "A Steam, Google Play, App Store or console link opens that store’s own page. Wishlists, purchases, sign-ins and download receipts are handled there, under that store’s privacy policy—not here.",
        },
      },
      {
        heading: "Email you choose to send",
        body: [
          `If you write to ${email}, the message, your sending address and whatever you include in the body are used to read the request, reply where appropriate and keep enough context to finish a correction or rights notice.`,
          "Do not send passwords, payment information, government identity documents, Steam Guard codes, console account recovery details or a save file that contains personal data. A Chapter number, page URL and a short description of the mismatch are enough for almost every gameplay report.",
        ],
        examples: [
          { label: "Useful to include", detail: "The page URL, Chapter or Guide name, PC / mobile / console, and the step that did not match your game." },
          { label: "Leave out", detail: "Account emails, order IDs, recovery codes, full save files, or another person’s private information." },
        ],
      },
      {
        heading: "Public feedback notes",
        body: [
          "The feedback panel lets you post an optional display name, a one-to-five rating and a message about the guide. Your note is public when it is submitted, so do not include an email address, account details, spoilers you do not want others to see, or other personal information.",
          "The feedback service records the submitted fields, the time of submission and limited technical information used to prevent repeated automated posts. Notes may be removed when they are abusive, off-topic, contain personal information, or need correction. To request removal of a note, email the editor with its text and date so it can be located.",
        ],
      },
      {
        heading: "Cookies, fonts and analytics",
        body: [
          "The site may use storage that is required to deliver a page, apply a basic preference or protect the service. Pages also load Google Analytics (gtag.js, measurement ID G-T1G5XL3ZDE) so visits can be counted in aggregate. Google may set cookies or similar storage for that measurement; browser or Google controls can limit it.",
          "Pages may also load advertising supplied by ProfitableRateCPMNetwork. That provider may use cookies, similar storage, device or connection information, and destination links to serve or measure ads. A popunder script may ask your browser to open an advertising page; browser settings, content blockers, and privacy controls can restrict that behavior. The site does not run a separate marketing pixel or session-replay recorder.",
          "Display fonts are bundled with the site rather than loaded from a third-party font foundry at visit time.",
        ],
        list: {
          title: "External services you may meet after a click",
          items: [
            "ProfitableRateCPMNetwork advertising and its advertising destinations",
            "Portable Moose pages and press materials",
            "Steam, Google Play, the App Store, PlayStation Store, Xbox and Nintendo eShop listings",
            "Any community page a guide mentions only as a source check, if you follow that link yourself",
          ],
        },
      },
      {
        heading: "Use, disclosure and retention",
        body: [
          "Limited information is used to send the page you asked for, keep the site running, look into abuse or errors, answer a message and retain a short record while a correction or rights request is open. It is not used to build advertising audiences or to make automated decisions about visitors.",
          "Disclosure happens only where it is reasonably needed to operate or defend the site, to meet a valid legal obligation, or to deal with fraud, security or abuse. Technical logs and email are kept only as long as those purposes remain, then discarded in the ordinary course of operating the site.",
        ],
      },
      {
        heading: "Children, mature content and international access",
        body: [
          "Sally Face is a mature narrative game, and this guide discusses violence, cult material and story events from that game. The site is not directed at children and does not knowingly collect personal information from them.",
          "A parent or guardian who believes a child sent personal details to the contact address can ask for that message to be reviewed and removed where reasonably possible. sallyface.org can be reached from many countries; hosting or security providers may process connection data outside your own location. This page does not take away privacy rights that may apply under local law.",
        ],
      },
      {
        heading: "Requests, updates and contact",
        body: [
          "If you emailed the site, you may ask whether correspondence tied to that address can be found, corrected or deleted. Include the address used and enough context to tell the message apart from an unrelated request. Reasonable verification may be needed first.",
          `Because there is no account system, ordinary access logs usually cannot identify a particular reader. Where a request cannot be completed in full, a reply will say so rather than claiming that a profile exists. This version is effective ${updated}. Privacy questions go to ${email}.`,
        ],
      },
    ],
    faqs: [
      { question: "Do I need an account to read the guides?", answer: "No. Chapter routes, character pages and the achievement list are public. There is no Sally Face Guide login." },
      { question: "Does clicking a Steam or Google Play link share my data with this site?", answer: "The click leaves sallyface.org. The store then handles its own account, cookies and purchase records under its own policy." },
      { question: "Do you track which Chapter I am playing?", answer: "No. The site does not store a playthrough, achievement progress or save state for visitors." },
    ],
    related: [related.terms, related.copyright, related.contact],
  },
  "terms-of-service": {
    title: "Terms of Service",
    intro: "These terms cover personal use of Sally Face Guide: reading a Chapter route, checking an achievement, quoting a short excerpt with attribution, or following an official store link. They do not govern a Steam purchase, a Google Play download or anything Portable Moose publishes on its own site.",
    facts: [
      { label: "Use", value: "Personal reference" },
      { label: "Status", value: "Independent fan site" },
      { label: "Official support", value: "Not provided here" },
    ],
    sections: [
      {
        heading: "Who these terms apply to",
        body: [
          "“Site”, “we” and “us” mean Sally Face Guide at sallyface.org. “Content” means the original writing, page design, navigation and site-created visuals published here. “Official materials” means names, characters, screenshots and other game property owned by their rights holders.",
          "Using a public page means you agree to these terms. They do not replace the terms of Steam, a mobile store, a console store or Portable Moose.",
        ],
      },
      {
        heading: "What you may do",
        body: [
          "You may read the guides while you play, bookmark a Chapter, share a link to a public page, and quote a short excerpt if it is clearly attributed to Sally Face Guide and linked back to the relevant page.",
          "A shared link should not imply that the site has approved a video, Discord, merch drop or other project unless the site has said so in writing.",
        ],
        list: {
          title: "Permitted, in plain terms",
          items: [
            "Use a Chapter route or Guide as a personal reference during a playthrough or replay",
            "Link to a public URL from a video description, forum post or friend message",
            "Quote a short passage with credit and a working link back to the page",
          ],
        },
      },
      {
        heading: "What you may not do",
        body: [
          "Do not present this site as an official Portable Moose service, scrape or mirror it in bulk, train a commercial dataset on the original guides without permission, or interfere with the way the pages are delivered.",
          "Do not use the site to find, request or distribute unofficial APKs, cracked builds, extracted game files or instructions for bypassing a storefront. The Download pages exist to send players to authorized listings only.",
        ],
        note: {
          label: "No game files here",
          text: "sallyface.org does not host Sally Face, modified packages or standalone APKs. Asking the contact address for a free copy will not be answered with a download.",
        },
      },
      {
        heading: "Guides, spoilers and platform differences",
        body: [
          "Routes, codes, achievement notes and store status are written to help players, not to replace the game or official support. A heading, spoiler mark or “missable” label is there so you can decide how much to read. Opening a Chapter page, a late-story character section or an ending note is your choice.",
          "PC, mobile and console versions can differ in controls, timing and how an achievement registers. Steam’s 35 achievements are documented from the PC list; a console trophy set may not match that list one-for-one. If a step disagrees with your game, check the Chapter, platform and patch before treating the page as broken.",
        ],
        examples: [
          { label: "A guide can be right and still miss your save", detail: "An optional conversation may already be closed, or a Chapter replay may be required for a mutually exclusive achievement such as the two Chapter One tea outcomes." },
          { label: "A store page can change after we link it", detail: "Price, regional availability and mobile package names belong to the store. Confirm the listing before you buy or install." },
        ],
      },
      {
        heading: "Fan-site status and external links",
        body: [
          "Sally Face Guide is independent. It is not affiliated with, endorsed by, sponsored by or operated by Portable Moose. Names and screenshots appear here for identification, commentary and player reference.",
          "Outbound links are a convenience. We do not control the destination’s content, accounts, pricing or privacy practices. Review that service before you purchase, sign in or share information there.",
        ],
      },
      {
        heading: "Feedback, changes and limits",
        body: [
          "Sending a correction does not create a job, partnership or duty to publish a particular change. Non-confidential feedback may be used to clarify a route without compensation. Pages can be rewritten, moved or removed when a step is wrong, a claim cannot be supported or a rights issue is raised.",
          `The site is provided as-is. To the extent the law allows, the site and its contributors are not liable for losses from using, misreading or being unable to reach a page. These terms do not remove rights that cannot legally be excluded. Questions: ${email}. Effective ${updated}.`,
        ],
      },
    ],
    faqs: [
      { question: "Can I quote a code or missable note in a video?", answer: "A short, attributed excerpt with a link back to the page is consistent with these terms. Republishing a whole Guide as your own is not." },
      { question: "Can I scrape the walkthroughs for another site or a model?", answer: "Not in bulk, and not to rebuild the original guides as someone else’s product, without written permission." },
      { question: "Is this official support for a crashed save or a refund?", answer: "No. Use the store or developer channel that sold the game. This site cannot restore a save, issue a refund or recover an account." },
    ],
    related: [related.copyright, related.privacy, related.contact],
  },
  copyright: {
    title: "Copyright Notice",
    intro: "Sally Face, its characters and official artwork belong to Portable Moose and their respective owners. Sally Face Guide owns the original writing and page design created for this fan site. This page exists so those two layers stay easy to tell apart, and so a rights holder can send a specific, usable notice.",
    facts: [
      { label: "Game rights", value: "Portable Moose and owners" },
      { label: "Original guides", value: "Sally Face Guide" },
      { label: "Notices", value: email },
    ],
    sections: [
      {
        heading: "Two kinds of material on this site",
        body: [
          "Official names, characters, story events, screenshots and press images remain with their rights holders. They appear here so a player can recognize a room, a puzzle, a person or a store listing—not because this site claims the game.",
          "Original Chapter writing, achievement explanations, page structure, navigation and site-created graphics are produced for Sally Face Guide. You may link to those pages and quote a short excerpt with credit. You may not copy a Guide wholesale or republish the site as your own.",
        ],
        list: {
          title: "This fan site does not",
          items: [
            "Sell or license Sally Face",
            "Host game builds, ripped assets, cracked copies or standalone APKs",
            "Grant anyone a licence to use Portable Moose trademarks or official art in their own project",
            "Accept uploaded fan fiction, fan art galleries or user walkthroughs",
          ],
        },
      },
      {
        heading: "Why screenshots and press images appear",
        body: [
          "A route is easier to follow when the player can see the same scene the text is talking about: the Chapter One dream, a Gear Boy screen, a VHS archive, a character sprite. Visuals used that way are for identification and commentary on the matching page.",
          "Where an image comes from an official press kit or store listing, it is used as a reference still, not as a substitute for owning or downloading the game. Image paths and captions are written to describe the scene, not to imply that Sally Face Guide created the artwork.",
        ],
        note: {
          label: "We cannot license the game to you",
          text: "A request to reuse official Sally Face art, music, characters or software has to go to the rights holder. This site can only speak for its own original writing and layout.",
        },
      },
      {
        heading: "How to send a copyright notice",
        body: [
          `Write to ${email} with enough detail that the exact page can be opened and the item found. A general complaint about “the whole site” is much harder to review than a URL plus a description of the image or paragraph.`,
          "If you are writing on behalf of a rights holder, say so. Good-faith notices are reviewed promptly. Removal, extra credit or a caption change will be made where that is the right response. An incomplete notice may need a follow-up before anything can be matched.",
        ],
        examples: [
          { label: "Subject line", detail: "Copyright notice — [name of work] on sallyface.org" },
          { label: "Include in the message", detail: "The work you represent, the exact page URL, a description of the text or image, your relationship to the rights holder, and a reliable reply address." },
        ],
      },
      {
        heading: "Permission to reuse original Guide writing",
        body: [
          "For more than a short attributed quotation of original Sally Face Guide text—an article reprint, a book, a commercial compilation, a mirrored copy—ask first. Name the page, the proposed use, whether it is commercial, and where it would appear. Permission exists only if it is confirmed in writing.",
          "Search-engine indexing of public pages and ordinary personal bookmarks are not a rights problem under this notice.",
        ],
      },
      {
        heading: "Independent fan status",
        body: [
          "Sally Face Guide is not affiliated with, endorsed by or sponsored by Portable Moose. References to Sally Face, Steam, consoles and mobile stores identify those works and services. All trademarks stay with their owners.",
          `Nothing on this site is a legal ruling about fair use, ownership or licensing. For a formal dispute, use the process that applies in your jurisdiction. Notices and questions: ${email}.`,
        ],
      },
    ],
    faqs: [
      { question: "Can I reuse a character portrait from this site in my own project?", answer: "If the portrait is official game art, ask the rights holder—not this fan site. If you only want to quote a short original caption, credit the page and keep the excerpt short." },
      { question: "Do you host fan art or let’s-play uploads?", answer: "No. The site does not run a gallery or a workshop for visitor files." },
      { question: "Where should Portable Moose or a rights agent write?", answer: `Send a specific URL and a description of the material to ${email}. The review section above lists what helps a notice get matched quickly.` },
    ],
    related: [related.terms, related.contact, related.about],
  },
  "about-us": {
    title: "About Sally Face Guide",
    intro: "This is an independent companion for people who are actually in a Chapter: stuck on a keypad, unsure whether a conversation is missable, trying to place a name, or looking for the official place to buy the game. It is not a wiki of every theory, and it is not Portable Moose.",
    facts: [
      { label: "Editor", value: siteConfig.author.name },
      { label: "Started", value: "Early 2026" },
      { label: "Status", value: "Fan-made, unofficial" },
    ],
    sections: [
      {
        heading: siteConfig.author.name,
        body: [
          `${siteConfig.author.name} started in early 2026 after a familiar problem on a few hard-to-search indie games, Sally Face among them: the big general walkthroughs often skip the missable conversation, lock the wrong tea outcome, or copy a code without saying when it comes back later.`,
          "This site is the Sally Face part of that work. It is an independent fan guide for people who are already in a Chapter — not a studio page, not a theory wiki, and not a restatement of another site’s outline. The byline on Chapter routes and Guides points here so a reader can see who maintains the text.",
        ],
        note: {
          label: "How to reach the editor",
          text: `Corrections, broken links and rights notices go to ${email}. Name the page URL and platform when a route does not match your game.`,
        },
      },
      {
        heading: "How Frontline Pathfinder works",
        body: [
          "A page earns its place if it helps someone finish a route without a second guess. That means replaying a Chapter when two outcomes cannot share one save, writing the step as something you can do again in the game, and checking store or developer facts when the question is a date, a platform or a listing.",
          "The layout follows the same idea. A Chapter page keeps story order. A Guide isolates missables and replay-only achievements. Quick answers and route checks exist so a player can land on the stuck point without rereading the whole Chapter.",
        ],
        list: {
          title: "What that looks like in practice",
          items: [
            "Codes and missables are written as in-game steps, then checked again on a later run",
            "A one-playthrough limit — such as Charley’s two tea outcomes — is called out before the save closes",
            "Story claims stay inside what the game shows; unverified sequel dates are left unpublished",
            "Official art and store facts stay attributed; this site does not host the game or a modified download",
          ],
        },
      },
      {
        heading: "Who the site is for",
        body: [
          "The typical reader already has a save. They need the next code, the tea choice they are about to lock in, the list of VHS tapes before room 103, or a plain explanation of who Travis is without a full plot dump. First-time players can still use a Chapter page in order; the headings are there so they can stop before a spoiler if they want to.",
          "It is also for replay and cleanup runs: mutually exclusive achievements, hidden sightings, guitar sequences, and the Epilogue requirement that the first four Chapters are complete.",
        ],
        list: {
          title: "Start with the page that matches the problem",
          items: [
            "Chapters — story order, steps, codes, items and the cutoff for that Chapter",
            "Guides — missables, replay-only outcomes and the checks to make before you finish",
            "Characters — who someone is, how they connect to Sal, and which Chapter to reopen",
            "Achievements — the 35 Steam unlocks, with a route back into the matching Chapter",
            "Download — official PC, mobile and console listings only",
          ],
        },
      },
      {
        heading: "How the pages are written",
        body: [
          "A Chapter page follows the investigation as you play it. A Guide repeats the same Chapter from the “don’t miss this” angle: alternate tea, seals, journal pages, tapes, a clean final run. Character pages keep codes and item routes in the Chapter where they belong, and use spoiler labels on late-story beats.",
          "Gameplay instructions are written as actions you can repeat in the game. Story claims stay inside what the game shows. Fan theories, shipping arguments and unverified sequel dates are not treated as facts. Sally Face 2 information is limited to what Portable Moose has actually published.",
        ],
        note: {
          label: "Spoilers are marked, not hidden behind an account wall",
          text: "Late Chapter Five material, Sal’s mask explanation and ending notes are labelled. The site does not gate pages behind a “I have finished the game” checkbox, so read the heading before you scroll.",
        },
      },
      {
        heading: "What we check against",
        body: [
          "Release dates, platforms, languages and store facts are kept in step with Portable Moose materials and current storefront listings. Achievement names and the count of 35 follow Steam. Unlock routes are written from reproducible in-game steps and cross-checked against established community walkthroughs where a hidden trigger is easy to miss.",
          "Where official sources disagree—for example a press-kit date versus a launch post—the page should follow the clearer primary record and not invent a compromise date. Playtime figures, when shown, are labelled as community estimates.",
        ],
        examples: [
          { label: "Platform facts", detail: "Press kit, store listing, developer FAQ and the Sally Face 2 press kit for sequel status only." },
          { label: "Route facts", detail: "What you can inspect, enter, collect or say in the game; optional conversations called out as optional." },
        ],
      },
      {
        heading: "What this site will not do",
        body: [
          "It will not host Sally Face, a modified APK, or a “free download” mirror. It will not run a social forum, paid placement, merch shop or unofficial patch notes feed. Public feedback notes are for guide corrections and player tips, not account support or live discussion. It will not pretend to recover a Steam account or refund a console purchase.",
          "It also will not replace credits, official announcements or Portable Moose support. When the honest next step is a store or developer page, the guide links out and stops.",
        ],
      },
      {
        heading: "Independence and corrections",
        body: [
          "Sally Face Guide is a fan project. It does not represent Portable Moose. Game names, characters and official art remain with their owners.",
          `If a step is wrong, a warning is missing or a store link has moved, the Contact page lists what to send. A useful report names the URL, platform and the point in the route. Editorial changes exist to make the player-facing instruction clearer, not to pad a page. Contact: ${email}.`,
        ],
      },
    ],
    faqs: [
      { question: `Who is ${siteConfig.author.name}?`, answer: `${siteConfig.author.name} started in early 2026 and edits this independent Sally Face Guide. The pages are written from replayed routes and missable checks, and corrections go to ${email}.` },
      { question: "Is this the official Sally Face website?", answer: "No. Portable Moose is the developer. This is an independent fan guide for players." },
      { question: "Why are there both Chapters and Guides?", answer: "Chapters follow the story. Guides isolate missables, codes and replay risks for the same Chapter so you can check them without rereading every beat." },
      { question: "Do you cover Sally Face 2?", answer: "Only confirmed public details: announced 16 August 2026, date TBD, Steam Early Access first with Episode Six. Unannounced dates are not invented here." },
    ],
    related: [related.contact, related.copyright, related.terms],
  },
  "contact-us": {
    title: "Contact Us",
    intro: "Use the public feedback panel for a quick guide tip or correction, and email for a route that no longer matches the game, an attribution question or a copyright notice. Neither channel is Portable Moose support, Steam support or a place to ask for a free copy of the game.",
    facts: [
      { label: "Email", value: email },
      { label: "Public notes", value: "Available from the feedback panel" },
      { label: "Best for", value: "Corrections and rights notices" },
    ],
    sections: [
      {
        heading: "Write here when",
        body: [
          "A Chapter or Guide step disagrees with a current official build, an achievement trigger is described unclearly, an internal link 404s, a store URL has moved, or you represent a rights holder and need a specific page reviewed.",
          "Before you write, open the page and copy its URL. Several Chapters mention similar items—teeth, journals, Gear Boy chapters—and the URL is the fastest way to land on the right paragraph.",
        ],
        list: {
          title: "Check the in-site page first",
          items: [
            "Codes and missables — the matching Chapter and its Guide",
            "Who a character is — the character profile, then the Chapter it points to",
            "Steam unlocks — the achievement checklist, then the Chapter route",
            "Where to buy or install — Download, or the Android APK explanation for Play Store delivery",
            "Sequel status — the Sally Face 2 page, not a guess in email",
          ],
        },
      },
      {
        heading: "How to send a useful gameplay report",
        body: [
          `Address: ${email}. A short subject that names the Chapter or achievement is enough. Screenshots are optional; a precise description is usually better than a large attachment.`,
          "If the issue is that an achievement did not pop on Steam, say so, and mention whether you already used the in-game Achievements menu Sync control described on the checklist page. That avoids a round trip when the route was followed but the client had not refreshed.",
        ],
        examples: [
          { label: "Subject", detail: "Correction — Chapter 4 Her Fate / room 103 cutoff" },
          { label: "Body", detail: "URL, platform (Steam / Switch / Android, etc.), what you did, what you expected, what happened, and whether you were on a first run or a Chapter replay." },
        ],
      },
      {
        heading: "Copyright and legal notices",
        body: [
          "Use the same address. Put “Copyright notice” in the subject and include the work, the exact URL, a description of the material and your authority to send the request. The Copyright page lists the same checklist so a notice can be matched without guesswork.",
          "Mail to this address is correspondence, not legal advice and not a filing with a court. If a request has a statutory deadline, say that in the first message.",
        ],
        note: {
          label: "Do not attach secrets",
          text: "Leave out passwords, payment information, government ID, authentication codes and save files that may contain personal data. They are not needed to fix a walkthrough.",
        },
      },
      {
        heading: "What this inbox cannot do",
        body: [
          "It cannot refund a purchase, restore a corrupted save, reset a Steam or console achievement, unlock a Google Play licence, diagnose a crash, or intervene in a dispute with another player or a store.",
          "It also cannot supply Sally Face as a file, point to a pirate mirror, or confirm an unannounced Sally Face 2 date. For those matters, use the store that sold the game or Portable Moose’s own channels.",
        ],
      },
      {
        heading: "Replies and records",
        body: [
          "Messages are read when reasonably possible. Accuracy, broken pages, accessibility and rights issues are more likely to get a reply than a request for official support this site cannot provide. A response time is not guaranteed.",
          "A message may be kept while the issue is open and for a reasonable time after, so a correction has context. The Privacy Policy explains how email and public feedback notes are handled. There is no ticket portal or phone line.",
        ],
      },
    ],
    faqs: [
      { question: "Is there a Discord or comment form?", answer: "There is a public feedback panel for tips and guide comments. Use email when a report needs a URL, platform details, a rights notice or a private reply." },
      { question: "Will you add my fan theory or a leaked sequel date?", answer: "No. Character pages and the Sally Face 2 page stay with what the game and Portable Moose have made public." },
      { question: "I need help buying or installing the game.", answer: "Use the Download page for official listings. Install and purchase problems belong to that store’s support, not this inbox." },
    ],
    related: [related.about, related.copyright, related.privacy],
  },
};

export const legalSlugs = Object.keys(legalPages);
