import sharp from 'sharp';
import path from 'node:path';

async function createCleanBg() {
  const poster = path.join('promo', 'phchem_table_poster.jpg');
  const cleanOut = path.join('promo', 'phchem_table_bg_clean.jpg');

  // Height 1376, top 0..250 contains "INTERACTIVE PERIODIC TABLE OF CHEMICAL ELEMENTS"
  // We cover it smoothly with dark space background #040711
  const patchSvg = Buffer.from(`
    <svg width="768" height="1376" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#040711" stop-opacity="1" />
          <stop offset="18%" stop-color="#040711" stop-opacity="1" />
          <stop offset="22%" stop-color="#040711" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="768" height="1376" fill="url(#topFade)" />
    </svg>
  `);

  await sharp(poster)
    .composite([{ input: patchSvg, top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(cleanOut);

  console.log('✅ Clean BG created at:', cleanOut);
}

createCleanBg().catch(console.error);
