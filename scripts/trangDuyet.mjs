// Sinh TRANG DUYỆT ĐỀ cho thầy cô soi một lượt trước khi cho học sinh dùng.
//
// VÌ SAO PHẢI CÓ: mọi phép kiểm tự động trong gen-de.mjs chỉ soi được HÌNH
// THỨC — đủ bốn lựa chọn, có đúng một đáp án, số câu khớp file. Không phép
// kiểm nào biết được câu 11 có mất cái mũi tên thuận nghịch hay không, hay ảnh
// câu 30 cắt xong còn thừa dòng chữ nào. Chỗ đó phải có mắt người.
//
// ĐIỀU KIỆN SỐNG CÒN: trang này vẽ bằng ĐÚNG bộ vẽ của app — veHtml() ở đây và
// component ChuHoaHoc.tsx trong app đều gọi chung phanTich() của
// src/lib/kyHieuHoa.js. Nhờ vậy thầy cô gật đầu ở trang này thì chắc chắn học
// sinh nhìn thấy đúng thứ đó. Nếu ai đó chép riêng một bộ vẽ cho trang này thì
// trang duyệt mất sạch ý nghĩa, vì nó không còn duyệt cái sẽ chạy thật nữa.

import { veHtml } from '../src/lib/kyHieuHoa.js';
import { MOC_HINH, MOC_BANG } from './deParse.mjs';

const KY = ['A', 'B', 'C', 'D'];

const CSS = `
 body{font:16px/1.55 "Times New Roman",Georgia,serif;max-width:52rem;margin:0 auto;padding:2rem 1rem;color:#111;background:#fff}
 h1{font-size:1.4rem;margin:0 0 .3rem}
 .meta{color:#555;font-size:.85rem;margin-bottom:1.4rem;font-family:system-ui,sans-serif}
 .meta b{color:#111}
 .tomtat{background:#f4f6f8;border-radius:6px;padding:.7rem .9rem;font-family:system-ui,sans-serif;font-size:.85rem;margin-bottom:1.4rem}
 .tomtat ul{margin:.3rem 0 0;padding-left:1.1rem}
 article{border-top:1px solid #ddd;padding:.9rem 0;break-inside:avoid}
 h3{font-size:.78rem;margin:0 0 .3rem;color:#666;font-family:system-ui,sans-serif;letter-spacing:.05em}
 .de{margin:0 0 .5rem;white-space:pre-line}
 ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.15rem .8rem}
 li{padding:.15rem .35rem}
 li.dung{background:#e7f6ea;border-radius:4px}
 .tick{color:#1a7f37;font-size:.7rem;font-family:system-ui,sans-serif;margin-left:.5rem}
 .canh{background:#fff6e0;border-left:3px solid #d68f00;padding:.5rem .7rem;font-size:.85rem;font-family:system-ui,sans-serif;margin:.55rem 0 0}
 img{max-width:100%;border:1px solid #ddd;border-radius:4px;margin:.4rem 0;display:block}
 table{border-collapse:collapse;margin:.4rem 0}
 th,td{border:1px solid #999;padding:.2rem .6rem;text-align:left}
 sub,sup{font-size:.72em}
 .tt{color:#555}
 .mt{margin:0 .25rem}
 .mtd{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 .3rem;line-height:1}
 .mtd .dk{font-size:.62em;color:#444;white-space:nowrap;padding:0 .2rem}
 /* Khối chồng phải CƯỠI NGANG đường chữ: dòng trên nằm ở chỗ số mũ, dòng
    dưới ở chỗ chỉ số. Để nguyên baseline thì cả khối tụt xuống, dòng trên
    hóa ra ngang hàng chữ thường và nhìn như một chữ cái rời. */
 .chong{display:inline-flex;flex-direction:column;align-items:flex-start;vertical-align:-.42em;font-size:.7em;line-height:1.05}
 @media print{body{max-width:none;padding:0} .tomtat{break-inside:avoid}}
`;

const thoat = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function veCau(c, duongHinh) {
  const luaChon = c.luaChon
    .map(
      (x, i) =>
        `<li class="${i === c.dapAn ? 'dung' : ''}"><b>${KY[i]}.</b> ${veHtml(x)}` +
        (i === c.dapAn ? '<span class="tick">✓ đáp án</span>' : '') +
        `</li>`,
    )
    .join('');

  const bang = c.bang
    ? `<table><tr>${c.bang.cot.map((t) => `<th>${veHtml(t)}</th>`).join('')}</tr>` +
      c.bang.dong
        .map((d) => `<tr>${d.map((t) => `<td>${veHtml(t)}</td>`).join('')}</tr>`)
        .join('') +
      `</table>`
    : '';

  const hinh = c.hinh ? `<img src="${duongHinh}${c.hinh}" alt="Hình của câu ${c.so}">` : '';

  // Đề bài cắt theo MỐC, để ảnh và bảng nằm đúng chỗ thầy đặt trong bản Word
  // chứ không bị dồn xuống cuối.
  const de = veHtml(c.de)
    .replace(MOC_HINH, hinh)
    .replace(MOC_BANG, bang);
  const conLai = (c.de.includes(MOC_HINH) ? '' : hinh) + (c.de.includes(MOC_BANG) ? '' : bang);

  const canh = c.dapAnSuyRa
    ? `<p class="canh">⚠ Đề gốc KHÔNG đánh dấu đáp án câu này. Đáp án <b>${KY[c.dapAn]}</b> ở đây là do suy ra từ lí thuyết — xin thầy cô xác nhận giúp.</p>`
    : '';

  return `<article><h3>CÂU ${c.so}</h3><div class="de">${de}</div>${conLai}<ol>${luaChon}</ol>${canh}</article>`;
}

/**
 * @param {object} bo   Bộ đề đã sinh (đúng cấu trúc file public/de/<mã>.json)
 * @param {string[]} tuKiem  Các dòng tự kiểm để in lên đầu trang
 * @param {string} duongHinh Tiền tố đường dẫn ảnh, tính từ chỗ đặt file HTML
 */
export function trangDuyet(bo, tuKiem, duongHinh) {
  const luc = new Date().toLocaleString('vi-VN');
  return `<!doctype html>
<html lang="vi"><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Duyệt đề — ${thoat(bo.ten)}</title>
<style>${CSS}</style>
<h1>${thoat(bo.ten)}</h1>
<p class="meta">Nguồn: <b>${thoat(bo.nguon)}</b> · <b>${bo.soCau}</b> câu · sinh lúc ${luc}</p>
<div class="tomtat">
 <b>Máy đã tự kiểm được những gì:</b>
 <ul>${tuKiem.map((t) => `<li>${thoat(t)}</li>`).join('')}</ul>
 <p style="margin:.6rem 0 0">Những phép kiểm trên chỉ soi được <b>hình thức</b>. Nội dung hóa học,
 chữ trong công thức và ảnh minh họa thì cần thầy cô soi bằng mắt — đó là việc của trang này.
 Trang vẽ bằng đúng bộ vẽ của ứng dụng, nên thầy cô thấy sao thì học sinh thấy y như vậy.</p>
 <p style="margin:.6rem 0 0">Thầy cô <b>chỉ cần đọc và chỉ chỗ sai</b>. Việc chuyển đề vào ứng dụng
 do bên làm app lo, thầy cô không phải nhập liệu hay sửa gì trong máy.</p>
</div>
${bo.cau.map((c) => veCau(c, duongHinh)).join('\n')}
</html>`;
}
