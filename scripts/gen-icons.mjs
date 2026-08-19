// Sinh icon PNG cho PWA từ SVG (chạy: node scripts/gen-icons.mjs)
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/icons', { recursive: true });

const bg = '#0f141b';
const accent = '#2dd4bf';

// Icon thường (bình tam giác — phòng thí nghiệm)
const flask = (size, pad) => {
  const s = size;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="${pad ? 0 : 14}" fill="${bg}"/>
    <path d="M26 12h12M28 12v14L18 44a4 4 0 0 0 3.5 6h21A4 4 0 0 0 46 44L36 26V12"
          fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 34h18" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="28" cy="41" r="2" fill="#5eead4"/>
    <circle cx="36" cy="45" r="1.6" fill="#5eead4"/>
  </svg>`;
};

async function render(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
  console.log('✓', out);
}

// maskable: nền phủ kín, hình thu nhỏ vào giữa (safe zone)
const maskable = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${bg}"/>
  <g transform="translate(9 9) scale(0.72)">
    <path d="M26 12h12M28 12v14L18 44a4 4 0 0 0 3.5 6h21A4 4 0 0 0 46 44L36 26V12"
          fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 34h18" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
  </g>
</svg>`;

await render(flask(192), 192, 'public/icons/icon-192.png');
await render(flask(512), 512, 'public/icons/icon-512.png');
await render(maskable(512), 512, 'public/icons/icon-512-maskable.png');
console.log('Xong.');
