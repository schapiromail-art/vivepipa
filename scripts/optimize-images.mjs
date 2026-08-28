/**
 * Otimiza renders novos para a landing.
 *
 * Jogue os arquivos originais (PNG/JPG, do tamanho que vierem) em `assets-raw/`
 * e rode `npm run images`. Cada um vira um WebP de no máximo 1600 px em
 * `public/img/`, e o script imprime a linha pronta para colar em
 * `src/data/galeria.ts` — com width/height, que é o que evita o CLS.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IN = "assets-raw";
const OUT = "public/img";
const MAX_WIDTH = 1600;
const QUALITY = 74;

if (!fs.existsSync(IN)) {
  console.error(`Nada a fazer: crie a pasta ${IN}/ e coloque as imagens lá.`);
  process.exit(0);
}
fs.mkdirSync(OUT, { recursive: true });

const slug = (f) =>
  path
    .basename(f, path.extname(f))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const arquivos = fs.readdirSync(IN).filter((f) => /\.(png|jpe?g|webp|tiff?)$/i.test(f));

for (const f of arquivos) {
  const nome = `${slug(f)}.webp`;
  const info = await sharp(path.join(IN, f))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(path.join(OUT, nome));

  console.log(
    `{ src: "/img/${nome}", w: ${info.width}, h: ${info.height} },`.padEnd(56) +
      `// ${(info.size / 1024).toFixed(0)} KB`
  );
}

console.log(`\n${arquivos.length} imagem(ns) otimizada(s) em ${OUT}/`);
