/**
 * element-data-2.mjs — Dữ liệu 58 nguyên tố CÒN LẠI (đợt 2), viết ở dạng gọn.
 *
 * Vì sao không viết thẳng như scripts/element-reels-data.mjs?
 * File đợt 1 tốn ~2,9 KB mỗi nguyên tố vì lặp lại rất nhiều thứ suy ra được.
 * Ở đây mỗi nguyên tố chỉ khai những gì KHÔNG suy ra được; phần còn lại
 * (nhóm, chu kỳ, màu chủ đề, tiêu đề, khoá file, và cả 4 câu thuyết minh)
 * do máy tự dựng. Nhờ vậy tốn khoảng 1/3 dung lượng cho cùng lượng nội dung.
 *
 * Nguyên tắc nội dung: KHÔNG bịa. Nguyên tố nhân tạo chưa đo được nhiệt độ
 * nóng chảy thì ghi "Chưa xác định"; chưa có ứng dụng đời sống thì nói thẳng
 * là chỉ phục vụ nghiên cứu, và thay khung "phản ứng hoá học" bằng
 * "phản ứng tổng hợp hạt nhân" — thứ có thật và tra cứu được.
 */

// ─────────────────────────────────────────────────────────────
// SUY RA NHÓM / CHU KỲ TỪ SỐ HIỆU NGUYÊN TỬ
// ─────────────────────────────────────────────────────────────
export function groupOf(z) {
  if (z === 1) return 1;
  if (z === 2) return 18;
  if (z <= 4) return z - 2;              // 3,4 -> 1,2
  if (z <= 10) return z + 8;             // 5..10 -> 13..18
  if (z <= 12) return z - 10;            // 11,12 -> 1,2
  if (z <= 18) return z;                 // 13..18 -> 13..18
  if (z <= 20) return z - 18;            // 19,20 -> 1,2
  if (z <= 30) return z - 18;            // 21..30 -> 3..12
  if (z <= 36) return z - 18;            // 31..36 -> 13..18
  if (z <= 38) return z - 36;            // 37,38 -> 1,2
  if (z <= 48) return z - 36;            // 39..48 -> 3..12
  if (z <= 54) return z - 36;            // 49..54 -> 13..18
  if (z <= 56) return z - 54;            // 55,56 -> 1,2
  if (z <= 71) return 0;                 // họ Lantan
  if (z <= 80) return z - 68;            // 72..80 -> 4..12
  if (z <= 86) return z - 68;            // 81..86 -> 13..18
  if (z <= 88) return z - 86;            // 87,88 -> 1,2
  if (z <= 103) return -1;               // họ Actini
  if (z <= 112) return z - 100;          // 104..112 -> 4..12
  return z - 100;                        // 113..118 -> 13..18
}

export function periodOf(z) {
  if (z <= 2) return 1;
  if (z <= 10) return 2;
  if (z <= 18) return 3;
  if (z <= 36) return 4;
  if (z <= 54) return 5;
  if (z <= 86) return 6;
  return 7;
}

const CAS = {
  1: 'IA', 2: 'IIA', 3: 'IIIB', 4: 'IVB', 5: 'VB', 6: 'VIB', 7: 'VIIB',
  8: 'VIIIB', 9: 'VIIIB', 10: 'VIIIB', 11: 'IB', 12: 'IIB',
  13: 'IIIA', 14: 'IVA', 15: 'VA', 16: 'VIA', 17: 'VIIA', 18: 'VIIIA'
};

export function groupPeriodText(z) {
  const g = groupOf(z);
  const p = periodOf(z);
  if (g === 0) return `Họ Lantan • Chu kỳ ${p}`;
  if (g === -1) return `Họ Actini • Chu kỳ ${p}`;
  return `Nhóm ${CAS[g]} (${g}) • Chu kỳ ${p}`;
}

// ─────────────────────────────────────────────────────────────
// MÀU THEO HỌ NGUYÊN TỐ — mỗi nguyên tố lệch tông một chút cho đỡ trùng
// ─────────────────────────────────────────────────────────────
const FAMILY = {
  ct:  { label: 'KIM LOẠI CHUYỂN TIẾP', h: 199, s: 89, l: 48 },
  ks:  { label: 'KIM LOẠI SAU CHUYỂN TIẾP', h: 173, s: 80, l: 40 },
  ab:  { label: 'Á KIM (BÁN DẪN TỰ NHIÊN)', h: 84, s: 78, l: 45 },
  pk:  { label: 'PHI KIM', h: 142, s: 71, l: 45 },
  ha:  { label: 'HALOGEN', h: 189, s: 94, l: 43 },
  lt:  { label: 'HỌ LANTAN — ĐẤT HIẾM', h: 330, s: 81, l: 60 },
  ac:  { label: 'HỌ ACTINI — NGUYÊN TỐ PHÓNG XẠ', h: 0, s: 84, l: 60 },
  sn:  { label: 'NGUYÊN TỐ SIÊU NẶNG NHÂN TẠO', h: 258, s: 90, l: 66 }
};

function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  const hex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return '#' + hex(r) + hex(g) + hex(b);
}

function colorsFor(fam, z) {
  const f = FAMILY[fam] || FAMILY.ct;
  const shift = ((z * 37) % 34) - 17;          // lệch tông ±17 độ theo số hiệu
  return {
    themeColor: hsl(f.h + shift, f.s, f.l),
    accentColor: hsl(f.h + shift, Math.min(100, f.s + 6), Math.min(88, f.l + 30))
  };
}

// ─────────────────────────────────────────────────────────────
// ĐỌC SỐ THÀNH CHỮ TIẾNG VIỆT (để máy đọc thuyết minh không bị ngọng)
// ─────────────────────────────────────────────────────────────
const DV = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function doc3(n, full) {
  const tram = Math.floor(n / 100), chuc = Math.floor((n % 100) / 10), dv = n % 10;
  let out = [];
  if (tram > 0 || full) out.push(DV[tram], 'trăm');
  if (chuc === 0) {
    if (dv > 0 && (tram > 0 || full)) out.push('lẻ', DV[dv]);
    else if (dv > 0) out.push(DV[dv]);
  } else if (chuc === 1) {
    out.push('mười');
    if (dv === 5) out.push('lăm');
    else if (dv > 0) out.push(DV[dv]);
  } else {
    out.push(DV[chuc], 'mươi');
    if (dv === 1) out.push('mốt');
    else if (dv === 4) out.push('tư');
    else if (dv === 5) out.push('lăm');
    else if (dv > 0) out.push(DV[dv]);
  }
  return out.join(' ');
}

/** 1538 -> "một nghìn năm trăm ba mươi tám"; -218.8 -> "âm hai trăm mười tám phẩy tám" */
export function docSo(x) {
  let s = String(x).trim();
  let am = '';
  if (s.startsWith('-') || s.startsWith('−')) { am = 'âm '; s = s.slice(1); }
  const [phanNguyen, phanLe] = s.split('.');
  let n = parseInt(phanNguyen, 10);
  if (!Number.isFinite(n)) return String(x);
  let out;
  if (n === 0) out = 'không';
  else if (n < 1000) out = doc3(n, false);
  else {
    const nghin = Math.floor(n / 1000), du = n % 1000;
    out = doc3(nghin, false) + ' nghìn' + (du > 0 ? ' ' + doc3(du, du >= 100) : '');
  }
  if (phanLe) {
    out += ' phẩy ' + (phanLe.length > 1 && phanLe[0] === '0'
      ? phanLe.split('').map(d => DV[+d]).join(' ')
      : doc3(parseInt(phanLe, 10), false));
  }
  return am + out;
}

/** Đổi mọi con số trong câu thành chữ, kèm đơn vị hay gặp */
export function soThanhChu(text) {
  return String(text)
    .replace(/(-?\d+(?:\.\d+)?)\s*°C/g, (_m, n) => docSo(n) + ' độ C')
    .replace(/(-?\d+(?:\.\d+)?)\s*g\/cm³/g, (_m, n) => docSo(n) + ' gam trên xăng ti mét khối')
    .replace(/(-?\d+(?:\.\d+)?)\s*%/g, (_m, n) => docSo(n) + ' phần trăm')
    .replace(/(?<![\w.])(-?\d+(?:\.\d+)?)(?![\w.])/g, (_m, n) => docSo(n));
}

// ─────────────────────────────────────────────────────────────
// DỰNG 4 CÂU THUYẾT MINH TỪ DỮ LIỆU
// ─────────────────────────────────────────────────────────────
function buildScenes(e, id) {
  const s1 = `Hồ sơ nguyên tố số ${docSo(e.z)}: ${e.vi}! ${soThanhChu(e.subQuote)} ${soThanhChu(e.hook)}`;
  const s2 = `${e.vi} mang số hiệu ${docSo(e.z)}, khối lượng nguyên tử ${docSo(e.massSay ?? Math.round(parseFloat(e.mass)))}. `
    + `${soThanhChu(e.statsSay || e.statsHighlight)}`;
  // tiêu đề viết hoa toàn bộ để lên hình; đọc thì chuyển về chữ thường cho tự nhiên
  const power = e.powerTitle.charAt(0) + e.powerTitle.slice(1).toLowerCase();
  const s3 = `${soThanhChu(power)}. ${soThanhChu(e.desc[0])} ${soThanhChu(e.desc[1])}`;
  const s4 = `${soThanhChu(e.apps[0])}. ${soThanhChu(e.apps[1])}. `
    + `Cùng tra cứu chi tiết một trăm mười tám nguyên tố trên Bảng tuần hoàn tại ph-chem.web.app/table nhé!`;
  return [s1, s2, s3, s4].map(text => ({ text: text.replace(/\s+/g, ' ').trim() }));
}

const KHONG_DAU = { 'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a', 'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e', 'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i', 'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o', 'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u', 'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y', 'đ': 'd' };

function slug(s) {
  return s.toLowerCase().split('').map(c => KHONG_DAU[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

/** Nở dữ liệu gọn thành đúng khuôn mà scripts/gen-element-reels-v2.mjs cần */
export function expand(rows, startId = 61) {
  return rows.map((e, i) => {
    const id = startId + i;
    const key = `element_${id}_${slug(e.vi)}`;
    const { themeColor, accentColor } = colorsFor(e.fam, e.z);
    return {
      id,
      key,
      videoFileName: `${key}.mp4`,
      title: `HỒ SƠ NGUYÊN TỐ #${id}: ${e.vi.toUpperCase()} (${e.en.toUpperCase()}) - ${e.nickname}`,
      z: e.z,
      sym: e.sym,
      vi: e.vi,
      en: e.en,
      mass: e.mass,
      categoryLabel: e.catLabel || FAMILY[e.fam].label,
      groupPeriod: groupPeriodText(e.z),
      nickname: e.nickname,
      subQuote: e.subQuote,
      themeColor,
      accentColor,
      config: e.config,
      enScale: e.enScale,
      state: e.state,
      melt: e.melt,
      boil: e.boil,
      density: e.density,
      disc: e.disc,
      statsHighlight: e.statsHighlight,
      powerTitle: e.powerTitle,
      powerDesc: e.desc.map(d => '• ' + d),
      reaction: e.reaction,
      reactionLabel: e.reactionLabel || 'PHẢN ỨNG TIÊU BIỂU',
      apps: e.apps,
      appsTitle: e.appsTitle || null,
      appsLabel: e.appsLabel || null,
      scenes: buildScenes(e, id)
    };
  });
}
