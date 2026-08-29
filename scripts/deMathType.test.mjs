import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import JSZip from 'jszip';
import { bocCongThuc } from './deMathType.mjs';

// Phép kiểm chạy trên CHÍNH FILE WORD THẦY GỬI, không dùng dữ liệu giả.
//
// Vì sao phải vậy: bộ đọc MTEF này suy ra từ nhị phân thật chứ không có tài
// liệu đặc tả trong tay. Dữ liệu giả do mình tự dựng thì chỉ chứng minh mình
// hiểu đúng chính mình. File thầy gửi mới là thứ phải đọc được.
//
// PHÉP ĐỐI CHIẾU MẠNH NHẤT nằm ở đề Nitrogen: 15 câu của đề đó đã từng được
// người soi bằng mắt rồi gõ tay vào de-nguon/1. Nitrogen_TN_ĐA_2026.va.json.
// Nếu máy đọc ra đúng chuỗi mà người đã gõ, thì hai đường độc lập cùng ra một
// kết quả — đó là bằng chứng chắc hơn mọi phép kiểm tự dựng.

const THU_MUC = 'de-nguon';

const timDe = (dau) =>
  existsSync(THU_MUC)
    ? readdirSync(THU_MUC).find((f) => f.startsWith(dau) && f.endsWith('.docx'))
    : undefined;

async function docHet(tenTep) {
  const zip = await JSZip.loadAsync(readFileSync(join(THU_MUC, tenTep)));
  const relsXml = await zip.file('word/_rels/document.xml.rels').async('string');
  const rels = {};
  for (const m of relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="([^"]+)"/g)) rels[m[1]] = m[2];

  const doc = await zip.file('word/document.xml').async('string');
  const ra = [];
  for (const m of doc.matchAll(/<o:OLEObject[^>]*r:id="(rId\d+)"/g)) {
    const tep = zip.file('word/' + (rels[m[1]] ?? '').replace(/^\.\//, ''));
    if (tep) ra.push(bocCongThuc(await tep.async('nodebuffer')));
  }
  return ra;
}

describe('bocCongThuc — đọc công thức MathType trong file Word thật', () => {
  const nitrogen = timDe('1.');
  const dienLi = timDe('2.');

  it.skipIf(!nitrogen)('đề Nitrogen: máy đọc ra ĐÚNG chuỗi người đã soi bằng mắt', async () => {
    const ds = await docHet(nitrogen);
    const chu = ds.map((x) => x.chu);

    // Ba chuỗi dưới đây được chép nguyên từ bản vá viết tay hồi 28/08/2026,
    // hồi còn tưởng công thức MathType là thứ không đọc nổi.
    expect(chu).toContain(
      'N_{2}->[+X][(1)]NO->[+X][(2)]NO_{2}->[+X+H_{2}O][(3)]HNO_{3}->H^{+}+NO_{3}^{−}',
    );
    expect(chu).toContain('3Ca+N_{2}->[t^{o}]Ca_{3}N_{2}');
    expect(chu).toContain('ΔH_{r}^{o} = 55,1 kJ.');

    // Không đọc được thì phải TỰ KHAI, chứ không được im lặng trả về chữ cụt.
    for (const x of ds) if (!x.hieu) expect(x.chu.trim()).toBe('');
  });

  it.skipIf(!dienLi)('đề Sự điện li: đọc trọn cả 46 công thức', async () => {
    const ds = await docHet(dienLi);
    expect(ds).toHaveLength(46);
    expect(ds.filter((x) => x.hieu)).toHaveLength(46);

    const chu = ds.map((x) => x.chu);
    expect(chu).toContain('SO_{4}^{2−}'); // chỉ số dưới VÀ số mũ cùng một chỗ
    expect(chu).toContain('NH_{4}^{+}'); // ô chỉ số dưới bỏ trống
    expect(chu).toContain('H^{+}+OH^{−}->H_{2}O');
    expect(chu).toContain('S^{2−} + H_{2}O<=> HS^{−} + OH^{−}');
  });
});
