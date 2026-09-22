// CÂY CHƯƠNG TRÌNH — lớp 10, 11, 12 theo bộ Kết nối tri thức với cuộc sống.
//
// VÌ SAO CẦN: trước đây cả hai nguồn đề đều phẳng. Ngân hàng đề của thầy gom
// theo "chuyên đề" chính là tên file thầy gửi, còn đề AI tự tạo gom theo DẠNG
// BÀI (cân bằng phương trình, tra bảng tính tan...). Cả hai cách đều không
// phải cách học sinh nghĩ. Học sinh nghĩ theo LỚP và theo CHƯƠNG đang học:
// "tuần này lớp 11 học chương Nitrogen - Sulfur" thì phải mở đúng chỗ đó.
//
// File này CHỈ là mục lục sách giáo khoa — danh sách chương, không có câu hỏi
// nào. Việc xếp câu hỏi vào chương nằm ở src/data/xepChuong.ts.
//
// NGUỒN: mục lục SGK Hóa học 10/11/12 bộ Kết nối tri thức với cuộc sống, do
// người dùng cung cấp ngày 22/09/2026. Tên chương giữ NGUYÊN VĂN mục lục, kể
// cả cách viết tên nguyên tố bằng tiếng Anh (nitrogen, sulfur, ester...) —
// SGK 2018 viết như vậy, sửa thành "nitơ", "lưu huỳnh" là lệch khỏi sách học
// sinh đang cầm trên tay.
//
// BỘ SÁCH KHÁC (Cánh Diều, Chân trời sáng tạo) chia chương khác đôi chút.
// Chưa làm — thêm thì phải khai rõ bộ sách trong từng mục, không được lặng lẽ
// dùng cây này cho cả ba bộ rồi để học sinh tự đoán.
//
// LÀ FILE .js CHỨ KHÔNG PHẢI .ts, cùng lý do với kyHieuHoa.js: script
// scripts/gen-de.mjs chạy bằng Node trần, không qua bộ dịch nào, mà nó phải
// đọc ĐÚNG cây này để xếp bộ đề của thầy vào chương. Chép làm hai bản thì
// hôm nào sửa một bên, đề của thầy xếp vào chương khác với đề của AI — mà cả
// hai lại hiện chung một cây trên màn hình. Kiểu khai bằng chú thích JSDoc
// nên TypeScript vẫn hiểu đủ, `tsc` vẫn gác được.

/** @typedef {10 | 11 | 12} MaLop */

/**
 * @typedef {object} Chuong
 * @property {string} ma       Mã ngắn "lớp.số chương", vd "11.2" — khóa dùng khắp nơi.
 * @property {MaLop} lop
 * @property {number} so       Số thứ tự chương trong sách.
 * @property {string} vi
 * @property {string} en
 * @property {string} noiDung  Các bài trong chương, viết gọn — hiện làm dòng phụ.
 * @property {string} noiDungEn
 * @property {string[]} tuKhoa Từ khóa để ĐOÁN chương từ tên bộ đề của thầy.
 *   Viết thường, KHÔNG dấu — hàm so khớp tự bỏ dấu hai bên. Khớp DÀI thắng
 *   khớp ngắn, nên "hop chat chua nitrogen" (12.3) thắng "nitrogen" (11.2)
 *   chứ không tranh nhau theo thứ tự khai.
 */

/** Mục dành cho câu hỏi CHƯA xếp được vào chương nào. Không phải một chương. */
export const CHUA_XEP = 'chua-xep';

export const TEN_CHUA_XEP = {
  vi: 'Chưa xếp chương',
  en: 'Not mapped to a chapter',
};

/** @type {Chuong[]} */
export const CHUONG_TRINH = [
  // ───────────────────────── LỚP 10 ─────────────────────────
  {
    ma: '10.1',
    lop: 10,
    so: 1,
    vi: 'Cấu tạo nguyên tử',
    en: 'Atomic structure',
    noiDung: 'Thành phần nguyên tử · nguyên tố hóa học · cấu trúc lớp vỏ electron',
    noiDungEn: 'Components of the atom · elements · electron shells',
    tuKhoa: ['cau tao nguyen tu', 'thanh phan nguyen tu', 'dong vi', 'lop vo electron', 'orbital nguyen tu'],
  },
  {
    ma: '10.2',
    lop: 10,
    so: 2,
    vi: 'Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
    en: 'The periodic table and the periodic law',
    noiDung: 'Cấu tạo bảng tuần hoàn · xu hướng biến đổi tính chất · định luật tuần hoàn',
    noiDungEn: 'Structure of the table · periodic trends · the periodic law',
    tuKhoa: ['bang tuan hoan', 'dinh luat tuan hoan', 'xu huong bien doi tinh chat', 'nhom nguyen to'],
  },
  {
    ma: '10.3',
    lop: 10,
    so: 3,
    vi: 'Liên kết hóa học',
    en: 'Chemical bonding',
    noiDung: 'Quy tắc octet · liên kết ion · liên kết cộng hóa trị · liên kết hydrogen · van der Waals',
    noiDungEn: 'Octet rule · ionic bond · covalent bond · hydrogen bond · van der Waals',
    tuKhoa: ['lien ket hoa hoc', 'quy tac octet', 'lien ket ion', 'lien ket cong hoa tri', 'lien ket hydrogen', 'van der waals'],
  },
  {
    ma: '10.4',
    lop: 10,
    so: 4,
    vi: 'Phản ứng oxi hóa - khử',
    en: 'Redox reactions',
    noiDung: 'Phản ứng cho nhận electron · số oxi hóa · ý nghĩa thực tiễn',
    noiDungEn: 'Electron transfer · oxidation numbers · applications',
    tuKhoa: ['oxi hoa - khu', 'oxi hoa khu', 'so oxi hoa', 'cho nhan electron'],
  },
  {
    ma: '10.5',
    lop: 10,
    so: 5,
    vi: 'Năng lượng hóa học',
    en: 'Energy of chemical reactions',
    noiDung: 'Biến thiên enthalpy · tính năng lượng phản ứng',
    noiDungEn: 'Enthalpy change · calculating reaction energy',
    tuKhoa: ['nang luong hoa hoc', 'enthalpy', 'nhiet phan ung', 'bien thien enthalpy'],
  },
  {
    ma: '10.6',
    lop: 10,
    so: 6,
    vi: 'Tốc độ phản ứng hóa học',
    en: 'Reaction rate',
    noiDung: 'Tốc độ phản ứng · các yếu tố ảnh hưởng',
    noiDungEn: 'Reaction rate · factors that affect it',
    tuKhoa: ['toc do phan ung', 'yeu to anh huong den toc do'],
  },
  {
    ma: '10.7',
    lop: 10,
    so: 7,
    vi: 'Nguyên tố nhóm VIIA (nhóm halogen)',
    en: 'Group VIIA elements (halogens)',
    noiDung: 'Khái quát nhóm halogen · hydrogen halide · hợp chất chứa oxygen của halogen',
    noiDungEn: 'The halogen group · hydrogen halides · oxygen compounds of halogens',
    tuKhoa: ['halogen', 'nhom viia', 'hydrogen halide', 'muoi halide', 'nuoc javel', 'chlorine'],
  },

  // ───────────────────────── LỚP 11 ─────────────────────────
  {
    ma: '11.1',
    lop: 11,
    so: 1,
    vi: 'Cân bằng hóa học',
    en: 'Chemical equilibrium',
    noiDung: 'Khái niệm cân bằng hóa học · cân bằng trong dung dịch nước',
    noiDungEn: 'Equilibrium · equilibria in aqueous solution',
    tuKhoa: ['can bang hoa hoc', 'can bang trong dung dich nuoc', 'su dien li', 'chat dien li', 'ph cua dung dich', 'chuan do'],
  },
  {
    ma: '11.2',
    lop: 11,
    so: 2,
    vi: 'Nitrogen - Sulfur',
    en: 'Nitrogen - Sulfur',
    noiDung: 'Nitrogen · ammonia · muối ammonium · hợp chất nitrogen với oxygen · sulfur · sulfur dioxide · sulfuric acid · muối sulfate',
    noiDungEn: 'Nitrogen · ammonia · ammonium salts · nitrogen oxides · sulfur · sulfur dioxide · sulfuric acid · sulfates',
    tuKhoa: ['nitrogen', 'ammonia', 'muoi ammonium', 'nitric acid', 'sulfur', 'sulfuric acid', 'sulfur dioxide', 'muoi sulfate', 'luu huynh'],
  },
  {
    ma: '11.3',
    lop: 11,
    so: 3,
    vi: 'Đại cương về hóa học hữu cơ',
    en: 'Introduction to organic chemistry',
    noiDung: 'Hợp chất hữu cơ · tách biệt và tinh chế · công thức phân tử · cấu tạo hóa học',
    noiDungEn: 'Organic compounds · separation · molecular formulas · structure',
    tuKhoa: ['dai cuong ve hoa hoc huu co', 'hop chat huu co', 'cong thuc phan tu', 'cau tao hoa hoc', 'tach biet va tinh che', 'dong phan'],
  },
  {
    ma: '11.4',
    lop: 11,
    so: 4,
    vi: 'Hydrocarbon',
    en: 'Hydrocarbons',
    noiDung: 'Alkane · alkene · alkyne · hydrocarbon thơm',
    noiDungEn: 'Alkanes · alkenes · alkynes · aromatic hydrocarbons',
    tuKhoa: ['hydrocarbon', 'alkane', 'alkene', 'alkyne', 'arene', 'hydrocarbon thom', 'benzene', 'ankan', 'anken', 'ankin'],
  },
  {
    ma: '11.5',
    lop: 11,
    so: 5,
    vi: 'Dẫn xuất halogen - Alcohol - Phenol',
    en: 'Halogen derivatives - Alcohols - Phenols',
    noiDung: 'Dẫn xuất halogen · alcohol · phenol',
    noiDungEn: 'Halogen derivatives · alcohols · phenols',
    tuKhoa: ['dan xuat halogen', 'alcohol', 'phenol', 'ancol'],
  },
  {
    ma: '11.6',
    lop: 11,
    so: 6,
    vi: 'Hợp chất carbonyl - Carboxylic acid',
    en: 'Carbonyl compounds - Carboxylic acids',
    noiDung: 'Hợp chất carbonyl · carboxylic acid',
    noiDungEn: 'Carbonyl compounds · carboxylic acids',
    tuKhoa: ['hop chat carbonyl', 'carbonyl', 'carboxylic acid', 'aldehyde', 'ketone', 'andehit', 'xeton'],
  },

  // ───────────────────────── LỚP 12 ─────────────────────────
  {
    ma: '12.1',
    lop: 12,
    so: 1,
    vi: 'Ester - Lipid',
    en: 'Esters - Lipids',
    noiDung: 'Ester · lipid · xà phòng và chất giặt rửa',
    noiDungEn: 'Esters · lipids · soaps and detergents',
    tuKhoa: ['ester', 'lipid', 'este', 'chat beo', 'xa phong', 'chat giat rua'],
  },
  {
    ma: '12.2',
    lop: 12,
    so: 2,
    vi: 'Carbohydrate',
    en: 'Carbohydrates',
    noiDung: 'Glucose · fructose · saccharose · maltose · tinh bột · cellulose',
    noiDungEn: 'Glucose · fructose · sucrose · maltose · starch · cellulose',
    tuKhoa: ['carbohydrate', 'glucose', 'fructose', 'saccharose', 'maltose', 'tinh bot', 'cellulose', 'gluxit'],
  },
  {
    ma: '12.3',
    lop: 12,
    so: 3,
    vi: 'Hợp chất chứa nitrogen',
    en: 'Nitrogen-containing compounds',
    noiDung: 'Amine · amino acid · peptide · protein · enzyme',
    noiDungEn: 'Amines · amino acids · peptides · proteins · enzymes',
    tuKhoa: ['hop chat chua nitrogen', 'amine', 'amino acid', 'peptide', 'protein', 'enzyme', 'amin', 'amino axit'],
  },
  {
    ma: '12.4',
    lop: 12,
    so: 4,
    vi: 'Polymer',
    en: 'Polymers',
    noiDung: 'Đại cương về polymer · chất dẻo · composite · tơ · cao su',
    noiDungEn: 'Polymers · plastics · composites · fibres · rubber',
    tuKhoa: ['polymer', 'polime', 'chat deo', 'composite', 'cao su'],
  },
  {
    ma: '12.5',
    lop: 12,
    so: 5,
    vi: 'Pin điện và điện phân',
    en: 'Galvanic cells and electrolysis',
    noiDung: 'Thế điện cực chuẩn · pin điện hóa · điện phân',
    noiDungEn: 'Standard electrode potential · galvanic cells · electrolysis',
    tuKhoa: ['pin dien', 'dien phan', 'the dien cuc', 'pin dien hoa'],
  },
  {
    ma: '12.6',
    lop: 12,
    so: 6,
    vi: 'Đại cương về kim loại',
    en: 'Introduction to metals',
    noiDung: 'Tính chất kim loại · hợp kim · sự ăn mòn · điều chế kim loại',
    noiDungEn: 'Properties of metals · alloys · corrosion · metal production',
    tuKhoa: ['dai cuong ve kim loai', 'tinh chat cua kim loai', 'hop kim', 'an mon kim loai', 'dieu che kim loai'],
  },
  {
    ma: '12.7',
    lop: 12,
    so: 7,
    vi: 'Nguyên tố nhóm IA và nhóm IIA',
    en: 'Group IA and group IIA elements',
    noiDung: 'Kim loại nhóm IA · kim loại nhóm IIA · nước cứng',
    noiDungEn: 'Group IA metals · group IIA metals · hard water',
    tuKhoa: ['nhom ia', 'nhom iia', 'kim loai kiem', 'kim loai kiem tho', 'nuoc cung'],
  },
  {
    ma: '12.8',
    lop: 12,
    so: 8,
    vi: 'Sơ lược về dãy kim loại chuyển tiếp thứ nhất và phức chất',
    en: 'First-row transition metals and complexes',
    noiDung: 'Kim loại chuyển tiếp thứ nhất · phức chất',
    noiDungEn: 'First-row transition metals · complexes',
    tuKhoa: ['kim loai chuyen tiep', 'day kim loai chuyen tiep thu nhat', 'phuc chat'],
  },
];

/** @type {MaLop[]} */
export const CAC_LOP = [10, 11, 12];

const THEO_MA = new Map(CHUONG_TRINH.map((c) => [c.ma, c]));

/**
 * @param {string} ma
 * @returns {Chuong | undefined}
 */
export const chuongTheoMa = (ma) => THEO_MA.get(ma);

/**
 * @param {MaLop} lop
 * @returns {Chuong[]}
 */
export const chuongCuaLop = (lop) => CHUONG_TRINH.filter((c) => c.lop === lop);

/**
 * Nhãn ngắn để hiện cạnh một câu hỏi, vd "Lớp 11 · Chương 2".
 * @param {string} ma
 * @param {boolean} vi
 * @returns {string}
 */
export const nhanNgan = (ma, vi) => {
  const c = chuongTheoMa(ma);
  if (!c) return vi ? TEN_CHUA_XEP.vi : TEN_CHUA_XEP.en;
  return vi ? `Lớp ${c.lop} · Chương ${c.so}` : `Grade ${c.lop} · Ch. ${c.so}`;
};

/**
 * Tên đầy đủ của chương theo ngôn ngữ đang dùng.
 * @param {string} ma
 * @param {boolean} vi
 * @returns {string}
 */
export const tenChuong = (ma, vi) => {
  const c = chuongTheoMa(ma);
  if (!c) return vi ? TEN_CHUA_XEP.vi : TEN_CHUA_XEP.en;
  return vi ? c.vi : c.en;
};

/**
 * Bỏ dấu tiếng Việt, hạ chữ thường, gom khoảng trắng.
 *
 * Tên bộ đề thầy gửi viết kiểu gì cũng có: "SỰ ĐIỆN LI", "Sự điện li",
 * "su dien li". So khớp thẳng thì trượt hết. Chữ đ/Đ không có dạng tổ hợp
 * nên phải thay riêng, đây là chỗ hay quên nhất khi bỏ dấu tiếng Việt.
 *
 * @param {string} s
 * @returns {string}
 */
export const boDau = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

/**
 * ĐOÁN chương từ một đoạn chữ — thường là tên bộ đề thầy gửi.
 *
 * KHỚP DÀI THẮNG KHỚP NGẮN, không phải khớp đầu tiên thắng. Lý do: tên chương
 * lồng nhau thật sự. "Hợp chất chứa nitrogen" (lớp 12) chứa nguyên chữ
 * "nitrogen" (lớp 11); "cân bằng trong dung dịch nước" chứa "cân bằng". Lấy
 * khớp đầu tiên thì thứ tự khai quyết định kết quả — sửa lại thứ tự cho đẹp
 * mắt là đề nhảy sang lớp khác mà không ai ngờ.
 *
 * ĐÂY LÀ PHÉP ĐOÁN, KHÔNG PHẢI SỰ THẬT. Không khớp thì trả null chứ KHÔNG
 * đoán bừa vào một chương gần gần. Chỗ gọi phải cho người khai đè lên được
 * (bản vá .va.json khai "chuong": "11.2"), và phải hiện rõ mục "chưa xếp
 * chương" thay vì giấu mấy bộ đề chưa xếp được đi.
 *
 * @param {string} chu
 * @returns {string | null} mã chương, vd "11.2"
 */
export const doanChuong = (chu) => {
  const t = boDau(chu);
  if (!t) return null;
  let ma = null;
  let dai = 0;
  for (const c of CHUONG_TRINH) {
    for (const k of c.tuKhoa) {
      if (k.length > dai && t.includes(k)) {
        dai = k.length;
        ma = c.ma;
      }
    }
  }
  return ma;
};
