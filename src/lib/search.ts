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

export function searchAll(query: string, lang: Lang): SearchResult[] {
  const q = norm(query.trim());
  if (q.length < 1) return [];

  // Tách câu tìm thành từng chữ, đòi CÓ ĐỦ chứ không đòi liền mạch.
  // Trước đây phải khớp nguyên cụm nên gõ "bac ancol" không ra "Bậc CỦA ancol",
  // "axit stearic" không ra "Axit béo stearic" — thiếu đúng một chữ đệm là mất
  // kết quả. Người dùng không nhớ chính xác từng chữ đệm.
  const tu = q.split(/\s+/).filter(Boolean);
  const khop = (kho: string): boolean => {
    const k = norm(kho);
    return tu.every((x) => k.includes(x));
  };

  // Chấm điểm để xếp hạng — càng nhỏ càng sát ý người tìm:
  //   0 = trùng khít cả tên     1 = tên bắt đầu bằng câu tìm     2 = chỉ chứa
  // Không có bước này thì gõ "ethanoic acid" lại ra axit fomic trước axit
  // axetic, chỉ vì chuỗi "methanoic acid" tình cờ chứa "ethanoic".
  const diemKhop = (...cacTen: (string | undefined)[]): number => {
    let diem = 2;
    for (const ten of cacTen) {
      if (!ten) continue;
      const k = norm(ten);
      if (k === q) return 0;
      if (k.startsWith(q)) diem = 1;
    }
    return diem;
  };

  // Giữ nguyên thứ tự nhóm (nguyên tố → công thức → phản ứng → thuật ngữ →
  // sự thật) trong cùng một mức điểm: phép sắp xếp của JS là ổn định.
  const kho: { r: SearchResult; diem: number }[] = [];
  const out = {
    push(r: SearchResult, diem = 2) {
      kho.push({ r, diem });
    },
  };

  // Nguyên tố
  for (const e of ELEMENTS) {
    if (
      norm(e.sym) === q ||
      khop(e.vi) ||
      khop(e.en) ||
      String(e.n) === q
    ) {
      out.push(
        {
          kind: 'element',
          title: `${e.sym} · ${lang === 'vi' ? e.vi : e.en}`,
          sub: `${lang === 'vi' ? 'Số hiệu' : 'Number'} ${e.n} · ${e.mass} u`,
          to: `/table/${e.n}`,
          badge: lang === 'vi' ? 'Nguyên tố' : 'Element',
        },
        diemKhop(e.sym, e.vi, e.en, String(e.n)),
      );
    }
  }

  // Công thức
  for (const f of FORMULAS) {
    if (
      khop(f.formula) ||
      khop(f.vi) ||
      khop(f.en) ||
      // gõ tên IUPAC cũng phải ra: học sinh tra "ethanoic acid" chứ không
      // phải lúc nào cũng nhớ tên thường "axit axetic"
      khop(iupacOf(keyOf(f), f.en) ?? '')
    ) {
      out.push(
        {
          kind: 'formula',
          title: `${f.formula} · ${lang === 'vi' ? f.vi : f.en}`,
          sub: lang === 'vi' ? f.note_vi : f.note_en,
          to: `/formulas?item=${encodeURIComponent(keyOf(f))}`,
          badge: lang === 'vi' ? 'Công thức' : 'Formula',
        },
        diemKhop(f.formula, f.vi, f.en, iupacOf(keyOf(f), f.en)),
      );
    }
  }

  // Phản ứng — tìm theo phương trình, loại phản ứng, điều kiện, hiện tượng.
  // Đặt ngay sau công thức vì tra chất thì thường muốn xem luôn phản ứng của nó.
  for (const r of REACTIONS) {
    const nhan = r.type
      .map((ty) => `${TYPE_META[ty].vi} ${TYPE_META[ty].en}`)
      .join(' ');
    const kho = [
      r.eq,
      nhan,
      r.cond_vi ?? '',
      r.cond_en ?? '',
      r.phen_vi ?? '',
      r.phen_en ?? '',
      r.note_vi ?? '',
      r.note_en ?? '',
    ].join(' ');
    if (khop(kho)) {
      const loai = r.type.map((ty) => TYPE_META[ty][lang]).join(' · ');
      out.push(
        {
          kind: 'reaction',
          title: r.eq,
          sub:
            (lang === 'vi' ? r.cond_vi : r.cond_en) ??
            (lang === 'vi' ? r.phen_vi : r.phen_en) ??
            loai,
          to: `/reactions?item=${itemId(r.eq)}`,
          badge: lang === 'vi' ? 'Phản ứng' : 'Reaction',
        },
        diemKhop(r.eq),
      );
    }
  }

  // Thuật ngữ
  for (const t of TERMS) {
    if (
      khop(t.vi) || khop(t.en) || khop(t.def_vi) || khop(t.def_en)
    ) {
      out.push(
        {
          kind: 'term',
          title: lang === 'vi' ? t.vi : t.en,
          sub: lang === 'vi' ? t.def_vi : t.def_en,
          to: `/dictionary?item=${encodeURIComponent(t.en)}`,
          badge: lang === 'vi' ? 'Thuật ngữ' : 'Term',
        },
        diemKhop(t.vi, t.en),
      );
    }
  }

  // Sự thật
  for (const fact of FACTS) {
    if (khop(fact.vi) || khop(fact.en)) {
      out.push({
        kind: 'fact',
        title: lang === 'vi' ? fact.vi : fact.en,
        sub: fact.tag,
        to: `/facts?item=${itemId(fact.en)}`,
        badge: lang === 'vi' ? 'Sự thật' : 'Fact',
      });
    }
  }

  // Sắp xếp theo độ sát rồi mới cắt bớt — nếu cắt trước thì kết quả đúng nhất
  // có thể bị loại ngay từ đầu.
  kho.sort((a, b) => a.diem - b.diem);
  return kho.slice(0, 40).map((x) => x.r);
}
