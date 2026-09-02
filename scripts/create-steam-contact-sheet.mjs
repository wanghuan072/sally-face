import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("public/images/scenes");
const images = (await readdir(outputDir))
  .filter((file) => /^steam-\d+\.webp$/.test(file))
  .sort();
const width = 256;
const height = 144;
const columns = 6;

const layers = await Promise.all(images.map(async (file, index) => {
  const label = file.match(/steam-(\d+)/)?.[1] ?? "";
  const thumbnail = await sharp(path.join(outputDir, file))
    .resize(width, height, { fit: "cover" })
    .composite([{
      input: Buffer.from(`<svg width="46" height="26"><rect width="46" height="26" fill="#0a0a0a" fill-opacity=".8"/><text x="8" y="19" fill="#e9f5e8" font-size="16" font-family="sans-serif">${label}</text></svg>`),
      left: 0,
      top: 0,
    }])
    .webp()
    .toBuffer();

  return { input: thumbnail, left: (index % columns) * width, top: Math.floor(index / columns) * height };
}));

await sharp({
  create: { width: columns * width, height: Math.ceil(images.length / columns) * height, channels: 3, background: "#080b0b" },
})
  .composite(layers)
  .webp({ quality: 86 })
  .toFile(path.join(outputDir, "steam-contact-sheet.webp"));

console.log(`Created contact sheet for ${images.length} official Steam screenshots.`);
