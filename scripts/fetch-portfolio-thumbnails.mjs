/**
 * Downloads homepage screenshots via Microlink, optimizes to WebP, saves under public/portfolio-thumbnails/.
 * Run from project root: npm run thumbnails:fetch
 */
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio-thumbnails");

/** slug -> live URL (must match DB seed URLs) */
const SITES = [
  ["everythingteeth", "https://everythingteeth.lovable.app/"],
  ["myoutreach", "https://myoutreach.lovable.app"],
  ["khaalis", "https://khaalis.lovable.app"],
  ["zarmeenaesthetics", "https://zarmeenaesthetics.lovable.app"],
  ["shindeeyecare", "https://shindeeyecare.lovable.app"],
  ["tulerhoney", "https://tulerhoney.lovable.app"],
  ["gurugramestate", "https://gurugramestatepvtltd.lovable.app"],
  ["harkaarivf", "https://harkaarivfandmaternity.lovable.app/"],
  ["rehmaniyaconnect", "https://rehmaniyaconnect.lovable.app"],
  ["smile-miami-magic", "https://smile-miami-magic.lovable.app/"],
  ["samvaad-growth-journey", "https://samvaad-growth-journey.lovable.app/"],
  ["maisonattire", "https://maisonattire.lovable.app"],
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function microlinkScreenshotUrl(pageUrl) {
  const api = `https://api.microlink.io/?url=${encodeURIComponent(pageUrl)}&screenshot=true&meta=false`;
  const res = await fetch(api);
  if (!res.ok) throw new Error(`Microlink meta failed ${res.status}: ${pageUrl}`);
  const json = await res.json();
  if (json.status !== "success" || !json.data?.screenshot?.url) {
    throw new Error(`No screenshot in response for ${pageUrl}: ${JSON.stringify(json).slice(0, 200)}`);
  }
  return json.data.screenshot.url;
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image fetch ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(outDir, { recursive: true });
  for (let i = 0; i < SITES.length; i++) {
    const [slug, pageUrl] = SITES[i];
    const outPath = join(outDir, `${slug}.webp`);
    try {
      const shotUrl = await microlinkScreenshotUrl(pageUrl);
      const raw = await downloadImage(shotUrl);
      const webp = await sharp(raw)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();
      await writeFile(outPath, webp);
      console.log(`OK ${slug} (${(webp.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`FAIL ${slug}:`, e.message);
      process.exitCode = 1;
    }
    if (i < SITES.length - 1) await delay(750);
  }
}

main();
