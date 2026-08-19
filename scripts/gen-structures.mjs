// Sinh hình công thức cấu tạo bằng RDKit (chuẩn IUPAC, CoordGen, đầy đủ lập thể).
// Đây là ĐỒ NGHỀ BUILD — không nằm trong app. Chạy khi thêm/sửa chất:
//     npm run struct
// Kết quả:
//   - src/generated/structures.ts  → app import (đã cam kết vào git, CI không cần RDKit)
//   - structure-review.html        → trang tổng để giáo viên duyệt một lượt (không cam kết)

import initRDKitModule from '@rdkit/rdkit';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const wasmPath = join(root, 'node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm');

const SMILES = JSON.parse(readFileSync(join(root, 'src/data/smiles.json'), 'utf8'));

// Làm sạch SVG của RDKit để nhúng vào app:
// - bỏ khai báo XML/DOCTYPE
// - nét carbon/đen -> currentColor (tự hợp nền tối & sáng); giữ màu nguyên tố
// - bỏ nền trắng, cho responsive (viewBox + 100%)
function clean(svg) {
  svg = svg
    .replace(/<\?xml[^>]*\?>/i, '')
    .replace(/<!DOCTYPE[^>]*>/i, '')
    .replace(/#000000/gi, 'currentColor')
    .replace(/(stroke|fill):\s*#000\b/gi, '$1:currentColor')
    .replace(/<rect[^>]*fill=['"]#FFFFFF['"][^>]*\/>/gi, '');
  // dựng lại thẻ <svg> gốc: giữ viewBox, cho co giãn
  svg = svg.replace(/<svg([^>]*)>/i, (_m, attrs) => {
    const vb = (attrs.match(/viewBox=['"][^'"]*['"]/i) || [''])[0];
    return `<svg xmlns="http://www.w3.org/2000/svg" ${vb} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
  });
  return svg.trim();
}

const RDKit = await initRDKitModule({
  locateFile: () => wasmPath,
  wasmBinary: readFileSync(wasmPath),
});
console.log('RDKit', RDKit.version(), '— sinh', Object.keys(SMILES).length, 'hình…');
RDKit.prefer_coordgen(true);

const svgs = {};
const reviewCards = [];
let ok = 0;
let fail = 0;
for (const [formula, smiles] of Object.entries(SMILES)) {
  try {
    const mol = RDKit.get_mol(smiles);
    if (!mol || !mol.is_valid()) throw new Error('SMILES không hợp lệ');

    // Đếm nguyên tử nặng (dòng đếm của molblock: 3 ký tự đầu dòng thứ 4).
    // Chất nhỏ (≤ 2 nguyên tử nặng) thì BUNG H tường minh cho đúng công thức
    // cấu tạo kiểu SGK (CH4 ra chữ thập, H2O ra H–O–H…).
    const heavy = parseInt(mol.get_molblock().split('\n')[3].slice(0, 3).trim(), 10);
    let drawMol = mol;
    let expanded = null;
    if (heavy <= 2) {
      const mb = mol.add_hs();
      if (typeof mb === 'string' && mb.length) {
        expanded = RDKit.get_mol(mb);
        if (expanded && expanded.is_valid()) drawMol = expanded;
      }
    }

    const details = {
      width: 300,
      height: 230,
      backgroundColour: [0, 0, 0, 0],
      bondLineWidth: 1.4,
      addStereoAnnotation: true, // đầy đủ lập thể (R/S + nêm/dập)
    };
    const svg = clean(drawMol.get_svg_with_highlights(JSON.stringify(details)));
    if (expanded) expanded.delete();
    mol.delete();
    svgs[formula] = svg;
    reviewCards.push(
      `<div class="card"><div class="t">${formula}<span>${smiles}</span></div><div class="s">${svg}</div></div>`,
    );
    ok++;
  } catch (e) {
    console.warn('  ✗', formula, '-', e.message);
    fail++;
  }
}

// 1) Module cho app
mkdirSync(join(root, 'src/generated'), { recursive: true });
const ts = `// TỰ ĐỘNG SINH bởi scripts/gen-structures.mjs — ĐỪNG sửa tay.
// Nguồn: src/data/smiles.json. Sinh lại: npm run struct
export const STRUCTURE_SVGS: Record<string, string> = ${JSON.stringify(svgs, null, 0)};

export const hasStructure = (formula: string): boolean =>
  Object.prototype.hasOwnProperty.call(STRUCTURE_SVGS, formula);
`;
writeFileSync(join(root, 'src/generated/structures.ts'), ts);

// 2) Trang tổng để duyệt
const review = `<!doctype html><meta charset="utf-8"><title>Duyệt hình cấu tạo</title>
<style>
  body{background:#0a0e14;color:#e2e8f0;font-family:system-ui;margin:0;padding:24px}
  h1{font-size:18px} .sub{color:#94a3b8;font-size:13px;margin-bottom:16px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
  .card{background:#151b24;border:1px solid #26313f;border-radius:12px;padding:10px}
  .t{font-size:13px;color:#e2e8f0;font-weight:600;margin-bottom:6px}
  .t span{display:block;color:#64748b;font-size:10px;font-weight:400;word-break:break-all}
  .s{color:#e2e8f0;height:170px}
  svg{max-width:100%;height:100%}
</style>
<h1>Duyệt hình công thức cấu tạo — ${ok} chất</h1>
<div class="sub">Sinh bằng RDKit (đầy đủ lập thể). Soi một lượt, thấy chất nào sai thì báo formula.</div>
<div class="grid">${reviewCards.join('\n')}</div>`;
writeFileSync(join(root, 'structure-review.html'), review);

console.log(`Xong: ${ok} hình → src/generated/structures.ts` + (fail ? `, ${fail} lỗi` : ''));
console.log('Trang duyệt: structure-review.html');
