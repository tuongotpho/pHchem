import { describe, it, expect } from 'vitest';
import { timMocLuaChon, catThanhCau, bocDoan, tachDoan } from './deParse.mjs';

// Dựng nhanh một đoạn Word giả để khỏi phải có file .docx thật trong test.
const doan = (mau, { hinh = [], congThuc = false, ole } = {}) => {
  const runs = mau
    .map(([chu, gach]) => {
      const rPr = gach ? '<w:rPr><w:u w:val="single"/></w:rPr>' : '<w:rPr/>';
      return `<w:r>${rPr}<w:t xml:space="preserve">${chu}</w:t></w:r>`;
    })
    .join('');
  const anh = hinh.map((r) => `<w:drawing><a:blip r:embed="${r}"/></w:drawing>`).join('');
  // Không có r:id: đúng cảnh công thức KHÔNG bóc ra chữ được.
  const ct = congThuc ? '<w:object><o:OLEObject ProgID="Equation.DSMT4"/></w:object>' : '';
  return bocDoan(`<w:p>${runs}${anh}${ct}</w:p>`, ole ?? {});
};

/** Một run chứa công thức MathType có mã tra cứu, kèm bản vẽ xem trước WMF. */
const runCongThuc = (rid) =>
  `<w:r><w:object><v:shape><v:imagedata r:id="rId90"/></v:shape>` +
  `<o:OLEObject Type="Embed" ProgID="Equation.DSMT4" r:id="${rid}"/></w:object></w:r>`;

describe('timMocLuaChon — tìm bốn mốc A. B. C. D.', () => {
  it('tìm được bộ mốc thường gặp', () => {
    const moc = timMocLuaChon('A. một\tB. hai\tC. ba\tD. bốn');
    expect(moc?.map((m) => m.ky)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('mốc đứng đầu dòng cũng nhận', () => {
    // Đây chính là ca làm hỏng đề Nitrogen: dòng lựa chọn nằm ngay đầu đoạn.
    expect(timMocLuaChon('A.\nB.\nC.\nD.')).not.toBeNull();
  });

  it('KHÔNG bắt chữ cái nằm giữa câu', () => {
    // "dung dịch A tác dụng..." là câu thật trong đề — bắt nhầm là cắt đề
    // thành lựa chọn, câu hỏi biến mất.
    expect(timMocLuaChon('Dung dịch A tác dụng với NaOH thì sao?')).toBeNull();
    expect(timMocLuaChon('Chất X là N2. Chất Y là HNO3.')).toBeNull();
  });

  it('đòi đủ bốn mốc và đúng thứ tự', () => {
    expect(timMocLuaChon('A. một B. hai C. ba')).toBeNull(); // thiếu D
    expect(timMocLuaChon('B. hai A. một C. ba D. bốn')).toBeNull(); // sai thứ tự
  });

  it('không nhận chữ cái dính vào chữ khác', () => {
    // "NaA." có chữ A dính sau chữ a — không phải mốc. Mốc thật là chữ A đứng
    // sau khoảng trắng ở phía sau.
    const chu = 'Cho NaA. Chọn: A. một B. hai C. ba D. bốn';
    const moc = timMocLuaChon(chu);
    expect(moc).not.toBeNull();
    expect(chu.slice(moc[0].batDau, moc[1].mocDau).trim()).toBe('một');
  });

  it('lựa chọn rỗng vẫn tính là có mốc', () => {
    // Cả bốn lựa chọn là công thức MathType nên bóc ra rỗng — vẫn phải nhận.
    expect(timMocLuaChon('A. \t B. \t C. \t D.')).not.toBeNull();
  });
});

describe('catThanhCau — cắt tài liệu thành từng câu', () => {
  const deGon = [
    doan([['Câu 1. Hỏi gì đó?', false]]),
    doan([
      ['A. ', false],
      ['một', false],
      ['\tB', true],
      ['. hai', false],
      ['\tC. ba', false],
      ['\tD. bốn', false],
    ]),
  ];

  it('bóc ra đủ đề bài, bốn lựa chọn và đáp án gạch chân', () => {
    const cau = catThanhCau(deGon);
    expect(cau).toHaveLength(1);
    expect(cau[0].soGhi).toBe(1);
    expect(cau[0].de).toBe('Hỏi gì đó?');
    expect(cau[0].luaChon).toEqual(['một', 'hai', 'ba', 'bốn']);
    expect(cau[0].dapAn).toBe(1); // B được gạch chân
  });

  it('KHÔNG nuốt câu có lựa chọn rỗng', () => {
    // Ca thật của đề Nitrogen: câu 36 có cả bốn lựa chọn là MathType. Bản đầu
    // của bộ cắt bỏ qua câu này, khiến mọi câu sau lệch số một bậc mà không
    // báo lỗi gì — đề vẫn đủ 4 lựa chọn, vẫn có đáp án, chỉ là nội dung của
    // câu khác. Đây là phép kiểm quan trọng nhất file này.
    const cau = catThanhCau([
      doan([['Câu 1. Câu thường', false]]),
      doan([['A. x\tB. y\tC. z\t', false], ['D', true], ['. t', false]]),
      doan([['Câu 2. Câu có công thức', false]], { congThuc: true }),
      doan([['A. \t', false], ['B', true], ['. \tC. \tD.', false]], { congThuc: true }),
      doan([['Câu 3. Câu thường nữa', false]]),
      doan([['A. p\tB. q\t', false], ['C', true], ['. r\tD. s', false]]),
    ]);
    expect(cau).toHaveLength(3);
    expect(cau.map((c) => c.soGhi)).toEqual([1, 2, 3]);
    expect(cau[1].luaChon).toEqual(['', '', '', '']);
    expect(cau[1].thieuCongThuc).toBe(true);
  });

  it('đề bài trải qua nhiều đoạn thì gom đủ', () => {
    const cau = catThanhCau([
      doan([['Câu 5. Cho phản ứng sau:', false]]),
      doan([['Biết năng lượng liên kết cho ở bảng:', false]], { hinh: ['rId9'] }),
      doan([['Tính biến thiên enthalpy.', false]]),
      doan([['A. 1\t', false], ['B', true], ['. 2\tC. 3\tD. 4', false]]),
    ]);
    expect(cau).toHaveLength(1);
    expect(cau[0].de).toContain('Cho phản ứng sau:');
    expect(cau[0].de).toContain('Tính biến thiên enthalpy.');
    expect(cau[0].hinh).toEqual(['rId9']);
  });

  it('không có mốc đáp án gạch chân thì trả -1 chứ không đoán bừa', () => {
    const cau = catThanhCau([
      doan([['Câu 1. Hỏi?', false]]),
      doan([['A. a\tB. b\tC. c\tD. d', false]]),
    ]);
    expect(cau[0].dapAn).toBe(-1);
  });
});

describe('bocDoan — đọc mẩu chữ và cờ định dạng', () => {
  it('nối các mẩu chữ Word cắt vụn thành một chuỗi', () => {
    const d = doan([
      ['không', false],
      [' ', false],
      ['khí', false],
      ['.', false],
    ]);
    expect(d.chu).toBe('không khí.');
  });

  it('gạch chân bị TẮT tường minh thì không tính là gạch chân', () => {
    const d = bocDoan('<w:p><w:r><w:rPr><w:u w:val="none"/></w:rPr><w:t>B</w:t></w:r></w:p>');
    expect(d.mau[0].gachChan).toBe(false);
  });

  it('công thức MathType KHÔNG bóc được chữ thì khai là thiếu', () => {
    expect(doan([['x', false]], { congThuc: true }).thieuCongThuc).toBe(true);
    expect(doan([['x', false]]).thieuCongThuc).toBe(false);
  });

  it('công thức đã bóc được chữ thì cắm vào ĐÚNG CHỖ nó đứng giữa đoạn', () => {
    // Đây là cả lý do bocDoan phải đi theo từng run: cắm sai chỗ thì câu đọc
    // lên ngược — "Cho phương trình: . Phát biểu nào đúng?" mà công thức bị
    // dồn xuống cuối.
    const xml =
      '<w:p><w:r><w:rPr/><w:t xml:space="preserve">Cho phương trình: </w:t></w:r>' +
      runCongThuc('rId7') +
      '<w:r><w:rPr/><w:t>. Phát biểu nào đúng?</w:t></w:r></w:p>';
    const d = bocDoan(xml, { rId7: { chu: 'NH_{4}^{+} + H_{2}O <=> NH_{3}', hieu: true } });
    expect(d.chu).toBe('Cho phương trình: NH_{4}^{+} + H_{2}O <=> NH_{3}. Phát biểu nào đúng?');
    expect(d.thieuCongThuc).toBe(false);
  });

  it('bản vẽ xem trước của công thức KHÔNG bị tính là ảnh của đề', () => {
    // Bên trong <w:object> có một <v:imagedata> — đó là ảnh WMF vẽ lại công
    // thức, không phải hình minh họa. Tính nhầm là đề mọc thêm mốc "{{hinh}}".
    const d = bocDoan(`<w:p>${runCongThuc('rId7')}</w:p>`, { rId7: { chu: '->', hieu: true } });
    expect(d.hinh).toEqual([]);
  });

  it('đọc chỉ số dưới và số mũ thầy đánh dấu bằng định dạng Word', () => {
    // Thầy đánh dấu 93 chỗ chỉ số dưới và 32 chỗ số mũ trong đề Nitrogen. Đây
    // là Ý ĐỊNH của người soạn, quý hơn mọi phép đoán từ chữ trần: "14N" trong
    // câu 19 là đồng vị ¹⁴N chứ không phải hệ số 14, mà chữ trần thì hai thứ
    // trông y hệt nhau.
    const sub = (t) =>
      `<w:r><w:rPr><w:vertAlign w:val="subscript"/></w:rPr><w:t>${t}</w:t></w:r>`;
    const sup = (t) =>
      `<w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>${t}</w:t></w:r>`;
    const thuong = (t) => `<w:r><w:rPr/><w:t xml:space="preserve">${t}</w:t></w:r>`;

    expect(bocDoan(`<w:p>${thuong('H')}${sub('2')}${thuong('O')}</w:p>`).chu).toBe('H_{2}O');
    expect(bocDoan(`<w:p>${sup('14')}${thuong('N')}</w:p>`).chu).toBe('^{14}N');
    expect(bocDoan(`<w:p>${thuong('NH')}${sub('4')}${sup('+')}</w:p>`).chu).toBe('NH_{4}^{+}');
  });

  it('gộp các mẩu cùng kiểu Word cắt vụn', () => {
    // Word có thể cắt "14" thành hai mẩu; không gộp thì ra "^{1}^{4}".
    const sup = (t) =>
      `<w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>${t}</w:t></w:r>`;
    expect(bocDoan(`<w:p>${sup('1')}${sup('4')}</w:p>`).chu).toBe('^{14}');
  });

  it('khoảng trắng thừa nằm NGOÀI dấu bọc', () => {
    // Ca thật ở câu 30: Word để mẩu chỉ số là "3 " kèm dấu cách. Bọc cả vào thì
    // thành "NH_{3 }có" — dấu cách bị thu nhỏ theo chỉ số, hai chữ dính nhau.
    const sub = (t) =>
      `<w:r><w:rPr><w:vertAlign w:val="subscript"/></w:rPr><w:t xml:space="preserve">${t}</w:t></w:r>`;
    const thuong = (t) => `<w:r><w:rPr/><w:t xml:space="preserve">${t}</w:t></w:r>`;
    expect(bocDoan(`<w:p>${thuong('NH')}${sub('3 ')}${thuong('có')}</w:p>`).chu).toBe('NH_{3} có');
  });

  it('thẻ tab thành ký tự tab', () => {
    const d = bocDoan('<w:p><w:r><w:rPr/><w:t>A.</w:t><w:tab/><w:t>B.</w:t></w:r></w:p>');
    expect(d.chu).toBe('A.\tB.');
  });
});

describe('tachDoan', () => {
  it('tách đúng số đoạn trong thân tài liệu', () => {
    const xml = '<w:body><w:p><w:r><w:rPr/><w:t>một</w:t></w:r></w:p><w:p><w:r><w:rPr/><w:t>hai</w:t></w:r></w:p></w:body>';
    expect(tachDoan(xml).map((d) => d.chu)).toEqual(['một', 'hai']);
  });
});
