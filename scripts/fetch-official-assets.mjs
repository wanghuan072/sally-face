import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const assets = [
  {
    output: "public/images/characters/sal-fisher-official.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/171da799-810a-434e-abb0-5c713628202b/salCU.jpg",
    width: 900,
    height: 900,
  },
  {
    output: "public/images/walkthrough/gear-boy-screen.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/87b4a745-281d-4620-a082-ae4484d325d9/sgb.png",
  },
  {
    output: "public/images/episodes/episode-1-strange-neighbors.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/7c4f11ae-b330-44f3-9073-8ad6ea52c27a/09_charley.jpg",
  },
  {
    output: "public/images/episodes/episode-2-the-wretched.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/259f6d19-b6a5-478a-b269-3ec5d5ea098d/ep2_02.png",
  },
  {
    output: "public/images/episodes/episode-3-the-bologna-incident.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/5530e53f-6f77-44ce-a552-30e71a7db959/3_freezer.png",
  },
  {
    output: "public/images/episodes/episode-4-the-trial.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/000f1837-58e0-418e-b9e7-3153c163bb42/ep4_03.png",
  },
  {
    output: "public/images/episodes/episode-5-memories-and-dreams-official.webp",
    url: "https://static.wikia.nocookie.net/sally-face/images/b/bb/Sally_Face_Memories_and_Dreams.jpg/revision/latest?cb=20191106222732",
  },
  {
    output: "public/images/walkthrough/episode-two-supernatural-pony.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/637990ff-ec87-41be-9562-a82eba77c13e/ep2_07.png",
  },
  {
    output: "public/images/walkthrough/episode-two-bathroom-surge.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/d6b33897-dd14-4f18-a868-64c1ffc1ad5e/2_surge.png",
  },
  {
    output: "public/images/walkthrough/episode-four-vhs-archive.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/727831fe-28da-494f-b742-3cd68df1c17b/ep4_04.png",
  },
  {
    output: "public/images/sally-face-2/sally-face-2-screenshot-1.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/3bd17a57-38b9-49cb-9c3e-566c9f540aa0/sf2_ss1.png",
  },
  {
    output: "public/images/sally-face-2/sally-face-2-screenshot-2.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/44cb92a5-de0c-44da-8a61-6a58318ae0ff/sf2_ss2.png",
  },
  {
    output: "public/images/sally-face-2/sally-face-2-screenshot-3.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/a2180d22-9d15-4cb9-84d9-a7790cc9e96f/sf2_ss3.png",
  },
  {
    output: "public/images/sally-face-2/sally-face-2-screenshot-4.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/5737686a-7703-40a5-9d3e-b33b7d8e2421/sf2_ss4.png",
  },
  {
    output: "public/images/sally-face-2/sally-face-2-screenshot-5.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/0459aa6d-2605-460d-8237-2e82b9547b7b/sf2_ss5.png",
  },
  {
    output: "public/images/sally-face-2/sally-face-2-screenshot-6.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/4aca1a93-7a74-4345-9159-fb871ecec0d7/sf2_ss6.png",
  },
];

for (const asset of assets) {
  const destination = path.join(root, asset.output);
  await mkdir(path.dirname(destination), { recursive: true });

  const response = await fetch(asset.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${asset.url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const pipeline = sharp(buffer).rotate();

  if (asset.width && asset.height) {
    pipeline.resize(asset.width, asset.height, { fit: "cover", position: "centre" });
  } else {
    pipeline.resize(1280, 720, { fit: "cover", position: "centre" });
  }

  await pipeline.webp({ quality: 82, smartSubsample: true }).toFile(destination);
  console.log(`Saved ${asset.output}`);
}
