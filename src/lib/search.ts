// Tìm kiếm tổng: gộp kết quả từ nguyên tố, công thức, thuật ngữ, sự thật.
import { ELEMENTS } from '../data/elements';
import { FORMULAS, keyOf } from '../data/formulas';
import { TERMS } from '../data/dictionary';
import { FACTS } from '../data/facts';
import { REACTIONS, TYPE_META } from '../data/reactions';
import { itemId } from './itemId';
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
  const out: SearchResult[] = [];

  // Nguyên tố
  for (const e of ELEMENTS) {
    if (
      norm(e.sym) === q ||
      norm(e.vi).includes(q) ||
      norm(e.en).includes(q) ||
      String(e.n) === q
    ) {
      out.push({
        kind: 'element',
        title: `${e.sym} · ${lang === 'vi' ? e.vi : e.en}`,
        sub: `${lang === 'vi' ? 'Số hiệu' : 'Number'} ${e.n} · ${e.mass} u`,
        to: `/table/${e.n}`,
        badge: lang === 'vi' ? 'Nguyên tố' : 'Element',
      });
    }
  }

  // Công thức
  for (const f of FORMULAS) {
    if (
      norm(f.formula).includes(q) ||
      norm(f.vi).includes(q) ||
      norm(f.en).includes(q)
    ) {
      out.push({
        kind: 'formula',
        title: `${f.formula} · ${lang === 'vi' ? f.vi : f.en}`,
        sub: lang === 'vi' ? f.note_vi : f.note_en,
        to: `/formulas?item=${encodeURIComponent(keyOf(f))}`,
        badge: lang === 'vi' ? 'Công thức' : 'Formula',
      });
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
    if (norm(kho).includes(q)) {
      const loai = r.type.map((ty) => TYPE_META[ty][lang]).join(' · ');
      out.push({
        kind: 'reaction',
        title: r.eq,
        sub:
          (lang === 'vi' ? r.cond_vi : r.cond_en) ??
          (lang === 'vi' ? r.phen_vi : r.phen_en) ??
          loai,
        to: `/reactions?item=${itemId(r.eq)}`,
        badge: lang === 'vi' ? 'Phản ứng' : 'Reaction',
      });
    }
  }

  // Thuật ngữ
  for (const t of TERMS) {
    if (
      norm(t.vi).includes(q) ||
      norm(t.en).includes(q) ||
      norm(t.def_vi).includes(q) ||
      norm(t.def_en).includes(q)
    ) {
      out.push({
        kind: 'term',
        title: lang === 'vi' ? t.vi : t.en,
        sub: lang === 'vi' ? t.def_vi : t.def_en,
        to: `/dictionary?item=${encodeURIComponent(t.en)}`,
        badge: lang === 'vi' ? 'Thuật ngữ' : 'Term',
      });
    }
  }

  // Sự thật
  for (const fact of FACTS) {
    if (norm(fact.vi).includes(q) || norm(fact.en).includes(q)) {
      out.push({
        kind: 'fact',
        title: lang === 'vi' ? fact.vi : fact.en,
        sub: fact.tag,
        to: `/facts?item=${itemId(fact.en)}`,
        badge: lang === 'vi' ? 'Sự thật' : 'Fact',
      });
    }
  }

  return out.slice(0, 40); // giới hạn cho gọn
}
