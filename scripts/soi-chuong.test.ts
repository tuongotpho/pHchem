// TRANG SOI CÁCH XẾP CHƯƠNG — đồ nghề cho thầy cô, chạy bằng:
//
//     npm run soi:chuong
//
// Sinh ra chuong-review.html: bảng xếp chương của TOÀN BỘ dữ liệu app (phản
// ứng, chất, nguyên tố), kèm con số xếp được bao nhiêu trên bao nhiêu.
//
// VÌ SAO LÀ FILE .test.ts CHỨ KHÔNG PHẢI SCRIPT .mjs như các đồ nghề khác:
// nó phải đọc src/lib/xepChuong.ts, mà Node trần không chạy được TypeScript.
// Mượn vitest làm bộ dịch. Đổi lại, file này nằm NGOÀI src nên `tsc -b` không
// gác kiểu cho nó — cố ý, để khỏi phải mở cửa cho kiểu của Node vào tsconfig
// của app chỉ vì một trang in ra để soi.
//
// Cách xếp là QUY TẮC VIẾT TAY, máy không biết đúng sai (xem đầu file
// src/lib/xepChuong.ts). Trang này sinh ra chính là để có người biết.

import { it, expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { chuongCuaChat, chuongCuaNguyenTo, chuongCuaPhanUng } from '../src/lib/xepChuong';
import { chuongTheoMa } from '../src/data/chuongTrinh.js';
import { REACTIONS } from '../src/data/reactions';
import { FORMULAS } from '../src/data/formulas';
import { ELEMENTS } from '../src/data/elements';

interface Hang {
  ten: string;
  phu: string;
  chuong: string | null;
}

const oan = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const tenChuong = (ma: string | null) => {
  if (!ma) return '<em>chưa xếp</em>';
  const c = chuongTheoMa(ma);
  return c ? `Lớp ${c.lop} · Ch.${c.so} — ${oan(c.vi)}` : oan(ma);
};

it('ghi chuong-review.html để thầy cô soi cách xếp chương', () => {
  const nhom: { ten: string; hang: Hang[] }[] = [
    {
      ten: 'Phản ứng',
      hang: REACTIONS.map((r) => ({
        ten: r.eq,
        phu: r.type.join(', '),
        chuong: chuongCuaPhanUng(r),
      })),
    },
    {
      ten: 'Chất',
      hang: FORMULAS.filter((f) => f.cat !== 'physical').map((f) => ({
        ten: `${f.vi} (${f.formula})`,
        phu: f.nhom ?? '',
        chuong: chuongCuaChat(f),
      })),
    },
    {
      ten: 'Nguyên tố',
      hang: ELEMENTS.map((e) => ({
        ten: `${e.vi} (${e.sym})`,
        phu: e.cat,
        chuong: chuongCuaNguyenTo(e.cat, e.n),
      })),
    },
  ];

  const phan = nhom
    .map((n) => {
      const xep = n.hang.filter((h) => h.chuong).length;
      const dong = n.hang
        .map(
          (h) =>
            `<tr><td>${oan(h.ten)}</td><td class="phu">${oan(h.phu)}</td><td>${tenChuong(h.chuong)}</td></tr>`,
        )
        .join('\n');
      return `<h2>${n.ten} — xếp được ${xep}/${n.hang.length}</h2>
<table><thead><tr><th>Mục</th><th>Phân loại sẵn có</th><th>Chương</th></tr></thead>
<tbody>
${dong}
</tbody></table>`;
    })
    .join('\n');

  writeFileSync(
    'chuong-review.html',
    `<!doctype html><html lang="vi"><meta charset="utf-8">
<title>Soi cách xếp chương</title>
<style>
 body{font:15px/1.5 system-ui,sans-serif;margin:24px;max-width:1000px}
 table{border-collapse:collapse;width:100%;margin-bottom:28px}
 th,td{border:1px solid #ccc;padding:4px 8px;text-align:left;vertical-align:top}
 th{background:#f3f4f6;position:sticky;top:0}
 .phu{color:#666;font-size:13px}
 em{color:#b45309}
</style>
<h1>Cách app xếp dữ liệu vào chương sách giáo khoa</h1>
<p>Sinh tự động bởi <code>npm run soi:chuong</code>. Đây là phép xếp THEO QUY TẮC —
máy không tự biết đúng sai, nhờ thầy cô soi cột cuối rồi chỉ chỗ sai.
Mục ghi <em>chưa xếp</em> vẫn dùng bình thường ở phần &ldquo;Tất cả&rdquo;, chỉ là
không nằm dưới chương nào.</p>
${phan}
</html>
`,
  );

  console.log(
    ['', 'Mức phủ xếp chương → chuong-review.html:']
      .concat(nhom.map((n) => `  ${n.ten}: ${n.hang.filter((h) => h.chuong).length}/${n.hang.length}`))
      .join('\n'),
  );

  // Không có gì để soi thì trang soi là trang trắng — đó là hỏng, không phải
  // "sạch". Ràng một điều kiện tối thiểu để lỗi nhập dữ liệu không đi lọt.
  expect(nhom.every((n) => n.hang.length > 0)).toBe(true);
});
