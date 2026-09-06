/**
 * do-do-phu.mjs — Đối chiếu 236 mẩu chuyện lạ trong app với TOÀN BỘ video đã dựng.
 *
 * Khác lần đo đầu: lần đó chỉ so với 66 reel bản 1, nên báo thiếu 88 mẩu.
 * Nay phải so với cả loạt chuyện lạ mới, loạt lịch sử, loạt an toàn và
 * 118 hồ sơ nguyên tố — vì nhiều mẩu đã được kể trong những loạt đó rồi.
 *
 *   node scripts/do-do-phu.mjs   -> in bảng + ghi lại promo/CHUYEN_LA_CON_THIEU.md
 */

import fs from 'node:fs';

const { FACT_REELS } = await import('./gen-fact-reels.mjs');
const { FACT_ROWS } = await import('./fact-rows-2-all.mjs');
const { HISTORY_ROWS } = await import('./history-rows.mjs');
const { SAFETY_ROWS } = await import('./safety-rows.mjs');
const { ELEMENT_REELS: E1 } = await import('./element-reels-data.mjs');
const { ROWS: R2 } = await import('./element-rows-2-all.mjs');
const { expand } = await import('./element-data-2.mjs');

// Gom toàn bộ chữ nghĩa của mọi video đã dựng
const kho = [];
for (const r of FACT_REELS) kho.push(r.title + ' ' + (r.scenes || []).map(s => s.text).join(' '));
for (const r of FACT_ROWS) kho.push([r.title, r.claim, r.viSao, ...r.why, r.dukien, ...r.gapODau, r.ketLuan].join(' '));
for (const r of HISTORY_ROWS) kho.push([r.nam, r.nhanVat, r.danh, r.hook, r.truocDo, ...r.boiCanh, r.moment, ...r.chiTiet, r.dukien, ...r.diSan, r.ketLuan].join(' '));
for (const r of SAFETY_ROWS) kho.push([r.danger, r.hauQua, r.hook, r.chatTitle, ...r.why, ...r.dauHieu, r.mucDo, ...r.lamDung].join(' '));
for (const e of [...E1, ...expand(R2, 61)]) kho.push([e.title, e.nickname, e.subQuote, e.statsHighlight, e.powerTitle, ...(e.powerDesc || []), ...(e.apps || [])].join(' '));

// 236 mẩu trong app
const src = fs.readFileSync('src/data/facts.ts', 'utf8');
const facts = [];
for (const m of src.matchAll(/\{\s*tag:\s*'([^']+)'[^\n]*?vi:\s*'((?:[^'\\]|\\.)*)'/g)) {
  facts.push({ tag: m[1], vi: m[2].replace(/\\'/g, "'") });
}

const DUNG = new Set('và của là các có trong một cho được với khi những nhiều rất hơn thì mà nên ra nhưng cũng như từ đến vào tại về này đó chất người nước không bị làm còn theo sau trên dưới lại đi lên bằng nó chỉ đã sẽ phải hay hoặc'.split(' '));
const tu = s => new Set(String(s).toLowerCase().replace(/[^a-zà-ỹ0-9\s]/gi, ' ')
  .split(/\s+/).filter(w => w.length > 2 && !DUNG.has(w)));
const khoTu = kho.map(tu);
const trung = (a, b) => { let c = 0; for (const w of a) if (b.has(w)) c++; return c / Math.max(1, a.size); };

const chuaLam = [];
for (const f of facts) {
  const t = tu(f.vi);
  if (Math.max(...khoTu.map(k => trung(t, k))) < 0.34) chuaLam.push(f);
}

const tong = {}, thieu = {};
for (const f of facts) tong[f.tag] = (tong[f.tag] || 0) + 1;
for (const f of chuaLam) thieu[f.tag] = (thieu[f.tag] || 0) + 1;

console.log(`\nĐối chiếu ${facts.length} mẩu trong app với ${kho.length} video đã dựng\n`);
console.log('Chủ đề'.padEnd(22) + 'Trong app'.padStart(10) + 'Chưa kể'.padStart(9) + 'Đã phủ'.padStart(9));
for (const [t, n] of Object.entries(tong).sort((a, b) => b[1] - a[1])) {
  const c = thieu[t] || 0;
  console.log(t.padEnd(22) + String(n).padStart(10) + String(c).padStart(9) + `${Math.round((1 - c / n) * 100)}%`.padStart(9));
}
console.log('\n' + 'TỔNG'.padEnd(22) + String(facts.length).padStart(10) + String(chuaLam.length).padStart(9) +
  `${Math.round((1 - chuaLam.length / facts.length) * 100)}%`.padStart(9));

let md = `# Chuyện lạ hoá học — còn ${chuaLam.length} mẩu chưa được kể

Đối chiếu **${facts.length} mẩu trong app** (\`src/data/facts.ts\`) với **toàn bộ ${kho.length} video đã dựng**:
chuyện lạ bản 1 và bản 2, lịch sử hoá học, an toàn hoá chất, và 118 hồ sơ nguyên tố.

Cách đối chiếu: so trùng từ khoá, dưới 34% thì coi là chưa kể. Đây là ước lượng
bằng máy, mẩu ở sát ngưỡng cần đọc lại bằng mắt.

Chạy lại: \`node scripts/do-do-phu.mjs\`

`;
const theo = {};
for (const f of chuaLam) (theo[f.tag] ||= []).push(f.vi);
for (const [t, l] of Object.entries(theo).sort((a, b) => b[1].length - a[1].length)) {
  md += `## ${t} — ${l.length} mẩu\n\n`;
  l.forEach((v, i) => { md += `${i + 1}. ${v}\n`; });
  md += '\n';
}
if (!chuaLam.length) md += '> Không còn mẩu nào chưa được kể.\n';
fs.writeFileSync('promo/CHUYEN_LA_CON_THIEU.md', md, 'utf8');
console.log('\n✅ Đã ghi lại promo/CHUYEN_LA_CON_THIEU.md\n');
