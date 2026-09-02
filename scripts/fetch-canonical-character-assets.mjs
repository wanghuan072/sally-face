import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

// These are canonical in-game sprites exposed as the lead images on the
// community-maintained Sally Face Wiki. They replace the earlier generated
// likenesses so hair, clothing, proportions, and character identity match the
// shipped game. Source page URLs are recorded in src/data/content-sources.json.
const characters = [
  { output: "sal-fisher-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/d/d8/Sal_Teen_Sprite.png/revision/latest?cb=20190718221306", cropHeight: 300 },
  { output: "larry-johnson-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/a/a1/Larry-0.png/revision/latest?cb=20170713193107", cropHeight: 220 },
  { output: "ashley-campbell-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/2/2b/Ash_Teen_Sprite.png/revision/latest?cb=20190723064604", cropHeight: 310 },
  { output: "travis-phelps-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/e/ea/Travis_Sprite.png/revision/latest?cb=20190725065524", cropHeight: 310 },
  { output: "todd-morrison-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/8/8b/Todd_Teen_Sprite.png/revision/latest?cb=20190725065524", cropHeight: 310 },
  { output: "henry-fisher-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/a/a3/HenryFisher.png/revision/latest?cb=20241022004026", cropHeight: 310 },
  { output: "lisa-johnson-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/e/e2/Lisa_Johnson.png/revision/latest?cb=20241022012350", cropHeight: 330 },
  { output: "megan-holmes-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/1/16/SalSpriteAtlasTexture-ghostGirl-1024x1024-fmt12.tex.png/revision/latest?cb=20180319132004", cropHeight: 205 },
  { output: "charley-mansfield-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/d/d2/Char.png/revision/latest?cb=20170713200231", cropHeight: 455 },
  { output: "gizmo-canonical.webp", url: "https://static.wikia.nocookie.net/sally-face/images/7/7a/Gizmo-Ep-4.png/revision/latest?cb=20190308091511", cropHeight: 242, position: "centre" },
];

for (const character of characters) {
  const response = await fetch(character.url, { headers: { "User-Agent": "SallyFaceGuide/1.0 (asset verification)" } });
  if (!response.ok) throw new Error(`Failed to fetch ${character.url}: ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Missing dimensions for ${character.output}`);

  const cropHeight = Math.min(character.cropHeight, metadata.height);
  const destination = path.join(root, "public/images/characters", character.output);
  await mkdir(path.dirname(destination), { recursive: true });

  await sharp(buffer)
    .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
    .resize(900, 900, {
      fit: "contain",
      position: character.position ?? "north",
      background: { r: 7, g: 11, b: 10, alpha: 1 },
    })
    .webp({ quality: 88, smartSubsample: true })
    .toFile(destination);

  console.log(`Saved canonical sprite portrait: ${character.output}`);
}

const verifiedScenes = [
  {
    output: "public/images/home/sally-face-evidence-workshop-official.webp",
    url: "https://images.squarespace-cdn.com/content/v1/6a514cd3409b7a3015ada448/000f1837-58e0-418e-b9e7-3153c163bb42/ep4_03.png",
    width: 1600,
    height: 900,
  },
  {
    output: "public/images/episodes/episode-5-memories-and-dreams-official.webp",
    url: "https://static.wikia.nocookie.net/sally-face/images/b/bb/Sally_Face_Memories_and_Dreams.jpg/revision/latest?cb=20191106222732",
    width: 1280,
    height: 720,
  },
];

for (const scene of verifiedScenes) {
  const response = await fetch(scene.url, { headers: { "User-Agent": "SallyFaceGuide/1.0 (asset verification)" } });
  if (!response.ok) throw new Error(`Failed to fetch ${scene.url}: ${response.status}`);
  const destination = path.join(root, scene.output);
  await mkdir(path.dirname(destination), { recursive: true });
  await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize(scene.width, scene.height, { fit: "cover", position: "centre" })
    .webp({ quality: 86, smartSubsample: true })
    .toFile(destination);
  console.log(`Saved verified scene: ${scene.output}`);
}
