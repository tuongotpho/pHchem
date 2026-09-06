/**
 * chu-thich.mjs — sinh chú thích cho toàn bộ kho video.
 *
 * Nguyên tắc: mọi câu chữ đều lấy từ chính dữ liệu đã dựng ra video đó.
 * Không thêm số liệu, không thêm nhận định, không bịa lời khen.
 * Chỗ nào dữ liệu không có thì để trống và báo thiếu, không đắp bừa.
 *
 * Sinh ra hai bản cho mỗi video:
 *   tiktok   — ngắn, nhiều thẻ, câu đầu là câu móc
 *   facebook — dài hơn, có đường dẫn, ít thẻ
 */
import fs from 'node:fs';
import path from 'node:path';

import { ELEMENT_REELS } from './element-reels-data.mjs';
import { ROWS as ELEMENT_ROWS_2 } from './element-rows-2-all.mjs';
import { expand } from './element-data-2.mjs';
import { FACT_REELS } from './gen-fact-reels.mjs';
import { FACT_ROWS } from './fact-rows-2-all.mjs';
import { SAFETY_ROWS } from './safety-rows.mjs';
import { HISTORY_ROWS } from './history-rows.mjs';
import { QUIZ_REELS } from './gen-quiz-reels.mjs';

const TRANG = 'ph-chem.web.app';

// ── Tiện ích ────────────────────────────────────────────────

/** Bỏ dấu tiếng Việt để làm thẻ — thẻ có dấu hay bị nền tảng cắt. */
export function boDau(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function the(s) {
  return '#' + boDau(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Bỏ dấu đầu dòng và khoảng trắng thừa. */
function sach(s) {
  return String(s ?? '').replace(/^[•\-\u2022]\s*/, '').trim();
}

/** Ghép các đoạn, bỏ đoạn rỗng, ngăn bằng dòng trống. */
function ghep(...doan) {
  return doan.map(sach).filter(Boolean).join('\n\n');
}

/**
 * Hạ chữ cho câu ĐANG VIẾT HOA TOÀN BỘ (các trường tiêu đề cảnh).
 * Câu đã có chữ thường thì để nguyên — hạ hết sẽ phá tên riêng
 * và công thức hoá học (HCl thành hcl).
 */
function thuong(s) {
  const t = sach(s);
  return /[a-zà-ỹ]/.test(t) ? t : t.toLowerCase();
}

/** Câu kết thúc bằng dấu chấm cho gọn. */
function cham(s) {
  const t = sach(s);
  if (!t) return '';
  return /[.!?…]$/.test(t) ? t : t + '.';
}

// ── Nguyên tố (dùng chung cho cả hai đợt) ───────────────────

function chuThichNguyenTo(e, thuMuc) {
  const ten = `${e.vi} (${e.sym})`;
  const soHieu = `Số hiệu ${e.z}, khối lượng ${e.mass}.`;
  const y1 = sach(Array.isArray(e.powerDesc) ? e.powerDesc[0] : '');
  const y2 = sach(Array.isArray(e.powerDesc) ? e.powerDesc[1] : '');
  const dung = Array.isArray(e.apps) && e.apps.length ? `Gặp ở đâu: ${sach(e.apps[0])}.` : '';

  const theEl = ['#hoahoc', '#nguyento', '#bangtuanhoan', the(e.sym), the(e.vi), '#phchem'];

  return {
    tiktok: ghep(
      cham(e.subQuote),
      `${ten} — ${sach(e.nickname)}`,
      cham(e.statsHighlight),
      y1,
      `Tra cứu đủ 118 nguyên tố ở ${TRANG}`,
      theEl.join(' '),
    ),
    facebook: ghep(
      `${ten} — ${sach(e.nickname)}`,
      cham(e.subQuote),
      `${soHieu} ${sach(e.state)}.`,
      cham(e.statsHighlight),
      [y1, y2].filter(Boolean).join('\n'),
      dung,
      e.reaction ? `Phản ứng đặc trưng: ${sach(e.reaction)}` : '',
      `Bảng tuần hoàn đầy đủ 118 nguyên tố, miễn phí, không quảng cáo: https://${TRANG}`,
      ['#hoahoc', '#nguyento', '#bangtuanhoan', the(e.vi), '#phchem'].join(' '),
    ),
  };
}

// ── Chuyện lạ đợt 1 (dữ liệu theo cảnh) ─────────────────────

function chuThichChuyenLa1(f) {
  const moc = sach(f.scenes?.[0]?.text);
  const giai = sach(f.scenes?.[1]?.text);
  const ket = sach(f.scenes?.[f.scenes.length - 1]?.text);
  const theF = ['#hoahoc', '#chuyenlahoahoc', the(f.tag || 'doisong'), '#phchem'];

  return {
    tiktok: ghep(
      moc,
      sach(f.title),
      giai,
      `Còn nhiều mẩu như vậy ở ${TRANG}`,
      theF.join(' '),
    ),
    facebook: ghep(
      sach(f.title),
      moc,
      giai,
      ket && ket !== giai ? ket : '',
      f.compoundName ? `Chất chính: ${sach(f.compoundName)}` : '',
      f.reaction ? `Phản ứng: ${sach(f.reaction)}` : '',
      `Tra cứu công thức, phản ứng và bảng tuần hoàn miễn phí: https://${TRANG}`,
      ['#hoahoc', '#chuyenlahoahoc', the(f.tag || 'doisong'), '#phchem'].join(' '),
    ),
  };
}

// ── Chuyện lạ đợt 2 ─────────────────────────────────────────

function chuThichChuyenLa2(f) {
  const theF = ['#hoahoc', '#chuyenlahoahoc', the(f.tag || 'doisong'), '#phchem'];

  return {
    tiktok: ghep(
      cham(f.claim),
      sach(f.title),
      sach(f.why?.[0]),
      `Còn nhiều mẩu như vậy ở ${TRANG}`,
      theF.join(' '),
    ),
    facebook: ghep(
      sach(f.title),
      cham(f.claim),
      `${sach(f.viSao)}`,
      (f.why || []).map(sach).filter(Boolean).join('\n'),
      f.dukien ? `${sach(f.dukienLabel || 'Dữ kiện')}: ${sach(f.dukien)}` : '',
      Array.isArray(f.gapODau) && f.gapODau[0] ? `Bắt gặp ở đâu: ${sach(f.gapODau[0])}` : '',
      cham(f.ketLuan),
      `Tra cứu công thức, phản ứng và bảng tuần hoàn miễn phí: https://${TRANG}`,
      ['#hoahoc', '#chuyenlahoahoc', the(f.tag || 'doisong'), '#phchem'].join(' '),
    ),
  };
}

// ── An toàn hoá chất ────────────────────────────────────────
// Chú thích loại này phải nêu đủ: làm sai gì, hậu quả, làm đúng ra sao,
// và cách sơ cứu chuẩn. Không rút gọn phần sơ cứu.

function chuThichAnToan(s) {
  const theS = ['#antoanhoachat', '#hoahoc', '#kienthucantoan', '#phchem'];

  return {
    tiktok: ghep(
      `${sach(s.danger)} → ${sach(s.hauQua)}`,
      cham(s.hook),
      sach(s.why?.[0]),
      `Làm đúng: ${sach(s.lamDung?.[0])}`,
      cham(s.capCuu),
      theS.join(' '),
    ),
    facebook: ghep(
      `${sach(s.danger)} → ${sach(s.hauQua)}`,
      cham(s.hook),
      `${sach(s.chatTitle)}`,
      (s.why || []).map(sach).filter(Boolean).join('\n'),
      s.reaction ? `Phản ứng: ${sach(s.reaction)}` : '',
      Array.isArray(s.dauHieu) && s.dauHieu.length
        ? 'Dấu hiệu nhận biết:\n' + s.dauHieu.map((x) => '- ' + sach(x)).join('\n') : '',
      Array.isArray(s.lamDung) && s.lamDung.length
        ? 'Làm đúng:\n' + s.lamDung.map((x) => '- ' + sach(x)).join('\n') : '',
      `Sơ cứu: ${cham(s.capCuu)}`,
      'Sự cố nặng thì gọi cấp cứu 115 hoặc cứu hoả 114. Nội dung này để tham khảo, không thay thế hướng dẫn của cơ quan chuyên môn.',
      `Tra cứu hoá chất và phản ứng miễn phí: https://${TRANG}`,
      ['#antoanhoachat', '#hoahoc', '#kienthucantoan', '#phchem'].join(' '),
    ),
  };
}

// ── Lịch sử hoá học ─────────────────────────────────────────

function chuThichLichSu(h) {
  const theH = ['#lichsuhoahoc', '#hoahoc', '#khoahoc', '#phchem'];

  return {
    tiktok: ghep(
      cham(h.hook),
      `${sach(h.nam)} — ${sach(h.nhanVat)}: ${sach(h.danh)}`,
      sach(h.chiTiet?.[0]),
      `Còn nhiều chuyện như vậy ở ${TRANG}`,
      theH.join(' '),
    ),
    facebook: ghep(
      `${sach(h.nam)} — ${sach(h.nhanVat)}: ${sach(h.danh)}`,
      cham(h.hook),
      `Trước đó: ${thuong(h.truocDo)}`,
      (h.boiCanh || []).slice(0, 2).map(sach).filter(Boolean).join('\n'),
      `Bước ngoặt: ${thuong(h.moment)}`,
      (h.chiTiet || []).map(sach).filter(Boolean).join('\n'),
      h.dukien ? `${sach(h.dukienLabel || 'Dữ kiện')}: ${sach(h.dukien)}` : '',
      Array.isArray(h.diSan) && h.diSan[0] ? `Để lại gì: ${sach(h.diSan[0])}` : '',
      cham(h.ketLuan),
      `Bảng tuần hoàn và công cụ hoá học miễn phí: https://${TRANG}`,
      ['#lichsuhoahoc', '#hoahoc', '#khoahoc', '#phchem'].join(' '),
    ),
  };
}

// ── Đố vui ──────────────────────────────────────────────────
// Cố ý KHÔNG nêu đáp án trong chú thích: nêu ra là hỏng cái đố.
// Người xem phải xem hết video mới biết.

function chuThichDoVui(q) {
  const theQ = ['#dovuihoahoc', '#hoahoc', the(q.tag || 'hoahoc'), '#phchem'];
  const luaChon = (q.options || []).map((o) => `${o.key}. ${sach(o.text)}`).join('\n');

  return {
    tiktok: ghep(
      cham(q.question),
      luaChon,
      'Đáp án ở cuối video. Bình luận đáp án của bạn trước khi xem tiếp.',
      theQ.join(' '),
    ),
    facebook: ghep(
      sach(q.title),
      cham(q.question),
      luaChon,
      q.hint ? `Gợi ý: ${sach(q.hint)}` : '',
      'Đáp án ở cuối video. Bình luận đáp án của bạn trước khi xem nhé.',
      `Tra cứu công thức, phản ứng và bảng tuần hoàn miễn phí: https://${TRANG}`,
      ['#dovuihoahoc', '#hoahoc', the(q.tag || 'hoahoc'), '#phchem'].join(' '),
    ),
  };
}

// ── Gom tất cả ──────────────────────────────────────────────

export function buildAll() {
  const ra = [];
  const them = (thuMuc, loat, ten, file, ct) => {
    ra.push({ id: `${thuMuc}/${file}`, thuMuc, loat, ten, ...ct });
  };

  for (const e of ELEMENT_REELS) {
    them('reels', 'Nguyên tố (đợt 1)', `${e.vi} (${e.sym})`, e.videoFileName, chuThichNguyenTo(e, 'reels'));
  }
  for (const e of expand(ELEMENT_ROWS_2, 61)) {
    them('reels_v2', 'Nguyên tố (đợt 2)', `${e.vi} (${e.sym})`, e.videoFileName, chuThichNguyenTo(e, 'reels_v2'));
  }
  for (const f of FACT_REELS) {
    them('reels', 'Chuyện lạ (đợt 1)', f.title, f.videoFileName, chuThichChuyenLa1(f));
  }
  for (const f of FACT_ROWS) {
    them('reels_chuyenla', 'Chuyện lạ (đợt 2)', f.title, `${f.key}.mp4`, chuThichChuyenLa2(f));
  }
  for (const s of SAFETY_ROWS) {
    them('reels_antoan', 'An toàn hoá chất', s.danger, `${s.key}.mp4`, chuThichAnToan(s));
  }
  for (const h of HISTORY_ROWS) {
    them('reels_lichsu', 'Lịch sử hoá học', `${h.nam} — ${h.nhanVat}`, `${h.key}.mp4`, chuThichLichSu(h));
  }
  for (const q of QUIZ_REELS) {
    them('reels', 'Đố vui hoá học', sach(q.question), q.videoFileName, chuThichDoVui(q));
  }

  // Ba video dựng thử kiểu mới cho nguyên tố 3, 10, 11 nằm ở reels_v2 nhưng
  // dùng lại đúng dữ liệu đợt 1 — dùng chung chú thích, không viết lại.
  const banThu = ['element_03_vang.mp4', 'element_10_gali.mp4', 'element_11_oxy.mp4'];
  for (const f of banThu) {
    const goc = ra.find((x) => x.thuMuc === 'reels' && x.id.endsWith(f));
    if (goc) ra.push({ ...goc, id: `reels_v2/${f}`, thuMuc: 'reels_v2', loat: 'Nguyên tố (đợt 2)' });
  }
  return ra;
}

// ── CLI ─────────────────────────────────────────────────────

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const ds = buildAll();
  const goc = path.resolve(process.cwd(), 'promo');

  // Đối chiếu với video thật có trên đĩa: cái nào có video mà thiếu chú thích,
  // cái nào có chú thích mà không có video — báo cả hai chiều.
  const coVideo = new Set();
  for (const d of ['reels', 'reels_v2', 'reels_chuyenla', 'reels_antoan', 'reels_lichsu']) {
    const p = path.join(goc, d);
    if (!fs.existsSync(p)) continue;
    for (const f of fs.readdirSync(p).filter((x) => x.endsWith('.mp4'))) coVideo.add(`${d}/${f}`);
  }
  const coChuThich = new Set(ds.map((x) => x.id));
  const thieuChuThich = [...coVideo].filter((x) => !coChuThich.has(x)).sort();
  const thieuVideo = ds.filter((x) => !coVideo.has(x.id)).map((x) => x.id).sort();

  const bang = {};
  for (const x of ds) bang[x.id] = { ten: x.ten, loat: x.loat, tiktok: x.tiktok, facebook: x.facebook };
  fs.writeFileSync(path.join(goc, 'chu-thich.json'), JSON.stringify(bang, null, 2));

  const dai = (s) => s.length;
  const md = [
    '# Chú thích cho kho video',
    '',
    `Sinh tự động bằng \`npm run chu-thich\`, ngày ${new Date().toISOString().slice(0, 10)}.`,
    'Mọi câu chữ lấy từ chính dữ liệu đã dựng ra video, không thêm gì.',
    'Sửa nội dung thì sửa ở tệp dữ liệu gốc rồi chạy lại, đừng sửa tay ở đây.',
    '',
    `**${ds.length} video có chú thích.**`,
    thieuChuThich.length ? `\n⚠ **${thieuChuThich.length} video trên đĩa chưa có chú thích:**\n` + thieuChuThich.map((x) => `- \`${x}\``).join('\n') : '',
    thieuVideo.length ? `\n⚠ **${thieuVideo.length} chú thích chưa có video:**\n` + thieuVideo.map((x) => `- \`${x}\``).join('\n') : '',
    '',
    '## Độ dài',
    '',
    '| Loạt | Số video | TikTok trung bình | TikTok dài nhất | Facebook dài nhất |',
    '|---|---|---|---|---|',
  ];
  const theoLoat = {};
  for (const x of ds) (theoLoat[x.loat] ||= []).push(x);
  for (const [loat, arr] of Object.entries(theoLoat)) {
    const tt = arr.map((x) => dai(x.tiktok));
    const fb = arr.map((x) => dai(x.facebook));
    md.push(`| ${loat} | ${arr.length} | ${Math.round(tt.reduce((a, b) => a + b, 0) / arr.length)} | ${Math.max(...tt)} | ${Math.max(...fb)} |`);
  }
  md.push('', 'Giới hạn: TikTok 2200 ký tự, Facebook 63.206 ký tự.', '');

  for (const [loat, arr] of Object.entries(theoLoat)) {
    md.push(`\n---\n\n## ${loat} (${arr.length})\n`);
    for (const x of arr) {
      md.push(`### ${x.ten}`, '', `\`${x.id}\``, '', '**TikTok**', '', '```', x.tiktok, '```', '', '**Facebook**', '', '```', x.facebook, '```', '');
    }
  }
  fs.writeFileSync(path.join(goc, 'CHU_THICH.md'), md.join('\n'));

  console.log(`${ds.length} chú thích -> promo/chu-thich.json + promo/CHU_THICH.md`);
  const quaDai = ds.filter((x) => x.tiktok.length > 2200);
  if (quaDai.length) console.log(`⚠ ${quaDai.length} chú thích TikTok vượt 2200 ký tự`);
  if (thieuChuThich.length) console.log(`⚠ ${thieuChuThich.length} video tren dia chua co chu thich`);
  if (thieuVideo.length) console.log(`⚠ ${thieuVideo.length} chu thich chua co video`);
}
