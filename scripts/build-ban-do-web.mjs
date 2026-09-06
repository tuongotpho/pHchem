/**
 * build-ban-do-web.mjs — Dựng trang web bấm được từ dữ liệu kiểm kê thật.
 *
 *   node scripts/build-ban-do-web.mjs   -> ghi promo/ban-do-noi-dung.html
 *
 * Trang lấy số liệu ngay lúc dựng nên không bao giờ lệch với ổ đĩa.
 * Trạng thái "đã đăng" của từng video được lưu trên máy chủ của Artifact
 * (capability db), nên đánh dấu ở máy nào cũng thấy ở máy kia.
 */

import fs from 'node:fs';
import path from 'node:path';

const { ELEMENT_REELS: E1 } = await import('./element-reels-data.mjs');
const { ROWS: R2 } = await import('./element-rows-2-all.mjs');
const { expand } = await import('./element-data-2.mjs');
const { FACT_REELS } = await import('./gen-fact-reels.mjs');
const { SAFETY_ROWS } = await import('./safety-rows.mjs');
const { HISTORY_ROWS } = await import('./history-rows.mjs');
const { FACT_ROWS } = await import('./fact-rows-2-all.mjs');

const co = f => fs.existsSync(f);
const videos = [];

for (const e of E1) videos.push({ l: 'nt1', t: e.title.replace(/^HỒ SƠ NGUYÊN TỐ #\d+:\s*/, ''), k: e.key, x: co(path.join('promo/reels', e.videoFileName)) });
for (const e of expand(R2, 61)) videos.push({ l: 'nt2', t: e.title.replace(/^HỒ SƠ NGUYÊN TỐ #\d+:\s*/, ''), k: e.key, x: co(path.join('promo/reels_v2', e.videoFileName)) });
for (const r of FACT_REELS) videos.push({ l: 'cl', t: r.title, k: r.key, x: co(path.join('promo/reels', r.videoFileName)) });
for (const r of SAFETY_ROWS) videos.push({ l: 'at', t: r.danger + ' → ' + r.hauQua, k: r.key, x: co(path.join('promo/reels_antoan', r.key + '.mp4')) });
for (const r of HISTORY_ROWS) videos.push({ l: 'ls', t: r.nam + ' · ' + r.nhanVat + ' — ' + r.danh, k: r.key, x: co(path.join('promo/reels_lichsu', r.key + '.mp4')) });
for (const r of FACT_ROWS) videos.push({ l: 'cl2', t: r.title, k: r.key, x: co(path.join('promo/reels_chuyenla', r.key + '.mp4')) });
for (const f of fs.readdirSync('promo/reels').filter(f => /^quiz_.*\.mp4$/.test(f)))
  videos.push({ l: 'dv', t: f.replace(/^quiz_\d+_/, '').replace(/_/g, ' ').replace('.mp4', ''), k: f.replace('.mp4', ''), x: true });
for (const f of fs.readdirSync('promo').filter(f => /^phchem_.*\.mp4$/.test(f)))
  videos.push({ l: 'tr', t: f.replace('phchem_', '').replace('_video.mp4', '').replace(/_/g, ' '), k: f.replace('.mp4', ''), x: true });

// 88 mẩu chuyện lạ chưa làm, đọc từ báo cáo đã sinh trước đó
const conThieu = [];
if (co('promo/CHUYEN_LA_CON_THIEU.md')) {
  let tag = '';
  for (const line of fs.readFileSync('promo/CHUYEN_LA_CON_THIEU.md', 'utf8').split('\n')) {
    const mT = line.match(/^## (.+?) — \d+ mẩu/);
    if (mT) { tag = mT[1]; continue; }
    const mI = line.match(/^\d+\.\s+(.+)$/);
    if (mI && tag) conThieu.push({ g: tag, v: mI[1] });
  }
}

const dem = (tep, mau = /\n {2}\{/g) => (fs.readFileSync(tep, 'utf8').match(mau) || []).length;
const soChuyenLa = dem('src/data/facts.ts');
const mangApp = [
  { n: 'Bảng tuần hoàn', t: 118, x: 118 },
  { n: 'Chuyện lạ hoá học', t: soChuyenLa, x: soChuyenLa - conThieu.length },   // conThieu đo bằng do-do-phu.mjs
  { n: 'Từ điển hoá học', t: dem('src/data/dictionary.ts'), x: 0 },
  { n: 'Công thức vô cơ', t: dem('src/data/formulas.inorganic.ts'), x: 0 },
  { n: 'Công thức hữu cơ', t: dem('src/data/formulas.organic.ts'), x: 0 },
  { n: 'Danh pháp IUPAC', t: (fs.readFileSync('src/data/iupac.ts', 'utf8').match(/^ {2}[^ /][^:]*:\s*'/gm) || []).length, x: 0 },
  { n: 'Công thức vật lý', t: dem('src/data/formulas.physical.ts'), x: 0 },
  { n: 'Dãy điện hoá', t: dem('src/data/electro.ts'), x: 0 }
];

const DATA = { videos, conThieu, mangApp, ngay: new Date().toISOString().slice(0, 10) };

const HTML = `<title>Bản đồ nội dung pH-Chem</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
:root{
  --giay:#F6F8F4; --mat:#FFFFFF; --mat2:#EEF2EB; --vien:#DBE3D6;
  --chu:#16201A; --mo:#5F7168; --mo2:#87968C;
  --nhan:#1F7A55; --nhan-nen:#E3F1EA;
  --ph0:#C62828; --ph2:#DC5B0E; --ph4:#C9930A; --ph6:#7BA300; --ph8:#1F9463; --ph10:#1877C4;
  --bong:0 1px 2px rgba(20,40,30,.06);
}
:root:not([data-theme="light"]){ @media (prefers-color-scheme:dark){
  --giay:#0C1210; --mat:#131B17; --mat2:#18221D; --vien:#25322B;
  --chu:#E4EBE5; --mo:#93A399; --mo2:#6F8078;
  --nhan:#43C48D; --nhan-nen:#123227;
  --ph0:#E5564F; --ph2:#EE7C2E; --ph4:#DDAE28; --ph6:#96C420; --ph8:#33BC85; --ph10:#3D9BE0;
  --bong:0 1px 2px rgba(0,0,0,.3);
}}
:root[data-theme="dark"]{
  --giay:#0C1210; --mat:#131B17; --mat2:#18221D; --vien:#25322B;
  --chu:#E4EBE5; --mo:#93A399; --mo2:#6F8078;
  --nhan:#43C48D; --nhan-nen:#123227;
  --ph0:#E5564F; --ph2:#EE7C2E; --ph4:#DDAE28; --ph6:#96C420; --ph8:#33BC85; --ph10:#3D9BE0;
  --bong:0 1px 2px rgba(0,0,0,.3);
}
*{box-sizing:border-box}
body{
  margin:0; background:var(--giay); color:var(--chu);
  font-family:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px; line-height:1.55; -webkit-font-smoothing:antialiased;
}
.khung{max-width:1120px;margin:0 auto;padding:0 24px 80px}
.mono{font-family:"IBM Plex Mono",ui-monospace,Consolas,monospace;font-variant-numeric:tabular-nums}

/* ── đầu trang ── */
header{padding:44px 0 30px;border-bottom:1px solid var(--vien)}
.dai{display:flex;gap:5px;margin-bottom:20px}
.dai i{height:5px;flex:1;border-radius:1px}
h1{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-.02em;margin:0 0 6px;text-wrap:balance}
.phu{color:var(--mo);margin:0;max-width:62ch}
.tong{display:flex;flex-wrap:wrap;gap:28px;margin-top:24px}
.tong div{display:flex;flex-direction:column;gap:2px}
.tong b{font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;font-size:30px;font-weight:600;line-height:1}
.tong span{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:var(--mo2)}

/* ── mục ── */
section{margin-top:52px}
h2{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--mo);
   font-weight:700;margin:0 0 4px}
.dan{color:var(--mo);margin:0 0 20px;max-width:64ch;font-size:14px}

/* ── độ phủ ── */
.phu-hang{display:grid;grid-template-columns:minmax(150px,1.1fr) 92px minmax(0,3fr) 52px;
  gap:16px;align-items:center;padding:11px 0;border-bottom:1px solid var(--vien)}
.phu-hang:last-child{border-bottom:0}
.phu-ten{font-weight:500}
.phu-so{font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;
  font-size:13px;color:var(--mo);text-align:right}
.thanh{height:9px;background:var(--mat2);border-radius:1px;overflow:hidden}
.thanh i{display:block;height:100%;border-radius:1px}
.phu-pt{font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;
  font-size:13px;font-weight:600;text-align:right}

/* ── thanh công cụ ── */
.cong-cu{position:sticky;top:0;z-index:5;background:var(--giay);
  padding:12px 0;border-bottom:1px solid var(--vien);margin-bottom:6px}
.hang-cc{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
input[type=search]{flex:1;min-width:200px;padding:9px 13px;border:1px solid var(--vien);
  border-radius:3px;background:var(--mat);color:var(--chu);font:inherit;font-size:14px}
input[type=search]:focus-visible{outline:2px solid var(--nhan);outline-offset:1px}
.chip{padding:7px 13px;border:1px solid var(--vien);border-radius:3px;background:var(--mat);
  color:var(--mo);font:inherit;font-size:13px;cursor:pointer;display:inline-flex;
  align-items:center;gap:7px;white-space:nowrap}
.chip:hover{border-color:var(--mo2);color:var(--chu)}
.chip[aria-pressed=true]{background:var(--nhan-nen);border-color:var(--nhan);color:var(--nhan);font-weight:500}
.chip:focus-visible{outline:2px solid var(--nhan);outline-offset:1px}
.chip u{width:9px;height:9px;border-radius:50%;display:inline-block}
.chip em{font-style:normal;font-family:"IBM Plex Mono",monospace;font-size:12px;opacity:.75}

/* ── danh sách video ── */
.nhom-ten{display:flex;align-items:baseline;gap:10px;margin:26px 0 6px;
  font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mo);font-weight:700}
.nhom-ten b{font-family:"IBM Plex Mono",monospace;font-weight:400;letter-spacing:0;
  text-transform:none;color:var(--mo2)}
.hang{display:grid;grid-template-columns:3px 1fr auto;gap:14px;align-items:center;
  padding:9px 0;border-bottom:1px solid var(--vien)}
.hang .soc{align-self:stretch;border-radius:2px;min-height:22px}
.hang p{margin:0;font-size:14px;overflow-wrap:anywhere}
.hang .ma{display:block;font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--mo2);margin-top:1px}
.dang{border:1px solid var(--vien);background:var(--mat);color:var(--mo);border-radius:3px;
  padding:5px 11px;font:inherit;font-size:12px;cursor:pointer;white-space:nowrap;min-width:96px}
.dang:hover:not(:disabled){border-color:var(--nhan);color:var(--nhan)}
.dang:disabled{opacity:.45;cursor:default}
.dang[aria-pressed=true]{background:var(--nhan-nen);border-color:var(--nhan);color:var(--nhan);font-weight:500}
.dang:focus-visible{outline:2px solid var(--nhan);outline-offset:1px}
.chua-dung{opacity:.5}
.trong{padding:28px 0;color:var(--mo);font-size:14px}

/* ── còn thiếu ── */
details{border-bottom:1px solid var(--vien)}
summary{cursor:pointer;padding:12px 0;display:flex;justify-content:space-between;
  align-items:center;gap:12px;font-weight:500;list-style:none}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";font-family:"IBM Plex Mono",monospace;color:var(--mo2);font-size:17px}
details[open] summary::after{content:"−"}
summary:focus-visible{outline:2px solid var(--nhan);outline-offset:2px}
summary b{font-family:"IBM Plex Mono",monospace;font-weight:400;font-size:13px;color:var(--mo)}
details ol{margin:0 0 16px;padding-left:26px;color:var(--mo);font-size:14px}
details li{margin-bottom:7px;padding-left:3px}
details li::marker{font-family:"IBM Plex Mono",monospace;font-size:12px}

/* ── hai cột cuối ── */
.doi{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:36px}
.kiem{counter-reset:b;list-style:none;margin:0;padding:0}
.kiem li{position:relative;padding:0 0 20px 44px;counter-increment:b}
.kiem li::before{content:counter(b);position:absolute;left:0;top:1px;width:28px;height:28px;
  border-radius:50%;background:var(--nhan-nen);color:var(--nhan);
  font-family:"IBM Plex Mono",monospace;font-size:13px;font-weight:600;
  display:grid;place-items:center}
.kiem strong{display:block;margin-bottom:3px}
.kiem p{margin:0;color:var(--mo);font-size:14px}
.treo{list-style:none;margin:0;padding:0}
.treo li{padding:11px 0 11px 20px;border-bottom:1px solid var(--vien);position:relative;font-size:14px}
.treo li::before{content:"";position:absolute;left:0;top:19px;width:7px;height:7px;
  border-radius:50%;background:var(--ph2)}
.treo li:last-child{border-bottom:0}
.treo code{font-family:"IBM Plex Mono",monospace;font-size:12.5px;
  background:var(--mat2);padding:1px 5px;border-radius:2px}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--vien);
  color:var(--mo2);font-size:13px;display:flex;flex-wrap:wrap;gap:6px 18px}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>

<div class="khung">
<header>
  <div class="dai" aria-hidden="true">
    <i style="background:var(--ph0)"></i><i style="background:var(--ph2)"></i>
    <i style="background:var(--ph4)"></i><i style="background:var(--ph6)"></i>
    <i style="background:var(--ph8)"></i><i style="background:var(--ph10)"></i>
  </div>
  <h1>Bản đồ nội dung pH-Chem</h1>
  <p class="phu">Toàn bộ video truyền thông đã dựng, những mảng nội dung trong app còn để trống, và các phép kiểm phải chạy trước khi đăng. Số liệu quét thẳng từ ổ đĩa ngày <span class="mono" id="ngay"></span>.</p>
  <div class="tong">
    <div><b id="t-video">—</b><span>video đã dựng</span></div>
    <div><b id="t-dang">—</b><span>đã đăng fanpage</span></div>
    <div><b id="t-loat">—</b><span>loạt nội dung</span></div>
    <div><b id="t-thieu">—</b><span>mẩu chưa làm</span></div>
  </div>
</header>

<section>
  <h2>Độ phủ theo mảng nội dung</h2>
  <p class="dan">Mỗi mảng trong app đã được kể lại thành video tới đâu. Thanh màu đọc theo giấy quỳ: đỏ là còn bỏ ngỏ, xanh lam là đã phủ kín.</p>
  <div id="phu"></div>
</section>

<section>
  <h2>Kho video</h2>
  <p class="dan">Bấm <em>Đã đăng</em> để đánh dấu video đã lên fanpage. Dấu này lưu trên máy chủ nên mở ở máy khác vẫn thấy.</p>
  <div class="cong-cu">
    <div class="hang-cc">
      <input type="search" id="tim" placeholder="Tìm theo tên hoặc mã video…" aria-label="Tìm video">
      <button class="chip" id="loc-chua" aria-pressed="false">Chỉ hiện chưa đăng</button>
    </div>
    <div class="hang-cc" style="margin-top:8px" id="chips"></div>
  </div>
  <div id="ds"></div>
</section>

<section>
  <h2>Chuyện lạ hoá học còn thiếu</h2>
  <p class="dan" id="dan-thieu"></p>
  <div id="thieu"></div>
</section>

<section class="doi">
  <div>
    <h2>Ba phép kiểm trước khi đăng</h2>
    <p class="dan">Theo đúng thứ tự. Phép thứ ba là thứ hai phép kia không thay thế được.</p>
    <ol class="kiem">
      <li><strong>Soi bố cục</strong><p>Chạy lại công thức ngắt dòng của cả bốn cảnh để tìm chữ tràn khung hoặc bị cắt, không cần kết xuất ảnh nào. Đã bắt được lỗi thật ở Tecneti và Oganesson trong dữ liệu cũ.</p></li>
      <li><strong>Nghiệm thu file</strong><p>Soi khung hình, thời lượng, có tiếng chưa và dung lượng của từng tệp mp4.</p></li>
      <li><strong>Đo cao độ giọng đọc</strong><p>Khi dịch vụ đọc đứt kết nối, một cảnh có thể bị đọc bằng giọng khác ba cảnh còn lại. Tệp vẫn đủ khung hình, đủ tiếng, đủ dài nên nghiệm thu vẫn báo đạt. Đã dính hai lần: Astatin và Rượu methanol.</p></li>
    </ol>
  </div>
  <div>
    <h2>Việc còn treo</h2>
    <p class="dan">Cập nhật tay trong <span class="mono">scripts/build-ban-do-web.mjs</span>.</p>
    <ul class="treo">
      <li>Chưa đăng bài nào lên fanpage. Toàn bộ video mới vẫn nằm trên máy.</li>
      <li>Hai lỗi trong dữ liệu nguyên tố đợt 1: <code>#58 Tecneti</code> tràn chữ và <code>#60 Oganesson</code> bị cắt chữ. Chỉ lộ ra nếu dựng lại theo bản 2.</li>
      <li>Chín video Đố vui hoá học đã có kịch bản, script đã sửa được lỗi, nhưng chưa dựng.</li>
      <li>Ba mảng lớn chưa có video nào: từ điển, công thức và danh pháp IUPAC.</li>
    </ul>
  </div>
</section>

<footer>
  <span>Quét lại số liệu: <span class="mono">npm run kiem-ke</span></span>
  <span>Dựng lại trang này: <span class="mono">node scripts/build-ban-do-web.mjs</span></span>
  <span id="tt-db">Đang nối máy chủ lưu trạng thái…</span>
</footer>
</div>

<script>
const D = /*DATA*/;
const LOAT = {
  nt2:{ten:'Nguyên tố · bản 2',mau:'#1877C4'},
  nt1:{ten:'Nguyên tố · bản 1',mau:'#6F8078'},
  cl2:{ten:'Chuyện lạ · bản 2',mau:'#7BA300'},
  cl :{ten:'Chuyện lạ · bản 1',mau:'#9AA88C'},
  at :{ten:'An toàn hoá chất',mau:'#DC5B0E'},
  ls :{ten:'Lịch sử hoá học',mau:'#C9930A'},
  dv :{ten:'Đố vui hoá học',mau:'#8E56C4'},
  tr :{ten:'Giới thiệu trang',mau:'#1F9463'}
};
const thangPh = p => p >= 100 ? 'var(--ph10)' : p >= 80 ? 'var(--ph8)' : p >= 55 ? 'var(--ph6)'
  : p >= 35 ? 'var(--ph4)' : p >= 15 ? 'var(--ph2)' : 'var(--ph0)';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

document.getElementById('ngay').textContent = D.ngay;
const daDung = D.videos.filter(v => v.x);

// ── độ phủ ──
document.getElementById('phu').innerHTML = D.mangApp.map(m => {
  const p = m.t ? Math.round(m.x / m.t * 100) : 0;
  return \`<div class="phu-hang">
    <span class="phu-ten">\${esc(m.n)}</span>
    <span class="phu-so">\${m.x} / \${m.t}</span>
    <span class="thanh"><i style="width:\${Math.max(p, p ? 1.5 : 0)}%;background:\${thangPh(p)}"></i></span>
    <span class="phu-pt" style="color:\${p ? thangPh(p) : 'var(--mo2)'}">\${p}%</span>
  </div>\`;
}).join('');

// ── chips lọc ──
const thuTu = ['nt2','nt1','cl2','cl','at','ls','dv','tr'];
let locLoat = null, locChua = false, tuKhoa = '';
document.getElementById('chips').innerHTML =
  \`<button class="chip" data-l="" aria-pressed="true">Tất cả <em>\${daDung.length}</em></button>\` +
  thuTu.map(k => {
    const n = daDung.filter(v => v.l === k).length;
    return \`<button class="chip" data-l="\${k}" aria-pressed="false"><u style="background:\${LOAT[k].mau}"></u>\${LOAT[k].ten} <em>\${n}</em></button>\`;
  }).join('');

// ── trạng thái đã đăng ──
let dang = {}, luuDb = null;
const soDang = () => Object.keys(dang).length;

function ve() {
  const ds = document.getElementById('ds');
  const loc = daDung.filter(v =>
    (!locLoat || v.l === locLoat) &&
    (!locChua || !dang[v.k]) &&
    (!tuKhoa || (v.t + ' ' + v.k).toLowerCase().includes(tuKhoa)));

  if (!loc.length) { ds.innerHTML = '<p class="trong">Không có video nào khớp.</p>'; return; }

  let html = '';
  for (const k of thuTu) {
    const nhom = loc.filter(v => v.l === k);
    if (!nhom.length) continue;
    const daDangNhom = nhom.filter(v => dang[v.k]).length;
    html += \`<div class="nhom-ten">\${esc(LOAT[k].ten)} <b>\${daDangNhom}/\${nhom.length} đã đăng</b></div>\`;
    html += nhom.map(v => \`<div class="hang">
      <span class="soc" style="background:\${LOAT[k].mau}"></span>
      <p>\${esc(v.t)}<span class="ma">\${esc(v.k)}</span></p>
      <button class="dang" data-k="\${esc(v.k)}" aria-pressed="\${dang[v.k] ? 'true' : 'false'}"
        \${luuDb ? '' : 'disabled'}>\${dang[v.k] ? '✓ Đã đăng' : 'Đã đăng'}</button>
    </div>\`).join('');
  }
  ds.innerHTML = html;
  document.getElementById('t-dang').textContent = soDang();
}

document.getElementById('t-video').textContent = daDung.length;
document.getElementById('t-dang').textContent = '0';
document.getElementById('t-loat').textContent = thuTu.filter(k => daDung.some(v => v.l === k)).length;
document.getElementById('t-thieu').textContent = D.conThieu.length;

document.getElementById('chips').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  locLoat = b.dataset.l || null;
  document.querySelectorAll('#chips .chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
  ve();
});
document.getElementById('loc-chua').addEventListener('click', e => {
  locChua = !locChua; e.currentTarget.setAttribute('aria-pressed', String(locChua)); ve();
});
document.getElementById('tim').addEventListener('input', e => { tuKhoa = e.target.value.trim().toLowerCase(); ve(); });
document.getElementById('ds').addEventListener('click', async e => {
  const b = e.target.closest('.dang'); if (!b || !luuDb) return;
  const k = b.dataset.k;
  if (dang[k]) delete dang[k]; else dang[k] = new Date().toISOString().slice(0, 10);
  ve();
  try { await luuDb.set({ ...dang }); }
  catch { document.getElementById('tt-db').textContent = 'Không lưu được lên máy chủ — thử lại sau.'; }
});

// ── chuyện lạ còn thiếu ──
const theoGroup = {};
for (const f of D.conThieu) (theoGroup[f.g] ||= []).push(f.v);
const sapXep = Object.entries(theoGroup).sort((a, b) => b[1].length - a[1].length);
document.getElementById('dan-thieu').textContent =
  \`\${D.conThieu.length} mẩu trong app chưa được kể thành video, chia \${sapXep.length} chủ đề. Đối chiếu bằng máy theo độ trùng từ khoá, nên vài mẩu sát ngưỡng cần đọc lại bằng mắt.\`;
document.getElementById('thieu').innerHTML = sapXep.map(([g, l], i) =>
  \`<details\${i === 0 ? ' open' : ''}><summary>\${esc(g)} <b>\${l.length} mẩu</b></summary>
   <ol>\${l.map(v => '<li>' + esc(v) + '</li>').join('')}</ol></details>\`).join('');

ve();

// ── nối máy chủ lưu trạng thái ──
(async () => {
  const db = window.claude && await window.claude.use('db');
  const tt = document.getElementById('tt-db');
  if (!db) { tt.textContent = 'Chưa nối được máy chủ — nút đánh dấu tạm khoá.'; return; }
  luuDb = db.doc('trangthai/dadang');
  try {
    const snap = await luuDb.get();
    if (snap.exists) dang = { ...(snap.data() || {}) };
    tt.textContent = 'Trạng thái đăng bài lưu trên máy chủ.';
  } catch {
    tt.textContent = 'Đọc trạng thái lỗi — vẫn đánh dấu được, sẽ lưu khi bấm.';
  }
  ve();
})();
</script>`;

fs.writeFileSync('promo/ban-do-noi-dung.html', HTML.replace('/*DATA*/', JSON.stringify(DATA)), 'utf8');
console.log('✅ Đã ghi promo/ban-do-noi-dung.html');
console.log(`   ${videos.filter(v => v.x).length} video đã dựng · ${conThieu.length} mẩu chưa làm · ${(fs.statSync('promo/ban-do-noi-dung.html').size / 1024).toFixed(0)} KB`);
