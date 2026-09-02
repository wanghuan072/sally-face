import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const response = await fetch("https://store.steampowered.com/api/appdetails?appids=541570&l=english");
if (!response.ok) throw new Error(`Steam app details request failed: ${response.status}`);

const payload = await response.json();
const screenshots = payload[541570]?.data?.screenshots;
if (!Array.isArray(screenshots) || screenshots.length === 0) throw new Error("Steam did not return screenshot data.");

const outputDir = path.resolve("public/images/scenes");
await mkdir(outputDir, { recursive: true });

for (const screenshot of screenshots) {
  const destination = path.join(outputDir, `steam-${String(screenshot.id).padStart(2, "0")}.webp`);
  try {
    await access(destination);
    continue;
  } catch {
    // Download only missing assets so interrupted runs can safely resume.
  }

  const asset = await fetch(screenshot.path_full);
  if (!asset.ok) throw new Error(`Could not download Steam screenshot ${screenshot.id}: ${asset.status}`);

  await sharp(Buffer.from(await asset.arrayBuffer()))
    .resize(1280, 720, { fit: "cover", position: "centre" })
    .webp({ quality: 84, smartSubsample: true })
    .toFile(destination);
}

const thumbnailWidth = 256;
const thumbnailHeight = 144;
const columns = 6;
const rows = Math.ceil(screenshots.length / columns);
const thumbnailLayers = await Promise.all(
  screenshots.map(async (screenshot, index) => {
    const id = String(screenshot.id).padStart(2, "0");
    const image = await sharp(path.join(outputDir, `steam-${id}.webp`))
      .resize(thumbnailWidth, thumbnailHeight, { fit: "cover" })
      .composite([
        {
          input: Buffer.from(`<svg width="46" height="26"><rect width="46" height="26" fill="#0a0a0a" fill-opacity=".8"/><text x="8" y="19" fill="#e9f5e8" font-size="16" font-family="sans-serif">${id}</text></svg>`),
          left: 0,
          top: 0,
        },
      ])
      .webp()
      .toBuffer();

    return { input: image, left: (index % columns) * thumbnailWidth, top: Math.floor(index / columns) * thumbnailHeight };
  }),
);

await sharp({
  create: {
    width: columns * thumbnailWidth,
    height: rows * thumbnailHeight,
    channels: 3,
    background: "#080b0b",
  },
})
  .composite(thumbnailLayers)
  .webp({ quality: 86 })
  .toFile(path.join(outputDir, "steam-contact-sheet.webp"));

console.log(`Saved ${screenshots.length} official Steam store screenshots.`);
