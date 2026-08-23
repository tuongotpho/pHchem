// Tìm kiếm tổng: gộp kết quả từ nguyên tố, công thức, thuật ngữ, sự thật.
import { ELEMENTS } from '../data/elements';
import { FORMULAS, keyOf } from '../data/formulas';
import { TERMS } from '../data/dictionary';
import { FACTS } from '../data/facts';
import { REACTIONS, TYPE_META } from '../data/reactions';
import { itemId } from './itemId';
import { iupacOf } from '../data/iupac';
import type { Lang } from '../i18n/strings';

export type ResultKind = 'element' | 'formula' | 'reaction' | 'term' | 'fact';

export interface SearchResult {
  kind: ResultKind;
  title: string; // dòng chính
  sub: string; // dòng phụ
  /** Đường dẫn tới ĐÚNG mục này, không phải tới trang chung.
   *  Trang đích đọc tham số `item` để mở sẵn / cuộn tới / tô sáng mục. */
  to: string;
  badge: string; // nhãn nhóm
}

// Bỏ dấu tiếng Việt để gõ không dấu vẫn tìm được.
// Riêng chữ "đ" phải thay tay: nó là MỘT CHỮ CÁI riêng (U+0111), không phải
// chữ d đội thêm dấu, nên bước bỏ dấu bên dưới không đụng tới nó. Thiếu dòng
// này thì gõ "dien phan" không ra "điện phân", "dong" không ra "đồng".
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

// ---------- Bảng tra dựng sẵn MỘT LẦN lúc nạp module ----------
//
// VÌ SAO PHẢI DỰNG SẴN: bỏ dấu tiếng Việt không rẻ — `normalize('NFD')` phải
// tách từng ký tự ra thành chữ cái và dấu rồi lọc lại. Trước đây việc đó chạy
// lại cho MỌI trường của MỌI mục sau MỖI phím gõ: hơn tám trăm mục, mỗi mục
// vài trường, lại nhân thêm vì hàm chấm điểm cũng gọi bỏ dấu lần nữa.
//
// Máy bàn không thấy gì, nhưng điện thoại phổ thông thì chữ đuổi không kịp
// tay — mà app này là để cho học sinh dùng trên điện thoại.
//
// Bỏ dấu sẵn một lần lúc mở app thì lúc gõ chỉ còn so chuỗi, việc rẻ nhất.
// Cùng lối với các chỉ mục khác trong app (reactionIndex, classIndex).

const NGUYEN_TO = ELEMENTS.map((e) => ({
  e,
  sym: norm(e.sym),
  vi: norm(e.vi),
  en: norm(e.en),
  n: String(e.n),
}));

const CONG_THUC = FORMULAS.map((f) => {
  const iupac = iupacOf(keyOf(f), f.en);
  return {
    f,
    /** Các trường để dò. Khớp khi MỘT trường chứa đủ mọi chữ người dùng gõ. */
    truong: [norm(f.formula), norm(f.vi), norm(f.en), iupac ? norm(iupac) : ''],
    /** Các tên để chấm điểm — bỏ tên rỗng cho khỏi tính nhầm. */
    ten: [norm(f.formula), norm(f.vi), norm(f.en), iupac ? norm(iupac) : ''].filter(
      Boolean,
    ),
  };
});

const PHAN_UNG = REACTIONS.map((r) => ({
  r,
  // Phản ứng dò trên một kho gộp: phương trình, loại, điều kiện, hiện tượng,
  // ghi chú — cả hai thứ tiếng.
  kho: norm(
    [
      r.eq,
      r.type.map((ty) => `${TYPE_META[ty].vi} ${TYPE_META[ty].en}`).join(' '),
      r.cond_vi ?? '',
      r.cond_en ?? '',
      r.phen_vi ?? '',
      r.phen_en ?? '',
      r.note_vi ?? '',
      r.note_en ?? '',
    ].join(' '),
  ),
  eq: norm(r.eq),
}));

const THUAT_NGU = TERMS.map((t) => ({
  t,
  truong: [norm(t.vi), norm(t.en), norm(t.def_vi), norm(t.def_en)],
  ten: [norm(t.vi), norm(t.en)],
}));

const SU_THAT = FACTS.map((fact) => ({
  fact,
  truong: [norm(fact.vi), norm(fact.en)],
}));

export function searchAll(query: string, lang: Lang): SearchResult[] {
  const q = norm(query.trim());
  if (q.length < 1) return [];

  // Tách câu tìm thành từng chữ, đòi CÓ ĐỦ chứ không đòi liền mạch.
  // Trước đây phải khớp nguyên cụm nên gõ "bac ancol" không ra "Bậc CỦA ancol",
  // "axit stearic" không ra "Axit béo stearic" — thiếu đúng một chữ đệm là mất
  // kết quả. Người dùng không nhớ chính xác từng chữ đệm.
  const tu = q.split(/\s+/).filter(Boolean);

  /** Một trường ĐÃ BỎ DẤU SẴN có chứa đủ mọi chữ người dùng gõ không. */
  const khop = (daBoDau: string): boolean => tu.every((x) => daBoDau.includes(x));
  /** Bất kỳ trường nào trong danh sách khớp là được. */
  const khopMot = (cacTruong: string[]): boolean => cacTruong.some(khop);

  // Chấm điểm để xếp hạng — càng nhỏ càng sát ý người tìm:
  //   0 = trùng khít cả tên     1 = tên bắt đầu bằng câu tìm     2 = chỉ chứa
  // Không có bước này thì gõ "ethanoic acid" lại ra axit fomic trước axit
  // axetic, chỉ vì chuỗi "methanoic acid" tình cờ chứa "ethanoic".
  const diemKhop = (cacTen: string[]): number => {
    let diem = 2;
    for (const k of cacTen) {
      if (!k) continue;
      if (k === q) return 0;
      if (k.startsWith(q)) diem = 1;
    }
    return diem;
  };

  // Giữ nguyên thứ tự nhóm (nguyên tố → công thức → phản ứng → thuật ngữ →
  // sự thật) trong cùng một mức điểm: phép sắp xếp của JS là ổn định.
  const kho: { r: SearchResult; diem: number }[] = [];
  const them = (r: SearchResult, diem = 2) => kho.push({ r, diem });

  // Nguyên tố — ký hiệu và số hiệu đòi TRÙNG KHÍT, không phải chỉ chứa:
  // gõ "C" mà ra mọi nguyên tố có chữ c trong tên thì vô dụng.
  for (const m of NGUYEN_TO) {
    if (m.sym === q || khop(m.vi) || khop(m.en) || m.n === q) {
      const e = m.e;
      them(
        {
          kind: 'element',
          title: `${e.sym} · ${lang === 'vi' ? e.vi : e.en}`,
          sub: `${lang === 'vi' ? 'Số hiệu' : 'Number'} ${e.n} · ${e.mass} u`,
          to: `/table/${e.n}`,
          badge: lang === 'vi' ? 'Nguyên tố' : 'Element',
        },
        diemKhop([m.sym, m.vi, m.en, m.n]),
      );
    }
  }

  // Công thức — gõ tên IUPAC cũng phải ra: học sinh tra "ethanoic acid" chứ
  // không phải lúc nào cũng nhớ tên thường "axit axetic".
  for (const m of CONG_THUC) {
    if (!khopMot(m.truong)) continue;
    const f = m.f;
    them(
      {
        kind: 'formula',
        title: `${f.formula} · ${lang === 'vi' ? f.vi : f.en}`,
        sub: lang === 'vi' ? f.note_vi : f.note_en,
        to: `/formulas?item=${encodeURIComponent(keyOf(f))}`,
        badge: lang === 'vi' ? 'Công thức' : 'Formula',
      },
      diemKhop(m.ten),
    );
  }

  // Phản ứng — tìm theo phương trình, loại phản ứng, điều kiện, hiện tượng.
  // Đặt ngay sau công thức vì tra chất thì thường muốn xem luôn phản ứng của nó.
  for (const m of PHAN_UNG) {
    if (!khop(m.kho)) continue;
    const r = m.r;
    them(
      {
        kind: 'reaction',
        title: r.eq,
        sub:
          (lang === 'vi' ? r.cond_vi : r.cond_en) ??
          (lang === 'vi' ? r.phen_vi : r.phen_en) ??
          r.type.map((ty) => TYPE_META[ty][lang]).join(' · '),
        to: `/reactions?item=${itemId(r.eq)}`,
        badge: lang === 'vi' ? 'Phản ứng' : 'Reaction',
      },
      diemKhop([m.eq]),
    );
  }

  // Thuật ngữ
  for (const m of THUAT_NGU) {
    if (!khopMot(m.truong)) continue;
    const t = m.t;
    them(
      {
        kind: 'term',
        title: lang === 'vi' ? t.vi : t.en,
        sub: lang === 'vi' ? t.def_vi : t.def_en,
        to: `/dictionary?item=${encodeURIComponent(t.en)}`,
        badge: lang === 'vi' ? 'Thuật ngữ' : 'Term',
      },
      diemKhop(m.ten),
    );
  }

  // Sự thật
  for (const m of SU_THAT) {
    if (!khopMot(m.truong)) continue;
    const fact = m.fact;
    them({
      kind: 'fact',
      title: lang === 'vi' ? fact.vi : fact.en,
      sub: fact.tag,
      to: `/facts?item=${itemId(fact.en)}`,
      badge: lang === 'vi' ? 'Thực tiễn' : 'Fact',
    });
  }

  // Sắp xếp theo độ sát rồi mới cắt bớt — nếu cắt trước thì kết quả đúng nhất
  // có thể bị loại ngay từ đầu.
  kho.sort((a, b) => a.diem - b.diem);
  return kho.slice(0, 40).map((x) => x.r);
}
