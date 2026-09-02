import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [heroSource, castSource, supportingCastSource] = process.argv.slice(2);

if (!heroSource || !castSource) {
  throw new Error("Usage: node scripts/process-generated-assets.mjs <hero.png> <cast-sheet.png> [supporting-cast-sheet.png]");
}

const root = process.cwd();
// Generated likenesses are useful only as design drafts. Live site images use
// verified press-kit artwork and canonical in-game sprites, so this script
// deliberately writes outside the public site asset directories.
const draftDirectory = path.join(root, "public/images/generated-drafts");
const homeDirectory = path.join(draftDirectory, "home");
const characterDirectory = path.join(draftDirectory, "characters");

await mkdir(homeDirectory, { recursive: true });
await mkdir(characterDirectory, { recursive: true });

await sharp(heroSource)
  .resize(1920, 1080, { fit: "cover", position: "centre" })
  .webp({ quality: 84, smartSubsample: true })
  .toFile(path.join(homeDirectory, "sally-face-detective-board.webp"));

const castImage = sharp(castSource);
const metadata = await castImage.metadata();
const width = metadata.width ?? 0;
const height = metadata.height ?? 0;

if (!width || !height) {
  throw new Error("Could not read generated character sheet dimensions.");
}

const names = ["sal-fisher", "larry-johnson", "ashley-campbell", "travis-phelps", "todd-morrison"];
const top = Math.round(height * 0.085);
const cropHeight = Math.round(height * 0.83);

for (const [index, name] of names.entries()) {
  const left = Math.round((width / names.length) * index);
  const nextLeft = Math.round((width / names.length) * (index + 1));

  await sharp(castSource)
    .extract({ left, top, width: nextLeft - left, height: cropHeight })
    .resize(600, 760, { fit: "cover", position: "centre" })
    .webp({ quality: 84, smartSubsample: true })
    .toFile(path.join(characterDirectory, `${name}.webp`));
}

if (supportingCastSource) {
  const supportingMetadata = await sharp(supportingCastSource).metadata();
  const supportingWidth = supportingMetadata.width ?? 0;
  const supportingHeight = supportingMetadata.height ?? 0;

  if (!supportingWidth || !supportingHeight) {
    throw new Error("Could not read generated supporting character sheet dimensions.");
  }

  const supportingNames = ["henry-fisher", "lisa-johnson", "megan-holmes", "charley-mansfield", "gizmo"];
  const supportingTop = Math.round(supportingHeight * 0.085);
  const supportingCropHeight = Math.round(supportingHeight * 0.83);

  for (const [index, name] of supportingNames.entries()) {
    const left = Math.round((supportingWidth / supportingNames.length) * index);
    const nextLeft = Math.round((supportingWidth / supportingNames.length) * (index + 1));

    await sharp(supportingCastSource)
      .extract({ left, top: supportingTop, width: nextLeft - left, height: supportingCropHeight })
      .resize(600, 760, { fit: "cover", position: "centre" })
      .webp({ quality: 84, smartSubsample: true })
      .toFile(path.join(characterDirectory, `${name}.webp`));
  }
}

console.log("Saved generated reference drafts. They are not used by the live site.");
