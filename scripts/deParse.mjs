// Lõi bóc đề trắc nghiệm từ XML của file Word. TÁCH RIÊNG KHỎI gen-de.mjs để
// có thể chạy phép kiểm tự động — xem deParse.test.mjs.
//
// Vì sao đáng tách: đây là chỗ dễ sai lặng lẽ nhất trong cả đường ống. Cắt
// nhầm một chỗ thì đề vẫn ra, vẫn đủ bốn lựa chọn, nhìn vẫn xuôi — chỉ có nội
// dung là của câu khác. Không ai phát hiện cho tới khi học sinh làm bài.

/** Gỡ mấy ký tự XML đã mã hóa về lại chữ thường. */
export const goXml = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');

/**
 * Bọc chữ đã được thầy đánh dấu chỉ số dưới / số mũ thành ký hiệu tường minh.
 *
 * Dùng cú pháp `^{...}` và `_{...}` của mhchem — cùng thứ mà bộ vẽ trong app
 * (src/lib/kyHieuHoa.js) hiểu. Nhờ vậy ý định của thầy đi thẳng từ file Word
 * tới màn hình học sinh, không qua một lần phỏng đoán nào.
 *
 * Mẩu rỗng hoặc chỉ có khoảng trắng thì để nguyên: bọc lại chỉ tạo ra "^{ }"
 * vô nghĩa giữa câu.
 */
function boc(chu, dang) {
  if (!dang || !chu.trim()) return chu;
  // Khoảng trắng hai đầu phải nằm NGOÀI dấu bọc. Word hay để dư một dấu cách
  // trong chính mẩu chỉ số — "NH" + chỉ số "3 " + "có thể thu..." — bọc cả vào
  // thì thành "NH_{3 }có", dấu cách bị thu nhỏ theo chỉ số và hai chữ dính nhau.
  const [, dau, loi, cuoi] = chu.match(/^(\s*)([\s\S]*?)(\s*)$/);
  return dau + (dang === 'superscript' ? '^{' : '_{') + loi + '}' + cuoi;
}

/**
 * Bóc một đoạn văn thành danh sách "mẩu chữ", mỗi mẩu kèm cờ gạch chân.
 *
 * Word cắt chữ thành rất nhiều mẩu nhỏ theo định dạng — "không khí." có thể
 * nằm ở bốn mẩu rời. Nên phải đi theo thứ tự mẩu chứ không thể lấy cả đoạn rồi
 * tìm chữ: mất luôn thông tin mẩu nào được gạch chân, mà gạch chân chính là
 * đáp án.
 */
export function bocDoan(xmlDoan) {
  const mau = [];
  const hinh = [];

  for (const m of xmlDoan.matchAll(/<w:r(?:\s[^>]*)?>([\s\S]*?)<\/w:r>/g)) {
    const than = m[1];
    const rPr = than.match(/<w:rPr>([\s\S]*?)<\/w:rPr>/)?.[1] ?? '';
    // <w:u w:val="none"/> là TẮT gạch chân, không phải bật. Bỏ sót chỗ này thì
    // một chữ cái bị tắt gạch chân vẫn bị chấm thành đáp án.
    const gachChan = /<w:u\s/.test(rPr) && !/<w:u[^>]*w:val="none"/.test(rPr);

    // CHỈ SỐ DƯỚI / SỐ MŨ THẦY TỰ ĐÁNH DẤU trong Word. Đề Nitrogen có 93 chỗ
    // chỉ số dưới và 32 chỗ số mũ được đánh dấu kiểu này.
    //
    // Phải đọc, vì đây là Ý ĐỊNH CỦA NGƯỜI SOẠN chứ không phải phỏng đoán. Bỏ
    // qua rồi để khâu hiển thị tự đoán lại từ chữ trần thì có chỗ đoán không
    // nổi: "14N" trong câu 19 là đồng vị ¹⁴N, nhưng chữ trần trông y hệt một
    // hệ số 14 nhân với N. Máy không thể phân biệt, còn thầy thì đã nói rõ.
    const dang = rPr.match(/<w:vertAlign[^>]*w:val="(superscript|subscript)"/)?.[1];

    let chu = '';
    for (const t of than.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\s*\/>/g)) {
      chu += t[1] === undefined ? '\t' : goXml(t[1]);
    }
    if (!chu) continue;

    // Gộp với mẩu liền trước nếu cùng kiểu, để "14" không thành ^{1}^{4} khi
    // Word cắt nó làm hai mẩu.
    const truoc = mau[mau.length - 1];
    if (dang && truoc?.dang === dang && truoc.gachChan === gachChan) {
      truoc.chuTho += chu;
      truoc.chu = boc(truoc.chuTho, dang);
      continue;
    }
    mau.push({ chu: boc(chu, dang), chuTho: chu, gachChan, dang });
  }

  for (const m of xmlDoan.matchAll(/r:embed="(rId\d+)"|v:imagedata[^>]*r:id="(rId\d+)"/g)) {
    hinh.push(m[1] ?? m[2]);
  }

  return {
    mau,
    hinh,
    // Đoạn có chèn công thức MathType. PHẢI theo dõi cờ này: chữ trong công
    // thức KHÔNG đọc ra được, nên đoạn nào có nó là đoạn đó thiếu nội dung —
    // dù phần chữ còn lại đọc vẫn xuôi tai. Đây là kiểu hỏng nguy hiểm nhất.
    coCongThuc: /<w:object|Equation\.DSMT4|<o:OLEObject/.test(xmlDoan),
    chu: mau.map((x) => x.chu).join(''),
  };
}

/** Tách các đoạn từ XML thân tài liệu. */
export function tachDoan(documentXml) {
  const ds = [];
  for (const m of documentXml.matchAll(/<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g)) ds.push(bocDoan(m[0]));
  return ds;
}

export const DAU_CAU = /^\s*Câu\s*(\d+)\s*[.:]/;

/**
 * Mốc đánh dấu "chỗ này có ảnh" trong đề bài. Cả bộ sinh đề lẫn chỗ hiển thị
 * đều nhận ra chuỗi này, nên ảnh và bảng nằm đúng chỗ thầy đặt.
 * Chọn dạng ngoặc nhọn kép vì không đề nào viết như vậy, và vì nó không chứa
 * chữ A-D nên không làm rối bộ dò mốc lựa chọn.
 */
export const MOC_HINH = '{{hinh}}';
export const MOC_BANG = '{{bang}}';

const KY_TU = ['A', 'B', 'C', 'D'];

/**
 * Tìm bốn mốc A. B. C. D. trong một chuỗi, theo ĐÚNG THỨ TỰ.
 *
 * Phải theo thứ tự vì trong đề có câu nhắc tới "dung dịch A", "chất X là N2" —
 * bắt bừa chữ A giữa câu là cắt nhầm đề thành lựa chọn. Đòi đủ cả bốn và tăng
 * dần thì những chỗ đó không lọt.
 *
 * Mốc phải đứng đầu dòng hoặc sau khoảng trắng/dấu mở ngoặc, để chữ A trong
 * "NaA." hay "hình A." không bị nhận nhầm.
 */
export function timMocLuaChon(chu) {
  const moc = [];
  let tu = 0;
  for (const ky of KY_TU) {
    const re = new RegExp('(?:^|[\\s(])' + ky + '\\s*[.、]', 'g');
    re.lastIndex = tu;
    const m = re.exec(chu);
    if (!m) return null;
    // Bỏ qua khoảng trắng ngay sau dấu chấm để lựa chọn không dính đầu cách.
    let batDau = m.index + m[0].length;
    while (batDau < chu.length && /[ \t]/.test(chu[batDau])) batDau++;
    moc.push({ ky, batDau, mocDau: m.index });
    // Chỗ tìm tiếp PHẢI đặt ngay sau dấu chấm, KHÔNG được nhảy qua khoảng
    // trắng. Vì mốc sau còn cần chính khoảng trắng đó làm dấu nhận diện —
    // "A. \t B." mà nhảy qua thì con trỏ đứng ngay trên chữ B, không còn
    // khoảng trắng đứng trước, và B không bao giờ khớp. Lỗi này từng nuốt
    // trọn câu 36 của đề Nitrogen (câu có cả bốn lựa chọn là công thức) rồi
    // làm mọi câu sau lệch số một bậc mà không báo gì.
    tu = m.index + m[0].length;
  }
  return moc;
}

/**
 * Gom các đoạn thành từng câu.
 *
 * MỘT CÂU KẾT THÚC KHI GOM ĐỦ BỐN MỐC LỰA CHỌN, không phải khi gặp chữ "Câu"
 * tiếp theo. Lý do: nhiều câu có đề bài trải qua vài đoạn, có đoạn chỉ chứa
 * ảnh hoặc công thức, nên đếm theo chữ "Câu" là cắt nhầm.
 *
 * LỰA CHỌN RỖNG VẪN TÍNH LÀ MỘT CÂU. Đề Nitrogen có câu 36 mà cả bốn lựa chọn
 * đều là công thức MathType, bóc ra rỗng trơn. Nếu đòi lựa chọn phải có chữ
 * mới chốt câu thì câu đó bị nuốt, và mọi câu sau nó lệch số một bậc — hỏng
 * âm thầm đúng kiểu tệ nhất. Cứ chốt, rồi để lớp tự kiểm báo là câu này rỗng.
 */
export function catThanhCau(doan) {
  const cau = [];
  let gom = [];

  const chotCau = () => {
    // Đoạn nào có ảnh thì cắm một CÁI MỐC vào đúng chỗ đó trong đề bài.
    //
    // Vì sao cần: ngân hàng đề hay xen ảnh vào GIỮA đề bài — câu 22 là "Biết
    // năng lượng liên kết cho trong bảng sau:" rồi mới tới bảng, rồi mới tới
    // "Tính giá trị biến thiên enthalpy...". Không có mốc thì ảnh bị dồn hết
    // xuống cuối, đề đọc lên thành "cho trong bảng sau: ... tính giá trị ...
    // [bảng]" — vẫn làm được bài nhưng đọc ngược, và thầy cô duyệt sẽ gợn.
    const chu = gom.map((d) => d.chu + (d.hinh.length ? '\n' + MOC_HINH : '')).join('\n');
    const moc = timMocLuaChon(chu);
    if (!moc) return false;

    const soGhi = chu.match(DAU_CAU)?.[1];
    const de = chu.slice(0, moc[0].mocDau).replace(DAU_CAU, '').replace(/[ \t]+/g, ' ').trim();

    const luaChon = moc.map((m, i) => {
      const het = i < 3 ? moc[i + 1].mocDau : chu.length;
      return chu.slice(m.batDau, het).replace(/\s+/g, ' ').trim();
    });

    let dapAn = -1;
    for (const d of gom) {
      for (const m of d.mau) {
        if (!m.gachChan) continue;
        const k = m.chu.trim().replace(/[.、]\s*$/, '');
        const i = KY_TU.indexOf(k);
        if (i >= 0) dapAn = i;
      }
    }

    cau.push({
      soGhi: soGhi ? Number(soGhi) : null,
      de,
      luaChon,
      dapAn,
      hinh: gom.flatMap((d) => d.hinh),
      coCongThuc: gom.some((d) => d.coCongThuc),
    });
    gom = [];
    return true;
  };

  for (const d of doan) {
    // Gặp "Câu N." mới trong khi phần đang gom chưa chốt được câu nào: phần cũ
    // là rác (tiêu đề, dòng thừa) — vứt đi chứ không để nó dính vào câu mới.
    if (DAU_CAU.test(d.chu) && gom.length) gom = [];
    gom.push(d);
    chotCau();
  }
  return cau;
}
