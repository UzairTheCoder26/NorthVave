/** Resize Microlink PNGs to WebP for faster homepage loads. */
import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..", "public", "portfolio-thumbnails");

async function main() {
  await mkdir(dir, { recursive: true });
  const files = await readdir(dir);
  for (const f of files) {
    if (!f.endsWith(".png")) continue;
    const base = f.replace(/\.png$/i, "");
    const inp = join(dir, f);
    const buf = await readFile(inp);
    const webp = await sharp(buf)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
    await writeFile(join(dir, `${base}.webp`), webp);
    await rm(inp);
    console.log(`${f} -> ${base}.webp (${(webp.length / 1024).toFixed(1)} KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
