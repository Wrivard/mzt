import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.join(workspace, "artifacts/lavallee-construction");
const publicDir = path.join(root, "public");
const outputDir = path.join(publicDir, "images/optimized");
await mkdir(outputDir, { recursive: true });

// Retain every original. These are alternative encodings of the same photographs,
// with no crop, recoloring, or composition change.
const photos = [
  ...(await readdir(path.join(publicDir, "photos/mzt/client")))
    .filter((name) => name.endsWith(".webp"))
    .map((name) => `/photos/mzt/client/${name}`),
  "/photos/mzt/illustrations/deneigement-toiture.webp",
  "/photos/mzt/cuisine.jpg",
];
const manifest = {};
for (const source of photos) {
  const input = path.join(publicDir, source);
  const { width, height } = await sharp(input).metadata();
  const widths = [...new Set([640, 1280, width].filter((size) => size <= width))].sort((a, b) => a - b);
  const name = path.basename(source, path.extname(source));
  const variants = [];
  for (const size of widths) {
    const filename = `${name}-${size}.avif`;
    await sharp(input).resize({ width: size, withoutEnlargement: true })
      .avif({ quality: 65, effort: 6 }).toFile(path.join(outputDir, filename));
    variants.push(`/images/optimized/${filename} ${size}w`);
  }
  manifest[source] = { width, height, avif: variants.join(", ") };
}
await sharp(path.join(publicDir, "logo-mzt-2018.png"))
  .resize({ width: 512, withoutEnlargement: true })
  .webp({ lossless: true }).toFile(path.join(outputDir, "logo-mzt-512.webp"));
await sharp(path.join(publicDir, "logo-mzt-construction.png"))
  .resize({ width: 48, height: 48, fit: "contain", background: "#00000000" })
  .png().toFile(path.join(outputDir, "favicon-48.png"));
await writeFile(path.join(root, "src/data/image-variants.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated responsive AVIF alternatives for ${photos.length} existing photos, plus a compact logo and favicon.`);
