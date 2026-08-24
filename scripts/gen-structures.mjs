// Sinh hình công thức cấu tạo bằng RDKit (chuẩn IUPAC, CoordGen, đầy đủ lập thể).
// Đây là ĐỒ NGHỀ BUILD — không nằm trong app. Chạy khi thêm/sửa chất:
//     npm run struct
// Kết quả:
//   - public/hinh/*.svg            → mỗi chất một file hình (cam kết vào git)
//   - src/generated/structures.ts  → danh mục + tên file (cam kết vào git, CI không cần RDKit)
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
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
// Lõi đếm nguyên tử DÙNG CHUNG với app. Trước đây chỗ này chép lại một bản
// riêng — mà chính phép đối chiếu công thức ↔ SMILES ở dưới dựa vào nó, nên
// hai bản lệch nhau là phép kiểm mất hiệu lực mà không ai biết.
import { demNguyenTu } from '../src/lib/phanTichCongThuc.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const wasmPath = join(root, 'node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm');

const SMILES = JSON.parse(readFileSync(join(root, 'src/data/smiles.json'), 'utf8'));

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
    // Ô NỀN. RDKit luôn vẽ sẵn một <rect> phủ kín khung làm nền, tô màu
    // #00000000 — đen nhưng độ đục bằng 0, tức TRONG SUỐT HOÀN TOÀN. Nó không
    // vẽ ra gì hết, chỉ tốn chỗ. Bỏ đi.
    //
    // Luật cũ ở đây viết fill="#FFFFFF" dạng thuộc tính và thẻ tự đóng "/>" —
    // cả hai đều không đúng cách RDKit viết (nó dùng style='...' và
    // "<rect ...> </rect>"), nên suốt thời gian qua luật đó không bắt được ô
    // nền nào. Nay bắt theo đúng hình dạng thật, và CHỈ bỏ khi ô rỗng mà lại
    // trong suốt hoặc trắng — để lỡ bản RDKit sau đổi sang nền đục thì nó lòi
    // ra thành ô trắng nhìn thấy được, chứ không mất hình một cách lặng lẽ.
    .replace(
      /<rect\b[^>]*fill:\s*(?:#[0-9a-fA-F]{6}00|#FFFFFF)\b[^>]*>\s*<\/rect>/gi,
      '',
    )
    // Đổi màu đen sang currentColor để nét vẽ đi theo nền sáng/tối của app.
    //
    // Chốt (?![0-9a-fA-F]) là bắt buộc: mã màu tám chữ số như #00000000 có
    // #000000 nằm ngay ở đầu. Thiếu chốt thì nó bị cắt đôi thành
    // "currentColor00" — một màu KHÔNG tồn tại trong CSS. Lỗi ấy đã nằm im
    // trong kho hình ở 296 chỗ mà không ai thấy, đúng vì chỗ duy nhất dính nó
    // lại là ô nền trong suốt vừa bỏ ở trên. Giữ chốt kể cả khi ô nền đã đi:
    // mã màu tám chữ số có thể quay lại từ chỗ khác.
    .replace(/#000000(?![0-9a-fA-F])/gi, 'currentColor')
    .replace(/(stroke|fill):\s*#000\b/gi, '$1:currentColor')
    // NHÃN TỪNG NÉT. RDKit gắn class='bond-3 atom-2 atom-5' lên mỗi nét vẽ để
    // bên ngoài bắt được từng liên kết mà tô sáng hoặc bắt sự kiện. App này
    // không dùng tới — nhúng hình vào rồi thôi. 6.070 chỗ, 136 KB nằm không
    // trong kho. Ngày nào muốn tô sáng từng liên kết thì bỏ dòng này ra là
    // nhãn quay lại đủ.
    .replace(/\sclass='[^']*'/g, '')
    // Chú thích RDKit chèn giữa phần đầu và phần thân hình
    // (<!-- END OF HEADER -->). Không ai đọc, 296 bản.
    .replace(/<!--[\s\S]*?-->/g, '');
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
    const declared = demNguyenTu(key.replace(/-[a-z]+$/, ''));
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
        // BẪY: RDKit KHÔNG sinh được mã InChI cho phân tử có nguyên tử giả (*),
        // tức mọi polime — nó trả về chuỗi RỖNG. Hai chuỗi rỗng so nhau thì
        // bằng nhau, nên phép kiểm sẽ GẬT ĐẦU mà chẳng kiểm gì cả. Không chặn
        // thì ai đó thêm một polime vào bảng đối chứng sẽ tưởng đã được soi.
        if (!a || !b) {
          constiBad.push(
            `${key}: không so được cấu tạo — RDKit trả mã InChI rỗng ` +
              `(thường vì phân tử có nguyên tử giả * của polime). ` +
              `Hoặc gỡ khỏi references.mjs, hoặc viết đối chứng theo cách khác.`,
          );
        } else if (a !== b) {
          constiBad.push(`${key}:
       smiles.json → ${a}
       đối chứng  → ${b}`);
        }
      }
      if (ref) ref.delete();
    }

    // --- Lớp 3: đối chiếu mã InChI với nguồn ngoài ---
    const cip = cipInfo(probe);
    if (VERIFIED_INCHI[key]) {
      const got = probe.get_inchi();
      // Cùng cái bẫy như lớp 2: mã rỗng thì không so được, phải kêu lên.
      if (!got) {
        inchiBad.push(
          `${key}: RDKit trả mã InChI rỗng nên không đối chiếu được với nguồn ` +
            `ngoài (thường vì phân tử có nguyên tử giả * của polime).`,
        );
      } else if (got !== VERIFIED_INCHI[key]) {
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

// 1) Hình ra FILE RỜI trong public/hinh/, kèm MỘT module danh mục nhẹ cho app.
//
// VÌ SAO KHÔNG NHÉT CẢ KHO VÀO MỘT FILE .ts NHƯ TRƯỚC: gói đó nặng 1,68 MB và
// bị PWA nạp sẵn hết lúc cài — chiếm 73% toàn bộ gói cài, dù người dùng có xem
// hình hay không. Nay mỗi chất một file, tải khi xem, xem rồi thì nhớ luôn.
// Ai cần dùng ngoại tuyến thì bấm nút tải cả bộ trong trang Cài đặt.
//
// Tên file phải LÀM SẠCH: khóa chất có ngoặc, dấu chấm, ngoặc vuông —
// "Ca(OH)2", "CuSO4.5H2O", "K3[Fe(CN)6]". Ngoặc vuông là ký tự dành riêng
// trong địa chỉ web, có máy chủ tĩnh nuốt không trôi. Đổi hết sang gạch dưới.
const lamSachTen = (khoa) =>
  khoa.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

// TÊN FILE KÈM MÃ BĂM NỘI DUNG — "H2O.3f2a1b9c.svg".
//
// VÌ SAO CẦN: service worker đệm hình theo lối CacheFirst, tức đã có trong máy
// thì KHÔNG bao giờ hỏi lại mạng. Lối đó chỉ đúng khi sửa hình là đổi luôn tên
// file. Trước đây tên là "H2O.svg" và giữ nguyên mãi mãi, nên hôm nào sửa một
// hình vẽ sai thì người đã xem qua sẽ KHÔNG BAO GIỜ thấy bản sửa — hóa học sai
// nằm lại trên máy học sinh, mà không có cách nào gỡ. Nay nội dung đổi một nét
// là mã băm đổi, thành một địa chỉ khác hẳn, và bản mới về ngay.
//
// Tám ký tự hex là đủ: mã băm chỉ cần phân biệt các bản CỦA CÙNG MỘT CHẤT, mà
// phần tên chất vẫn đứng nguyên ở đầu.
const bamNoiDung = (noiDung) =>
  createHash('sha256').update(noiDung).digest('hex').slice(0, 8);

const TEN_FILE = {};
const daDung = new Map(); // tên viết thường -> khóa đã chiếm, để bắt trùng
for (const khoa of Object.keys(svgs).sort()) {
  let goc = lamSachTen(khoa);
  // CHỐNG TRÙNG, và so bằng CHỮ THƯỜNG. Lý do: máy Windows không phân biệt
  // hoa/thường tên file, Linux thì có. Hai chất ra hai tên chỉ khác hoa/thường
  // sẽ ĐÈ NHAU trên máy người viết mà vẫn chạy, rồi chết ở CI — hoặc tệ hơn,
  // chạy được cả hai nơi mà một chất hiện nhầm hình của chất kia.
  //
  // So phần GỐC thôi, chưa gắn mã băm: hai chất khác nhau mà ra cùng một gốc
  // tên thì phải tách ra, chứ không phải chờ mã băm cứu — mã băm khác nhau vẫn
  // là hai file, nhưng lúc đó tên chất đã lẫn lộn rồi.
  let n = 2;
  while (daDung.has(goc.toLowerCase())) goc = `${lamSachTen(khoa)}_${n++}`;
  daDung.set(goc.toLowerCase(), khoa);
  TEN_FILE[khoa] = `${goc}.${bamNoiDung(svgs[khoa])}`;
}

const thuMucHinh = join(root, 'public/hinh');
mkdirSync(thuMucHinh, { recursive: true });

// DỌN FILE THỪA trước khi ghi. Bỏ một chất khỏi smiles.json mà không dọn thì
// file hình cũ nằm lại trong public/ và vẫn theo lên bản thật mãi mãi.
const canCo = new Set(Object.values(TEN_FILE).map((t) => `${t}.svg`));
let daXoaThua = 0;
for (const f of readdirSync(thuMucHinh)) {
  if (f.endsWith('.svg') && !canCo.has(f)) {
    rmSync(join(thuMucHinh, f));
    daXoaThua++;
  }
}

let tongByteHinh = 0;
for (const [khoa, ten] of Object.entries(TEN_FILE)) {
  tongByteHinh += Buffer.byteLength(svgs[khoa], 'utf8');
  writeFileSync(join(thuMucHinh, `${ten}.svg`), svgs[khoa]);
}

mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(
  join(root, 'src/generated/structures.ts'),
  `// TỰ ĐỘNG SINH bởi scripts/gen-structures.mjs — ĐỪNG sửa tay.
//
// Danh mục chất có hình cấu tạo, kèm tên file hình của từng chất. Bản thân
// hình nằm ở public/hinh/*.svg, tải riêng từng cái khi người dùng mở xem.
//
// Tên file có dạng "H2O.3f2a1b9c" — phần sau dấu chấm là MÃ BĂM NỘI DUNG. Sửa
// hình là mã băm đổi, thành một địa chỉ khác hẳn, nên bản đã đệm trong máy
// người dùng không bao giờ che mất bản mới.
//
// Bảng này ghi TƯỜNG MINH chứ app KHÔNG thể tự tính lại: app không giữ nội
// dung hình nên không băm được, và quy tắc thêm hậu tố chống trùng tên còn
// phụ thuộc thứ tự duyệt của script.
const TEN_FILE: Record<string, string> = ${JSON.stringify(TEN_FILE)};

export const hasStructure = (key: string): boolean => key in TEN_FILE;
export const STRUCTURE_COUNT = Object.keys(TEN_FILE).length;

/** Tổng dung lượng cả bộ hình — để trang Cài đặt nói thật con số cho người dùng. */
export const STRUCTURE_BYTES = ${tongByteHinh};

/** Địa chỉ hình của một chất. null nếu chất đó không có hình. */
export function structureUrl(key: string): string | null {
  const ten = TEN_FILE[key];
  return ten ? \`\${import.meta.env.BASE_URL}hinh/\${ten}.svg\` : null;
}

/** Địa chỉ TOÀN BỘ hình — cho nút tải cả bộ về máy trong Cài đặt. */
export const allStructureUrls = (): string[] =>
  Object.values(TEN_FILE).map((t) => \`\${import.meta.env.BASE_URL}hinh/\${t}.svg\`);
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

console.log(
  `
✓ Sinh ${Object.keys(svgs).length} hình → public/hinh/ ` +
    `(${(tongByteHinh / 1024).toFixed(0)} KB)` +
    (daXoaThua ? `, đã dọn ${daXoaThua} file thừa` : ''),
);
console.log(`✓ Danh mục + tên file: src/generated/structures.ts`);
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
