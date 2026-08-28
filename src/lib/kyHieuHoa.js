// Phân tích ký hiệu hóa học trong một dòng chữ, để chỗ hiển thị vẽ cho đúng:
// chỉ số dưới, số mũ điện tích, số khối đồng vị, trạng thái chất, mũi tên kèm
// điều kiện phản ứng.
//
// LÀ FILE .js CHỨ KHÔNG PHẢI .ts, cùng lý do với phanTichCongThuc.js: script
// sinh trang duyệt đề chạy bằng Node trần, không qua bộ dịch nào. Kiểu khai
// bằng chú thích JSDoc nên TypeScript vẫn hiểu đủ.
//
// KHÔNG DÍNH REACT. File này bị hai nơi kéo vào: component vẽ trong app, và
// script sinh trang duyệt đề chạy bằng Node. Chép làm hai bản thì hôm nào sửa
// một bên, trang thầy cô duyệt sẽ khác thứ học sinh nhìn thấy — mà đó đúng là
// thứ trang duyệt sinh ra để chống.
//
// CÚ PHÁP MƯỢN CỦA mhchem (bộ ký hiệu hóa học chuẩn của giới toán/hóa trên
// web). Mượn cú pháp chứ KHÔNG kéo thư viện: KaTeX + mhchem nặng ~320 KB mã
// cộng 254 KB phông, mà app chạy offline nên phải nạp sẵn tất — gói cài 811 KB
// sẽ phồng gần gấp rưỡi. Bộ này vài KB, dùng đúng phông và màu của app.
// Đổi lại, hôm nào đề có toán thật (phân số nhiều tầng trong biểu thức hằng số
// cân bằng chẳng hạn) thì cắm KaTeX vào là chạy, KHÔNG phải sửa một dòng dữ
// liệu nào — vì dữ liệu đã viết sẵn theo cú pháp của họ.
//
// ═══ NGUYÊN TẮC AN TOÀN, đọc trước khi sửa file này ═══
// Bộ này chỉ được phép ĐỘNG VÀO thứ nó CHẮC CHẮN là ký hiệu hóa học. Chữ nào
// không chắc thì trả về nguyên xi. Lý do: đây là đề học sinh làm thật. Hiện
// chữ thô "2NO2" chỉ là xấu; hiện sai thành "₂NO₂" là dạy sai hóa học — hệ số
// 2 biến thành chỉ số. Xấu còn sửa được, sai thì không ai biết mà sửa.
//
// Hệ quả cụ thể: mẩu chữ KHÔNG chứa chữ số và KHÔNG có dấu điện tích thì đi
// thẳng ra ngoài không qua xử lý. Nhờ vậy toàn bộ chữ tiếng Việt, tên hình,
// số câu, số liệu có dấu phẩy... đều miễn nhiễm.

/**
 * Một mảnh đã phân tích xong, chờ vẽ.
 *
 *   chu       — chữ thường, vẽ nguyên xi
 *   duoi      — chỉ số dưới: số 2 trong H₂O
 *   tren      — số mũ: điện tích NH₄⁺, số khối ¹⁴N, số electron 1s²
 *   trangThai — (g) (l) (s) (aq), in nghiêng theo thông lệ
 *   muiTen    — mũi tên phản ứng, kèm điều kiện nằm trên và/hoặc dưới
 *
 * @typedef {{ k: 'chu'|'duoi'|'tren'|'trangThai', t: string }
 *          | { k: 'muiTen', t: string, tren?: string, duoi?: string }} Manh
 */

/** Mũi tên: cú pháp mhchem → ký tự hiển thị. Dài hơn mũi tên thường để có chỗ
 *  đặt điều kiện phía trên mà không bị chữ tràn ra hai bên. */
/** @type {[string, string][]} */
const MUI_TEN = [
  ['<=>>', '⇌'],
  ['<<=>', '⇌'],
  ['<=>', '⇌'],
  ['<->', '⟷'],
  ['->', '⟶'],
  ['<-', '⟵'],
];

const TRANG_THAI = /^\((g|l|s|aq|r|d|k)\)/;

/**
 * Mẩu chữ có phải công thức hóa học không.
 *
 * Điều kiện chặt, cố ý:
 *   - bắt đầu bằng CHỮ HOA, hoặc dấu ngoặc mở có chữ hoa ngay sau
 *   - toàn bộ là ký tự ASCII trong tập cho phép
 *   - phải có ít nhất một CHỮ SỐ đứng ngay sau chữ cái/ngoặc đóng, hoặc kết
 *     thúc bằng dấu điện tích
 *
 * Điều kiện cuối là chốt chặn quan trọng nhất. "Hình 1", "Câu 15", "0,30
 * mol/L", "14,004", "20%" đều trượt. Chữ tiếng Việt có dấu cũng trượt vì
 * không phải ASCII.
 */
/**
 * @param {string} t
 * @returns {boolean}
 */
export function laCongThuc(t) {
  if (CAU_HINH_E.test(t)) return true;
  // Cho phép hệ số đứng đầu ("2NO2") và số khối đồng vị ("^14N"), nhưng phải
  // có CHỮ HOA phía sau — nhờ vậy "15", "0,30", "20%" vẫn trượt.
  if (!/^\d*(\^\d+)?\(?[A-Z]/.test(t)) return false;
  if (!/^[A-Za-z0-9()[\]^+-]+$/.test(t)) return false;
  return CO_CHI_SO.test(t) || CO_DIEN_TICH.test(t) || CO_DONG_VI.test(t);
}

/** Có chữ số đứng ngay sau ký hiệu nguyên tố hoặc ngoặc đóng. */
const CO_CHI_SO = /[A-Za-z)\]]\d/;
/** Kết thúc bằng dấu điện tích. Đòi phải có chữ/số ngay trước để dấu gạch
 *  ngang giữa câu không bị nhận nhầm thành ion. */
const CO_DIEN_TICH = /[A-Za-z0-9)\]]\^?\d*[+-]$/;
/** Số khối đứng trước ký hiệu nguyên tố. */
const CO_DONG_VI = /^\^\d+[A-Za-z]/;

/** Cấu hình electron kiểu "1s22s22p3" — số sau tên phân lớp là SỐ MŨ, không
 *  phải chỉ số dưới. Bắt riêng vì luật chung sẽ hạ nhầm xuống dưới. */
const CAU_HINH_E = /^(\d+[spdf]\d+)+$/;

/** @param {string} t @param {Manh[]} ra */
function bocCauHinhE(t, ra) {
  // Số electron lấy KIỆM (lazy) và phải nhìn thấy phân lớp kế tiếp phía sau.
  // Lấy tham lam thì "1s22s2" bị đọc thành "1s²²" rồi nuốt mất số lớp của
  // phân lớp sau — số 2 của "2s" biến vào số mũ của "1s".
  // Vẫn đọc đúng phân lớp đầy 10-14 electron ("3d104s2" → 3d¹⁰ 4s²) vì phần
  // kiệm sẽ nới ra cho tới khi phía sau đúng là "<số><phân lớp>".
  for (const m of t.matchAll(/(\d)([spdf])(\d+?)(?=\d[spdf]|$)/g)) {
    ra.push({ k: 'chu', t: m[1] + m[2] }, { k: 'tren', t: m[3] });
  }
}

/** Bóc một mẩu đã xác định là công thức thành các phần con. */
/** @param {string} t @param {Manh[]} ra */
function bocCongThuc(t, ra) {
  if (CAU_HINH_E.test(t)) return bocCauHinhE(t, ra);

  let i = 0;
  // Số khối đứng trước ký hiệu nguyên tố: "^14N" → ¹⁴N
  const dongVi = t.match(/^\^(\d+)/);
  if (dongVi) {
    ra.push({ k: 'tren', t: dongVi[1] });
    i = dongVi[0].length;
  }

  let dem = '';
  const xaChu = () => {
    if (dem) ra.push({ k: 'chu', t: dem });
    dem = '';
  };

  while (i < t.length) {
    const con = t.slice(i);

    const tt = con.match(TRANG_THAI);
    if (tt) {
      xaChu();
      ra.push({ k: 'trangThai', t: tt[0] });
      i += tt[0].length;
      continue;
    }

    // Điện tích ở CUỐI mẩu. Theo đúng quy ước mhchem, ĐỘ LỚN điện tích phải
    // khai bằng dấu ^: "CrO4^2-" là CrO₄²⁻. Không có dấu ^ thì chữ số là chỉ
    // số dưới còn dấu là điện tích 1 — "NH4+" là NH₄⁺ chứ không phải NH⁴⁺.
    const dien = con.match(/^\^(\d*)([+-])$/) ?? con.match(/^()([+-])$/);
    if (dien) {
      xaChu();
      ra.push({ k: 'tren', t: dien[1] + (dien[2] === '-' ? '−' : '+') });
      break;
    }

    // Số mũ khai tường minh: "^{2-}" hoặc "^2"
    const mu = con.match(/^\^\{([^}]*)\}|^\^(\w+)/);
    if (mu) {
      xaChu();
      ra.push({ k: 'tren', t: (mu[1] ?? mu[2]).replace('-', '−') });
      i += mu[0].length;
      continue;
    }

    // Chỉ số dưới: chữ số đứng ngay sau chữ cái hoặc ngoặc đóng
    if (/\d/.test(con[0]) && i > 0 && /[A-Za-z)\]]/.test(t[i - 1])) {
      const so = (con.match(/^\d+/) ?? [''])[0];
      xaChu();
      ra.push({ k: 'duoi', t: so });
      i += so.length;
      continue;
    }

    dem += con[0];
    i++;
  }
  xaChu();
}

/**
 * Phân tích một dòng chữ thành các mảnh để vẽ.
 *
 * Chữ thường đi thẳng ra ngoài. Chỉ ba thứ được xử lý: mũi tên phản ứng, khai
 * tường minh `^{...}` / `_{...}`, và mẩu chữ đạt đủ điều kiện laCongThuc().
 */
/**
 * @param {string} nguon
 * @returns {Manh[]}
 */
export function phanTich(nguon) {
  /** @type {Manh[]} */
  const ra = [];
  let dem = '';
  const xaChu = () => {
    if (dem) ra.push({ k: 'chu', t: dem });
    dem = '';
  };

  let i = 0;
  while (i < nguon.length) {
    const con = nguon.slice(i);

    // 1. Mũi tên, có thể kèm điều kiện: "->[t°, Pt]", "<=>[xt, t°, p][áp suất]"
    const mt = MUI_TEN.find(([cu]) => con.startsWith(cu));
    if (mt) {
      let j = i + mt[0].length;
      /** @type {string[]} */
      const dieuKien = [];
      while (nguon[j] === '[' && dieuKien.length < 2) {
        const dong = nguon.indexOf(']', j);
        if (dong < 0) break;
        dieuKien.push(nguon.slice(j + 1, dong));
        j = dong + 1;
      }
      xaChu();
      ra.push({ k: 'muiTen', t: mt[1], tren: dieuKien[0], duoi: dieuKien[1] });
      i = j;
      continue;
    }

    // 2. Khai tường minh — lối thoát cho những thứ luật chung không đoán nổi,
    //    ví dụ "ΔrH°_{298}" có ký tự Hy Lạp nên không lọt cửa laCongThuc().
    const khai = con.match(/^\^\{([^}]*)\}|^_\{([^}]*)\}/);
    if (khai) {
      xaChu();
      ra.push({
        k: khai[1] !== undefined ? 'tren' : 'duoi',
        t: (khai[1] ?? khai[2]).replace('-', '−'),
      });
      i += khai[0].length;
      continue;
    }

    // 3. Mẩu chữ liền — thử xem có phải công thức không
    // Dấu ^ đứng ngay trước { là phần khai tường minh ở bước 2, KHÔNG được
    // gộp vào mẩu chữ ở đây — gộp rồi thì bước 2 không bao giờ tới lượt.
    const mau = con.match(/^(?:[A-Za-z0-9()[\]+-]|\^(?!\{))+/);
    if (mau && laCongThuc(mau[0])) {
      xaChu();
      bocCongThuc(mau[0], ra);
      i += mau[0].length;
      continue;
    }
    if (mau) {
      dem += mau[0];
      i += mau[0].length;
      continue;
    }

    dem += con[0];
    i++;
  }
  xaChu();
  return ra;
}

const thoat = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Vẽ ra chuỗi HTML. Dùng cho TRANG DUYỆT ĐỀ sinh bằng Node — app dùng
 * component ChuHoaHoc.tsx, nhưng cả hai đọc chung phanTich() ở trên nên không
 * thể hiểu khác nhau về nội dung, chỉ khác nhau ở lớp áo.
 *
 * Đó là điều kiện sống còn của trang duyệt: thầy cô gật đầu trên trang này thì
 * phải chắc học sinh nhìn thấy đúng thứ đó.
 *
 * @param {string} nguon
 * @returns {string}
 */
export function veHtml(nguon) {
  let ra = '';
  // Số mũ và chỉ số của cùng ký hiệu vẽ NỐI TIẾP, không xếp chồng — xem lý do
  // ở ChuHoaHoc.tsx. Hai bên phải vẽ giống nhau, nếu không trang duyệt mất nghĩa.
  for (const a of phanTich(nguon)) {
    if (a.k === 'duoi') ra += `<sub>${thoat(a.t)}</sub>`;
    else if (a.k === 'tren') ra += `<sup>${thoat(a.t)}</sup>`;
    else if (a.k === 'trangThai') ra += `<i class="tt">${thoat(a.t)}</i>`;
    else if (a.k === 'muiTen') {
      if (!a.tren && !a.duoi) ra += `<span class="mt">${thoat(a.t)}</span>`;
      else
        ra +=
          `<span class="mtd">` +
          (a.tren ? `<span class="dk">${thoat(a.tren)}</span>` : '') +
          `<span>${thoat(a.t)}</span>` +
          (a.duoi ? `<span class="dk">${thoat(a.duoi)}</span>` : '') +
          `</span>`;
    } else ra += thoat(a.t);
  }
  return ra;
}
