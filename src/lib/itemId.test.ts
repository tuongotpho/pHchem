import { describe, it, expect } from 'vitest';
import { itemId } from './itemId';
import { FACTS } from '../data/facts';
import { TERMS } from '../data/dictionary';
import { FORMULAS, keyOf } from '../data/formulas';
import { REACTIONS } from '../data/reactions';

// Ô tìm kiếm ở trang chủ dựng đường dẫn tới từng mục bằng các khóa dưới đây.
// Hai mục trùng khóa là bấm vào cái này lại nhảy sang cái kia — nên chặn ngay.

describe('khóa định danh dùng cho đường dẫn tìm kiếm', () => {
  it('mã sự thật không trùng nhau', () => {
    const ids = FACTS.map((f) => itemId(f.en));
    const trung = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(trung).toEqual([]);
    expect(ids).toHaveLength(FACTS.length);
  });

  it('mã phản ứng không trùng nhau', () => {
    const ids = REACTIONS.map((r) => itemId(r.eq));
    const trung = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(trung).toEqual([]);
    expect(ids).toHaveLength(REACTIONS.length);
  });

  it('khóa công thức không trùng nhau', () => {
    const keys = FORMULAS.map(keyOf);
    const trung = keys.filter((k, i) => keys.indexOf(k) !== i);
    expect(trung).toEqual([]);
  });

  it('tên tiếng Anh của thuật ngữ không trùng nhau', () => {
    const ens = TERMS.map((t) => t.en);
    const trung = ens.filter((e, i) => ens.indexOf(e) !== i);
    expect(trung).toEqual([]);
  });

  it('mã sinh ra ổn định và ngắn', () => {
    expect(itemId('Atom')).toBe(itemId('Atom'));
    expect(itemId('Atom')).not.toBe(itemId('Molecule'));
    expect(itemId('Atom').length).toBeLessThanOrEqual(7);
  });
});
