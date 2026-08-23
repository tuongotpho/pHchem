// Sinh hình công thức cấu tạo bằng RDKit (chuẩn IUPAC, CoordGen, đầy đủ lập thể).
// Đây là ĐỒ NGHỀ BUILD — không nằm trong app. Chạy khi thêm/sửa chất:
//     npm run struct
// Kết quả:
//   - src/generated/structures.ts  → app import (cam kết vào git, CI không cần RDKit)
//   - structure-review.html        → trang tổng để duyệt một lượt (không cam kết)
//
// TỰ KIỂM — 5 lớp, xem báo cáo in ra cuối lần chạy:
//   1. Đếm nguyên tử : công thức khai báo phải khớp SMILES.
//   2. Đối chứng cấu tạo : mỗi chất có đồng phân được viết tay LẦN HAI theo cách
//      khác trong references.mjs; hai cách phải quy về cùng một mã InChI.
//      Đây là lớp bắt lỗi "nối dây sai" mà phép đếm nguyên tử không thấy.
//   3. Đối chiếu nguồn ngoài : chất có tâm bất đối được so mã InChI với chuỗi
//      chép từ PubChem. Lớp này kiểm cả phân tử, không phụ thuộc hiểu biết
//      của người viết dữ liệu.
//   4. Luật amino axit : mọi amino axit trong protein phải là dạng L —
//      tức tâm alpha là (S), riêng xistein là (R).
//   5. Tâm lập thể bỏ trống : chất có tâm bất đối mà chưa khai chiều xoay.

import initRDKitModule from '@rdkit/rdkit';
import { REFERENCES, VERIFIED_INCHI, ALLOW_UNDEFINED_STEREO } from './references.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const wasmPath = join(root, 'node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm');

const SMILES = JSON.parse(readFileSync(join(root, 'src/data/smiles.json'), 'utf8'));

// ---------- Đếm nguyên tố từ chuỗi công thức ----------
// Hiểu ngoặc lồng, muối ngậm nước (dấu chấm + hệ số), vd Ca(OH)2, CuSO4.5H2O
function parseFormula(str) {
  const total = {};
  for (const seg of str.split(/[.·*]/).filter(Boolean)) {
    const m = seg.match(/^(\d+)(.+)$/);
    const mult = m && /[A-Z(]/.test(m[2][0]) ? parseInt(m[1], 10) : 1;
    const body = m && /[A-Z(]/.test(m[2][0]) ? m[2] : seg;
    const c = parseSegment(body);
    for (const k in c) total[k] = (total[k] || 0) + c[k] * mult;
  }
  return total;
}

function parseSegment(s) {
  let i = 0;
  function group() {
    const out = {};
    while (i < s.length) {
      const ch = s[i];
      if (ch === '(' || ch === '[') {
        i++;
        const inner = group();
        i++; // bỏ dấu đóng
        const n = num();
        for (const k in inner) out[k] = (out[k] || 0) + inner[k] * n;
      } else if (ch === ')' || ch === ']') {
        break;
      } else if (/[A-Z]/.test(ch)) {
        let sym = s[i++];
        while (i < s.length && /[a-z]/.test(s[i])) sym += s[i++];
        out[sym] = (out[sym] || 0) + num();
      } else {
        i++; // bỏ ký tự lạ
      }
    }
    return out;
  }
  function num() {
    let d = '';
    while (i < s.length && /\d/.test(s[i])) d += s[i++];
    return d === '' ? 1 : parseInt(d, 10);
  }
  return group();
}

// Đếm nguyên tố từ molblock đã bung hết H (V2000).
// BỎ QUA nguyên tử giả (R hoặc *): với polime ta chỉ vẽ MỘT MẮT XÍCH, hai đầu
// nối để hở bằng nguyên tử giả cho thấy mạch còn kéo dài. Đầu nối không phải
// nguyên tố nên không được tính vào công thức.
function countFromMolblock(mb) {
  const lines = mb.split('\n');
  const nAtoms = parseInt(lines[3].slice(0, 3).trim(), 10);
  const out = {};
  for (let k = 0; k < nAtoms; k++) {
    const sym = lines[4 + k].trim().split(/\s+/)[3];
    if (sym === 'R' || sym === '*' || sym === 'R#') continue;
    out[sym] = (out[sym] || 0) + 1;
  }
  return out;
}

const sameCounts = (a, b) => {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if ((a[k] || 0) !== (b[k] || 0)) return false;
  return true;
};

const fmt = (c) =>
  Object.keys(c)
    .sort()
    .map((k) => k + (c[k] > 1 ? c[k] : ''))
    .join('');

// ---------- Quét thư viện để bắt SMILES mồ côi ----------
function libraryKeys() {
  const keys = new Set();
  for (const f of readdirSync(join(root, 'src/data'))) {
    if (!/^formulas\..*\.ts$/.test(f)) continue;
    const src = readFileSync(join(root, 'src/data', f), 'utf8');
    for (const line of src.split('\n')) {
      const id = line.match(/\bid:\s*'([^']+)'/);
      const fo = line.match(/\bformula:\s*'([^']+)'/);
      if (id) keys.add(id[1]);
      else if (fo) keys.add(fo[1]);
    }
  }
  return keys;
}

// ---------- Làm sạch SVG để nhúng vào app ----------
function clean(svg) {
  svg = svg
    .replace(/<\?xml[^>]*\?>/i, '')
    .replace(/<!DOCTYPE[^>]*>/i, '')
    .replace(/#000000/gi, 'currentColor')
    .replace(/(stroke|fill):\s*#000\b/gi, '$1:currentColor')
    .replace(/<rect[^>]*fill=['"]#FFFFFF['"][^>]*\/>/gi, '');
  // RÀO CHẮN. Hình này được nhúng thẳng vào trang bằng dangerouslySetInnerHTML,
  // nên trong đó tuyệt đối không được có mã chạy được. Hiện RDKit không sinh
  // ra thứ gì như vậy, nhưng nguồn của nó là smiles.json — ai sửa file đó,
  // hoặc bản RDKit sau đổi cách vẽ, thì rào này vẫn đứng. Rẻ hơn nhiều so với
  // việc phải rà lại về sau.
  svg = svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<script[^>]*\/>/gi, '')
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '');
  svg = svg.replace(/<svg([^>]*)>/i, (_m, attrs) => {
    const vb = (attrs.match(/viewBox=['"][^'"]*['"]/i) || [''])[0];
    return `<svg xmlns="http://www.w3.org/2000/svg" ${vb} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
  });
  return svg.trim();
}

// ---------- Rút phần CẤU TẠO + HÌNH HỌC NỐI ĐÔI của mã InChI ----------
// InChI chia thành nhiều lớp ngăn bởi dấu "/". Ta GIỮ lớp b (cis/trans quanh
// nối đôi) vì vẽ nhầm cis thành trans là sai hẳn chất — axit oleic là ví dụ.
// Chỉ BỎ các lớp t, m, s (chiều xoay tâm bất đối) vì phần đó đã có bảng R/S lo.
const constitutionLayer = (inchi) =>
  inchi
    .split('/')
    .filter((layer) => !/^[tms]/.test(layer))
    .join('/');

// Chuỗi R/S theo thứ tự nguyên tử, vd "RSRSS". Dấu ? = tâm chưa khai chiều xoay.
function cipInfo(mol) {
  let tags;
  try {
    tags = JSON.parse(mol.get_stereo_tags()).CIP_atoms || [];
  } catch {
    return { chain: '', undefinedCount: 0 };
  }
  const sorted = [...tags].sort((a, b) => a[0] - b[0]);
  return {
    chain: sorted.map((x) => x[1].replace(/[()]/g, '')).join(''),
    undefinedCount: sorted.filter((x) => x[1].includes('?')).length,
  };
}

// ---------- Chạy ----------
const RDKit = await initRDKitModule({
  locateFile: () => wasmPath,
  wasmBinary: readFileSync(wasmPath),
});
const entries = Object.entries(SMILES);
console.log(`RDKit ${RDKit.version()} — xử lý ${entries.length} chất…`);
RDKit.prefer_coordgen(true);

const LIB = libraryKeys();
const svgs = {};
const cards = [];
const errors = [];
const mismatches = [];
const orphans = [];
const broken = [];
const fallbacks = [];
const constiBad = [];   // lệch bảng đối chứng cấu tạo
const inchiBad = [];    // lệch mã InChI chuẩn lấy từ PubChem
const aminoBad = [];    // vi phạm luật amino axit dạng L
const noStereo = [];    // còn tâm lập thể bỏ trống

// Bộ nhận dạng amino axit alpha: N–C(H)(nhánh cacbon)–COOH
const AA_QUERY = RDKit.get_qmol('[NX3;H1,H2][CX4H1]([#6])[CX3](=O)[OX2H1]');
// Trong protein mọi amino axit đều là dạng L → tâm alpha là (S).
// Riêng xistein là (R): nhánh CH2–S đổi thứ tự ưu tiên, chứ chiều không gian
// vẫn y hệt các chất kia.
const AA_EXPECT_R = new Set(['C3H7NO2S']);

for (const [key, smiles] of entries) {
  if (!LIB.has(key)) orphans.push(key);
  try {
    const mol = RDKit.get_mol(smiles);
    if (!mol || !mol.is_valid()) throw new Error('SMILES không hợp lệ');

    // molblock có H tường minh → đếm nguyên tố → đối chiếu công thức khai báo
    const mbH = mol.add_hs();
    const actual = countFromMolblock(typeof mbH === 'string' && mbH ? mbH : mol.get_molblock());
    const declared = parseFormula(key.replace(/-[a-z]+$/, ''));
    if (!sameCounts(declared, actual)) {
      mismatches.push(`${key}: khai báo ${fmt(declared)} ≠ SMILES ${fmt(actual)}`);
    }

    // Các phép kiểm chạy trên BẢN SAO. Lý do: get_stereo_tags() gán lại nhãn
    // lập thể lên phân tử, làm bản vẽ xê dịch. Tách ra để khâu kiểm không bao
    // giờ đụng vào hình — kiểm là kiểm, vẽ là vẽ.
    const probe = RDKit.get_mol(smiles);

    // --- Lớp 2: đối chứng cấu tạo với bản viết tay lần hai ---
    if (REFERENCES[key]) {
      const ref = RDKit.get_mol(REFERENCES[key]);
      if (!ref || !ref.is_valid()) {
        constiBad.push(`${key}: SMILES đối chứng trong references.mjs không hợp lệ`);
      } else {
        const a = constitutionLayer(probe.get_inchi());
        const b = constitutionLayer(ref.get_inchi());
        if (a !== b) constiBad.push(`${key}:
       smiles.json → ${a}
       đối chứng  → ${b}`);
      }
      if (ref) ref.delete();
    }

    // --- Lớp 3: đối chiếu mã InChI với nguồn ngoài ---
    const cip = cipInfo(probe);
    if (VERIFIED_INCHI[key]) {
      const got = probe.get_inchi();
      if (got !== VERIFIED_INCHI[key]) {
        inchiBad.push(
          `${key} (R/S đang là ${cip.chain || 'không có'}):` +
            `
       ta có  → ${got}` +
            `
       chuẩn  → ${VERIFIED_INCHI[key]}`,
        );
      }
    }

    // --- Lớp 5: tâm lập thể bỏ trống ---
    if (cip.undefinedCount && !ALLOW_UNDEFINED_STEREO.has(key)) {
      noStereo.push(`${key}: ${cip.undefinedCount} tâm chưa khai chiều xoay`);
    }

    // --- Lớp 4: luật amino axit dạng L ---
    const aaHit = JSON.parse(probe.get_substruct_match(AA_QUERY) || '{}');
    if (aaHit.atoms) {
      const alphaIdx = aaHit.atoms[1];
      let tags = [];
      try {
        tags = JSON.parse(probe.get_stereo_tags()).CIP_atoms || [];
      } catch { /* không có tâm nào */ }
      const found = tags.find((x) => x[0] === alphaIdx);
      if (found) {
        const got = found[1].replace(/[()]/g, '');
        const want = AA_EXPECT_R.has(key) ? 'R' : 'S';
        if (got !== want) {
          aminoBad.push(
            `${key}: tâm alpha là (${got}) — đây là dạng D. Dạng L phải là (${want}).`,
          );
        }
      }
    }

    probe.delete();

    // Chất nhỏ (≤2 nguyên tử nặng) bung H cho đúng kiểu SGK
    const heavy = parseInt(mol.get_molblock().split('\n')[3].slice(0, 3).trim(), 10);
    let drawMol = mol;
    let expanded = null;
    if (heavy <= 2 && typeof mbH === 'string' && mbH) {
      expanded = RDKit.get_mol(mbH);
      if (expanded && expanded.is_valid()) drawMol = expanded;
    }

    const details = {
      width: 300,
      height: 230,
      backgroundColour: [0, 0, 0, 0],
      bondLineWidth: 1.4,
      addStereoAnnotation: true,
    };
    let svg = clean(drawMol.get_svg_with_highlights(JSON.stringify(details)));

    // Bắt tọa độ hỏng (NaN). CoordGen bó tay với vài ca lạ (vd H2 không có
    // nguyên tử nặng nào) → thử lại bằng bộ xếp tọa độ mặc định của RDKit.
    if (/nan/i.test(svg)) {
      RDKit.prefer_coordgen(false);
      const retry = RDKit.get_mol(smiles);
      svg = clean(retry.get_svg_with_highlights(JSON.stringify(details)));
      retry.delete();
      RDKit.prefer_coordgen(true);
      if (!/nan/i.test(svg)) fallbacks.push(key);
    }

    if (expanded) expanded.delete();
    mol.delete();
    if (/nan/i.test(svg)) {
      broken.push(key);
      continue;
    }

    svgs[key] = svg;
    cards.push(
      `<div class="card"><div class="t">${key}<span>${smiles}</span></div><div class="s">${svg}</div></div>`,
    );
  } catch (e) {
    errors.push(`${key}: ${e.message}`);
  }
}

// 1) Hai module cho app:
//    - structures.ts      : chỉ DANH MỤC khóa (nhẹ) — dùng để lọc & gắn nhãn "có hình"
//    - structures-svgs.ts : kho SVG (nặng) — chỉ tải khi người dùng mở xem hình
mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(
  join(root, 'src/generated/structures.ts'),
  `// TỰ ĐỘNG SINH bởi scripts/gen-structures.mjs — ĐỪNG sửa tay.
// Danh mục chất có hình cấu tạo. Kho hình nằm ở structures-svgs.ts (tải riêng).
const KEYS = new Set(${JSON.stringify(Object.keys(svgs))});

export const hasStructure = (key: string): boolean => KEYS.has(key);
export const STRUCTURE_COUNT = KEYS.size;
`,
);
writeFileSync(
  join(root, 'src/generated/structures-svgs.ts'),
  `// TỰ ĐỘNG SINH bởi scripts/gen-structures.mjs — ĐỪNG sửa tay.
// Kho hình SVG; import động để không làm nặng lần tải đầu.
export const STRUCTURE_SVGS: Record<string, string> = ${JSON.stringify(svgs)};
`,
);

// 2) Trang tổng để duyệt
writeFileSync(
  join(root, 'structure-review.html'),
  `<!doctype html><meta charset="utf-8"><title>Duyệt hình cấu tạo</title>
<style>
  body{background:#0a0e14;color:#e2e8f0;font-family:system-ui;margin:0;padding:24px}
  h1{font-size:18px} .sub{color:#94a3b8;font-size:13px;margin-bottom:16px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
  .card{background:#151b24;border:1px solid #26313f;border-radius:12px;padding:8px}
  .t{font-size:12px;color:#e2e8f0;font-weight:600;margin-bottom:4px}
  .t span{display:block;color:#64748b;font-size:9px;font-weight:400;word-break:break-all}
  .s{color:#e2e8f0;height:150px} svg{max-width:100%;height:100%}
</style>
<h1>Duyệt hình công thức cấu tạo — ${Object.keys(svgs).length} chất</h1>
<div class="sub">Sinh bằng RDKit (đầy đủ lập thể). Soi một lượt; thấy chất nào sai thì báo tên khóa.</div>
<div class="grid">${cards.join('\n')}</div>`,
);

// 3) Báo cáo
const block = (title, list) => {
  if (!list.length) return;
  console.log(`\n${title} (${list.length}):`);
  list.forEach((m) => console.log('   ' + m));
};

console.log(`\n✓ Sinh ${Object.keys(svgs).length} hình → src/generated/structures.ts`);
console.log(`✓ Trang duyệt: structure-review.html`);

const okFormula = entries.length - mismatches.length - errors.length;
const nRef = Object.keys(REFERENCES).length;
const nInchi = Object.keys(VERIFIED_INCHI).length;

console.log(`\n— TỰ KIỂM —`);
console.log(`1. Đếm nguyên tử         : ${okFormula}/${entries.length}`);
console.log(`2. Đối chứng cấu tạo     : ${nRef - constiBad.length}/${nRef} chất có đồng phân (kèm cis/trans)`);
console.log(`3. Khớp InChI của PubChem: ${nInchi - inchiBad.length}/${nInchi} chất có tâm bất đối`);
console.log(`4. Luật amino axit L     : ${aminoBad.length ? aminoBad.length + ' chất SAI' : 'đạt'}`);
console.log(`5. Tâm lập thể bỏ trống  : ${noStereo.length ? noStereo.length + ' chất' : 'không có'}`);

block('✗ LỆCH CÔNG THỨC', mismatches);
block('✗ SMILES LỖI', errors);
block('✗ LỆCH CẤU TẠO so với bản đối chứng', constiBad);
block('✗ LỆCH MÃ InChI CHUẨN', inchiBad);
block('✗ SAI LUẬT AMINO AXIT DẠNG L', aminoBad);
block('✗ TỌA ĐỘ HỎNG, đã bỏ qua', broken);
block('⚠ CÒN TÂM LẬP THỂ BỎ TRỐNG', noStereo);
block('⚠ SMILES không khớp chất nào trong thư viện', orphans);

if (fallbacks.length) {
  console.log(`\nℹ Phải dùng bộ xếp tọa độ dự phòng (${fallbacks.length}): ${fallbacks.join(', ')}`);
}

// Chất chưa có bản đối chứng — chưa được kiểm lớp 2. Nói rõ để khỏi tưởng đã kiểm hết.
const unchecked = entries.filter(([k]) => !REFERENCES[k]).length;
console.log(`\nℹ ${unchecked} chất chưa có bản đối chứng cấu tạo (phần lớn là chất chỉ có một cấu tạo duy nhất).`);

const fatal =
  mismatches.length + errors.length + constiBad.length + inchiBad.length + aminoBad.length + broken.length;
if (fatal === 0 && !orphans.length) {
  console.log('\nSạch — không có lỗi.');
} else if (fatal > 0) {
  console.log(`\n✗ CÓ ${fatal} LỖI PHẢI SỬA.`);
  process.exitCode = 1;
}
